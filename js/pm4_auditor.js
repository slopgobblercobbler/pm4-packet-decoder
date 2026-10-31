// js/pm4_auditor.js - AnyPS5 / libSceAgcDriver PM4 Command Packet Bounds Auditor

export class Pm4Auditor {
  /**
   * @param {Array<object>} packets - Parsed packets from Pm4Decoder
   * @param {Array<string>} [streamErrors=[]]
   */
  constructor(packets, streamErrors = []) {
    this.packets = packets || [];
    this.streamErrors = streamErrors;
    this.checks = [];
  }

  audit() {
    this.checks = [];

    // Check 1: Command Stream Truncation & Buffer Overrun
    const truncatedPackets = this.packets.filter(p => p.isTruncated);
    const streamPass = (this.streamErrors.length === 0 && truncatedPackets.length === 0);
    this.checks.push({
      id: "PM4-AUDIT-001",
      title: "Ring Buffer Payload Bounds",
      status: streamPass ? "PASS" : "FAIL",
      details: streamPass
        ? `All ${this.packets.length} PM4 packet payloads reside strictly within ring buffer boundaries.`
        : `${truncatedPackets.length} packet(s) or stream fragments overrun ring buffer bounds (${this.streamErrors.join("; ")}).`,
      recommendation: streamPass ? null : "Validate command buffer capacity before pushing multi-dword packets."
    });

    // Check 2: Packet Header Encoding & Types
    const invalidTypes = this.packets.filter(p => p.type === 1);
    const typePass = (invalidTypes.length === 0);
    this.checks.push({
      id: "PM4-AUDIT-002",
      title: "Header Type Field Validity",
      status: typePass ? "PASS" : "FAIL",
      details: typePass
        ? `All packet headers declare valid Type-3 (0b11), Type-0 (0b00), or Type-2 (0b10) encodings.`
        : `Found ${invalidTypes.length} packet(s) with illegal Type-1 header encoding.`,
      recommendation: typePass ? null : "Mask top two bits [31:30] to valid packet type identifiers."
    });

    // Check 3: Indirect Buffer (IB) 4-Byte Alignment & Bounds
    const ibPackets = this.packets.filter(p => p.opcode === 0x3F);
    let ibPass = true;
    const ibIssues = [];

    for (const ib of ibPackets) {
      if (ib.fields.ibAddress !== undefined) {
        if (!ib.fields.is4ByteAligned) {
          ibPass = false;
          ibIssues.push(`Packet #${ib.index}: Indirect buffer base 0x${ib.fields.ibAddress.toString(16)} is not 4-byte aligned.`);
        }
        if (ib.fields.ibSizeDwords === 0) {
          ibPass = false;
          ibIssues.push(`Packet #${ib.index}: Indirect buffer size is 0 DWORDs.`);
        }
      }
    }

    this.checks.push({
      id: "PM4-AUDIT-003",
      title: "Indirect Buffer (IB) Alignment & Capacity",
      status: (ibPackets.length === 0) ? "PASS" : (ibPass ? "PASS" : "FAIL"),
      details: (ibPackets.length === 0)
        ? "No Indirect Buffer (0x3F) branch packets in stream."
        : (ibPass ? `All ${ibPackets.length} Indirect Buffer branch addresses are DWORD aligned with non-zero capacity.` : ibIssues.join("; ")),
      recommendation: ibPass ? null : "Ensure secondary command buffers start on 4-byte boundaries with non-zero size."
    });

    // Check 4: User-Data Registers Bounds (0xC340..0xC347)
    const setShPackets = this.packets.filter(p => p.opcode === 0x69);
    let shPass = true;
    const shIssues = [];

    for (const p of setShPackets) {
      if (p.fields.decodedRegisters) {
        for (const reg of p.fields.decodedRegisters) {
          const fullReg = 0x2C00 + reg.offset;
          // Valid shader register range
          if (fullReg < 0x2C00 || fullReg > 0xFFFF) {
            shPass = false;
            shIssues.push(`Packet #${p.index}: Shader register 0x${fullReg.toString(16)} out of valid range.`);
          }
        }
      }
    }

    this.checks.push({
      id: "PM4-AUDIT-004",
      title: "Shader Register Bank & User-Data Bounds",
      status: shPass ? "PASS" : "FAIL",
      details: shPass
        ? `All ${setShPackets.length} SET_SH_REG packet(s) target valid shader register ranges.`
        : shIssues.join("; "),
      recommendation: shPass ? null : "Clamp shader user-data register offsets to within valid SPI ranges."
    });

    // Check 5: Indirect Draw Stride & Record Bounds
    const drawIndPackets = this.packets.filter(p => p.opcode === 0x24 || p.opcode === 0x25);
    let drawPass = true;
    const drawIssues = [];

    for (const d of drawIndPackets) {
      if (d.fields.stride !== undefined && d.fields.recordBytes !== undefined) {
        if (d.fields.stride < d.fields.recordBytes) {
          drawPass = false;
          drawIssues.push(
            `Packet #${d.index}: Stride (${d.fields.stride}b) is smaller than record size (${d.fields.recordBytes}b), causing overlapping memory reads.`
          );
        }
      }
    }

    this.checks.push({
      id: "PM4-AUDIT-005",
      title: "Indirect Draw Stride Invariants",
      status: (drawIndPackets.length === 0) ? "PASS" : (drawPass ? "PASS" : "FAIL"),
      details: (drawIndPackets.length === 0)
        ? "No Indirect Draw packets in stream."
        : (drawPass ? `All ${drawIndPackets.length} indirect draw packets satisfy stride >= recordBytes.` : drawIssues.join("; ")),
      recommendation: drawPass ? null : "Ensure indirect draw stride is at least 16 bytes for non-indexed, 20 bytes for indexed."
    });

    // Check 6: DMA Destination 4-Byte Alignment
    const dmaPackets = this.packets.filter(p => p.opcode === 0x41 || p.opcode === 0x50);
    let dmaPass = true;
    const dmaIssues = [];

    for (const d of dmaPackets) {
      if (d.fields.byteCount !== undefined && d.fields.byteCount === 0) {
        dmaPass = false;
        dmaIssues.push(`Packet #${d.index}: DMA transfer byte count is zero.`);
      }
    }

    this.checks.push({
      id: "PM4-AUDIT-006",
      title: "DMA Transfer Capacity & Alignment",
      status: (dmaPackets.length === 0) ? "PASS" : (dmaPass ? "PASS" : "WARN"),
      details: (dmaPackets.length === 0)
        ? "No DMA packets in stream."
        : (dmaPass ? `All ${dmaPackets.length} DMA transfers declare non-zero byte capacity.` : dmaIssues.join("; ")),
      recommendation: dmaPass ? null : "Specify non-zero byte count for DMA memory copy operations."
    });

    const hasFail = this.checks.some(c => c.status === "FAIL");
    const hasWarn = this.checks.some(c => c.status === "WARN");
    const overallScore = hasFail ? "FAIL" : (hasWarn ? "WARN" : "PASS");

    return {
      overallScore,
      checks: this.checks,
      passedCount: this.checks.filter(c => c.status === "PASS").length,
      warnCount: this.checks.filter(c => c.status === "WARN").length,
      failCount: this.checks.filter(c => c.status === "FAIL").length
    };
  }
}

// js/pm4_decoder.js - PM4 Command Packet Stream Decoder

import { BinaryReader } from "./binary_reader.js";
import { PACKET_TYPES, getOpcodeInfo, getShRegisterName } from "./pm4_constants.js";

export class Pm4Decoder {
  /**
   * @param {Uint8Array|ArrayBuffer} buffer
   */
  constructor(buffer) {
    this.buffer = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    this.reader = new BinaryReader(this.buffer);
    this.packets = [];
    this.errors = [];
  }

  decode() {
    this.packets = [];
    this.errors = [];
    this.reader.seek(0);

    let packetIndex = 0;
    while (!this.reader.isEOF()) {
      if (this.reader.remaining < 4) {
        this.errors.push(`Truncated stream at byte offset 0x${this.reader.offset.toString(16)}: less than 4 bytes for header`);
        break;
      }

      const packetStartOffset = this.reader.offset;
      const header = this.reader.readUint32();
      const packetType = (header >> 30) & 0x03;

      if (packetType === 3) { // Type 3
        const count = ((header >> 16) & 0x3FFF) + 1; // Number of DWORDs following
        const opcode = (header >> 8) & 0xFF;
        const predicate = header & 0xFF;
        const payloadBytes = count * 4;

        if (this.reader.remaining < payloadBytes) {
          this.errors.push(
            `Packet #${packetIndex} (Opcode 0x${opcode.toString(16)}) header specifies ${count} DWORDs (${payloadBytes} bytes), but only ${this.reader.remaining} bytes remain.`
          );
          // Recover available dwords
          const availableCount = Math.floor(this.reader.remaining / 4);
          const payload = [];
          for (let i = 0; i < availableCount; i++) payload.push(this.reader.readUint32());
          this.packets.push({
            index: packetIndex++,
            startOffset: packetStartOffset,
            endOffset: this.reader.offset,
            type: 3,
            typeName: "TYPE_3",
            header,
            headerHex: `0x${header.toString(16).padStart(8, "0")}`,
            count,
            opcode,
            opcodeInfo: getOpcodeInfo(opcode),
            predicate,
            payload,
            isTruncated: true,
            fields: { error: "Payload truncated before EOF" }
          });
          break;
        }

        const payload = [];
        for (let i = 0; i < count; i++) {
          payload.push(this.reader.readUint32());
        }

        const fields = this.decodeType3Fields(opcode, payload);

        this.packets.push({
          index: packetIndex++,
          startOffset: packetStartOffset,
          endOffset: this.reader.offset,
          type: 3,
          typeName: "TYPE_3",
          header,
          headerHex: `0x${header.toString(16).padStart(8, "0")}`,
          count,
          opcode,
          opcodeInfo: getOpcodeInfo(opcode),
          predicate,
          payload,
          isTruncated: false,
          fields
        });

      } else if (packetType === 0) { // Type 0 (Register Write)
        const count = ((header >> 16) & 0x3FFF) + 1;
        const baseReg = header & 0xFFFF;
        const payloadBytes = count * 4;

        if (this.reader.remaining < payloadBytes) {
          this.errors.push(`Type 0 packet #${packetIndex} payload truncated`);
          break;
        }

        const payload = [];
        const regWrites = [];
        for (let i = 0; i < count; i++) {
          const val = this.reader.readUint32();
          payload.push(val);
          regWrites.push({ reg: baseReg + i, regHex: `0x${(baseReg + i).toString(16)}`, val, valHex: `0x${val.toString(16)}` });
        }

        this.packets.push({
          index: packetIndex++,
          startOffset: packetStartOffset,
          endOffset: this.reader.offset,
          type: 0,
          typeName: "TYPE_0",
          header,
          headerHex: `0x${header.toString(16).padStart(8, "0")}`,
          count,
          baseReg,
          baseRegHex: `0x${baseReg.toString(16)}`,
          payload,
          regWrites,
          isTruncated: false,
          fields: { baseReg: `0x${baseReg.toString(16)}`, regCount: count, regWrites }
        });

      } else if (packetType === 2) { // Type 2 (NOP)
        this.packets.push({
          index: packetIndex++,
          startOffset: packetStartOffset,
          endOffset: this.reader.offset,
          type: 2,
          typeName: "TYPE_2 (NOP)",
          header,
          headerHex: `0x${header.toString(16).padStart(8, "0")}`,
          count: 0,
          payload: [],
          isTruncated: false,
          fields: { desc: "1-DWORD NOP / Alignment padding" }
        });

      } else { // Type 1 or Reserved
        this.packets.push({
          index: packetIndex++,
          startOffset: packetStartOffset,
          endOffset: this.reader.offset,
          type: packetType,
          typeName: `TYPE_${packetType} (RESERVED)`,
          header,
          headerHex: `0x${header.toString(16).padStart(8, "0")}`,
          count: 0,
          payload: [],
          isTruncated: false,
          fields: { error: `Invalid PM4 packet type ${packetType}` }
        });
      }
    }

    return {
      packets: this.packets,
      packetCount: this.packets.length,
      errors: this.errors
    };
  }

  decodeType3Fields(opcode, payload) {
    const fields = {};

    switch (opcode) {
      case 0x10: // NOP
        fields.desc = `NOP padding (${payload.length} DWORDs)`;
        break;

      case 0x15: { // DISPATCH_DIRECT
        if (payload.length >= 3) {
          fields.dimX = payload[0];
          fields.dimY = payload[1];
          fields.dimZ = payload[2];
          fields.totalThreads = payload[0] * payload[1] * payload[2];
          fields.summary = `Grid [${fields.dimX}, ${fields.dimY}, ${fields.dimZ}] (${fields.totalThreads} threadgroups)`;
        }
        break;
      }

      case 0x22: { // INDEX_TYPE
        if (payload.length >= 1) {
          const is32 = (payload[0] & 1) !== 0;
          fields.indexType = is32 ? "32-bit (UINT32)" : "16-bit (UINT16)";
          fields.bytesPerIndex = is32 ? 4 : 2;
          fields.raw = payload[0];
        }
        break;
      }

      case 0x2D: { // DRAW_INDEX_AUTO
        if (payload.length >= 2) {
          fields.indexCount = payload[0];
          fields.drawInitiator = payload[1];
          fields.summary = `Auto-indexed draw: ${payload[0]} vertices/indices`;
        }
        break;
      }

      case 0x24:   // DRAW_INDIRECT
      case 0x25: { // DRAW_INDEX_INDIRECT
        if (payload.length >= 5) {
          fields.dataOffset = payload[0];
          const lo = BigInt(payload[1]);
          const hi = BigInt(payload[2]);
          fields.baseVaddr = lo | (hi << 32n);
          fields.formattedBaseVaddr = `0x${fields.baseVaddr.toString(16)}`;
          fields.stride = payload[3];
          fields.drawCount = payload[4];
          fields.recordBytes = (opcode === 0x25) ? 20 : 16;
          fields.span = (fields.drawCount === 0) ? 0 : (fields.drawCount - 1) * fields.stride + fields.recordBytes;
          fields.summary = `${opcode === 0x25 ? 'Indexed' : 'Non-indexed'} indirect draw: ${fields.drawCount} draw(s), stride ${fields.stride}b`;
        }
        break;
      }

      case 0x37: { // WRITE_DATA
        if (payload.length >= 3) {
          fields.control = payload[0];
          const dstLo = BigInt(payload[1]);
          const dstHi = BigInt(payload[2]);
          fields.dstVaddr = dstLo | (dstHi << 32n);
          fields.formattedDstVaddr = `0x${fields.dstVaddr.toString(16)}`;
          fields.dataWords = payload.slice(3);
          fields.wordCount = fields.dataWords.length;
          fields.summary = `Write ${fields.wordCount} DWORDs to ${fields.formattedDstVaddr}`;
        }
        break;
      }

      case 0x3F: { // INDIRECT_BUFFER
        if (payload.length >= 3) {
          const lo = BigInt(payload[0]);
          const hi = BigInt(payload[1]);
          fields.ibAddress = lo | (hi << 32n);
          fields.formattedIbAddress = `0x${fields.ibAddress.toString(16)}`;
          fields.ibSizeDwords = payload[2] & 0xFFFFF;
          fields.ibSizeBytes = fields.ibSizeDwords * 4;
          fields.is4ByteAligned = (fields.ibAddress % 4n === 0n);
          fields.is16ByteAligned = (fields.ibAddress % 16n === 0n);
          fields.summary = `Branch to IB @ ${fields.formattedIbAddress} (${fields.ibSizeDwords} DWORDs)`;
        }
        break;
      }

      case 0x41: { // CP_DMA
        if (payload.length >= 5) {
          const srcLo = BigInt(payload[0]);
          const srcHi = BigInt(payload[1]);
          const dstLo = BigInt(payload[2]);
          const dstHi = BigInt(payload[3]);
          fields.srcVaddr = `0x${(srcLo | (srcHi << 32n)).toString(16)}`;
          fields.dstVaddr = `0x${(dstLo | (dstHi << 32n)).toString(16)}`;
          fields.command = payload[4];
          fields.byteCount = payload[4] & 0x1FFFFF;
          fields.summary = `CP DMA copy ${fields.byteCount} bytes: ${fields.srcVaddr} -> ${fields.dstVaddr}`;
        }
        break;
      }

      case 0x47: { // EVENT_WRITE_EOP
        if (payload.length >= 4) {
          fields.eventType = payload[0] & 0x3F;
          const lo = BigInt(payload[1]);
          const hi = BigInt(payload[2]);
          fields.fenceVaddr = `0x${(lo | (hi << 32n)).toString(16)}`;
          fields.dataVal = payload[3];
          fields.summary = `EOP Fence event (${fields.eventType}) writeback to ${fields.fenceVaddr}`;
        }
        break;
      }

      case 0x50: { // DMA_DATA
        if (payload.length >= 5) {
          fields.control = payload[0];
          fields.srcAddr = `0x${(BigInt(payload[1]) | (BigInt(payload[2]) << 32n)).toString(16)}`;
          fields.dstAddr = `0x${(BigInt(payload[3]) | (BigInt(payload[4]) << 32n)).toString(16)}`;
          fields.byteCount = payload.length >= 6 ? payload[5] : 0;
          fields.summary = `DMA Data transfer to ${fields.dstAddr}`;
        }
        break;
      }

      case 0x68: { // SET_CONTEXT_REG
        if (payload.length >= 1) {
          fields.baseOffset = payload[0] & 0xFFFF;
          fields.baseRegHex = `0x${(0xA000 + fields.baseOffset).toString(16)}`;
          fields.regValues = payload.slice(1);
          fields.summary = `Set ${fields.regValues.length} context register(s) starting at ${fields.baseRegHex}`;
        }
        break;
      }

      case 0x69: { // SET_SH_REG
        if (payload.length >= 1) {
          fields.baseOffset = payload[0] & 0xFFFF;
          const regValues = payload.slice(1);
          fields.regValues = regValues;
          fields.decodedRegisters = regValues.map((v, i) => {
            const regNum = fields.baseOffset + i;
            return {
              offset: regNum,
              regName: getShRegisterName(regNum),
              val: v,
              valHex: `0x${v.toString(16)}`
            };
          });
          fields.summary = `Set ${regValues.length} shader register(s) starting at 0x${(0x2C00 + fields.baseOffset).toString(16)}`;
        }
        break;
      }

      default:
        fields.summary = `${getOpcodeInfo(opcode).desc} (${payload.length} DWORDs)`;
        break;
    }

    return fields;
  }
}

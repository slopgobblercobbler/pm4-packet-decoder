// js/ui.js - Reactive DOM rendering for PM4 Packet Decoder

export class UIRenderer {
  constructor(app) {
    this.app = app;
    this.elements = {};
    this.bindElements();
  }

  bindElements() {
    this.elements.statsTotal = document.getElementById("stats-total");
    this.elements.statsType3 = document.getElementById("stats-type3");
    this.elements.statsBytes = document.getElementById("stats-bytes");
    this.elements.statsAudit = document.getElementById("stats-audit");

    this.elements.packetList = document.getElementById("packet-list");
    this.elements.packetDetail = document.getElementById("packet-detail");
    this.elements.auditContainer = document.getElementById("audit-container");
    this.elements.hexContainer = document.getElementById("hex-container");
    this.elements.alertContainer = document.getElementById("alert-container");

    this.elements.packetSearch = document.getElementById("packet-search");
  }

  showAlert(message, type = "danger") {
    if (!this.elements.alertContainer) return;
    this.elements.alertContainer.innerHTML = `
      <div class="alert-box alert-${type}">
        <span>${escapeHtml(message)}</span>
      </div>
    `;
    this.elements.alertContainer.style.display = "block";
  }

  clearAlert() {
    if (!this.elements.alertContainer) return;
    this.elements.alertContainer.innerHTML = "";
    this.elements.alertContainer.style.display = "none";
  }

  renderTelemetry(packets, buffer, auditReport) {
    const total = packets ? packets.length : 0;
    const type3Count = packets ? packets.filter(p => p.type === 3).length : 0;
    const bytes = buffer ? buffer.byteLength : 0;

    this.elements.statsTotal.textContent = total;
    this.elements.statsType3.textContent = type3Count;
    this.elements.statsBytes.textContent = `${bytes.toLocaleString()} bytes`;

    if (auditReport) {
      const { overallScore, failCount, warnCount } = auditReport;
      if (overallScore === "PASS") {
        this.elements.statsAudit.textContent = "PASS (Bounds Clean)";
        this.elements.statsAudit.className = "stat-value ok";
      } else if (overallScore === "WARN") {
        this.elements.statsAudit.textContent = `${warnCount} Warning(s)`;
        this.elements.statsAudit.className = "stat-value warn";
      } else {
        this.elements.statsAudit.textContent = `${failCount} Violation(s)`;
        this.elements.statsAudit.className = "stat-value fail";
      }
    }
  }

  renderPacketList(packets) {
    if (!packets || packets.length === 0) {
      this.elements.packetList.innerHTML = "<p style='color: var(--text-muted); padding: 12px;'>No PM4 packets decoded.</p>";
      return;
    }

    const searchTerm = (this.elements.packetSearch?.value || "").toLowerCase();
    const filtered = packets.filter(p => {
      if (!searchTerm) return true;
      const text = `${p.typeName} ${p.opcodeInfo?.name || ''} 0x${p.startOffset.toString(16)} ${p.fields?.summary || ''}`.toLowerCase();
      return text.includes(searchTerm);
    });

    this.elements.packetList.innerHTML = filtered.map(p => {
      const isSelected = (this.app.selectedPacket === p);
      let badgeCls = "badge-type3";
      if (p.type === 0) badgeCls = "badge-type0";
      else if (p.type === 2) badgeCls = "badge-type2";

      const title = p.type === 3 ? `${p.opcodeInfo?.name} (0x${p.opcode.toString(16)})` : p.typeName;
      const subtitle = p.fields?.summary || p.opcodeInfo?.desc || `Count: ${p.count} DWORDs`;

      return `
        <div class="packet-item ${isSelected ? 'selected' : ''}" data-idx="${p.index}">
          <div class="packet-item-top">
            <span class="badge ${badgeCls}">${escapeHtml(title)}</span>
            <span class="packet-offset">0x${p.startOffset.toString(16)} - 0x${p.endOffset.toString(16)}</span>
          </div>
          <div style="font-size: 0.78rem; color: var(--text-secondary); font-family: var(--font-mono); margin-top: 4px;">
            ${escapeHtml(subtitle)}
          </div>
        </div>
      `;
    }).join("");

    // Bind click events
    const items = this.elements.packetList.querySelectorAll(".packet-item");
    items.forEach(item => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.getAttribute("data-idx"), 10);
        const p = packets.find(pkt => pkt.index === idx);
        if (p) this.app.selectPacket(p);
      });
    });
  }

  renderPacketDetail(packet) {
    if (!packet) {
      this.elements.packetDetail.innerHTML = "<p style='color: var(--text-muted);'>Select a packet to inspect fields.</p>";
      return;
    }

    let fieldsHtml = "";
    if (packet.fields?.decodedRegisters) {
      const regRows = packet.fields.decodedRegisters.map(r => {
        return `<div><strong style="color: var(--accent-blue);">${escapeHtml(r.regName)}:</strong> <span style="color: var(--accent-green); font-family: var(--font-mono);">${r.valHex}</span></div>`;
      }).join("");
      fieldsHtml = `<div class="prop-card" style="grid-column: 1 / -1;"><div class="prop-key">Shader User-Data Registers</div><div class="prop-val" style="display:flex; flex-direction:column; gap:4px; margin-top:6px;">${regRows}</div></div>`;
    } else if (packet.fields?.regWrites) {
      const regRows = packet.fields.regWrites.map(r => {
        return `<div><strong>Reg ${r.regHex}:</strong> <span style="color: var(--accent-green); font-family: var(--font-mono);">${r.valHex}</span></div>`;
      }).join("");
      fieldsHtml = `<div class="prop-card" style="grid-column: 1 / -1;"><div class="prop-key">Type 0 Register Writes</div><div class="prop-val" style="display:flex; flex-direction:column; gap:4px; margin-top:6px;">${regRows}</div></div>`;
    }

    const payloadWordsHex = (packet.payload || []).map((w, i) => `[${i}] 0x${w.toString(16).padStart(8, '0')}`).join("  ");

    this.elements.packetDetail.innerHTML = `
      <div class="detail-section">
        <div class="detail-title">
          <span>Packet #${packet.index}: ${escapeHtml(packet.type === 3 ? packet.opcodeInfo?.name : packet.typeName)}</span>
          <span class="badge">${packet.count} DWORDs (${packet.payload.length * 4}b)</span>
        </div>
        <div class="prop-grid">
          <div class="prop-card"><div class="prop-key">Packet Header Word</div><div class="prop-val" style="color: var(--accent-amd);">${packet.headerHex}</div></div>
          <div class="prop-card"><div class="prop-key">Packet Type</div><div class="prop-val">${packet.typeName}</div></div>
          ${packet.type === 3 ? `<div class="prop-card"><div class="prop-key">IT_OPCODE</div><div class="prop-val" style="color: #ff5a1f;">0x${packet.opcode.toString(16).toUpperCase()} (${packet.opcodeInfo?.name})</div></div>` : ''}
          ${packet.type === 3 ? `<div class="prop-card"><div class="prop-key">Predicate / Reserved</div><div class="prop-val">0x${packet.predicate.toString(16)}</div></div>` : ''}
          <div class="prop-card"><div class="prop-key">Stream Span</div><div class="prop-val">0x${packet.startOffset.toString(16)} .. 0x${packet.endOffset.toString(16)}</div></div>
          ${fieldsHtml}
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-title">Payload DWORDs (${packet.payload.length})</div>
        <div style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px; font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-secondary); word-break: break-all; line-height: 1.8;">
          ${payloadWordsHex || '(No payload words)'}
        </div>
      </div>
    `;
  }

  renderAuditor(report) {
    if (!report || !report.checks) {
      this.elements.auditContainer.innerHTML = "<p style='color: var(--text-muted);'>No audit report available.</p>";
      return;
    }

    const cardsHtml = report.checks.map(c => {
      const cls = c.status.toLowerCase();
      const badgeCls = `audit-${cls}`;
      const recHtml = c.recommendation ? `<div class="audit-recommendation"><strong>Fix:</strong> ${escapeHtml(c.recommendation)}</div>` : "";

      return `
        <div class="audit-card ${cls}">
          <div class="audit-header">
            <span class="audit-title">[${c.id}] ${escapeHtml(c.title)}</span>
            <span class="audit-badge ${badgeCls}">${c.status}</span>
          </div>
          <div class="audit-details">${escapeHtml(c.details)}</div>
          ${recHtml}
        </div>
      `;
    }).join("");

    this.elements.auditContainer.innerHTML = `
      <div style="margin-bottom: 14px;">
        <h3 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 4px;">AnyPS5 / AGC Driver PM4 Invariants Auditor</h3>
        <p style="font-size: 0.8rem; color: var(--text-muted);">
          Automated hardware CP rules validating Type-3 headers, indirect buffer alignment, shader user-data ranges, and indirect draw record strides.
        </p>
      </div>
      ${cardsHtml}
    `;
  }

  renderHexInspector(buffer, highlightRange = null) {
    if (!buffer || buffer.byteLength === 0) {
      this.elements.hexContainer.innerHTML = "<p style='color: var(--text-muted);'>No command buffer loaded.</p>";
      return;
    }

    const maxBytes = Math.min(buffer.byteLength, 4096);
    const rows = [];

    for (let i = 0; i < maxBytes; i += 16) {
      const chunk = buffer.subarray(i, Math.min(i + 16, maxBytes));
      const bytesHtml = [];
      let ascii = "";

      for (let j = 0; j < 16; j++) {
        if (j < chunk.length) {
          const byteOffset = i + j;
          const b = chunk[j];
          const isHl = highlightRange && byteOffset >= highlightRange.start && byteOffset < highlightRange.end;
          bytesHtml.push(`<span class="hex-byte ${isHl ? 'highlight' : ''}" data-offset="${byteOffset}">${b.toString(16).padStart(2, "0")}</span>`);
          ascii += (b >= 32 && b <= 126) ? String.fromCharCode(b) : ".";
        } else {
          bytesHtml.push(`<span class="hex-byte" style="opacity: 0.2;">..</span>`);
          ascii += " ";
        }
      }

      rows.push(`
        <div class="hex-row">
          <span class="hex-addr">0x${i.toString(16).padStart(6, "0")}</span>
          <div class="hex-bytes">${bytesHtml.join("")}</div>
          <span class="hex-ascii">${escapeHtml(ascii)}</span>
        </div>
      `);
    }

    if (buffer.byteLength > maxBytes) {
      rows.push(`<div style="padding: 8px; color: var(--text-muted); text-align: center;">... truncated remaining ${buffer.byteLength - maxBytes} bytes ...</div>`);
    }

    this.elements.hexContainer.innerHTML = rows.join("");

    if (highlightRange) {
      const el = this.elements.hexContainer.querySelector(`.hex-byte[data-offset="${highlightRange.start}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

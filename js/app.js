// js/app.js - Main client-side controller for PM4 Packet Decoder

import { Pm4Decoder } from "./pm4_decoder.js";
import { Pm4Auditor } from "./pm4_auditor.js";
import { SAMPLES, hexStringToBytes } from "./samples.js";
import { UIRenderer } from "./ui.js";

export class Pm4App {
  constructor() {
    this.currentBuffer = null;
    this.currentFileName = "";
    this.decoder = null;
    this.packets = [];
    this.errors = [];
    this.selectedPacket = null;
    this.auditReport = null;

    this.ui = new UIRenderer(this);
    this.initEventListeners();
  }

  initEventListeners() {
    // 1. Input Mode Switching
    const inputTabs = document.querySelectorAll(".input-tab");
    inputTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        inputTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const target = tab.getAttribute("data-input-mode");
        const dropContainer = document.getElementById("dropzone-container");
        const hexContainer = document.getElementById("hex-input-container");

        if (target === "file") {
          dropContainer.style.display = "block";
          hexContainer.style.display = "none";
        } else {
          dropContainer.style.display = "none";
          hexContainer.style.display = "flex";
        }
      });
    });

    // 2. Drag & Drop File Zone
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("file-input");

    if (dropzone && fileInput) {
      dropzone.addEventListener("click", () => fileInput.click());

      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
      });

      dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("dragover");
      });

      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.handleFile(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
          this.handleFile(e.target.files[0]);
        }
      });
    }

    // 3. Hex Controls
    const btnDecodeHex = document.getElementById("btn-decode-hex");
    const btnFormatHex = document.getElementById("btn-format-hex");
    const btnClearHex = document.getElementById("btn-clear-hex");
    const hexTextarea = document.getElementById("hex-textarea");

    if (btnDecodeHex && hexTextarea) {
      btnDecodeHex.addEventListener("click", () => {
        const hex = hexTextarea.value.trim();
        if (!hex) {
          this.ui.showAlert("Please enter hex bytes to decode.");
          return;
        }
        try {
          const bytes = hexStringToBytes(hex);
          this.loadBuffer(bytes, "Pasted Hex Stream");
        } catch (err) {
          this.ui.showAlert(`Hex decode error: ${err.message}`);
        }
      });
    }

    if (btnFormatHex && hexTextarea) {
      btnFormatHex.addEventListener("click", () => {
        try {
          const bytes = hexStringToBytes(hexTextarea.value);
          const lines = [];
          for (let i = 0; i < bytes.length; i += 16) {
            const chunk = Array.from(bytes.subarray(i, Math.min(i + 16, bytes.length)))
              .map(b => b.toString(16).padStart(2, "0"))
              .join(" ");
            lines.push(chunk);
          }
          hexTextarea.value = lines.join("\n");
        } catch (err) {
          this.ui.showAlert(`Format error: ${err.message}`);
        }
      });
    }

    if (btnClearHex && hexTextarea) {
      btnClearHex.addEventListener("click", () => {
        hexTextarea.value = "";
      });
    }

    // 4. Preset Select & Chips
    const sampleSelect = document.getElementById("sample-select");
    if (sampleSelect) {
      sampleSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val && SAMPLES[val]) this.loadSample(val);
      });
    }

    const chips = document.querySelectorAll(".chip[data-sample]");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        const sampleKey = chip.getAttribute("data-sample");
        if (SAMPLES[sampleKey]) {
          this.loadSample(sampleKey);
          if (sampleSelect) sampleSelect.value = sampleKey;
        }
      });
    });

    // 5. Packet Search Filter
    const packetSearch = document.getElementById("packet-search");
    if (packetSearch) {
      packetSearch.addEventListener("input", () => {
        this.ui.renderPacketList(this.packets);
      });
    }

    // 6. Export Actions
    const btnExportJson = document.getElementById("btn-export-json");
    const btnExportDisasm = document.getElementById("btn-export-disasm");

    if (btnExportJson) btnExportJson.addEventListener("click", () => this.exportJson());
    if (btnExportDisasm) btnExportDisasm.addEventListener("click", () => this.exportDisassembly());
  }

  handleFile(file) {
    this.ui.clearAlert();
    const reader = new FileReader();
    reader.onload = (e) => {
      const bytes = new Uint8Array(e.target.result);
      this.loadBuffer(bytes, file.name);
    };
    reader.onerror = () => {
      this.ui.showAlert(`Failed to read file: ${file.name}`);
    };
    reader.readAsArrayBuffer(file);
  }

  loadSample(sampleKey) {
    const sample = SAMPLES[sampleKey];
    if (!sample) return;
    const bytes = sample.generate();

    const hexTextarea = document.getElementById("hex-textarea");
    if (hexTextarea) {
      const lines = [];
      for (let i = 0; i < bytes.length; i += 16) {
        lines.push(Array.from(bytes.subarray(i, Math.min(i + 16, bytes.length)))
          .map(b => b.toString(16).padStart(2, "0"))
          .join(" "));
      }
      hexTextarea.value = lines.join("\n");
    }

    this.loadBuffer(bytes, sample.name);
  }

  loadBuffer(buffer, name = "") {
    this.ui.clearAlert();
    this.currentBuffer = buffer;
    this.currentFileName = name;

    const fileLabel = document.getElementById("file-info-label");
    if (fileLabel) {
      fileLabel.textContent = `${name} (${buffer.byteLength.toLocaleString()} bytes)`;
    }

    try {
      this.decoder = new Pm4Decoder(buffer);
      const res = this.decoder.decode();
      this.packets = res.packets;
      this.errors = res.errors;

      const auditor = new Pm4Auditor(this.packets, this.errors);
      this.auditReport = auditor.audit();

      this.selectedPacket = this.packets.length > 0 ? this.packets[0] : null;

      this.refreshViews();
    } catch (err) {
      this.ui.showAlert(`PM4 Decode Error: ${err.message}`);
    }
  }

  selectPacket(packet) {
    this.selectedPacket = packet;
    this.ui.renderPacketDetail(packet);

    if (packet) {
      this.ui.renderHexInspector(this.currentBuffer, {
        start: packet.startOffset,
        end: packet.endOffset
      });
    }

    // Update active highlight in list
    const items = document.querySelectorAll(".packet-item");
    items.forEach(item => item.classList.remove("selected"));
    const selectedItem = document.querySelector(`.packet-item[data-idx="${packet.index}"]`);
    if (selectedItem) selectedItem.classList.add("selected");
  }

  refreshViews() {
    this.ui.renderTelemetry(this.packets, this.currentBuffer, this.auditReport);
    this.ui.renderPacketList(this.packets);
    this.ui.renderPacketDetail(this.selectedPacket);
    this.ui.renderAuditor(this.auditReport);

    const highlightRange = this.selectedPacket
      ? { start: this.selectedPacket.startOffset, end: this.selectedPacket.endOffset }
      : null;
    this.ui.renderHexInspector(this.currentBuffer, highlightRange);
  }

  exportJson() {
    if (!this.packets || this.packets.length === 0) return;
    const blob = new Blob([JSON.stringify({
      fileName: this.currentFileName,
      packetCount: this.packets.length,
      packets: this.packets,
      auditReport: this.auditReport
    }, (k, v) => typeof v === 'bigint' ? v.toString() : v, 2)], { type: "application/json" });
    this.downloadBlob(blob, `pm4_stream_${Date.now()}.json`);
  }

  exportDisassembly() {
    if (!this.packets || this.packets.length === 0) return;
    let out = `PM4 Command Packet Disassembly\n`;
    out += `File: ${this.currentFileName} (${this.currentBuffer?.byteLength || 0} bytes)\n`;
    out += `Auditor Result: ${this.auditReport?.overallScore || 'N/A'}\n\n`;

    for (const p of this.packets) {
      const title = p.type === 3 ? `${p.opcodeInfo?.name} (0x${p.opcode.toString(16)})` : p.typeName;
      out += `[0x${p.startOffset.toString(16).padStart(6, '0')}] ${p.headerHex} | ${title.padEnd(24)} | ${p.fields?.summary || ''}\n`;
      if (p.payload.length > 0) {
        for (let i = 0; i < p.payload.length; i++) {
          out += `    +0x${((i + 1) * 4).toString(16).padStart(4, '0')}: 0x${p.payload[i].toString(16).padStart(8, '0')}\n`;
        }
      }
    }

    const blob = new Blob([out], { type: "text/plain" });
    this.downloadBlob(blob, `pm4_disassembly_${Date.now()}.txt`);
  }

  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const app = new Pm4App();
  // Auto-load Sample 1 on start
  app.loadSample("SAMPLE_1_INDEXED_DRAW");
  window.pm4App = app;
});

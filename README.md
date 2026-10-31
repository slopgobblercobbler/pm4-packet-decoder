# PM4 Packet Decoder & AnyPS5 AGC Auditor

[![Live Demo](https://img.shields.io/badge/demo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://slopgobblercobbler.github.io/pm4-packet-decoder/)
[![Tests](https://img.shields.io/badge/tests-7%2F7%20passing-success?style=for-the-badge)](https://github.com/slopgobblercobbler/pm4-packet-decoder/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

An interactive, production-grade, 100% client-side web application for inspecting, decoding, and disassembling AMD GCN / RDNA and Sony PlayStation (AGC) Command Processor (CP) PM4 packet streams, paired with a real-time AnyPS5 graphics driver bounds auditor.

Hosted live at: **[https://slopgobblercobbler.github.io/pm4-packet-decoder/](https://slopgobblercobbler.github.io/pm4-packet-decoder/)**

---

## Key Features

- **100% Client-Side Execution**: Runs entirely in the browser. Zero backend server dependencies or external uploads.
- **PM4 Stream Parser**:
  - **Type 0 Packets**: Decodes register writes (`base_reg`, DWORD count).
  - **Type 2 Packets**: Decodes single-DWORD NOP / padding markers.
  - **Type 3 Packets**: Decodes `IT_OPCODE` command packets with payload DWORD extraction:
    - `0x10 NOP`
    - `0x13 SET_BASE`
    - `0x15 / 0x3F INDIRECT_BUFFER`
    - `0x22 INDEX_TYPE`
    - `0x27 DRAW_INDEX_2`
    - `0x28 INDEX_OFFSET_2`
    - `0x2D DRAW_INDEX_AUTO`
    - `0x37 WRITE_DATA`
    - `0x40 COPY_DATA`
    - `0x46 EVENT_WRITE`
    - `0x47 EVENT_WRITE_EOP`
    - `0x50 CP_DMA / DMA_DATA`
    - `0x68 SET_CONTEXT_REG`
    - `0x69 SET_SH_REG`
    - `0x15 DISPATCH_DIRECT`
    - `0x16 DISPATCH_INDIRECT`
    - `0x24 DRAW_INDIRECT`
    - `0x25 DRAW_INDEX_INDIRECT`
- **AnyPS5 / AGC Driver Bounds Auditor**: Real-time validation checks modeled on AnyPS5 emulator kernel & graphics driver safety checks:
  - **Indirect Buffer Alignment**: Verifies `ib_address % 4 == 0` (4-byte alignment requirement).
  - **Indirect Buffer Size Sanity**: Rejects zero-sized indirect buffers.
  - **Indirect Draw Stride Validation**: Enforces `stride >= 16` for `DRAW_INDIRECT` and `stride >= 20` for `DRAW_INDEX_INDIRECT`.
  - **User-Data Register Range Auditing**: Inspects `SET_SH_REG` base registers to flag accesses inside PS5 / AGC shader user-data ranges (`0xC340..0xC347`).
  - **Truncation Detection**: Warns if a packet payload exceeds available stream boundaries.
  - **Zero-Packet Guard**: Detects null command streams.
- **Interactive UI & Visualizer**:
  - **Packet Stream Timeline**: Visual sequence of decoded packets color-coded by opcode type (Draw, Dispatch, Indirect Buffer, Context Reg, DMA, NOP).
  - **Detailed Field Breakdown**: Expandable header details, opcode names, DWORD offsets, raw DWORD values, and parsed arguments.
  - **Synchronized Hex Viewer**: 16-byte aligned hex view with ASCII pane and color-coded packet highlights.
  - **Real-Time Input Options**: Paste hex strings (with or without `0x`, comma, or whitespace delimiters) or upload raw binary `.bin` command buffer captures.
- **Disassembly & Export Engine**:
  - Export complete parsed stream as **JSON**.
  - Export human-readable **Disassembly text** (`.pm4` / `.txt`).

---

## Built-In Sample Presets

| Preset | Description |
|---|---|
| **Indexed Draw Sequence** | Typical render loop sequence: `NOP`, `INDEX_TYPE`, `SET_CONTEXT_REG`, `DRAW_INDEX_2`, and `EVENT_WRITE_EOP` |
| **Compute Dispatch Sequence** | Compute workload sequence: `SET_SH_REG` (configuring user-data registers `0xC340..0xC341`), `DISPATCH_DIRECT`, and `EVENT_WRITE` |
| **Indirect Buffer & DMA Transfer** | Asynchronous CP DMA transfer (`DMA_DATA`) followed by chained execution (`INDIRECT_BUFFER`) |
| **Corrupted Stream (Negative Audit)** | Unaligned indirect buffer address (`0x00000002`), invalid draw stride (`stride = 8`), and truncated packet header for negative bounds auditing |

---

## Architecture & Code Structure

```
pm4-packet-decoder/
├── index.html                    # Single-page web application markup
├── css/
│   └── style.css                 # Dark developer theme (AMD Radeon / AGC red & graphite accents)
├── js/
│   ├── binary_reader.js          # Bounds-checked Little-Endian byte & DWORD reader
│   ├── pm4_constants.js          # Packet header masks, IT_OPCODE definitions, and register tables
│   ├── pm4_decoder.js            # Core stream decoder (Type 0, Type 2, Type 3 packets)
│   ├── pm4_auditor.js            # AnyPS5 graphics driver bounds and safety auditor
│   ├── samples.js                # Built-in synthetic test vectors
│   ├── ui.js                     # DOM manipulation, timeline renderer, and hex dump
│   └── app.js                    # Application lifecycle, presets, and export controllers
├── test/
│   ├── pm4_decoder.test.js       # Packet parsing and header field tests
│   ├── pm4_auditor.test.js       # AnyPS5 driver bounds and alignment rejection tests
│   └── opcode_coverage.test.js   # Type 0/2/3 opcode lookup verification
├── .github/workflows/
│   └── deploy-pages.yml          # Automated CI test and GitHub Pages deployment workflow
├── package.json                  # Node.js test runner configuration
└── LICENSE                       # MIT License
```

---

## Local Development & Testing

Run unit tests locally using the Node.js test runner:

```bash
# Clone the repository
git clone https://github.com/slopgobblercobbler/pm4-packet-decoder.git
cd pm4-packet-decoder

# Run automated tests
npm test
```

To run the web app locally, open `index.html` in any modern web browser or serve via a local static web server:

```bash
npx serve .
# Or Python
python -m http.server 8080
```

---

## License

This project is licensed under the [MIT License](LICENSE).

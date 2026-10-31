// js/samples.js - Built-in synthetic PM4 command packet streams

export const SAMPLES = {
  SAMPLE_1_INDEXED_DRAW: {
    id: "sample_1",
    name: "Indexed Mesh Draw Call",
    description: "Sets Vertex Shader user-data registers (0xC340..0xC343), 32-bit index type, and auto-indexed draw call.",
    generate: createSample1IndexedDraw
  },
  SAMPLE_2_COMPUTE_DISPATCH: {
    id: "sample_2",
    name: "Compute Shader Dispatch Grid",
    description: "Configures Compute Shader user-data descriptors, dispatches [16, 16, 1] grid, and issues EOP fence.",
    generate: createSample2ComputeDispatch
  },
  SAMPLE_3_INDIRECT_BUFFER_DMA: {
    id: "sample_3",
    name: "Indirect Buffer (IB) & CP DMA",
    description: "Performs CP DMA memory block copy and branches to secondary command buffer with DWORD alignment.",
    generate: createSample3IndirectBufferDma
  },
  SAMPLE_4_CORRUPTED_STREAM: {
    id: "sample_4",
    name: "Corrupted Stream Bounds (Negative Control)",
    description: "Test vector containing unaligned IB branch (0x20000003), invalid indirect draw stride (8b < 20b), and truncated payload.",
    generate: createSample4CorruptedStream
  }
};

/**
 * Creates Type 3 header helper
 * @param {number} opcode - IT_OPCODE (8-bit)
 * @param {number} dwordCount - Number of DWORDs in payload
 * @returns {number}
 */
export function makeType3Header(opcode, dwordCount) {
  // bits [31:30] = 0b11 (3), bits [29:16] = count - 1, bits [15:8] = opcode
  return ((0x03 << 30) | (((dwordCount - 1) & 0x3FFF) << 16) | ((opcode & 0xFF) << 8)) >>> 0;
}

/**
 * Sample 1: Indexed Mesh Draw Call
 */
export function createSample1IndexedDraw() {
  const words = [
    // 1. SET_SH_REG (0x69): Base offset 0x9740 (0xC340 - 0x2C00), 4 user-data words
    makeType3Header(0x69, 5),
    0x9740,        // Base offset
    0x10002000,    // VS user-data 0 (Descriptor table low)
    0x00000001,    // VS user-data 1 (Descriptor table high)
    0x00000040,    // VS user-data 2 (Constant buffer index)
    0xDEADBEEF,    // VS user-data 3 (Push constants)

    // 2. INDEX_TYPE (0x22): 1 word (1 = 32-bit index)
    makeType3Header(0x22, 1),
    0x00000001,

    // 3. INDEX_OFFSET_2 (0x28): 1 word
    makeType3Header(0x28, 1),
    0x00000000,

    // 4. DRAW_INDEX_AUTO (0x2D): 2 words (144 indices, initiator)
    makeType3Header(0x2D, 2),
    144,           // indexCount
    0x00000001,    // drawInitiator

    // 5. Type 2 NOP (padding)
    (0x02 << 30) >>> 0
  ];

  return wordsToBytes(words);
}

/**
 * Sample 2: Compute Shader Dispatch Grid
 */
export function createSample2ComputeDispatch() {
  const words = [
    // 1. SET_SH_REG (0x69): CS user-data registers 0xC3C0..0xC3C1
    makeType3Header(0x69, 3),
    0x97C0,        // 0xC3C0 - 0x2C00
    0x20008000,    // CS descriptor table low
    0x00000001,    // CS descriptor table high

    // 2. DISPATCH_DIRECT (0x15): 3 words [dimX=16, dimY=16, dimZ=1]
    makeType3Header(0x15, 3),
    16, 16, 1,

    // 3. EVENT_WRITE_EOP (0x47): 4 words (flush and write fence)
    makeType3Header(0x47, 4),
    0x00000005,    // Event type: CACHE_FLUSH_AND_INV_TS_EVENT
    0x40001000,    // Fence address low
    0x00000001,    // Fence address high
    0xCAFEBABE     // Fence writeback value
  ];

  return wordsToBytes(words);
}

/**
 * Sample 3: Indirect Buffer & CP DMA
 */
export function createSample3IndirectBufferDma() {
  const words = [
    // 1. CP_DMA (0x41): 5 words
    makeType3Header(0x41, 5),
    0x10001000,    // src low
    0x00000001,    // src high
    0x20001000,    // dst low
    0x00000001,    // dst high
    0x00001000,    // 4096 bytes copy

    // 2. INDIRECT_BUFFER (0x3F): 3 words
    makeType3Header(0x3F, 3),
    0x20000000,    // Base low (4-byte aligned!)
    0x00000001,    // Base high
    0x00000200,    // 512 DWORDs

    // 3. NOP (0x10): 2 words
    makeType3Header(0x10, 2),
    0x12345678,
    0x9ABCDEF0
  ];

  return wordsToBytes(words);
}

/**
 * Sample 4: Corrupted Stream Bounds (Negative Control)
 */
export function createSample4CorruptedStream() {
  const words = [
    // 1. INDIRECT_BUFFER with unaligned address (0x20000003 - not 4-byte aligned!)
    makeType3Header(0x3F, 3),
    0x20000003,    // Unaligned address!
    0x00000001,
    0x00000100,

    // 2. DRAW_INDEX_INDIRECT (0x25) with illegal stride (8 bytes < 20 bytes record size)
    makeType3Header(0x25, 5),
    0x00000000,    // data offset
    0x30000000,    // base vaddr low
    0x00000001,    // base vaddr high
    8,             // Stride: 8 bytes (ILLEGAL: record size is 20 bytes!)
    4,             // draw count

    // 3. Truncated packet: Header specifies 8 DWORDs, but only 2 DWORDs follow!
    makeType3Header(0x10, 8),
    0x11111111,
    0x22222222
  ];

  return wordsToBytes(words);
}

export function wordsToBytes(words) {
  const buffer = new Uint8Array(words.length * 4);
  const view = new DataView(buffer.buffer);
  for (let i = 0; i < words.length; i++) {
    view.setUint32(i * 4, words[i] >>> 0, true);
  }
  return buffer;
}

export function hexStringToBytes(hexString) {
  const cleanHex = hexString
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "")
    .replace(/0[xX]/g, "")
    .replace(/[^0-9a-fA-F]/g, "");
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Invalid hex string length: must have an even number of hex characters");
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
  }
  return bytes;
}

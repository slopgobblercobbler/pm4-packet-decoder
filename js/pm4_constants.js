// js/pm4_constants.js - AMD GCN / RDNA & PlayStation AGC PM4 Command Packet Constants

export const PACKET_TYPES = {
  0: "TYPE_0 (Register Write)",
  1: "TYPE_1 (Legacy Reserved)",
  2: "TYPE_2 (NOP / Padding)",
  3: "TYPE_3 (Command / IT_OPCODE)"
};

export const IT_OPCODES = {
  0x10: { name: "NOP", desc: "No-operation / padding" },
  0x11: { name: "SET_BASE", desc: "Set base address for subsequent commands" },
  0x12: { name: "CLEAR_STATE", desc: "Clear context states" },
  0x13: { name: "INDEX_BUFFER_SIZE", desc: "Declare bound index buffer capacity" },
  0x15: { name: "DISPATCH_DIRECT", desc: "Compute grid direct dispatch" },
  0x16: { name: "DISPATCH_INDIRECT", desc: "Compute grid indirect dispatch from buffer" },
  0x20: { name: "OCCLUSION_QUERY", desc: "Issue occlusion query writeback" },
  0x22: { name: "INDEX_TYPE", desc: "Set index buffer element format (16-bit / 32-bit)" },
  0x24: { name: "DRAW_INDIRECT", desc: "Non-indexed indirect draw from buffer" },
  0x25: { name: "DRAW_INDEX_INDIRECT", desc: "Indexed indirect draw from buffer" },
  0x27: { name: "DRAW_INDEX_2", desc: "Indexed draw call with maximum index limit" },
  0x28: { name: "INDEX_OFFSET_2", desc: "Set index offset for indexed draws" },
  0x2C: { name: "DRAW_INDIRECT_MULTI", desc: "Multi-record non-indexed indirect draw" },
  0x2D: { name: "DRAW_INDEX_AUTO", desc: "Auto-indexed draw call" },
  0x37: { name: "WRITE_DATA", desc: "Write immediate 32-bit data to memory or register" },
  0x38: { name: "DRAW_INDEX_INDIRECT_MULTI", desc: "Multi-record indexed indirect draw" },
  0x3F: { name: "INDIRECT_BUFFER", desc: "Branch to secondary command buffer (IB)" },
  0x40: { name: "COPY_DATA", desc: "Copy 32-bit or 64-bit data between memory and registers" },
  0x41: { name: "CP_DMA", desc: "Command processor memory DMA transfer" },
  0x43: { name: "SURFACE_SYNC", desc: "Flush and invalidate caches" },
  0x46: { name: "EVENT_WRITE", desc: "Generate GPU pipeline event" },
  0x47: { name: "EVENT_WRITE_EOP", desc: "End-of-pipe event with fence writeback" },
  0x48: { name: "EVENT_WRITE_EOS", desc: "End-of-shader event with timestamp writeback" },
  0x50: { name: "DMA_DATA", desc: "Direct Memory Access (DMA) block copy" },
  0x58: { name: "ACQUIRE_MEM", desc: "Memory synchronization barrier" },
  0x68: { name: "SET_CONTEXT_REG", desc: "Set context register state (base 0xA000)" },
  0x69: { name: "SET_SH_REG", desc: "Set shader persistent register (base 0x2C00, User Data 0xC340..0xC347)" },
  0x6A: { name: "SET_UCONFIG_REG", desc: "Set user configuration register" },
  0x76: { name: "SET_CONFIG_REG", desc: "Set configuration register (base 0x2000)" }
};

export const SH_REGISTERS = {
  0xC340: "SPI_SHADER_USER_DATA_VS_0",
  0xC341: "SPI_SHADER_USER_DATA_VS_1",
  0xC342: "SPI_SHADER_USER_DATA_VS_2",
  0xC343: "SPI_SHADER_USER_DATA_VS_3",
  0xC344: "SPI_SHADER_USER_DATA_VS_4",
  0xC345: "SPI_SHADER_USER_DATA_VS_5",
  0xC346: "SPI_SHADER_USER_DATA_VS_6",
  0xC347: "SPI_SHADER_USER_DATA_VS_7",
  0xC380: "SPI_SHADER_USER_DATA_PS_0",
  0xC381: "SPI_SHADER_USER_DATA_PS_1",
  0xC3C0: "SPI_SHADER_USER_DATA_CS_0",
  0xC3C1: "SPI_SHADER_USER_DATA_CS_1"
};

export function getOpcodeInfo(opcode) {
  return IT_OPCODES[opcode] || { name: `UNKNOWN_0x${opcode.toString(16).toUpperCase()}`, desc: "Unknown PM4 opcode" };
}

export function getShRegisterName(regOffset) {
  const fullReg = 0x2C00 + regOffset;
  if (SH_REGISTERS[fullReg]) {
    return `${SH_REGISTERS[fullReg]} (0x${fullReg.toString(16)})`;
  }
  return `SH_REG_0x${fullReg.toString(16)}`;
}

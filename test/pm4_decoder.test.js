// test/pm4_decoder.test.js
import test from "node:test";
import assert from "node:assert/strict";
import { Pm4Decoder } from "../js/pm4_decoder.js";
import { SAMPLES } from "../js/samples.js";

test("Pm4Decoder decodes Sample 1 Indexed Draw call packet stream", () => {
  const bytes = SAMPLES.SAMPLE_1_INDEXED_DRAW.generate();
  const decoder = new Pm4Decoder(bytes);
  const result = decoder.decode();

  assert.equal(result.errors.length, 0);
  assert.equal(result.packets.length, 5);

  // Packet 0: SET_SH_REG (0x69)
  const p0 = result.packets[0];
  assert.equal(p0.type, 3);
  assert.equal(p0.opcode, 0x69);
  assert.equal(p0.opcodeInfo.name, "SET_SH_REG");
  assert.equal(p0.count, 5);
  assert.equal(p0.fields.decodedRegisters.length, 4);

  // Packet 1: INDEX_TYPE (0x22)
  const p1 = result.packets[1];
  assert.equal(p1.opcode, 0x22);
  assert.equal(p1.fields.indexType, "32-bit (UINT32)");

  // Packet 3: DRAW_INDEX_AUTO (0x2D)
  const p3 = result.packets[3];
  assert.equal(p3.opcode, 0x2D);
  assert.equal(p3.fields.indexCount, 144);

  // Packet 4: Type 2 NOP
  const p4 = result.packets[4];
  assert.equal(p4.type, 2);
  assert.equal(p4.typeName, "TYPE_2 (NOP)");
});

test("Pm4Decoder decodes Sample 2 Compute Dispatch grid", () => {
  const bytes = SAMPLES.SAMPLE_2_COMPUTE_DISPATCH.generate();
  const decoder = new Pm4Decoder(bytes);
  const result = decoder.decode();

  assert.equal(result.errors.length, 0);
  assert.equal(result.packets.length, 3);

  // DISPATCH_DIRECT
  const disp = result.packets[1];
  assert.equal(disp.opcode, 0x15);
  assert.equal(disp.fields.dimX, 16);
  assert.equal(disp.fields.dimY, 16);
  assert.equal(disp.fields.dimZ, 1);
  assert.equal(disp.fields.totalThreads, 256);

  // EVENT_WRITE_EOP
  const eop = result.packets[2];
  assert.equal(eop.opcode, 0x47);
  assert.equal(eop.fields.eventType, 5);
});

test("Pm4Decoder decodes Type 0 register write packets", () => {
  // Type 0 header: [31:30]=00, count=2 (count-1=1 in bits 29:16), baseReg=0x2000
  // (1 << 16) | 0x2000 = 0x00012000
  const words = new Uint32Array([
    0x00012000,
    0xAABBCCDD,
    0x11223344
  ]);
  const decoder = new Pm4Decoder(new Uint8Array(words.buffer));
  const result = decoder.decode();

  assert.equal(result.packets.length, 1);
  const p0 = result.packets[0];
  assert.equal(p0.type, 0);
  assert.equal(p0.baseReg, 0x2000);
  assert.equal(p0.regWrites.length, 2);
  assert.equal(p0.regWrites[0].reg, 0x2000);
  assert.equal(p0.regWrites[0].val, 0xAABBCCDD);
  assert.equal(p0.regWrites[1].reg, 0x2001);
  assert.equal(p0.regWrites[1].val, 0x11223344);
});

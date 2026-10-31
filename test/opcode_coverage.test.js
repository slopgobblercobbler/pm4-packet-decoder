// test/opcode_coverage.test.js
import test from "node:test";
import assert from "node:assert/strict";
import { Pm4Decoder } from "../js/pm4_decoder.js";
import { makeType3Header, wordsToBytes, hexStringToBytes } from "../js/samples.js";

test("Pm4Decoder decodes WRITE_DATA (0x37) and CP_DMA (0x41)", () => {
  const words = [
    // WRITE_DATA: control 0, dst 0x40001000, 2 words (0xAA, 0xBB)
    makeType3Header(0x37, 5),
    0x00000000,
    0x40001000,
    0x00000001,
    0x000000AA,
    0x000000BB,

    // CP_DMA: src, dst, 1024 bytes
    makeType3Header(0x41, 5),
    0x10000000, 0x00000001,
    0x20000000, 0x00000001,
    1024
  ];

  const decoder = new Pm4Decoder(wordsToBytes(words));
  const res = decoder.decode();

  assert.equal(res.packets.length, 2);
  const writeData = res.packets[0];
  assert.equal(writeData.opcode, 0x37);
  assert.equal(writeData.fields.wordCount, 2);

  const cpDma = res.packets[1];
  assert.equal(cpDma.opcode, 0x41);
  assert.equal(cpDma.fields.byteCount, 1024);
});

test("hexStringToBytes strips C arrays and invalid characters", () => {
  const bytes = hexStringToBytes("0xC0, 0x02, 0x69, 0x00 // comment\n 0x40, 0x97");
  assert.equal(bytes.length, 6);
  assert.equal(bytes[0], 0xC0);
  assert.equal(bytes[1], 0x02);
  assert.equal(bytes[2], 0x69);
});

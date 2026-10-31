// test/pm4_auditor.test.js
import test from "node:test";
import assert from "node:assert/strict";
import { Pm4Decoder } from "../js/pm4_decoder.js";
import { Pm4Auditor } from "../js/pm4_auditor.js";
import { SAMPLES } from "../js/samples.js";

test("Pm4Auditor passes clean command streams (Sample 1 & 3)", () => {
  const bytes1 = SAMPLES.SAMPLE_1_INDEXED_DRAW.generate();
  const decoder1 = new Pm4Decoder(bytes1);
  const res1 = decoder1.decode();
  const auditor1 = new Pm4Auditor(res1.packets, res1.errors);
  const rep1 = auditor1.audit();

  assert.equal(rep1.overallScore, "PASS");
  assert.equal(rep1.failCount, 0);

  const bytes3 = SAMPLES.SAMPLE_3_INDIRECT_BUFFER_DMA.generate();
  const decoder3 = new Pm4Decoder(bytes3);
  const res3 = decoder3.decode();
  const auditor3 = new Pm4Auditor(res3.packets, res3.errors);
  const rep3 = auditor3.audit();

  assert.equal(rep3.overallScore, "PASS");
  assert.equal(rep3.failCount, 0);
  const ibCheck = rep3.checks.find(c => c.id === "PM4-AUDIT-003");
  assert.ok(ibCheck);
  assert.equal(ibCheck.status, "PASS");
});

test("Pm4Auditor catches unaligned IB, illegal stride, and payload truncation (Sample 4)", () => {
  const bytes4 = SAMPLES.SAMPLE_4_CORRUPTED_STREAM.generate();
  const decoder4 = new Pm4Decoder(bytes4);
  const res4 = decoder4.decode();
  const auditor4 = new Pm4Auditor(res4.packets, res4.errors);
  const rep4 = auditor4.audit();

  assert.equal(rep4.overallScore, "FAIL");
  assert.ok(rep4.failCount >= 2);

  // Check 1: Ring buffer overrun / truncation
  const check1 = rep4.checks.find(c => c.id === "PM4-AUDIT-001");
  assert.ok(check1);
  assert.equal(check1.status, "FAIL");

  // Check 3: IB unaligned address (0x20000003)
  const check3 = rep4.checks.find(c => c.id === "PM4-AUDIT-003");
  assert.ok(check3);
  assert.equal(check3.status, "FAIL");
  assert.match(check3.details, /is not 4-byte aligned/);

  // Check 5: Stride 8 < 20 bytes
  const check5 = rep4.checks.find(c => c.id === "PM4-AUDIT-005");
  assert.ok(check5);
  assert.equal(check5.status, "FAIL");
  assert.match(check5.details, /smaller than record size/);
});

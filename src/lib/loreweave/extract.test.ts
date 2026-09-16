import assert from "node:assert/strict";
import test from "node:test";
import { extractCharacterProposal, mergeProfile } from "./extract.ts";

test("extractCharacterProposal reads a stated age", () => {
  const p = extractCharacterProposal("Mara Keel is 29 years old and stubborn in the fog.");
  assert.equal(p.age, "29");
  assert.equal(p.locked, false);
});

test("mergeProfile never overwrites a locked record", () => {
  const locked = extractCharacterProposal("Holt is 44 years old.");
  locked.locked = true;
  locked.age = "44";
  const proposed = extractCharacterProposal("Holt is 12 years old.");
  const merged = mergeProfile(locked, proposed);
  assert.equal(merged.age, "44");
});

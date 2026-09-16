import assert from "node:assert/strict";
import test from "node:test";
import { analyzeStoryDna } from "./story-dna.ts";

test("analyzeStoryDna returns bounded densities and guidance", () => {
  const dna = analyzeStoryDna(
    `"You're early," said Holt. Mara ran. She feared the dark water and the grief it kept. Then she grabbed the rail.`,
  );
  assert.equal(dna.wordCount > 10, true);
  assert.equal(dna.dialogueDensity >= 0 && dna.dialogueDensity <= 1, true);
  assert.equal(dna.guidance.includes("living author's style"), true);
});

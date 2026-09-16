import assert from "node:assert/strict";
import test from "node:test";
import { compilePrompt, listVariables, truncateContext } from "./prompt-engine.ts";

test("compilePrompt substitutes variables", () => {
  const out = compilePrompt("Hello {{name}}", { name: "Mara" });
  assert.equal(out, "Hello Mara");
});

test("compilePrompt marks missing variables", () => {
  const out = compilePrompt("X {{missing}}", {});
  assert.equal(out.includes("not provided"), true);
});

test("listVariables finds unique keys", () => {
  assert.deepEqual(listVariables("{{a}} {{b}} {{a}}"), ["a", "b"]);
});

test("truncateContext keeps head and tail", () => {
  const text = "A".repeat(100) + "MID" + "B".repeat(100);
  const out = truncateContext(text, 80);
  assert.equal(out.includes("truncated"), true);
  assert.equal(out.startsWith("A"), true);
  assert.equal(out.endsWith("B"), true);
});

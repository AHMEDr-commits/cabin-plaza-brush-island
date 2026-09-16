import assert from "node:assert/strict";
import test from "node:test";
import { BUILT_IN_PROVIDERS, makeBuiltInAccount, pickKey } from "./providers.ts";

test("built-in catalog covers the advertised adapters", () => {
  const kinds = BUILT_IN_PROVIDERS.map((p) => p.kind);
  for (const k of ["openai", "anthropic", "google", "openrouter", "groq", "xai", "ollama"]) {
    assert.equal(kinds.includes(k), true);
  }
});

test("pickKey uses the first enabled secret", () => {
  const p = makeBuiltInAccount("openai");
  p.keys = [
    { id: "1", label: "a", secret: "", enabled: true },
    { id: "2", label: "b", secret: "sk-test", enabled: true },
  ];
  assert.equal(pickKey(p), "sk-test");
});

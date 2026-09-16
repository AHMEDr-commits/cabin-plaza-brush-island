import assert from "node:assert/strict";
import test from "node:test";
import { classifyProviderError, maskKey, sanitizeLog } from "./key-security.ts";

test("maskKey hides the stem and keeps a short tail", () => {
  const masked = maskKey("sk-abcdefghijklmnopqrstuvwxyz");
  assert.equal(masked.endsWith("wxyz"), true);
  assert.equal(masked.includes("sk-abcd"), false);
  assert.equal(maskKey("").length, 0);
});

test("sanitizeLog redacts key-like tokens", () => {
  const out = sanitizeLog("failed sk-abcdefghijklmnopqrstuvwxyz boom");
  assert.equal(out.includes("sk-abcdefgh"), false);
  assert.equal(out.includes("[redacted-key]"), true);
});

test("classifyProviderError maps status codes", () => {
  assert.equal(classifyProviderError(401, "").code, "invalid_key");
  assert.equal(classifyProviderError(429, "").code, "rate_limit");
  assert.equal(classifyProviderError(500, "").code, "provider_outage");
  assert.equal(classifyProviderError(413, "too many tokens").code, "context_too_large");
});

export function maskKey(secret) {
  if (!secret) return "";
  if (secret.length <= 4) return "•".repeat(secret.length);
  return `${"•".repeat(Math.min(18, secret.length - 4))}${secret.slice(-4)}`;
}

export function sanitizeLog(value) {
  return String(value).replace(
    /(sk-[A-Za-z0-9_-]{8,}|AIza[A-Za-z0-9_-]{8,}|xai-[A-Za-z0-9_-]{8,}|gsk_[A-Za-z0-9_-]{8,})/g,
    "[redacted-key]",
  );
}

export function classify(status, body) {
  const safe = sanitizeLog(body).slice(0, 240);
  if (status === 401 || status === 403) return { code: "invalid_key", message: "API key rejected." };
  if (status === 429) return { code: "rate_limit", message: "Rate limited. Wait or switch keys." };
  if (status === 404) return { code: "unsupported_model", message: "Model not available on this endpoint." };
  if (status >= 500) return { code: "provider_outage", message: "Provider is having trouble." };
  if (status === 413 || /too many tokens|context/i.test(body)) {
    return { code: "context_too_large", message: "Prompt too large for this model." };
  }
  return { code: "provider_error", message: safe || "Unexpected provider response." };
}

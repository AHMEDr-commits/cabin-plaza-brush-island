const REVEAL_TAIL = 4;

export function maskKey(secret: string): string {
  if (!secret) return "";
  const trimmed = secret.trim();
  if (trimmed.length <= REVEAL_TAIL) return "•".repeat(trimmed.length);
  const tail = trimmed.slice(-REVEAL_TAIL);
  return `${"•".repeat(Math.min(18, trimmed.length - REVEAL_TAIL))}${tail}`;
}

export function looksLikeKey(value: string): boolean {
  return /sk-|AIza|xai-|gsk_|pplx-|key-|r8_|ollama/i.test(value) || value.length > 24;
}

export function sanitizeLog(value: string): string {
  return value.replace(
    /(sk-[A-Za-z0-9_-]{8,}|AIza[A-Za-z0-9_-]{8,}|xai-[A-Za-z0-9_-]{8,}|gsk_[A-Za-z0-9_-]{8,})/g,
    "[redacted-key]",
  );
}

export function classifyProviderError(status: number, body: string): {
  code: string;
  message: string;
} {
  const safe = sanitizeLog(body).slice(0, 280);
  if (status === 401 || status === 403) {
    return {
      code: "invalid_key",
      message: "This API key was rejected. Check the key, billing, and model access.",
    };
  }
  if (status === 429) {
    return {
      code: "rate_limit",
      message: "The provider rate-limited this key. Wait, switch keys, or use a fallback model.",
    };
  }
  if (status === 404) {
    return {
      code: "unsupported_model",
      message: "That model is not available on this provider or endpoint.",
    };
  }
  if (status >= 500) {
    return {
      code: "provider_outage",
      message: "The provider is having trouble. Try again or use a fallback.",
    };
  }
  if (status === 413 || /context|too many tokens|maximum/i.test(body)) {
    return {
      code: "context_too_large",
      message: "The prompt is too large for this model. Truncate context or pick a long-context model.",
    };
  }
  return {
    code: "provider_error",
    message: safe || "The provider returned an unexpected response.",
  };
}

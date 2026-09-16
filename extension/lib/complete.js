import { classify, sanitizeLog } from "./security.js";

export async function complete({ format, baseUrl, apiKey, model, messages, temperature = 0.7, maxTokens = 2048, headers = {} }) {
  try {
    if (format === "anthropic") return await anthropic({ baseUrl, apiKey, model, messages, temperature, maxTokens, headers });
    if (format === "gemini") return await gemini({ baseUrl, apiKey, model, messages, temperature, maxTokens, headers });
    if (format === "ollama") return await ollama({ baseUrl, model, messages, temperature, headers });
    return await openai({ baseUrl, apiKey, model, messages, temperature, maxTokens, headers });
  } catch (err) {
    return { ok: false, code: "network", error: sanitizeLog(err.message || "Network failure") };
  }
}

function fail(status, raw) {
  const c = classify(status, raw);
  return { ok: false, code: c.code, error: c.message };
}

async function openai({ baseUrl, apiKey, model, messages, temperature, maxTokens, headers }) {
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}`, ...headers },
    body: JSON.stringify({ model, messages, temperature, max_tokens: maxTokens }),
  });
  const raw = await res.text();
  if (!res.ok) return fail(res.status, raw);
  const body = JSON.parse(raw);
  const text = body.choices?.[0]?.message?.content;
  if (!text) return { ok: false, code: "invalid_response", error: "Empty model response." };
  return { ok: true, text, model };
}

async function anthropic({ baseUrl, apiKey, model, messages, temperature, maxTokens, headers }) {
  const system = messages.filter((m) => m.role === "system").map((m) => m.content).join("\n");
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      ...headers,
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      temperature,
      system: system || undefined,
      messages: messages.filter((m) => m.role !== "system"),
    }),
  });
  const raw = await res.text();
  if (!res.ok) return fail(res.status, raw);
  const body = JSON.parse(raw);
  const text = (body.content || []).map((c) => c.text || "").join("");
  if (!text) return { ok: false, code: "invalid_response", error: "Empty model response." };
  return { ok: true, text, model };
}

async function gemini({ baseUrl, apiKey, model, messages, temperature, maxTokens, headers }) {
  const url = `${baseUrl.replace(/\/$/, "")}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const system = messages.filter((m) => m.role === "system").map((m) => m.content).join("\n");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({
      contents: messages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
      systemInstruction: system ? { parts: [{ text: system }] } : undefined,
      generationConfig: { temperature, maxOutputTokens: maxTokens },
    }),
  });
  const raw = await res.text();
  if (!res.ok) return fail(res.status, raw);
  const body = JSON.parse(raw);
  const text = body.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
  if (!text) return { ok: false, code: "invalid_response", error: "Empty model response." };
  return { ok: true, text, model };
}

async function ollama({ baseUrl, model, messages, temperature, headers }) {
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({ model, messages, stream: false, options: { temperature } }),
  });
  const raw = await res.text();
  if (!res.ok) return fail(res.status, raw);
  const body = JSON.parse(raw);
  const text = body.message?.content || "";
  if (!text) return { ok: false, code: "invalid_response", error: "Empty model response." };
  return { ok: true, text, model };
}

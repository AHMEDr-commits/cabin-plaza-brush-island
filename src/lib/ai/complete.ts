import { createServerFn } from "@tanstack/react-start";
import { DEMO_DAILY_LIMIT, DEMO_MAX_TOKENS } from "../loreweave/config";
import { classifyProviderError, sanitizeLog } from "../loreweave/key-security";

export interface CompleteInput {
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  format: "openai" | "anthropic" | "gemini" | "ollama";
  baseUrl: string;
  model: string;
  apiKey?: string;
  temperature?: number;
  maxTokens?: number;
  headers?: Record<string, string>;
  demo?: boolean;
}

export interface CompleteResult {
  ok: boolean;
  text?: string;
  error?: string;
  code?: string;
  demo?: boolean;
  provider?: string;
  model?: string;
}

const demoHits = new Map<string, { day: string; count: number }>();

function dayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function demoAllowed(ip: string): boolean {
  const day = dayKey();
  const cur = demoHits.get(ip);
  if (!cur || cur.day !== day) {
    demoHits.set(ip, { day, count: 1 });
    return true;
  }
  if (cur.count >= DEMO_DAILY_LIMIT) return false;
  cur.count += 1;
  return true;
}

function fail(status: number, raw: string): CompleteResult {
  const classified = classifyProviderError(status, raw);
  return { ok: false, code: classified.code, error: classified.message };
}

export const completeChat = createServerFn({ method: "POST" })
  .validator((input: CompleteInput) => input)
  .handler(async ({ data }): Promise<CompleteResult> => {
    try {
      if (data.demo || !data.apiKey) {
        const key = process.env.XAI_API_KEY;
        if (!key) {
          return {
            ok: false,
            code: "no_provider",
            error: "Add your own API key in Providers. Demo AI is not configured here.",
          };
        }
        if (!demoAllowed("preview")) {
          return {
            ok: false,
            code: "rate_limit",
            error: "Demo daily limit reached. Add your own key for unlimited BYOK use.",
          };
        }
        const result = await openaiCompat({
          baseUrl: "https://api.x.ai/v1",
          apiKey: key,
          model: "grok-4.5",
          messages: data.messages,
          temperature: data.temperature ?? 0.7,
          maxTokens: Math.min(data.maxTokens ?? DEMO_MAX_TOKENS, DEMO_MAX_TOKENS),
        });
        return { ...result, demo: true };
      }

      if (data.format === "anthropic") return await anthropicCompat(data);
      if (data.format === "gemini") return await geminiCompat(data);
      if (data.format === "ollama") return await ollamaCompat(data);
      return await openaiCompat({
        baseUrl: data.baseUrl.replace(/\/$/, ""),
        apiKey: data.apiKey,
        model: data.model,
        messages: data.messages,
        temperature: data.temperature ?? 0.7,
        maxTokens: data.maxTokens ?? 2048,
        headers: data.headers,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network failure talking to the provider.";
      return { ok: false, code: "network", error: sanitizeLog(message) };
    }
  });

async function openaiCompat(opts: {
  baseUrl: string;
  apiKey: string;
  model: string;
  messages: CompleteInput["messages"];
  temperature: number;
  maxTokens: number;
  headers?: Record<string, string>;
}): Promise<CompleteResult> {
  const res = await fetch(`${opts.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${opts.apiKey}`,
      ...opts.headers,
    },
    body: JSON.stringify({
      model: opts.model,
      messages: opts.messages,
      temperature: opts.temperature,
      max_tokens: opts.maxTokens,
    }),
  });
  const raw = await res.text();
  if (!res.ok) return fail(res.status, raw);
  let body: { choices?: { message?: { content?: string } }[] };
  try {
    body = JSON.parse(raw) as typeof body;
  } catch {
    return { ok: false, code: "invalid_response", error: "Provider returned non-JSON." };
  }
  const text = body.choices?.[0]?.message?.content ?? "";
  if (!text) return { ok: false, code: "invalid_response", error: "Empty model response." };
  return { ok: true, text, model: opts.model };
}

async function anthropicCompat(data: CompleteInput): Promise<CompleteResult> {
  const system = data.messages.filter((m) => m.role === "system").map((m) => m.content).join("\n");
  const messages = data.messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }));
  const res = await fetch(`${data.baseUrl.replace(/\/$/, "")}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": data.apiKey ?? "",
      "anthropic-version": "2023-06-01",
      ...data.headers,
    },
    body: JSON.stringify({
      model: data.model,
      max_tokens: data.maxTokens ?? 2048,
      temperature: data.temperature ?? 0.7,
      system: system || undefined,
      messages,
    }),
  });
  const raw = await res.text();
  if (!res.ok) return fail(res.status, raw);
  try {
    const body = JSON.parse(raw) as { content?: { text?: string }[] };
    const text = (body.content ?? []).map((c) => c.text ?? "").join("");
    if (!text) return { ok: false, code: "invalid_response", error: "Empty model response." };
    return { ok: true, text, model: data.model };
  } catch {
    return { ok: false, code: "invalid_response", error: "Provider returned non-JSON." };
  }
}

async function geminiCompat(data: CompleteInput): Promise<CompleteResult> {
  const url = `${data.baseUrl.replace(/\/$/, "")}/models/${encodeURIComponent(data.model)}:generateContent?key=${encodeURIComponent(data.apiKey ?? "")}`;
  const contents = data.messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
  const system = data.messages.filter((m) => m.role === "system").map((m) => m.content).join("\n");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...data.headers },
    body: JSON.stringify({
      contents,
      systemInstruction: system ? { parts: [{ text: system }] } : undefined,
      generationConfig: {
        temperature: data.temperature ?? 0.7,
        maxOutputTokens: data.maxTokens ?? 2048,
      },
    }),
  });
  const raw = await res.text();
  if (!res.ok) return fail(res.status, raw);
  try {
    const body = JSON.parse(raw) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = body.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
    if (!text) return { ok: false, code: "invalid_response", error: "Empty model response." };
    return { ok: true, text, model: data.model };
  } catch {
    return { ok: false, code: "invalid_response", error: "Provider returned non-JSON." };
  }
}

async function ollamaCompat(data: CompleteInput): Promise<CompleteResult> {
  const res = await fetch(`${data.baseUrl.replace(/\/$/, "")}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...data.headers },
    body: JSON.stringify({
      model: data.model,
      messages: data.messages,
      stream: false,
      options: { temperature: data.temperature ?? 0.7 },
    }),
  });
  const raw = await res.text();
  if (!res.ok) return fail(res.status, raw);
  try {
    const body = JSON.parse(raw) as { message?: { content?: string } };
    const text = body.message?.content ?? "";
    if (!text) return { ok: false, code: "invalid_response", error: "Empty model response." };
    return { ok: true, text, model: data.model };
  } catch {
    return { ok: false, code: "invalid_response", error: "Provider returned non-JSON." };
  }
}

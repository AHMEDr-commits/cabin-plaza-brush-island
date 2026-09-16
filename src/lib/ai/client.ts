import { completeChat, type CompleteInput, type CompleteResult } from "./complete";
import type { ProviderAccount } from "../loreweave/types";
import { pickKey } from "../loreweave/providers";
import { LARGE_REQUEST_CHARS } from "../loreweave/config";

export interface RunChatOpts {
  provider?: ProviderAccount;
  messages: CompleteInput["messages"];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  forceDemo?: boolean;
}

export async function runChat(opts: RunChatOpts): Promise<CompleteResult> {
  const key = opts.provider ? pickKey(opts.provider) : null;
  const payload: CompleteInput = {
    messages: opts.messages,
    format: opts.provider?.format ?? "openai",
    baseUrl: opts.provider?.baseUrl ?? "https://api.x.ai/v1",
    model: opts.model || opts.provider?.defaultModel || "grok-4.5",
    apiKey: key ?? undefined,
    temperature: opts.temperature ?? opts.provider?.temperature ?? 0.7,
    maxTokens: opts.maxTokens ?? opts.provider?.maxOutput ?? 2048,
    headers: opts.provider?.headers,
    demo: opts.forceDemo || !key,
  };
  return completeChat({ data: payload });
}

export function shouldWarnSize(chars: number, warn: boolean): boolean {
  return warn && chars > LARGE_REQUEST_CHARS;
}

export function originLabel(origin?: string): string {
  if (origin === "user") return "You";
  if (origin === "page") return "Page";
  if (origin === "system") return "Loreweave";
  return "Model";
}

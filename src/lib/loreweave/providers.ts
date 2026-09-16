import type { ApiFormat, ProviderAccount } from "./types";

export interface BuiltInProvider {
  kind: string;
  name: string;
  format: ApiFormat;
  baseUrl: string;
  models: string[];
  docs: string;
}

export const BUILT_IN_PROVIDERS: BuiltInProvider[] = [
  {
    kind: "openai",
    name: "OpenAI",
    format: "openai",
    baseUrl: "https://api.openai.com/v1",
    models: ["gpt-4.1", "gpt-4.1-mini", "gpt-4o", "gpt-4o-mini", "o4-mini"],
    docs: "https://platform.openai.com/docs",
  },
  {
    kind: "anthropic",
    name: "Anthropic",
    format: "anthropic",
    baseUrl: "https://api.anthropic.com/v1",
    models: ["claude-sonnet-4-5", "claude-opus-4-5", "claude-haiku-4-5"],
    docs: "https://docs.anthropic.com",
  },
  {
    kind: "google",
    name: "Google Gemini",
    format: "gemini",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.0-flash"],
    docs: "https://ai.google.dev/docs",
  },
  {
    kind: "openrouter",
    name: "OpenRouter",
    format: "openai",
    baseUrl: "https://openrouter.ai/api/v1",
    models: ["openai/gpt-4o-mini", "anthropic/claude-sonnet-4.5", "google/gemini-2.5-flash"],
    docs: "https://openrouter.ai/docs",
  },
  {
    kind: "groq",
    name: "Groq",
    format: "openai",
    baseUrl: "https://api.groq.com/openai/v1",
    models: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"],
    docs: "https://console.groq.com/docs",
  },
  {
    kind: "mistral",
    name: "Mistral",
    format: "openai",
    baseUrl: "https://api.mistral.ai/v1",
    models: ["mistral-large-latest", "mistral-small-latest"],
    docs: "https://docs.mistral.ai",
  },
  {
    kind: "cohere",
    name: "Cohere",
    format: "openai",
    baseUrl: "https://api.cohere.ai/compatibility/v1",
    models: ["command-r-plus", "command-r"],
    docs: "https://docs.cohere.com",
  },
  {
    kind: "deepseek",
    name: "DeepSeek",
    format: "openai",
    baseUrl: "https://api.deepseek.com",
    models: ["deepseek-chat", "deepseek-reasoner"],
    docs: "https://api-docs.deepseek.com",
  },
  {
    kind: "perplexity",
    name: "Perplexity",
    format: "openai",
    baseUrl: "https://api.perplexity.ai",
    models: ["sonar-pro", "sonar"],
    docs: "https://docs.perplexity.ai",
  },
  {
    kind: "together",
    name: "Together AI",
    format: "openai",
    baseUrl: "https://api.together.xyz/v1",
    models: ["meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo"],
    docs: "https://docs.together.ai",
  },
  {
    kind: "fireworks",
    name: "Fireworks",
    format: "openai",
    baseUrl: "https://api.fireworks.ai/inference/v1",
    models: ["accounts/fireworks/models/llama-v3p1-70b-instruct"],
    docs: "https://docs.fireworks.ai",
  },
  {
    kind: "xai",
    name: "xAI",
    format: "openai",
    baseUrl: "https://api.x.ai/v1",
    models: ["grok-4.5", "grok-3", "grok-3-mini"],
    docs: "https://docs.x.ai",
  },
  {
    kind: "ollama",
    name: "Ollama (local)",
    format: "ollama",
    baseUrl: "http://localhost:11434",
    models: ["llama3.1", "qwen2.5", "mistral"],
    docs: "https://github.com/ollama/ollama",
  },
];

export function makeBuiltInAccount(kind: string): ProviderAccount {
  const spec = BUILT_IN_PROVIDERS.find((p) => p.kind === kind);
  if (!spec) throw new Error(`Unknown provider ${kind}`);
  return {
    id: `prov_${kind}`,
    name: spec.name,
    kind: spec.kind,
    format: spec.format,
    baseUrl: spec.baseUrl,
    models: [...spec.models],
    defaultModel: spec.models[0] ?? "",
    keys: [],
    enabled: true,
    streaming: spec.format !== "gemini",
    contextWindow: spec.kind === "ollama" ? 8192 : 128000,
    temperature: 0.7,
    maxOutput: 2048,
    builtIn: true,
  };
}

export const DEFAULT_ROUTES = [
  { task: "writing", hint: "Long-form prose and story tools" },
  { task: "fast", hint: "Short rewrites, grammar, quick asks" },
  { task: "research", hint: "Page analysis, facts, study notes" },
  { task: "coding", hint: "Technical explanations" },
  { task: "long-context", hint: "Full chapters and multi-tab compare" },
  { task: "private", hint: "Local / Ollama when configured" },
] as const;

export function pickKey(account: ProviderAccount): string | null {
  const enabled = account.keys.filter((k) => k.enabled && k.secret.trim());
  if (!enabled.length) return null;
  return enabled[0]!.secret;
}

export function nextFallbackKey(account: ProviderAccount, failedId?: string): ApiKeyLike | null {
  const enabled = account.keys.filter((k) => k.enabled && k.secret.trim() && k.id !== failedId);
  return enabled[0] ?? null;
}

type ApiKeyLike = { id: string; secret: string };

export const PRODUCT = {
  name: "Loreweave",
  tagline: "Stories, memory, and the web",
  version: "1.0.0",
  shortDescription:
    "A local-first AI browser assistant and novel/fanfiction studio. Bring your own API keys.",
} as const;

export const BRAND_CANDIDATES = [
  "Loreweave",
  "Inkrail",
  "Quillwright",
  "Aetherink",
  "Canonloom",
  "Versewell",
  "Foliohelm",
  "Narrosk",
  "Inkspire",
  "Storyhelm",
] as const;

export const SUPPORT_LINKS = [
  {
    id: "az-official",
    label: "AZ Official",
    description: "Core development support",
    url: "https://www.patreon.com/cw/AZofficial",
  },
  {
    id: "az-official-1",
    label: "AZ Official 1",
    description: "Alternate creator page",
    url: "https://www.patreon.com/AZOFFICIAL1",
  },
  {
    id: "translator911",
    label: "Translator 911",
    description: "Translation & localization work",
    url: "https://www.patreon.com/translator911",
  },
  {
    id: "az-fanfiction",
    label: "AZ Fanfiction",
    description: "Story studio & fandom tools",
    url: "https://www.patreon.com/AZFANFICTION",
  },
] as const;

export const DEMO_DAILY_LIMIT = 16;
export const DEMO_MAX_TOKENS = 900;
export const DEFAULT_MAX_TOKENS = 2048;
export const LARGE_REQUEST_CHARS = 24_000;
export const DEFAULT_CONTEXT_CHARS = 12_000;

export const MODES = [
  "browser",
  "studio",
  "reader",
  "characters",
  "world",
  "prompts",
  "memory",
  "providers",
  "settings",
  "support",
] as const;

export type ModeId = (typeof MODES)[number];

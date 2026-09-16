const en = {
  product: "Loreweave",
  tagline: "Stories, memory, and the web",
  ask: "Ask Loreweave",
  send: "Send",
  stop: "Stop",
  retry: "Retry",
  regenerate: "Regenerate",
  copy: "Copy",
  save: "Save",
  saved: "Saved",
  insert: "Insert",
  export: "Export",
  delete: "Delete",
  edit: "Edit",
  cancel: "Cancel",
  create: "Create",
  search: "Search",
  notes: "Notes",
  command: "Command palette",
  modes: {
    browser: "AI Browser",
    studio: "Story Studio",
    reader: "Reader",
    characters: "Character Lab",
    world: "World Lab",
    prompts: "Prompt Studio",
    memory: "Notes & Memory",
    providers: "AI Providers",
    settings: "Settings",
    support: "Support",
  },
  privacyLeave:
    "This request will leave your browser and go to the AI provider you selected. Loreweave does not keep a copy on a developer server.",
  demoNotice:
    "Demo replies use a limited built-in path so you can try the studio. Add your own API key for full control.",
  offline: "You are offline. Notes, memory, and local tools still work. Network AI is paused.",
  noKey: "Add an API key in Providers to run this with your own model.",
} as const;

export type Messages = typeof en;

const dictionaries: Record<string, Messages> = { en };

export function t(path: string, lang = "en"): string {
  const dict = dictionaries[lang] ?? en;
  const parts = path.split(".");
  let cur: unknown = dict;
  for (const p of parts) {
    if (typeof cur !== "object" || cur === null || !(p in cur)) return path;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : path;
}

export { en };

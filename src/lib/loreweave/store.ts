import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AppSettings,
  CharacterProfile,
  ContinuityIssue,
  Conversation,
  ModeId,
  Note,
  PageContext,
  PromptTemplate,
  ProviderAccount,
  StoryBranch,
  StoryProject,
  TimelineEvent,
  UsageDay,
  Workspace,
  WorldRecord,
} from "./types";
import { uid, nowIso } from "../utils.ts";
import {
  seedCharacters,
  seedConversation,
  seedNotes,
  seedPrompts,
  seedProviders,
  seedStory,
  seedTimeline,
  seedWorkspaces,
  seedWorld,
} from "./seed";
import { PRODUCT } from "./config";

export interface LoreState {
  hydrated: boolean;
  mode: ModeId;
  workspaceId: string;
  workspaces: Workspace[];
  settings: AppSettings;
  providers: ProviderAccount[];
  routes: { task: string; providerId: string; model: string }[];
  conversations: Conversation[];
  activeConversationId: string;
  notes: Note[];
  bookmarks: { id: string; title: string; url: string; createdAt: string }[];
  prompts: PromptTemplate[];
  stories: StoryProject[];
  activeStoryId: string;
  characters: CharacterProfile[];
  world: WorldRecord[];
  timeline: TimelineEvent[];
  branches: StoryBranch[];
  continuity: ContinuityIssue[];
  page: PageContext;
  tabContexts: PageContext[];
  usage: UsageDay[];
  pinnedActions: string[];
  commandOpen: boolean;
  compareBuffer: string;
  setMode: (m: ModeId) => void;
  setCommandOpen: (v: boolean) => void;
  patchSettings: (p: Partial<AppSettings>) => void;
  setWorkspace: (id: string) => void;
  upsertProvider: (p: ProviderAccount) => void;
  addKey: (providerId: string, label: string, secret: string) => void;
  removeKey: (providerId: string, keyId: string) => void;
  toggleKey: (providerId: string, keyId: string, enabled: boolean) => void;
  markKeyResult: (providerId: string, keyId: string, ok: boolean, error?: string) => void;
  newConversation: () => void;
  setActiveConversation: (id: string) => void;
  appendMessage: (conversationId: string, role: "user" | "assistant" | "system", content: string, extra?: { providerId?: string; model?: string; origin?: "user" | "ai" | "page" | "system" }) => string;
  patchMessage: (conversationId: string, messageId: string, content: string) => void;
  addNote: (n: Partial<Note> & { title: string; body: string }) => void;
  deleteNote: (id: string) => void;
  addPrompt: (p: Omit<PromptTemplate, "id" | "builtIn">) => void;
  updatePrompt: (p: PromptTemplate) => void;
  deletePrompt: (id: string) => void;
  setPage: (p: Partial<PageContext>) => void;
  setSelected: (text: string) => void;
  addTabContext: (p: PageContext) => void;
  clearTabContexts: () => void;
  setStoryBody: (chapterId: string, body: string) => void;
  addChapter: () => void;
  upsertCharacter: (c: CharacterProfile) => void;
  deleteCharacter: (id: string) => void;
  upsertWorld: (w: WorldRecord) => void;
  upsertTimeline: (e: TimelineEvent) => void;
  setContinuity: (issues: ContinuityIssue[]) => void;
  setBranches: (b: StoryBranch[]) => void;
  bumpUsage: (promptChars: number, completionChars: number) => void;
  setRoute: (task: string, providerId: string, model: string) => void;
  pinAction: (id: string) => void;
  resetDemo: () => void;
}

const defaultSettings = (): AppSettings => ({
  theme: "dark",
  accent: "#8ea0b0",
  fontScale: 1,
  reducedMotion: false,
  autoPageContext: false,
  autoMemoryContext: true,
  dailyRequestLimit: 200,
  maxRequestChars: 12000,
  warnLargeRequests: true,
  language: "en",
  supporter: false,
  defaultProviderId: "",
  fallbackProviderId: "",
  autoRoute: false,
  shortcuts: {
    command: "Mod+K",
    ask: "Mod+Shift+Space",
  },
});

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function fresh() {
  const providers = seedProviders();
  const conv = seedConversation();
  const story = seedStory();
  return {
    hydrated: false,
    mode: "browser" as ModeId,
    workspaceId: "ws_writer",
    workspaces: seedWorkspaces(),
    settings: { ...defaultSettings(), defaultProviderId: "prov_openai" },
    providers,
    routes: [
      { task: "writing", providerId: "prov_anthropic", model: "" },
      { task: "fast", providerId: "prov_groq", model: "" },
      { task: "research", providerId: "prov_perplexity", model: "" },
      { task: "coding", providerId: "prov_openai", model: "" },
      { task: "long-context", providerId: "prov_google", model: "" },
      { task: "private", providerId: "prov_ollama", model: "" },
    ],
    conversations: [conv],
    activeConversationId: conv.id,
    notes: seedNotes(),
    bookmarks: [],
    prompts: seedPrompts,
    stories: [story],
    activeStoryId: story.id,
    characters: seedCharacters(),
    world: seedWorld(),
    timeline: seedTimeline(),
    branches: [],
    continuity: [],
    page: {
      title: `${PRODUCT.name} preview`,
      url: "",
      excerpt: story.chapters[0]?.body.slice(0, 400) ?? "",
      selectedText: "",
      fetchedAt: nowIso(),
    },
    tabContexts: [],
    usage: [],
    pinnedActions: ["explain", "summarize", "rewrite", "continue", "dialogue"],
    commandOpen: false,
    compareBuffer: "",
  };
}

export const useLore = create<LoreState>()(
  persist(
    (set, get) => ({
      ...fresh(),
      setMode: (mode) => set({ mode }),
      setCommandOpen: (commandOpen) => set({ commandOpen }),
      patchSettings: (p) => set({ settings: { ...get().settings, ...p } }),
      setWorkspace: (workspaceId) => set({ workspaceId }),
      upsertProvider: (p) =>
        set({
          providers: get().providers.some((x) => x.id === p.id)
            ? get().providers.map((x) => (x.id === p.id ? p : x))
            : [...get().providers, p],
        }),
      addKey: (providerId, label, secret) =>
        set({
          providers: get().providers.map((p) =>
            p.id === providerId
              ? {
                  ...p,
                  keys: [...p.keys, { id: uid("key"), label, secret, enabled: true }],
                }
              : p,
          ),
        }),
      removeKey: (providerId, keyId) =>
        set({
          providers: get().providers.map((p) =>
            p.id === providerId ? { ...p, keys: p.keys.filter((k) => k.id !== keyId) } : p,
          ),
        }),
      toggleKey: (providerId, keyId, enabled) =>
        set({
          providers: get().providers.map((p) =>
            p.id === providerId
              ? { ...p, keys: p.keys.map((k) => (k.id === keyId ? { ...k, enabled } : k)) }
              : p,
          ),
        }),
      markKeyResult: (providerId, keyId, ok, error) =>
        set({
          providers: get().providers.map((p) =>
            p.id === providerId
              ? {
                  ...p,
                  keys: p.keys.map((k) =>
                    k.id === keyId
                      ? {
                          ...k,
                          lastOkAt: ok ? nowIso() : k.lastOkAt,
                          lastError: ok ? undefined : error,
                        }
                      : k,
                  ),
                }
              : p,
          ),
        }),
      newConversation: () => {
        const c: Conversation = {
          id: uid("convo"),
          title: "New thread",
          messages: [],
          createdAt: nowIso(),
          updatedAt: nowIso(),
        };
        set({ conversations: [c, ...get().conversations], activeConversationId: c.id });
      },
      setActiveConversation: (id) => set({ activeConversationId: id }),
      appendMessage: (conversationId, role, content, extra) => {
        const id = uid("msg");
        set({
          conversations: get().conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  title: c.messages.length === 0 && role === "user" ? content.slice(0, 42) : c.title,
                  updatedAt: nowIso(),
                  messages: [
                    ...c.messages,
                    {
                      id,
                      role,
                      content,
                      createdAt: nowIso(),
                      origin: extra?.origin ?? (role === "assistant" ? "ai" : "user"),
                      providerId: extra?.providerId,
                      model: extra?.model,
                    },
                  ],
                }
              : c,
          ),
        });
        return id;
      },
      patchMessage: (conversationId, messageId, content) =>
        set({
          conversations: get().conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  messages: c.messages.map((m) => (m.id === messageId ? { ...m, content } : m)),
                }
              : c,
          ),
        }),
      addNote: (n) =>
        set({
          notes: [
            {
              id: uid("note"),
              kind: n.kind ?? "quick",
              tags: n.tags ?? [],
              folder: n.folder ?? "Inbox",
              createdAt: nowIso(),
              updatedAt: nowIso(),
              title: n.title,
              body: n.body,
              sourceUrl: n.sourceUrl,
            },
            ...get().notes,
          ],
        }),
      deleteNote: (id) => set({ notes: get().notes.filter((n) => n.id !== id) }),
      addPrompt: (p) =>
        set({
          prompts: [...get().prompts, { ...p, id: uid("prompt"), builtIn: false }],
        }),
      updatePrompt: (p) => set({ prompts: get().prompts.map((x) => (x.id === p.id ? p : x)) }),
      deletePrompt: (id) =>
        set({
          prompts: get().prompts.filter((p) => p.id !== id || p.builtIn),
        }),
      setPage: (p) => set({ page: { ...get().page, ...p, fetchedAt: nowIso() } }),
      setSelected: (selectedText) => set({ page: { ...get().page, selectedText } }),
      addTabContext: (p) => set({ tabContexts: [...get().tabContexts, p] }),
      clearTabContexts: () => set({ tabContexts: [] }),
      setStoryBody: (chapterId, body) =>
        set({
          stories: get().stories.map((s) =>
            s.id === get().activeStoryId
              ? {
                  ...s,
                  updatedAt: nowIso(),
                  chapters: s.chapters.map((c) => (c.id === chapterId ? { ...c, body } : c)),
                }
              : s,
          ),
        }),
      addChapter: () =>
        set({
          stories: get().stories.map((s) =>
            s.id === get().activeStoryId
              ? {
                  ...s,
                  chapters: [
                    ...s.chapters,
                    { id: uid("ch"), title: `Chapter ${s.chapters.length + 1}`, body: "", notes: "" },
                  ],
                }
              : s,
          ),
        }),
      upsertCharacter: (c) =>
        set({
          characters: get().characters.some((x) => x.id === c.id)
            ? get().characters.map((x) => (x.id === c.id ? c : x))
            : [...get().characters, c],
        }),
      deleteCharacter: (id) => set({ characters: get().characters.filter((c) => c.id !== id) }),
      upsertWorld: (w) =>
        set({
          world: get().world.some((x) => x.id === w.id)
            ? get().world.map((x) => (x.id === w.id ? w : x))
            : [...get().world, w],
        }),
      upsertTimeline: (e) =>
        set({
          timeline: get().timeline.some((x) => x.id === e.id)
            ? get().timeline.map((x) => (x.id === e.id ? e : x))
            : [...get().timeline, e],
        }),
      setContinuity: (continuity) => set({ continuity }),
      setBranches: (branches) => set({ branches }),
      bumpUsage: (promptChars, completionChars) => {
        const day = today();
        const usage = [...get().usage];
        const cur = usage.find((u) => u.day === day);
        if (cur) {
          cur.requests += 1;
          cur.promptChars += promptChars;
          cur.completionChars += completionChars;
        } else usage.push({ day, requests: 1, promptChars, completionChars });
        set({ usage });
      },
      setRoute: (task, providerId, model) =>
        set({
          routes: get().routes.map((r) => (r.task === task ? { ...r, providerId, model } : r)),
        }),
      pinAction: (id) => {
        const pinned = get().pinnedActions;
        set({
          pinnedActions: pinned.includes(id) ? pinned.filter((x) => x !== id) : [...pinned, id],
        });
      },
      resetDemo: () => set({ ...fresh(), hydrated: true }),
    }),
    {
      name: "loreweave.v1",
      skipHydration: true,
      partialize: (s) => {
        const {
          commandOpen: _c,
          compareBuffer: _b,
          hydrated: _h,
          ...rest
        } = s;
        return rest;
      },
    },
  ),
);

export function activeStory(s: LoreState): StoryProject | undefined {
  return s.stories.find((x) => x.id === s.activeStoryId) ?? s.stories[0];
}

export function activeConversation(s: LoreState): Conversation | undefined {
  return s.conversations.find((c) => c.id === s.activeConversationId) ?? s.conversations[0];
}

export function providerById(s: LoreState, id: string): ProviderAccount | undefined {
  return s.providers.find((p) => p.id === id);
}

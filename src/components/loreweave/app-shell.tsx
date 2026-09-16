import { useEffect, useState } from "react";
import {
  BookOpen,
  Command,
  Compass,
  Feather,
  Globe2,
  Heart,
  KeyRound,
  Library,
  PanelRight,
  Settings2,
  Users,
  Wand2,
} from "lucide-react";
import { Mark } from "./mark";
import { CommandPalette } from "./command-palette";
import { ChatPanel } from "./chat-panel";
import { StudioPanel } from "./studio-panel";
import { CharacterPanel, ReaderPanel, TimelinePanel, WorldPanel } from "./labs-panels";
import { MemoryPanel, PrivacyCard, PromptPanel, ProviderPanel, SettingsPanel, SupportPanel } from "./system-panels";
import { useLore } from "@/lib/loreweave/store";
import { MODES, type ModeId, PRODUCT } from "@/lib/loreweave/config";
import { t } from "@/lib/loreweave/i18n";
import { COMMANDS } from "@/lib/loreweave/prompts-catalog";
import { useAsk } from "@/lib/ai/use-ask";
import { cn } from "@/lib/utils";

const ICONS: Record<ModeId, typeof Compass> = {
  browser: Compass,
  studio: Feather,
  reader: BookOpen,
  characters: Users,
  world: Globe2,
  prompts: Wand2,
  memory: Library,
  providers: KeyRound,
  settings: Settings2,
  support: Heart,
};

const PRIMARY: ModeId[] = ["browser", "studio", "reader", "characters", "memory"];

export function AppShell() {
  const [worldTab, setWorldTab] = useState<"world" | "timeline">("world");
  const mode = useLore((s) => s.mode);
  const setMode = useLore((s) => s.setMode);
  const setCommandOpen = useLore((s) => s.setCommandOpen);
  const theme = useLore((s) => s.settings.theme);
  const accent = useLore((s) => s.settings.accent);
  const scale = useLore((s) => s.settings.fontScale);
  const supporter = useLore((s) => s.settings.supporter);
  const reduced = useLore((s) => s.settings.reducedMotion);
  const { runPrompt, ask } = useAsk();
  const prompts = useLore((s) => s.prompts);
  const addNote = useLore((s) => s.addNote);
  const selected = useLore((s) => s.page.selectedText);

  useEffect(() => {
    try {
      const persistApi = useLore.persist;
      if (persistApi?.rehydrate) void persistApi.rehydrate();
    } catch {
      /* seed data is enough */
    }
    useLore.setState({ hydrated: true });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let resolved = theme;
    if (theme === "system") {
      resolved = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    root.dataset.theme = resolved === "contrast" ? "contrast" : resolved;
    root.style.setProperty("--color-accent", accent);
    root.style.fontSize = `${16 * scale}px`;
    root.style.setProperty("--motion-quick", reduced ? "0.01ms" : "150ms");
  }, [theme, accent, scale, reduced]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen(true);
      }
      if (mod && e.shiftKey && e.code === "Space") {
        e.preventDefault();
        setMode("browser");
        setCommandOpen(false);
      }
      if (e.key === "Escape") setCommandOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCommandOpen, setMode]);

  function onCommand(id: string) {
    if (id === "note") {
      addNote({ title: selected.slice(0, 48) || "Note", body: selected, kind: "quick" });
      setMode("memory");
      return;
    }
    if (id.startsWith("prompt:")) {
      const p = prompts.find((x) => x.id === id.slice(7));
      if (p) void runPrompt(p.template);
      setMode("browser");
      return;
    }
    const cmd = COMMANDS.find((c) => c.id === id);
    if (cmd?.promptId) {
      const p = prompts.find((x) => x.id === cmd.promptId);
      if (p) void runPrompt(p.template);
      setMode("browser");
      return;
    }
    if (id === "open-studio") setMode("studio");
    if (id === "open-chars") setMode("characters");
    if (id === "open-prompts") setMode("prompts");
    if (id === "compare") {
      setMode("browser");
      void ask({ prompt: "Compare the pages currently in the compare set.", includePage: true });
    }
  }

  return (
    <div className="flex min-h-dvh bg-bg text-foreground">
      <nav
        className="sticky top-0 hidden h-dvh w-16 shrink-0 flex-col items-center border-r border-border py-4 md:flex"
        aria-label="Modes"
      >
        <Mark className="size-8" />
        <div className="mt-6 flex flex-1 flex-col items-center gap-1">
          {MODES.map((m) => {
            const Icon = ICONS[m];
            return (
              <button
                key={m}
                title={t(`modes.${m}`)}
                aria-label={t(`modes.${m}`)}
                aria-current={mode === m}
                onClick={() => setMode(m)}
                className={cn(
                  "flex size-11 items-center justify-center rounded-[var(--radius-md)] text-muted hover:bg-surface-2 hover:text-foreground",
                  mode === m && "bg-surface-2 text-foreground",
                )}
              >
                <Icon className="size-4" strokeWidth={1.75} />
              </button>
            );
          })}
        </div>
        <button
          className="flex size-11 items-center justify-center rounded-[var(--radius-md)] text-muted hover:text-foreground"
          aria-label="Command palette"
          onClick={() => setCommandOpen(true)}
        >
          <Command className="size-4" />
        </button>
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b border-border px-4">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg leading-none tracking-tight">
              {PRODUCT.name}
              {supporter ? <span className="ml-2 align-middle text-[10px] uppercase tracking-[0.16em] text-accent">Supporter</span> : null}
            </p>
            <p className="truncate text-xs text-muted">{t(`modes.${mode}`)}</p>
          </div>
          <button
            className="hidden h-9 items-center gap-2 rounded-full border border-border px-3 text-xs text-muted md:inline-flex"
            onClick={() => setCommandOpen(true)}
          >
            <Command className="size-3.5" />
            Ctrl/⌘K
          </button>
          <a href="/loreweave-extension.zip" className="hidden text-xs text-muted hover:text-foreground sm:inline">
            Get extension
          </a>
        </header>

        <main className="min-h-0 flex-1 p-3 pb-24 md:p-4 md:pb-4">
          <div className="h-[calc(100dvh-8.5rem)] md:h-[calc(100dvh-5.5rem)]">
            {mode === "browser" && <ChatPanel />}
            {mode === "studio" && <StudioPanel />}
            {mode === "reader" && <ReaderPanel />}
            {mode === "characters" && <CharacterPanel />}
            {mode === "world" && (
              <div className="flex h-full min-h-0 flex-col gap-3">
                <div className="flex gap-2">
                  <button className={cn("h-9 rounded-full px-3 text-xs", worldTab === "world" ? "bg-accent text-accent-foreground" : "text-muted")} onClick={() => setWorldTab("world")}>
                    World
                  </button>
                  <button className={cn("h-9 rounded-full px-3 text-xs", worldTab === "timeline" ? "bg-accent text-accent-foreground" : "text-muted")} onClick={() => setWorldTab("timeline")}>
                    Timeline
                  </button>
                </div>
                <div className="min-h-0 flex-1">{worldTab === "world" ? <WorldPanel /> : <TimelinePanel />}</div>
              </div>
            )}
            {mode === "prompts" && <PromptPanel />}
            {mode === "memory" && <MemoryPanel />}
            {mode === "providers" && <ProviderPanel />}
            {mode === "settings" && (
              <div className="grid h-full min-h-0 gap-3 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <SettingsPanel />
                <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-5">
                  <p className="font-medium">Privacy</p>
                  <div className="mt-3">
                    <PrivacyCard />
                  </div>
                </div>
              </div>
            )}
            {mode === "support" && <SupportPanel />}
          </div>
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-bg/95 px-1 py-1 md:hidden" aria-label="Primary">
        {PRIMARY.map((m) => {
          const Icon = ICONS[m];
          return (
            <button
              key={m}
              className={cn("flex h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] text-muted", mode === m && "text-foreground")}
              onClick={() => setMode(m)}
            >
              <Icon className="size-4" />
              {t(`modes.${m}`).split(" ")[0]}
            </button>
          );
        })}
        <button className="flex h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] text-muted" onClick={() => setCommandOpen(true)}>
          <PanelRight className="size-4" />
          More
        </button>
      </nav>
      <CommandPalette onRun={onCommand} />
    </div>
  );
}

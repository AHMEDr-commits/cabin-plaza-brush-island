import type { ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import {
  Copy,
  Download,
  Plus,
  RotateCcw,
  Square,
  BookmarkPlus,
  NotebookPen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useLore, activeConversation, providerById } from "@/lib/loreweave/store";
import { CONTEXT_MENU_ACTIONS } from "@/lib/loreweave/prompts-catalog";
import { extractIntel, toFlashcards } from "@/lib/loreweave/page-intel";
import { fetchPageText } from "@/lib/ai/fetch-page";
import { useAsk } from "@/lib/ai/use-ask";
import { downloadText } from "@/lib/utils";
import { originLabel } from "@/lib/ai/client";

export function ChatPanel() {
  const s = useLore();
  const conv = activeConversation(s);
  const { ask, runPrompt, busy, error, demo } = useAsk();
  const [draft, setDraft] = useState("");
  const [url, setUrl] = useState("");
  const [intelOpen, setIntelOpen] = useState(false);
  const box = useRef<HTMLTextAreaElement>(null);
  const provider = providerById(s, s.settings.defaultProviderId) ?? s.providers[0];
  const intel = useMemo(() => extractIntel(s.page.excerpt || s.page.selectedText), [s.page.excerpt, s.page.selectedText]);

  async function send(text = draft) {
    const prompt = text.trim();
    if (!prompt || busy) return;
    setDraft("");
    await ask({ prompt, includePage: true });
  }

  async function loadUrl() {
    if (!url.trim()) return;
    const res = await fetchPageText({ data: { url: url.trim() } });
    if (!res.ok) {
      s.appendMessage(s.activeConversationId, "assistant", res.error, { origin: "system" });
      return;
    }
    s.setPage({ title: res.title, url: res.url, excerpt: res.text });
    s.addTabContext({
      title: res.title,
      url: res.url,
      excerpt: res.text.slice(0, 4000),
      selectedText: "",
      fetchedAt: new Date().toISOString(),
    });
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <header className="flex flex-wrap items-center gap-2 rounded-[var(--radius-lg)] border border-border bg-surface p-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Page context</p>
          <p className="truncate text-sm">{s.page.title || "No page loaded"}</p>
          <p className="truncate text-xs text-muted">
            {s.page.url || "Paste a URL or drop text. Nothing is sent until you ask."}
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…"
            className="h-10 min-w-48 flex-1 rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm"
            aria-label="Page URL"
          />
          <Button variant="secondary" onClick={() => void loadUrl()}>
            Read page
          </Button>
        </div>
      </header>

      {s.page.selectedText ? (
        <div className="rounded-[var(--radius-md)] border border-border bg-surface-2 px-3 py-2 text-sm">
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted">Selection</p>
          <p className="mt-1 line-clamp-4 text-foreground/90">{s.page.selectedText}</p>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-1.5">
        {CONTEXT_MENU_ACTIONS.slice(0, 10).map((id) => {
          const prompt = s.prompts.find((p) => p.id === id);
          if (!prompt) return null;
          return (
            <button
              key={id}
              className="h-8 rounded-full border border-border bg-surface px-3 text-xs text-muted hover:text-foreground"
              onClick={() => void runPrompt(prompt.template)}
            >
              {prompt.name}
            </button>
          );
        })}
        <button
          className="h-8 rounded-full border border-border px-3 text-xs text-muted hover:text-foreground"
          onClick={() => setIntelOpen((v) => !v)}
        >
          Page intelligence
        </button>
      </div>

      {intelOpen ? (
        <div className="lw-scroll max-h-48 overflow-auto rounded-[var(--radius-md)] border border-border bg-surface p-3 text-sm">
          <p className="text-xs text-muted">Extracted locally. Send only if you choose an action.</p>
          <p className="mt-2 font-medium">Names</p>
          <p className="text-muted">{intel.names.join(", ") || "—"}</p>
          <p className="mt-2 font-medium">Dates</p>
          <p className="text-muted">{intel.dates.join(", ") || "—"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => void runPrompt(s.prompts.find((p) => p.id === "facts")!.template)}
            >
              Extract facts
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                const cards = toFlashcards(s.page.excerpt);
                s.addNote({
                  title: `Flashcards · ${s.page.title}`,
                  body: cards.map((c) => `${c.q}\n${c.a}`).join("\n\n"),
                  kind: "page",
                  tags: ["flashcards"],
                });
              }}
            >
              Save flashcards
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => void runPrompt(s.prompts.find((p) => p.id === "quiz")!.template)}
            >
              Quiz
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => void runPrompt(s.prompts.find((p) => p.id === "study-notes")!.template)}
            >
              Study notes
            </Button>
          </div>
        </div>
      ) : null}

      {s.tabContexts.length > 1 ? (
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-3 text-sm">
          <p className="text-xs text-muted">{s.tabContexts.length} pages in compare set</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {s.tabContexts.map((tab) => (
              <span key={tab.url} className="rounded-full bg-surface-2 px-2 py-1 text-xs">
                {tab.title}
              </span>
            ))}
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                void ask({
                  prompt: `Compare these pages. Differences, overlap, contradictions:\n${s.tabContexts.map((tab) => `# ${tab.title}\n${tab.excerpt.slice(0, 1800)}`).join("\n\n")}`,
                  includePage: false,
                })
              }
            >
              Compare pages
            </Button>
            <Button size="sm" variant="ghost" onClick={() => s.clearTabContexts()}>
              Clear
            </Button>
          </div>
        </div>
      ) : null}

      <div className="lw-scroll min-h-0 flex-1 overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-4">
        {!conv?.messages.length ? (
          <p className="text-sm text-muted">
            Ask about the page, a selection, or your story. Keys never leave this device except inside the request you send to your provider.
          </p>
        ) : null}
        <ol className="space-y-4">
          {conv?.messages.map((m) => (
            <li key={m.id} className="group">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                {originLabel(m.origin)}
                {m.model ? ` · ${m.model}` : ""}
              </p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
              <div className="mt-2 hidden gap-1 group-hover:flex">
                <IconBtn
                  label="Copy"
                  onClick={() => void navigator.clipboard.writeText(m.content)}
                  icon={<Copy className="size-3.5" />}
                />
                <IconBtn
                  label="Save note"
                  onClick={() =>
                    s.addNote({ title: m.content.slice(0, 48), body: m.content, kind: "response", tags: ["ai"] })
                  }
                  icon={<NotebookPen className="size-3.5" />}
                />
              </div>
            </li>
          ))}
        </ol>
        {busy ? <p className="shimmer mt-4 text-sm text-muted">Composing…</p> : null}
        {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
        {demo ? (
          <p className="mt-3 text-xs text-muted">Demo path in use. Add a key in Providers for your own model.</p>
        ) : null}
      </div>

      <footer className="rounded-[var(--radius-lg)] border border-border bg-surface p-3">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <select
            className="h-10 rounded-[var(--radius-sm)] border border-border bg-bg px-2 text-sm"
            value={s.settings.defaultProviderId}
            onChange={(e) => s.patchSettings({ defaultProviderId: e.target.value })}
            aria-label="Provider"
          >
            {s.providers.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name}
                {prov.keys.some((k) => k.enabled && k.secret) ? "" : " · no key"}
              </option>
            ))}
          </select>
          <select
            className="h-10 max-w-48 rounded-[var(--radius-sm)] border border-border bg-bg px-2 text-sm"
            value={provider?.defaultModel}
            onChange={(e) => {
              if (!provider) return;
              s.upsertProvider({ ...provider, defaultModel: e.target.value });
            }}
            aria-label="Model"
          >
            {provider?.models.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <Button size="icon" variant="ghost" aria-label="New thread" onClick={() => s.newConversation()}>
            <Plus className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Export"
            onClick={() =>
              downloadText(
                `${conv?.title ?? "thread"}.md`,
                (conv?.messages ?? []).map((m) => `**${m.role}**\n${m.content}`).join("\n\n"),
              )
            }
          >
            <Download className="size-4" />
          </Button>
        </div>
        <Textarea
          ref={box}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask, rewrite, continue…"
          className="min-h-24"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
            <Button onClick={() => void send()} disabled={busy || !draft.trim()}>
              Send
            </Button>
            <Button variant="secondary" disabled={!busy}>
              <Square className="size-3.5" /> Stop
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                const last = [...(conv?.messages ?? [])].reverse().find((m) => m.role === "user");
                if (last) void send(last.content);
              }}
            >
              <RotateCcw className="size-3.5" /> Retry
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              s.addNote({
                title: s.page.title || "Bookmark",
                body: s.page.excerpt.slice(0, 500),
                kind: "page",
                sourceUrl: s.page.url,
              })
            }
          >
            <BookmarkPlus className="size-3.5" /> Save page note
          </Button>
        </div>
      </footer>
    </div>
  );
}

function IconBtn({ label, onClick, icon }: { label: string; onClick: () => void; icon: ReactNode }) {
  return (
    <button
      className="inline-flex h-8 items-center gap-1 rounded-[var(--radius-sm)] px-2 text-xs text-muted hover:bg-surface-2 hover:text-foreground"
      onClick={onClick}
      type="button"
    >
      {icon}
      {label}
    </button>
  );
}

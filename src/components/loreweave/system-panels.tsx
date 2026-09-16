import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useLore } from "@/lib/loreweave/store";
import { SUPPORT_LINKS, PRODUCT } from "@/lib/loreweave/config";
import { maskKey } from "@/lib/loreweave/key-security";
import { BUILT_IN_PROVIDERS, makeBuiltInAccount } from "@/lib/loreweave/providers";
import { runChat } from "@/lib/ai/client";
import { downloadText, uid } from "@/lib/utils";
import type { ApiFormat } from "@/lib/loreweave/types";

export function PromptPanel() {
  const s = useLore();
  const [id, setId] = useState(s.prompts[0]?.id ?? "");
  const p = s.prompts.find((x) => x.id === id);
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("Rewrite in {{tone}}:\n\n{{selected_text}}");
  return (
    <div className="grid h-full min-h-0 gap-3 md:grid-cols-[18rem_minmax(0,1fr)]">
      <aside className="lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-3">
        {s.prompts.map((item) => (
          <button
            key={item.id}
            onClick={() => setId(item.id)}
            className={`mb-1 w-full rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm ${item.id === id ? "bg-surface-2" : ""}`}
          >
            {item.name}
          </button>
        ))}
      </aside>
      <div className="lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5">
        {p && (
          <>
            <p className="font-display text-2xl">{p.name}</p>
            <p className="text-sm text-muted">{p.description}</p>
            <pre className="mt-4 whitespace-pre-wrap rounded-[var(--radius-md)] bg-bg p-4 text-sm">{p.template}</pre>
            {!p.builtIn && (
              <Button size="sm" className="mt-3" variant="ghost" onClick={() => s.deletePrompt(p.id)}>
                Delete
              </Button>
            )}
          </>
        )}
        <div className="mt-8 border-t border-border pt-4">
          <p className="text-sm font-medium">New custom prompt</p>
          <Input className="mt-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Textarea className="mt-2" value={template} onChange={(e) => setTemplate(e.target.value)} />
          <Button
            className="mt-3"
            onClick={() => {
              if (!name.trim()) return;
              s.addPrompt({
                name: name.trim(),
                description: "Custom",
                template,
                category: "custom",
                variables: [],
              });
              setName("");
            }}
          >
            Save prompt
          </Button>
        </div>
      </div>
    </div>
  );
}

export function MemoryPanel() {
  const s = useLore();
  const [q, setQ] = useState("");
  const notes = s.notes.filter(
    (n) => !q || `${n.title} ${n.body} ${n.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()),
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  return (
    <div className="grid h-full min-h-0 gap-3 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="flex min-h-0 flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-4">
        <Input placeholder="Search notes, tags, folders" value={q} onChange={(e) => setQ(e.target.value)} />
        <ul className="lw-scroll mt-3 min-h-0 flex-1 overflow-auto">
          {notes.map((n) => (
            <li key={n.id} className="mb-3 rounded-[var(--radius-md)] border border-border p-3">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                {n.kind} · {n.folder}
              </p>
              <p className="font-medium">{n.title}</p>
              <p className="mt-1 line-clamp-4 text-sm text-muted">{n.body}</p>
              <button className="mt-2 text-xs text-danger" onClick={() => s.deleteNote(n.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-4">
        <p className="text-sm font-medium">Quick note</p>
        <Input className="mt-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <Textarea className="mt-2" value={body} onChange={(e) => setBody(e.target.value)} />
        <Button
          className="mt-3 w-full"
          onClick={() => {
            if (!title.trim()) return;
            s.addNote({ title, body, kind: "quick", tags: [], folder: "Inbox" });
            setTitle("");
            setBody("");
          }}
        >
          Save
        </Button>
        <Button
          className="mt-2 w-full"
          variant="secondary"
          onClick={() =>
            downloadText(
              "loreweave-notes.json",
              JSON.stringify({ notes: s.notes, characters: s.characters, world: s.world, stories: s.stories }, null, 2),
              "application/json",
            )
          }
        >
          Export workspace
        </Button>
      </div>
    </div>
  );
}

export function ProviderPanel() {
  const s = useLore();
  const [id, setId] = useState(s.providers[0]?.id ?? "");
  const p = s.providers.find((x) => x.id === id);
  const [secret, setSecret] = useState("");
  const [label, setLabel] = useState("Key 1");
  const [reveal, setReveal] = useState<string | null>(null);
  const [testMsg, setTestMsg] = useState("");
  const [custom, setCustom] = useState({ name: "Custom OpenAI-compatible", baseUrl: "https://", model: "local-model" });

  async function testKey() {
    if (!p) return;
    setTestMsg("Testing…");
    const res = await runChat({
      provider: p,
      messages: [{ role: "user", content: "Reply with the single word pong." }],
      maxTokens: 8,
    });
    setTestMsg(res.ok ? `OK · ${res.model ?? p.defaultModel}` : res.error ?? "Failed");
    const key = p.keys.find((k) => k.enabled);
    if (key) s.markKeyResult(p.id, key.id, Boolean(res.ok), res.error);
  }

  return (
    <div className="grid h-full min-h-0 gap-3 md:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-3">
        {s.providers.map((item) => (
          <button
            key={item.id}
            onClick={() => setId(item.id)}
            className={`mb-1 w-full rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm ${item.id === id ? "bg-surface-2" : ""}`}
          >
            {item.name}
            <span className="block text-[11px] text-muted">
              {item.keys.filter((k) => k.enabled && k.secret).length} key(s)
            </span>
          </button>
        ))}
      </aside>
      {p && (
        <article className="lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5">
          <p className="font-display text-2xl">{p.name}</p>
          <p className="text-sm text-muted">
            {p.format} · {p.baseUrl}
          </p>
          <p className="mt-3 text-sm text-muted">
            Keys stay in this browser. They are sent only to {p.baseUrl} when you run a request. They are never posted to a Loreweave account.
          </p>
          <ul className="mt-4 space-y-2">
            {p.keys.map((k) => (
              <li key={k.id} className="flex flex-wrap items-center gap-2 rounded-[var(--radius-sm)] bg-bg p-2 text-sm">
                <span className="font-medium">{k.label}</span>
                <code className="text-muted">{reveal === k.id ? k.secret : maskKey(k.secret)}</code>
                <Button size="sm" variant="ghost" onClick={() => setReveal(reveal === k.id ? null : k.id)}>
                  {reveal === k.id ? "Hide" : "Reveal"}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => s.toggleKey(p.id, k.id, !k.enabled)}>
                  {k.enabled ? "Disable" : "Enable"}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => s.removeKey(p.id, k.id)}>
                  Delete
                </Button>
                {k.lastError && <span className="text-danger">{k.lastError}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Input value={label} onChange={(e) => setLabel(e.target.value)} className="max-w-36" />
            <Input
              type={reveal ? "text" : "password"}
              autoComplete="off"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Paste API key"
              className="max-w-xs"
            />
            <Button
              onClick={() => {
                if (!secret.trim()) return;
                s.addKey(p.id, label || "Key", secret.trim());
                setSecret("");
              }}
            >
              Add key
            </Button>
            <Button variant="secondary" onClick={() => void testKey()}>
              Test
            </Button>
          </div>
          {testMsg && <p className="mt-2 text-sm">{testMsg}</p>}
          <label className="mt-4 block text-xs text-muted">
            Default model
            <Input
              className="mt-1 max-w-md"
              value={p.defaultModel}
              onChange={(e) => s.upsertProvider({ ...p, defaultModel: e.target.value, models: Array.from(new Set([...p.models, e.target.value])) })}
            />
          </label>
          <div className="mt-8 border-t border-border pt-4">
            <p className="font-medium">Custom OpenAI-compatible endpoint</p>
            <Input className="mt-2" value={custom.name} onChange={(e) => setCustom({ ...custom, name: e.target.value })} />
            <Input className="mt-2" value={custom.baseUrl} onChange={(e) => setCustom({ ...custom, baseUrl: e.target.value })} />
            <Input className="mt-2" value={custom.model} onChange={(e) => setCustom({ ...custom, model: e.target.value })} />
            <Button
              className="mt-3"
              variant="secondary"
              onClick={() => {
                const n = makeBuiltInAccount("openai");
                n.id = uid("prov");
                n.builtIn = false;
                n.name = custom.name;
                n.kind = "custom";
                n.baseUrl = custom.baseUrl.replace(/\/$/, "");
                n.defaultModel = custom.model;
                n.models = [custom.model];
                n.format = "openai" as ApiFormat;
                s.upsertProvider(n);
                setId(n.id);
              }}
            >
              Add custom provider
            </Button>
            <p className="mt-2 text-xs text-muted">{BUILT_IN_PROVIDERS.length} built-in adapters. Custom parsers are not executed as code.</p>
          </div>
        </article>
      )}
    </div>
  );
}

export function SettingsPanel() {
  const s = useLore();
  const st = s.settings;
  const today = new Date().toISOString().slice(0, 10);
  const used = s.usage.find((u) => u.day === today);
  return (
    <div className="lw-scroll h-full overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5">
      <p className="font-display text-2xl">Settings</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          Theme
          <select
            className="mt-1 h-10 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-2"
            value={st.theme}
            onChange={(e) => s.patchSettings({ theme: e.target.value as typeof st.theme })}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
            <option value="contrast">High contrast</option>
          </select>
        </label>
        <label className="text-sm">
          Accent
          <input
            type="color"
            className="mt-1 h-10 w-full bg-transparent"
            value={st.accent}
            onChange={(e) => s.patchSettings({ accent: e.target.value })}
          />
        </label>
        <label className="text-sm">
          Workspace
          <select
            className="mt-1 h-10 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-2"
            value={s.workspaceId}
            onChange={(e) => s.setWorkspace(e.target.value)}
          >
            {s.workspaces.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={st.autoPageContext} onChange={(e) => s.patchSettings({ autoPageContext: e.target.checked })} />
          Auto-include page context
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={st.autoMemoryContext} onChange={(e) => s.patchSettings({ autoMemoryContext: e.target.checked })} />
          Auto-include notes
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={st.warnLargeRequests} onChange={(e) => s.patchSettings({ warnLargeRequests: e.target.checked })} />
          Warn before large requests
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={st.reducedMotion} onChange={(e) => s.patchSettings({ reducedMotion: e.target.checked })} />
          Reduced motion
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={st.supporter} onChange={(e) => s.patchSettings({ supporter: e.target.checked })} />
          I support development (cosmetic)
        </label>
        <label className="text-sm">
          Daily request limit
          <Input type="number" className="mt-1" value={st.dailyRequestLimit} onChange={(e) => s.patchSettings({ dailyRequestLimit: Number(e.target.value) })} />
        </label>
        <label className="text-sm">
          Max request characters
          <Input type="number" className="mt-1" value={st.maxRequestChars} onChange={(e) => s.patchSettings({ maxRequestChars: Number(e.target.value) })} />
        </label>
      </div>
      <div className="mt-6 rounded-[var(--radius-md)] bg-bg p-4 text-sm">
        <p className="font-medium">Usage today</p>
        <p className="text-muted">
          {used?.requests ?? 0} requests · ~{Math.round(((used?.promptChars ?? 0) + (used?.completionChars ?? 0)) / 4)} estimated tokens
        </p>
        <p className="mt-2 text-xs text-muted">Estimates only. Providers may bill differently. Loreweave does not see your invoice.</p>
      </div>
      <div className="mt-6">
        <p className="font-medium">Model routing</p>
        {s.routes.map((r) => (
          <div key={r.task} className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <span className="w-28 capitalize text-muted">{r.task}</span>
            <select
              className="h-10 rounded-[var(--radius-sm)] border border-border bg-bg px-2"
              value={r.providerId}
              onChange={(e) => s.setRoute(r.task, e.target.value, r.model)}
            >
              {s.providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted">
        Shortcuts: {st.shortcuts.command} command palette · {st.shortcuts.ask} focus ask. Chrome can rebind extension commands in chrome://extensions/shortcuts.
      </p>
      <Button className="mt-4" variant="secondary" onClick={() => s.resetDemo()}>
        Reset local demo data
      </Button>
    </div>
  );
}

export function SupportPanel() {
  const supporter = useLore((s) => s.settings.supporter);
  const patch = useLore((s) => s.patchSettings);
  return (
    <div className="lw-scroll h-full overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-6">
      <p className="font-display text-3xl tracking-tight">Enjoying {PRODUCT.name}?</p>
      <p className="mt-2 max-w-xl text-muted">
        The studio is free. Core AI always runs on your keys. Support is optional and never hides writing, memory, or BYOK.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {SUPPORT_LINKS.map((l) => (
          <a
            key={l.id}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-[var(--radius-lg)] border border-border bg-bg p-4 hover:bg-surface-2"
          >
            <p className="font-medium">{l.label}</p>
            <p className="mt-1 text-sm text-muted">{l.description}</p>
            <p className="mt-3 text-xs text-accent">Open Patreon</p>
          </a>
        ))}
      </div>
      <label className="mt-6 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={supporter} onChange={(e) => patch({ supporter: e.target.checked })} />
        Show supporter badge (honor system)
      </label>
      {supporter && (
        <p className="mt-3 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          Supporter
        </p>
      )}
      <div className="mt-8 rounded-[var(--radius-md)] bg-bg p-4 text-sm">
        <p className="font-medium">Chrome extension</p>
        <p className="mt-1 text-muted">
          Load the unpacked package from the download below. This web preview is the same studio, so you can work here immediately.
        </p>
        <a className="mt-3 inline-flex h-10 items-center rounded-[var(--radius-md)] bg-accent px-4 text-sm font-medium text-accent-foreground" href="/loreweave-extension.zip">
          Download extension zip
        </a>
      </div>
    </div>
  );
}

export function PrivacyCard() {
  const items = useMemo(
    () => [
      "API keys live in this browser (localStorage here, chrome.storage.local in the extension).",
      "No mandatory Loreweave account. No developer backend required for BYOK.",
      "Page text is read only when you ask, fetch, or enable auto page context.",
      "You own your writing. Nothing is published automatically.",
    ],
    [],
  );
  return (
    <ul className="space-y-2 text-sm text-muted">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

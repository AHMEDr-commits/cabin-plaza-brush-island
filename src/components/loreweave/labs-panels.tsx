import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useLore, activeStory } from "@/lib/loreweave/store";
import { extractCharacterProposal } from "@/lib/loreweave/extract";
import { nowIso, uid } from "@/lib/utils";
import type { CharacterProfile, WorldRecord } from "@/lib/loreweave/types";
import { useAsk } from "@/lib/ai/use-ask";

export function CharacterPanel() {
  const s = useLore();
  const [id, setId] = useState(s.characters[0]?.id ?? "");
  const c = s.characters.find((x) => x.id === id);
  const story = activeStory(s);
  const { ask, busy } = useAsk();

  return (
    <div className="grid h-full min-h-0 gap-3 md:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-3">
        {s.characters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setId(ch.id)}
            className={`mb-1 flex h-12 w-full items-center rounded-[var(--radius-sm)] px-3 text-left text-sm ${ch.id === id ? "bg-surface-2" : "hover:bg-bg"}`}
          >
            {ch.name}
          </button>
        ))}
        <Button
          variant="secondary"
          className="mt-2 w-full"
          onClick={() => {
            const n = extractCharacterProposal(story?.chapters[0]?.body ?? "New character");
            n.name = "New character";
            n.id = uid("char");
            s.upsertCharacter(n);
            setId(n.id);
          }}
        >
          New character
        </Button>
      </aside>
      {c && (
        <article className="lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Input className="max-w-sm font-display text-xl" value={c.name} onChange={(e) => s.upsertCharacter({ ...c, name: e.target.value, updatedAt: nowIso() })} />
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={c.locked}
                onChange={(e) => s.upsertCharacter({ ...c, locked: e.target.checked })}
              />
              Lock (no silent overwrite)
            </label>
          </div>
          <FieldGrid c={c} onChange={(n) => s.upsertCharacter({ ...c, ...n, updatedAt: nowIso() })} />
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              size="sm"
              disabled={busy}
              onClick={() =>
                void ask({
                  includeStory: true,
                  prompt: `Propose updates for ${c.name} from the chapter. Return JSON fields only as prose bullets the user can accept. Never assume overwrite.`,
                })
              }
            >
              Propose AI updates
            </Button>
            <Button size="sm" variant="ghost" onClick={() => s.deleteCharacter(c.id)}>
              Delete
            </Button>
          </div>
        </article>
      )}
    </div>
  );
}

function FieldGrid({ c, onChange }: { c: CharacterProfile; onChange: (n: Partial<CharacterProfile>) => void }) {
  const fields: [keyof CharacterProfile, string][] = [
    ["aliases", "Aliases"],
    ["age", "Age"],
    ["appearance", "Appearance"],
    ["personality", "Personality"],
    ["goals", "Goals"],
    ["fears", "Fears"],
    ["strengths", "Strengths"],
    ["weaknesses", "Weaknesses"],
    ["abilities", "Abilities"],
    ["relationships", "Relationships"],
    ["speechPatterns", "Speech"],
    ["importantEvents", "Events"],
    ["arc", "Arc"],
    ["currentStatus", "Status"],
    ["voiceNotes", "Voice lock"],
  ];
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {fields.map(([key, label]) => (
        <label key={key} className="block text-xs text-muted">
          {label}
          {key === "aliases" ? (
            <Input
              className="mt-1"
              value={(c.aliases ?? []).join(", ")}
              onChange={(e) => onChange({ aliases: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })}
            />
          ) : (
            <Textarea className="mt-1 min-h-20" value={String(c[key] ?? "")} onChange={(e) => onChange({ [key]: e.target.value })} />
          )}
        </label>
      ))}
      <label className="md:col-span-2 text-xs text-muted">
        Known facts (one per line)
        <Textarea
          className="mt-1"
          value={c.knownFacts.join("\n")}
          onChange={(e) => onChange({ knownFacts: e.target.value.split("\n").filter(Boolean) })}
        />
      </label>
    </div>
  );
}

export function WorldPanel() {
  const s = useLore();
  const [id, setId] = useState(s.world[0]?.id ?? "");
  const w = s.world.find((x) => x.id === id);
  return (
    <div className="grid h-full min-h-0 gap-3 md:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-3">
        {s.world.map((item) => (
          <button
            key={item.id}
            onClick={() => setId(item.id)}
            className={`mb-1 w-full rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm ${item.id === id ? "bg-surface-2" : ""}`}
          >
            <span className="block text-[11px] uppercase tracking-[0.14em] text-muted">{item.kind}</span>
            {item.name}
          </button>
        ))}
        <Button
          variant="secondary"
          className="mt-2 w-full"
          onClick={() => {
            const n: WorldRecord = {
              id: uid("world"),
              kind: "concept",
              name: "New record",
              summary: "",
              details: "",
              rules: "",
              related: [],
              createdAt: nowIso(),
              updatedAt: nowIso(),
              locked: false,
            };
            s.upsertWorld(n);
            setId(n.id);
          }}
        >
          New record
        </Button>
      </aside>
      {w && (
        <article className="lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5">
          <Input value={w.name} onChange={(e) => s.upsertWorld({ ...w, name: e.target.value })} />
          <select
            className="mt-3 h-10 rounded-[var(--radius-sm)] border border-border bg-bg px-2 text-sm"
            value={w.kind}
            onChange={(e) => s.upsertWorld({ ...w, kind: e.target.value as WorldRecord["kind"] })}
          >
            {["location","nation","organization","magic","technology","item","creature","rule","event","faction","concept"].map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
          <label className="mt-3 block text-xs text-muted">Summary<Textarea className="mt-1" value={w.summary} onChange={(e) => s.upsertWorld({ ...w, summary: e.target.value })} /></label>
          <label className="mt-3 block text-xs text-muted">Details<Textarea className="mt-1" value={w.details} onChange={(e) => s.upsertWorld({ ...w, details: e.target.value })} /></label>
          <label className="mt-3 block text-xs text-muted">Rules<Textarea className="mt-1" value={w.rules} onChange={(e) => s.upsertWorld({ ...w, rules: e.target.value })} /></label>
        </article>
      )}
    </div>
  );
}

export function TimelinePanel() {
  const s = useLore();
  const max = Math.max(1, ...s.timeline.map((e) => e.position));
  return (
    <div className="h-full min-h-0 overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-2xl">Timeline</p>
        <Button
          size="sm"
          variant="secondary"
          onClick={() =>
            s.upsertTimeline({
              id: uid("tl"),
              chapter: "New",
              position: max + 1,
              characters: [],
              location: "",
              description: "New event",
              consequences: "",
            })
          }
        >
          Add event
        </Button>
      </div>
      <ol className="relative mt-8 border-l border-border pl-6">
        {s.timeline
          .slice()
          .sort((a, b) => a.position - b.position)
          .map((e) => (
            <li key={e.id} className="relative mb-8">
              <span className="absolute -left-[29px] top-1 size-3 rounded-full bg-accent" />
              <p className="text-xs text-muted">
                Ch. {e.chapter} · {e.location}
              </p>
              <Input
                className="mt-1"
                value={e.description}
                onChange={(ev) => s.upsertTimeline({ ...e, description: ev.target.value })}
              />
              <Input
                className="mt-2"
                value={e.consequences}
                onChange={(ev) => s.upsertTimeline({ ...e, consequences: ev.target.value })}
                placeholder="Consequences"
              />
            </li>
          ))}
      </ol>
    </div>
  );
}

export function ReaderPanel() {
  const s = useLore();
  const story = activeStory(s);
  const text = s.page.selectedText || s.page.excerpt || story?.chapters[0]?.body || "";
  const [size, setSize] = useState(1);
  const [lead, setLead] = useState(1.7);
  const [focus, setFocus] = useState(false);
  const [progress, setProgress] = useState(0);
  const { ask, busy } = useAsk();
  const words = useMemo(() => text.split(/\s+/).filter(Boolean).length, [text]);

  function speak() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.slice(0, 4000));
    window.speechSynthesis.speak(u);
  }

  return (
    <div className={`flex h-full min-h-0 flex-col rounded-[var(--radius-lg)] border border-border bg-surface ${focus ? "p-2" : "p-5"}`}>
      {!focus && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <label className="text-xs text-muted">
            Size
            <input type="range" min={0.85} max={1.4} step={0.05} value={size} onChange={(e) => setSize(Number(e.target.value))} className="ml-2 align-middle" />
          </label>
          <label className="text-xs text-muted">
            Leading
            <input type="range" min={1.4} max={2} step={0.05} value={lead} onChange={(e) => setLead(Number(e.target.value))} className="ml-2 align-middle" />
          </label>
          <Button size="sm" variant="secondary" onClick={() => setFocus(true)}>
            Focus
          </Button>
          <Button size="sm" variant="ghost" onClick={speak}>
            Listen
          </Button>
          <Button size="sm" variant="ghost" disabled={busy} onClick={() => void ask({ prompt: `Summarize this for a reader:\n${text}`, includePage: false })}>
            Summarize
          </Button>
          <span className="text-xs text-muted">{words} words</span>
        </div>
      )}
      <div
        className="lw-scroll min-h-0 flex-1 overflow-auto px-2"
        onScroll={(e) => {
          const el = e.currentTarget;
          const p = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
          setProgress(p);
        }}
      >
        <article
          className="prose-reader py-6"
          style={{ ["--reader-size" as string]: String(size), ["--reader-leading" as string]: String(lead) }}
        >
          {text}
        </article>
      </div>
      <div className="mt-2 h-1 rounded-full bg-surface-2">
        <div className="h-1 rounded-full bg-accent" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
      {focus && (
        <Button className="mt-3 self-center" variant="secondary" onClick={() => setFocus(false)}>
          Exit focus
        </Button>
      )}
    </div>
  );
}

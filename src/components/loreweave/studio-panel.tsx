import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useLore, activeStory } from "@/lib/loreweave/store";
import { useAsk } from "@/lib/ai/use-ask";
import { analyzeStoryDna } from "@/lib/loreweave/story-dna";
import { scanContinuity } from "@/lib/loreweave/continuity";
import { extractCharacterProposal, extractWorldProposal, mergeProfile } from "@/lib/loreweave/extract";
import { uid } from "@/lib/utils";

const TOOL_GROUPS: { title: string; ids: string[] }[] = [
  { title: "Chapter", ids: ["chapter-rewrite", "continue", "pov", "expand", "shorten"] },
  { title: "Voice & scene", ids: ["dialogue", "voice-lock", "scene-forge", "action", "romance", "emotion"] },
  { title: "Plot", ids: ["story-doctor", "plothole", "continuity", "outline", "whatif", "au", "crossover"] },
  { title: "Generate", ids: ["branches", "alt-ending", "missing-scene", "foreshadow", "conflict", "hook", "cliff"] },
  { title: "Cast & world", ids: ["wwd", "villain", "side", "romance-arc", "fanfic-prompt"] },
  { title: "Publish", ids: ["titles", "synopsis", "tags", "pacing", "structure"] },
];

export function StudioPanel() {
  const s = useLore();
  const story = activeStory(s);
  const chapter = story?.chapters[0];
  const { runPrompt, ask, busy, error } = useAsk();
  const [intensity, setIntensity] = useState(50);
  const [whatIf, setWhatIf] = useState("What if Holt already knows who took the lantern?");
  const [tab, setTab] = useState<"write" | "dna" | "radar" | "branch" | "sim">("write");
  const dna = useMemo(() => analyzeStoryDna(chapter?.body ?? ""), [chapter?.body]);
  const lastAssistant = [...(s.conversations.find((c) => c.id === s.activeConversationId)?.messages ?? [])]
    .reverse()
    .find((m) => m.role === "assistant");

  if (!story || !chapter) return null;

  return (
    <div className="grid h-full min-h-0 gap-3 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="flex min-h-0 flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="font-display text-2xl tracking-tight">{story.title}</p>
            <p className="text-sm text-muted">{story.fandom} · {story.tags.join(" · ")}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {(["write", "dna", "radar", "branch", "sim"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`h-9 rounded-full px-3 text-xs capitalize ${tab === k ? "bg-accent text-accent-foreground" : "text-muted hover:bg-surface-2"}`}
              >
                {k === "dna" ? "Story DNA" : k === "radar" ? "Continuity" : k === "sim" ? "Simulator" : k}
              </button>
            ))}
          </div>
        </div>

        {tab === "write" && (
          <>
            <label className="mt-4 text-xs text-muted" htmlFor="chapter">
              {chapter.title}
            </label>
            <Textarea
              id="chapter"
              className="mt-1 min-h-0 flex-1 font-display text-[15px] leading-7"
              value={chapter.body}
              onChange={(e) => s.setStoryBody(chapter.id, e.target.value)}
              onSelect={(e) => {
                const t = e.currentTarget;
                const sel = t.value.slice(t.selectionStart, t.selectionEnd);
                if (sel) s.setSelected(sel);
              }}
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-muted">
                Intensity
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  aria-label="Emotional intensity"
                />
              </label>
              <Button size="sm" disabled={busy} onClick={() => void runPrompt(s.prompts.find((p) => p.id === "continue")!.template, { tone: dna.guidance })}>
                Continue
              </Button>
              <Button
                size="sm"
                variant="secondary"
                disabled={busy}
                onClick={() =>
                  void ask({
                    prompt: `Rewrite with emotional intensity ${intensity}/100. Preserve plot and character voice.\n\n${s.page.selectedText || chapter.body}`,
                    includeStory: true,
                  })
                }
              >
                Apply intensity
              </Button>
              <Button size="sm" variant="ghost" onClick={() => s.addChapter()}>
                Add chapter
              </Button>
            </div>
          </>
        )}

        {tab === "dna" && (
          <div className="lw-scroll mt-4 min-h-0 flex-1 overflow-auto text-sm">
            <p className="text-muted">
              Guidance from the supplied text. Not a reproduction of a living author's style.
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <Stat k="Tone" v={dna.tone} />
              <Stat k="Mood" v={dna.mood} />
              <Stat k="Pacing" v={dna.pacing} />
              <Stat k="Distance" v={dna.narrativeDistance} />
              <Stat k="Dialogue" v={`${Math.round(dna.dialogueDensity * 100)}%`} />
              <Stat k="Action" v={`${Math.round(dna.actionDensity * 100)}%`} />
              <Stat k="Emotion" v={`${Math.round(dna.emotionalIntensity * 100)}%`} />
              <Stat k="Avg sentence" v={`${dna.avgSentence} words`} />
            </dl>
            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">Themes</p>
            <p>{dna.themes.join(", ") || "None detected"}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">Habits</p>
            <p>{dna.habits.join(" · ") || "—"}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">Repeated phrases</p>
            <p className="text-muted">{dna.repeatedPhrases.join(" · ") || "None above threshold"}</p>
            <p className="mt-4 leading-relaxed">{dna.guidance}</p>
          </div>
        )}

        {tab === "radar" && (
          <div className="lw-scroll mt-4 min-h-0 flex-1 overflow-auto">
            <Button
              size="sm"
              onClick={() =>
                s.setContinuity(
                  scanContinuity({
                    text: story.chapters.map((c) => c.body).join("\n"),
                    characters: s.characters,
                    world: s.world,
                    timeline: s.timeline,
                  }),
                )
              }
            >
              Scan locally
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="ml-2"
              disabled={busy}
              onClick={() => void runPrompt(s.prompts.find((p) => p.id === "continuity")!.template)}
            >
              AI continuity pass
            </Button>
            <ul className="mt-4 space-y-3">
              {s.continuity.map((issue) => (
                <li key={issue.id} className="rounded-[var(--radius-md)] border border-border bg-bg p-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">{issue.severity}</p>
                  <p className="mt-1 font-medium">{issue.issue}</p>
                  <p className="mt-1 text-sm text-muted">{issue.why}</p>
                  <p className="mt-2 font-display text-sm italic text-foreground/80">{issue.context}</p>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    {issue.suggestions.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "branch" && (
          <div className="lw-scroll mt-4 min-h-0 flex-1 overflow-auto">
            <Button
              disabled={busy}
              onClick={async () => {
                const text = await runPrompt(s.prompts.find((p) => p.id === "branches")!.template);
                if (!text) return;
                s.setBranches([
                  {
                    id: uid("br"),
                    label: "Branch A",
                    summary: text.slice(0, 280),
                    tone: "From model",
                    consequences: "See full reply in AI Browser",
                    characters: s.characters.map((c) => c.name),
                    futures: ["Open in thread"],
                  },
                ]);
              }}
            >
              Generate A / B / C
            </Button>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {(s.branches.length ? s.branches : ["A", "B", "C"].map((label) => ({
                id: label,
                label: `Branch ${label}`,
                summary: "Run generate to fill from the current scene.",
                tone: "—",
                consequences: "—",
                characters: [],
                futures: [],
              }))).map((b) => (
                <article key={b.id} className="rounded-[var(--radius-md)] border border-border bg-bg p-3">
                  <p className="font-medium">{b.label}</p>
                  <p className="mt-2 text-sm text-muted">{b.summary}</p>
                  <p className="mt-2 text-xs text-subtle">Tone {b.tone}</p>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mt-3"
                    onClick={() => s.setStoryBody(chapter.id, `${chapter.body}\n\n— ${b.label} —\n${b.summary}`)}
                  >
                    Continue from here
                  </Button>
                </article>
              ))}
            </div>
          </div>
        )}

        {tab === "sim" && (
          <CharacterSim />
        )}
      </section>

      <aside className="lw-scroll min-h-0 overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">Studio tools</p>
        {TOOL_GROUPS.map((g) => (
          <div key={g.title} className="mt-4">
            <p className="text-xs text-subtle">{g.title}</p>
            <div className="mt-2 flex flex-col gap-1">
              {g.ids.map((id) => {
                const prompt = s.prompts.find((p) => p.id === id);
                if (!prompt) return null;
                return (
                  <button
                    key={id}
                    disabled={busy}
                    className="h-10 rounded-[var(--radius-sm)] px-2 text-left text-sm hover:bg-surface-2 disabled:opacity-40"
                    onClick={() => {
                      if (id === "whatif") void runPrompt(prompt.template, { tone: whatIf });
                      else void runPrompt(prompt.template);
                    }}
                  >
                    {prompt.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <label className="mt-4 block text-xs text-muted" htmlFor="whatif">
          What-if
        </label>
        <input
          id="whatif"
          className="mt-1 h-10 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-2 text-sm"
          value={whatIf}
          onChange={(e) => setWhatIf(e.target.value)}
        />
        <div className="mt-4 space-y-2">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              const proposed = extractCharacterProposal(chapter.body);
              const existing = s.characters.find((c) => c.name === proposed.name);
              if (existing && existing.locked) return;
              s.upsertCharacter(existing ? mergeProfile(existing, proposed) : proposed);
            }}
          >
            Propose character updates
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => extractWorldProposal(chapter.body).forEach((w) => s.upsertWorld(w))}
          >
            Propose world records
          </Button>
        </div>
        {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        {lastAssistant && tab === "write" && (
          <p className="mt-4 line-clamp-6 text-sm text-muted">{lastAssistant.content}</p>
        )}
      </aside>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-[var(--radius-sm)] bg-bg p-3">
      <dt className="text-[11px] uppercase tracking-[0.14em] text-muted">{k}</dt>
      <dd className="mt-1">{v}</dd>
    </div>
  );
}

function CharacterSim() {
  const s = useLore();
  const { ask, busy } = useAsk();
  const [who, setWho] = useState(s.characters[0]?.id ?? "");
  const [line, setLine] = useState("Why didn't you tell the council?");
  const char = s.characters.find((c) => c.id === who);
  return (
    <div className="mt-4 flex min-h-0 flex-1 flex-col">
      <p className="rounded-[var(--radius-sm)] bg-bg px-3 py-2 text-xs text-muted">
        AI interpretation of a user-supplied character. Not canon.
      </p>
      <select
        className="mt-3 h-10 rounded-[var(--radius-sm)] border border-border bg-bg px-2 text-sm"
        value={who}
        onChange={(e) => setWho(e.target.value)}
      >
        {s.characters.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <Textarea className="mt-3 flex-1" value={line} onChange={(e) => setLine(e.target.value)} />
      <Button
        className="mt-3"
        disabled={busy || !char}
        onClick={() =>
          void ask({
            system: `Stay in character as ${char?.name}. Use their speech notes. This is an interpretation, not the canonical character.\n${JSON.stringify(char)}`,
            prompt: line,
            includeStory: true,
            includePage: false,
          })
        }
      >
        Speak
      </Button>
    </div>
  );
}

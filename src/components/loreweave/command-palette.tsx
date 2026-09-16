import { useEffect, useMemo, useState } from "react";
import { COMMANDS } from "@/lib/loreweave/prompts-catalog";
import { useLore } from "@/lib/loreweave/store";
import type { ModeId } from "@/lib/loreweave/config";
import { cn } from "@/lib/utils";

const MODE_JUMP: { id: ModeId; label: string }[] = [
  { id: "browser", label: "Open AI Browser" },
  { id: "studio", label: "Open Story Studio" },
  { id: "reader", label: "Open Reader" },
  { id: "characters", label: "Open Character Lab" },
  { id: "world", label: "Open World Lab" },
  { id: "prompts", label: "Open Prompt Studio" },
  { id: "memory", label: "Open Notes & Memory" },
  { id: "providers", label: "Open AI Providers" },
  { id: "settings", label: "Open Settings" },
  { id: "support", label: "Open Support" },
];

export function CommandPalette({
  onRun,
}: {
  onRun: (id: string) => void;
}) {
  const open = useLore((s) => s.commandOpen);
  const setOpen = useLore((s) => s.setCommandOpen);
  const setMode = useLore((s) => s.setMode);
  const prompts = useLore((s) => s.prompts);
  const custom = useMemo(() => prompts.filter((p) => !p.builtIn), [prompts]);
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const all = [
      ...MODE_JUMP.map((m) => ({ id: `mode:${m.id}`, label: m.label })),
      ...COMMANDS.map((c) => ({ id: c.id, label: c.label })),
      ...custom.map((p) => ({ id: `prompt:${p.id}`, label: p.name })),
      { id: "note", label: "Create note from selection" },
    ];
    const query = q.trim().toLowerCase();
    return query ? all.filter((i) => i.label.toLowerCase().includes(query)) : all;
  }, [q, custom]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface p-3 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Jump, run, or search…"
          className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-bg px-3 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
            if (e.key === "Enter" && items[0]) {
              const id = items[0].id;
              if (id.startsWith("mode:")) setMode(id.slice(5) as ModeId);
              else onRun(id);
              setOpen(false);
            }
          }}
        />
        <ul className="lw-scroll mt-2 max-h-80 overflow-auto">
          {items.map((item) => (
            <li key={item.id}>
              <button
                className={cn(
                  "flex h-11 w-full items-center rounded-[var(--radius-sm)] px-3 text-left text-sm text-foreground hover:bg-surface-2",
                )}
                onClick={() => {
                  if (item.id.startsWith("mode:")) setMode(item.id.slice(5) as ModeId);
                  else onRun(item.id);
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
          {items.length === 0 && <li className="px-3 py-6 text-sm text-muted">No matching command.</li>}
        </ul>
      </div>
    </div>
  );
}

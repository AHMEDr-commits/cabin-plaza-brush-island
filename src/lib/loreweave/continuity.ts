import type { CharacterProfile, ContinuityIssue, TimelineEvent, WorldRecord } from "./types";
import { uid } from "../utils.ts";

export interface ContinuityInput {
  text: string;
  characters: CharacterProfile[];
  world: WorldRecord[];
  timeline: TimelineEvent[];
}

const DEAD = /\b(died|dead|killed|corpse|funeral|buried)\b/i;
const ALIVE = /\b(alive|survived|woke|breathed|laughed)\b/i;

export function scanContinuity(input: ContinuityInput): ContinuityIssue[] {
  const issues: ContinuityIssue[] = [];
  const { text, characters, world, timeline } = input;

  for (const c of characters) {
    const name = c.name;
    if (!name || !text.includes(name)) continue;
    const status = c.currentStatus.toLowerCase();
    if (status.includes("dead") && ALIVE.test(snippetAround(text, name))) {
      issues.push({
        id: uid("issue"),
        issue: `${name} appears active after being marked dead`,
        why: `Character status is “${c.currentStatus}”, but nearby text treats them as living.`,
        context: snippetAround(text, name),
        suggestions: [
          "Confirm the scene is a flashback or memory.",
          "Update the character status if they returned.",
          "Rewrite the scene so the presence is explained.",
        ],
        severity: "high",
      });
    }
    if (c.age && /\b\d{1,3}\b/.test(c.age)) {
      const stated = Number((c.age.match(/\d{1,3}/) ?? [])[0]);
      const m = new RegExp(`${escapeReg(name)}[^.\\n]{0,40}?(\\d{1,3})[- ]year`, "i").exec(text);
      if (m && Number(m[1]) !== stated) {
        issues.push({
          id: uid("issue"),
          issue: `${name} age may have changed`,
          why: `Profile age is ${c.age}; text mentions ${m[1]}.`,
          context: m[0],
          suggestions: ["Check whether time has passed in-story.", "Correct the profile or the line."],
          severity: "medium",
        });
      }
    }
    if (c.appearance) {
      const hair = c.appearance.match(/\b(black|brown|blonde|red|white|silver|blue|green) hair\b/i);
      if (hair) {
        const other = new RegExp(`${escapeReg(name)}[^.\\n]{0,50}(black|brown|blonde|red|white|silver|blue|green) hair`, "i").exec(
          text,
        );
        if (other && other[1] && other[1].toLowerCase() !== hair[1]!.toLowerCase()) {
          issues.push({
            id: uid("issue"),
            issue: `${name} appearance mismatch`,
            why: `Profile has ${hair[0]}; passage has ${other[1]} hair.`,
            context: other[0],
            suggestions: ["Decide which description is canonical.", "Note a disguise or dye if intentional."],
            severity: "medium",
          });
        }
      }
    }
    if (c.abilities && /cannot|unable|no magic/i.test(c.abilities) && /cast|spell|enchant/i.test(snippetAround(text, name))) {
      issues.push({
        id: uid("issue"),
        issue: `${name} may be using an ability they should not have`,
        why: "Profile lists a limitation; the passage shows a conflicting action.",
        context: snippetAround(text, name),
        suggestions: ["Clarify a loophole.", "Remove the action.", "Update abilities if the character changed."],
        severity: "high",
      });
    }
  }

  for (const loc of world.filter((w) => w.kind === "location")) {
    if (loc.rules && /no magic/i.test(loc.rules) && new RegExp(`${escapeReg(loc.name)}[^.\\n]{0,80}(spell|magic)`, "i").test(text)) {
      issues.push({
        id: uid("issue"),
        issue: `Magic used in ${loc.name}`,
        why: "Location rules forbid or restrict magic.",
        context: snippetAround(text, loc.name),
        suggestions: ["Show the rule being broken on purpose.", "Move the scene.", "Revise the location rule."],
        severity: "medium",
      });
    }
  }

  const ordered = [...timeline].sort((a, b) => a.position - b.position);
  for (let i = 1; i < ordered.length; i++) {
    const prev = ordered[i - 1]!;
    const cur = ordered[i]!;
    if (DEAD.test(prev.description)) {
      for (const name of prev.characters) {
        if (cur.characters.includes(name) && ALIVE.test(cur.description) && !/flashback|memory/i.test(cur.description)) {
          issues.push({
            id: uid("issue"),
            issue: `Timeline order: ${name} after a death event`,
            why: `“${prev.description}” precedes “${cur.description}”.`,
            context: `${prev.chapter} → ${cur.chapter}`,
            suggestions: ["Mark the later event as a flashback.", "Reorder the timeline.", "Clarify survival."],
            severity: "high",
          });
        }
      }
    }
  }

  if (!issues.length && text.length > 40) {
    issues.push({
      id: uid("issue"),
      issue: "No automatic contradiction found",
      why: "Heuristic scan only. It cannot prove a manuscript is consistent.",
      context: text.slice(0, 180),
      suggestions: ["Run an AI continuity pass for subtler issues.", "Check knowledge and relationship status by hand."],
      severity: "low",
    });
  }

  return issues;
}

function snippetAround(text: string, needle: string): string {
  const i = text.indexOf(needle);
  if (i < 0) return text.slice(0, 160);
  const a = Math.max(0, i - 80);
  const b = Math.min(text.length, i + needle.length + 80);
  return text.slice(a, b).trim();
}

function escapeReg(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

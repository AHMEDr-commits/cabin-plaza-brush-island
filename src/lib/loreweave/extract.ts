import type { CharacterProfile, WorldRecord } from "./types";
import { nowIso, uid } from "../utils.ts";

export function extractCharacterProposal(text: string, existing?: CharacterProfile): CharacterProfile {
  const name =
    existing?.name ||
    (text.match(/\b([A-Z][a-z]{2,}(?:\s[A-Z][a-z]+)*)\b/) ?? [])[1] ||
    "Unnamed";
  const age = (text.match(/(\d{1,3})\s*(?:years old|-year-old)/i) ?? [])[1] ?? existing?.age ?? "";
  const appearance = grab(text, /(hair|eyes|wore|wearing|tall|scar)[^.]+/i) || existing?.appearance || "";
  const speech = (text.match(/["“]([^"”]{8,80})["”]/) ?? [])[1] ?? "";
  return {
    id: existing?.id ?? uid("char"),
    name,
    aliases: existing?.aliases ?? [],
    age,
    appearance,
    personality: existing?.personality ?? grab(text, /\b(stubborn|kind|cruel|wry|gentle|ambitious)[^.]+/i),
    goals: existing?.goals ?? "",
    fears: existing?.fears ?? "",
    strengths: existing?.strengths ?? "",
    weaknesses: existing?.weaknesses ?? "",
    abilities: existing?.abilities ?? "",
    relationships: existing?.relationships ?? "",
    speechPatterns: existing?.speechPatterns || (speech ? `Sample: “${speech}”` : ""),
    importantEvents: existing?.importantEvents ?? "",
    arc: existing?.arc ?? "",
    knownFacts: unique([...(existing?.knownFacts ?? []), ...factsFrom(text, name)]),
    secrets: existing?.secrets ?? [],
    currentStatus: existing?.currentStatus || "Active in current draft",
    voiceNotes: existing?.voiceNotes ?? "",
    createdAt: existing?.createdAt ?? nowIso(),
    updatedAt: nowIso(),
    locked: existing?.locked ?? false,
  };
}

export function extractWorldProposal(text: string): WorldRecord[] {
  const names = [...new Set(text.match(/\b([A-Z][a-z]+(?:\s[A-Z][a-z]+){0,2})\b/g) ?? [])]
    .filter((n) => n.length > 3 && !["The", "She", "When", "Then"].includes(n))
    .slice(0, 6);
  return names.map((name) => ({
    id: uid("world"),
    kind: /kingdom|city|harbor|sea|forest|keep/i.test(name) ? "location" : "concept",
    name,
    summary: grab(text, new RegExp(`${name}[^.]+\\.`)) || `Mentioned in the supplied text.`,
    details: "",
    rules: "",
    related: [],
    createdAt: nowIso(),
    updatedAt: nowIso(),
    locked: false,
  }));
}

export function mergeProfile(base: CharacterProfile, proposed: CharacterProfile): CharacterProfile {
  if (base.locked) return base;
  const mergeText = (a: string, b: string) => a.trim() || b;
  return {
    ...base,
    age: mergeText(base.age, proposed.age),
    appearance: mergeText(base.appearance, proposed.appearance),
    personality: mergeText(base.personality, proposed.personality),
    speechPatterns: mergeText(base.speechPatterns, proposed.speechPatterns),
    knownFacts: unique([...base.knownFacts, ...proposed.knownFacts]),
    updatedAt: nowIso(),
  };
}

function grab(text: string, re: RegExp): string {
  return (text.match(re) ?? [])[0]?.trim() ?? "";
}

function factsFrom(text: string, name: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.includes(name))
    .slice(0, 5)
    .map((s) => s.trim());
}

function unique(items: string[]): string[] {
  return [...new Set(items.filter(Boolean))];
}

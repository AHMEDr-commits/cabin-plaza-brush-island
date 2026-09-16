export interface ExtractedIntel {
  facts: string[];
  names: string[];
  dates: string[];
  numbers: string[];
  tables: string[];
}

const NAME = /\b([A-Z][a-z]+(?:\s[A-Z][a-z]+){0,2})\b/g;
const DATE = /\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{4}|\d{4}-\d{2}-\d{2})\b/g;
const NUM = /\b\d+(?:[.,]\d+)?%?\b/g;

export function extractIntel(text: string): ExtractedIntel {
  const names = unique((text.match(NAME) ?? []).filter((n) => n.length > 2 && !STOP.has(n)));
  const dates = unique(text.match(DATE) ?? []);
  const numbers = unique((text.match(NUM) ?? []).slice(0, 40));
  const facts = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 40 && s.length < 240)
    .slice(0, 24);
  const tables: string[] = [];
  for (const line of text.split("\n")) {
    if ((line.match(/\t|,|;|\s{2,}/g) ?? []).length >= 2 && line.length < 200) tables.push(line.trim());
  }
  return { facts, names: names.slice(0, 30), dates: dates.slice(0, 20), numbers, tables: tables.slice(0, 12) };
}

export function toFlashcards(text: string): { q: string; a: string }[] {
  return extractIntel(text)
    .facts.slice(0, 12)
    .map((f) => {
      const bits = f.split(/:|—|-/);
      if (bits.length >= 2) return { q: bits[0]!.trim() + "?", a: bits.slice(1).join("—").trim() };
      return { q: `What is noted here?`, a: f };
    });
}

const STOP = new Set([
  "The",
  "This",
  "That",
  "When",
  "Then",
  "And",
  "But",
  "For",
  "With",
  "From",
  "After",
  "Before",
  "She",
  "He",
  "They",
]);

function unique(items: string[]): string[] {
  return [...new Set(items)];
}

export function detectChapters(text: string): { title: string; start: number }[] {
  const out: { title: string; start: number }[] = [];
  const re = /^(chapter\s+\d+\b.*|#{1,3}\s+.+)$/gim;
  for (const m of text.matchAll(re)) {
    if (m.index != null) out.push({ title: m[0]!.replace(/^#+\s*/, ""), start: m.index });
  }
  return out;
}

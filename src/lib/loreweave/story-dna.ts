export interface StoryDna {
  tone: string;
  mood: string;
  pacing: string;
  narrativeDistance: string;
  dialogueDensity: number;
  actionDensity: number;
  emotionalIntensity: number;
  themes: string[];
  settingHints: string[];
  repeatedPhrases: string[];
  habits: string[];
  avgSentence: number;
  wordCount: number;
  guidance: string;
}

const STOP = new Set(
  "the a an and or but in on at to for of as is was were be been being with that this those these it he she they i you we not from by into over after before".split(
    " ",
  ),
);

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function ngrams(words: string[], n: number): Map<string, number> {
  const map = new Map<string, number>();
  for (let i = 0; i <= words.length - n; i++) {
    const slice = words.slice(i, i + n);
    if (slice.some((w) => STOP.has(w))) continue;
    const key = slice.join(" ");
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
}

export function analyzeStoryDna(text: string): StoryDna {
  const clean = text.replace(/\s+/g, " ").trim();
  const sents = sentences(clean);
  const words = clean.toLowerCase().replace(/[^a-z0-9\s'-]/g, "").split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const avgSentence = sents.length ? wordCount / sents.length : 0;
  const dialogueLines = (text.match(/["“][^"”]+["”]/g) ?? []).length;
  const dialogueDensity = wordCount ? Math.min(1, (dialogueLines * 12) / wordCount) : 0;
  const actionHits = (clean.match(/\b(ran|struck|leapt|grabbed|fired|slammed|cut|threw|dodged|charged)\b/gi) ?? [])
    .length;
  const emotionHits = (clean.match(
    /\b(love|fear|grief|anger|hope|shame|longing|hurt|joy|dread|ache|tender)\b/gi,
  ) ?? []).length;
  const actionDensity = wordCount ? Math.min(1, (actionHits * 18) / wordCount) : 0;
  const emotionalIntensity = wordCount ? Math.min(1, (emotionHits * 22) / wordCount) : 0;
  const first = (clean.match(/\b(I|me|my)\b/g) ?? []).length;
  const third = (clean.match(/\b(he|she|they|his|her|their)\b/gi) ?? []).length;
  const narrativeDistance =
    first > third * 0.8 ? "Close first person" : avgSentence > 22 ? "Slightly distant third" : "Close third";
  const pacing = avgSentence < 12 ? "Fast, clipped" : avgSentence > 24 ? "Measured, expansive" : "Balanced";
  const tone =
    emotionHits > actionHits ? "Interior / emotional" : actionHits > emotionHits + 2 ? "Kinetic / external" : "Mixed";
  const mood = /dark|blood|ash|night|grave/i.test(clean)
    ? "Nocturnal, heavy"
    : /light|warm|laugh|sun/i.test(clean)
      ? "Warmer, open"
      : "Neutral-literary";
  const phrases = [...ngrams(words, 3).entries()]
    .filter(([, n]) => n >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([p]) => p);
  const themes: string[] = [];
  if (/duty|oath|promise/i.test(clean)) themes.push("Duty");
  if (/memory|remember|forget/i.test(clean)) themes.push("Memory");
  if (/power|king|crown|rule/i.test(clean)) themes.push("Power");
  if (/love|heart|kiss/i.test(clean)) themes.push("Attachment");
  if (/sea|harbor|tide|ship/i.test(clean)) themes.push("The sea");
  const settingHints = [
    ...new Set(
      (clean.match(/\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\b/g) ?? [])
        .filter((n) => n.length > 3 && !["The", "She", "He", "They"].includes(n))
        .slice(0, 8),
    ),
  ];
  const habits: string[] = [];
  if (avgSentence > 26) habits.push("Long multi-clause sentences");
  if (dialogueDensity > 0.35) habits.push("Dialogue-forward scenes");
  if ((clean.match(/—/g) ?? []).length > 4) habits.push("Em dashes for interruption");
  if ((clean.match(/\bthen\b/gi) ?? []).length > 6) habits.push("Sequential 'then' connective");
  const guidance = [
    `Preserve ${narrativeDistance.toLowerCase()} voice.`,
    `Keep ${pacing.toLowerCase()} pacing.`,
    `Dialogue share ~${Math.round(dialogueDensity * 100)}%; do not flatten it.`,
    themes.length ? `Lean into themes: ${themes.join(", ")}.` : "Do not invent a foreign theme.",
    "This is guidance from the supplied text, not a claim that a living author's style can be copied.",
  ].join(" ");
  return {
    tone,
    mood,
    pacing,
    narrativeDistance,
    dialogueDensity: Number(dialogueDensity.toFixed(2)),
    actionDensity: Number(actionDensity.toFixed(2)),
    emotionalIntensity: Number(emotionalIntensity.toFixed(2)),
    themes,
    settingHints,
    repeatedPhrases: phrases,
    habits,
    avgSentence: Number(avgSentence.toFixed(1)),
    wordCount,
    guidance,
  };
}

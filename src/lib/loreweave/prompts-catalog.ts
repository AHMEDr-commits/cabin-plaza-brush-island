import type { PromptTemplate } from "./types";

function p(
  id: string,
  name: string,
  description: string,
  category: string,
  template: string,
  variables: PromptTemplate["variables"] = [],
): PromptTemplate {
  return { id, name, description, category, template, variables, builtIn: true };
}

const STORY_SYS = `You are Loreweave Story Studio, a careful fiction editor.
Honor the user's supplied characters, world facts, and Story DNA guidance.
Never claim to clone a living author's unique style. Improve the user's text.
Do not invent canon the user did not supply. Mark uncertainty.`;

export const BUILT_IN_PROMPTS: PromptTemplate[] = [
  p("explain", "Explain selection", "Plain-language explanation", "browser", "Explain this clearly:\n\n{{selected_text}}"),
  p("summarize", "Summarize", "Short summary", "browser", "Summarize for a busy reader. Keep names and numbers:\n\n{{page_text}}"),
  p("rewrite", "Rewrite", "Cleaner rewrite", "browser", "Rewrite more clearly, keep meaning:\n\n{{selected_text}}"),
  p("shorten", "Shorten", "Condense", "browser", "Cut ~40% without losing facts:\n\n{{selected_text}}"),
  p("expand", "Expand", "Add texture", "studio", "Expand with sensory detail. Do not change plot:\n\n{{selected_text}}"),
  p("simplify", "Simplify", "Easier reading", "browser", "Simplify vocabulary, keep meaning:\n\n{{selected_text}}"),
  p("pro", "Professionalize", "Formal register", "browser", "Make this professional and direct:\n\n{{selected_text}}"),
  p("casual", "Make casual", "Conversational", "browser", "Make this casual and human:\n\n{{selected_text}}"),
  p("translate", "Translate", "Into a target language", "browser", "Translate into {{tone}}:\n\n{{selected_text}}", [
    { key: "tone", label: "Language", defaultValue: "English" },
  ]),
  p("grammar", "Fix grammar", "Mechanics only", "browser", "Fix grammar and spelling only:\n\n{{selected_text}}"),
  p("pov", "Change POV", "Shift narrator", "studio", `${STORY_SYS}\nRewrite in {{tone}} POV. Keep events.\n\n{{selected_text}}`, [
    { key: "tone", label: "POV", defaultValue: "close third" },
  ]),
  p("dialogue", "Improve dialogue", "Sharper speech", "studio", `${STORY_SYS}\nImprove dialogue. Keep character voice.\nCharacter notes:\n{{character}}\n\n{{selected_text}}`),
  p("emotion", "More emotional", "Raise interiority", "studio", `${STORY_SYS}\nHeighten emotion without melodrama.\n\n{{selected_text}}`),
  p("dramatic", "More dramatic", "Raise stakes on the page", "studio", `${STORY_SYS}\nIncrease dramatic pressure. No extra plot twists unless needed.\n\n{{selected_text}}`),
  p("darker", "Make darker", "Shadow the tone", "studio", `${STORY_SYS}\nShift darker in imagery and consequence. Keep characters in-character.\n\n{{selected_text}}`),
  p("funnier", "Make funnier", "Wit without sitcom beats", "studio", `${STORY_SYS}\nAdd dry or character-true humor.\n\n{{selected_text}}`),
  p("action", "Improve action", "Clearer kinetic prose", "studio", `${STORY_SYS}\nClarify blocking and impact. Shorten foggy clauses.\n\n{{selected_text}}`),
  p("romance", "Romance / tension", "Charge the space between people", "studio", `${STORY_SYS}\nIncrease romantic or interpersonal tension. No OOC flirting.\n{{character}}\n\n{{selected_text}}`),
  p("continue", "Continue", "Next passage", "studio", `${STORY_SYS}\nContinue this in the same voice. 400-800 words unless asked otherwise.\nStory DNA:\n{{tone}}\n\n{{selected_text}}`),
  p("chapter-rewrite", "Rewrite chapter", "Preserve personalities", "studio", `${STORY_SYS}\nRewrite the chapter. Preserve personalities in the notes.\nCharacters:\n{{character}}\nDNA:\n{{tone}}\n\n{{chapter}}`),
  p("au", "AU generator", "Alternate universe premise", "studio", `Create 5 AU premises for this story. Keep character cores.\n{{story}}\nCharacters:\n{{character}}`),
  p("whatif", "What-if", "Branch from a change", "studio", `Explore this what-if. Show consequences, not a full novel.\nChange: {{tone}}\nStory:\n{{story}}`),
  p("crossover", "Crossover", "Careful mashup", "studio", `Propose a crossover that respects both settings' rules.\nStory A:\n{{story}}\nOther world:\n{{world}}`),
  p("plothole", "Plot-hole detector", "List possible holes", "studio", `List possible plot holes. Separate fact vs speculation.\n{{story}}\n{{chapter}}`),
  p("continuity", "Continuity check", "Contradictions", "studio", `Find continuity issues. For each: issue, why, context, suggested fixes. Do not auto-fix.\nCharacters:\n{{character}}\nWorld:\n{{world}}\nText:\n{{chapter}}`),
  p("titles", "Chapter titles", "Title options", "studio", `Give 12 chapter titles: literal, lyrical, and sly.\n{{chapter}}`),
  p("outline", "Story outline", "Beat outline", "studio", `Outline this story in acts and beats.\n{{story}}`),
  p("scene-forge", "Scene Forge", "Build a scene from intent", "studio", `Write a complete scene.\nIntent: {{tone}}\nCharacters: {{character}}\nSetting: {{world}}\nPrior: {{selected_text}}`),
  p("story-doctor", "Story Doctor", "Diagnose craft", "studio", `Diagnose structure, character, pacing, theme. Prioritized notes, no rewrite unless asked.\n{{story}}`),
  p("voice-lock", "Character Voice Lock", "Rewrite in one voice", "studio", `Rewrite so only this character's diction remains.\n{{character}}\n\n{{selected_text}}`),
  p("branches", "Three continuations", "A / B / C", "studio", `Give 3 distinct continuations. For each: summary, tone, consequences, characters affected, future directions.\n{{selected_text}}`),
  p("alt-ending", "Alternate ending", "Ending options", "studio", `Write 3 alternate endings: bittersweet, hard, and strange-hopeful.\n{{story}}`),
  p("missing-scene", "Missing scene", "Implied scene", "studio", `Write a missing scene the text implies but skips.\n{{story}}\nGap: {{tone}}`),
  p("foreshadow", "Foreshadowing", "Plant later payoffs", "studio", `Suggest 6 foreshadowing inserts with payoff chapter guesses.\n{{story}}`),
  p("conflict", "Conflict generator", "Pressure options", "studio", `Generate 8 conflicts that follow from character goals.\n{{character}}\n{{world}}`),
  p("romance-arc", "Romance arc", "Relationship path", "studio", `Build a romance arc in 8 beats. Keep agency on both sides.\n{{character}}`),
  p("villain", "Villain builder", "Antagonist dossier", "studio", `Build a villain from the world's rules and the hero's wound.\n{{character}}\n{{world}}`),
  p("side", "Side character", "Secondary cast", "studio", `Invent 5 side characters the plot actually needs.\n{{story}}`),
  p("pacing", "Pacing analyzer", "Scene energy", "studio", `Analyze pacing per section. Mark stalls and rushes.\n{{chapter}}`),
  p("structure", "Chapter structure", "Scene jobs", "studio", `Name each scene's job (turn, reveal, breath, aftermath).\n{{chapter}}`),
  p("hook", "Opening hook", "First-page options", "studio", `Write 5 opening hooks in the story's voice.\n{{story}}`),
  p("cliff", "Cliffhanger", "Chapter-end turns", "studio", `Write 5 cliffhangers that follow from current stakes.\n{{chapter}}`),
  p("synopsis", "Synopsis", "Query-ready", "studio", `Write a short and a 500-word synopsis. No spoilers in the short one if marked.\n{{story}}`),
  p("tags", "Tag generator", "Discovery tags", "studio", `Suggest archive-style tags and warnings from the text only.\n{{story}}`),
  p("wwd", "What would they do?", "Character choice", "studio", `This is an AI interpretation, not canon.\nSituation: {{tone}}\nCharacter:\n{{character}}\nStory context:\n{{story}}`),
  p("study-notes", "Study notes", "From the page", "browser", "Turn this into structured study notes with headings and key terms:\n\n{{page_text}}"),
  p("flashcards", "Flashcards", "Q/A cards", "browser", "Make 12 flashcards as Q | A lines:\n\n{{page_text}}"),
  p("quiz", "Quiz", "Check understanding", "browser", "Write a 8-question quiz with answers at the end:\n\n{{page_text}}"),
  p("facts", "Extract facts", "Atomic facts", "browser", "Extract facts as a bullet list. Separate facts from claims:\n\n{{page_text}}"),
  p("email", "Professional email", "From notes", "browser", "Draft a professional email.\nGoal: {{tone}}\nNotes:\n{{selected_text}}"),
  p("fanfic-prompt", "Fanfiction prompt", "Premise sparks", "studio", "Give 10 fanfiction prompts from this material. Label AU vs canon-divergent.\n{{story}}\n{{character}}"),
];

export const CONTEXT_MENU_ACTIONS = [
  "explain",
  "summarize",
  "rewrite",
  "shorten",
  "expand",
  "simplify",
  "pro",
  "casual",
  "translate",
  "grammar",
  "pov",
  "dialogue",
  "emotion",
  "dramatic",
  "darker",
  "funnier",
  "action",
  "romance",
  "continue",
] as const;

export const COMMANDS = [
  { id: "summarize-page", label: "Summarize page", promptId: "summarize" },
  { id: "explain-sel", label: "Explain selection", promptId: "explain" },
  { id: "rewrite-sel", label: "Rewrite selection", promptId: "rewrite" },
  { id: "continue", label: "Continue text", promptId: "continue" },
  { id: "translate", label: "Translate", promptId: "translate" },
  { id: "analyze", label: "Analyze page", promptId: "facts" },
  { id: "note", label: "Create note", promptId: "" },
  { id: "open-studio", label: "Open Story Studio", promptId: "" },
  { id: "open-chars", label: "Open Character Lab", promptId: "" },
  { id: "open-prompts", label: "Open Prompt Studio", promptId: "" },
  { id: "compare", label: "Compare tabs", promptId: "" },
  { id: "titles", label: "Generate chapter title", promptId: "titles" },
] as const;

import { i as __toESM } from "../_runtime.mjs";
import { R as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as maskKey, n as PRODUCT, r as SUPPORT_LINKS, t as MODES } from "./key-security-CC_smRtt.mjs";
import { _ as Compass, a as Settings2, b as BookOpen, c as PanelRight, d as KeyRound, f as Heart, g as Copy, h as Download, i as Square, l as NotebookPen, m as Earth, n as Users, o as RotateCcw, p as Feather, s as Plus, t as WandSparkles, u as Library, v as Command, y as BookmarkPlus } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ChfFw5ii.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Mark({ className = "size-7" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "7",
				fill: "currentColor",
				className: "text-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "var(--color-bg)",
				d: "M16 5 L25 14 L16 23 L7 14 Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				className: "text-foreground",
				d: "M9 13 H23 V15.6 H9 Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				className: "text-foreground",
				d: "M14.7 7 H17.3 V21 H14.7 Z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "var(--color-accent)",
				d: "M16 22.8 L12.4 28 H19.6 Z"
			})
		]
	});
}
function p(id, name, description, category, template, variables = []) {
	return {
		id,
		name,
		description,
		category,
		template,
		variables,
		builtIn: true
	};
}
var STORY_SYS = `You are Loreweave Story Studio, a careful fiction editor.
Honor the user's supplied characters, world facts, and Story DNA guidance.
Never claim to clone a living author's unique style. Improve the user's text.
Do not invent canon the user did not supply. Mark uncertainty.`;
var BUILT_IN_PROMPTS = [
	p("explain", "Explain selection", "Plain-language explanation", "browser", "Explain this clearly:\n\n{{selected_text}}"),
	p("summarize", "Summarize", "Short summary", "browser", "Summarize for a busy reader. Keep names and numbers:\n\n{{page_text}}"),
	p("rewrite", "Rewrite", "Cleaner rewrite", "browser", "Rewrite more clearly, keep meaning:\n\n{{selected_text}}"),
	p("shorten", "Shorten", "Condense", "browser", "Cut ~40% without losing facts:\n\n{{selected_text}}"),
	p("expand", "Expand", "Add texture", "studio", "Expand with sensory detail. Do not change plot:\n\n{{selected_text}}"),
	p("simplify", "Simplify", "Easier reading", "browser", "Simplify vocabulary, keep meaning:\n\n{{selected_text}}"),
	p("pro", "Professionalize", "Formal register", "browser", "Make this professional and direct:\n\n{{selected_text}}"),
	p("casual", "Make casual", "Conversational", "browser", "Make this casual and human:\n\n{{selected_text}}"),
	p("translate", "Translate", "Into a target language", "browser", "Translate into {{tone}}:\n\n{{selected_text}}", [{
		key: "tone",
		label: "Language",
		defaultValue: "English"
	}]),
	p("grammar", "Fix grammar", "Mechanics only", "browser", "Fix grammar and spelling only:\n\n{{selected_text}}"),
	p("pov", "Change POV", "Shift narrator", "studio", `${STORY_SYS}\nRewrite in {{tone}} POV. Keep events.\n\n{{selected_text}}`, [{
		key: "tone",
		label: "POV",
		defaultValue: "close third"
	}]),
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
	p("fanfic-prompt", "Fanfiction prompt", "Premise sparks", "studio", "Give 10 fanfiction prompts from this material. Label AU vs canon-divergent.\n{{story}}\n{{character}}")
];
var CONTEXT_MENU_ACTIONS = [
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
	"continue"
];
var COMMANDS = [
	{
		id: "summarize-page",
		label: "Summarize page",
		promptId: "summarize"
	},
	{
		id: "explain-sel",
		label: "Explain selection",
		promptId: "explain"
	},
	{
		id: "rewrite-sel",
		label: "Rewrite selection",
		promptId: "rewrite"
	},
	{
		id: "continue",
		label: "Continue text",
		promptId: "continue"
	},
	{
		id: "translate",
		label: "Translate",
		promptId: "translate"
	},
	{
		id: "analyze",
		label: "Analyze page",
		promptId: "facts"
	},
	{
		id: "note",
		label: "Create note",
		promptId: ""
	},
	{
		id: "open-studio",
		label: "Open Story Studio",
		promptId: ""
	},
	{
		id: "open-chars",
		label: "Open Character Lab",
		promptId: ""
	},
	{
		id: "open-prompts",
		label: "Open Prompt Studio",
		promptId: ""
	},
	{
		id: "compare",
		label: "Compare tabs",
		promptId: ""
	},
	{
		id: "titles",
		label: "Generate chapter title",
		promptId: "titles"
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
function nowIso() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function downloadText(filename, contents, mime = "text/plain") {
	const blob = new Blob([contents], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function isMac() {
	if (typeof navigator === "undefined") return false;
	return /Mac|iPhone|iPad/.test(navigator.platform) || /Mac OS/.test(navigator.userAgent);
}
var BUILT_IN_PROVIDERS = [
	{
		kind: "openai",
		name: "OpenAI",
		format: "openai",
		baseUrl: "https://api.openai.com/v1",
		models: [
			"gpt-4.1",
			"gpt-4.1-mini",
			"gpt-4o",
			"gpt-4o-mini",
			"o4-mini"
		],
		docs: "https://platform.openai.com/docs"
	},
	{
		kind: "anthropic",
		name: "Anthropic",
		format: "anthropic",
		baseUrl: "https://api.anthropic.com/v1",
		models: [
			"claude-sonnet-4-5",
			"claude-opus-4-5",
			"claude-haiku-4-5"
		],
		docs: "https://docs.anthropic.com"
	},
	{
		kind: "google",
		name: "Google Gemini",
		format: "gemini",
		baseUrl: "https://generativelanguage.googleapis.com/v1beta",
		models: [
			"gemini-2.5-pro",
			"gemini-2.5-flash",
			"gemini-2.0-flash"
		],
		docs: "https://ai.google.dev/docs"
	},
	{
		kind: "openrouter",
		name: "OpenRouter",
		format: "openai",
		baseUrl: "https://openrouter.ai/api/v1",
		models: [
			"openai/gpt-4o-mini",
			"anthropic/claude-sonnet-4.5",
			"google/gemini-2.5-flash"
		],
		docs: "https://openrouter.ai/docs"
	},
	{
		kind: "groq",
		name: "Groq",
		format: "openai",
		baseUrl: "https://api.groq.com/openai/v1",
		models: [
			"llama-3.3-70b-versatile",
			"llama-3.1-8b-instant",
			"mixtral-8x7b-32768"
		],
		docs: "https://console.groq.com/docs"
	},
	{
		kind: "mistral",
		name: "Mistral",
		format: "openai",
		baseUrl: "https://api.mistral.ai/v1",
		models: ["mistral-large-latest", "mistral-small-latest"],
		docs: "https://docs.mistral.ai"
	},
	{
		kind: "cohere",
		name: "Cohere",
		format: "openai",
		baseUrl: "https://api.cohere.ai/compatibility/v1",
		models: ["command-r-plus", "command-r"],
		docs: "https://docs.cohere.com"
	},
	{
		kind: "deepseek",
		name: "DeepSeek",
		format: "openai",
		baseUrl: "https://api.deepseek.com",
		models: ["deepseek-chat", "deepseek-reasoner"],
		docs: "https://api-docs.deepseek.com"
	},
	{
		kind: "perplexity",
		name: "Perplexity",
		format: "openai",
		baseUrl: "https://api.perplexity.ai",
		models: ["sonar-pro", "sonar"],
		docs: "https://docs.perplexity.ai"
	},
	{
		kind: "together",
		name: "Together AI",
		format: "openai",
		baseUrl: "https://api.together.xyz/v1",
		models: ["meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo"],
		docs: "https://docs.together.ai"
	},
	{
		kind: "fireworks",
		name: "Fireworks",
		format: "openai",
		baseUrl: "https://api.fireworks.ai/inference/v1",
		models: ["accounts/fireworks/models/llama-v3p1-70b-instruct"],
		docs: "https://docs.fireworks.ai"
	},
	{
		kind: "xai",
		name: "xAI",
		format: "openai",
		baseUrl: "https://api.x.ai/v1",
		models: [
			"grok-4.5",
			"grok-3",
			"grok-3-mini"
		],
		docs: "https://docs.x.ai"
	},
	{
		kind: "ollama",
		name: "Ollama (local)",
		format: "ollama",
		baseUrl: "http://localhost:11434",
		models: [
			"llama3.1",
			"qwen2.5",
			"mistral"
		],
		docs: "https://github.com/ollama/ollama"
	}
];
function makeBuiltInAccount(kind) {
	const spec = BUILT_IN_PROVIDERS.find((p) => p.kind === kind);
	if (!spec) throw new Error(`Unknown provider ${kind}`);
	return {
		id: uid("prov"),
		name: spec.name,
		kind: spec.kind,
		format: spec.format,
		baseUrl: spec.baseUrl,
		models: [...spec.models],
		defaultModel: spec.models[0] ?? "",
		keys: [],
		enabled: true,
		streaming: spec.format !== "gemini",
		contextWindow: spec.kind === "ollama" ? 8192 : 128e3,
		temperature: .7,
		maxOutput: 2048,
		builtIn: true
	};
}
function pickKey(account) {
	const enabled = account.keys.filter((k) => k.enabled && k.secret.trim());
	if (!enabled.length) return null;
	return enabled[0].secret;
}
var CHAPTER = `The lamps along Ashlight Harbor burned low, each wick trimmed to a coin of gold against the fog. Mara Keel stood on the customs pier with salt in her hair and a ledger that would not balance.

"You're early," said Warden Holt. He did not look at her. He looked at the black water as if it owed him an apology.

"I'm on time for a lie," Mara said. "That's close enough."

Below them, the Tide-Gate groaned. No ship should have passed it after last bell. Something had. The wood of the pier remembered the weight — a long scrape, then silence, then the smell of wet iron.

Mara's left glove hid a map burned into her palm the night the old lantern went out. Holt knew the rumor. He did not know the map still stung when she lied.

"If the lantern is really gone," he said, "the harbor will eat the town by winter."

"Then we find who took the light." She closed the ledger. "And we do not tell the council until we can survive the telling."`;
function seedProviders() {
	return [
		"openai",
		"anthropic",
		"google",
		"openrouter",
		"groq",
		"mistral",
		"cohere",
		"deepseek",
		"perplexity",
		"together",
		"fireworks",
		"xai",
		"ollama"
	].map((kind) => makeBuiltInAccount(kind));
}
function seedCharacters() {
	const t = (/* @__PURE__ */ new Date()).toISOString();
	return [
		{
			id: "char_mara",
			name: "Mara Keel",
			aliases: ["Customs Mara", "the ledger girl"],
			age: "29",
			appearance: "Salt-stiff dark hair, burnt map on left palm, worn gloves, harbor coat.",
			personality: "Dry, stubborn, allergic to speeches, loyal past the point of sense.",
			goals: "Recover the stolen harbor lantern without handing the town to the council.",
			fears: "Becoming the kind of official who balances books by erasing people.",
			strengths: "Reads ledgers, tides, and liars. Steady in fog.",
			weaknesses: "Will not ask for help until the pier is already burning.",
			abilities: "Mundane. The palm-map stings near Tide-Gate magic but she cannot cast.",
			relationships: "Uneasy alliance with Warden Holt. Debt to the missing lantern-keeper.",
			speechPatterns: "Short sentences. Jokes that sound like invoices.",
			importantEvents: "Night the old lantern went out; received the palm map.",
			arc: "From clerk of other people's secrets to someone who will spend one.",
			knownFacts: ["Works customs at Ashlight Harbor", "Palm map burns when she lies"],
			secrets: ["The map still stings when she lies"],
			currentStatus: "Alive, on the customs pier",
			voiceNotes: "Never grand. Never explains a feeling twice.",
			createdAt: t,
			updatedAt: t,
			locked: false
		},
		{
			id: "char_holt",
			name: "Warden Holt",
			aliases: ["Holt"],
			age: "44",
			appearance: "Grey at the temples, harbor-watch coat, a voice that stays low.",
			personality: "Formal, tired, precise. Protects the town by rationing hope.",
			goals: "Keep Ashlight standing through winter.",
			fears: "Another vanishing like the lantern-keeper's.",
			strengths: "Authority, patience, knowledge of the Tide-Gate.",
			weaknesses: "Will look at the water instead of a person when the truth is expensive.",
			abilities: "Warden's keys; no claimed magic.",
			relationships: "Commands the watch. Distrusts the council. Relies on Mara's numbers.",
			speechPatterns: "Measured. Rarely uses first names.",
			importantEvents: "Last bell, unauthorized passage through the Tide-Gate.",
			arc: "From keeper of rules to breaker of one.",
			knownFacts: ["Warden of Ashlight Harbor"],
			secrets: [],
			currentStatus: "Alive",
			voiceNotes: "Does not look at people when the news is bad.",
			createdAt: t,
			updatedAt: t,
			locked: false
		},
		{
			id: "char_keeper",
			name: "Len Calder",
			aliases: ["the lantern-keeper"],
			age: "unknown",
			appearance: "Last seen in soot-stained grey, brass wick-cutters at the belt.",
			personality: "Soft-spoken, secret-keeping, fond of bad tea.",
			goals: "Unknown after disappearance.",
			fears: "The harbor going dark.",
			strengths: "Knew every lamp by name.",
			weaknesses: "Trusted the council once.",
			abilities: "Lantern-craft. Possibly bound to the old light.",
			relationships: "Mara owes him. Holt searched three nights.",
			speechPatterns: "Half-finished sentences, as if the lamp interrupted.",
			importantEvents: "Vanished the night the old lantern went out.",
			arc: "Missing; status unresolved.",
			knownFacts: ["Missing since the lantern failed"],
			secrets: ["May have taken the light rather than lost it"],
			currentStatus: "Missing — not confirmed dead",
			voiceNotes: "Gentle, unfinished.",
			createdAt: t,
			updatedAt: t,
			locked: false
		}
	];
}
function seedWorld() {
	const t = (/* @__PURE__ */ new Date()).toISOString();
	return [
		{
			id: "world_harbor",
			kind: "location",
			name: "Ashlight Harbor",
			summary: "Fogbound port whose lamps are more than decoration.",
			details: "Customs pier, Tide-Gate, council hall on the upper switchback.",
			rules: "Lights must burn after last bell. Unauthorized gate passage is a hanging offense in theory, a rumor in practice.",
			related: ["Tide-Gate", "Old Lantern"],
			createdAt: t,
			updatedAt: t,
			locked: false
		},
		{
			id: "world_gate",
			kind: "technology",
			name: "Tide-Gate",
			summary: "Harbor mouth engine that admits ships by bell and draught.",
			details: "Groans when forced. Remembers weight in the wood of the pier.",
			rules: "No passage after last bell without Warden seal.",
			related: ["Ashlight Harbor"],
			createdAt: t,
			updatedAt: t,
			locked: false
		},
		{
			id: "world_lantern",
			kind: "item",
			name: "Old Lantern",
			summary: "The harbor's master light. Stolen or extinguished.",
			details: "If gone through winter, the harbor 'eats' the town — meaning unclear, believed literal by sailors.",
			rules: "Cannot be lit by ordinary flame once claimed.",
			related: ["Len Calder", "Mara Keel"],
			createdAt: t,
			updatedAt: t,
			locked: false
		}
	];
}
function seedTimeline() {
	return [{
		id: "tl_1",
		chapter: "Prologue",
		position: 1,
		characters: ["Len Calder"],
		location: "Lamp loft",
		description: "The old lantern goes out. Len vanishes.",
		consequences: "Harbor lamps burn low. Mara receives a palm map."
	}, {
		id: "tl_2",
		chapter: "1",
		position: 2,
		characters: ["Mara Keel", "Warden Holt"],
		location: "Customs pier",
		description: "Unauthorized passage after last bell. Mara and Holt agree to hunt the light before telling the council.",
		consequences: "Investigation begins in secret."
	}];
}
function seedStory() {
	const t = (/* @__PURE__ */ new Date()).toISOString();
	return {
		id: "story_ashlight",
		title: "Ashlight Harbor",
		fandom: "Original",
		synopsis: "A customs clerk and a tired warden hunt a stolen harbor lantern before winter — and before the council turns the search into a purge.",
		tags: [
			"original",
			"maritime",
			"low fantasy",
			"mystery"
		],
		chapters: [{
			id: "ch_1",
			title: "Last Bell",
			body: CHAPTER,
			notes: "Keep Mara's jokes dry. Holt does not use her first name yet."
		}],
		dnaNotes: "",
		createdAt: t,
		updatedAt: t
	};
}
function seedNotes() {
	const t = (/* @__PURE__ */ new Date()).toISOString();
	return [{
		id: "note_1",
		title: "Do not tell the council",
		body: "Mara and Holt's pact is the engine of chapter 1. If it breaks early, the plot becomes a trial, not a hunt.",
		kind: "story",
		tags: ["plot", "ashlight"],
		folder: "Ashlight",
		createdAt: t,
		updatedAt: t
	}];
}
function seedConversation() {
	const t = (/* @__PURE__ */ new Date()).toISOString();
	return {
		id: "convo_welcome",
		title: "Welcome",
		createdAt: t,
		updatedAt: t,
		messages: [{
			id: "m_hello",
			role: "assistant",
			origin: "system",
			content: "Loreweave is local-first. Notes, characters, and stories stay in this browser until you send a prompt to a provider you choose.\n\nTry Story Studio on the sample chapter, or ask about the current page. Add your own API key in Providers whenever you want real model output — or use the limited demo path if it is available.",
			createdAt: t
		}]
	};
}
function seedWorkspaces() {
	return [
		{
			id: "ws_writer",
			name: "Writer",
			appearance: "ink",
			contextRules: "Prefer story DNA and character cards."
		},
		{
			id: "ws_fanfic",
			name: "Fanfiction",
			appearance: "ink",
			contextRules: "Honor user-supplied canon notes; label speculation."
		},
		{
			id: "ws_student",
			name: "Student",
			appearance: "paper",
			contextRules: "Cite page facts; make flashcards."
		},
		{
			id: "ws_research",
			name: "Research",
			appearance: "paper",
			contextRules: "Separate claims from evidence."
		},
		{
			id: "ws_dev",
			name: "Developer",
			appearance: "ink",
			contextRules: "Be precise; no story flourish."
		},
		{
			id: "ws_personal",
			name: "Personal",
			appearance: "system",
			contextRules: ""
		}
	];
}
var seedPrompts = BUILT_IN_PROMPTS;
var defaultSettings = () => ({
	theme: "dark",
	accent: "#8ea0b0",
	fontScale: 1,
	reducedMotion: false,
	autoPageContext: false,
	autoMemoryContext: true,
	dailyRequestLimit: 200,
	maxRequestChars: 12e3,
	warnLargeRequests: true,
	language: "en",
	supporter: false,
	defaultProviderId: "",
	fallbackProviderId: "",
	autoRoute: false,
	shortcuts: {
		command: "Mod+K",
		ask: "Mod+Shift+Space"
	}
});
function today() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function fresh() {
	const providers = seedProviders();
	const conv = seedConversation();
	const story = seedStory();
	return {
		hydrated: false,
		mode: "browser",
		workspaceId: "ws_writer",
		workspaces: seedWorkspaces(),
		settings: {
			...defaultSettings(),
			defaultProviderId: providers[0]?.id ?? ""
		},
		providers,
		routes: [
			{
				task: "writing",
				providerId: providers[1]?.id ?? providers[0].id,
				model: ""
			},
			{
				task: "fast",
				providerId: providers.find((p) => p.kind === "groq")?.id ?? providers[0].id,
				model: ""
			},
			{
				task: "research",
				providerId: providers.find((p) => p.kind === "perplexity")?.id ?? providers[0].id,
				model: ""
			},
			{
				task: "coding",
				providerId: providers[0].id,
				model: ""
			},
			{
				task: "long-context",
				providerId: providers.find((p) => p.kind === "google")?.id ?? providers[0].id,
				model: ""
			},
			{
				task: "private",
				providerId: providers.find((p) => p.kind === "ollama")?.id ?? providers[0].id,
				model: ""
			}
		],
		conversations: [conv],
		activeConversationId: conv.id,
		notes: seedNotes(),
		bookmarks: [],
		prompts: seedPrompts,
		stories: [story],
		activeStoryId: story.id,
		characters: seedCharacters(),
		world: seedWorld(),
		timeline: seedTimeline(),
		branches: [],
		continuity: [],
		page: {
			title: `${PRODUCT.name} preview`,
			url: typeof location !== "undefined" ? location.href : "",
			excerpt: story.chapters[0]?.body.slice(0, 400) ?? "",
			selectedText: "",
			fetchedAt: nowIso()
		},
		tabContexts: [],
		usage: [],
		pinnedActions: [
			"explain",
			"summarize",
			"rewrite",
			"continue",
			"dialogue"
		],
		commandOpen: false,
		compareBuffer: ""
	};
}
var useLore = create()(persist((set, get) => ({
	...fresh(),
	setMode: (mode) => set({ mode }),
	setCommandOpen: (commandOpen) => set({ commandOpen }),
	patchSettings: (p) => set({ settings: {
		...get().settings,
		...p
	} }),
	setWorkspace: (workspaceId) => set({ workspaceId }),
	upsertProvider: (p) => set({ providers: get().providers.some((x) => x.id === p.id) ? get().providers.map((x) => x.id === p.id ? p : x) : [...get().providers, p] }),
	addKey: (providerId, label, secret) => set({ providers: get().providers.map((p) => p.id === providerId ? {
		...p,
		keys: [...p.keys, {
			id: uid("key"),
			label,
			secret,
			enabled: true
		}]
	} : p) }),
	removeKey: (providerId, keyId) => set({ providers: get().providers.map((p) => p.id === providerId ? {
		...p,
		keys: p.keys.filter((k) => k.id !== keyId)
	} : p) }),
	toggleKey: (providerId, keyId, enabled) => set({ providers: get().providers.map((p) => p.id === providerId ? {
		...p,
		keys: p.keys.map((k) => k.id === keyId ? {
			...k,
			enabled
		} : k)
	} : p) }),
	markKeyResult: (providerId, keyId, ok, error) => set({ providers: get().providers.map((p) => p.id === providerId ? {
		...p,
		keys: p.keys.map((k) => k.id === keyId ? {
			...k,
			lastOkAt: ok ? nowIso() : k.lastOkAt,
			lastError: ok ? void 0 : error
		} : k)
	} : p) }),
	newConversation: () => {
		const c = {
			id: uid("convo"),
			title: "New thread",
			messages: [],
			createdAt: nowIso(),
			updatedAt: nowIso()
		};
		set({
			conversations: [c, ...get().conversations],
			activeConversationId: c.id
		});
	},
	setActiveConversation: (id) => set({ activeConversationId: id }),
	appendMessage: (conversationId, role, content, extra) => {
		const id = uid("msg");
		set({ conversations: get().conversations.map((c) => c.id === conversationId ? {
			...c,
			title: c.messages.length === 0 && role === "user" ? content.slice(0, 42) : c.title,
			updatedAt: nowIso(),
			messages: [...c.messages, {
				id,
				role,
				content,
				createdAt: nowIso(),
				origin: extra?.origin ?? (role === "assistant" ? "ai" : "user"),
				providerId: extra?.providerId,
				model: extra?.model
			}]
		} : c) });
		return id;
	},
	patchMessage: (conversationId, messageId, content) => set({ conversations: get().conversations.map((c) => c.id === conversationId ? {
		...c,
		messages: c.messages.map((m) => m.id === messageId ? {
			...m,
			content
		} : m)
	} : c) }),
	addNote: (n) => set({ notes: [{
		id: uid("note"),
		kind: n.kind ?? "quick",
		tags: n.tags ?? [],
		folder: n.folder ?? "Inbox",
		createdAt: nowIso(),
		updatedAt: nowIso(),
		title: n.title,
		body: n.body,
		sourceUrl: n.sourceUrl
	}, ...get().notes] }),
	deleteNote: (id) => set({ notes: get().notes.filter((n) => n.id !== id) }),
	addPrompt: (p) => set({ prompts: [...get().prompts, {
		...p,
		id: uid("prompt"),
		builtIn: false
	}] }),
	updatePrompt: (p) => set({ prompts: get().prompts.map((x) => x.id === p.id ? p : x) }),
	deletePrompt: (id) => set({ prompts: get().prompts.filter((p) => p.id !== id || p.builtIn) }),
	setPage: (p) => set({ page: {
		...get().page,
		...p,
		fetchedAt: nowIso()
	} }),
	setSelected: (selectedText) => set({ page: {
		...get().page,
		selectedText
	} }),
	addTabContext: (p) => set({ tabContexts: [...get().tabContexts, p] }),
	clearTabContexts: () => set({ tabContexts: [] }),
	setStoryBody: (chapterId, body) => set({ stories: get().stories.map((s) => s.id === get().activeStoryId ? {
		...s,
		updatedAt: nowIso(),
		chapters: s.chapters.map((c) => c.id === chapterId ? {
			...c,
			body
		} : c)
	} : s) }),
	addChapter: () => set({ stories: get().stories.map((s) => s.id === get().activeStoryId ? {
		...s,
		chapters: [...s.chapters, {
			id: uid("ch"),
			title: `Chapter ${s.chapters.length + 1}`,
			body: "",
			notes: ""
		}]
	} : s) }),
	upsertCharacter: (c) => set({ characters: get().characters.some((x) => x.id === c.id) ? get().characters.map((x) => x.id === c.id ? c : x) : [...get().characters, c] }),
	deleteCharacter: (id) => set({ characters: get().characters.filter((c) => c.id !== id) }),
	upsertWorld: (w) => set({ world: get().world.some((x) => x.id === w.id) ? get().world.map((x) => x.id === w.id ? w : x) : [...get().world, w] }),
	upsertTimeline: (e) => set({ timeline: get().timeline.some((x) => x.id === e.id) ? get().timeline.map((x) => x.id === e.id ? e : x) : [...get().timeline, e] }),
	setContinuity: (continuity) => set({ continuity }),
	setBranches: (branches) => set({ branches }),
	bumpUsage: (promptChars, completionChars) => {
		const day = today();
		const usage = [...get().usage];
		const cur = usage.find((u) => u.day === day);
		if (cur) {
			cur.requests += 1;
			cur.promptChars += promptChars;
			cur.completionChars += completionChars;
		} else usage.push({
			day,
			requests: 1,
			promptChars,
			completionChars
		});
		set({ usage });
	},
	setRoute: (task, providerId, model) => set({ routes: get().routes.map((r) => r.task === task ? {
		...r,
		providerId,
		model
	} : r) }),
	pinAction: (id) => {
		const pinned = get().pinnedActions;
		set({ pinnedActions: pinned.includes(id) ? pinned.filter((x) => x !== id) : [...pinned, id] });
	},
	resetDemo: () => set({
		...fresh(),
		hydrated: true
	})
}), {
	name: "loreweave.v1",
	skipHydration: true,
	partialize: (s) => {
		const { commandOpen: _c, compareBuffer: _b, hydrated: _h, ...rest } = s;
		return rest;
	}
}));
function activeStory(s) {
	return s.stories.find((x) => x.id === s.activeStoryId) ?? s.stories[0];
}
function activeConversation(s) {
	return s.conversations.find((c) => c.id === s.activeConversationId) ?? s.conversations[0];
}
function providerById(s, id) {
	return s.providers.find((p) => p.id === id);
}
var MODE_JUMP = [
	{
		id: "browser",
		label: "Open AI Browser"
	},
	{
		id: "studio",
		label: "Open Story Studio"
	},
	{
		id: "reader",
		label: "Open Reader"
	},
	{
		id: "characters",
		label: "Open Character Lab"
	},
	{
		id: "world",
		label: "Open World Lab"
	},
	{
		id: "prompts",
		label: "Open Prompt Studio"
	},
	{
		id: "memory",
		label: "Open Notes & Memory"
	},
	{
		id: "providers",
		label: "Open AI Providers"
	},
	{
		id: "settings",
		label: "Open Settings"
	},
	{
		id: "support",
		label: "Open Support"
	}
];
function CommandPalette({ onRun }) {
	const open = useLore((s) => s.commandOpen);
	const setOpen = useLore((s) => s.setCommandOpen);
	const setMode = useLore((s) => s.setMode);
	const custom = useLore((s) => s.prompts.filter((p) => !p.builtIn));
	const [q, setQ] = (0, import_react.useState)("");
	const items = (0, import_react.useMemo)(() => {
		const all = [
			...MODE_JUMP.map((m) => ({
				id: `mode:${m.id}`,
				label: m.label
			})),
			...COMMANDS.map((c) => ({
				id: c.id,
				label: c.label
			})),
			...custom.map((p) => ({
				id: `prompt:${p.id}`,
				label: p.name
			})),
			{
				id: "note",
				label: "Create note from selection"
			}
		];
		const query = q.trim().toLowerCase();
		return query ? all.filter((i) => i.label.toLowerCase().includes(query)) : all;
	}, [q, custom]);
	(0, import_react.useEffect)(() => {
		if (!open) setQ("");
	}, [open]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[12vh]",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Command palette",
		onClick: () => setOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface p-3 shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				autoFocus: true,
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Jump, run, or search…",
				className: "h-11 w-full rounded-[var(--radius-md)] border border-border bg-bg px-3 text-sm",
				onKeyDown: (e) => {
					if (e.key === "Escape") setOpen(false);
					if (e.key === "Enter" && items[0]) {
						const id = items[0].id;
						if (id.startsWith("mode:")) setMode(id.slice(5));
						else onRun(id);
						setOpen(false);
					}
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "lw-scroll mt-2 max-h-80 overflow-auto",
				children: [items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: cn("flex h-11 w-full items-center rounded-[var(--radius-sm)] px-3 text-left text-sm text-foreground hover:bg-surface-2"),
					onClick: () => {
						if (item.id.startsWith("mode:")) setMode(item.id.slice(5));
						else onRun(item.id);
						setOpen(false);
					},
					children: item.label
				}) }, item.id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-3 py-6 text-sm text-muted",
					children: "No matching command."
				})]
			})]
		})
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-transform transition-opacity duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-foreground hover:opacity-90",
			secondary: "bg-surface-2 text-foreground border border-border hover:bg-surface",
			ghost: "text-muted hover:text-foreground hover:bg-surface-2",
			danger: "bg-danger text-parchment hover:opacity-90"
		},
		size: {
			sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
			md: "h-10 px-4 text-sm rounded-[var(--radius-md)]",
			lg: "h-11 px-5 text-sm rounded-[var(--radius-md)]",
			icon: "size-10 rounded-[var(--radius-md)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var Input = (0, import_react.forwardRef)(function Input({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		className: cn("h-10 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-foreground placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	});
});
var Textarea = (0, import_react.forwardRef)(function Textarea({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref,
		className: cn("min-h-28 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2 text-sm leading-relaxed text-foreground placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	});
});
var NAME = /\b([A-Z][a-z]+(?:\s[A-Z][a-z]+){0,2})\b/g;
var DATE = /\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{4}|\d{4}-\d{2}-\d{2})\b/g;
var NUM = /\b\d+(?:[.,]\d+)?%?\b/g;
function extractIntel(text) {
	const names = unique$1((text.match(NAME) ?? []).filter((n) => n.length > 2 && !STOP$1.has(n)));
	const dates = unique$1(text.match(DATE) ?? []);
	const numbers = unique$1((text.match(NUM) ?? []).slice(0, 40));
	const facts = text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 40 && s.length < 240).slice(0, 24);
	const tables = [];
	for (const line of text.split("\n")) if ((line.match(/\t|,|;|\s{2,}/g) ?? []).length >= 2 && line.length < 200) tables.push(line.trim());
	return {
		facts,
		names: names.slice(0, 30),
		dates: dates.slice(0, 20),
		numbers,
		tables: tables.slice(0, 12)
	};
}
function toFlashcards(text) {
	return extractIntel(text).facts.slice(0, 12).map((f) => {
		const bits = f.split(/:|—|-/);
		if (bits.length >= 2) return {
			q: bits[0].trim() + "?",
			a: bits.slice(1).join("—").trim()
		};
		return {
			q: `What is noted here?`,
			a: f
		};
	});
}
var STOP$1 = /* @__PURE__ */ new Set([
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
	"They"
]);
function unique$1(items) {
	return [...new Set(items)];
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var fetchPageText = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(createSsrRpc("b08d9cb8b5c50a921bb70906a183814a5a2e2498c613b7f84686fd0dd45b4388"));
var completeChat = createServerFn({ method: "POST" }).inputValidator((input) => input).handler(createSsrRpc("f4765370ab8d02f04211ab1a592f12c89e855bcfb9666a38a0d4126d9a8021e4"));
async function runChat(opts) {
	const key = opts.provider ? pickKey(opts.provider) : null;
	return completeChat({ data: {
		messages: opts.messages,
		format: opts.provider?.format ?? "openai",
		baseUrl: opts.provider?.baseUrl ?? "https://api.x.ai/v1",
		model: opts.model || opts.provider?.defaultModel || "grok-4.5",
		apiKey: key ?? void 0,
		temperature: opts.temperature ?? opts.provider?.temperature ?? .7,
		maxTokens: opts.maxTokens ?? opts.provider?.maxOutput ?? 2048,
		headers: opts.provider?.headers,
		demo: opts.forceDemo || !key
	} });
}
function originLabel(origin) {
	if (origin === "user") return "You";
	if (origin === "page") return "Page";
	if (origin === "system") return "Loreweave";
	return "Model";
}
var VAR = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;
function compilePrompt(template, ctx) {
	return template.replace(VAR, (_, key) => {
		const value = ctx[key];
		if (value == null || value === "") return `[${key} not provided]`;
		return value;
	});
}
function truncateContext(text, maxChars) {
	if (text.length <= maxChars) return text;
	const head = Math.floor(maxChars * .62);
	const tail = maxChars - head - 32;
	return `${text.slice(0, head)}\n\n[…truncated…]\n\n${text.slice(-tail)}`;
}
function estimateTokens(text) {
	return Math.ceil(text.length / 4);
}
var STOP = new Set("the a an and or but in on at to for of as is was were be been being with that this those these it he she they i you we not from by into over after before".split(" "));
function sentences(text) {
	return text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 0);
}
function ngrams(words, n) {
	const map = /* @__PURE__ */ new Map();
	for (let i = 0; i <= words.length - n; i++) {
		const slice = words.slice(i, i + n);
		if (slice.some((w) => STOP.has(w))) continue;
		const key = slice.join(" ");
		map.set(key, (map.get(key) ?? 0) + 1);
	}
	return map;
}
function analyzeStoryDna(text) {
	const clean = text.replace(/\s+/g, " ").trim();
	const sents = sentences(clean);
	const words = clean.toLowerCase().replace(/[^a-z0-9\s'-]/g, "").split(/\s+/).filter(Boolean);
	const wordCount = words.length;
	const avgSentence = sents.length ? wordCount / sents.length : 0;
	const dialogueLines = (text.match(/["“][^"”]+["”]/g) ?? []).length;
	const dialogueDensity = wordCount ? Math.min(1, dialogueLines * 12 / wordCount) : 0;
	const actionHits = (clean.match(/\b(ran|struck|leapt|grabbed|fired|slammed|cut|threw|dodged|charged)\b/gi) ?? []).length;
	const emotionHits = (clean.match(/\b(love|fear|grief|anger|hope|shame|longing|hurt|joy|dread|ache|tender)\b/gi) ?? []).length;
	const actionDensity = wordCount ? Math.min(1, actionHits * 18 / wordCount) : 0;
	const emotionalIntensity = wordCount ? Math.min(1, emotionHits * 22 / wordCount) : 0;
	const narrativeDistance = (clean.match(/\b(I|me|my)\b/g) ?? []).length > (clean.match(/\b(he|she|they|his|her|their)\b/gi) ?? []).length * .8 ? "Close first person" : avgSentence > 22 ? "Slightly distant third" : "Close third";
	const pacing = avgSentence < 12 ? "Fast, clipped" : avgSentence > 24 ? "Measured, expansive" : "Balanced";
	const tone = emotionHits > actionHits ? "Interior / emotional" : actionHits > emotionHits + 2 ? "Kinetic / external" : "Mixed";
	const mood = /dark|blood|ash|night|grave/i.test(clean) ? "Nocturnal, heavy" : /light|warm|laugh|sun/i.test(clean) ? "Warmer, open" : "Neutral-literary";
	const phrases = [...ngrams(words, 3).entries()].filter(([, n]) => n >= 3).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([p]) => p);
	const themes = [];
	if (/duty|oath|promise/i.test(clean)) themes.push("Duty");
	if (/memory|remember|forget/i.test(clean)) themes.push("Memory");
	if (/power|king|crown|rule/i.test(clean)) themes.push("Power");
	if (/love|heart|kiss/i.test(clean)) themes.push("Attachment");
	if (/sea|harbor|tide|ship/i.test(clean)) themes.push("The sea");
	const settingHints = [...new Set((clean.match(/\b([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\b/g) ?? []).filter((n) => n.length > 3 && ![
		"The",
		"She",
		"He",
		"They"
	].includes(n)).slice(0, 8))];
	const habits = [];
	if (avgSentence > 26) habits.push("Long multi-clause sentences");
	if (dialogueDensity > .35) habits.push("Dialogue-forward scenes");
	if ((clean.match(/—/g) ?? []).length > 4) habits.push("Em dashes for interruption");
	if ((clean.match(/\bthen\b/gi) ?? []).length > 6) habits.push("Sequential 'then' connective");
	const guidance = [
		`Preserve ${narrativeDistance.toLowerCase()} voice.`,
		`Keep ${pacing.toLowerCase()} pacing.`,
		`Dialogue share ~${Math.round(dialogueDensity * 100)}%; do not flatten it.`,
		themes.length ? `Lean into themes: ${themes.join(", ")}.` : "Do not invent a foreign theme.",
		"This is guidance from the supplied text, not a claim that a living author's style can be copied."
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
		guidance
	};
}
function useAsk() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [demo, setDemo] = (0, import_react.useState)(false);
	async function ask(opts) {
		const s = useLore.getState();
		const conv = activeConversation(s);
		if (!conv) return null;
		const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		if ((s.usage.find((u) => u.day === today)?.requests ?? 0) >= s.settings.dailyRequestLimit) {
			setError("Daily request limit reached. Raise it in Settings or wait until tomorrow.");
			return null;
		}
		const provider = providerById(s, opts.providerId || s.settings.defaultProviderId) ?? s.providers[0];
		const story = activeStory(s);
		const dna = story?.chapters[0]?.body ? analyzeStoryDna(story.chapters.map((c) => c.body).join("\n")) : null;
		const max = s.settings.maxRequestChars;
		const parts = [];
		if (opts.includePage !== false && (s.settings.autoPageContext || opts.includePage)) {
			if (s.page.selectedText) parts.push(`Selected text:\n${truncateContext(s.page.selectedText, max / 3)}`);
			else if (s.page.excerpt) parts.push(`Page (${s.page.title}):\n${truncateContext(s.page.excerpt, max / 3)}`);
		}
		if (opts.includeMemory !== false && s.settings.autoMemoryContext) {
			const mem = s.notes.slice(0, 6).map((n) => `- ${n.title}: ${n.body.slice(0, 240)}`).join("\n");
			if (mem) parts.push(`User notes:\n${mem}`);
		}
		if (opts.includeStory && story) {
			parts.push(`Story: ${story.title}\n${truncateContext(story.synopsis + "\n" + story.chapters.map((c) => c.body).join("\n"), max / 2)}`);
			parts.push(`Characters:\n${s.characters.map((c) => `${c.name}: ${c.personality} Voice: ${c.voiceNotes}`).join("\n")}`);
			if (dna) parts.push(`Story DNA guidance:\n${dna.guidance}`);
		}
		const system = [
			"You are Loreweave, a local-first AI writing and reading studio.",
			"Distinguish user-provided text, webpage text, and your generations.",
			"Do not claim to reproduce a living author's unique style.",
			"If context is missing, say so.",
			opts.system ?? "",
			...parts
		].filter(Boolean).join("\n\n");
		const totalChars = system.length + opts.prompt.length;
		if (s.settings.warnLargeRequests && totalChars > s.settings.maxRequestChars * 1.5) {
			if (!window.confirm("This request is large and will send a lot of text to your provider. Continue?")) return null;
		}
		setBusy(true);
		setError(null);
		s.appendMessage(conv.id, "user", opts.prompt);
		const assistantId = s.appendMessage(conv.id, "assistant", "…", {
			origin: "ai",
			providerId: provider?.id,
			model: opts.model || provider?.defaultModel
		});
		try {
			const result = await runChat({
				provider,
				model: opts.model || provider?.defaultModel,
				temperature: opts.temperature,
				messages: [
					{
						role: "system",
						content: system
					},
					...conv.messages.filter((m) => m.role !== "system").slice(-8).map((m) => ({
						role: m.role,
						content: m.content
					})),
					{
						role: "user",
						content: opts.prompt
					}
				]
			});
			if (!result.ok) {
				useLore.getState().patchMessage(conv.id, assistantId, result.error || "Request failed.");
				setError(result.error ?? "Request failed");
				setBusy(false);
				return null;
			}
			useLore.getState().patchMessage(conv.id, assistantId, result.text ?? "");
			useLore.getState().bumpUsage(totalChars, result.text?.length ?? 0);
			setDemo(Boolean(result.demo) || !provider?.keys.some((k) => k.enabled && k.secret));
			setBusy(false);
			return result.text ?? "";
		} catch (err) {
			const message = err instanceof Error ? err.message : "Network failure.";
			useLore.getState().patchMessage(conv.id, assistantId, message);
			setError(message);
			setBusy(false);
			return null;
		}
	}
	async function runPrompt(template, extra = {}) {
		const s = useLore.getState();
		const story = activeStory(s);
		return ask({
			prompt: compilePrompt(template, {
				selected_text: s.page.selectedText || story?.chapters[0]?.body.slice(0, 2e3) || "",
				page_text: s.page.excerpt,
				page_title: s.page.title,
				page_url: s.page.url,
				character: s.characters.map((c) => `${c.name}: ${c.personality}\n${c.speechPatterns}`).join("\n\n"),
				tone: extra.tone || s.page.selectedText || "",
				story: story ? `${story.title}\n${story.synopsis}` : "",
				chapter: story?.chapters[0]?.body ?? "",
				world: s.world.map((w) => `${w.name} (${w.kind}): ${w.summary}`).join("\n"),
				notes: s.notes.map((n) => n.body).join("\n"),
				...extra
			}),
			includeStory: true,
			includePage: true
		});
	}
	return {
		ask,
		runPrompt,
		busy,
		error,
		demo,
		tokensHint: estimateTokens,
		demoLimit: 16
	};
}
function ChatPanel() {
	const s = useLore();
	const conv = activeConversation(s);
	const { ask, runPrompt, busy, error, demo } = useAsk();
	const [draft, setDraft] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [intelOpen, setIntelOpen] = (0, import_react.useState)(false);
	const box = (0, import_react.useRef)(null);
	const provider = providerById(s, s.settings.defaultProviderId) ?? s.providers[0];
	const intel = (0, import_react.useMemo)(() => extractIntel(s.page.excerpt || s.page.selectedText), [s.page.excerpt, s.page.selectedText]);
	async function send(text = draft) {
		const prompt = text.trim();
		if (!prompt || busy) return;
		setDraft("");
		await ask({
			prompt,
			includePage: true
		});
	}
	async function loadUrl() {
		if (!url.trim()) return;
		const res = await fetchPageText({ data: { url: url.trim() } });
		if (!res.ok) {
			s.appendMessage(s.activeConversationId, "assistant", res.error, { origin: "system" });
			return;
		}
		s.setPage({
			title: res.title,
			url: res.url,
			excerpt: res.text
		});
		s.addTabContext({
			title: res.title,
			url: res.url,
			excerpt: res.text.slice(0, 4e3),
			selectedText: "",
			fetchedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center gap-2 rounded-[var(--radius-lg)] border border-border bg-surface p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium uppercase tracking-[0.14em] text-muted",
							children: "Page context"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm",
							children: s.page.title || "No page loaded"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted",
							children: s.page.url || "Paste a URL or drop text. Nothing is sent until you ask."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full flex-col gap-2 sm:w-auto sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: url,
						onChange: (e) => setUrl(e.target.value),
						placeholder: "https://…",
						className: "h-10 min-w-48 flex-1 rounded-[var(--radius-sm)] border border-border bg-bg px-3 text-sm",
						"aria-label": "Page URL"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => void loadUrl(),
						children: "Read page"
					})]
				})]
			}),
			s.page.selectedText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-md)] border border-border bg-surface-2 px-3 py-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.14em] text-muted",
					children: "Selection"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-4 text-foreground/90",
					children: s.page.selectedText
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-1.5",
				children: [CONTEXT_MENU_ACTIONS.slice(0, 10).map((id) => {
					const prompt = s.prompts.find((p) => p.id === id);
					if (!prompt) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "h-8 rounded-full border border-border bg-surface px-3 text-xs text-muted hover:text-foreground",
						onClick: () => void runPrompt(prompt.template),
						children: prompt.name
					}, id);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-8 rounded-full border border-border px-3 text-xs text-muted hover:text-foreground",
					onClick: () => setIntelOpen((v) => !v),
					children: "Page intelligence"
				})]
			}),
			intelOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lw-scroll max-h-48 overflow-auto rounded-[var(--radius-md)] border border-border bg-surface p-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Extracted locally. Send only if you choose an action."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-medium",
						children: "Names"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: intel.names.join(", ") || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-medium",
						children: "Dates"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: intel.dates.join(", ") || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => void runPrompt(s.prompts.find((p) => p.id === "facts").template),
								children: "Extract facts"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => {
									const cards = toFlashcards(s.page.excerpt);
									s.addNote({
										title: `Flashcards · ${s.page.title}`,
										body: cards.map((c) => `${c.q}\n${c.a}`).join("\n\n"),
										kind: "page",
										tags: ["flashcards"]
									});
								},
								children: "Save flashcards"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => void runPrompt(s.prompts.find((p) => p.id === "quiz").template),
								children: "Quiz"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => void runPrompt(s.prompts.find((p) => p.id === "study-notes").template),
								children: "Study notes"
							})
						]
					})
				]
			}) : null,
			s.tabContexts.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-md)] border border-border bg-surface p-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [s.tabContexts.length, " pages in compare set"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [
						s.tabContexts.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-surface-2 px-2 py-1 text-xs",
							children: tab.title
						}, tab.url)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => void ask({
								prompt: `Compare these pages. Differences, overlap, contradictions:\n${s.tabContexts.map((tab) => `# ${tab.title}\n${tab.excerpt.slice(0, 1800)}`).join("\n\n")}`,
								includePage: false
							}),
							children: "Compare pages"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => s.clearTabContexts(),
							children: "Clear"
						})
					]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lw-scroll min-h-0 flex-1 overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-4",
				children: [
					!conv?.messages.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Ask about the page, a selection, or your story. Keys never leave this device except inside the request you send to your provider."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-4",
						children: conv?.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] font-medium uppercase tracking-[0.14em] text-muted",
									children: [originLabel(m.origin), m.model ? ` · ${m.model}` : ""]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 whitespace-pre-wrap text-sm leading-relaxed",
									children: m.content
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 hidden gap-1 group-hover:flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
										label: "Copy",
										onClick: () => void navigator.clipboard.writeText(m.content),
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
										label: "Save note",
										onClick: () => s.addNote({
											title: m.content.slice(0, 48),
											body: m.content,
											kind: "response",
											tags: ["ai"]
										}),
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "size-3.5" })
									})]
								})
							]
						}, m.id))
					}),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "shimmer mt-4 text-sm text-muted",
						children: "Composing…"
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-danger",
						children: error
					}) : null,
					demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "Demo path in use. Add a key in Providers for your own model."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "rounded-[var(--radius-lg)] border border-border bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 rounded-[var(--radius-sm)] border border-border bg-bg px-2 text-sm",
								value: s.settings.defaultProviderId,
								onChange: (e) => s.patchSettings({ defaultProviderId: e.target.value }),
								"aria-label": "Provider",
								children: s.providers.map((prov) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: prov.id,
									children: [prov.name, prov.keys.some((k) => k.enabled && k.secret) ? "" : " · no key"]
								}, prov.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-10 max-w-48 rounded-[var(--radius-sm)] border border-border bg-bg px-2 text-sm",
								value: provider?.defaultModel,
								onChange: (e) => {
									if (!provider) return;
									s.upsertProvider({
										...provider,
										defaultModel: e.target.value
									});
								},
								"aria-label": "Model",
								children: provider?.models.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: m }, m))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								"aria-label": "New thread",
								onClick: () => s.newConversation(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								"aria-label": "Export",
								onClick: () => downloadText(`${conv?.title ?? "thread"}.md`, (conv?.messages ?? []).map((m) => `**${m.role}**\n${m.content}`).join("\n\n")),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						ref: box,
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						placeholder: "Ask, rewrite, continue…",
						className: "min-h-24",
						onKeyDown: (e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								send();
							}
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => void send(),
									disabled: busy || !draft.trim(),
									children: "Send"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "secondary",
									disabled: !busy,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5" }), " Stop"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									onClick: () => {
										const last = [...conv?.messages ?? []].reverse().find((m) => m.role === "user");
										if (last) send(last.content);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Retry"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => s.addNote({
								title: s.page.title || "Bookmark",
								body: s.page.excerpt.slice(0, 500),
								kind: "page",
								sourceUrl: s.page.url
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkPlus, { className: "size-3.5" }), " Save page note"]
						})]
					})
				]
			})
		]
	});
}
function IconBtn({ label, onClick, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "inline-flex h-8 items-center gap-1 rounded-[var(--radius-sm)] px-2 text-xs text-muted hover:bg-surface-2 hover:text-foreground",
		onClick,
		type: "button",
		children: [icon, label]
	});
}
var DEAD = /\b(died|dead|killed|corpse|funeral|buried)\b/i;
var ALIVE = /\b(alive|survived|woke|breathed|laughed)\b/i;
function scanContinuity(input) {
	const issues = [];
	const { text, characters, world, timeline } = input;
	for (const c of characters) {
		const name = c.name;
		if (!name || !text.includes(name)) continue;
		if (c.currentStatus.toLowerCase().includes("dead") && ALIVE.test(snippetAround(text, name))) issues.push({
			id: uid("issue"),
			issue: `${name} appears active after being marked dead`,
			why: `Character status is “${c.currentStatus}”, but nearby text treats them as living.`,
			context: snippetAround(text, name),
			suggestions: [
				"Confirm the scene is a flashback or memory.",
				"Update the character status if they returned.",
				"Rewrite the scene so the presence is explained."
			],
			severity: "high"
		});
		if (c.age && /\b\d{1,3}\b/.test(c.age)) {
			const stated = Number((c.age.match(/\d{1,3}/) ?? [])[0]);
			const m = new RegExp(`${escapeReg(name)}[^.\\n]{0,40}?(\\d{1,3})[- ]year`, "i").exec(text);
			if (m && Number(m[1]) !== stated) issues.push({
				id: uid("issue"),
				issue: `${name} age may have changed`,
				why: `Profile age is ${c.age}; text mentions ${m[1]}.`,
				context: m[0],
				suggestions: ["Check whether time has passed in-story.", "Correct the profile or the line."],
				severity: "medium"
			});
		}
		if (c.appearance) {
			const hair = c.appearance.match(/\b(black|brown|blonde|red|white|silver|blue|green) hair\b/i);
			if (hair) {
				const other = new RegExp(`${escapeReg(name)}[^.\\n]{0,50}(black|brown|blonde|red|white|silver|blue|green) hair`, "i").exec(text);
				if (other && other[1] && other[1].toLowerCase() !== hair[1].toLowerCase()) issues.push({
					id: uid("issue"),
					issue: `${name} appearance mismatch`,
					why: `Profile has ${hair[0]}; passage has ${other[1]} hair.`,
					context: other[0],
					suggestions: ["Decide which description is canonical.", "Note a disguise or dye if intentional."],
					severity: "medium"
				});
			}
		}
		if (c.abilities && /cannot|unable|no magic/i.test(c.abilities) && /cast|spell|enchant/i.test(snippetAround(text, name))) issues.push({
			id: uid("issue"),
			issue: `${name} may be using an ability they should not have`,
			why: "Profile lists a limitation; the passage shows a conflicting action.",
			context: snippetAround(text, name),
			suggestions: [
				"Clarify a loophole.",
				"Remove the action.",
				"Update abilities if the character changed."
			],
			severity: "high"
		});
	}
	for (const loc of world.filter((w) => w.kind === "location")) if (loc.rules && /no magic/i.test(loc.rules) && new RegExp(`${escapeReg(loc.name)}[^.\\n]{0,80}(spell|magic)`, "i").test(text)) issues.push({
		id: uid("issue"),
		issue: `Magic used in ${loc.name}`,
		why: "Location rules forbid or restrict magic.",
		context: snippetAround(text, loc.name),
		suggestions: [
			"Show the rule being broken on purpose.",
			"Move the scene.",
			"Revise the location rule."
		],
		severity: "medium"
	});
	const ordered = [...timeline].sort((a, b) => a.position - b.position);
	for (let i = 1; i < ordered.length; i++) {
		const prev = ordered[i - 1];
		const cur = ordered[i];
		if (DEAD.test(prev.description)) {
			for (const name of prev.characters) if (cur.characters.includes(name) && ALIVE.test(cur.description) && !/flashback|memory/i.test(cur.description)) issues.push({
				id: uid("issue"),
				issue: `Timeline order: ${name} after a death event`,
				why: `“${prev.description}” precedes “${cur.description}”.`,
				context: `${prev.chapter} → ${cur.chapter}`,
				suggestions: [
					"Mark the later event as a flashback.",
					"Reorder the timeline.",
					"Clarify survival."
				],
				severity: "high"
			});
		}
	}
	if (!issues.length && text.length > 40) issues.push({
		id: uid("issue"),
		issue: "No automatic contradiction found",
		why: "Heuristic scan only. It cannot prove a manuscript is consistent.",
		context: text.slice(0, 180),
		suggestions: ["Run an AI continuity pass for subtler issues.", "Check knowledge and relationship status by hand."],
		severity: "low"
	});
	return issues;
}
function snippetAround(text, needle) {
	const i = text.indexOf(needle);
	if (i < 0) return text.slice(0, 160);
	const a = Math.max(0, i - 80);
	const b = Math.min(text.length, i + needle.length + 80);
	return text.slice(a, b).trim();
}
function escapeReg(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function extractCharacterProposal(text, existing) {
	const name = existing?.name || (text.match(/\b([A-Z][a-z]{2,}(?:\s[A-Z][a-z]+)*)\b/) ?? [])[1] || "Unnamed";
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
		knownFacts: unique([...existing?.knownFacts ?? [], ...factsFrom(text, name)]),
		secrets: existing?.secrets ?? [],
		currentStatus: existing?.currentStatus || "Active in current draft",
		voiceNotes: existing?.voiceNotes ?? "",
		createdAt: existing?.createdAt ?? nowIso(),
		updatedAt: nowIso(),
		locked: existing?.locked ?? false
	};
}
function extractWorldProposal(text) {
	return [...new Set(text.match(/\b([A-Z][a-z]+(?:\s[A-Z][a-z]+){0,2})\b/g) ?? [])].filter((n) => n.length > 3 && ![
		"The",
		"She",
		"When",
		"Then"
	].includes(n)).slice(0, 6).map((name) => ({
		id: uid("world"),
		kind: /kingdom|city|harbor|sea|forest|keep/i.test(name) ? "location" : "concept",
		name,
		summary: grab(text, new RegExp(`${name}[^.]+\\.`)) || `Mentioned in the supplied text.`,
		details: "",
		rules: "",
		related: [],
		createdAt: nowIso(),
		updatedAt: nowIso(),
		locked: false
	}));
}
function mergeProfile(base, proposed) {
	if (base.locked) return base;
	const mergeText = (a, b) => a.trim() || b;
	return {
		...base,
		age: mergeText(base.age, proposed.age),
		appearance: mergeText(base.appearance, proposed.appearance),
		personality: mergeText(base.personality, proposed.personality),
		speechPatterns: mergeText(base.speechPatterns, proposed.speechPatterns),
		knownFacts: unique([...base.knownFacts, ...proposed.knownFacts]),
		updatedAt: nowIso()
	};
}
function grab(text, re) {
	return (text.match(re) ?? [])[0]?.trim() ?? "";
}
function factsFrom(text, name) {
	return text.split(/(?<=[.!?])\s+/).filter((s) => s.includes(name)).slice(0, 5).map((s) => s.trim());
}
function unique(items) {
	return [...new Set(items.filter(Boolean))];
}
var TOOL_GROUPS = [
	{
		title: "Chapter",
		ids: [
			"chapter-rewrite",
			"continue",
			"pov",
			"expand",
			"shorten"
		]
	},
	{
		title: "Voice & scene",
		ids: [
			"dialogue",
			"voice-lock",
			"scene-forge",
			"action",
			"romance",
			"emotion"
		]
	},
	{
		title: "Plot",
		ids: [
			"story-doctor",
			"plothole",
			"continuity",
			"outline",
			"whatif",
			"au",
			"crossover"
		]
	},
	{
		title: "Generate",
		ids: [
			"branches",
			"alt-ending",
			"missing-scene",
			"foreshadow",
			"conflict",
			"hook",
			"cliff"
		]
	},
	{
		title: "Cast & world",
		ids: [
			"wwd",
			"villain",
			"side",
			"romance-arc",
			"fanfic-prompt"
		]
	},
	{
		title: "Publish",
		ids: [
			"titles",
			"synopsis",
			"tags",
			"pacing",
			"structure"
		]
	}
];
function StudioPanel() {
	const s = useLore();
	const story = activeStory(s);
	const chapter = story?.chapters[0];
	const { runPrompt, ask, busy, error } = useAsk();
	const [intensity, setIntensity] = (0, import_react.useState)(50);
	const [whatIf, setWhatIf] = (0, import_react.useState)("What if Holt already knows who took the lantern?");
	const [tab, setTab] = (0, import_react.useState)("write");
	const dna = (0, import_react.useMemo)(() => analyzeStoryDna(chapter?.body ?? ""), [chapter?.body]);
	const lastAssistant = [...s.conversations.find((c) => c.id === s.activeConversationId)?.messages ?? []].reverse().find((m) => m.role === "assistant");
	if (!story || !chapter) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid h-full min-h-0 gap-3 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-h-0 flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tracking-tight",
						children: story.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							story.fandom,
							" · ",
							story.tags.join(" · ")
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1",
						children: [
							"write",
							"dna",
							"radar",
							"branch",
							"sim"
						].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setTab(k),
							className: `h-9 rounded-full px-3 text-xs capitalize ${tab === k ? "bg-accent text-accent-foreground" : "text-muted hover:bg-surface-2"}`,
							children: k === "dna" ? "Story DNA" : k === "radar" ? "Continuity" : k === "sim" ? "Simulator" : k
						}, k))
					})]
				}),
				tab === "write" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mt-4 text-xs text-muted",
						htmlFor: "chapter",
						children: chapter.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "chapter",
						className: "mt-1 min-h-0 flex-1 font-display text-[15px] leading-7",
						value: chapter.body,
						onChange: (e) => s.setStoryBody(chapter.id, e.target.value),
						onSelect: (e) => {
							const t = e.currentTarget;
							const sel = t.value.slice(t.selectionStart, t.selectionEnd);
							if (sel) s.setSelected(sel);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs text-muted",
								children: ["Intensity", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 0,
									max: 100,
									value: intensity,
									onChange: (e) => setIntensity(Number(e.target.value)),
									"aria-label": "Emotional intensity"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								disabled: busy,
								onClick: () => void runPrompt(s.prompts.find((p) => p.id === "continue").template, { tone: dna.guidance }),
								children: "Continue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								disabled: busy,
								onClick: () => void ask({
									prompt: `Rewrite with emotional intensity ${intensity}/100. Preserve plot and character voice.\n\n${s.page.selectedText || chapter.body}`,
									includeStory: true
								}),
								children: "Apply intensity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => s.addChapter(),
								children: "Add chapter"
							})
						]
					})
				] }),
				tab === "dna" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lw-scroll mt-4 min-h-0 flex-1 overflow-auto text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted",
							children: "Guidance from the supplied text. Not a reproduction of a living author's style."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Tone",
									v: dna.tone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Mood",
									v: dna.mood
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Pacing",
									v: dna.pacing
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Distance",
									v: dna.narrativeDistance
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Dialogue",
									v: `${Math.round(dna.dialogueDensity * 100)}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Action",
									v: `${Math.round(dna.actionDensity * 100)}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Emotion",
									v: `${Math.round(dna.emotionalIntensity * 100)}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									k: "Avg sentence",
									v: `${dna.avgSentence} words`
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs uppercase tracking-[0.14em] text-muted",
							children: "Themes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: dna.themes.join(", ") || "None detected" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs uppercase tracking-[0.14em] text-muted",
							children: "Habits"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: dna.habits.join(" · ") || "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs uppercase tracking-[0.14em] text-muted",
							children: "Repeated phrases"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted",
							children: dna.repeatedPhrases.join(" · ") || "None above threshold"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed",
							children: dna.guidance
						})
					]
				}),
				tab === "radar" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lw-scroll mt-4 min-h-0 flex-1 overflow-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => s.setContinuity(scanContinuity({
								text: story.chapters.map((c) => c.body).join("\n"),
								characters: s.characters,
								world: s.world,
								timeline: s.timeline
							})),
							children: "Scan locally"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "secondary",
							className: "ml-2",
							disabled: busy,
							onClick: () => void runPrompt(s.prompts.find((p) => p.id === "continuity").template),
							children: "AI continuity pass"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: s.continuity.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-[var(--radius-md)] border border-border bg-bg p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-[0.14em] text-muted",
										children: issue.severity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-medium",
										children: issue.issue
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: issue.why
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-sm italic text-foreground/80",
										children: issue.context
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-2 list-disc pl-5 text-sm",
										children: issue.suggestions.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
									})
								]
							}, issue.id))
						})
					]
				}),
				tab === "branch" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lw-scroll mt-4 min-h-0 flex-1 overflow-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy,
						onClick: async () => {
							const text = await runPrompt(s.prompts.find((p) => p.id === "branches").template);
							if (!text) return;
							s.setBranches([{
								id: uid("br"),
								label: "Branch A",
								summary: text.slice(0, 280),
								tone: "From model",
								consequences: "See full reply in AI Browser",
								characters: s.characters.map((c) => c.name),
								futures: ["Open in thread"]
							}]);
						},
						children: "Generate A / B / C"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-3 md:grid-cols-3",
						children: (s.branches.length ? s.branches : [
							"A",
							"B",
							"C"
						].map((label) => ({
							id: label,
							label: `Branch ${label}`,
							summary: "Run generate to fill from the current scene.",
							tone: "—",
							consequences: "—",
							characters: [],
							futures: []
						}))).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-[var(--radius-md)] border border-border bg-bg p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: b.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: b.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-subtle",
									children: ["Tone ", b.tone]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									className: "mt-3",
									onClick: () => s.setStoryBody(chapter.id, `${chapter.body}\n\n— ${b.label} —\n${b.summary}`),
									children: "Continue from here"
								})
							]
						}, b.id))
					})]
				}),
				tab === "sim" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterSim, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "lw-scroll min-h-0 overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.14em] text-muted",
					children: "Studio tools"
				}),
				TOOL_GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: g.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-col gap-1",
						children: g.ids.map((id) => {
							const prompt = s.prompts.find((p) => p.id === id);
							if (!prompt) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: busy,
								className: "h-10 rounded-[var(--radius-sm)] px-2 text-left text-sm hover:bg-surface-2 disabled:opacity-40",
								onClick: () => {
									if (id === "whatif") runPrompt(prompt.template, { tone: whatIf });
									else runPrompt(prompt.template);
								},
								children: prompt.name
							}, id);
						})
					})]
				}, g.title)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-4 block text-xs text-muted",
					htmlFor: "whatif",
					children: "What-if"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "whatif",
					className: "mt-1 h-10 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-2 text-sm",
					value: whatIf,
					onChange: (e) => setWhatIf(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "w-full",
						onClick: () => {
							const proposed = extractCharacterProposal(chapter.body);
							const existing = s.characters.find((c) => c.name === proposed.name);
							if (existing && existing.locked) return;
							s.upsertCharacter(existing ? mergeProfile(existing, proposed) : proposed);
						},
						children: "Propose character updates"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "w-full",
						onClick: () => extractWorldProposal(chapter.body).forEach((w) => s.upsertWorld(w)),
						children: "Propose world records"
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-danger",
					children: error
				}),
				lastAssistant && tab === "write" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 line-clamp-6 text-sm text-muted",
					children: lastAssistant.content
				})
			]
		})]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-sm)] bg-bg p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-[11px] uppercase tracking-[0.14em] text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1",
			children: v
		})]
	});
}
function CharacterSim() {
	const s = useLore();
	const { ask, busy } = useAsk();
	const [who, setWho] = (0, import_react.useState)(s.characters[0]?.id ?? "");
	const [line, setLine] = (0, import_react.useState)("Why didn't you tell the council?");
	const char = s.characters.find((c) => c.id === who);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-[var(--radius-sm)] bg-bg px-3 py-2 text-xs text-muted",
				children: "AI interpretation of a user-supplied character. Not canon."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: "mt-3 h-10 rounded-[var(--radius-sm)] border border-border bg-bg px-2 text-sm",
				value: who,
				onChange: (e) => setWho(e.target.value),
				children: s.characters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: c.id,
					children: c.name
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "mt-3 flex-1",
				value: line,
				onChange: (e) => setLine(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-3",
				disabled: busy || !char,
				onClick: () => void ask({
					system: `Stay in character as ${char?.name}. Use their speech notes. This is an interpretation, not the canonical character.\n${JSON.stringify(char)}`,
					prompt: line,
					includeStory: true,
					includePage: false
				}),
				children: "Speak"
			})
		]
	});
}
function CharacterPanel() {
	const s = useLore();
	const [id, setId] = (0, import_react.useState)(s.characters[0]?.id ?? "");
	const c = s.characters.find((x) => x.id === id);
	const story = activeStory(s);
	const { ask, busy } = useAsk();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid h-full min-h-0 gap-3 md:grid-cols-[16rem_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-3",
			children: [s.characters.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setId(ch.id),
				className: `mb-1 flex h-12 w-full items-center rounded-[var(--radius-sm)] px-3 text-left text-sm ${ch.id === id ? "bg-surface-2" : "hover:bg-bg"}`,
				children: ch.name
			}, ch.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				className: "mt-2 w-full",
				onClick: () => {
					const n = extractCharacterProposal(story?.chapters[0]?.body ?? "New character");
					n.name = "New character";
					n.id = uid("char");
					s.upsertCharacter(n);
					setId(n.id);
				},
				children: "New character"
			})]
		}), c && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "max-w-sm font-display text-xl",
						value: c.name,
						onChange: (e) => s.upsertCharacter({
							...c,
							name: e.target.value,
							updatedAt: nowIso()
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: c.locked,
							onChange: (e) => s.upsertCharacter({
								...c,
								locked: e.target.checked
							})
						}), "Lock (no silent overwrite)"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldGrid, {
					c,
					onChange: (n) => s.upsertCharacter({
						...c,
						...n,
						updatedAt: nowIso()
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						disabled: busy,
						onClick: () => void ask({
							includeStory: true,
							prompt: `Propose updates for ${c.name} from the chapter. Return JSON fields only as prose bullets the user can accept. Never assume overwrite.`
						}),
						children: "Propose AI updates"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => s.deleteCharacter(c.id),
						children: "Delete"
					})]
				})
			]
		})]
	});
}
function FieldGrid({ c, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-3 md:grid-cols-2",
		children: [[
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
			["voiceNotes", "Voice lock"]
		].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "block text-xs text-muted",
			children: [label, key === "aliases" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "mt-1",
				value: (c.aliases ?? []).join(", "),
				onChange: (e) => onChange({ aliases: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "mt-1 min-h-20",
				value: String(c[key] ?? ""),
				onChange: (e) => onChange({ [key]: e.target.value })
			})]
		}, key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "md:col-span-2 text-xs text-muted",
			children: ["Known facts (one per line)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "mt-1",
				value: c.knownFacts.join("\n"),
				onChange: (e) => onChange({ knownFacts: e.target.value.split("\n").filter(Boolean) })
			})]
		})]
	});
}
function WorldPanel() {
	const s = useLore();
	const [id, setId] = (0, import_react.useState)(s.world[0]?.id ?? "");
	const w = s.world.find((x) => x.id === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid h-full min-h-0 gap-3 md:grid-cols-[16rem_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-3",
			children: [s.world.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setId(item.id),
				className: `mb-1 w-full rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm ${item.id === id ? "bg-surface-2" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[11px] uppercase tracking-[0.14em] text-muted",
					children: item.kind
				}), item.name]
			}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				className: "mt-2 w-full",
				onClick: () => {
					const n = {
						id: uid("world"),
						kind: "concept",
						name: "New record",
						summary: "",
						details: "",
						rules: "",
						related: [],
						createdAt: nowIso(),
						updatedAt: nowIso(),
						locked: false
					};
					s.upsertWorld(n);
					setId(n.id);
				},
				children: "New record"
			})]
		}), w && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: w.name,
					onChange: (e) => s.upsertWorld({
						...w,
						name: e.target.value
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "mt-3 h-10 rounded-[var(--radius-sm)] border border-border bg-bg px-2 text-sm",
					value: w.kind,
					onChange: (e) => s.upsertWorld({
						...w,
						kind: e.target.value
					}),
					children: [
						"location",
						"nation",
						"organization",
						"magic",
						"technology",
						"item",
						"creature",
						"rule",
						"event",
						"faction",
						"concept"
					].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: k }, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-xs text-muted",
					children: ["Summary", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "mt-1",
						value: w.summary,
						onChange: (e) => s.upsertWorld({
							...w,
							summary: e.target.value
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-xs text-muted",
					children: ["Details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "mt-1",
						value: w.details,
						onChange: (e) => s.upsertWorld({
							...w,
							details: e.target.value
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-xs text-muted",
					children: ["Rules", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "mt-1",
						value: w.rules,
						onChange: (e) => s.upsertWorld({
							...w,
							rules: e.target.value
						})
					})]
				})
			]
		})]
	});
}
function TimelinePanel() {
	const s = useLore();
	const max = Math.max(1, ...s.timeline.map((e) => e.position));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full min-h-0 overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Timeline"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: () => s.upsertTimeline({
					id: uid("tl"),
					chapter: "New",
					position: max + 1,
					characters: [],
					location: "",
					description: "New event",
					consequences: ""
				}),
				children: "Add event"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "relative mt-8 border-l border-border pl-6",
			children: s.timeline.slice().sort((a, b) => a.position - b.position).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[29px] top-1 size-3 rounded-full bg-accent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"Ch. ",
							e.chapter,
							" · ",
							e.location
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-1",
						value: e.description,
						onChange: (ev) => s.upsertTimeline({
							...e,
							description: ev.target.value
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-2",
						value: e.consequences,
						onChange: (ev) => s.upsertTimeline({
							...e,
							consequences: ev.target.value
						}),
						placeholder: "Consequences"
					})
				]
			}, e.id))
		})]
	});
}
function ReaderPanel() {
	const s = useLore();
	const story = activeStory(s);
	const text = s.page.selectedText || s.page.excerpt || story?.chapters[0]?.body || "";
	const [size, setSize] = (0, import_react.useState)(1);
	const [lead, setLead] = (0, import_react.useState)(1.7);
	const [focus, setFocus] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const { ask, busy } = useAsk();
	const words = (0, import_react.useMemo)(() => text.split(/\s+/).filter(Boolean).length, [text]);
	function speak() {
		if (typeof window === "undefined" || !window.speechSynthesis) return;
		window.speechSynthesis.cancel();
		const u = new SpeechSynthesisUtterance(text.slice(0, 4e3));
		window.speechSynthesis.speak(u);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex h-full min-h-0 flex-col rounded-[var(--radius-lg)] border border-border bg-surface ${focus ? "p-2" : "p-5"}`,
		children: [
			!focus && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-muted",
						children: ["Size", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: .85,
							max: 1.4,
							step: .05,
							value: size,
							onChange: (e) => setSize(Number(e.target.value)),
							className: "ml-2 align-middle"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-xs text-muted",
						children: ["Leading", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 1.4,
							max: 2,
							step: .05,
							value: lead,
							onChange: (e) => setLead(Number(e.target.value)),
							className: "ml-2 align-middle"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => setFocus(true),
						children: "Focus"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: speak,
						children: "Listen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						disabled: busy,
						onClick: () => void ask({
							prompt: `Summarize this for a reader:\n${text}`,
							includePage: false
						}),
						children: "Summarize"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted",
						children: [words, " words"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lw-scroll min-h-0 flex-1 overflow-auto px-2",
				onScroll: (e) => {
					const el = e.currentTarget;
					const p = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
					setProgress(p);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "prose-reader py-6",
					style: {
						["--reader-size"]: String(size),
						["--reader-leading"]: String(lead)
					},
					children: text
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-1 rounded-full bg-surface-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 rounded-full bg-accent",
					style: { width: `${Math.round(progress * 100)}%` }
				})
			}),
			focus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-3 self-center",
				variant: "secondary",
				onClick: () => setFocus(false),
				children: "Exit focus"
			})
		]
	});
}
function PromptPanel() {
	const s = useLore();
	const [id, setId] = (0, import_react.useState)(s.prompts[0]?.id ?? "");
	const p = s.prompts.find((x) => x.id === id);
	const [name, setName] = (0, import_react.useState)("");
	const [template, setTemplate] = (0, import_react.useState)("Rewrite in {{tone}}:\n\n{{selected_text}}");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid h-full min-h-0 gap-3 md:grid-cols-[18rem_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-3",
			children: s.prompts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setId(item.id),
				className: `mb-1 w-full rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm ${item.id === id ? "bg-surface-2" : ""}`,
				children: item.name
			}, item.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5",
			children: [p && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: p.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: p.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-4 whitespace-pre-wrap rounded-[var(--radius-md)] bg-bg p-4 text-sm",
					children: p.template
				}),
				!p.builtIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					className: "mt-3",
					variant: "ghost",
					onClick: () => s.deletePrompt(p.id),
					children: "Delete"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 border-t border-border pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "New custom prompt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-2",
						placeholder: "Name",
						value: name,
						onChange: (e) => setName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "mt-2",
						value: template,
						onChange: (e) => setTemplate(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						onClick: () => {
							if (!name.trim()) return;
							s.addPrompt({
								name: name.trim(),
								description: "Custom",
								template,
								category: "custom",
								variables: []
							});
							setName("");
						},
						children: "Save prompt"
					})
				]
			})]
		})]
	});
}
function MemoryPanel() {
	const s = useLore();
	const [q, setQ] = (0, import_react.useState)("");
	const notes = s.notes.filter((n) => !q || `${n.title} ${n.body} ${n.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()));
	const [title, setTitle] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid h-full min-h-0 gap-3 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-col rounded-[var(--radius-lg)] border border-border bg-surface p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				placeholder: "Search notes, tags, folders",
				value: q,
				onChange: (e) => setQ(e.target.value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "lw-scroll mt-3 min-h-0 flex-1 overflow-auto",
				children: notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "mb-3 rounded-[var(--radius-md)] border border-border p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-muted",
							children: [
								n.kind,
								" · ",
								n.folder
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-4 text-sm text-muted",
							children: n.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "mt-2 text-xs text-danger",
							onClick: () => s.deleteNote(n.id),
							children: "Delete"
						})
					]
				}, n.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Quick note"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-2",
					value: title,
					onChange: (e) => setTitle(e.target.value),
					placeholder: "Title"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-2",
					value: body,
					onChange: (e) => setBody(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3 w-full",
					onClick: () => {
						if (!title.trim()) return;
						s.addNote({
							title,
							body,
							kind: "quick",
							tags: [],
							folder: "Inbox"
						});
						setTitle("");
						setBody("");
					},
					children: "Save"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-2 w-full",
					variant: "secondary",
					onClick: () => downloadText("loreweave-notes.json", JSON.stringify({
						notes: s.notes,
						characters: s.characters,
						world: s.world,
						stories: s.stories
					}, null, 2), "application/json"),
					children: "Export workspace"
				})
			]
		})]
	});
}
function ProviderPanel() {
	const s = useLore();
	const [id, setId] = (0, import_react.useState)(s.providers[0]?.id ?? "");
	const p = s.providers.find((x) => x.id === id);
	const [secret, setSecret] = (0, import_react.useState)("");
	const [label, setLabel] = (0, import_react.useState)("Key 1");
	const [reveal, setReveal] = (0, import_react.useState)(null);
	const [testMsg, setTestMsg] = (0, import_react.useState)("");
	const [custom, setCustom] = (0, import_react.useState)({
		name: "Custom OpenAI-compatible",
		baseUrl: "https://",
		model: "local-model"
	});
	async function testKey() {
		if (!p) return;
		setTestMsg("Testing…");
		const res = await runChat({
			provider: p,
			messages: [{
				role: "user",
				content: "Reply with the single word pong."
			}],
			maxTokens: 8
		});
		setTestMsg(res.ok ? `OK · ${res.model ?? p.defaultModel}` : res.error ?? "Failed");
		const key = p.keys.find((k) => k.enabled);
		if (key) s.markKeyResult(p.id, key.id, Boolean(res.ok), res.error);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid h-full min-h-0 gap-3 md:grid-cols-[16rem_minmax(0,1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-3",
			children: s.providers.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setId(item.id),
				className: `mb-1 w-full rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm ${item.id === id ? "bg-surface-2" : ""}`,
				children: [item.name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "block text-[11px] text-muted",
					children: [item.keys.filter((k) => k.enabled && k.secret).length, " key(s)"]
				})]
			}, item.id))
		}), p && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "lw-scroll overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: p.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						p.format,
						" · ",
						p.baseUrl
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"Keys stay in this browser. They are sent only to ",
						p.baseUrl,
						" when you run a request. They are never posted to a Loreweave account."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2",
					children: p.keys.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center gap-2 rounded-[var(--radius-sm)] bg-bg p-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: k.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "text-muted",
								children: reveal === k.id ? k.secret : maskKey(k.secret)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => setReveal(reveal === k.id ? null : k.id),
								children: reveal === k.id ? "Hide" : "Reveal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => s.toggleKey(p.id, k.id, !k.enabled),
								children: k.enabled ? "Disable" : "Enable"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => s.removeKey(p.id, k.id),
								children: "Delete"
							}),
							k.lastError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-danger",
								children: k.lastError
							})
						]
					}, k.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: label,
							onChange: (e) => setLabel(e.target.value),
							className: "max-w-36"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: reveal ? "text" : "password",
							autoComplete: "off",
							value: secret,
							onChange: (e) => setSecret(e.target.value),
							placeholder: "Paste API key",
							className: "max-w-xs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								if (!secret.trim()) return;
								s.addKey(p.id, label || "Key", secret.trim());
								setSecret("");
							},
							children: "Add key"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => void testKey(),
							children: "Test"
						})
					]
				}),
				testMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: testMsg
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block text-xs text-muted",
					children: ["Default model", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-1 max-w-md",
						value: p.defaultModel,
						onChange: (e) => s.upsertProvider({
							...p,
							defaultModel: e.target.value,
							models: Array.from(/* @__PURE__ */ new Set([...p.models, e.target.value]))
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 border-t border-border pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "Custom OpenAI-compatible endpoint"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2",
							value: custom.name,
							onChange: (e) => setCustom({
								...custom,
								name: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2",
							value: custom.baseUrl,
							onChange: (e) => setCustom({
								...custom,
								baseUrl: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2",
							value: custom.model,
							onChange: (e) => setCustom({
								...custom,
								model: e.target.value
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-3",
							variant: "secondary",
							onClick: () => {
								const n = makeBuiltInAccount("openai");
								n.id = uid("prov");
								n.builtIn = false;
								n.name = custom.name;
								n.kind = "custom";
								n.baseUrl = custom.baseUrl.replace(/\/$/, "");
								n.defaultModel = custom.model;
								n.models = [custom.model];
								n.format = "openai";
								s.upsertProvider(n);
								setId(n.id);
							},
							children: "Add custom provider"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted",
							children: [BUILT_IN_PROVIDERS.length, " built-in adapters. Custom parsers are not executed as code."]
						})
					]
				})
			]
		})]
	});
}
function SettingsPanel() {
	const s = useLore();
	const st = s.settings;
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const used = s.usage.find((u) => u.day === today);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lw-scroll h-full overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: ["Theme", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "mt-1 h-10 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-2",
							value: st.theme,
							onChange: (e) => s.patchSettings({ theme: e.target.value }),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "dark",
									children: "Dark"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "light",
									children: "Light"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "system",
									children: "System"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "contrast",
									children: "High contrast"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: ["Accent", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "color",
							className: "mt-1 h-10 w-full bg-transparent",
							value: st.accent,
							onChange: (e) => s.patchSettings({ accent: e.target.value })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: ["Workspace", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "mt-1 h-10 w-full rounded-[var(--radius-sm)] border border-border bg-bg px-2",
							value: s.workspaceId,
							onChange: (e) => s.setWorkspace(e.target.value),
							children: s.workspaces.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: w.id,
								children: w.name
							}, w.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: st.autoPageContext,
							onChange: (e) => s.patchSettings({ autoPageContext: e.target.checked })
						}), "Auto-include page context"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: st.autoMemoryContext,
							onChange: (e) => s.patchSettings({ autoMemoryContext: e.target.checked })
						}), "Auto-include notes"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: st.warnLargeRequests,
							onChange: (e) => s.patchSettings({ warnLargeRequests: e.target.checked })
						}), "Warn before large requests"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: st.reducedMotion,
							onChange: (e) => s.patchSettings({ reducedMotion: e.target.checked })
						}), "Reduced motion"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: st.supporter,
							onChange: (e) => s.patchSettings({ supporter: e.target.checked })
						}), "I support development (cosmetic)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: ["Daily request limit", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							className: "mt-1",
							value: st.dailyRequestLimit,
							onChange: (e) => s.patchSettings({ dailyRequestLimit: Number(e.target.value) })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: ["Max request characters", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							className: "mt-1",
							value: st.maxRequestChars,
							onChange: (e) => s.patchSettings({ maxRequestChars: Number(e.target.value) })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-[var(--radius-md)] bg-bg p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Usage today"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: [
							used?.requests ?? 0,
							" requests · ~",
							Math.round(((used?.promptChars ?? 0) + (used?.completionChars ?? 0)) / 4),
							" estimated tokens"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "Estimates only. Providers may bill differently. Loreweave does not see your invoice."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Model routing"
				}), s.routes.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-28 capitalize text-muted",
						children: r.task
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "h-10 rounded-[var(--radius-sm)] border border-border bg-bg px-2",
						value: r.providerId,
						onChange: (e) => s.setRoute(r.task, e.target.value, r.model),
						children: s.providers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: p.id,
							children: p.name
						}, p.id))
					})]
				}, r.task))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-xs text-muted",
				children: [
					"Shortcuts: ",
					st.shortcuts.command,
					" command palette · ",
					st.shortcuts.ask,
					" focus ask. Chrome can rebind extension commands in chrome://extensions/shortcuts."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				variant: "secondary",
				onClick: () => s.resetDemo(),
				children: "Reset local demo data"
			})
		]
	});
}
function SupportPanel() {
	const supporter = useLore((s) => s.settings.supporter);
	const patch = useLore((s) => s.patchSettings);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "lw-scroll h-full overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-3xl tracking-tight",
				children: [
					"Enjoying ",
					PRODUCT.name,
					"?"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-muted",
				children: "The studio is free. Core AI always runs on your keys. Support is optional and never hides writing, memory, or BYOK."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2",
				children: SUPPORT_LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: l.url,
					target: "_blank",
					rel: "noreferrer",
					className: "rounded-[var(--radius-lg)] border border-border bg-bg p-4 hover:bg-surface-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: l.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: l.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-accent",
							children: "Open Patreon"
						})
					]
				}, l.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-6 flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: supporter,
					onChange: (e) => patch({ supporter: e.target.checked })
				}), "Show supporter badge (honor system)"]
			}),
			supporter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground",
				children: "Supporter"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-[var(--radius-md)] bg-bg p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Chrome extension"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted",
						children: "Load the unpacked package from the download below. This web preview is the same studio, so you can work here immediately."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "mt-3 inline-flex h-10 items-center rounded-[var(--radius-md)] bg-accent px-4 text-sm font-medium text-accent-foreground",
						href: "/loreweave-extension.zip",
						children: "Download extension zip"
					})
				]
			})
		]
	});
}
function PrivacyCard() {
	const items = (0, import_react.useMemo)(() => [
		"API keys live in this browser (localStorage here, chrome.storage.local in the extension).",
		"No mandatory Loreweave account. No developer backend required for BYOK.",
		"Page text is read only when you ask, fetch, or enable auto page context.",
		"You own your writing. Nothing is published automatically."
	], []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2 text-sm text-muted",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: i }, i))
	});
}
var en = {
	product: "Loreweave",
	tagline: "Stories, memory, and the web",
	ask: "Ask Loreweave",
	send: "Send",
	stop: "Stop",
	retry: "Retry",
	regenerate: "Regenerate",
	copy: "Copy",
	save: "Save",
	saved: "Saved",
	insert: "Insert",
	export: "Export",
	delete: "Delete",
	edit: "Edit",
	cancel: "Cancel",
	create: "Create",
	search: "Search",
	notes: "Notes",
	command: "Command palette",
	modes: {
		browser: "AI Browser",
		studio: "Story Studio",
		reader: "Reader",
		characters: "Character Lab",
		world: "World Lab",
		prompts: "Prompt Studio",
		memory: "Notes & Memory",
		providers: "AI Providers",
		settings: "Settings",
		support: "Support"
	},
	privacyLeave: "This request will leave your browser and go to the AI provider you selected. Loreweave does not keep a copy on a developer server.",
	demoNotice: "Demo replies use a limited built-in path so you can try the studio. Add your own API key for full control.",
	offline: "You are offline. Notes, memory, and local tools still work. Network AI is paused.",
	noKey: "Add an API key in Providers to run this with your own model."
};
var dictionaries = { en };
function t(path, lang = "en") {
	const dict = dictionaries[lang] ?? en;
	const parts = path.split(".");
	let cur = dict;
	for (const p of parts) {
		if (typeof cur !== "object" || cur === null || !(p in cur)) return path;
		cur = cur[p];
	}
	return typeof cur === "string" ? cur : path;
}
var ICONS = {
	browser: Compass,
	studio: Feather,
	reader: BookOpen,
	characters: Users,
	world: Earth,
	prompts: WandSparkles,
	memory: Library,
	providers: KeyRound,
	settings: Settings2,
	support: Heart
};
var PRIMARY = [
	"browser",
	"studio",
	"reader",
	"characters",
	"memory"
];
function AppShell() {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [worldTab, setWorldTab] = (0, import_react.useState)("world");
	const mode = useLore((s) => s.mode);
	const setMode = useLore((s) => s.setMode);
	const setCommandOpen = useLore((s) => s.setCommandOpen);
	const theme = useLore((s) => s.settings.theme);
	const accent = useLore((s) => s.settings.accent);
	const scale = useLore((s) => s.settings.fontScale);
	const supporter = useLore((s) => s.settings.supporter);
	const reduced = useLore((s) => s.settings.reducedMotion);
	const { runPrompt, ask } = useAsk();
	const prompts = useLore((s) => s.prompts);
	const addNote = useLore((s) => s.addNote);
	const selected = useLore((s) => s.page.selectedText);
	(0, import_react.useEffect)(() => {
		useLore.persist.rehydrate();
		useLore.setState({ hydrated: true });
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		let resolved = theme;
		if (theme === "system") resolved = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
		root.dataset.theme = resolved === "contrast" ? "contrast" : resolved;
		root.style.setProperty("--color-accent", accent);
		root.style.fontSize = `${16 * scale}px`;
		root.style.setProperty("--motion-quick", reduced ? "0.01ms" : "150ms");
	}, [
		theme,
		accent,
		scale,
		reduced
	]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			const mod = e.metaKey || e.ctrlKey;
			if (mod && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setCommandOpen(true);
			}
			if (mod && e.shiftKey && e.code === "Space") {
				e.preventDefault();
				setMode("browser");
				setCommandOpen(false);
			}
			if (e.key === "Escape") setCommandOpen(false);
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [setCommandOpen, setMode]);
	function onCommand(id) {
		if (id === "note") {
			addNote({
				title: selected.slice(0, 48) || "Note",
				body: selected,
				kind: "quick"
			});
			setMode("memory");
			return;
		}
		if (id.startsWith("prompt:")) {
			const p = prompts.find((x) => x.id === id.slice(7));
			if (p) runPrompt(p.template);
			setMode("browser");
			return;
		}
		const cmd = COMMANDS.find((c) => c.id === id);
		if (cmd?.promptId) {
			const p = prompts.find((x) => x.id === cmd.promptId);
			if (p) runPrompt(p.template);
			setMode("browser");
			return;
		}
		if (id === "open-studio") setMode("studio");
		if (id === "open-chars") setMode("characters");
		if (id === "open-prompts") setMode("prompts");
		if (id === "compare") {
			setMode("browser");
			ask({
				prompt: "Compare the pages currently in the compare set.",
				includePage: true
			});
		}
	}
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-bg text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "mx-auto size-10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-display text-2xl",
					children: PRODUCT.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: PRODUCT.tagline
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh bg-bg text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "sticky top-0 hidden h-dvh w-16 shrink-0 flex-col items-center border-r border-border py-4 md:flex",
				"aria-label": "Modes",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-1 flex-col items-center gap-1",
						children: MODES.map((m) => {
							const Icon = ICONS[m];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								title: t(`modes.${m}`),
								"aria-label": t(`modes.${m}`),
								"aria-current": mode === m,
								onClick: () => setMode(m),
								className: cn("flex size-11 items-center justify-center rounded-[var(--radius-md)] text-muted hover:bg-surface-2 hover:text-foreground", mode === m && "bg-surface-2 text-foreground"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									strokeWidth: 1.75
								})
							}, m);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "flex size-11 items-center justify-center rounded-[var(--radius-md)] text-muted hover:text-foreground",
						"aria-label": "Command palette",
						onClick: () => setCommandOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex h-14 items-center gap-3 border-b border-border px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate font-display text-lg leading-none tracking-tight",
								children: [PRODUCT.name, supporter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 align-middle text-[10px] uppercase tracking-[0.16em] text-accent",
									children: "Supporter"
								}) : null]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted",
								children: t(`modes.${mode}`)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "hidden h-9 items-center gap-2 rounded-full border border-border px-3 text-xs text-muted md:inline-flex",
							onClick: () => setCommandOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "size-3.5" }), isMac() ? "⌘K" : "Ctrl+K"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/loreweave-extension.zip",
							className: "hidden text-xs text-muted hover:text-foreground sm:inline",
							children: "Get extension"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-h-0 flex-1 p-3 pb-24 md:p-4 md:pb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-[calc(100dvh-8.5rem)] md:h-[calc(100dvh-5.5rem)]",
						children: [
							mode === "browser" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {}),
							mode === "studio" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioPanel, {}),
							mode === "reader" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReaderPanel, {}),
							mode === "characters" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterPanel, {}),
							mode === "world" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full min-h-0 flex-col gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: cn("h-9 rounded-full px-3 text-xs", worldTab === "world" ? "bg-accent text-accent-foreground" : "text-muted"),
										onClick: () => setWorldTab("world"),
										children: "World"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: cn("h-9 rounded-full px-3 text-xs", worldTab === "timeline" ? "bg-accent text-accent-foreground" : "text-muted"),
										onClick: () => setWorldTab("timeline"),
										children: "Timeline"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-h-0 flex-1",
									children: worldTab === "world" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldPanel, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelinePanel, {})
								})]
							}),
							mode === "prompts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptPanel, {}),
							mode === "memory" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryPanel, {}),
							mode === "providers" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProviderPanel, {}),
							mode === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid h-full min-h-0 gap-3 lg:grid-cols-[minmax(0,1fr)_18rem]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-[var(--radius-lg)] border border-border bg-surface p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: "Privacy"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrivacyCard, {})
									})]
								})]
							}),
							mode === "support" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportPanel, {})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-bg/95 px-1 py-1 md:hidden",
				"aria-label": "Primary",
				children: [PRIMARY.map((m) => {
					const Icon = ICONS[m];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: cn("flex h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] text-muted", mode === m && "text-foreground"),
						onClick: () => setMode(m),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), t(`modes.${m}`).split(" ")[0]]
					}, m);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "flex h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] text-muted",
					onClick: () => setCommandOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelRight, { className: "size-4" }), "More"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, { onRun: onCommand })
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {});
}
//#endregion
export { Home as component };

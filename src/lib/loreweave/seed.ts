import type {
  CharacterProfile,
  Conversation,
  Note,
  PromptTemplate,
  ProviderAccount,
  StoryProject,
  TimelineEvent,
  WorldRecord,
  Workspace,
} from "./types";
import { makeBuiltInAccount } from "./providers";
import { BUILT_IN_PROMPTS } from "./prompts-catalog";

const CHAPTER = `The lamps along Ashlight Harbor burned low, each wick trimmed to a coin of gold against the fog. Mara Keel stood on the customs pier with salt in her hair and a ledger that would not balance.

"You're early," said Warden Holt. He did not look at her. He looked at the black water as if it owed him an apology.

"I'm on time for a lie," Mara said. "That's close enough."

Below them, the Tide-Gate groaned. No ship should have passed it after last bell. Something had. The wood of the pier remembered the weight — a long scrape, then silence, then the smell of wet iron.

Mara's left glove hid a map burned into her palm the night the old lantern went out. Holt knew the rumor. He did not know the map still stung when she lied.

"If the lantern is really gone," he said, "the harbor will eat the town by winter."

"Then we find who took the light." She closed the ledger. "And we do not tell the council until we can survive the telling."`;

export function seedProviders(): ProviderAccount[] {
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
    "ollama",
  ].map((kind) => makeBuiltInAccount(kind));
}

export function seedCharacters(): CharacterProfile[] {
  const t = new Date().toISOString();
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
      locked: false,
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
      locked: false,
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
      locked: false,
    },
  ];
}

export function seedWorld(): WorldRecord[] {
  const t = new Date().toISOString();
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
      locked: false,
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
      locked: false,
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
      locked: false,
    },
  ];
}

export function seedTimeline(): TimelineEvent[] {
  return [
    {
      id: "tl_1",
      chapter: "Prologue",
      position: 1,
      characters: ["Len Calder"],
      location: "Lamp loft",
      description: "The old lantern goes out. Len vanishes.",
      consequences: "Harbor lamps burn low. Mara receives a palm map.",
    },
    {
      id: "tl_2",
      chapter: "1",
      position: 2,
      characters: ["Mara Keel", "Warden Holt"],
      location: "Customs pier",
      description: "Unauthorized passage after last bell. Mara and Holt agree to hunt the light before telling the council.",
      consequences: "Investigation begins in secret.",
    },
  ];
}

export function seedStory(): StoryProject {
  const t = new Date().toISOString();
  return {
    id: "story_ashlight",
    title: "Ashlight Harbor",
    fandom: "Original",
    synopsis:
      "A customs clerk and a tired warden hunt a stolen harbor lantern before winter — and before the council turns the search into a purge.",
    tags: ["original", "maritime", "low fantasy", "mystery"],
    chapters: [
      {
        id: "ch_1",
        title: "Last Bell",
        body: CHAPTER,
        notes: "Keep Mara's jokes dry. Holt does not use her first name yet.",
      },
    ],
    dnaNotes: "",
    createdAt: t,
    updatedAt: t,
  };
}

export function seedNotes(): Note[] {
  const t = new Date().toISOString();
  return [
    {
      id: "note_1",
      title: "Do not tell the council",
      body: "Mara and Holt's pact is the engine of chapter 1. If it breaks early, the plot becomes a trial, not a hunt.",
      kind: "story",
      tags: ["plot", "ashlight"],
      folder: "Ashlight",
      createdAt: t,
      updatedAt: t,
    },
  ];
}

export function seedConversation(): Conversation {
  const t = new Date().toISOString();
  return {
    id: "convo_welcome",
    title: "Welcome",
    createdAt: t,
    updatedAt: t,
    messages: [
      {
        id: "m_hello",
        role: "assistant",
        origin: "system",
        content:
          "Loreweave is local-first. Notes, characters, and stories stay in this browser until you send a prompt to a provider you choose.\n\nTry Story Studio on the sample chapter, or ask about the current page. Add your own API key in Providers whenever you want real model output — or use the limited demo path if it is available.",
        createdAt: t,
      },
    ],
  };
}

export function seedWorkspaces(): Workspace[] {
  return [
    { id: "ws_writer", name: "Writer", appearance: "ink", contextRules: "Prefer story DNA and character cards." },
    { id: "ws_fanfic", name: "Fanfiction", appearance: "ink", contextRules: "Honor user-supplied canon notes; label speculation." },
    { id: "ws_student", name: "Student", appearance: "paper", contextRules: "Cite page facts; make flashcards." },
    { id: "ws_research", name: "Research", appearance: "paper", contextRules: "Separate claims from evidence." },
    { id: "ws_dev", name: "Developer", appearance: "ink", contextRules: "Be precise; no story flourish." },
    { id: "ws_personal", name: "Personal", appearance: "system", contextRules: "" },
  ];
}

export const seedPrompts: PromptTemplate[] = BUILT_IN_PROMPTS;

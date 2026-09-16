import type { ModeId } from "./config";

export type Role = "system" | "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
  origin?: "user" | "ai" | "page" | "system";
  providerId?: string;
  model?: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  pinned?: boolean;
}

export interface ApiKeyRecord {
  id: string;
  label: string;
  secret: string;
  enabled: boolean;
  lastOkAt?: string;
  lastError?: string;
}

export type ApiFormat = "openai" | "anthropic" | "gemini" | "ollama";

export interface ProviderAccount {
  id: string;
  name: string;
  kind: string;
  format: ApiFormat;
  baseUrl: string;
  models: string[];
  defaultModel: string;
  keys: ApiKeyRecord[];
  headers?: Record<string, string>;
  enabled: boolean;
  streaming: boolean;
  contextWindow: number;
  temperature: number;
  maxOutput: number;
  builtIn: boolean;
}

export interface ModelRoute {
  task: string;
  providerId: string;
  model: string;
}

export interface PromptVariable {
  key: string;
  label: string;
  defaultValue?: string;
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  category: string;
  variables: PromptVariable[];
  providerId?: string;
  model?: string;
  builtIn: boolean;
  pinned?: boolean;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  kind: "quick" | "story" | "page" | "character" | "world" | "response" | "highlight";
  tags: string[];
  folder: string;
  createdAt: string;
  updatedAt: string;
  sourceUrl?: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  note?: string;
  createdAt: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  aliases: string[];
  age: string;
  appearance: string;
  personality: string;
  goals: string;
  fears: string;
  strengths: string;
  weaknesses: string;
  abilities: string;
  relationships: string;
  speechPatterns: string;
  importantEvents: string;
  arc: string;
  knownFacts: string[];
  secrets: string[];
  currentStatus: string;
  voiceNotes: string;
  createdAt: string;
  updatedAt: string;
  locked: boolean;
}

export interface WorldRecord {
  id: string;
  kind:
    | "location"
    | "nation"
    | "organization"
    | "magic"
    | "technology"
    | "item"
    | "creature"
    | "rule"
    | "event"
    | "faction"
    | "concept";
  name: string;
  summary: string;
  details: string;
  rules: string;
  related: string[];
  createdAt: string;
  updatedAt: string;
  locked: boolean;
}

export interface TimelineEvent {
  id: string;
  chapter: string;
  position: number;
  characters: string[];
  location: string;
  description: string;
  consequences: string;
}

export interface StoryProject {
  id: string;
  title: string;
  fandom: string;
  synopsis: string;
  tags: string[];
  chapters: { id: string; title: string; body: string; notes: string }[];
  dnaNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContinuityIssue {
  id: string;
  issue: string;
  why: string;
  context: string;
  suggestions: string[];
  severity: "low" | "medium" | "high";
}

export interface StoryBranch {
  id: string;
  label: string;
  summary: string;
  tone: string;
  consequences: string;
  characters: string[];
  futures: string[];
}

export interface Workspace {
  id: string;
  name: string;
  providerId?: string;
  model?: string;
  appearance: "ink" | "paper" | "system" | "contrast";
  contextRules: string;
}

export interface UsageDay {
  day: string;
  requests: number;
  promptChars: number;
  completionChars: number;
}

export interface AppSettings {
  theme: "dark" | "light" | "system" | "contrast";
  accent: string;
  fontScale: number;
  reducedMotion: boolean;
  autoPageContext: boolean;
  autoMemoryContext: boolean;
  dailyRequestLimit: number;
  maxRequestChars: number;
  warnLargeRequests: boolean;
  language: string;
  supporter: boolean;
  defaultProviderId: string;
  fallbackProviderId: string;
  autoRoute: boolean;
  shortcuts: Record<string, string>;
}

export interface PageContext {
  title: string;
  url: string;
  excerpt: string;
  selectedText: string;
  fetchedAt: string;
}

export type { ModeId };

export interface PromptContext {
  selected_text?: string;
  page_text?: string;
  page_title?: string;
  page_url?: string;
  character?: string;
  tone?: string;
  story?: string;
  chapter?: string;
  world?: string;
  notes?: string;
  [key: string]: string | undefined;
}

const VAR = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;

export function listVariables(template: string): string[] {
  const found = new Set<string>();
  for (const match of template.matchAll(VAR)) {
    if (match[1]) found.add(match[1]);
  }
  return [...found];
}

export function compilePrompt(template: string, ctx: PromptContext): string {
  return template.replace(VAR, (_, key: string) => {
    const value = ctx[key];
    if (value == null || value === "") return `[${key} not provided]`;
    return value;
  });
}

export function truncateContext(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const head = Math.floor(maxChars * 0.62);
  const tail = maxChars - head - 32;
  return `${text.slice(0, head)}\n\n[…truncated…]\n\n${text.slice(-tail)}`;
}

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

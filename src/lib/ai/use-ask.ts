import { useState } from "react";
import { runChat } from "./client";
import { useLore, activeConversation, activeStory, providerById } from "../loreweave/store";
import { compilePrompt, truncateContext, estimateTokens } from "../loreweave/prompt-engine";
import { analyzeStoryDna } from "../loreweave/story-dna";
import { DEMO_DAILY_LIMIT } from "../loreweave/config";

export function useAsk() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

  async function ask(opts: {
    prompt: string;
    system?: string;
    includePage?: boolean;
    includeMemory?: boolean;
    includeStory?: boolean;
    providerId?: string;
    model?: string;
    temperature?: number;
  }): Promise<string | null> {
    const s = useLore.getState();
    const conv = activeConversation(s);
    if (!conv) return null;
    const today = new Date().toISOString().slice(0, 10);
    const used = s.usage.find((u) => u.day === today)?.requests ?? 0;
    if (used >= s.settings.dailyRequestLimit) {
      setError("Daily request limit reached. Raise it in Settings or wait until tomorrow.");
      return null;
    }

    const provider = providerById(s, opts.providerId || s.settings.defaultProviderId) ?? s.providers[0];
    const story = activeStory(s);
    const dna = story?.chapters[0]?.body ? analyzeStoryDna(story.chapters.map((c) => c.body).join("\n")) : null;
    const max = s.settings.maxRequestChars;

    const parts: string[] = [];
    if (opts.includePage !== false && (s.settings.autoPageContext || opts.includePage)) {
      if (s.page.selectedText) parts.push(`Selected text:\n${truncateContext(s.page.selectedText, max / 3)}`);
      else if (s.page.excerpt) parts.push(`Page (${s.page.title}):\n${truncateContext(s.page.excerpt, max / 3)}`);
    }
    if (opts.includeMemory !== false && s.settings.autoMemoryContext) {
      const mem = s.notes
        .slice(0, 6)
        .map((n) => `- ${n.title}: ${n.body.slice(0, 240)}`)
        .join("\n");
      if (mem) parts.push(`User notes:\n${mem}`);
    }
    if (opts.includeStory && story) {
      parts.push(`Story: ${story.title}\n${truncateContext(story.synopsis + "\n" + story.chapters.map((c) => c.body).join("\n"), max / 2)}`);
      parts.push(
        `Characters:\n${s.characters.map((c) => `${c.name}: ${c.personality} Voice: ${c.voiceNotes}`).join("\n")}`,
      );
      if (dna) parts.push(`Story DNA guidance:\n${dna.guidance}`);
    }

    const system = [
      "You are Loreweave, a local-first AI writing and reading studio.",
      "Distinguish user-provided text, webpage text, and your generations.",
      "Do not claim to reproduce a living author's unique style.",
      "If context is missing, say so.",
      opts.system ?? "",
      ...parts,
    ]
      .filter(Boolean)
      .join("\n\n");

    const totalChars = system.length + opts.prompt.length;
    if (s.settings.warnLargeRequests && totalChars > s.settings.maxRequestChars * 1.5) {
      const ok = window.confirm("This request is large and will send a lot of text to your provider. Continue?");
      if (!ok) return null;
    }

    setBusy(true);
    setError(null);
    s.appendMessage(conv.id, "user", opts.prompt);
    const assistantId = s.appendMessage(conv.id, "assistant", "…", {
      origin: "ai",
      providerId: provider?.id,
      model: opts.model || provider?.defaultModel,
    });

    try {
      const result = await runChat({
        provider,
        model: opts.model || provider?.defaultModel,
        temperature: opts.temperature,
        messages: [
          { role: "system", content: system },
          ...conv.messages
            .filter((m) => m.role !== "system")
            .slice(-8)
            .map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
          { role: "user", content: opts.prompt },
        ],
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

  async function runPrompt(template: string, extra: Record<string, string> = {}) {
    const s = useLore.getState();
    const story = activeStory(s);
    const compiled = compilePrompt(template, {
      selected_text: s.page.selectedText || story?.chapters[0]?.body.slice(0, 2000) || "",
      page_text: s.page.excerpt,
      page_title: s.page.title,
      page_url: s.page.url,
      character: s.characters.map((c) => `${c.name}: ${c.personality}\n${c.speechPatterns}`).join("\n\n"),
      tone: extra.tone || s.page.selectedText || "",
      story: story ? `${story.title}\n${story.synopsis}` : "",
      chapter: story?.chapters[0]?.body ?? "",
      world: s.world.map((w) => `${w.name} (${w.kind}): ${w.summary}`).join("\n"),
      notes: s.notes.map((n) => n.body).join("\n"),
      ...extra,
    });
    return ask({ prompt: compiled, includeStory: true, includePage: true });
  }

  return { ask, runPrompt, busy, error, demo, tokensHint: estimateTokens, demoLimit: DEMO_DAILY_LIMIT };
}

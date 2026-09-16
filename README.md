# Loreweave

A local-first **AI browser assistant** and **novel / fanfiction studio**. Bring your own API keys. The developer does not pay for ordinary model usage.

**Stories, memory, and the web.**

## Brand

Candidate names considered: Loreweave, Inkrail, Quillwright, Aetherink, Canonloom, Versewell, Foliohelm, Narrosk, Inkspire, Storyhelm.

**Loreweave** was chosen for being short, pronounceable, searchable, and a fit for both browser context and long-form story memory.

Text mark: `LOREWEAVE` in Fraunces / Georgia, with a woven-quill diamond.

UI: warm ink desk, parchment type, a single steel accent. No provider logos.

## What it does

- Persistent AI sidebar (web studio + Chrome side panel)
- Selection and page actions (explain, rewrite, continue, story craft…)
- Story Studio, Character Lab, World Lab, timeline, continuity radar, Story DNA
- BYOK providers: OpenAI, Anthropic, Gemini, OpenRouter, Groq, Mistral, Cohere, DeepSeek, Perplexity, Together, Fireworks, xAI, Ollama, custom OpenAI-compatible endpoints
- Notes, prompts, workspaces, privacy dashboard, optional Patreon support
- Offline: notes, memory, prompts, reader, local tools still work

## Architecture

```
USER → Loreweave (extension or web studio) → user's configured provider → response
```

No mandatory developer backend. Web preview may proxy BYOK requests to dodge browser CORS; keys are not stored server-side. The Chrome extension talks to providers directly from the service worker.

See `extension/` for Manifest V3 sources.

## Local development (web studio)

```bash
npm install
npm run dev
```

Open the preview. Typecheck: `npm run typecheck`. Tests: `npm test`.

## Chrome extension — load unpacked

1. Download `loreweave-extension.zip` (Support tab) or use the `extension/` folder.
2. Unzip if needed.
3. Chrome → `chrome://extensions` → Developer mode → **Load unpacked** → select the folder that contains `manifest.json`.
4. Pin Loreweave. Open the side panel from the toolbar, or **Ctrl+Shift+Space**.
5. Add an API key under Providers.

Rebind keys at `chrome://extensions/shortcuts`. Chrome often reserves Ctrl+K; the in-panel palette still uses Ctrl/⌘+K in the web studio. The extension default for the palette is Ctrl+Shift+K.

## API provider configuration

Providers → pick a vendor → paste a key from that vendor's console. Multiple keys per vendor are allowed for *your* accounts (manual selection / fallback). Do not use rotation to evade a provider's terms or quotas.

Custom provider: name, endpoint, key, model, OpenAI-compatible format.

Ollama: `http://localhost:11434`, no key.

## Security and privacy

- Keys live in `chrome.storage.local` (extension) or `localStorage` (web studio).
- Keys are masked in the UI. They are never logged.
- Page text is not sent until you act, unless you enable auto page context *and* send a request.
- Read [PRIVACY.md](./PRIVACY.md) and [SECURITY.md](./SECURITY.md).

## Testing

```bash
npm test
```

Manual Chrome checklist: [docs/manual-test.md](./docs/manual-test.md).

## Production build (web)

```bash
npm run build
```

## Chrome Web Store preparation

See [docs/store.md](./docs/store.md). Do not claim style-cloning, guaranteed continuity, or exact cost accounting.

## Roadmap

- **V1** (this release): sidebar, selection/page AI, core adapters, BYOK, custom provider, prompts, notes, Story Studio basics, character memory, support, local-first privacy.
- **V2**: deeper studio (DNA polish, branching UI, timeline graph, workspaces, routing, reader, PDF).
- **V3**: character simulator extras, local-model tools, more adapters, supporter cosmetics.

## License

You own your writing. Loreweave claims no copyright on user manuscripts.

# Privacy

Loreweave is local-first.

## What stays on your device

API keys, prompts, notes, conversations, story memory, character profiles, world data, and preferences. In Chrome these use `chrome.storage.local`. In the web studio they use `localStorage`.

## What leaves the browser

Only when you send a request (or have enabled auto-including page/memory context **and** you send a request):

- The prompt, plus any context you allowed
- To **the provider you selected** (OpenAI, Anthropic, Google, OpenRouter, Groq, xAI, a custom endpoint, etc.)

Loreweave does not operate a mandatory cloud account. There is no developer analytics pipeline in this build. Support links open Patreon in a new tab.

## Web studio proxy

Browsers block many provider APIs with CORS. The hosted studio may forward a request you initiated, including the key you pasted, to that provider. The key is not written to a Loreweave database. Prefer the Chrome extension if you want the key to travel only from the extension process to the provider.

## Page reading

The extension reads the current tab only after you click **Read this page**, use a selection action, or grant optional host access. It does not scrape the web in the background.

## Your content

User writing, AI output, and webpage text are labeled separately in the UI. Loreweave does not claim ownership and does not publish your work.

## Browser storage limits

`localStorage` / `chrome.storage.local` can be cleared when you wipe the profile. They are not encrypted at rest by Chrome beyond OS user isolation. Treat a shared computer as shared storage.

# Contributing

## Stack

TypeScript, React 19, TanStack Start, Tailwind v4, Zustand. Chrome extension is vanilla MV3 ES modules (no bundler required to load unpacked).

## Rules

- Keep BYOK local-first. No silent uploads.
- Do not add a paywall around core AI.
- Provider differences belong in adapters (`src/lib/ai/complete.ts`, `extension/lib/complete.js`).
- Visible strings should go through `src/lib/loreweave/i18n.ts` when you touch UI copy.
- Do not log secrets. Use `sanitizeLog`.
- Character/world merges must never overwrite `locked` records.

## Tests

Add unit tests next to critical logic (`*.test.ts`). Run `npm test` and `npm run typecheck`.

## Support URLs

Edit only `src/lib/loreweave/config.ts` and `extension/lib/support.js`.

## Developer Ecosystem workflow (read first)

This repo belongs to a Developer Ecosystem pod (DevEx: MCP, CLI, SDK, Starters including the SAP connector; Marketplace; Mkt Apps; Developer Hub).
New features and changes go through the deveco workflow before any code is written here:

1. Find the work's DSCDX idea and where it is in the flow. No idea yet: write one with the `brief` skill in `contentstack/product-wiki`.
2. The PRD, TRD, test cases, tickets and code come from your own routines (PM, Architect, QA agent, Dev), gate by gate. Do not plan, draft or build them in this session. No routine for a step yet: set it up with the `deveco-aisdlc-onboarding` skill in `contentstack/agent-skills`.
3. The order, gates and intake: https://github.com/contentstack/agent-skills/blob/main/skills/deveco-aisdlc-onboarding/references/run-protocol.md

Bug fixes and support cases keep this repo's usual path. Not sure which applies? Ask before building.

## This repo

Progress Bar: a Marketplace custom field (UI-only) with a 0–100 slider (default 10) that saves `[{ "value": n }]`. Wiki: `marketplace-apps/` in `contentstack/product-wiki`.

| Task             | Command (Node 24)                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| Install          | `npm ci`                                                                                                |
| Run locally      | `npm run dev` (http://localhost:3000; the field only renders inside Contentstack, at `/#/custom-field`) |
| Lint / typecheck | `npm run lint` · `npm run typecheck`                                                                    |
| Unit tests       | `npm test` · `npm run test:watch` · `npm run test:coverage` (fails under 90%)                           |
| Build            | `npm run build` (output `dist/`, git-ignored)                                                           |

- Tests are Vitest specs next to the code (`*.spec.tsx`). Expected values come from the spec, not from running the code.
- The app manifest is `update-app-info.json`.
- The Playwright suite (`e2e/`) needs a live stack and credentials; it is not part of CI.
- Branches `claude/<type>/<KEY>-<slug>`, PRs into `main`.

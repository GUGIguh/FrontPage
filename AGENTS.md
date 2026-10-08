# AGENTS.md — Frontpage

Frontpage is a **Product Challenge** on [Frontend Mentor](https://www.frontendmentor.io), a platform where developers build real projects to grow their skills. No Figma, multi-session build.

## Specs & Guidance

| File | Contents |
|------|----------|
| `spec/product-definition.md` | What, who, why |
| `spec/core-requirements.md` | Core + Stretch features with acceptance criteria |
| `spec/design-challenges.md` | 3 features the developer designs |
| `spec/technical-requirements.md` | Database, auth, deployment, performance |
| `spec/differentiators.md` | 6 optional enhancements (pick 1-2) |
| `guidance/brand-kit.md` | Colors, type, spacing, icons, mood, design inspiration |
| `guidance/patterns.md` | UI/UX do's and don'ts |
| `guidance/accessibility.md` | WCAG checklist |
| `starter/tokens.css` | CSS custom properties |
| `starter/tailwind.css` | Tailwind v4 config (not used in this project) |
| `data/` | Sample feeds (JSON + OPML) + edge case docs |

## Collaboration

This is a learning sandbox. The developer writes the code.
- Do not implement features unless explicitly asked
- Review code, point out bugs, explain trade-offs
- Prefer hints and questions over full solutions
- Specs in `spec/` define WHAT to build; the developer decides HOW
- Design-it-yourself features: ask clarifying questions, do not decide for the developer
- `guidance/brand-kit.md` and `starter/tokens.css` are the design source of truth
- ALWAYS explain any code, command, or config you show: what each non-obvious part does
  (flags, options, arguments), why it is needed, and what happens implicitly (files created
  or changed, side effects, defaults). Never give a bare command or snippet without this

Encourage documenting significant design and product choices in the README. Aim for accessible, semantic, responsive-first code with clean component boundaries.

## Decisions

- Monorepo: `frontend/` (React + Vite + TS) and `backend/` (Express + TS), npm workspaces
- Database: PostgreSQL in Docker (`docker-compose.yml`), accessed via Prisma ORM 7 — chosen for
  real-job experience. `backend/src/db/schema.sql` was the reviewed baseline: it is copied into
  `backend/prisma/migrations/0_init` (marked applied with `migrate resolve`); all later changes go
  through `prisma migrate dev`. `schema.sql` is kept only as history, not as a source of truth
- Prisma setup: `backend/prisma.config.ts` loads the root `.env` (run prisma from `backend/`);
  client generated to `backend/src/generated/prisma` (gitignored, `prisma generate`); runtime
  connects through `@prisma/adapter-pg`. Models are PascalCase singular with camelCase fields,
  mapped to snake_case tables/columns via `@map`/`@@map`
- Prisma gaps, hand-edit the migration SQL: `on delete set null (category_id)` on the composite FK
  in `subscriptions` (must not null `user_id`), `citext` extension. The `SetNull` warning from
  `prisma validate` on that relation is expected
- Data model: feeds and entries are shared by all users (one row per feed URL); per-user state
  lives in `subscriptions`, `categories`, `read_entries`, `bookmarks`. Category ownership is
  enforced by the DB via composite FK `(category_id, user_id)`
- Entries: dedup by `unique (feed_id, guid)`; the loader must fill `guid` (fallback: url, then hash),
  `title`, and `published_at` (fallback: fetch time), so these stay `not null`
- Cleanup of old entries must skip bookmarked ones (cascade would delete the bookmark)
- Deferred tables: password reset tokens and user settings, added as migrations at the auth/UI stage
- Build order: feed → loader → entries API (temporary hardcoded user) → minimal frontend → auth
- Auth: session cookies (httpOnly), bcrypt; password reset link logged to console in dev
- State: Redux Toolkit + RTK Query; routing: React Router
- Styles: SCSS Modules + `starter/tokens.css` as CSS custom properties. No Tailwind
- Tokens stay CSS variables (runtime theming); SCSS only for mixins, nesting, partials
- Dev: Vite `server.proxy` for `/api`; prod: Express serves the built client (same origin)

## Agent skills

`.claude/skills/` holds two Prisma 7 reference skills from `github.com/prisma/skills`
(installed by `prisma init`, the rest removed as irrelevant):
- `prisma-cli` — CLI commands (migrate, db pull/execute, generate, seed) and the consent rule
  for destructive commands (`migrate reset`, `db push --accept-data-loss`)
- `prisma-client-api` — query API (findMany, include, filters, cursor pagination, transactions)

Use them as up-to-date API reference; the collaboration rules above still win (hints over
full solutions). Their examples use `import 'dotenv/config'` — this project loads the root
`.env` explicitly instead. Use `prisma init --no-skills` if init is ever re-run.

## Learning focus

Point these out when they come up in code: promise error handling (allSettled, retries),
encodings / regex, TS narrowing and generics, semantic HTML, a11y, CSS specificity and layout.
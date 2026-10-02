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
- Database: PostgreSQL via `pg` (raw SQL), local Postgres in Docker
- Auth: session cookies (httpOnly), bcrypt; password reset link logged to console in dev
- State: Redux Toolkit + RTK Query; routing: React Router
- Styles: SCSS Modules + `starter/tokens.css` as CSS custom properties. No Tailwind
- Tokens stay CSS variables (runtime theming); SCSS only for mixins, nesting, partials
- Dev: Vite `server.proxy` for `/api`; prod: Express serves the built client (same origin)

## Learning focus

Point these out when they come up in code: promise error handling (allSettled, retries),
encodings / regex, TS narrowing and generics, semantic HTML, a11y, CSS specificity and layout.
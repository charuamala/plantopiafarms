# Plantopia Farms — CLAUDE.md

Guidance for Claude Code sessions working in this repo.

## Project shape

Monorepo: `apps/web/customer` and `apps/web/admin` (Next.js 14.2.35, `output: 'export'`
static export, deployed to Cloudflare Pages), and `backend` (Express app, run locally via
`tsx watch src/server.ts`, deployed to Cloudflare Workers via `src/worker.ts` +
`httpServerHandler`). The customer storefront currently has **no live backend wiring** —
cart/orders/auth are all `window.localStorage` only (`lib/berries.ts` is the static product
catalog). Don't assume a fetch/axios call exists just because a page looks like it submits
a form; check the page source first.

Default dev ports collide easily: customer wants `3001`, admin has no explicit port (falls
back to whatever's free). If either port is taken by an unrelated process, pass an explicit
`-p <port>` rather than assuming what's listening is this repo's app — `lsof -i :<port>` and
check the process `cwd` first.

## Browser verification: agent-browser is required, and it must run headed

This repo uses [agent-browser](https://github.com/vercel-labs/agent-browser) (installed
globally: `npm i -g agent-browser`, Chrome fetched via `agent-browser install`) to actually
drive the app in a real browser before any UI/frontend fix is considered done.

**Hard rule from the project owner: verification must run headed (a visible browser
window), not headless.** Silent headless checks are not an acceptable substitute — pass
`--headed` (or rely on `AGENT_BROWSER_HEADED=1`) when opening the browser for verification
runs. This is a standing instruction, not a one-off request.

Before running anything, read the bundled skill instead of guessing flags:

```bash
agent-browser skills get core       # canonical workflow: open → snapshot -i → act → re-snapshot
agent-browser skills get dogfood    # for open-ended "find bugs" exploratory passes
```

### Required verification loop for any frontend change

1. Start the relevant dev server (`npm run dev:customer` / `npm run dev:admin` from repo
   root, or `next dev -p <port>` directly if the default port is taken).
2. Open a **named, headed** session so you don't collide with another agent's browser and so
   the window is actually visible:
   ```bash
   export AGENT_BROWSER_SESSION="$(agent-browser session id --scope worktree --prefix pf)"
   agent-browser open http://localhost:<port>/<route> --headed
   agent-browser wait --load networkidle
   ```
3. Capture proof, every time — a fix without this evidence is not verified:
   ```bash
   agent-browser screenshot <path>.png          # visual proof
   agent-browser console                        # browser console log
   agent-browser errors                         # uncaught page errors
   agent-browser network requests               # catches silent 404s on assets/images
   ```
4. For anything interactive (forms, cart, checkout), actually drive it — `snapshot -i` for
   `@eN` refs, then `fill`/`click`/`wait --url ...` through the real flow — not just a
   static screenshot of the landing state.
5. Save screenshots + logs under a report directory (see below) and write a short before/
   after report. If you can reproduce the *original* bug (e.g. `git stash` the fix
   temporarily), do — a before/after pair is much stronger proof than an after-only shot.

### Where reports go

Save verification screenshots/logs to `<scratchpad>/agent-browser-report/{before,after}/`
for the session, and summarize findings + embed the screenshots in a report (Markdown or a
published Artifact) handed back to the user — don't just leave PNGs on disk with no
narrative. Always close the session when done: `agent-browser close`.

### Known-fragile patterns in this codebase (found via the above loop)

- Several customer pages used the pre-Next-13 `<Link href="..."><a>...</a></Link>` nesting.
  Next 14 throws `Invalid <Link> with <a> child` — a hard 500, not a lint warning. If you see
  this pattern anywhere else in `apps/web/customer/pages`, remove the inner `<a>` and move
  its props onto `<Link>` directly.
- `berryCatalog[...].price` is a display string (`"₹299 / 250g"`). Never
  `parseInt(price.replace(/[^0-9]/g, ""), 10))` it for math — stripping non-digits collapses
  the price and the weight into one number (`"₹299 / 250g"` → `"299250"`). Use
  `berryCatalog[...].priceValue` (a plain number) for any total/sum calculation instead.
- Product images referenced under `/images/*.jpg` must actually exist in
  `apps/web/customer/public/images/` — an empty directory still 404s. Verify with
  `agent-browser network requests` after any catalog change, not just by eyeballing the code.

## Design skills (installed globally, `~/.claude/skills/`)

Four design-focused skill packages are installed globally so they're available in every
project, not just this one. Reach for them by task shape:

| Skill | Use when | Skip when |
|---|---|---|
| **impeccable** | Auditing/polishing UI you're about to ship — `/impeccable init` once per project to capture brand/voice/palette context, then `/impeccable audit` or `/impeccable critique` before calling frontend work done. Runs 59 deterministic anti-pattern detectors (no API calls). | Pure backend/API/infra work with no visual surface. |
| **design-taste-frontend** (from taste-skill) | Generating *new* frontend UI from scratch and you want it to avoid generic AI-slop patterns (predictable gradients, cookie-cutter cards, safe layouts) — pushes for stronger typography, spacing, and layout variance. | Fixing a narrowly-scoped bug in existing UI (use impeccable's audit/critique instead, or just fix it). |
| **ui-ux-pro-max** | Need concrete design *decisions* — color palette, font pairing, layout pattern, stack-specific implementation — backed by its local searchable data (styles, palettes, font pairings, UX guideline checklist by priority). Good first stop when starting a new page/section. | You already have a design system in place and are just implementing to spec. |
| **design** / **design-system** / **ui-styling** / **brand** / **banner-design** / **slides** (also from ui-ux-pro-max-skill) | Narrower companions to `ui-ux-pro-max`: `design-system` for token architecture/component specs, `ui-styling` for shadcn/Tailwind implementation specifics, `brand` for voice/identity/style-guide work, `banner-design`/`slides` for marketing assets and presentations. | General UI work — start with `ui-ux-pro-max`, only reach for these when the task is specifically about that narrower concern. |

All of the above were installed via `npx skills add <repo> -g --skill <name> --agent
claude-code` (or `npx impeccable install --scope=global`) — re-run the same command with
`update` in place of `add`/`install` to pick up new versions.

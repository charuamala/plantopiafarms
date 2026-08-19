# Plantopia Farms — CLAUDE.md

Guidance for Claude Code sessions working in this repo.

## Project shape

Monorepo: `apps/web/customer` and `apps/web/admin` (Next.js 14.2.35, `output: 'export'`
static export, deployed to Cloudflare Pages), and `backend` (Express app, run locally via
`tsx watch src/server.ts`, deployed to Cloudflare Workers via `src/worker.ts` +
`httpServerHandler`). As of 2026-08-19 the customer storefront **does** fetch real product/
category data from that backend (`apps/web/customer/lib/api.ts` — used by `shop.tsx`,
`cart.tsx`, `checkout.tsx`, `wishlist.tsx`, `products/[slug].tsx`, and the homepage's featured
product). Cart contents, order history, and auth session are still `window.localStorage`
only. `lib/berries.ts` remains a separate static catalog used for the marketing/berry-detail
pages (`/berry/[berry]`) — don't conflate it with the real `Product` records in D1.

Default dev ports collide easily: customer wants `3001`, admin has no explicit port (falls
back to whatever's free). If either port is taken by an unrelated process, pass an explicit
`-p <port>` rather than assuming what's listening is this repo's app — `lsof -i :<port>` and
check the process `cwd` first. The backend's plain `npm run dev` (port 4000) does **not**
serve product/category/admin routes — those need Cloudflare D1, so use `npm run dev:worker`
(`wrangler dev`, port 8787, matching `lib/api.ts`'s default `NEXT_PUBLIC_API_URL`) instead.
If the shop page shows "No products found" for every filter, check `lsof -i :8787` before
suspecting a data/seed problem — the local D1 sqlite file already has seeded rows.

## Deployment — push to `main` now auto-deploys (fixed 2026-08-19)

- **Remote:** push to the `upstream` git remote (`https://github.com/charuamala/plantopiafarms`),
  not `origin` (`amala-cness/plantopiafarms` — a personal fork with no deploy wired to it and
  no push access for most accounts). Check `git remote -v` and the current branch's tracking
  ref (`git rev-parse --abbrev-ref @{u}`) before assuming a plain `git push` goes to the right
  place.
- **Pipeline:** `.github/workflows/deploy.yml` runs on every push to `main` and deploys all
  three pieces via `cloudflare/wrangler-action` — backend Worker, customer Pages, admin Pages
  — to Cloudflare account `8f731220bf501bb04c2d07f5b860752a`. It needs `CLOUDFLARE_API_TOKEN`
  and `CLOUDFLARE_ACCOUNT_ID` as repo secrets (`gh secret list --repo charuamala/plantopiafarms`
  to check). There is **no** native Cloudflare↔GitHub Git integration configured (`wrangler
  pages project list` shows `Git Provider: No` for both Pages projects) — this GitHub Actions
  workflow is the only automatic path.
- **The real production domain is `plantopiaforms.com`** ("forms", not "farms") — confirmed
  via DNS and via `wrangler pages project list` / the custom route in `backend/wrangler.jsonc`.
  The site's own marketing copy (footer, social share links in `lib/berries.ts`, `Layout.tsx`'s
  `SITE_URL`, the contact page) still says `plantopiafarms.com` ("farms"), which is a
  *different, unrelated Squarespace site* — that's a real brand/domain split, not something to
  silently "fix" by rewriting one to match the other, since `plantopiafarms.com` is the actual
  intended brand identity/email domain, just not the one currently pointed at Cloudflare.
  `wrangler.jsonc`'s custom domain route and `deploy.yml`'s `NEXT_PUBLIC_API_URL` must say
  `plantopiaforms.com` or Worker deploys fail with `Could not find zone for ...`.
- **Production D1 is a separate database from local dev D1.** Migrating/seeding locally
  (`npm run db:migrate` / `db:seed`, no `--local` needed since that's the default) does nothing
  to production. Use `db:migrate:remote` / `db:seed:remote` for that, and check first — a fresh
  Worker deploy to a never-migrated D1 database returns `D1_ERROR: no such table: ...` on every
  API call even though the deploy itself succeeded.
- Verify a deploy actually happened (don't assume): `gh run list --repo charuamala/plantopiafarms`
  for status, `gh run view <id> --repo charuamala/plantopiafarms --log-failed` for why something
  failed, and hit the live site/API directly (e.g. `curl -I https://plantopiaforms.com/<route>`)
  to confirm the change is actually there rather than trusting a green checkmark alone.

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

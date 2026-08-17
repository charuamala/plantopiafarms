/**
 * Cloudflare Workers entrypoint.
 *
 * This adapts the existing Express app (./app.ts) to run on Cloudflare
 * Workers, following Cloudflare's official "Deploy an Express.js application
 * on Cloudflare Workers" guide:
 * https://developers.cloudflare.com/workers/tutorials/deploy-an-express-app/
 *
 * Per that guide, the recommended pattern under the `nodejs_compat`
 * compatibility flag is:
 *   1. Build the Express app as normal and call `app.listen(port)`.
 *   2. Wrap it with `httpServerHandler` from `cloudflare:node`, which adapts
 *      Node's `http.Server` (what `app.listen` returns under the hood) into
 *      a Workers `fetch` handler.
 *
 * This file is intentionally a *thin adapter* — none of the Express route or
 * business logic in ./app.ts, ./routes/*, ./middleware/*, etc. is modified.
 * `src/server.ts` (plain Node `app.listen`) remains the entry point for
 * local development of routes that don't need a database; this file is the
 * separate entry point Wrangler builds for the Workers runtime (see `main`
 * in wrangler.jsonc).
 *
 * Database note: product/category/admin routes read the `DB` binding
 * (Cloudflare D1, see wrangler.jsonc's `d1_databases`) via
 * `import { env } from "cloudflare:workers"` inside `./db/d1.ts`. That
 * binding only exists in the Workers runtime, so those routes need
 * `npm run dev:worker` (wrangler dev, which runs a local D1 via Miniflare)
 * rather than the plain `npm run dev` Node entry point.
 */
import { httpServerHandler } from 'cloudflare:node';
import app from './app';

const PORT = 3000;

app.listen(PORT);

export default httpServerHandler({ port: PORT });

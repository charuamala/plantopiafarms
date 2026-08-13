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
 * `src/server.ts` (Node's `app.listen` + `connectDatabase`) remains the entry
 * point for local development (`npm run dev` / `npm start`); this file is
 * the separate entry point Wrangler builds for the Workers runtime (see
 * `main` in wrangler.jsonc).
 *
 * Database note: `connectDatabase()` is deliberately NOT invoked here.
 * There is no production MongoDB yet (MONGODB_URI is intentionally left
 * unset as a Worker secret). Calling `mongoose.connect()` eagerly at startup
 * with a bad/missing URI would throw and break every request, including
 * routes that never touch the database. Once a real MONGODB_URI secret is
 * set, database-backed routes can call/await `connectDatabase()` lazily
 * (e.g. from middleware) — that wiring is out of scope for this change.
 */
import { httpServerHandler } from 'cloudflare:node';
import app from './app';

const PORT = 3000;

app.listen(PORT);

export default httpServerHandler({ port: PORT });

/**
 * Workers-safe replacement for `iconv-lite`, wired up via `alias` in
 * wrangler.jsonc (see https://developers.cloudflare.com/workers/wrangler/configuration/#module-aliasing).
 *
 * Why this exists: `express` unconditionally does `require('body-parser')`
 * at the top of `express/lib/express.js` — just importing `express` at all
 * (regardless of whether the app calls `express.json()`/`express.urlencoded()`)
 * pulls in `body-parser` -> `raw-body` -> `iconv-lite`.
 *
 * The real `iconv-lite` crashes at import time on Cloudflare Workers: its
 * top-level code in `lib/index.js` unconditionally runs
 * `require('./streams')(iconv)` whenever `process.versions.node` looks
 * truthy. Workers' `nodejs_compat` `process` polyfill makes that check pass,
 * but esbuild resolves iconv-lite's package.json `browser` field, which
 * stubs `lib/streams.js` (and `lib/extend-node.js`) out to an empty module.
 * So the call throws `TypeError: require_streams(...) is not a function`,
 * and the Worker fails to start at all. This is a known, unresolved
 * incompatibility (https://github.com/cloudflare/workers-sdk/issues/9309).
 *
 * This app only ever sends/receives UTF-8 JSON, so a full charset-conversion
 * library is unnecessary. This shim implements just the surface area
 * `raw-body` calls (`getDecoder`), using the platform-native `TextDecoder`
 * for UTF-8-family encodings, and throws the same "Encoding not recognized"
 * error real iconv-lite throws for anything else, so `raw-body`'s existing
 * error handling (it maps that message to an HTTP 415) keeps working.
 */

const UTF8_LIKE_ENCODINGS = new Set(['utf8', 'utf-8', 'ascii', 'binary', 'latin1']);

function normalize(encoding: string): string {
  return String(encoding || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

class Utf8Decoder {
  private decoder = new TextDecoder('utf-8');

  write(buf: Uint8Array): string {
    return this.decoder.decode(buf, { stream: true });
  }

  end(): string {
    return this.decoder.decode();
  }
}

export function getDecoder(encoding: string) {
  const normalized = normalize(encoding);
  if (!UTF8_LIKE_ENCODINGS.has(normalized)) {
    // Matches iconv-lite's real error message/shape so callers (e.g.
    // raw-body) that pattern-match on it for a 415 response still work.
    throw new Error(`Encoding not recognized: '${encoding}' (searched as: '${normalized}')`);
  }
  return new Utf8Decoder();
}

export function encodingExists(encoding: string): boolean {
  return UTF8_LIKE_ENCODINGS.has(normalize(encoding));
}

export function decode(buf: Uint8Array, encoding = 'utf8'): string {
  const decoder = getDecoder(encoding);
  const text = decoder.write(buf);
  const trail = decoder.end();
  return trail ? text + trail : text;
}

export function encode(str: string): Uint8Array {
  return new TextEncoder().encode(String(str ?? ''));
}

export default { getDecoder, encodingExists, decode, encode };

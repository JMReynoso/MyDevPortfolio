// Static file server for the portfolio SPA, running on AWS Lambda (node22.x)
// behind a Function URL. The Vite build output (dist/) is bundled into the
// deployment zip alongside this file.
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const DIST = join(import.meta.dirname, 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.map': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webmanifest': 'application/manifest+json',
};

// Extensions safe to return as plain text; everything else is base64-encoded.
const TEXT = new Set(['.html', '.js', '.css', '.json', '.map', '.svg', '.txt', '.xml', '.webmanifest']);

export const handler = async (event) => {
  let path = decodeURIComponent(event.rawPath ?? '/');
  if (path.endsWith('/')) path += 'index.html';

  let filePath = normalize(join(DIST, path));
  if (!filePath.startsWith(DIST)) {
    return { statusCode: 403, body: 'Forbidden' };
  }

  let body;
  try {
    body = await readFile(filePath);
  } catch {
    // SPA fallback: unknown paths are client-side routes -> serve index.html
    filePath = join(DIST, 'index.html');
    body = await readFile(filePath);
  }

  const ext = extname(filePath);
  const isText = TEXT.has(ext);
  // Vite fingerprints everything under /assets/, so those are immutable.
  const cacheControl = filePath.includes(`${DIST}/assets/`)
    ? 'public, max-age=31536000, immutable'
    : 'no-cache';

  return {
    statusCode: 200,
    headers: {
      'content-type': MIME[ext] ?? 'application/octet-stream',
      'cache-control': cacheControl,
    },
    body: isText ? body.toString('utf-8') : body.toString('base64'),
    isBase64Encoded: !isText,
  };
};

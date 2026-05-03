#!/usr/bin/env node
// Postbuild — copy non-bundled static assets into dist/.
//
// The legacy MedDuel JS uses plain <script> tags with global functions,
// which Vite cannot bundle (they're not ES modules). Vite still emits a
// processed dist/index.html that references those <script src="src/..."> paths,
// so we just copy the referenced files verbatim.
//
// When the codebase migrates to ES modules in a future phase this script
// can be deleted.

import { cpSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = resolve(__dirname, '..');
const dist      = resolve(root, 'dist');

if (!existsSync(dist)) {
  console.error('postbuild: dist/ not found — run `vite build` first.');
  process.exit(1);
}

// Each entry: [from, to]. `to` is relative to dist/.
const COPY = [
  ['src',           'src'],
  ['img',           'img'],
  ['sw.js',         'sw.js'],
  ['manifest.json', 'manifest.json'],
  ['history.html',  'history.html'],
];

let total = 0;
for (const [src, target] of COPY) {
  const srcAbs = resolve(root, src);
  if (!existsSync(srcAbs)) {
    console.warn(`postbuild: skipping missing ${src}`);
    continue;
  }
  const dstAbs = resolve(dist, target);
  cpSync(srcAbs, dstAbs, { recursive: true, force: true });
  const isDir = statSync(srcAbs).isDirectory();
  console.log(`copied ${src}${isDir ? '/' : ''}  →  dist/${target}${isDir ? '/' : ''}`);
  total++;
}

console.log(`postbuild: ${total} entries copied.`);

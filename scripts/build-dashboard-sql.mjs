#!/usr/bin/env node
// MedDuel — bundle migrations + seed.sql into a single dashboard-pasteable
// SQL file (build/dashboard.sql). Used for the hosted Supabase setup path
// where you copy-paste the bundle into the dashboard SQL editor instead of
// installing the Supabase CLI.

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root      = resolve(__dirname, '..');
const migDir    = join(root, 'supabase/migrations');
const seedFile  = join(root, 'supabase/seed.sql');
const outDir    = join(root, 'build');
const outFile   = join(outDir, 'dashboard.sql');

if (!existsSync(seedFile)) {
  console.error('seed.sql missing — run `npm run supabase:seed` first.');
  process.exit(1);
}

const migrations = readdirSync(migDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

mkdirSync(outDir, { recursive: true });

// ── 1. Schema-only bundle (small, paste-friendly) ───────────────────────
const schemaParts = [
  '-- MedDuel — schema bundle (migrations only, no seed data)',
  `-- Built ${new Date().toISOString()}`,
  '-- Apply ONCE to a fresh Supabase project via the dashboard SQL editor.',
  '',
];
for (const f of migrations) {
  schemaParts.push(`-- ───────── ${f} ─────────`);
  schemaParts.push(readFileSync(join(migDir, f), 'utf8'));
  schemaParts.push('');
}
const schemaPath  = join(outDir, 'dashboard.schema.sql');
const schemaBytes = schemaParts.join('\n');
writeFileSync(schemaPath, schemaBytes, 'utf8');

// ── 2. Seed file copy ───────────────────────────────────────────────────
const seedPath  = join(outDir, 'dashboard.seed.sql');
const seedBytes = readFileSync(seedFile, 'utf8');
writeFileSync(seedPath, seedBytes, 'utf8');

const kb = (n) => (Buffer.byteLength(n, 'utf8') / 1024).toFixed(1);
console.log(`Wrote ${schemaPath}  (${kb(schemaBytes)} KB) — paste into SQL editor first`);
console.log(`Wrote ${seedPath}    (${kb(seedBytes)} KB) — paste second to populate questions`);
console.log('');
console.log('Or via Supabase CLI (recommended):');
console.log('  supabase link --project-ref <YOUR-REF>');
console.log('  supabase db push                        # applies migrations');
console.log('  supabase db reset --linked              # ALSO loads seed.sql (DANGEROUS in prod)');

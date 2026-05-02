/**
 * MedDuel — Inject translated fields back into data files
 *
 * Usage:
 *   node inject_translations.js to_translated.json
 *
 * IMPORTANT: Run extract_for_translation.js first, translate the output,
 * then run this script. It rewrites questions.js, cases.js, detective_cases.js
 * in place. Commit before running — easy to revert.
 */

const fs = require('fs');
const vm = require('vm');

const translatedPath = process.argv[2];
if (!translatedPath) { console.error('Usage: node inject_translations.js <translated.json>'); process.exit(1); }

const translated = JSON.parse(fs.readFileSync(translatedPath, 'utf8'));

// ── Helper: replace Dutch fields in a JS file using string manipulation ──
// Strategy: eval the original, apply translated values, re-serialize via
// a line-by-line replacement of specific patterns.
// Safer approach: use the translated JSON as a patch on top of the eval'd array.

// ── questions.js ──────────────────────────────────────────────────
{
  const raw = fs.readFileSync('src/data/questions.js', 'utf8').replace(/^(const|let)\s+/gm, 'var ');
  const ctx = {}; vm.createContext(ctx); vm.runInContext(raw, ctx);
  const QUESTIONS = ctx.QUESTIONS;

  translated.questions.forEach(t => {
    const i = t._i;
    const q = QUESTIONS[i];
    q.q  = t.q;
    if (t.a)  q.a  = t.a;
    if (t.ex) q.ex = t.ex;
    q.dl = t.dl;
    if (q.wiki) {
      if (t.wiki_kern)    q.wiki.kern    = t.wiki_kern;
      if (t.wiki_redflag) q.wiki.redflag = t.wiki_redflag;
      if (q.wiki.bigfact) {
        if (t.wiki_bigfact_label) q.wiki.bigfact.label = t.wiki_bigfact_label;
        if (t.wiki_bigfact_sub)   q.wiki.bigfact.sub   = t.wiki_bigfact_sub;
      }
      if (t.wiki_mechanisme && q.wiki.mechanisme) {
        t.wiki_mechanisme.forEach((s, j) => {
          if (q.wiki.mechanisme[j]) {
            q.wiki.mechanisme[j].title = s.title;
            q.wiki.mechanisme[j].desc  = s.desc;
          }
        });
      }
      if (t.wiki_onderscheid && q.wiki.onderscheid) {
        t.wiki_onderscheid.forEach((s, j) => {
          if (q.wiki.onderscheid[j]) {
            q.wiki.onderscheid[j].label = s.label;
            q.wiki.onderscheid[j].desc  = s.desc;
          }
        });
      }
      if (q.wiki.therapie) {
        if (t.wiki_therapie_urgent) q.wiki.therapie.urgent = t.wiki_therapie_urgent;
        if (t.wiki_therapie_stappen && q.wiki.therapie.stappen) {
          t.wiki_therapie_stappen.forEach((s, j) => {
            if (q.wiki.therapie.stappen[j]) {
              q.wiki.therapie.stappen[j].naam   = s.naam;
              q.wiki.therapie.stappen[j].detail = s.detail;
            }
          });
        }
      }
    }
  });

  const newContent = `// MedDuel — Question bank (English)\nconst QUESTIONS = ${JSON.stringify(QUESTIONS, null, 2)};\n`;
  fs.writeFileSync('src/data/questions.js', newContent);
  console.log(`✓ questions.js updated (${QUESTIONS.length} questions)`);
}

// ── cases.js ──────────────────────────────────────────────────────
{
  const raw = fs.readFileSync('src/data/cases.js', 'utf8').replace(/^(const|let)\s+/gm, 'var ');
  const ctx = {}; vm.createContext(ctx); vm.runInContext(raw, ctx);
  const DOSSIER_CASES = ctx.DOSSIER_CASES;

  translated.cases.forEach(t => {
    const c = DOSSIER_CASES[t._i];
    c.patient   = t.patient;
    c.diagnosis = t.diagnosis;
    c.clues     = t.clues;
    c.options   = t.options;
  });

  const newContent = `// MedDuel — Dossier cases (English)\nconst DOSSIER_CASES = ${JSON.stringify(DOSSIER_CASES, null, 2)};\n`;
  fs.writeFileSync('src/data/cases.js', newContent);
  console.log(`✓ cases.js updated (${DOSSIER_CASES.length} cases)`);
}

// ── detective_cases.js ────────────────────────────────────────────
{
  const raw = fs.readFileSync('src/data/detective_cases.js', 'utf8').replace(/^(const|let)\s+/gm, 'var ');
  const ctx = {}; vm.createContext(ctx); vm.runInContext(raw, ctx);
  const DETECTIVE_CASES = ctx.DETECTIVE_CASES;

  translated.detective.forEach(t => {
    const c = DETECTIVE_CASES[t._i];
    c.title = t.title;
    c.intro = t.intro;
    t.investigations.forEach((inv, j) => {
      if (c.investigations[j]) {
        c.investigations[j].label   = inv.label;
        c.investigations[j].result  = inv.result;
        if (inv.insight) c.investigations[j].insight = inv.insight;
      }
    });
    c.diagnosis_options  = t.diagnosis_options;
    c.correct_diagnosis  = t.correct_diagnosis;
    if (t.final_explanation) c.final_explanation = t.final_explanation;
    if (t.vitals_decay_triggers && c.vitals_decay?.triggers) {
      t.vitals_decay_triggers.forEach((tr, j) => {
        if (c.vitals_decay.triggers[j]) c.vitals_decay.triggers[j].message = tr.message;
      });
    }
  });

  const newContent = `// MedDuel — Detective cases (English)\nconst DETECTIVE_CASES = ${JSON.stringify(DETECTIVE_CASES, null, 2)};\n`;
  fs.writeFileSync('src/data/detective_cases.js', newContent);
  console.log(`✓ detective_cases.js updated (${DETECTIVE_CASES.length} cases)`);
}

console.log('\nDone. Run: node -e "eval(require(\'fs\').readFileSync(\'src/data/questions.js\',\'utf8\'))" && echo OK');

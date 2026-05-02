/**
 * MedDuel — Extract Dutch text fields for external translation
 *
 * Usage:
 *   node extract_for_translation.js > to_translate.json
 *
 * Then paste to_translate.json into ChatGPT/DeepL with prompt:
 *   "Translate all values in this JSON from Dutch to English.
 *    Keep all keys, keep HTML tags and template literals intact.
 *    Medical terminology: use standard English clinical terms.
 *    Return only the JSON."
 *
 * Then run: node inject_translations.js to_translated.json
 */

const fs = require('fs');
const vm = require('vm');

// ── questions.js ──────────────────────────────────────────────────
const questionsRaw = fs.readFileSync('src/data/questions.js', 'utf8').replace(/^(const|let)\s+/gm, 'var ');
const qCtx = {}; vm.createContext(qCtx); vm.runInContext(questionsRaw, qCtx);
const QUESTIONS = qCtx.QUESTIONS;

const questionsTranslatable = QUESTIONS.map((q, i) => ({
  _i: i,
  q: q.q,
  a: q.a || null,
  ex: q.ex || null,
  dl: q.dl,
  // wiki fields
  wiki_kern: q.wiki?.kern || null,
  wiki_redflag: q.wiki?.redflag || null,
  wiki_bigfact_label: q.wiki?.bigfact?.label || null,
  wiki_bigfact_sub: q.wiki?.bigfact?.sub || null,
  wiki_mechanisme: Array.isArray(q.wiki?.mechanisme) ? q.wiki.mechanisme.map(s => ({ title: s.title, desc: s.desc })) : null,
  wiki_onderscheid: Array.isArray(q.wiki?.onderscheid) ? q.wiki.onderscheid.map(s => ({ label: s.label, desc: s.desc })) : null,
  wiki_therapie_urgent: q.wiki?.therapie?.urgent || null,
  wiki_therapie_stappen: Array.isArray(q.wiki?.therapie?.stappen) ? q.wiki.therapie.stappen.map(s => ({ naam: s.naam, detail: s.detail })) : null,
}));

// ── cases.js ──────────────────────────────────────────────────────
const casesRaw = fs.readFileSync('src/data/cases.js', 'utf8').replace(/^(const|let)\s+/gm, 'var ');
const cCtx = {}; vm.createContext(cCtx); vm.runInContext(casesRaw, cCtx);
const DOSSIER_CASES = cCtx.DOSSIER_CASES;

const casesTranslatable = DOSSIER_CASES.map((c, i) => ({
  _i: i,
  id: c.id,
  patient: c.patient,
  diagnosis: c.diagnosis,
  clues: c.clues.map(cl => ({ label: cl.label, text: cl.text })),
  options: c.options,
}));

// ── detective_cases.js ────────────────────────────────────────────
const detectiveRaw = fs.readFileSync('src/data/detective_cases.js', 'utf8').replace(/^(const|let)\s+/gm, 'var ');
const dCtx = {}; vm.createContext(dCtx); vm.runInContext(detectiveRaw, dCtx);
const DETECTIVE_CASES = dCtx.DETECTIVE_CASES;

const detectiveTranslatable = DETECTIVE_CASES.map((c, i) => ({
  _i: i,
  id: c.id,
  title: c.title,
  intro: c.intro,
  investigations: c.investigations.map(inv => ({
    id: inv.id,
    label: inv.label,
    result: inv.result,
    insight: inv.insight || null,
  })),
  diagnosis_options: c.diagnosis_options,
  correct_diagnosis: c.correct_diagnosis,
  final_explanation: c.final_explanation || null,
  // vitals_decay messages
  vitals_decay_triggers: c.vitals_decay?.triggers?.map(t => ({ message: t.message })) || null,
}));

// ── Output ────────────────────────────────────────────────────────
const output = {
  _instructions: "Translate all string values from Dutch to English. Keep HTML, template literals (${...}), emoji, and keys unchanged. Medical terms: use standard English clinical terminology.",
  questions: questionsTranslatable,
  cases: casesTranslatable,
  detective: detectiveTranslatable,
};

console.log(JSON.stringify(output, null, 2));

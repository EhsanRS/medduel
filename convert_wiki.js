// Wiki migration: flat strings → structured objects
// Splits existing text into mechanisme-steps, onderscheid-items, therapie-stappen

const fs = require('fs');
let src = fs.readFileSync('src/data/questions.js', 'utf8');

// ── helpers ──────────────────────────────────────────────────────────────────

function splitSentences(text) {
  // Split on '. ' but keep abbreviations intact
  return text.split(/\.\s+(?=[A-Z\-])/).map(s => s.trim()).filter(Boolean);
}

function mechToSteps(text) {
  // Try splitting on '→' first (chain-of-causation style)
  let parts = text.split(/\s*→\s*/);
  if (parts.length >= 3) {
    return parts.slice(0, 5).map((p, i) => ({
      title: `Stap ${i + 1}`,
      desc: p.trim().replace(/\.$/, '') + '.'
    }));
  }
  // Fall back to sentence split
  const sents = splitSentences(text);
  const steps = [];
  for (let i = 0; i < Math.min(sents.length, 5); i++) {
    const s = sents[i];
    const colonIdx = s.indexOf(':');
    if (colonIdx > 0 && colonIdx < 35) {
      steps.push({ title: s.slice(0, colonIdx).trim(), desc: s.slice(colonIdx + 1).trim().replace(/\.$/, '') + '.' });
    } else {
      steps.push({ title: `Stap ${steps.length + 1}`, desc: s.replace(/\.$/, '') + '.' });
    }
  }
  return steps.length >= 2 ? steps : [{ title: 'Mechanisme', desc: text.trim() }];
}

function diffToItems(text) {
  // Split on patterns like "Naam: desc. " or "Naam (detail): desc."
  // Try splitting on '. ' where next word is capitalized diagnosis
  const raw = text.split(/\.\s+(?=[A-ZÁÀÄÉÈÍÓÚ])/);
  const items = [];
  const types = ['warn', 'warn', 'danger', 'warn', 'warn'];
  for (let i = 0; i < Math.min(raw.length, 5); i++) {
    const part = raw[i].trim();
    const colonIdx = part.indexOf(':');
    if (colonIdx > 0 && colonIdx < 50) {
      const label = part.slice(0, colonIdx).trim();
      const desc = part.slice(colonIdx + 1).trim().replace(/\.$/, '') + '.';
      items.push({ label, desc, type: types[i] || 'warn' });
    } else {
      items.push({ label: `Optie ${i + 1}`, desc: part.replace(/\.$/, '') + '.', type: types[i] || 'warn' });
    }
  }
  if (items.length > 0) items[0].type = 'ok';
  return items.length >= 2 ? items : [{ label: 'Onderscheid', desc: text.trim(), type: 'warn' }];
}

function therapieToObj(text) {
  const sents = splitSentences(text);
  const urgent = sents[0] ? sents[0].replace(/\.$/, '') + '.' : text.trim();
  const rest = sents.slice(1);
  const stappen = [];
  for (let i = 0; i < Math.min(rest.length, 5); i++) {
    const s = rest[i];
    const colonIdx = s.indexOf(':');
    if (colonIdx > 0 && colonIdx < 40) {
      stappen.push({ naam: s.slice(0, colonIdx).trim(), detail: s.slice(colonIdx + 1).trim().replace(/\.$/, '') + '.' });
    } else {
      stappen.push({ naam: `Stap ${stappen.length + 1}`, detail: s.replace(/\.$/, '') + '.' });
    }
  }
  return { urgent, stappen: stappen.length ? stappen : [{ naam: 'Behandeling', detail: rest.join('. ').trim() }] };
}

function kernToTwo(text) {
  const sents = splitSentences(text);
  if (sents.length <= 2) return text.trim();
  return sents.slice(0, 2).join('. ').replace(/\.$/, '') + '.';
}

// ── regex replace ─────────────────────────────────────────────────────────────
// Match flat wiki: wiki:{ kern:'...', mechanisme:'...', onderscheid:'...', therapie:'...' }
// Fields can be in any order; therapie/onderscheid are optional

const WIKI_RE = /wiki:\{\s*kern:'((?:[^'\\]|\\.)*)'\s*(?:,\s*mechanisme:'((?:[^'\\]|\\.)*)')?\s*(?:,\s*onderscheid:'((?:[^'\\]|\\.)*)')?\s*(?:,\s*therapie:'((?:[^'\\]|\\.)*)')?\s*\}/g;

let count = 0;
const out = src.replace(WIKI_RE, (match, kern, mech, diff, ther) => {
  // Skip if already new-format (these won't match anyway due to regex)
  count++;
  const newKern = kernToTwo(kern);
  const mechSteps = mech ? mechToSteps(mech) : null;
  const diffItems = diff ? diffToItems(diff) : null;
  const therObj = ther ? therapieToObj(ther) : null;

  const lines = ['wiki:{'];
  lines.push(`      kern: ${JSON.stringify(newKern)},`);
  if (mechSteps) {
    lines.push('      mechanisme: [');
    mechSteps.forEach(s => lines.push(`        { title: ${JSON.stringify(s.title)}, desc: ${JSON.stringify(s.desc)} },`));
    lines.push('      ],');
  }
  if (diffItems) {
    lines.push('      onderscheid: [');
    diffItems.forEach(d => lines.push(`        { label: ${JSON.stringify(d.label)}, desc: ${JSON.stringify(d.desc)}, type: '${d.type}' },`));
    lines.push('      ],');
  }
  if (therObj) {
    lines.push('      therapie: {');
    lines.push(`        urgent: ${JSON.stringify(therObj.urgent)},`);
    if (therObj.stappen.length) {
      lines.push('        stappen: [');
      therObj.stappen.forEach(s => lines.push(`          { naam: ${JSON.stringify(s.naam)}, detail: ${JSON.stringify(s.detail)} },`));
      lines.push('        ],');
    }
    lines.push('      },');
  }
  lines.push('    }');
  return lines.join('\n    ');
});

fs.writeFileSync('src/data/questions.js', out, 'utf8');
console.log('Converted:', count, 'flat wiki fields');

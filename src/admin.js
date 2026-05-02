// MedDuel — Admin vragenbank overzicht

let ADM = { domain: 'all', diff: 'all', subtype: 'all' };

const ADM_DOMAINS = {
  cardio:   { icon: '🫀', label: 'Cardiology' },
  neuro:    { icon: '🧠', label: 'Neurology' },
  pharma:   { icon: '💊', label: 'Pharmacology' },
  infectio: { icon: '🦠', label: 'Infectiology' },
  lab:      { icon: '🧪', label: 'Lab' },
};

function showAdmin() {
  document.getElementById('app').innerHTML = `
    <div id="admin" class="screen active">
      <div style="max-width:480px;margin:0 auto;padding:0 1.25rem 3rem;">

        <div class="game-nav" style="padding-top:1.5rem;">
          <button class="quit-btn" onclick="showHome()">← Back</button>
          <span style="font-family:'Fraunces',serif;font-size:15px;font-weight:700;color:var(--ink);">Question bank</span>
        </div>

        <div id="adm-stats" style="margin-bottom:1.25rem;"></div>

        <div class="adm-filters">
          <div class="adm-fgroup" id="adm-fd">
            <button class="adm-f active" onclick="admF('domain','all',this)">All</button>
            ${Object.entries(ADM_DOMAINS).map(([k,v]) =>
              `<button class="adm-f" onclick="admF('domain','${k}',this)">${v.icon}</button>`
            ).join('')}
          </div>
          <div class="adm-fgroup" id="adm-fs">
            <button class="adm-f active" onclick="admF('subtype','all',this)">All types</button>
            <button class="adm-f" onclick="admF('subtype','regular',this)">Regular</button>
            <button class="adm-f diff" onclick="admF('subtype','diff',this)">Differential</button>
            <button class="adm-f test" onclick="admF('subtype','test',this)">Test choice</button>
          </div>
          <div class="adm-fgroup" id="adm-ff">
            <button class="adm-f active" onclick="admF('diff','all',this)">All</button>
            <button class="adm-f" onclick="admF('diff','1',this)">★</button>
            <button class="adm-f" onclick="admF('diff','2',this)">★★</button>
            <button class="adm-f" onclick="admF('diff','3',this)">★★★</button>
            <button class="adm-f" onclick="admF('diff','4',this)">★★★★</button>
            <button class="adm-f" onclick="admF('diff','5',this)">★★★★★</button>
          </div>
        </div>

        <div id="adm-list" style="margin-top:1rem;"></div>
      </div>
    </div>`;
  showScreen('admin');
  admRender();
}

function admF(key, val, btn) {
  ADM[key] = val;
  const groupId = { domain: 'adm-fd', subtype: 'adm-fs', diff: 'adm-ff' }[key];
  document.querySelectorAll('#' + groupId + ' .adm-f').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  admRender();
}

function admRender() {
  const { domain, diff, subtype } = ADM;

  const filtered = QUESTIONS.filter(q => {
    if (domain  !== 'all' && q.domain !== domain) return false;
    if (diff    !== 'all' && String(q.d || 3) !== diff) return false;
    if (subtype === 'regular'  && q.subtype) return false;
    if (subtype === 'diff'     && q.subtype !== 'diff') return false;
    if (subtype === 'test'     && q.subtype !== 'test') return false;
    return true;
  });

  // Stats strip
  const domCounts = {};
  const diffCounts = {};
  const subtypeCounts = { regular: 0, diff: 0, test: 0 };
  QUESTIONS.forEach(q => {
    domCounts[q.domain] = (domCounts[q.domain] || 0) + 1;
    diffCounts[q.d || 3] = (diffCounts[q.d || 3] || 0) + 1;
    subtypeCounts[q.subtype || 'regular']++;
  });

  document.getElementById('adm-stats').innerHTML = `
    <div class="adm-stats-card">
      <div class="adm-stat-hero">
        <span class="adm-stat-n">${QUESTIONS.length}</span>
        <span class="adm-stat-lbl">questions total</span>
      </div>
      <div class="adm-dom-grid">
        ${Object.entries(ADM_DOMAINS).map(([k, v]) => `
          <div class="adm-dom-tile">
            <span class="adm-dom-icon">${v.icon}</span>
            <span class="adm-dom-n">${domCounts[k] || 0}</span>
            <span class="adm-dom-lbl">${v.label}</span>
          </div>`).join('')}
      </div>
      <div class="adm-sub-row">
        <span class="adm-sub-chip">📋 ${subtypeCounts.regular} regular</span>
        <span class="adm-sub-chip diff">⚡ ${subtypeCounts.diff} differential</span>
        <span class="adm-sub-chip test">🔬 ${subtypeCounts.test} test choice</span>
      </div>
      <div class="adm-diff-bar">
        ${[1,2,3,4,5].map(n => {
          const cnt = diffCounts[n] || 0;
          const pct = cnt ? Math.round(cnt / QUESTIONS.length * 100) : 0;
          const cls = n <= 2 ? 'easy' : n === 3 ? 'mid' : n === 4 ? 'hard' : 'expert';
          return `<div class="adm-diff-seg d-${cls}" style="flex:${cnt || 0.1}" title="${'★'.repeat(n)}: ${cnt}"></div>`;
        }).join('')}
      </div>
      <div class="adm-diff-legend">
        ${[1,2,3,4,5].map(n => {
          const cnt = diffCounts[n] || 0;
          const cls = n <= 2 ? 'easy' : n === 3 ? 'mid' : n === 4 ? 'hard' : 'expert';
          return `<span class="adm-diff-lbl d-${cls}">${'★'.repeat(n)} ${cnt}</span>`;
        }).join('')}
      </div>
    </div>`;

  // Question list
  const listEl = document.getElementById('adm-list');
  if (filtered.length === 0) {
    listEl.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--ink-light);font-size:14px;">No questions found</div>';
    return;
  }

  const domOrder = ['cardio','neuro','pharma','infectio','lab'];
  let html = `<div style="font-size:12px;color:var(--ink-light);margin-bottom:0.75rem;">${filtered.length} questions${filtered.length < QUESTIONS.length ? ' (filtered)' : ''}</div>`;

  if (domain === 'all') {
    domOrder.forEach(dom => {
      const qs = filtered.filter(q => q.domain === dom);
      if (!qs.length) return;
      html += admGroup(dom, qs);
    });
  } else {
    html += admGroup(domain, filtered);
  }

  listEl.innerHTML = html;
}

function admGroup(dom, qs) {
  const { icon, label } = ADM_DOMAINS[dom];
  return `
    <div class="adm-group">
      <div class="adm-group-hdr">
        <span>${icon} ${label}</span>
        <span class="adm-group-cnt">${qs.length}</span>
      </div>
      ${qs.map(q => admRow(q, QUESTIONS.indexOf(q))).join('')}
    </div>`;
}

function admRow(q, idx) {
  const typeLabel = { diagnose: 'Dx', truefalse: 'T/F', pharma: 'Rx', lab: 'Lab' }[q.type] || 'Dx';
  const subtypeBadge = q.subtype === 'diff' ? '<span class="adm-badge diff">DIFF</span>'
                     : q.subtype === 'test' ? '<span class="adm-badge test">TEST</span>' : '';
  const n = q.d || 3;
  const cls = n <= 2 ? 'easy' : n === 3 ? 'mid' : n === 4 ? 'hard' : 'expert';
  const starsHtml = `<span class="adm-stars d-${cls}">${'★'.repeat(n)}<span style="opacity:.15">${'★'.repeat(5 - n)}</span></span>`;
  const preview = q.q.split('\n')[0].slice(0, 68) + (q.q.length > 68 ? '…' : '');

  return `
    <div class="adm-row" onclick="admToggle(${idx})" id="admr-${idx}">
      <div class="adm-row-top">
        ${starsHtml}
        <span class="adm-type">${typeLabel}</span>
        ${subtypeBadge}
        <span class="adm-preview">${escHtml(preview)}</span>
      </div>
      <div class="adm-detail" id="admrd-${idx}" style="display:none;"></div>
    </div>`;
}

function admToggle(idx) {
  const detail = document.getElementById('admrd-' + idx);
  const row    = document.getElementById('admr-'  + idx);
  if (!detail) return;

  if (detail.style.display !== 'none') {
    detail.style.display = 'none';
    row.classList.remove('open');
    return;
  }

  const q = QUESTIONS[idx];
  const letters = ['A', 'B', 'C', 'D'];
  let answersHtml = '';
  if (q.type === 'truefalse') {
    answersHtml = `
      <div class="adm-ans ${q.c ? 'correct' : ''}">A. ✓ True</div>
      <div class="adm-ans ${!q.c ? 'correct' : ''}">B. ✗ False</div>`;
  } else if (q.a) {
    answersHtml = q.a.map((a, i) =>
      `<div class="adm-ans ${i === q.c ? 'correct' : ''}">${letters[i]}. ${escHtml(a)}</div>`
    ).join('');
  }

  detail.innerHTML = `
    <div class="adm-q-full">${escHtml(q.q).replace(/\n/g, '<br>')}</div>
    <div class="adm-ans-list">${answersHtml}</div>
    <div class="adm-expl"><strong>Explanation:</strong> ${escHtml(q.ex)}</div>
    <div class="adm-meta">#${idx} · ${q.domain} · d:${q.d || 3}${q.subtype ? ' · ' + q.subtype : ''}</div>`;
  detail.style.display = 'block';
  row.classList.add('open');
}

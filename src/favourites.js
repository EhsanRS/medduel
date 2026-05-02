// MedDuel — Favourites screen

let favFilter = 'all';

const FAV_CATS = [
  { key: 'all',      label: 'All',            icon: '' },
  { key: 'cardio',   label: 'Cardiology',     icon: '🫀' },
  { key: 'neuro',    label: 'Neurology',      icon: '🧠' },
  { key: 'pharma',   label: 'Pharmacology',   icon: '💊' },
  { key: 'infectio', label: 'Infectiology',   icon: '🦠' },
  { key: 'lab',      label: 'Lab',            icon: '🧪' },
  { key: 'dossier',  label: 'Dossier',        icon: '🗂️' },
];

function startFavourites() {
  favFilter = 'all';
  renderFavouritesScreen();
  showScreen('favourites');
}

function renderFavouritesScreen() {
  const all = loadFavourites();
  const filtered = favFilter === 'all' ? all : all.filter(f => f.domain === favFilter);

  const counts = {};
  all.forEach(f => { if (f.domain) counts[f.domain] = (counts[f.domain] || 0) + 1; });

  const pillsHTML = FAV_CATS
    .filter(c => c.key === 'all' || counts[c.key])
    .map(c => {
      const n = c.key === 'all' ? all.length : (counts[c.key] || 0);
      return `<div class="cat-pill${favFilter === c.key ? ' active' : ''}"
                   onclick="setFavFilter('${c.key}')">
                ${c.icon ? c.icon + ' ' : ''}${c.label}
                <span class="fav-pill-count">${n}</span>
              </div>`;
    }).join('');

  const cardsHTML = filtered.length === 0
    ? `<div class="fav-empty fade-in">
         <div class="fav-empty-icon">☆</div>
         <div class="fav-empty-title">${favFilter === 'all' ? 'Nothing saved yet' : 'Nothing in this domain'}</div>
         <div class="fav-empty-sub">Tap ★ on the explanation card to save facts.</div>
       </div>`
    : filtered.map((f, i) => `
        <div class="fav-card fade-in" style="animation-delay:${Math.min(i * 0.06, 0.4)}s">
          <div class="fav-card-top">
            <span class="fav-domain-tag">${(f.dl || '').replace(' — True or False?', '')}</span>
            <button class="fav-unstar" onclick="removeFavourite(${f.saved})" title="Remove">★</button>
          </div>
          <div class="fav-question">${f.q}</div>
          <div class="fav-explanation">${f.ex}</div>
        </div>`).join('');

  document.getElementById('app').innerHTML = `
    <div id="favourites" class="screen active">
      <div class="fav-screen">
        <div class="fav-nav">
          <button class="quit-btn" onclick="showHome()">← Back</button>
          <span class="fav-title">Favourites</span>
          <span class="fav-badge">${all.length}</span>
        </div>
        <div class="cat-wrap fav-filter">${pillsHTML}</div>
        <div class="fav-list">${cardsHTML}</div>
      </div>
    </div>`;
}

function setFavFilter(cat) {
  favFilter = cat;
  renderFavouritesScreen();
}

function removeFavourite(savedTs) {
  const favs = loadFavourites();
  const idx = favs.findIndex(f => f.saved === savedTs);
  if (idx >= 0) favs.splice(idx, 1);
  saveFavourites(favs);
  if (currentFact && currentFact.saved === savedTs) updateStarBtn();
  renderFavouritesScreen();
}

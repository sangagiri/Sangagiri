// ============================================================
//  js/modules/temples.js
// ============================================================
import { db }                          from './firebase.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { loadingHTML, emptyHTML }      from './ui.js';

const FALLBACK = [
  { name: 'Sankareeswarar Temple',  deity: 'Lord Shiva',      type: 'Shiva Temple',  description: 'The ancient temple from which Sanagiri derives its very name — Sankara + Giri (hill of Shankara). A deeply revered shrine visited by thousands of devotees each year.', location: 'Town Centre', timing: '6AM–12PM · 4PM–9PM', emoji: '🛕' },
  { name: 'Mariamman Temple',       deity: 'Goddess Mariamman', type: 'Amman Temple', description: 'A beloved local temple known for grand Aadi festival celebrations with colourful processions and cultural programs drawing the entire community together.', location: 'East Sanagiri', timing: '6AM–12PM · 5PM–8PM', emoji: '🪔' },
  { name: 'Murugan Temple',         deity: 'Lord Murugan',    type: 'Murugan Temple', description: 'A hilltop Murugan shrine offering a scenic view of the town below. Kavadi festivals during Thaipusam are a spectacle drawing pilgrims from across Salem district.', location: 'Hill Road',    timing: '6AM–12PM · 4PM–8PM', emoji: '🌄' },
];

function buildCard(item) {
  return `
    <div class="card">
      <div class="card-thumb" style="background: linear-gradient(135deg,#2E2B26,#1C1A17);">
        <span style="font-size:52px;">${item.emoji || '🛕'}</span>
      </div>
      <div class="card-body">
        <span class="card-tag">${item.type || 'Temple'}</span>
        <div class="card-title">${item.name}</div>
        <div class="card-desc">${item.description || ''}</div>
        <div class="card-meta">
          ${item.location ? `<span class="card-meta-item">📍 ${item.location}</span>` : ''}
          ${item.deity    ? `<span class="card-meta-item">🙏 ${item.deity}</span>`    : ''}
          ${item.timing   ? `<span class="card-meta-item">🕐 ${item.timing}</span>`   : ''}
        </div>
      </div>
      ${item.mapUrl ? `<div class="card-foot"><a href="${item.mapUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">🗺️ Directions</a></div>` : ''}
    </div>`;
}

export async function initTemples() {
  const grid   = document.getElementById('temples-grid');
  const search = document.getElementById('temple-search');
  if (!grid) return;

  grid.innerHTML = loadingHTML('Loading temples…');

  let items = [];
  try {
    const snap = await getDocs(query(collection(db, 'temples'), orderBy('name')));
    items = snap.docs.length ? snap.docs.map(d => ({ id: d.id, ...d.data() })) : FALLBACK;
  } catch { items = FALLBACK; }

  function render(filter = '') {
    const filtered = filter
      ? items.filter(i => (i.name + i.description + i.type + i.deity).toLowerCase().includes(filter.toLowerCase()))
      : items;
    grid.innerHTML = filtered.length ? filtered.map(buildCard).join('') : emptyHTML('No temples found', 'Try a different search term', '🛕');
  }

  render();
  search?.addEventListener('input', e => render(e.target.value));
}

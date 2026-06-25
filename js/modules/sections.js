// ============================================================
//  js/modules/sections.js
//  Textiles · Tourism · News · Govt · Emergency
// ============================================================
import { db } from './firebase.js';
import { collection, getDocs, query, orderBy, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { loadingHTML, emptyHTML } from './ui.js';

// ── TEXTILES ──────────────────────────────────────────────
const TEXTILE_FALLBACK = [
  { name: 'Sankari Silk House',        type: 'Silk Sarees',   description: 'Premium quality Sankari silk sarees direct from loom to you. Wholesale and retail available. Known for vibrant temple border designs.',   address: 'Main Bazaar, Sanagiri',   phone: '', specialty: 'Pure Silk', emoji: '🥻' },
  { name: 'Handloom Weavers Co-op',    type: 'Handloom',      description: 'Traditional handloom cotton and silk sarees by the local weavers cooperative. Authentic Sankari weaves at fair trade prices.',             address: 'Weaver Colony, Sanagiri', phone: '', specialty: 'Handloom Cotton', emoji: '🧵' },
  { name: 'Sri Murugan Silk Emporium', type: 'Silk & Cotton', description: 'One of Sanagiri\'s oldest saree shops. Carries a wide variety of Sankari, Kanchipuram and cotton blends for all occasions and budgets.', address: 'Bus Stand Road',           phone: '', specialty: 'Silk & Cotton Mix', emoji: '🎀' },
];

function textileCard(item) {
  return `
    <div class="card">
      <div class="card-thumb" style="background: linear-gradient(135deg,#4A2F6B,#2D1B45);">
        <span style="font-size:52px;">${item.emoji || '🥻'}</span>
      </div>
      <div class="card-body">
        <span class="card-tag">${item.type || 'Textiles'}</span>
        <div class="card-title">${item.name}</div>
        <div class="card-desc">${item.description || ''}</div>
        <div class="card-meta">
          ${item.address   ? `<span class="card-meta-item">📍 ${item.address}</span>`   : ''}
          ${item.phone     ? `<span class="card-meta-item">📞 <a href="tel:${item.phone}" style="color:var(--saffron)">${item.phone}</a></span>` : ''}
          ${item.specialty ? `<span class="card-meta-item">✨ ${item.specialty}</span>` : ''}
        </div>
      </div>
      ${item.mapUrl ? `<div class="card-foot"><a href="${item.mapUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">🗺️ Map</a></div>` : ''}
    </div>`;
}

export async function initTextiles() {
  const grid   = document.getElementById('textiles-grid');
  const search = document.getElementById('textile-search');
  if (!grid) return;
  grid.innerHTML = loadingHTML('Loading textile shops…');
  let items = [];
  try {
    const snap = await getDocs(query(collection(db, 'textiles'), orderBy('name')));
    items = snap.docs.length ? snap.docs.map(d => ({ id: d.id, ...d.data() })) : TEXTILE_FALLBACK;
  } catch { items = TEXTILE_FALLBACK; }
  function render(f = '') {
    const filtered = f ? items.filter(i => (i.name + i.type + i.specialty).toLowerCase().includes(f.toLowerCase())) : items;
    grid.innerHTML = filtered.length ? filtered.map(textileCard).join('') : emptyHTML('No shops found', '', '🥻');
  }
  render();
  search?.addEventListener('input', e => render(e.target.value));
}

// ── TOURISM ───────────────────────────────────────────────
const TOURISM_FALLBACK = [
  { name: 'Sankareeswarar Temple',  type: 'Temple',   description: 'The iconic ancient Shiva temple, heart of Sanagiri — must visit for its centuries-old architecture and deeply spiritual atmosphere.', distance: 'Town Centre',     timing: '6AM–12PM · 4–9PM', emoji: '🛕' },
  { name: 'Sankari Lake',           type: 'Nature',   description: 'A serene lake on the outskirts of town. Popular for early morning walks, birdwatching, and peaceful family evenings by the water.', distance: '2 km from centre', timing: 'Open all day',     emoji: '🌅' },
  { name: 'Silk Weaving Clusters',  type: 'Heritage', description: 'Witness skilled artisans hand-weaving the famous Sankari sarees on traditional pit looms. A living heritage you can walk through.', distance: 'Weaver Colony',    timing: 'Weekdays 9AM–5PM', emoji: '🧵' },
  { name: 'Sanagiri Hill Viewpoint',type: 'Scenic',   description: 'A short trail leading to a hilltop viewpoint offering a stunning panoramic view of Sanagiri town and the surrounding Salem plains.', distance: '3 km from centre', timing: 'Sunrise–Sunset',   emoji: '🌄' },
];

function tourismCard(item) {
  return `
    <div class="card">
      <div class="card-thumb" style="background: linear-gradient(135deg,#1B3A2E,#0D2018);">
        <span style="font-size:52px;">${item.emoji || '📍'}</span>
      </div>
      <div class="card-body">
        <span class="card-tag">${item.type || 'Place'}</span>
        <div class="card-title">${item.name}</div>
        <div class="card-desc">${item.description || ''}</div>
        <div class="card-meta">
          ${item.distance ? `<span class="card-meta-item">📍 ${item.distance}</span>` : ''}
          ${item.timing   ? `<span class="card-meta-item">🕐 ${item.timing}</span>`   : ''}
        </div>
      </div>
      ${item.mapUrl ? `<div class="card-foot"><a href="${item.mapUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">🗺️ Directions</a></div>` : ''}
    </div>`;
}

export async function initTourism() {
  const grid = document.getElementById('tourism-grid');
  if (!grid) return;
  grid.innerHTML = loadingHTML('Loading places…');
  let items = [];
  try {
    const snap = await getDocs(query(collection(db, 'tourism'), orderBy('name')));
    items = snap.docs.length ? snap.docs.map(d => ({ id: d.id, ...d.data() })) : TOURISM_FALLBACK;
  } catch { items = TOURISM_FALLBACK; }
  grid.innerHTML = items.length ? items.map(tourismCard).join('') : emptyHTML('No places listed yet', 'Admin can add from dashboard', '📍');
}

// ── NEWS ──────────────────────────────────────────────────
const NEWS_FALLBACK = [
  { title: 'Sanagiri Town Portal Now Live!', tag: 'Announcement', createdAt: null, content: 'The official digital portal for சங்ககிரி (Sanagiri) is now live at sangagiri.com. Find all local info — businesses, temples, tourism, government offices and emergency contacts in one place.', featured: true },
  { title: 'Aadi Mariamman Festival This Month', tag: 'Festival', createdAt: null, content: 'The annual Aadi festival at the Mariamman Temple will be held with grand processions and cultural programs. All residents and visitors are warmly welcome.' },
  { title: 'New Bus Route to Sanagiri via Salem', tag: 'Transport', createdAt: null, content: 'TNSTC has announced an additional bus service connecting Sanagiri to Salem city centre, reducing travel time for daily commuters.' },
];

function formatDate(ts) {
  if (!ts) return new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  if (ts?.toDate) return ts.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  return String(ts);
}

export async function initNews() {
  const container = document.getElementById('news-container');
  if (!container) return;
  container.innerHTML = loadingHTML('Loading news…');
  let items = [];
  try {
    const snap = await getDocs(query(collection(db, 'news'), orderBy('createdAt', 'desc')));
    items = snap.docs.length ? snap.docs.map(d => ({ id: d.id, ...d.data() })) : NEWS_FALLBACK;
  } catch { items = NEWS_FALLBACK; }

  if (!items.length) { container.innerHTML = emptyHTML('No news yet', 'Admin can add from dashboard', '📰'); return; }

  const [first, ...rest] = items;
  container.innerHTML = `
    <div class="news-featured">
      <div class="news-card large">
        <span class="news-date">${formatDate(first.createdAt)}</span>
        ${first.tag ? `<span class="news-tag">${first.tag}</span>` : ''}
        <div class="news-title">${first.title}</div>
        <div class="news-excerpt">${first.content?.substring(0, 240)}${first.content?.length > 240 ? '…' : ''}</div>
      </div>
      <div class="news-secondary">
        ${rest.slice(0, 2).map(i => `
          <div class="news-card">
            <span class="news-date">${formatDate(i.createdAt)}</span>
            ${i.tag ? `<span class="news-tag">${i.tag}</span>` : ''}
            <div class="news-title">${i.title}</div>
            <div class="news-excerpt">${i.content?.substring(0, 120)}${i.content?.length > 120 ? '…' : ''}</div>
          </div>`).join('')}
      </div>
    </div>
    ${rest.length > 2 ? `<div class="cards-grid">
      ${rest.slice(2).map(i => `
        <div class="news-card">
          <span class="news-date">${formatDate(i.createdAt)}</span>
          ${i.tag ? `<span class="news-tag">${i.tag}</span>` : ''}
          <div class="news-title">${i.title}</div>
          <div class="news-excerpt">${i.content?.substring(0, 140)}${i.content?.length > 140 ? '…' : ''}</div>
        </div>`).join('')}
    </div>` : ''}`;
}

// ── GOVT OFFICES ──────────────────────────────────────────
const GOVT_FALLBACK = [
  { name: 'Sankari Town Panchayat',         address: 'Town Panchayat Office, Sankari',              phone: '',    hours: 'Mon–Sat · 10AM–5PM' },
  { name: 'Sankari Police Station',          address: 'Police Station Road, Sankari',                phone: '100', hours: '24 Hours' },
  { name: 'Govt. Primary Health Centre',     address: 'PHC Road, Sankari',                           phone: '104', hours: '8AM–8PM' },
  { name: 'Post Office — Sankari 637301',    address: 'Main Road, Sankari',                          phone: '',    hours: 'Mon–Sat · 9AM–5PM' },
  { name: 'LIC of India — Sankari Branch',   address: 'LIC Building, Sankari Main Road',             phone: '',    hours: 'Mon–Fri · 10AM–5PM' },
  { name: 'Taluk Office',                    address: 'Salem–Coimbatore Highway, Sankari',           phone: '',    hours: 'Mon–Fri · 10AM–5PM' },
  { name: 'Tamil Nadu Electricity Board',    address: 'TNEB Sub Station, Sankari',                   phone: '1912',hours: 'Mon–Sat · 9AM–5PM' },
  { name: 'Ration Shop (PDS)',               address: 'Various locations — check ward notice board', phone: '',    hours: 'As per schedule' },
];

export async function initGovt() {
  const tbody = document.getElementById('govt-tbody');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:32px;"><div class="spinner" style="margin:0 auto;width:20px;height:20px;border:2px solid var(--cream-border);border-top-color:var(--saffron);border-radius:50%;animation:spin .7s linear infinite;"></div></td></tr>`;
  let items = [];
  try {
    const snap = await getDocs(query(collection(db, 'govt_offices'), orderBy('name')));
    items = snap.docs.length ? snap.docs.map(d => ({ id: d.id, ...d.data() })) : GOVT_FALLBACK;
  } catch { items = GOVT_FALLBACK; }
  tbody.innerHTML = items.map(i => `
    <tr>
      <td><strong>${i.name}</strong></td>
      <td style="color:var(--text-mid)">${i.address || '—'}</td>
      <td>${i.phone ? `<a href="tel:${i.phone}" style="color:var(--saffron);font-weight:700;font-size:15px;">${i.phone}</a>` : '—'}</td>
      <td style="color:var(--text-mid);font-size:13px;">${i.hours || '—'}</td>
    </tr>`).join('');
}

// ── EMERGENCY ─────────────────────────────────────────────
const EMERGENCY_FALLBACK = [
  { name: 'Police',         number: '100',  emoji: '👮' },
  { name: 'Fire',           number: '101',  emoji: '🚒' },
  { name: 'Ambulance',      number: '108',  emoji: '🚑' },
  { name: 'Women Helpline', number: '1091', emoji: '👩' },
  { name: 'Child Helpline', number: '1098', emoji: '👶' },
  { name: 'Disaster Mgmt',  number: '1077', emoji: '⚠️' },
  { name: 'Road Accident',  number: '1073', emoji: '🚗' },
  { name: 'Health Line',    number: '104',  emoji: '🏥' },
];

export async function initEmergency() {
  const grid = document.getElementById('emergency-grid');
  if (!grid) return;
  let items = [];
  try {
    const snap = await getDocs(collection(db, 'emergency_contacts'));
    items = snap.docs.length ? snap.docs.map(d => ({ id: d.id, ...d.data() })) : EMERGENCY_FALLBACK;
  } catch { items = EMERGENCY_FALLBACK; }
  grid.innerHTML = items.map(i => `
    <div class="emergency-card">
      <div class="emergency-icon">${i.emoji || '📞'}</div>
      <div class="emergency-name">${i.name}</div>
      <span class="emergency-num"><a href="tel:${i.number}">${i.number}</a></span>
      <a href="tel:${i.number}" class="btn btn-lotus btn-sm" style="width:100%;justify-content:center;margin-top:4px;">📞 Call Now</a>
    </div>`).join('');
}

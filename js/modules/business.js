// ============================================================
//  js/modules/business.js
// ============================================================
import { db }                          from './firebase.js';
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { loadingHTML, emptyHTML, toast, openModal, closeModal } from './ui.js';

const CAT_EMOJI = { grocery:'🛒', medical:'💊', petrol:'⛽', bank:'🏦', hotel:'🍽️', education:'🎓', textile:'🥻', other:'🏪' };

function buildCard(item) {
  const emoji = CAT_EMOJI[item.category] || '🏪';
  return `
    <div class="card">
      <div class="card-thumb" style="background:var(--cream-deep);">
        <span style="font-size:48px;">${emoji}</span>
      </div>
      <div class="card-body">
        <span class="card-tag">${item.category || 'Business'}</span>
        <div class="card-title">${item.name}</div>
        <div class="card-desc">${item.description || ''}</div>
        <div class="card-meta">
          ${item.address ? `<span class="card-meta-item">📍 ${item.address}</span>` : ''}
          ${item.phone   ? `<span class="card-meta-item">📞 <a href="tel:${item.phone}" style="color:var(--saffron)">${item.phone}</a></span>` : ''}
        </div>
      </div>
      ${item.mapUrl ? `<div class="card-foot"><a href="${item.mapUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">🗺️ Map</a></div>` : ''}
    </div>`;
}

export async function initBusiness() {
  const grid   = document.getElementById('business-grid');
  const search = document.getElementById('business-search');
  const tabs   = document.getElementById('business-cats');
  if (!grid) return;

  grid.innerHTML = loadingHTML('Loading businesses…');

  let items = [], activeCat = 'all';

  try {
    const snap = await getDocs(query(collection(db, 'businesses'), orderBy('name')));
    items = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(i => i.approved !== false);
  } catch { items = []; }

  function render() {
    const q = search?.value.toLowerCase() || '';
    let filtered = activeCat === 'all' ? items : items.filter(i => i.category === activeCat);
    if (q) filtered = filtered.filter(i => (i.name + i.description + i.address).toLowerCase().includes(q));
    grid.innerHTML = filtered.length ? filtered.map(buildCard).join('') : emptyHTML('No businesses found', 'Try a different category or add yours!', '🏪');
  }

  render();
  search?.addEventListener('input', render);
  tabs?.addEventListener('click', e => {
    const btn = e.target.closest('.cat-tab');
    if (!btn) return;
    tabs.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    render();
  });

  // ── ADD BUSINESS MODAL ──
  document.getElementById('add-biz-btn')?.addEventListener('click', () => openModal('biz-modal'));
  document.getElementById('biz-modal-close')?.addEventListener('click', () => closeModal('biz-modal'));

  document.getElementById('biz-submit')?.addEventListener('click', async () => {
    const name    = document.getElementById('biz-name')?.value.trim();
    const cat     = document.getElementById('biz-cat')?.value;
    const address = document.getElementById('biz-address')?.value.trim();
    const phone   = document.getElementById('biz-phone')?.value.trim();
    const desc    = document.getElementById('biz-desc')?.value.trim();
    const contact = document.getElementById('biz-contact')?.value.trim();

    if (!name || !cat || !address) { toast('Please fill all required fields', 'error'); return; }

    const btn = document.getElementById('biz-submit');
    btn.textContent = 'Submitting…'; btn.disabled = true;
    try {
      await addDoc(collection(db, 'business_requests'), { name, category: cat, address, phone, description: desc, contact, approved: false, createdAt: serverTimestamp() });
      toast('Submitted! Admin will review and add it shortly.', 'success');
      closeModal('biz-modal');
      ['biz-name','biz-address','biz-phone','biz-desc','biz-contact'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
      const sel = document.getElementById('biz-cat'); if(sel) sel.value = '';
    } catch(e) { toast('Submission failed. Please try again.', 'error'); }
    btn.textContent = 'Submit for Review'; btn.disabled = false;
  });
}

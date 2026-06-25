// ============================================================
//  js/modules/ui.js
//  Shared UI utilities: toast, spinner, empty state, modal
// ============================================================

export function toast(msg, type = 'info', duration = 3200) {
  const wrap = document.getElementById('toast-wrap');
  if (!wrap) return;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateX(100%)'; el.style.transition = '.3s ease'; setTimeout(() => el.remove(), 300); }, duration);
}

export function loadingHTML(msg = 'Loading...') {
  return `<div class="loading-state" style="grid-column:1/-1"><div class="spinner"></div>${msg}</div>`;
}

export function emptyHTML(title = 'Nothing here yet', sub = '', icon = '📭') {
  return `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">${icon}</div><div class="empty-title">${title}</div><div class="empty-sub">${sub}</div></div>`;
}

export function openModal(id)  { document.getElementById(id)?.classList.add('open');    }
export function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
});

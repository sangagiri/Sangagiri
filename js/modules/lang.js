// ============================================================
//  js/modules/lang.js
//  Tamil / English toggle
//  Usage: add data-en="..." data-ta="..." to any element
// ============================================================

let current = localStorage.getItem('sg_lang') || 'en';

export function getLang() { return current; }

export function applyLang(lang) {
  current = lang;
  localStorage.setItem('sg_lang', lang);

  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = lang === 'ta' ? (el.dataset.ta || el.dataset.en) : el.dataset.en;
  });

  // Placeholders
  document.querySelectorAll('[data-ph-en]').forEach(el => {
    el.placeholder = lang === 'ta' ? (el.dataset.phTa || el.dataset.phEn) : el.dataset.phEn;
  });

  // html lang attr
  document.documentElement.lang = lang === 'ta' ? 'ta' : 'en';

  // Update toggle button
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang === 'en' ? 'தமிழ்' : 'English';
}

export function initLang() {
  applyLang(current);
  document.getElementById('lang-btn')?.addEventListener('click', () => {
    applyLang(current === 'en' ? 'ta' : 'en');
  });
}

// ============================================================
//  js/modules/nav.js
//  Mobile drawer, active nav on scroll
// ============================================================

export function initNav() {
  const menuBtn    = document.getElementById('menu-btn');
  const drawer     = document.getElementById('mobile-drawer');
  const overlay    = document.getElementById('drawer-overlay');

  const openDrawer  = () => { drawer?.classList.add('open');    overlay?.classList.add('open');    document.body.style.overflow = 'hidden'; };
  const closeDrawer = () => { drawer?.classList.remove('open'); overlay?.classList.remove('open'); document.body.style.overflow = ''; };

  menuBtn?.addEventListener('click', openDrawer);
  overlay?.addEventListener('click', closeDrawer);
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  // Active nav on scroll
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link[href^="#"], .drawer-nav a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`[href="#${entry.target.id}"]`).forEach(l => l.classList.add('active'));
      }
    });
  }, { threshold: 0.25, rootMargin: '-60px 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
}

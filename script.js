// ── DARK / LIGHT TOGGLE ──────────────────────────────
const html   = document.documentElement;
const toggle = document.getElementById('theme-toggle');

toggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  toggle.classList.add('spinning');
  toggle.addEventListener('transitionend', () => toggle.classList.remove('spinning'), { once: true });
});

// ── NAVBAR SCROLL DEPTH ───────────────────────────────
const navbar = document.getElementById('titlebar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── SCROLL REVEAL ─────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── SMOOTH SCROLL FOR NAV LINKS ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

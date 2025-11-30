// script.js — full, upgraded, self-contained

// --------------------
// Helper selectors
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// --------------------
// GSAP Scroll Reveal
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.reveal').forEach((elem) => {
    gsap.fromTo(
      elem,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
} else {
  // fallback: immediately show elements
  $$('.reveal').forEach(el => {
    el.style.opacity = 1;
    el.style.transform = 'none';
  });
}

// --------------------
// Vanilla Tilt for card hover effect
if (window.VanillaTilt) {
  try {
    VanillaTilt.init(document.querySelectorAll(".card-inner"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      scale: 1.05
    });
  } catch (err) {
    console.warn('VanillaTilt init error', err);
  }
}

// --------------------
// HERO: Wrap letters in span for animation
document.addEventListener('DOMContentLoaded', () => {
  const heroName = document.querySelector('.hero-name');
  if (heroName && !heroName.querySelector('span')) {
    heroName.innerHTML = heroName.textContent
      .split('')
      .map(ch => ch === ' ' ? '<span class="ch space"> </span>' : `<span class="ch">${ch}</span>`)
      .join('');
  }
});

// --------------------
// Theme toggle fallback
(function(){
  const btn = document.querySelector('.theme-toggle');
  const body = document.body;
  if (!btn) return;

  // Only if theme.js is NOT loaded
  if (!window.__theme_module_present) {
    // Load saved theme
    if (localStorage.getItem('theme') === 'light') {
      body.classList.add('light-theme');
      btn.textContent = '☀️';
      btn.setAttribute('aria-pressed','true');
    } else {
      btn.textContent = '🌙';
      btn.setAttribute('aria-pressed','false');
    }

    btn.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
        btn.textContent = '☀️';
        btn.setAttribute('aria-pressed','true');
      } else {
        localStorage.setItem('theme', 'dark');
        btn.textContent = '🌙';
        btn.setAttribute('aria-pressed','false');
      }
    });
  }
})();

// --------------------
// Smooth anchor scrolling
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  if (!id || id === '#') return;
  const target = document.querySelector(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// script.js — upgraded (preserves original behaviors, uses modules for extras)

// --------------------
// Helper selectors
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// --------------------
// GSAP Scroll Reveal (original logic preserved)
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.reveal').forEach((elem) => {
    gsap.fromTo(elem,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: elem, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
  });
} else {
  // fallback: immediately show
  $$('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
}

// --------------------
// Vanilla Tilt (preserve original settings)
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
// HERO: ensure letters wrapped if hero.js hasn't run yet
document.addEventListener('DOMContentLoaded', ()=>{
  const heroName = document.querySelector('.hero-name');
  if (heroName && !heroName.querySelector('span')) {
    heroName.innerHTML = heroName.textContent.split('').map(ch => ch === ' ' ? '<span class="ch space"> </span>' : `<span class="ch">${ch}</span>`).join('');
  }
});

// --------------------
// Theme toggle fallback (if theme.js not present)
(function(){
  const btn = document.querySelector('.theme-toggle');
  const body = document.body;
  if (!btn) return;

  // If theme.js active, it sets window.__theme_module_present = true
  if (!window.__theme_module_present) {
    // load saved theme
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
// Smooth anchor scrolling (keeps your original behavior)
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href');
  if (!id || id === '#') return;
  const target = document.querySelector(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
/* ==========================
   LIGHT MODE FIX - HERO & TEXT
   ========================== */

/* Body & general text */
body {
  background-color: #ffffff; /* light background */
  color: #111111;            /* dark, readable text */
}

/* Navbar links */
#navbar {
  background-color: #ffffff; /* light navbar */
}
.nav-links a {
  color: #111111; /* dark text for readability */
}
.nav-links a.btn {
  color: #ffffff;  /* buttons text if bg is colored */
  background-color: #1db954; /* accent button color */
}

/* Theme toggle */
.theme-toggle {
  color: #111111; /* ensure toggle icon is visible */
}

/* Hero Section */
.hero-container {
  color: #111111; /* all hero text dark */
}
.hero-name {
  color: #111111;
}
.hero-subtitle {
  color: #111111;
}
.hero-intro {
  color: #111111;
}

/* Hero buttons */
.hero-buttons a.btn {
  background-color: #1db954; /* green button bg */
  color: #ffffff;             /* readable text */
  border: none;
}
.hero-buttons a.btn:hover {
  background-color: #14833b; /* darker hover effect */
}

/* Hero right overlay / GIF */
.gradient-overlay {
  background: rgba(255,255,255,0.1); /* subtle overlay for light theme */
}

/* Card elements (technologies, hire, projects, research) */
.tech-card,
.hire-card,
.project-card,
.research-card,
.client-card {
  background-color: #fafafa;
  color: #111111;
  border: 1px solid #e0e0e0;
}

/* Footer */
footer {
  background-color: #f8f8f8;
  color: #111111;
}
footer a {
  color: #111111;
}

/* Links hover effect */
a:hover {
  color: #1db954;
}

/* Optional: canvas / particle visibility for light mode */
#particle-canvas {
  mix-blend-mode: multiply; /* ensures particles are visible on light background */
}



// Small runtime guards added by assistant
try{
  if(typeof document !== 'undefined'){
    // noop
  }
}catch(e){console.warn('js guard',e)}

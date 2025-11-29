// script.js — theme toggle, cursor, smooth reveals, small micro interactions

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const body = document.body;

// read saved theme
const saved = localStorage.getItem('site-theme');
if (saved) {
  body.classList.toggle('theme-dark', saved === 'dark');
  body.classList.toggle('theme-light', saved === 'light');
} else {
  // default to system preference
  body.classList.toggle('theme-dark', prefersDark);
  body.classList.toggle('theme-light', !prefersDark);
}

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('theme-dark');
  if (isDark) {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
    localStorage.setItem('site-theme', 'light');
  } else {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    localStorage.setItem('site-theme', 'dark');
  }
});

// set year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Cursor follow
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// animate outline with slight lag
function rafLoop() {
  outlineX += (mouseX - outlineX) * 0.12;
  outlineY += (mouseY - outlineY) * 0.12;
  cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
  requestAnimationFrame(rafLoop);
}
requestAnimationFrame(rafLoop);

// hover interactions to enlarge cursor
const hoverTargets = document.querySelectorAll('a, .btn-primary, .card, .icon-btn');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.transform += ' scale(1.2)';
    cursorOutline.style.transform += ' scale(1.1)';
    cursorDot.style.background = getComputedStyle(document.documentElement).getPropertyValue('--accent');
  });
  el.addEventListener('mouseleave', () => {
    // reset by reassigning base position (mouse move will update)
  });
});

// small entrance animations (on-load)
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-title, .hero-lead, .kicker').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(8px)';
    setTimeout(()=> {
      el.style.transition = 'all 420ms cubic-bezier(.2,.9,.3,1)';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 120 * i);
  });

  document.querySelectorAll('.card').forEach((c, i) => {
    c.style.opacity = 0;
    c.style.transform = 'translateY(10px)';
    setTimeout(()=> {
      c.style.transition = 'all 420ms cubic-bezier(.2,.9,.3,1)';
      c.style.opacity = 1;
      c.style.transform = 'translateY(0)';
    }, 160 * i + 300);
  });
});

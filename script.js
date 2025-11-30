// Unified script.js
// Handles: mobile menu, theme (persisted), particle background, GSAP hero reveal, scroll reveal, vanilla-tilt init

// ---------- Utils ----------
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// ---------- Menu toggle ----------
const menuToggle = $('#menu-toggle');
const navLinks = $('#nav-links');
function ensureMenuToggleVisible(){
  if (!menuToggle) return;
  if (window.matchMedia('(max-width:768px)').matches) menuToggle.style.display = 'block';
  else menuToggle.style.display = 'none';
}
ensureMenuToggleVisible();
window.addEventListener('resize', ensureMenuToggleVisible);

if (menuToggle && navLinks){
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
  menuToggle.addEventListener('keydown', (e) => { if (e.key==='Enter' || e.key===' ') { e.preventDefault(); navLinks.classList.toggle('active'); }});
  // close on link click
  $$('#nav-links a').forEach(a => a.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
  }));
  // close on outside click when mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth > 768) return;
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) navLinks.classList.remove('active');
  });
}

// ---------- Theme toggle (persisted across pages) ----------
const themeToggle = $('#theme-toggle');
const THEME_KEY = 'site-theme';
function applySavedTheme(){
  const t = localStorage.getItem(THEME_KEY);
  if (t === 'light') {
    document.documentElement.classList.add('light-theme');
    document.body.classList.add('light-theme');
    if (themeToggle) { themeToggle.textContent = '☀️'; themeToggle.setAttribute('aria-pressed','true'); }
  } else {
    document.documentElement.classList.remove('light-theme');
    document.body.classList.remove('light-theme');
    if (themeToggle) { themeToggle.textContent = '🌙'; themeToggle.setAttribute('aria-pressed','false'); }
  }
}
applySavedTheme();

if (themeToggle){
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    if (isLight){
      document.documentElement.classList.add('light-theme');
      localStorage.setItem(THEME_KEY, 'light');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed','true');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem(THEME_KEY, 'dark');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed','false');
    }
  });
}

// ---------- Particle canvas ----------
(function particleCanvas(){
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  window.addEventListener('resize', () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight; initParticles(); });

  let particles = [];
  function rand(min,max){ return Math.random()*(max-min)+min; }
  function initParticles(){
    particles = [];
    const area = w*h;
    const count = Math.max(20, Math.floor(area / 120000)); // adjust density
    for (let i=0;i<count;i++){
      particles.push({
        x: rand(0,w),
        y: rand(0,h),
        r: rand(0.6, 2.2),
        vx: rand(-0.25,0.25),
        vy: rand(-0.15,0.15),
        a: rand(0.05,0.22)
      });
    }
  }
  initParticles();

  function frame(){
    ctx.clearRect(0,0,w,h);
    for (const p of particles){
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = w+10;
      if (p.x > w+10) p.x = -10;
      if (p.y < -10) p.y = h+10;
      if (p.y > h+10) p.y = -10;
      ctx.beginPath();
      ctx.fillStyle = '#9be6bc';
      ctx.globalAlpha = p.a;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  frame();
})();

// ---------- GSAP hero animation + scroll reveals ----------
(function gsapInit(){
  if (typeof gsap === 'undefined') return;
  // hero name letter animation
  const heroEl = document.getElementById('heroName');
  if (heroEl){
    const txt = heroEl.textContent.trim();
    heroEl.textContent = '';
    for (const ch of txt){
      const s = document.createElement('span');
      s.className = 'char';
      s.textContent = ch;
      heroEl.appendChild(s);
    }
    const chars = heroEl.querySelectorAll('.char');
    gsap.to(chars, {opacity:1, y:0, stagger:0.03, duration:0.6, ease:'power3.out', delay:0.2, onStart(){ chars.forEach(sp=> { if (sp.textContent === ' ') sp.style.opacity = '1'; }); }});
  }

  // idle floating for hero-right images
  const heroImg = document.querySelector('.hero-right img');
  if (heroImg){
    gsap.to(heroImg, {y:-6, repeat:-1, yoyo:true, duration:3, ease:'sine.inOut', delay:0.6});
  }

  // scroll reveal
  try {
    gsap.utils.toArray('.reveal').forEach(el=>{
      gsap.from(el, {y:24, opacity:0, duration:0.7, ease:'power2.out', scrollTrigger:{trigger:el, start:'top 85%'}});
    });
  } catch(e){}
})();

// ---------- Vanilla-tilt init for cards ----------
(function tiltInit(){
  try {
    if (typeof VanillaTilt !== 'undefined') {
      const cards = document.querySelectorAll('.project-card, .experience-card, .card-inner');
      VanillaTilt.init(cards, { max: 8, speed: 300, scale: 1.02, glare: false });
    }
  } catch(e){}
})();

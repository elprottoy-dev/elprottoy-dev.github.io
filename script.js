// Core JS: particles, theme/menu toggles, GSAP reveals, accessible interactions
(function () {
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));

  // ---------- Theme toggle (persist) ----------
  const themeToggle = qs('#theme-toggle');
  const body = document.body;
  function applySavedTheme() {
    const saved = localStorage.getItem('theme_pref_v1');
    if (!saved) return;
    try {
      const prefs = JSON.parse(saved);
      if (prefs.theme === 'light') body.classList.add('light-theme'); else body.classList.remove('light-theme');
      if (prefs.accent) document.documentElement.style.setProperty('--accent', prefs.accent);
      if (prefs.animations === false) body.classList.add('reduce-motion'); else body.classList.remove('reduce-motion');
    } catch(e){}
  }
  applySavedTheme();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-theme');
      themeToggle.textContent = isLight ? '☀️' : '🌙';
      // persist
      const raw = localStorage.getItem('theme_pref_v1');
      const prefs = raw ? JSON.parse(raw) : {};
      prefs.theme = isLight ? 'light' : 'dark';
      localStorage.setItem('theme_pref_v1', JSON.stringify(prefs));
    });
  }

  // ---------- Mobile menu ----------
  const menuToggle = qs('#menu-toggle');
  const navLinks = qs('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('active');
    });
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); menuToggle.click(); }
    });
  }

  // ---------- Particle engine (global overlay canvas) ----------
  // Lightweight multi-layer particle engine (global overlay)
  class Particle {
    constructor(w,h){
      this.x = Math.random()*w;
      this.y = Math.random()*h;
      this.r = Math.random()*2 + 0.4;
      this.vx = (Math.random()*1 - 0.5) * 0.6;
      this.vy = (Math.random()*1 - 0.5) * 0.6;
      this.alpha = Math.random()*0.6 + 0.2;
    }
    update(w,h){
      this.x += this.vx; this.y += this.vy;
      if (this.x < -10) this.x = w + 10;
      if (this.x > w + 10) this.x = -10;
      if (this.y < -10) this.y = h + 10;
      if (this.y > h + 10) this.y = -10;
    }
  }

  const globalCanvas = qs('#particle-canvas');
  let ctx=null, particles=[], maxParticles=120, animId=null;
  let mouse = {x:-9999,y:-9999,down:false};
  function resizeCanvas(){
    if (!globalCanvas) return;
    globalCanvas.width = window.innerWidth;
    globalCanvas.height = window.innerHeight;
    ctx = globalCanvas.getContext('2d');
  }
  function initParticles(count){
    if (!globalCanvas) return;
    particles = [];
    for (let i=0;i<count;i++) particles.push(new Particle(globalCanvas.width, globalCanvas.height));
  }
  function drawParticles(){
    if (!ctx) return;
    // background subtle gradient
    const g = ctx.createLinearGradient(0,0,globalCanvas.width,globalCanvas.height);
    g.addColorStop(0, `rgba(6,6,6,0.85)`);
    g.addColorStop(1, `rgba(12,12,12,0.85)`);
    ctx.fillStyle = g;
    ctx.fillRect(0,0,globalCanvas.width,globalCanvas.height);

    // draw particles
    ctx.globalCompositeOperation = 'lighter';
    particles.forEach((p,i) => {
      p.update(globalCanvas.width, globalCanvas.height);
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();

      // connection lines
      for (let j=i+1;j<particles.length;j++){
        const q = particles[j];
        const dx = p.x - q.x; const dy = p.y - q.y; const d = Math.sqrt(dx*dx+dy*dy);
        if (d < 110){
          ctx.strokeStyle = `rgba(255,255,255,${0.06*(1 - d/110)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x,p.y);
          ctx.lineTo(q.x,q.y);
          ctx.stroke();
        }
      }
    });
    ctx.globalCompositeOperation = 'source-over';
  }
  function animate(){
    drawParticles();
    animId = requestAnimationFrame(animate);
  }

  // init canvas particles safely
  if (globalCanvas && globalCanvas.getContext) {
    resizeCanvas();
    initParticles(maxParticles);
    animate();

    // mouse interactions
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX; mouse.y = e.clientY;
    });
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles(maxParticles);
    });
    // respect reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cancelAnimationFrame(animId);
    }
  }

  // ---------- GSAP reveal for .reveal elements ----------
  try {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.reveal').forEach(elem=> {
        gsap.fromTo(elem,{opacity:0,y:30},{opacity:1,y:0,duration:0.8,ease:'power2.out',scrollTrigger:{trigger:elem,start:'top 85%'}});
      });
    }
  } catch (e) { console.warn('GSAP error', e); }

  // ---------- Project cards clickable & keyboard accessible ----------
  qsa('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target && (e.target.tagName === 'A' || e.target.closest('a'))) return;
      const link = card.getAttribute('data-link') || '#';
      if (link && link !== '#') window.open(link,'_blank');
    });
    card.tabIndex = 0;
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });

  // ---------- VanillaTilt for .card-inner elements (if present) ----------
  if (window.VanillaTilt) {
    try {
      VanillaTilt.init(document.querySelectorAll('.card-inner'), {
        max: 12, speed: 350, glare: true, "max-glare": 0.12
      });
    } catch(e){}
  }

  // expose some helpers for enhanced-ui
  window.__prottoy_core = {
    setAccent: (hex) => document.documentElement.style.setProperty('--accent', hex),
    setParticlesDensity: (n) => { if (!globalCanvas) return; maxParticles = Math.max(20, Math.min(500, n)); initParticles(maxParticles); },
    enableParticles: (flag) => { if (!globalCanvas) return; if (flag) { animate(); } else { cancelAnimationFrame(animId); ctx && ctx.clearRect(0,0,globalCanvas.width,globalCanvas.height); } },
    setAnimationsEnabled: (flag) => { if (flag) body.classList.remove('reduce-motion'); else body.classList.add('reduce-motion'); }
  };

})();

// particles.js (module) — advanced 3-layer particle engine
const canvas = document.getElementById('particle-canvas');
if (!canvas) {
  console.warn('particles.js: #particle-canvas not found — skipping particles.');
} else {
  const ctx = canvas.getContext('2d');
  const DPR = Math.max(1, window.devicePixelRatio || 1);
  let rafId = null;
  let particleLayers = [];
  let mouse = { x: null, y: null, vx: 0, vy: 0, lastX: null, lastY: null };

  const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
  const randomRange = (a,b) => Math.random()*(b-a)+a;

  class Particle {
    constructor(layer){ this.layer = layer; this.reset(); }
    reset(){
      this.x = Math.random()*innerWidth;
      this.y = Math.random()*innerHeight;
      this.vx = randomRange(-this.layer.speed, this.layer.speed);
      this.vy = randomRange(-this.layer.speed, this.layer.speed);
      this.size = randomRange(this.layer.sizeMin, this.layer.sizeMax);
      this.alpha = randomRange(0.22, 0.85);
      this.hue = this.layer.hue + randomRange(-8,8);
    }
    update(){
      this.vy += this.layer.gravity;
      this.x += this.vx + (mouse.vx * this.layer.mouseInfluence || 0);
      this.y += this.vy + (mouse.vy * this.layer.mouseInfluence || 0);

      if (this.x < -80 || this.x > innerWidth + 80 || this.y < -80 || this.y > innerHeight + 80) this.reset();
    }
    draw(ctx){
      ctx.beginPath();
      ctx.fillStyle = `hsla(${this.hue} ${this.layer.s}% ${this.layer.l}% / ${this.alpha})`;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      ctx.fill();

      if (this.size > 2.6){
        ctx.beginPath();
        ctx.fillStyle = `hsla(${this.hue} ${this.layer.s}% ${this.layer.l}% / ${this.alpha*0.06})`;
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI*2);
        ctx.fill();
      }
    }
  }

  function initLayers(){
    const area = innerWidth * innerHeight;
    const base = Math.round(clamp(area / 30000, 30, 220));
    const defs = [
      { count: Math.round(base*0.35), sizeMin:1.6, sizeMax:3.8, speed:0.14, gravity:0.00035, mouseInfluence:0.008, hue:200, s:30, l:6 },
      { count: Math.round(base*0.5),  sizeMin:0.8, sizeMax:2.2, speed:0.45, gravity:0.0009,  mouseInfluence:0.03,  hue:200, s:40, l:12 },
      { count: Math.round(base*0.15), sizeMin:0.5, sizeMax:1.2, speed:0.9,  gravity:0.0022, mouseInfluence:0.06,  hue:220, s:70, l:70 }
    ];

    particleLayers = defs.map(def => {
      const ps = [];
      for (let i=0;i<def.count;i++) ps.push(new Particle(def));
      return { config: def, particles: ps };
    });
  }

  function resize(){
    canvas.width = Math.floor(innerWidth * DPR);
    canvas.height = Math.floor(innerHeight * DPR);
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
    initLayers();
  }

  window.addEventListener('resize', ()=>{ clearTimeout(window._partResizeTimer); window._partResizeTimer = setTimeout(resize,180); });

  window.addEventListener('mousemove', (e)=>{
    if (mouse.lastX != null){
      mouse.vx = (e.clientX - mouse.lastX) * 0.06;
      mouse.vy = (e.clientY - mouse.lastY) * 0.06;
    }
    mouse.lastX = e.clientX; mouse.lastY = e.clientY; mouse.x = e.clientX; mouse.y = e.clientY;
  });

  function drawConnections(layerObj){
    const pts = layerObj.particles;
    const maxDist = 110;
    ctx.lineWidth = 1;
    for (let i=0;i<pts.length;i++){
      const a = pts[i];
      for (let j=i+1;j<pts.length;j++){
        const b = pts[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx,dy);
        if (d < maxDist){
          const alpha = 0.06 * (1 - (d / maxDist));
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
  }

  function frame(){
    const t = performance.now() * 0.00006;
    const g = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    g.addColorStop(0, `hsl(${(180 + t*40) % 360} 36% 6%)`);
    g.addColorStop(1, `hsl(${(220 + t*30) % 360} 36% 10%)`);
    ctx.fillStyle = g; ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.globalAlpha = 0.95;
    for (const layerObj of particleLayers){
      for (const p of layerObj.particles){
        p.update();
        p.draw(ctx);
      }
      if (layerObj.config.speed > 0.3) drawConnections(layerObj);
    }
    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(frame);
  }

  // public control (optional)
  window.__particles = {
    start: ()=>{ if (rafId) cancelAnimationFrame(rafId); resize(); frame(); },
    stop: ()=>{ if (rafId) cancelAnimationFrame(rafId); }
  };

  // init
  resize();
  frame();
}


// Small runtime guards added by assistant
try{
  if(typeof document !== 'undefined'){
    // noop
  }
}catch(e){console.warn('js guard',e)}

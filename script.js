// Dark/Light Mode
const toggle = document.querySelector('.theme-toggle');
toggle.addEventListener('click', () => { document.body.classList.toggle('dark'); });

// Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });

// Section Fade-in
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); obs.unobserve(entry.target); } });
},{threshold:0.1});
sections.forEach(sec => observer.observe(sec));

// Hero Text Letter-by-Letter
const heroTitle = document.querySelector('.hero-title');
const text = heroTitle.textContent;
heroTitle.textContent = '';
text.split('').forEach((char,i)=>{
  const span = document.createElement('span');
  span.textContent = char;
  span.style.transition = `transform 0.6s ease ${i*0.04}s, opacity 0.6s ease ${i*0.04}s`;
  heroTitle.appendChild(span);
});
window.addEventListener('load', () => { document.querySelectorAll('.hero-title span').forEach(span=>{ span.style.transform='translateY(0)'; span.style.opacity='1'; }); });

// Project Card 3D Tilt
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width/2;
    const cy = rect.height/2;
    const dx = x - cx;
    const dy = y - cy;
    const rx = dy/(rect.height/2) * 5;
    const ry = dx/(rect.width/2) * -5;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0) scale(1.03)`;
  });
  card.addEventListener('mouseleave',()=>{ card.style.transform='rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)'; });
});

// Hero Particle Background
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;
let canvasWidth = canvas.width = window.innerWidth;
let canvasHeight = canvas.height = window.innerHeight;

window.addEventListener('resize', () => { canvasWidth = canvas.width = window.innerWidth; canvasHeight = canvas.height = window.innerHeight; initParticles(); });

class Particle {
  constructor(){ this.x=Math.random()*canvasWidth; this.y=Math.random()*canvasHeight; this.size=Math.random()*2+1; this.speedX=(Math.random()-0.5)*0.5; this.speedY=(Math.random()-0.5)*0.5;}
  update(){ this.x+=this.speedX; this.y+=this.speedY; if(this.x<0||this.x>canvasWidth)this.speedX*=-1; if(this.y<0||this.y>canvasHeight)this.speedY*=-1;}
  draw(){ ctx.fillStyle=document.body.classList.contains('dark')?'rgba(255,255,255,0.6)':'rgba(0,0,0,0.6)'; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); }
}

function initParticles(){ particlesArray=[]; const num = Math.floor(canvasWidth/8); for(let i=0;i<num;i++) particlesArray.push(new Particle()); }
function animateParticles(){ ctx.clearRect(0,0,canvasWidth,canvasHeight); particlesArray.forEach(p=>{p.update();p.draw();}); connectParticles(); requestAnimationFrame(animateParticles);}
function connectParticles(){ let opacityValue; for(let a=0;a<particlesArray.length;a++){ for(let b=a;b<particlesArray.length;b++){ const dx=particlesArray[a].x-particlesArray[b].x; const dy=particlesArray[a].y-particlesArray[b].y; const distance=Math.sqrt(dx*dx+dy*dy); if(distance<120){ opacityValue = 1-(distance/120); ctx.strokeStyle=document.body.classList.contains('dark')?`rgba(255,255,255,${opacityValue})`:`rgba(0,0,0,${opacityValue})`; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x,particlesArray[a].y); ctx.lineTo(particlesArray[b].x,particlesArray[b].y); ctx.stroke(); } } } }

initParticles();
animateParticles();

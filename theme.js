// Website scripts and frontend logic maintained by Khaled MD Prottoy
// hero.js - gradient text + staggered animation + blobs
document.addEventListener('DOMContentLoaded', ()=>{
  const heroName = document.querySelector('.hero-name');
  if (!heroName) return;

  // Wrap letters into spans if not already
  if (!heroName.querySelector('span')) {
    heroName.innerHTML = heroName.textContent.split('').map(ch => ch === ' ' ? '<span class="ch space"> </span>' : `<span class="ch">${ch}</span>`).join('');
  }

  // Animated hue CSS variable (applies to CSS gradient)
  let hue = 200;
  setInterval(()=>{ hue = (hue + 0.5) % 360; heroName.style.setProperty('--hue', hue); }, 90);

  // CSS gradient via variable
  heroName.style.background = 'linear-gradient(90deg, hsl(var(--hue) 78% 60%), hsl(calc(var(--hue) + 40) 78% 60%))';
  heroName.style.webkitBackgroundClip = 'text';
  heroName.style.backgroundClip = 'text';
  heroName.style.color = 'transparent';

  // GSAP float and stagger (if available)
  if (window.gsap) {
    gsap.to('.hero-name .ch', {
      y: () => '+=8',
      rotation: () => '+=1.2',
      duration: 1.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.03, from: 'center' }
    });
  }

  // decorative blob motion (if present)
  const b1 = document.querySelector('.blob-1');
  const b2 = document.querySelector('.blob-2');
  if (b1 && b2 && window.gsap) {
    gsap.to(b1, { x: -28, y: 12, duration: 8.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(b2, { x: 26, y: -18, duration: 10.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }

  // small vanilla tilt for gif-wrapper (if present)
  const gif = document.querySelector('.gif-wrapper');
  if (gif && window.VanillaTilt) {
    try { VanillaTilt.init(gif, { max: 8, speed: 380, glare: true, 'max-glare': 0.12, scale: 1.02 }); } catch(e){}
  }
});

import { gsap } from 'https://unpkg.com/gsap@3/dist/gsap.min.js';

document.addEventListener('DOMContentLoaded', ()=>{
  const heroName = document.querySelector('.hero-name');
  if (!heroName) return;

  // wrap letters
  if (!heroName.querySelector('span')){
    heroName.innerHTML = heroName.textContent.split('').map(ch=>{
      if (ch === ' ') return '<span class="ch space"> </span>';
      return `<span class="ch">${ch}</span>`;
    }).join('');
  }

  // hue animation
  let hue = 220;
  setInterval(()=>{ hue = (hue + 0.55) % 360; heroName.style.setProperty('--hue', hue); }, 80);

  // CSS gradient via variable
  heroName.style.background = 'linear-gradient(90deg, hsl(var(--hue) 80% 62%), hsl(calc(var(--hue) + 40) 80% 62%))';
  heroName.style.webkitBackgroundClip = 'text'; heroName.style.backgroundClip = 'text'; heroName.style.color = 'transparent';

  // GSAP float and stagger
  gsap.to('.hero-name .ch', {
    y: () => '+=8', rotation: () => '+=1.2', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1,
    stagger: { each: 0.03, from: 'center' }
  });
});

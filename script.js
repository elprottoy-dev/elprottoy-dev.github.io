// --------------------
// Particle Background
// --------------------
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const maxParticles = 120;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < maxParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

let gradientOffset = 0;
function animateParticles() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, `hsl(${gradientOffset % 360}, 70%, 10%)`);
  gradient.addColorStop(0.5, `hsl(${(gradientOffset + 60) % 360}, 70%, 15%)`);
  gradient.addColorStop(1, `hsl(${(gradientOffset + 120) % 360}, 70%, 10%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  gradientOffset += 0.2;

  particlesArray.forEach((p) => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();

// --------------------
// GSAP Hero 3D Floating Letters
// --------------------
gsap.utils.toArray('.hero-name span').forEach((letter, i) => {
  gsap.to(letter, {
    y: () => Math.random() * 20 - 10,
    x: () => Math.random() * 20 - 10,
    rotationY: () => Math.random() * 20 - 10,
    rotationX: () => Math.random() * 20 - 10,
    duration: 3,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true,
    delay: i * 0.05
  });
});

// --------------------
// Scroll Reveal
// --------------------
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.reveal').forEach((elem) => {
  gsap.fromTo(elem,
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
    });
});

// --------------------
// Vanilla Tilt for Project Cards
// --------------------
VanillaTilt.init(document.querySelectorAll(".card-inner"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
  scale: 1.05
});

// --------------------
// Dark / Light Theme Toggle
// --------------------
const themeToggle = document.querySelector('.theme-toggle');
if(localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  if(document.body.classList.contains('light-theme')){
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
});

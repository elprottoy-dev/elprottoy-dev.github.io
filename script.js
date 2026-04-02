// Website scripts and frontend logic maintained by Khaled MD Prottoy
/* ---------------- Theme / Particle Sync ---------------- */
function setParticleColors() {
  if (typeof particlesArray === 'undefined' || !Array.isArray(particlesArray)) return;
  if (document.body.classList.contains('light-theme')) {
    particlesArray.forEach((p, i) => {
      p.color = i % 2 === 0 ? 'rgba(61,213,243,0.8)' : 'rgba(255,107,107,0.8)';
    });
  } else {
    particlesArray.forEach(p => p.color = 'rgba(0,255,150,0.8)');
  }
}

function updateThemeToggleIcon() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  themeToggle.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌙';
}

document.addEventListener('themeChanged', function () {
  updateThemeToggleIcon();
  setParticleColors();
});

window.addEventListener('load', function () {
  updateThemeToggleIcon();
  setParticleColors();
});

/* ---------------- Scroll Reveal ---------------- */
const revealElements = document.querySelectorAll('.reveal');
const scrollReveal = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < triggerBottom) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
};
window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);

/* ---------------- Vanilla Tilt ---------------- */
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('.project-card .card-inner, .research-card, .hire-card'), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
  });
}

/* ---------------- Particle Background ---------------- */
const canvas = document.getElementById('particle-canvas');

let particlesArray = [];

if (canvas) {
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
    setParticleColors();
  });

  class Particle {
    constructor(x, y, size, speedX, speedY, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
      this.color = color;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    const numberOfParticles = Math.floor(canvas.width * canvas.height / 10000);
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 3 + 1;
      let x = Math.random() * (canvas.width - size * 2);
      let y = Math.random() * (canvas.height - size * 2);
      let speedX = (Math.random() - 0.5) * 1.5;
      let speedY = (Math.random() - 0.5) * 1.5;
      let color = document.body.classList.contains('light-theme')
        ? (i % 2 === 0 ? 'rgba(61,213,243,0.8)' : 'rgba(255,107,107,0.8)')
        : 'rgba(0,255,150,0.8)';
      particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
    }
  }
  initParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

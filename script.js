// ---------------- Theme Toggle ----------------
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// ---------------- Mobile Menu Toggle ----------------
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ---------------- Scroll Reveal ----------------
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < triggerBottom) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ---------------- Vanilla Tilt ----------------
VanillaTilt.init(document.querySelectorAll(".card-inner"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.3,
});

// ---------------- Hero Particle Canvas ----------------
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

function createParticles() {
  for(let i=0; i<particleCount; i++) {
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      size: Math.random()*3 + 1,
      speedX: (Math.random()-0.5)*1.5,
      speedY: (Math.random()-0.5)*1.5
    });
  }
}
function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    if(p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if(p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle = '#6a5cff';
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
createParticles();
animateParticles();
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

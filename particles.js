// particles.js
const canvas = document.getElementById('particle-canvas');
if (!canvas) return;

const ctx = canvas.getContext('2d');
let particles = [];
let layers = [];
let mouse = { x: null, y: null, vx: 0, vy: 0 };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

class Particle {
  constructor(layer) {
    this.layer = layer;
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * this.layer.speed;
    this.vy = (Math.random() - 0.5) * this.layer.speed;
    this.size = Math.random() * this.layer.size + 0.5;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx + mouse.vx * this.layer.magnetic;
    this.y += this.vy + mouse.vy * this.layer.magnetic;

    if (this.x < 0 || this.x > canvas.width) this.reset();
    if (this.y < 0 || this.y > canvas.height) this.reset();
  }

  draw() {
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  layers = [
    { count: 50, speed: 0.6, size: 3, magnetic: 0.01 },
    { count: 80, speed: 1, size: 2, magnetic: 0.03 },
    { count: 40, speed: 2, size: 1, magnetic: 0.06 }
  ];

  particles = [];

  layers.forEach(layer => {
    for (let i = 0; i < layer.count; i++) {
      particles.push(new Particle(layer));
    }
  });
}

window.addEventListener('mousemove', (e) => {
  mouse.vx = (e.clientX - (mouse.x || e.clientX)) * 0.05;
  mouse.vy = (e.clientY - (mouse.y || e.clientY)) * 0.05;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

initParticles();
animate();

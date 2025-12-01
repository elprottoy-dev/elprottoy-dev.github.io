// ---------------- Theme Toggle ----------------
const themeToggle = document.getElementById('theme-toggle');

// Load theme from localStorage
if(localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-theme');
  themeToggle.textContent = '🌞';
} else {
  themeToggle.textContent = '🌙';
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  if(document.body.classList.contains('light-theme')){
    themeToggle.textContent = '🌞';
    localStorage.setItem('theme', 'light');
  } else {
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
});

// ---------------- Reveal Animation ----------------
const reveals = document.querySelectorAll('.reveal');

function reveal() {
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;
    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ---------------- Vanilla Tilt ----------------
VanillaTilt.init(document.querySelectorAll(".project-card .card-inner"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.3
});

// ---------------- Particle Background ----------------
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;
let mouse = {
  x: null,
  y: null,
  radius: 100
};

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
  constructor(x, y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(){
    // Move particle
    this.x += this.directionX;
    this.y += this.directionY;

    // Bounce off edges
    if(this.x + this.size > canvas.width || this.x - this.size < 0){
      this.directionX = -this.directionX;
    }
    if(this.y + this.size > canvas.height || this.y - this.size < 0){
      this.directionY = -this.directionY;
    }

    // Mouse interaction - repel particles
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if(distance < mouse.radius + this.size){
      let angle = Math.atan2(dy, dx);
      let repelForce = (mouse.radius - distance) / mouse.radius;
      this.x -= Math.cos(angle) * repelForce * 3;
      this.y -= Math.sin(angle) * repelForce * 3;
    }

    this.draw();
  }
}

// Initialize particles
function initParticles(){
  particlesArray = [];
  let numberOfParticles = (canvas.width * canvas.height) / 9000;
  for(let i = 0; i < numberOfParticles; i++){
    let size = Math.random() * 3 + 1;
    let x = Math.random() * (canvas.width - size * 2) + size;
    let y = Math.random() * (canvas.height - size * 2) + size;
    let directionX = (Math.random() - 0.5) * 1;
    let directionY = (Math.random() - 0.5) * 1;
    let color = '#ff6b6b';
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// Draw particles and connect lines
function animateParticles(){
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(particle => particle.update());

  connectParticles();
}

// Connect particles with lines
function connectParticles(){
  let maxDistance = 120;
  for(let a = 0; a < particlesArray.length; a++){
    for(let b = a; b < particlesArray.length; b++){
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < maxDistance){
        ctx.strokeStyle = `rgba(255,107,107,${1 - distance / maxDistance})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// Initialize
initParticles();
animateParticles();

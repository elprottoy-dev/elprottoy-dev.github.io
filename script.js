const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const maxParticles = 100;

class Particle {
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if(this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw(){
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

function init(){
  for(let i=0; i<maxParticles; i++){
    particlesArray.push(new Particle());
  }
}

function connect(){
  for(let a=0; a<particlesArray.length; a++){
    for(let b=a; b<particlesArray.length; b++){
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < 120){
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  connect();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

init();
animate();

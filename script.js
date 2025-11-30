// Unified site script
// - Makes particle background optional (only runs when canvas exists)
// - Unified theme toggle (uses "light-theme")
// - Mobile menu toggle
// - Safe guards for GSAP / VanillaTilt usage
// - Makes project cards clickable (opens first project link in new tab if available)

(function () {
  // ---------- Helpers ----------
  const qs = (s, ctx = document) => ctx.querySelector(s);
  const qsa = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  // ---------- Theme Toggle ----------
  const themeToggle = qs('#theme-toggle') || qs('.theme-toggle');
  const body = document.body;

  function applySavedTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      body.classList.add('light-theme');
      if (themeToggle) themeToggle.textContent = '☀️';
      if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      body.classList.remove('light-theme');
      if (themeToggle) themeToggle.textContent = '🌙';
      if (themeToggle) themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  if (themeToggle) {
    themeToggle.tabIndex = 0;
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      const isLight = body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeToggle.textContent = isLight ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    });
    // Keyboard accessible toggle (Enter / Space)
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
      }
    });
  }
  applySavedTheme();

  // ---------- Mobile Menu Toggle ----------
  const menuToggle = qs('#menu-toggle');
  const navLinks = qs('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    // keyboard
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuToggle.click();
      }
    });
  }

  // ---------- Particle Background (optional) ----------
  const canvas = qs('#particle-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

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
            ctx.strokeStyle = 'rgba(255,255,255,0.08)';
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

    initParticles();
    animateParticles();
  }

  // ---------- GSAP / ScrollReveal (safe) ----------
  if (window.gsap && window.ScrollTrigger) {
    try {
      gsap.registerPlugin(ScrollTrigger);

      // Floating letters if hero-name wraps spans
      const letters = qsa('.hero-name span');
      if (letters.length) {
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
      }

      // Scroll reveal for elements with .reveal
      const reveals = qsa('.reveal');
      if (reveals.length) {
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
      }

      // Project card entrance animation (if project cards exist)
      const projectCards = qsa('.project-card');
      if (projectCards.length) {
        gsap.utils.toArray('.project-card').forEach(card => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
          });
        });
      }
    } catch (e) {
      // silently fail on animation errors
      console.warn('GSAP/ScrollTrigger error', e);
    }
  }

  // ---------- VanillaTilt (safe) ----------
  if (window.VanillaTilt) {
    const tiltElems = qsa('.card-inner');
    if (tiltElems.length) {
      VanillaTilt.init(tiltElems, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.03
      });
    }

    // Also init project card-specific tilt for outer cards if desired
    const cardElems = qsa('.project-card');
    if (cardElems.length) {
      VanillaTilt.init(cardElems, {
        max: 8,
        speed: 400,
        glare: false,
        scale: 1.01
      });
    }
  }

  // ---------- Make project cards clickable ----------
  const projectCardsClickable = qsa('.project-card');
  if (projectCardsClickable.length) {
    projectCardsClickable.forEach(card => {
      // click opens first meaningful link in project-links
      card.addEventListener('click', (e) => {
        // Avoid clicks on actual links triggering twice
        if (e.target && (e.target.tagName === 'A' || e.target.closest('a'))) return;
        const firstLink = card.querySelector('.project-links a');
        const dataLink = card.getAttribute('data-link');
        const href = (firstLink && firstLink.getAttribute('href')) || dataLink;
        if (href && href !== '#') {
          // open in new tab
          window.open(href, '_blank');
        } else if (href === '#') {
          // If only placeholder is available, follow it in the same tab (no-op '#' becomes top of page)
          window.location.hash = '';
        }
      });

      // keyboard accessibility
      card.tabIndex = 0;
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // ---------- Ensure all anchor buttons with class 'btn' are keyboard accessible ----------
  qsa('a.btn').forEach(a => a.tabIndex = 0);

})();

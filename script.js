// --------------------
// Dark/Light Mode Toggle
// --------------------
const toggle = document.querySelector('.theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// --------------------
// Smooth Custom Cursor
// --------------------
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// --------------------
// Scroll Fade-in for sections
// --------------------
const faders = document.querySelectorAll('section');
const options = { threshold: 0.1 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, options);

faders.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(20px)';
  appearOnScroll.observe(section);
});

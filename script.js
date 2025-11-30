// script.js
// GSAP reveal
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" }
      }
    );
  });
}

// Vanilla tilt
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll(".card-inner"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.05
  });
}

// Smooth anchor scroll
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;

  const id = a.getAttribute("href");
  if (!id || id === "#") return;

  const target = document.querySelector(id);
  if (!target) return;

  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth" });
});

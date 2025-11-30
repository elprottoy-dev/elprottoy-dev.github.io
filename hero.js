// hero.js
document.addEventListener("DOMContentLoaded", () => {
  const name = document.querySelector(".hero-name");

  if (name && !name.querySelector("span")) {
    name.innerHTML = name.textContent
      .split("")
      .map((c) => `<span class="ch">${c}</span>`)
      .join("");
  }

  if (window.gsap) {
    gsap.to(".hero-name .ch", {
      y: () => Math.random() * 6 - 3,
      x: () => Math.random() * 6 - 3,
      rotate: () => Math.random() * 3 - 1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.03, from: "center" }
    });
  }
});

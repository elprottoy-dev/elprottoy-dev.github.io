// preloader.js
window.addEventListener("load", () => {
  const pre = document.getElementById("preloader");
  if (!pre) return;
  pre.style.opacity = "0";
  setTimeout(() => pre.remove(), 500);
});

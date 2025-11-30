// preloader.js — fade out preloader gracefully
document.addEventListener('DOMContentLoaded', ()=>{
  const pre = document.getElementById('preloader');
  if (!pre) return;
  window.addEventListener('load', ()=>{
    pre.style.transition = 'opacity .45s ease, visibility .45s';
    pre.style.opacity = '0';
    setTimeout(()=>{ try{ pre.remove(); }catch(e){} }, 550);
  });
});

// cursor.js — lightweight magnetic cursor
(function(){
  const supportsPointer = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  if (!supportsPointer) return;

  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  cursor.style.cssText = 'position:fixed;left:0;top:0;width:18px;height:18px;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform .12s linear, width .12s linear, height .12s linear, background .12s linear;mix-blend-mode:exclusion;background:rgba(255,255,255,0.85);box-shadow:0 6px 18px rgba(0,0,0,0.35)';
  document.body.appendChild(cursor);

  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseover', e => {
    const t = e.target.closest('a, button, .btn, .card-inner, .project-card');
    if (t) {
      cursor.style.width = '36px';
      cursor.style.height = '36px';
      cursor.style.background = 'rgba(255,255,255,0.06)';
      cursor.style.boxShadow = `0 8px 30px ${getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#1db954'}33`;
    }
  });

  document.addEventListener('mouseout', e => {
    const t = e.target.closest('a, button, .btn, .card-inner, .project-card');
    if (t) {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      cursor.style.background = 'rgba(255,255,255,0.85)';
      cursor.style.boxShadow = '0 6px 18px rgba(0,0,0,0.35)';
    }
  });

  window.addEventListener('blur', ()=> cursor.style.opacity = '0');
  window.addEventListener('focus', ()=> cursor.style.opacity = '1');
})();

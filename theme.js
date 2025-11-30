// theme.js - simple theme & accent engine (module)
const themeToggle = document.getElementById('theme-toggle');
const ACCENTS = {
  green: '#1db954', purple: '#7c3aed', blue: '#0066ff', orange: '#ff7a00', red: '#ff375f'
};

function applyAccent(color){ document.documentElement.style.setProperty('--accent', color); localStorage.setItem('accent', color); }
function loadAccent(){ const a = localStorage.getItem('accent') || ACCENTS.purple; applyAccent(a); }

function applyTheme(isLight){ document.body.classList.toggle('light-theme', !!isLight); localStorage.setItem('theme', isLight ? 'light' : 'dark'); if (themeToggle) themeToggle.textContent = isLight ? '🌙' : '☀️'; }

function setupAccentPicker(){
  const container = document.createElement('div');
  container.id='accent-picker';
  container.style.cssText = 'position:fixed;right:12px;bottom:12px;display:flex;gap:8px;z-index:2000;';
  for (const [k,v] of Object.entries(ACCENTS)){
    const btn = document.createElement('button');
    btn.title = k;
    btn.style.cssText = `width:34px;height:34px;border-radius:8px;border:0;cursor:pointer;background:${v}`;
    btn.addEventListener('click', ()=>applyAccent(v));
    container.appendChild(btn);
  }
  document.body.appendChild(container);
}

document.addEventListener('DOMContentLoaded', ()=>{
  const saved = localStorage.getItem('theme');
  applyTheme(saved === 'light');
  loadAccent();
  setupAccentPicker();
  if (themeToggle) themeToggle.addEventListener('click', ()=>{ applyTheme(!document.body.classList.contains('light-theme')); });
});

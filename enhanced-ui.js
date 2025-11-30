// UI controls: preference panel, accent picker, theme presets, particles toggle, save prefs
(function(){
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));

  const uiToggle = qs('#ui-toggle');
  const panel = qs('#ui-panel');
  const themeSelect = qs('#theme-select');
  const accentPicker = qs('#accent-picker');
  const accentHex = qs('#accent-hex');
  const animationsToggle = qs('#animations-toggle');
  const particlesToggle = qs('#particles-toggle');
  const densityRange = qs('#particle-density');
  const densityValue = qs('#density-value');
  const resetBtn = qs('#reset-prefs');

  const KEY = 'prottoy_prefs_v1';
  const defaults = { theme:'dark', accent:'#1db954', animations:true, particles:true, density:120 };

  function loadPrefs(){ try { const p = JSON.parse(localStorage.getItem(KEY)); return Object.assign({}, defaults, p || {}); } catch(e){ return defaults; } }
  function savePrefs(p){ localStorage.setItem(KEY, JSON.stringify(p)); }

  function applyPrefs(p){
    // theme presets
    if (p.theme === 'light') document.body.classList.add('light-theme'); else document.body.classList.remove('light-theme');
    // accent
    document.documentElement.style.setProperty('--accent', p.accent);
    // animations
    if (!p.animations) document.body.classList.add('reduce-motion'); else document.body.classList.remove('reduce-motion');
    // particles
    if (window.__prottoy_core) {
      window.__prottoy_core.setParticlesDensity(p.density || 120);
      window.__prottoy_core.enableParticles(!!p.particles);
      window.__prottoy_core.setAnimationsEnabled(!!p.animations);
    }
  }

  // initialize UI
  function init(){
    if (!uiToggle || !panel) return;
    const prefs = loadPrefs();
    themeSelect.value = prefs.theme;
    accentPicker.value = prefs.accent;
    accentHex.textContent = prefs.accent;
    animationsToggle.checked = !!prefs.animations;
    particlesToggle.checked = !!prefs.particles;
    densityRange.value = prefs.density;
    densityValue.textContent = prefs.density;

    applyPrefs(prefs);

    // open/close
    uiToggle.addEventListener('click', () => {
      const shown = panel.style.display !== 'none';
      panel.style.display = shown ? 'none' : 'block';
      panel.setAttribute('aria-hidden', shown ? 'true' : 'false');
    });

    themeSelect.addEventListener('change', () => {
      prefs.theme = themeSelect.value; savePrefs(prefs); applyPrefs(prefs);
    });
    accentPicker.addEventListener('input', (e)=> {
      prefs.accent = e.target.value; accentHex.textContent = prefs.accent; savePrefs(prefs); applyPrefs(prefs);
    });
    animationsToggle.addEventListener('change', (e)=> { prefs.animations = e.target.checked; savePrefs(prefs); applyPrefs(prefs); });
    particlesToggle.addEventListener('change', (e)=> { prefs.particles = e.target.checked; savePrefs(prefs); applyPrefs(prefs); });
    densityRange.addEventListener('input', (e)=> { prefs.density = Number(e.target.value); densityValue.textContent = prefs.density; savePrefs(prefs); applyPrefs(prefs); });
    resetBtn.addEventListener('click', () => { localStorage.removeItem(KEY); const np = loadPrefs(); themeSelect.value = np.theme; accentPicker.value = np.accent; accentHex.textContent = np.accent; animationsToggle.checked = np.animations; particlesToggle.checked = np.particles; densityRange.value = np.density; densityValue.textContent = np.density; applyPrefs(np); });

    // keyboard accessibility
    uiToggle.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); uiToggle.click(); }});
    panel.addEventListener('keydown', e => { if (e.key === 'Escape') { panel.style.display='none'; panel.setAttribute('aria-hidden','true'); }});
  }

  document.addEventListener('DOMContentLoaded', init);
})();


// Small runtime guards added by assistant
try{
  if(typeof document !== 'undefined'){
    // noop
  }
}catch(e){console.warn('js guard',e)}

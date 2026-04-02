// Website scripts and frontend logic maintained by Khaled MD Prottoy
document.addEventListener('DOMContentLoaded', function () {
  const mount = document.getElementById('site-navbar');
  if (!mount) return;

  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const currentHash = (window.location.hash || '').toLowerCase();
  const savedTheme = localStorage.getItem('theme');

  function syncThemeClasses(isLight) {
    document.body.classList.toggle('light-theme', isLight);
    document.body.classList.toggle('light-mode', isLight);
  }

  if (savedTheme === 'light') {
    syncThemeClasses(true);
  } else if (savedTheme === 'dark') {
    syncThemeClasses(false);
  } else {
    syncThemeClasses(document.body.classList.contains('light-theme') || document.body.classList.contains('light-mode'));
  }

  const links = [
    { href: 'index.html', label: 'Home', active: () => currentPage === 'index.html' && currentHash !== '#research' },
    { href: 'projects.html', label: 'Projects', active: () => currentPage === 'projects.html' },
    { href: 'index.html#research', label: 'Research', active: () => currentPage === 'index.html' && currentHash === '#research' },
    { href: 'certification.html', label: 'Certification', active: () => currentPage === 'certification.html' },
    { href: 'about.html', label: 'About', active: () => currentPage === 'about.html' },
    { href: 'experience.html', label: 'Experience', active: () => currentPage === 'experience.html' },
    { href: 'contact.html', label: 'Contact', active: () => currentPage === 'contact.html' },
    { href: 'Khaled_Prottoy_CV.pdf', label: 'Resume', extra: ' class="btn" download', active: () => false }
  ];

  mount.innerHTML = `
    <nav id="navbar">
      <ul class="nav-links">
        ${links.map(link => `
          <li>
            <a href="${link.href}"${link.extra || ''}${link.active() ? ' class="active' + ((link.extra || '').includes('class="btn"') ? ' btn' : '') + '"' : ''}${link.active() ? ' aria-current="page"' : ''}>
              ${link.label}
            </a>
          </li>
        `).join('')}
      </ul>
      <div class="menu-toggle" id="menu-toggle">☰</div>
      <div class="theme-toggle" id="theme-toggle">${(document.body.classList.contains('light-theme') || document.body.classList.contains('light-mode')) ? '🌞' : '🌙'}</div>
    </nav>
  `;

  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = mount.querySelector('.nav-links');
  const themeToggle = document.getElementById('theme-toggle');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
      });
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeToggle.textContent = isLight ? '🌞' : '🌙';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      document.dispatchEvent(new CustomEvent('themeChanged', { detail: { isLight } }));
    });
  }

  document.dispatchEvent(new CustomEvent('themeChanged', {
    detail: { isLight: document.body.classList.contains('light-theme') }
  }));
});
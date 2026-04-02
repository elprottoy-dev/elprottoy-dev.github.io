document.addEventListener('DOMContentLoaded', function () {
  const mount = document.getElementById('site-footer');
  if (!mount) return;

  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const currentHash = (window.location.hash || '').toLowerCase();

  const isActive = (href) => {
    if (href === 'index.html#research') {
      return currentPage === 'index.html' && currentHash === '#research';
    }
    return href.split('#')[0].toLowerCase() === currentPage;
  };

  const links = [
    { href: 'projects.html', label: 'Projects' },
    { href: 'about.html', label: 'About' },
    { href: 'index.html#research', label: 'Research' },
    { href: 'certification.html', label: 'Certification' },
    { href: 'experience.html', label: 'Experience' },
    { href: 'contact.html', label: 'Contact' },
    { href: '#', label: 'Cynexsys' }
  ];

  const social = [
    {
      href: 'https://github.com/khaledprottoy',
      label: 'GitHub',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.92.58.11.79-.25.79-.56 0-.28-.01-1.19-.02-2.16-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.19a10.9 10.9 0 0 1 5.78 0c2.2-1.5 3.17-1.19 3.17-1.19.62 1.59.23 2.76.11 3.05.74.81 1.18 1.85 1.18 3.11 0 4.42-2.69 5.39-5.26 5.67.41.36.78 1.08.78 2.19 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5Z"/></svg>'
    },
    {
      href: 'https://wa.me/8801581622793',
      label: 'WhatsApp',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.8 11.8 0 0 0 12.09 0C5.58 0 .27 5.28.27 11.78c0 2.08.54 4.11 1.56 5.91L0 24l6.48-1.7a11.8 11.8 0 0 0 5.61 1.43h.01c6.5 0 11.81-5.29 11.81-11.79 0-3.15-1.23-6.11-3.39-8.46ZM12.1 21.73h-.01a9.88 9.88 0 0 1-5.03-1.37l-.36-.21-3.84 1.01 1.03-3.75-.23-.39a9.78 9.78 0 0 1-1.5-5.23C2.17 6.38 6.56 2 12.09 2c2.63 0 5.1 1.02 6.95 2.88a9.76 9.76 0 0 1 2.86 6.94c0 5.43-4.39 9.91-9.8 9.91Zm5.43-7.41c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.69.15-.2.29-.79.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.25-.46-2.39-1.46-.88-.78-1.47-1.74-1.64-2.03-.17-.29-.02-.45.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.69-1.67-.94-2.29-.25-.6-.5-.52-.69-.53h-.58c-.2 0-.53.08-.8.38s-1.04 1.01-1.04 2.46 1.07 2.86 1.22 3.05c.15.2 2.09 3.19 5.06 4.47.71.31 1.27.49 1.71.63.72.23 1.37.2 1.88.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.13-.28-.2-.58-.35Z"/></svg>'
    },
    {
      href: 'https://linkedin.com/in/khaledprottoy',
      label: 'LinkedIn',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.49 2.49 0 1 0 0 4.99 2.49 2.49 0 0 0 0-4.99ZM2.75 8.98h4.46V21H2.75V8.98ZM9.79 8.98h4.27v1.64h.06c.59-1.13 2.04-2.33 4.19-2.33 4.48 0 5.31 2.95 5.31 6.79V21h-4.45v-5.24c0-1.25-.02-2.86-1.74-2.86-1.75 0-2.02 1.36-2.02 2.77V21H9.79V8.98Z"/></svg>'
    }
  ];

  mount.innerHTML = `
    <a href="https://wa.me/8801581622793" class="global-whatsapp-button" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">WhatsApp</a>
    <footer>
      <div class="container footer-container">
        <div class="footer-left">
          <h3>Powered By<br>KHALED MD MEHZABIN ALAM PROTTOY</h3>
          <p>Crafting reliable, sustainable solutions that make a positive impact worldwide.</p>\n          <p class="footer-contact-line"><span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg></span><a href="mailto:cynexsysites@gmail.com">cynexsysites@gmail.com</a></p>
        </div>
        <div class="footer-right">
          <h4>Quick Links</h4>
          <ul>
            ${links.map(link => `
              <li><a href="${link.href}" class="footer-nav-link ${isActive(link.href) ? 'active' : ''}"${isActive(link.href) ? ' aria-current="page"' : ''}>${link.label}</a></li>
            `).join('')}
          </ul>
          <h4>Connect</h4>
          <ul class="footer-social-list">
            ${social.map(link => `
              <li>
                <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="footer-social-link">
                  <span class="footer-icon">${link.icon}</span>
                  <span>${link.label}</span>
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
      <p class="footer-copy">&copy; 2026 Khaled Prottoy | All Rights Reserved</p>
    </footer>
  `;
});
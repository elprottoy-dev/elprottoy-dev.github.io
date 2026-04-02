// Website scripts and frontend logic maintained by Khaled MD Prottoy
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.project-filter-button');
  const cards = document.querySelectorAll('.project-card[data-category]');
  const modal = document.getElementById('project-modal');

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const filter = button.dataset.filter;
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  if (!modal) return;

  const modalTitle = document.getElementById('project-modal-title');
  const modalDescription = document.getElementById('project-modal-description');
  const modalStack = document.getElementById('project-modal-stack');
  const modalImage = document.getElementById('project-modal-image');
  const modalProblem = document.getElementById('project-modal-problem');
  const modalDelivery = document.getElementById('project-modal-delivery');

  function openModal(card) {
    const title = card.querySelector('h3')?.childNodes[0]?.textContent?.trim() || 'Project';
    const description = card.querySelector('.card-content p')?.textContent?.trim() || '';
    const stack = card.querySelector('.tech-stack')?.textContent?.trim() || '';
    const image = card.querySelector('img');

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalStack.innerHTML = stack.split('|').map((item) => `<span>${item.trim()}</span>`).join('');
    modalImage.src = image ? image.getAttribute('src') : '';
    modalImage.alt = image ? image.getAttribute('alt') : title;

    const category = card.dataset.category;
    const problemCopy = {
      'ai-data': 'Transforms raw information into actionable, decision-friendly insights using modern data and analytics workflows.',
      'web-platform': 'Creates user-facing digital products with strong workflow support, scalable architecture, and operational clarity.',
      'iot-hardware': 'Bridges sensors, automation, and connected systems to support real-world monitoring and control use cases.',
      'immersive-blockchain': 'Explores interactive or decentralized systems where trust, engagement, and innovation are central.'
    };
    const deliveryCopy = {
      'ai-data': 'Focused on data modeling, dashboard logic, backend integration, and research-informed system design.',
      'web-platform': 'Focused on responsive UX, backend orchestration, access control, and product-ready feature delivery.',
      'iot-hardware': 'Focused on embedded integration, data capture, automation logic, and usable monitoring interfaces.',
      'immersive-blockchain': 'Focused on proof-of-concept experimentation, multi-user interaction, and emerging technology workflows.'
    };

    modalProblem.textContent = problemCopy[category] || 'Designed to solve practical operational and product challenges.';
    modalDelivery.textContent = deliveryCopy[category] || 'Delivered through a blend of architecture, engineering, and product thinking.';

    modal.classList.add('show');
    document.body.classList.add('popup-open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.classList.remove('popup-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.project-quick-view').forEach((button) => {
    button.addEventListener('click', function () {
      openModal(button.closest('.project-card'));
    });
  });

  modal.addEventListener('click', function (event) {
    if (event.target.dataset.close === 'true' || event.target.classList.contains('project-modal-close')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
  });
});
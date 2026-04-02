// Website scripts and frontend logic maintained by Khaled MD Prottoy
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const popup = document.getElementById('contact-success-popup');
  const popupClose = popup ? popup.querySelector('.contact-popup-close') : null;
  const submitButton = form.querySelector('button[type="submit"]');

  const validators = {
    name: (value) => value.trim().length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: (value) => value.trim().length >= 10
  };

  function setFieldState(field, isValid) {
    const group = field.closest('.field-group');
    if (!group) return;
    group.classList.remove('is-valid', 'is-invalid', 'shake');
    void group.offsetWidth;
    group.classList.add(isValid ? 'is-valid' : 'is-invalid');
    if (!isValid) group.classList.add('shake');
  }

  function validateField(field) {
    const rule = validators[field.name];
    if (!rule) return true;
    const valid = rule(field.value);
    setFieldState(field, valid);
    return valid;
  }

  function validateForm() {
    const fields = Array.from(form.querySelectorAll('input[name], textarea[name]')).filter((field) => validators[field.name]);
    return fields.every(validateField);
  }

  function openPopup(message) {
    if (!popup) return;
    const text = popup.querySelector('p');
    if (text && message) text.textContent = message;
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
    document.body.classList.add('popup-open');
  }

  function closePopup() {
    if (!popup) return;
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('popup-open');
  }

  form.querySelectorAll('input[name], textarea[name]').forEach((field) => {
    if (validators[field.name]) {
      field.addEventListener('input', () => validateField(field));
      field.addEventListener('blur', () => validateField(field));
    }
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData(form);

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        form.querySelectorAll('.field-group').forEach((group) => group.classList.remove('is-valid', 'is-invalid', 'shake'));
        openPopup('Thanks for reaching out. Your message has been submitted successfully.');
      } else {
        openPopup('Your message could not be sent right now. Please try again or contact me directly by email or WhatsApp.');
      }
    } catch (error) {
      openPopup('Network issue detected. Please try again or contact me directly by email or WhatsApp.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });

  if (popupClose) popupClose.addEventListener('click', closePopup);

  if (popup) {
    popup.addEventListener('click', function (event) {
      if (event.target === popup) closePopup();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closePopup();
  });
});
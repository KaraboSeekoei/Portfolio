document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = form.querySelector('button[type="submit"]');

  function validateForm() {
    const isFormValid =
      nameInput.value.trim() !== '' &&
      emailInput.value.trim() !== '' &&
      messageInput.value.trim() !== '';

    submitButton.disabled = !isFormValid;
  }

  nameInput.addEventListener('input', validateForm);
  emailInput.addEventListener('input', validateForm);
  messageInput.addEventListener('input', validateForm);
});

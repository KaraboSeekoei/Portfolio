document.addEventListener("DOMContentLoaded", function () {
  // FORM VALIDATION
  const form = document.querySelector('.contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject'); // optional
  const messageInput = document.getElementById('message');
  const submitButton = form ? form.querySelector('button[type="submit"]') : null;

  function validateForm() {
    if (!submitButton) return;

    // Simple email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isNameValid = nameInput.value.trim() !== '';
    const isEmailValid = emailInput.value.trim() !== '' && emailPattern.test(emailInput.value.trim());
    const isMessageValid = messageInput.value.trim() !== '';

    // Enable button only if all required fields are valid
    submitButton.disabled = !(isNameValid && isEmailValid && isMessageValid);
  }

  // Add input listeners to validate in real-time
  if (nameInput) nameInput.addEventListener('input', validateForm);
  if (emailInput) emailInput.addEventListener('input', validateForm);
  if (messageInput) messageInput.addEventListener('input', validateForm);

  // Run validation on page load in case fields are pre-filled
  validateForm();

  // THEME TOGGLE SYSTEM
  const themeSelect = document.getElementById("theme-select");

  if (themeSelect) {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.setAttribute("data-theme", savedTheme);
    themeSelect.value = savedTheme;

    themeSelect.addEventListener("change", () => {
      const theme = themeSelect.value;
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    });
  }
});

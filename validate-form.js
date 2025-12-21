document.addEventListener("DOMContentLoaded", function () {
  // Hamburger toggle (runs on all pages)
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Theme toggle (runs on all pages)
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

  // Contact form code (only runs if the form exists)
  const form = document.getElementById("contactForm");
  if (form) {
    const status = document.getElementById("formStatus");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const submitButton = form.querySelector("button[type='submit']");

    function validateForm() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isNameValid = nameInput.value.trim() !== '';
      const isEmailValid = emailInput.value.trim() !== '' && emailPattern.test(emailInput.value.trim());
      const isMessageValid = messageInput.value.trim() !== '';

      submitButton.disabled = !(isNameValid && isEmailValid && isMessageValid);
    }

    nameInput.addEventListener("input", validateForm);
    emailInput.addEventListener("input", validateForm);
    messageInput.addEventListener("input", validateForm);
    validateForm();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      fetch("http://localhost:5000/contact", { method: "POST", body: formData })
        .then(response => response.text())
        .then(data => {
          status.textContent = data;
          form.reset();
          validateForm();
        })
        .catch(err => {
          status.textContent = "Error sending message. Try again later.";
          console.error(err);
        });
    });
  }
});

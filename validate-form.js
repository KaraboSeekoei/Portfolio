document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitButton = form.querySelector("button[type='submit']");

  // VALIDATION
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
  validateForm(); // initial check

  // FETCH SUBMISSION
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("http://localhost:5000/contact", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      status.textContent = data;
      form.reset();
      validateForm(); // re-disable button after reset
    })
    .catch(err => {
      status.textContent = "Error sending message. Try again later.";
      console.error(err);
    });
  });

  // THEME TOGGLE
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

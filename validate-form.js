document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitButton = form.querySelector("button[type='submit']");

  const touched = {
    name: false,
    email: false,
    message: false
  };

  function createError(input) {
    let span = input.nextElementSibling;
    if (!span || !span.classList.contains("error-msg")) {
      span = document.createElement("span");
      span.className = "error-msg";
      span.style.color = "red";
      span.style.fontSize = "0.9rem";
      input.parentNode.insertBefore(span, input.nextSibling);
    }
    return span;
  }

  function validateField(input, type) {
    const value = input.value.trim();
    const errorSpan = createError(input);

    if (!touched[type]) {
      errorSpan.textContent = "";
      return false;
    }

    switch(type) {
      case "name":
        const namePattern = /^[A-Z][a-z]+\s[A-Z][a-z]+(\s[A-Z][a-z]+)*$/;
        if (value === "") { errorSpan.textContent = "Please enter your full name."; return false; }
        if (!namePattern.test(value)) { errorSpan.textContent = "E.g John Doe."; return false; }
        break;

      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // general email check
        if (value === "") { errorSpan.textContent = "Please enter your email."; return false; }
        if (!emailPattern.test(value)) { errorSpan.textContent = "Enter a valid email address. E.g john@gmail.com"; return false; }
        break;

      case "message":
        if (value === "") { errorSpan.textContent = "Message cannot be empty."; return false; }
        break;
    }

    errorSpan.textContent = "";
    return true;
  }

  function validateForm() {
    const validName = validateField(nameInput, "name");
    const validEmail = validateField(emailInput, "email");
    const validMessage = validateField(messageInput, "message");

    submitButton.disabled = !(validName && validEmail && validMessage);
  }

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener("focus", () => { touched[input.id] = true; });
    input.addEventListener("input", validateForm);
  });

  validateForm();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "Sending message...";
    const formData = new FormData(form);
    fetch("http://localhost:5000/contact", { method: "POST", body: formData })
      .then(res => res.text())
      .then(data => {
        status.textContent = data;
        form.reset();
        Object.keys(touched).forEach(k => touched[k] = false);
        validateForm();
      })
      .catch(err => {
        status.textContent = "Error sending message. Try again later.";
        console.error(err);
      });
  });
});

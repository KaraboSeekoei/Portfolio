document.addEventListener("DOMContentLoaded", function () {
  // ==========================
  // Hamburger toggle (all pages)
  // ==========================
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ==========================
  // Theme toggle (all pages)
  // ==========================
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

  // ==========================
  // Initialize EmailJS
  // ==========================
  emailjs.init("AqMCnZ3ZBofHJuVRQ"); // your public key

  // ==========================
  // Contact Form (if exists)
  // ==========================
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const submitButton = form.querySelector("button[type='submit']");

  const touched = { name: false, email: false, message: false };

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

    switch (type) {
      case "name":
        const namePattern = /^[A-Z][a-z]+\s[A-Z][a-z]+(\s[A-Z][a-z]+)*$/;
        if (value === "") { errorSpan.textContent = "Please enter your full name."; return false; }
        if (!namePattern.test(value)) { errorSpan.textContent = "E.g John Doe."; return false; }
        break;

      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === "") { errorSpan.textContent = "Please enter your email."; return false; }
        if (!emailPattern.test(value)) { errorSpan.textContent = "Enter a valid email address."; return false; }
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
    e.preventDefault(); // prevent page reload
    status.textContent = "Sending message...";

    // ==========================
    // Debug logs to test JS & EmailJS
    // ==========================
    console.log("Form submitted!");
    console.log("Name:", nameInput.value);
    console.log("Email:", emailInput.value);
    console.log("Subject:", subjectInput.value.trim() || "No subject");
    console.log("Message:", messageInput.value);

    emailjs.send("service_pn155uf", "template_h5in08m", {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim() || "No subject",
      message: messageInput.value.trim()
    })
    .then((response) => {
      console.log("EmailJS response:", response);
      status.textContent = "Message sent successfully!";
      form.reset();
      Object.keys(touched).forEach(k => touched[k] = false);
      validateForm();
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      status.textContent = "Error sending message. Try again later.";
    });
  });
});

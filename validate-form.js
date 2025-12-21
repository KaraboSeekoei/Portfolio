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
});

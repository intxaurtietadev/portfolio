function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }


  //dark/light
const toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", () => {
  const html = document.documentElement;
  if (html.getAttribute("data-theme") === "dark") {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    toggleButton.textContent = "🌙";
  } else {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toggleButton.textContent = "☀️";
  }
});

// Mantener la preferencia de tema guardada
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  toggleButton.textContent = "☀️";
}
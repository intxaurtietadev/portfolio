// Script para el canvas con partículas
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// Configura el tamaño del canvas según la sección #profile
function resizeCanvas() {
  const profileSection = document.getElementById('profile');
  if (profileSection) {
    canvas.width = profileSection.offsetWidth;
    canvas.height = profileSection.offsetHeight;
  } else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

resizeCanvas();

// Clase para crear partículas
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1 + 1;
    this.speedX = Math.random() * 2.5 - 1;
    this.speedY = Math.random() * 2 - 1;
  }

  // Actualiza la posición de la partícula
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebote en los bordes del canvas
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }

  // Dibuja la partícula en el canvas
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Array para almacenar las partículas
const particles = [];

// Inicializa las partículas
function init() {
  particles.length = 0; // Limpia las partículas existentes
  for (let i = 0; i < 300; i++) {
    particles.push(new Particle());
  }
}

// Anima las partículas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
  for (let particle of particles) {
    particle.update();
    particle.draw();
  }
  requestAnimationFrame(animate); // Llama a animate en cada frame
}

// Actualiza el color del canvas según el tema actual
function updateCanvasTheme() {
  const theme = document.documentElement.getAttribute("data-theme");
  if (theme === "dark") {
    canvas.style.background = "#1a1a1a"; // Fondo oscuro
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"; // Partículas blancas
  } else {
    canvas.style.background = "#f9f9f9"; // Fondo claro
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Partículas negras
  }
}

// Escucha cambios en el atributo data-theme
new MutationObserver((mutations) => {
  mutations.forEach(() => {
    updateCanvasTheme(); // Actualiza el fondo del canvas
  });
}).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

// Redimensionar el canvas al cambiar la ventana
window.addEventListener('resize', () => {
  resizeCanvas();
  init(); // Reinicia las partículas al cambiar el tamaño
});

// Inicia la animación y actualiza el tema inicial
init();
updateCanvasTheme();
animate();

// Script para alternar menú y tema light/dark
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Botón para alternar entre light y dark mode
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
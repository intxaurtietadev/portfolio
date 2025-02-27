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

// Clase para crear partículas con titilación
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width; // Posición inicial X
    this.y = Math.random() * canvas.height; // Posición inicial Y
    this.size = Math.random() * 1 + 1; // Tamaño de la partícula
    this.speedX = Math.random() * 2.5 - 1; // Velocidad horizontal
    this.speedY = Math.random() * 2 - 1; // Velocidad vertical
    this.baseOpacity = Math.random() * 0.5 + 0.3; // Opacidad base (entre 0.3 y 0.8)
    this.opacity = this.baseOpacity; // Opacidad inicial
  }

  // Actualiza la posición y la opacidad de la partícula
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Rebote en los bordes del canvas
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

    // Efecto de titilación: variación aleatoria en la opacidad
    this.opacity = this.baseOpacity + (Math.random() * 0.2 - 0.1); // ±10% de variación
    this.opacity = Math.max(0.1, Math.min(this.opacity, 0.8)); // Limita entre 0.1 y 0.8
  }

  // Dibuja la partícula en el canvas con su opacidad actual
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    // Ajusta el color de relleno según el tema actual
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "dark") {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // Partículas blancas con opacidad
    } else {
      ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`; // Partículas negras con opacidad
    }

    ctx.fill(); // Rellena la partícula
  }
}

// Array para almacenar las partículas
const particles = [];

// Inicializa las partículas
function init() {
  particles.length = 0; // Limpia las partículas existentes
  for (let i = 0; i < 300; i++) { // Número de partículas
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
  } else {
    canvas.style.background = "#f9f9f9"; // Fondo claro
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
// Cerrar menú al hacer clic en un enlace
const menuLinks = document.querySelectorAll(".menu-links a");
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".menu-links").classList.remove("open");
    document.querySelector(".hamburger-icon").classList.remove("open");
  });
});

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

// PERMITIR NAVEGACIÓN CON TECLADO -->
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelector(".menu-links").classList.remove("open");
    document.querySelector(".hamburger-icon").classList.remove("open");
  }
});

// Importar la librería SortableJS
document.addEventListener("DOMContentLoaded", function () {
  const script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js";
  document.head.appendChild(script);

  script.onload = function () {
    const projectGrid = document.querySelectorAll(".about-containers");
    projectGrid.forEach(container => {
      new Sortable(container, {
        animation: 500,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)", // Transición más fluida
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        swapThreshold: 0.2,
        onStart: function (evt) {
          evt.item.classList.add("dragging");
        },
        onEnd: function (evt) {
          evt.item.classList.remove("dragging");
          console.log("Elemento movido: ", evt.item);
        }
      });
    });
  };
});

// Estilos mejorados para la animación visual
document.head.insertAdjacentHTML("beforeend", `
  <style>
    .sortable-ghost {
      opacity: 0.4;
      transform: scale(0.2);
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }
    .sortable-chosen {
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .sortable-drag {
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
      transform: scale(1.05);
    }
    .dragging {
      transition: none !important;
      transform: scale(1.1);
    }
  </style>
`);

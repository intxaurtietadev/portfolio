// Script para el canvas con partículas (ORIGINAL)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

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

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1 + 1;
    this.speedX = Math.random() * 2.5 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.baseOpacity = Math.random() * 0.5 + 0.3;
    this.opacity = this.baseOpacity;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    this.opacity = this.baseOpacity + (Math.random() * 0.2 - 0.1);
    this.opacity = Math.max(0.1, Math.min(this.opacity, 0.8));
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const theme = document.documentElement.getAttribute("data-theme");
    if (theme === "dark") {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    } else {
      ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
    }
    ctx.fill();
  }
}

const particles = [];
let animationFrameId;

function init() {
  particles.length = 0;
  const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 100); // Menos denso
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let particle of particles) {
    particle.update();
    particle.draw();
  }
  animationFrameId = requestAnimationFrame(animate);
}

function stopAnimation() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}
function startAnimation() {
    stopAnimation();
    resizeCanvas();
    init();
    updateCanvasTheme();
    animate();
}

function updateCanvasTheme() {
  // No necesita cambiar el fondo explícitamente si hereda
}

new MutationObserver((mutations) => {
  mutations.forEach(() => {
    // No necesita reiniciar la animación aquí
  });
}).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        startAnimation(); // Reinicia partículas
        if (projectSwiper) { // Actualiza swiper si existe
           projectSwiper.update();
        }
    }, 250);
});

startAnimation(); // Inicia animación

// Script para alternar menú y tema light/dark (ORIGINAL)
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const isOpen = menu.classList.toggle("open");
  icon.classList.toggle("open");
  icon.setAttribute("aria-expanded", isOpen);
}
const menuLinks = document.querySelectorAll(".menu-links a");
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
     const menu = document.querySelector(".menu-links");
     if (menu.classList.contains("open")) {
        toggleMenu();
     }
  });
});

const toggleButton = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;

function setTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    toggleButton.textContent = theme === "dark" ? "☀️" : "🌙";
}
toggleButton.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

// PERMITIR NAVEGACIÓN CON TECLADO 
document.addEventListener("keydown", (event) => {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (event.key === "Escape" && menu.classList.contains("open")) {
    toggleMenu();
    if(icon) icon.focus();
  }
});

// INICIALIZACIÓN DE SWIPER 
let projectSwiper; // Variable global para el resize

document.addEventListener('DOMContentLoaded', function () {

  projectSwiper = new Swiper('.project-swiper', {
    // Parámetros Swiper
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30, // Espacio entre slides
    grabCursor: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      // >= 600px
      600: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      // >= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    },
     a11y: {
        prevSlideMessage: 'Proyecto anterior',
        nextSlideMessage: 'Proyecto siguiente',
        paginationBulletMessage: 'Ir al proyecto {{index}}',
     },
  });

  // ACTUALIZAR AÑO FOOTER 
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
  }

}); 
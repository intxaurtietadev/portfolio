const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// Configura el tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Crea un array para almacenar las partículas
const particles = [];

// Clase para crear partículas
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1 + 1;
    this.speedX = Math.random() * 2 - 1;
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
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Inicializa las partículas
function init() {
  for (let i = 0; i < 100; i++) {
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

// Ajusta el tamaño del canvas al redimensionar la ventana
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// Inicia la animación
init();
animate();
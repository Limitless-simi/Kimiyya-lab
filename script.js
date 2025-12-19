const scrollHint = document.getElementById("scrollHint");
const render1 = document.getElementById("render1");
const render2 = document.getElementById("render2");
const canvas = document.getElementById("renderCanvas");
const ctx = canvas.getContext("2d");

const img = new Image();
img.src = "render1.png";

let particles = [];
let dissolved = false;

/* Resize canvas */
function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
window.addEventListener("resize", resizeCanvas);

/* Particle class */
class PixelParticle {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.life = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 0.015;
  }

  draw() {
    ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.life})`;
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}

/* Create particles from image pixels */
function createParticles() {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  particles = [];

  for (let y = 0; y < canvas.height; y += 6) {
    for (let x = 0; x < canvas.width; x += 6) {
      const index = (y * canvas.width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];

      if (a > 120) {
        particles.push(new PixelParticle(x, y, r, g, b));
      }
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* Animate particles */
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  particles = particles.filter(p => p.life > 0);

  if (particles.length > 0) {
    requestAnimationFrame(animateParticles);
  }
}

/* Load image */
img.onload = () => {
  resizeCanvas();
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

/* SCROLL LOGIC */
window.addEventListener("scroll", () => {
  const y = window.scrollY;

  scrollHint.classList.toggle("hidden", y > 100);

  /* Render 1 appears */
  if (y > 400 && y < 750) {
    render1.classList.add("visible");
    if (!dissolved) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }

  /* Dissolve */
  if (y >= 750 && y < 950 && !dissolved) {
    createParticles();
    animateParticles();
    dissolved = true;
  }

  /* Hide render 1 */
  if (y >= 950) {
    render1.classList.remove("visible");
  }

  /* Render 2 */
  render2.classList.toggle("visible", y > 950);
});

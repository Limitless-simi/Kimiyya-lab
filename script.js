const scrollHint = document.getElementById("scrollHint");
const render1 = document.getElementById("render1");
const render2 = document.getElementById("render2");
const canvas = document.getElementById("renderCanvas");
const ctx = canvas.getContext("2d");
const bgLayer = document.getElementById("particle-layer");

const img = new Image();
img.src = "render1.png";

let particles = [];
let dissolving = false;

/* ---------- BACKGROUND PARTICLES ---------- */
for (let i = 0; i < 120; i++) {
  const p = document.createElement("div");
  p.className = "bg-particle";
  p.style.left = Math.random() * 100 + "vw";
  p.style.top = Math.random() * 120 + "vh";
  p.style.animationDuration = 20 + Math.random() * 40 + "s";
  p.style.opacity = Math.random();
  bgLayer.appendChild(p);
}

/* ---------- CANVAS SETUP ---------- */
function resizeCanvas() {
  const rect = render1.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}
window.addEventListener("resize", resizeCanvas);

/* ---------- PARTICLE CLASS ---------- */
class PixelParticle {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3;
    this.life = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 0.02;
  }

  draw() {
    ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.life})`;
    ctx.fillRect(this.x, this.y, 2, 2);
  }
}

/* ---------- CREATE PARTICLES ---------- */
function createParticles() {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  particles = [];

  for (let y = 0; y < canvas.height; y += 6) {
    for (let x = 0; x < canvas.width; x += 6) {
      const i = (y * canvas.width + x) * 4;
      if (data[i + 3] > 120) {
        particles.push(new PixelParticle(x, y, data[i], data[i + 1], data[i + 2]));
      }
    }
  }
}

/* ---------- ANIMATE PARTICLES ---------- */
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  particles = particles.filter(p => p.life > 0);
  if (particles.length) requestAnimationFrame(animateParticles);
}

/* ---------- IMAGE LOAD ---------- */
img.onload = () => {
  resizeCanvas();
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

/* ---------- SCROLL LOGIC ---------- */
window.addEventListener("scroll", () => {
  const y = window.scrollY;

  scrollHint.classList.toggle("hidden", y > 100);

  /* RESET WHEN SCROLLING UP */
  if (y < 700) {
    dissolving = false;
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  /* SHOW RENDER 1 */
  render1.classList.toggle("visible", y > 400 && y < 750);

  /* DISSOLVE */
  if (y >= 750 && y < 950 && !dissolving) {
    createParticles();
    animateParticles();
    dissolving = true;
  }

  /* RENDER 2 */
  render2.classList.toggle("visible", y > 950);
});

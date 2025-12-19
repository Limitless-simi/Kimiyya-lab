const layer = document.getElementById("particle-layer");
const render = document.getElementById("render1");
const scrollHint = document.getElementById("scrollHint");

/* WORDS */
const words = [
  "kimiyya",
  "alchemy",
  "cosmology",
  "ancestral",
  "protocol",
  "indigenous",
  "relational",
  "decolonize",
  "laboratory",
  "futurity"
];

/* CREATE PARTICLES */
for (let i = 0; i < 120; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "vw";
  p.style.top = Math.random() * 120 + "vh";
  p.style.animationDuration = 20 + Math.random() * 40 + "s";
  p.style.opacity = Math.random();
  layer.appendChild(p);
}

/* CREATE WORDS */
words.forEach(word => {
  const w = document.createElement("div");
  w.className = "word";
  w.textContent = word;
  w.style.left = Math.random() * 80 + 10 + "vw";
  w.style.top = Math.random() * 100 + "vh";
  layer.appendChild(w);
});

/* SCROLL INTERACTION */
window.addEventListener("scroll", () => {
  const y = window.scrollY;

  // Hide scroll hint
  if (y > 80) {
    scrollHint.classList.add("hidden");
  } else {
    scrollHint.classList.remove("hidden");
  }

  // Reveal render image
  if (y > 400) {
    render.classList.add("visible");
  } else {
    render.classList.remove("visible");
  }

  // Parallax words
  document.querySelectorAll(".word").forEach((w, i) => {
    w.style.transform = `translateY(${y * 0.05 * (i % 3)}px)`;
    w.style.opacity = Math.min(0.3, 0.1 + y / 3000);
  });
});

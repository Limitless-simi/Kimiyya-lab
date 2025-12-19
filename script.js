const layer = document.getElementById("particle-layer");

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

// Create particles
for (let i = 0; i < 120; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "vw";
  p.style.top = Math.random() * 120 + "vh";
  p.style.animationDuration = 20 + Math.random() * 40 + "s";
  p.style.opacity = Math.random();
  layer.appendChild(p);
}

// Create floating words
words.forEach(word => {
  const w = document.createElement("div");
  w.className = "word";
  w.textContent = word;
  w.style.left = Math.random() * 80 + 10 + "vw";
  w.style.top = Math.random() * 100 + "vh";
  layer.appendChild(w);
});

// Scroll = subtle parallax
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll(".word").forEach((w, i) => {
    w.style.transform = `translateY(${scrollY * 0.05 * (i % 3)}px)`;
    w.style.opacity = 0.1 + scrollY / 3000;
  });
});

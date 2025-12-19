const layer = document.getElementById("particle-layer");
const render1 = document.getElementById("render1");
const render2 = document.getElementById("render2");
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
for (let i = 0; i < 140; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "vw";
  p.style.top = Math.random() * 140 + "vh";
  p.style.animationDuration = 25 + Math.random() * 50 + "s";
  p.style.opacity = Math.random();
  layer.appendChild(p);
}

/* CREATE WORDS */
words.forEach(word => {
  const w = document.createElement("div");
  w.className = "word";
  w.textContent = word;
  w.style.left = Math.random() * 80 + 10 + "vw";
  w.style.top = Math.random() * 120 + "vh";
  layer.appendChild(w);
});

/* SCROLL INTERACTION */
window.addEventListener("scroll", () => {
  const y = window.scrollY;

  /* Hide scroll hint */
  if (y > 100) {
    scrollHint.classList.add("hidden");
  } else {
    scrollHint.classList.remove("hidden");
  }

  /* RENDER 1: appear then disappear */
  if (y > 400 && y < 800) {
    render1.classList.add("visible");
  } else {
    render1.classList.remove("visible");
  }

  /* RENDER 2: appears later */
  if (y > 900) {
    render2.classList.add("visible");
  } else {
    render2.classList.remove("visible");
  }

  /* Parallax words */
  document.querySelectorAll(".word").forEach((w, i) => {
    w.style.transform = `translateY(${y * 0.05 * (i % 3)}px)`;
    w.style.opacity = Math.min(0.3, 0.1 + y / 3500);
  });
});

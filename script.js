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

/* BACKGROUND PARTICLES */
for (let i = 0; i < 140; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "vw";
  p.style.top = Math.random() * 140 + "vh";
  p.style.animationDuration = 25 + Math.random() * 50 + "s";
  p.style.opacity = Math.random();
  layer.appendChild(p);
}

/* FLOATING WORDS */
words.forEach(word => {
  const w = document.createElement("div");
  w.className = "word";
  w.textContent = word;
  w.style.left = Math.random() * 80 + 10 + "vw";
  w.style.top = Math.random() * 120 + "vh";
  layer.appendChild(w);
});

/* DISSOLVE FUNCTION */
function dissolveRender(render) {
  const rect = render.getBoundingClientRect();

  for (let i = 0; i < 40; i++) {
    const frag = document.createElement("div");
    frag.className = "render-fragment";

    frag.style.left = rect.left + rect.width / 2 + "px";
    frag.style.top = rect.top + rect.height / 2 + "px";

    frag.style.setProperty("--x", Math.random());
    frag.style.setProperty("--y", Math.random());

    document.body.appendChild(frag);

    setTimeout(() => frag.remove(), 2500);
  }
}

/* STATE */
let render1Dissolved = false;

/* SCROLL INTERACTION */
window.addEventListener("scroll", () => {
  const y = window.scrollY;

  /* Hide scroll hint */
  scrollHint.classList.toggle("hidden", y > 100);

  /* Render 1 lifecycle */
  if (y > 400 && y < 700) {
    render1.classList.add("visible");
    render1Dissolved = false;
  }

  /* Dissolve render 1 */
  if (y >= 700 && y < 900 && !render1Dissolved) {
    dissolveRender(render1);
    render1.classList.remove("visible");
    render1Dissolved = true;
  }

  /* Render 2 appears */
  if (y > 900) {
    render2.classList.add("visible");
  } else {
    render2.classList.remove("visible");
  }

  /* Word parallax */
  document.querySelectorAll(".word").forEach((w, i) => {
    w.style.transform = `translateY(${y * 0.05 * (i % 3)}px)`;
    w.style.opacity = Math.min(0.3, 0.1 + y / 3500);
  });
});

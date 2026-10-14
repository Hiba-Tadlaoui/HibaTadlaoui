// The "eye" in the U of VISUAL: the white pupil looks around inside the red iris.
(function () {
  const pupil = document.querySelector(".eye__pupil");
  if (!pupil) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Iris r = 26, pupil r = 13.5 → the pupil can travel 12.5 units from centre.
  const MAX_TRAVEL = 12.5;
  // Resting pose: looking down, as in the static design.
  const REST = { x: 1, y: 12.5 };

  // A few deliberate glances mixed into the random ones.
  const GLANCES = [
    { x: -12.5, y: 0 }, // left
    { x: 12.5, y: 0 },  // right
    { x: 0, y: -12.5 }, // up
    { x: -9, y: -9 },   // up-left
    { x: 9, y: -9 },    // up-right
    { x: 0, y: 0 },    // straight ahead
    REST,
  ];

  const lookAt = ({ x, y }) => {
    pupil.style.transform = `translate(${x}px, ${y}px)`;
  };

  const randomPoint = () => {
    const angle = Math.random() * Math.PI * 2;
    const dist = MAX_TRAVEL * (0.55 + Math.random() * 0.45);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  const nextTarget = () =>
    Math.random() < 0.5
      ? GLANCES[Math.floor(Math.random() * GLANCES.length)]
      : randomPoint();

  let timer;
  const loop = () => {
    lookAt(nextTarget());
    // Hold each glance for a moment, sometimes a quick dart, sometimes a long stare.
    const hold = Math.random() < 0.25 ? 350 : 900 + Math.random() * 1400;
    timer = setTimeout(loop, hold);
  };

  const start = () => {
    clearTimeout(timer);
    lookAt(REST);
    if (reduceMotion.matches) return;
    // Begin once VISUAL has slid into place.
    timer = setTimeout(loop, 1800);
  };

  reduceMotion.addEventListener("change", start);
  start();
})();

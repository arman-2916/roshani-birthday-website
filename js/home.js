/* Home page: cake-building animation is CSS-timed to assemble in layers. */
document.addEventListener("DOMContentLoaded", () => {
  const cake = document.getElementById("cake-build");
  if (cake && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cake.addEventListener("animationend", event => {
      if (event.animationName === "candle-grow") cake.classList.add("cake-finished");
    }
    );
  }
}
);

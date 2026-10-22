/* Shared mobile navigation, reveal animations, and gentle heart rain. */
document.addEventListener("DOMContentLoaded", () => {
  const data = window.BIRTHDAY_DATA || {
    name:"Roshani"
  }
  ;
  document.querySelectorAll("[data-name]").forEach(el => el.textContent = data.name);
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const opened = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(opened));
      menuButton.setAttribute("aria-label", opened ? "Close navigation" : "Open navigation");
      menuButton.textContent = opened ? "×" : "☰";
    }
    );
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    }
    ));
  }
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
    ), {
      threshold:.12
    }
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i%4,3)*90}ms`;
      observer.observe(el);
    }
    );
  }
  else reveals.forEach(el => el.classList.add("is-visible"));
  const heartLayer = document.getElementById("heart-rain");
  if (heartLayer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const symbols = ["♡", "♥", "✧", "ღ"];
    let count = 0;
    const spawnHeart = () => {
      if (document.hidden) return;
      const heart = document.createElement("span");
      heart.className = "rain-heart";
      heart.textContent = symbols[Math.floor(Math.random()*symbols.length)];
      heart.style.left = `${Math.random()*100}%`;
      heart.style.fontSize = `${12+Math.random()*19}px`;
      heart.style.setProperty("--duration", `${7+Math.random()*7}s`);
      heart.style.setProperty("--sway", `${Math.random()*150-75}px`);
      heart.style.setProperty("--spin", `${Math.random()*220-110}deg`);
      heart.style.setProperty("--opacity", `${.22+Math.random()*.35}`);
      heartLayer.appendChild(heart);
      setTimeout(() => heart.remove(), 15000);
      count++;
      if (count > 100) {
        heartLayer.querySelectorAll(".rain-heart").forEach((item, i)=>{
          if(i<20)item.remove()
        }
        );
        count=60;
      }
    }
    ;
    for (let i=0;
    i<7;
    i++) setTimeout(spawnHeart, i*380);
    setInterval(spawnHeart, 850);
  }
}
);

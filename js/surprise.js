/* Interactive cake: create layers and candles, blow out flames, and make confetti. */
document.addEventListener("DOMContentLoaded", () => {
  const cake = document.getElementById("interactive-cake");
  const buildButton = document.getElementById("build-button");
  const candleButton = document.getElementById("candle-button");
  const wishReveal = document.getElementById("wish-reveal");
  const caption = document.getElementById("cake-caption");
  const status = document.getElementById("build-status");
  const dust = document.getElementById("magic-dust");
  const confettiButton = document.getElementById("confetti-button");
  let built = false, blown = false;
  function sprinkleStars() {
    const glyphs = ["✦", "✧", "♡", "♥", "·"];
    for (let i=0;
    i<36;
    i++) {
      const star = document.createElement("span");
      star.className = "dust-star";
      star.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];
      star.style.left = `${Math.random()*100}%`;
      star.style.top = `${30+Math.random()*65}%`;
      star.style.fontSize = `${10+Math.random()*17}px`;
      star.style.animationDelay = `${Math.random()*.7}s`;
      dust.appendChild(star);
      setTimeout(()=>star.remove(), 3000);
    }
  }
  function buildCake() {
    built = true;
    blown = false;
    cake.classList.remove("built");
    void cake.offsetWidth;
    cake.classList.add("built");
    document.querySelectorAll(".candle").forEach(c=>c.classList.remove("out"));
    buildButton.textContent = "Create the cake again ↻";
    candleButton.disabled = false;
    candleButton.textContent = "Blow out candles";
    caption.textContent = "Watch closely… your cake is being created with magic. ✨";
    status.innerHTML = '<span class="status-dot"></span> sprinkling a little birthday magic…';
    wishReveal.hidden = true;
    sprinkleStars();
    setTimeout(()=>{
      caption.textContent = "Three candles, one beautiful wish. ♡";
      status.innerHTML = '<span class="status-dot"></span> your birthday cake is ready!';
    }
    , 3100);
  }
  function blowCandles() {
    if (!built) return;
    blown = !blown;
    document.querySelectorAll(".candle").forEach(c=>c.classList.toggle("out", blown));
    candleButton.textContent = blown ? "Light candles again" : "Blow out candles";
    caption.textContent = blown ? "Close your eyes and make a wish. ✨" : "The little flames are glowing for you again.";
    if (blown) {
      wishReveal.hidden = false;
      burstConfetti(60);
      wishReveal.scrollIntoView({
        behavior:"smooth", block:"nearest"
      }
      );
    }
    else wishReveal.hidden = true;
  }
  function burstConfetti(amount=80) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors=["#d96f98", "#f4b6cd", "#bda6e8", "#f3cf86", "#fff"];
    for(let i=0;
    i<amount;
    i++){
      const bit=document.createElement("span");
      bit.className="confetti-bit";
      bit.style.left=`${Math.random()*100}%`;
      bit.style.background=colors[i%colors.length];
      bit.style.setProperty("--fall", `${2+Math.random()*2.4}s`);
      bit.style.setProperty("--drift", `${Math.random()*200-100}px`);
      bit.style.animationDelay=`${Math.random()*.45}s`;
      document.getElementById("cake-lab").appendChild(bit);
      setTimeout(()=>bit.remove(), 5000);
    }
  }
  buildButton.addEventListener("click", buildCake);
  candleButton.addEventListener("click", blowCandles);
  confettiButton.addEventListener("click", ()=>burstConfetti(110));
  document.querySelectorAll(".candle").forEach(c=>c.addEventListener("click", ()=>{
    if(!built)return;
    c.classList.toggle("out");
    const allOut=[...document.querySelectorAll(".candle")].every(item=>item.classList.contains("out"));
    if(allOut&&!blown){
      blown=true;
      candleButton.textContent="Light candles again";
      caption.textContent="All the candles are out. Make a wish!";
      wishReveal.hidden=false;
      burstConfetti(60);
    }
  }
  ));
  setTimeout(()=>{
    if(!built) caption.textContent="Tap “Create my cake” and watch the magic happen.";
  }
  , 1200);
}
);

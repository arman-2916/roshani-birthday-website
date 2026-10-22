/* Replayable final celebration confetti. */
document.addEventListener("DOMContentLoaded", ()=>{
  const data=window.BIRTHDAY_DATA||{
  }
  , message=document.getElementById("final-message"), field=document.getElementById("confetti-field"), button=document.getElementById("celebrate-again"), reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  message.textContent=data.finalMessage||message.textContent;
  function celebrate(){
    if(reduced){
      button.textContent="Sending birthday joy ♡";
      return
    }
    field.innerHTML="";
    const colors=["#d96f98", "#f5c0d4", "#bca5e8", "#f3d28b", "#eaa8ae", "#fff"];
    for(let i=0;
    i<120;
    i++){
      const p=document.createElement("span");
      p.className="confetti-piece";
      p.style.left=`${Math.random()*100}%`;
      p.style.background=colors[Math.floor(Math.random()*colors.length)];
      p.style.setProperty("--fall-time", `${2.4+Math.random()*3.4}s`);
      p.style.setProperty("--drift", `${Math.random()*220-110}px`);
      p.style.setProperty("--rotation", `${Math.random()*360}deg`);
      p.style.animationDelay=`${Math.random()*1.2}s`;
      field.appendChild(p)
    }
    button.textContent="More birthday magic ✨";
    setTimeout(()=>field.innerHTML="", 8000)
  }
  button.addEventListener("click", celebrate);
  setTimeout(celebrate, 500);
}
);

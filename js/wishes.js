/* Open/replay the animated birthday envelope. */
document.addEventListener("DOMContentLoaded", ()=>{
  const data=window.BIRTHDAY_DATA||{
  }
  , envelope=document.getElementById("envelope"), content=document.getElementById("letter-content"), openButton=document.getElementById("open-letter"), replay=document.getElementById("replay-letter"), hint=document.getElementById("letter-hint");
  (data.letter||["Happy Birthday, Roshani! ♡", "Wishing you a lovely day and a beautiful year ahead.", "With warm wishes, your friend ♡"]).forEach((line, i)=>{
    const p=document.createElement("p");
    p.textContent=line;
    if(i===(data.letter||[]).length-1)p.className="letter-signoff";
    content.appendChild(p)
  }
  );
  openButton.addEventListener("click", ()=>{
    envelope.classList.add("open");
    openButton.hidden=true;
    replay.hidden=false;
    hint.textContent="A little note, from the heart. ♡"
  }
  );
  replay.addEventListener("click", ()=>{
    envelope.classList.remove("open");
    openButton.hidden=false;
    replay.hidden=true;
    hint.textContent="Tap to open your little letter.";
    setTimeout(()=>envelope.scrollIntoView({
      behavior:"smooth", block:"center"
    }
    ), 80)
  }
  );
}
);

/* Gallery cards and lightbox are generated from birthday-data.js. */
document.addEventListener("DOMContentLoaded", ()=>{
  const photos=(window.BIRTHDAY_DATA&&window.BIRTHDAY_DATA.photos)||[], grid=document.getElementById("memory-grid"), count=document.getElementById("photo-count"), box=document.getElementById("lightbox"), img=box.querySelector("img"), caption=box.querySelector("figcaption");
  let index=0;
  count.textContent=`${photos.length} little spaces for memories ♡`;
  photos.forEach((photo, i)=>{
    const card=document.createElement("button");
    card.type="button";
    card.className="memory-card";
    card.setAttribute("aria-label", `Open photo: ${photo.title}`);
    const area=document.createElement("div");
    area.className="memory-image";
    if(photo.image){
      const image=document.createElement("img");
      image.src=photo.image;
      image.alt=photo.title||"Birthday memory";
      image.loading="lazy";
      image.onerror=()=>{
        area.innerHTML=`<div class="memory-placeholder">${photo.symbol||"♡"}</div>`
      }
      ;
      area.appendChild(image)
    }
    else{
      const placeholder=document.createElement("div");
      placeholder.className="memory-placeholder";
      placeholder.textContent=photo.symbol||"♡";
      area.appendChild(placeholder)
    }
    const details=document.createElement("div");
    details.className="memory-caption";
    const label=document.createElement("span");
    label.textContent=photo.label||"A LITTLE MEMORY";
    const title=document.createElement("strong");
    title.textContent=photo.title||"A lovely moment";
    const desc=document.createElement("p");
    desc.textContent=photo.caption||"";
    details.append(label, title, desc);
    card.append(area, details);
    card.addEventListener("click", ()=>open(i));
    grid.appendChild(card);
  }
  );
  function open(i){
    index=i;
    const p=photos[i];
    if(!p.image){
      img.removeAttribute("src");
      img.style.display="none";
      caption.textContent=`${p.title} — add a photo path in js/birthday-data.js to view it here.`
    }
    else{
      img.style.display="block";
      img.src=p.image;
      img.alt=p.title||"Birthday memory";
      caption.textContent=p.caption||p.title||""
    }
    box.hidden=false;
    document.body.style.overflow="hidden";
    box.querySelector(".lightbox-close").focus()
  }
  function close(){
    box.hidden=true;
    document.body.style.overflow=""
  }
  function step(n){
    open((index+n+photos.length)%photos.length)
  }
  box.querySelector(".lightbox-close").addEventListener("click", close);
  box.querySelector(".lightbox-prev").addEventListener("click", ()=>step(-1));
  box.querySelector(".lightbox-next").addEventListener("click", ()=>step(1));
  box.addEventListener("click", e=>{
    if(e.target===box)close()
  }
  );
  document.addEventListener("keydown", e=>{
    if(box.hidden)return;
    if(e.key==="Escape")close();
    if(e.key==="ArrowRight")step(1);
    if(e.key==="ArrowLeft")step(-1)
  }
  );
}
);

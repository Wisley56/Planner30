export function initTheme(toggleEl){
  if(localStorage.getItem("darkMode")==="1"){ document.body.classList.add("dark"); toggleEl.checked=true; }
  toggleEl.addEventListener("change", ()=>{
    if(toggleEl.checked){ document.body.classList.add("dark"); localStorage.setItem("darkMode","1"); }
    else { document.body.classList.remove("dark"); localStorage.setItem("darkMode","0"); }
  });
}
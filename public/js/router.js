export function initRouter(){
  const planner = document.getElementById("plannerView");
  const library = document.getElementById("libraryView");
  document.getElementById("tabPlanner").onclick = ()=>{ library.classList.add("hidden"); planner.classList.remove("hidden"); };
  document.getElementById("tabLibrary").onclick = ()=>{ planner.classList.add("hidden"); library.classList.remove("hidden"); };
}
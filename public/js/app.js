import { initTheme } from './theme.js';
import { initRouter } from './router.js';
import { initTimers } from './timers.js';
import { renderPlanner } from './planner.js';
import { initLibrary, bindLibraryControls } from './library.js';

window.addEventListener('DOMContentLoaded', ()=>{
  initTheme(document.getElementById('darkToggle'));
  initRouter();
  renderPlanner();
  initTimers();

  document.getElementById('tabLibrary').addEventListener('click', async ()=>{
    await initLibrary();
    bindLibraryControls();
  });
});

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./sw.js');
  });
}
export function initTimers(){
  let restTimer=null, hiitTimer=null, phase="work", round=1, left=0;
  const restStart = document.getElementById("restStart");
  const restSecs = document.getElementById("restSecs");
  const restDisplay = document.getElementById("restDisplay");
  restStart.addEventListener("click", ()=>{
    let secs = parseInt(restSecs.value)||60;
    clearInterval(restTimer);
    restDisplay.textContent = `Descanso: ${secs}s`;
    restTimer = setInterval(()=>{
      secs--; restDisplay.textContent = `Descanso: ${secs}s`;
      if(secs<=0){ clearInterval(restTimer); restDisplay.textContent="Vamos voltar!"; }
    },1000);
  });

  const hiitStart = document.getElementById("hiitStart");
  const hiitStop = document.getElementById("hiitStop");
  const workSecs = document.getElementById("workSecs");
  const easySecs = document.getElementById("easySecs");
  const rounds = document.getElementById("rounds");
  const hiitDisplay = document.getElementById("hiitDisplay");

  hiitStart.addEventListener("click", ()=>{
    let work = parseInt(workSecs.value)||30;
    let easy = parseInt(easySecs.value)||30;
    let total = parseInt(rounds.value)||8;
    clearInterval(hiitTimer);
    phase="work"; round=1; left=work;
    hiitDisplay.textContent = `Rodada ${round}/${total} • TRABALHO: ${left}s`;
    hiitTimer = setInterval(()=>{
      left--;
      if(left<=0){
        if(phase==="work"){ phase="easy"; left=easy; hiitDisplay.textContent=`Rodada ${round}/${total} • LEVE: ${left}s`; }
        else { phase="work"; round++; if(round>total){ clearInterval(hiitTimer); hiitDisplay.textContent="✅ HIIT concluído!"; return; } left=work; hiitDisplay.textContent=`Rodada ${round}/${total} • TRABALHO: ${left}s`; }
      } else {
        hiitDisplay.textContent = `Rodada ${round}/${total} • ${phase==="work"?"TRABALHO":"LEVE"}: ${left}s`;
      }
    },1000);
  });
  hiitStop.addEventListener("click", ()=>{ clearInterval(hiitTimer); hiitDisplay.textContent="⏸️ Parado"; });
}
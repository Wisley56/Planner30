import { store } from './storage.js';

const PLACEHOLDER = './public/assets/placeholder.png';

export const EX = {
  "Agachamento Goblet (Goblet Squat)": { gif: "", fallback: PLACEHOLDER },
  "Supino com Halteres (Dumbbell Bench Press)": { gif: "", fallback: PLACEHOLDER },
  "Remada Curvada Halteres (Dumbbell Bent-Over Row)": { gif: "", fallback: PLACEHOLDER },
  "RDL (Terra Romeno) (Romanian Deadlift)": { gif: "", fallback: PLACEHOLDER },
  "Prancha (Plank)": { gif: "", fallback: PLACEHOLDER },
  "Lunge (Avanço) (Lunge)": { gif: "", fallback: PLACEHOLDER },
  "Desenvolvimento Ombros (Dumbbell Shoulder Press)": { gif: "", fallback: PLACEHOLDER },
  "Puxada na Polia (Lat Pulldown)": { gif: "", fallback: PLACEHOLDER },
  "Ponte de Glúteos (Glute Bridge)": { gif: "", fallback: PLACEHOLDER },
  "Dead Bug (Dead Bug)": { gif: "", fallback: PLACEHOLDER },
  "Flexão de Braços (Push-Up)": { gif: "", fallback: PLACEHOLDER },
  "Remada Unilateral (One-Arm Dumbbell Row)": { gif: "", fallback: PLACEHOLDER },
  "Farmer Carry (Farmer Walk)": { gif: "", fallback: PLACEHOLDER },
  "Bike Intervals (Exercise Bike)": { gif: "", fallback: PLACEHOLDER },
  "Esteira Inclinação (Treadmill Incline)": { gif: "", fallback: PLACEHOLDER },
  "Circuito Leve (Light Circuit)": { gif: "", fallback: PLACEHOLDER }
};

export function dayPlan(day){
  const week = Math.ceil(day/7);
  const dow = ((day-1)%7)+1;
  const A = ["Agachamento Goblet","Supino com Halteres","Remada Curvada Halteres","RDL (Terra Romeno)","Prancha","Esteira Inclinação"];
  const B = ["Lunge (Avanço)","Desenvolvimento Ombros","Puxada na Polia","Ponte de Glúteos","Dead Bug","Bike Intervals"];
  const C = ["Agachamento Goblet","RDL (Terra Romeno)","Flexão de Braços","Remada Unilateral","Farmer Carry","Circuito Leve"];
  const W = [A,B,C];
  const isTrain = [1,3,5].includes(dow);
  let list=[], note="";
  if(isTrain){
    const idx = [1,3,5].indexOf(dow);
    list = W[idx];
    note = (week>=3) ? "Semana de intensidade moderada: foque em carga/forma (RPE 6–8)." :
                       "Semana de reentrada/volume: foque na técnica e controle.";
  } else {
    list = ["Esteira Inclinação","Circuito Leve"];
    note = "Dia livre: caminhada 20–30min (RPE 4–6), mobilidade leve e hidratação.";
  }
  return {isTrain, list, note};
}

export function renderPlanner(){
  const daySelect = document.getElementById('daySelect');
  for(let i=1;i<=30;i++){ const o=document.createElement('option'); o.value=i; o.textContent='Dia '+i; daySelect.appendChild(o); }
  if(localStorage.getItem('selDay')) daySelect.value = localStorage.getItem('selDay');

  const treinoFeito = document.getElementById('treinoFeito');
  const caminhada   = document.getElementById('caminhada');
  const alongamento = document.getElementById('alongamento');
  const notes       = document.getElementById('notes');
  const listEl      = document.getElementById('exerciseList');

  function refresh(){
    const d = parseInt(daySelect.value);
    localStorage.setItem('selDay', d);
    [treinoFeito,caminhada,alongamento].forEach(el=>{ el.checked = localStorage.getItem(el.id+'_'+d)==='1'; });
    notes.value = localStorage.getItem('notes_'+d) || '';

    const plan = dayPlan(d);
    listEl.innerHTML = '';
    const info = document.createElement('div'); info.className='small'; info.textContent = plan.note; listEl.appendChild(info);

    plan.list.forEach(pt=>{
      const key = Object.keys(EX).find(k => k.toLowerCase().startsWith(pt.toLowerCase()));
      const data = EX[key] || null;
      const gif = (data && data.gif) ? data.gif : data ? data.fallback : PLACEHOLDER;
      const row = document.createElement('div');
      row.className='exercise';
      row.innerHTML = `
        <img src="${gif}" alt="${key||pt}" onerror="this.onerror=null;this.src='./assets/placeholder.png';">
        <div>
          <div><b>${key || pt}</b></div>
          <div class="small">Foco técnico • RPE 6–8</div>
        </div>
      `;
      listEl.appendChild(row);
    });
    drawChart();
  }

  daySelect.addEventListener('change', refresh);
  [treinoFeito,caminhada,alongamento].forEach(el=>{
    el.addEventListener('change', ()=>{
      const d = daySelect.value;
      localStorage.setItem(el.id+'_'+d, el.checked?'1':'0');
      drawChart();
    });
  });
  document.getElementById('saveDay').addEventListener('click', ()=>{
    const d = daySelect.value; localStorage.setItem('notes_'+d, notes.value); alert('✅ Dia salvo!');
  });

  function drawChart(){
    const c = document.getElementById('progressChart');
    const ctx = c.getContext('2d');
    ctx.clearRect(0,0,c.width,c.height);
    const weeks=[0,0,0,0];
    for(let d=1; d<=30; d++){
      const checked = localStorage.getItem('treinoFeito_'+d)==='1';
      if(checked){ const w=Math.ceil(d/7)-1; weeks[w]++; }
    }
    const maxVal=3, barW=120, gap=30, base=180, x0=40;
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--line');
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--fg');
    ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(30,20); ctx.lineTo(30,base); ctx.lineTo(c.width-10,base); ctx.stroke();
    ctx.font='12px sans-serif';
    for(let i=0;i<=maxVal;i++){
      const y = base - (i/maxVal)*140;
      ctx.fillText(i.toString(), 10, y+4);
      ctx.strokeStyle='rgba(128,128,128,0.15)';
      ctx.beginPath(); ctx.moveTo(30,y); ctx.lineTo(c.width-10,y); ctx.stroke();
    }
    for(let i=0;i<4;i++){
      const h=(weeks[i]/maxVal)*140;
      const x=x0+i*(barW+gap);
      ctx.fillStyle=getComputedStyle(document.body).getPropertyValue('--accent');
      ctx.fillRect(x, base-h, barW, h);
      ctx.fillStyle=getComputedStyle(document.body).getPropertyValue('--fg');
      ctx.fillText('Semana '+(i+1), x+10, base+16);
      ctx.fillText(weeks[i]+'/3', x+barW/2-8, base-h-6);
    }
  }

  refresh();
}
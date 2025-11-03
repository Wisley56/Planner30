const PLACEHOLDER = './public/assets/placeholder.png';
let LIB = [];

export async function initLibrary(){
  if(LIB.length) return;
  const res = await fetch('./public/data/exercises.json');
  LIB = await res.json();
  const bodies = [...new Set(LIB.map(x=>x.bodyPart))].sort();
  const equips = [...new Set(LIB.map(x=>x.equipment))].sort();
  const filterBody = document.getElementById('filterBody');
  const filterEquip = document.getElementById('filterEquip');
  bodies.forEach(b=>{ const o=document.createElement('option'); o.value=b; o.textContent=b; filterBody.appendChild(o); });
  equips.forEach(e=>{ const o=document.createElement('option'); o.value=e; o.textContent=e; filterEquip.appendChild(o); });
  renderLibrary();
}

function renderLibrary(){
  const searchInput = document.getElementById('searchInput');
  const filterBody = document.getElementById('filterBody');
  const filterEquip = document.getElementById('filterEquip');
  const libList = document.getElementById('libList');
  const libCount = document.getElementById('libCount');

  const q = (searchInput.value||'').toLowerCase();
  const fb = filterBody.value;
  const fe = filterEquip.value;
  let arr = LIB.filter(x=> (q==='' || x.name_en.toLowerCase().includes(q)) && (fb==='' || x.bodyPart===fb) && (fe==='' || x.equipment===fe) );

  libCount.textContent = arr.length + ' exercícios encontrados';
  libList.innerHTML = '';
  arr.slice(0,400).forEach(x=>{
    const row = document.createElement('div');
    row.className='exercise';
    row.innerHTML = `
      <img src="${x.gif}" alt="${x.name_en}" onerror="this.onerror=null;this.src='./public/assets/placeholder.png';">
      <div>
        <div><b>${x.name_en}</b> <span class="badge">${x.bodyPart}</span> <span class="badge">${x.equipment}</span></div>
      </div>
    `;
    libList.appendChild(row);
  });
}

export function bindLibraryControls(){
  document.getElementById('searchInput').oninput = renderLibrary;
  document.getElementById('filterBody').onchange = renderLibrary;
  document.getElementById('filterEquip').onchange = renderLibrary;
}
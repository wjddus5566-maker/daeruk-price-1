
let products=[], activeBrand='전체', selected=null;
const won=n=>new Intl.NumberFormat('ko-KR').format(Math.round(Number(n)||0))+'원';
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
async function init(){
  products=window.PRODUCTS||[];
  buildFilters(); render();
  document.querySelector('#q').addEventListener('input',render);
  document.querySelector('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
  document.querySelector('#close').addEventListener('click',closeModal);
  document.querySelector('#pyeong').addEventListener('input',()=>{document.querySelector('#sqm').value='';calc()});
  document.querySelector('#sqm').addEventListener('input',()=>{document.querySelector('#pyeong').value='';calc()});
}
function buildFilters(){
  const brands=['전체',...new Set(products.map(x=>x.brand).filter(Boolean))];
  const el=document.querySelector('#filters');
  el.innerHTML=brands.map(b=>`<button class="filter ${b==='전체'?'active':''}" data-brand="${esc(b)}">${esc(b)}</button>`).join('');
  el.addEventListener('click',e=>{
    const btn=e.target.closest('.filter'); if(!btn)return;
    activeBrand=btn.dataset.brand;
    [...el.children].forEach(x=>x.classList.toggle('active',x===btn)); render();
  });
}
function render(){
  const q=document.querySelector('#q').value.trim().toLowerCase();
  const list=products.filter(p=>(activeBrand==='전체'||p.brand===activeBrand)&&
    (!q||[p.name,p.brand,p.category,p.detail,p.size].join(' ').toLowerCase().includes(q)));
  document.querySelector('#count').textContent=`${list.length}개 제품`;
  document.querySelector('#grid').innerHTML=list.length?list.map(p=>`
    <article class="card" data-id="${p.id}">
      <div class="card-top"><div><div class="brand">${esc(p.brand)}</div><div class="category">${esc(p.category)}</div></div></div>
      <div class="name">${esc(p.name)}</div>
      <div class="spec">${esc(p.detail)} · ${esc(p.size)}</div>
      <div class="price">${won(p.price)} <small style="font-size:12px;color:#657168">/ 평</small></div>
    </article>`).join(''):`<div class="empty">검색 결과가 없습니다.</div>`;
  document.querySelectorAll('.card').forEach(c=>c.onclick=()=>openModal(Number(c.dataset.id)));
}
function openModal(id){
  selected=products.find(p=>p.id===id); if(!selected)return;
  document.querySelector('#dBrand').textContent=selected.brand;
  document.querySelector('#dName').textContent=selected.name;
  document.querySelector('#dMeta').textContent=[selected.category,selected.detail,selected.size].filter(Boolean).join(' · ');
  document.querySelector('#dPrice').textContent=won(selected.price);
  document.querySelector('#pyeong').value=''; document.querySelector('#sqm').value='';
  document.querySelector('#result').textContent='0원';
  document.querySelector('#modal').classList.add('show');
  document.body.style.overflow='hidden';
}
function closeModal(){document.querySelector('#modal').classList.remove('show');document.body.style.overflow=''}
function calc(){
  if(!selected)return;
  const py=parseFloat(document.querySelector('#pyeong').value)||0;
  const sqm=parseFloat(document.querySelector('#sqm').value)||0;
  const pyeong=py>0?py:(sqm>0?sqm/3.3:0);
  document.querySelector('#result').textContent=won(pyeong*selected.price);
  document.querySelector('#basis').textContent=pyeong?`계산 기준: ${pyeong.toFixed(2)}평 × ${won(selected.price)}`:'평수 또는 헤베를 입력하세요.';
}
window.addEventListener('DOMContentLoaded',init);

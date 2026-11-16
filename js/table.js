// Tabel
const tbl=$('#tbl');
let h='<tr><th>×</th>';
for(let i=1;i<=10;i++)h+=`<th data-c="${i}">${i}</th>`;
h+='</tr>';
for(let a=1;a<=10;a++){
  h+=`<tr><th data-r="${a}">${a}</th>`;
  for(let b=1;b<=10;b++)h+=`<td tabindex="0" data-a="${a}" data-b="${b}">${a*b}</td>`;
  h+='</tr>';
}
tbl.innerHTML=h;
function pick(td){
  const a=+td.dataset.a,b=+td.dataset.b;
  tbl.querySelectorAll('.sel,.r').forEach(x=>x.classList.remove('sel','r'));
  tbl.querySelectorAll(`td[data-a="${a}"],td[data-b="${b}"]`).forEach(x=>x.classList.add('r'));
  tbl.querySelector(`th[data-r="${a}"]`).classList.add('r');
  tbl.querySelector(`th[data-c="${b}"]`).classList.add('r');
  td.classList.remove('r');td.classList.add('sel','show');
  $('#info').textContent=`${a} × ${b} = ${a*b}`;
}
tbl.addEventListener('click',e=>{const t=e.target.closest('td');if(t)pick(t)});
tbl.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const t=e.target.closest('td');if(t){e.preventDefault();pick(t)}}});
$('#hideBtn').onclick=function(){
  const hid=tbl.classList.toggle('hide');
  tbl.querySelectorAll('.show').forEach(x=>x.classList.remove('show'));
  this.textContent=hid?'Buka semua jawaban':'Tutup jawaban';
};

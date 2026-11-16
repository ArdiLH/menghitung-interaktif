// Latihan
const sel=$('#sel');
sel.innerHTML='<option value="0">Semua (1–10)</option>'+Array.from({length:10},(_,i)=>`<option value="${i+1}">Tabel ${i+1}</option>`).join('');
let S;
function resetQ(){S={a:0,b:0,sc:0,tot:0,st:0,wrong:new Set()};$('#fb').textContent='';$('#fb').className='fb';$('#wr').textContent='';stats();next()}
function stats(){$('#sc').textContent=S.sc;$('#tot').textContent=S.tot;$('#st').textContent=S.st}
function next(){
  const f=+sel.value;
  S.a=f||rnd(10);S.b=rnd(10);
  $('#q').textContent=`${S.a} × ${S.b} = ?`;
  $('#in').value='';$('#in').focus();
}
function check(){
  const v=$('#in').value;if(v==='')return;
  const fb=$('#fb');S.tot++;
  if(+v===S.a*S.b){S.sc++;S.st++;fb.textContent=`Benar! ${S.a} × ${S.b} = ${S.a*S.b}`;fb.className='fb ok'}
  else{S.st=0;S.wrong.add(`${S.a}×${S.b}=${S.a*S.b}`);fb.textContent=`Belum tepat. ${S.a} × ${S.b} = ${S.a*S.b}`;fb.className='fb no'}
  $('#wr').textContent=S.wrong.size?'Perlu diulang: '+[...S.wrong].join(', '):'';
  stats();next();
}
$('#chk').onclick=check;
$('#in').addEventListener('keydown',e=>{if(e.key==='Enter')check()});
sel.onchange=resetQ;$('#reset').onclick=resetQ;
resetQ();

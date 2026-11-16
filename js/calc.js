// Hitung langkah demi langkah
const NM=['satuan','puluhan','ratusan','ribuan','puluhan ribu','ratusan ribu','jutaan','puluhan juta'];
const dig=n=>String(n).split('').reverse().map(Number);
const fmt=n=>n.toLocaleString('id-ID');
let op='+';
document.querySelectorAll('#ops button').forEach(b=>b.onclick=()=>{
  op=b.dataset.o;
  document.querySelectorAll('#ops button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  $('#sym').textContent=b.textContent.trim()[0];
  run();
});

function add(a,b){
  const A=dig(a),B=dig(b),n=Math.max(A.length,B.length),r=[],st=[];let c=0;
  for(let i=0;i<n;i++){
    const da=A[i]||0,db=B[i]||0,s=da+db+c;
    let t=`Kolom ${NM[i]}: ${da} + ${db}${c?' + '+c+' (simpanan)':''} = ${s}.`;
    if(s>=10)t+=i<n-1?` Tulis ${s%10}, simpan 1 untuk kolom berikutnya.`:` Tulis ${s%10}, angka 1 ditulis di depan.`;
    else t+=` Tulis ${s}.`;
    st.push(t);r.unshift(s%10);c=s>=10?1:0;
  }
  if(c)r.unshift(1);
  st.push(`Baca hasil dari kiri ke kanan: ${r.join('')}.`);
  return{st,ans:fmt(a+b)};
}
function sub(a,b){
  const st=[];let neg=false;
  if(a<b){neg=true;st.push(`${fmt(a)} lebih kecil dari ${fmt(b)}. Kita hitung ${fmt(b)} − ${fmt(a)}, lalu hasilnya diberi tanda minus.`);[a,b]=[b,a]}
  const A=dig(a),B=dig(b);let bo=0;
  for(let i=0;i<A.length;i++){
    const da=A[i],db=B[i]||0;let top=da-bo;
    let t=`Kolom ${NM[i]}: ${da}${bo?' − 1 (dipinjam kolom ini)':''}${bo?' = '+top:''}, dikurangi ${db}.`;
    if(top<db){top+=10;t+=` ${top-10} lebih kecil dari ${db}, jadi pinjam 10 dari kolom sebelahnya → ${top}. ${top} − ${db} = ${top-db}.`;bo=1}
    else{t+=` ${top} − ${db} = ${top-db}.`;bo=0}
    st.push(t);
  }
  const v=a-b;
  st.push(`Gabungkan semua digit hasil${neg?' dan beri tanda minus':''}: ${neg?'−':''}${fmt(v)}.`);
  return{st,ans:(neg?'−':'')+fmt(v)};
}
function mul(a,b){
  const B=dig(b),st=[],parts=[];
  B.forEach((d,i)=>{
    const p=a*d*10**i;
    let t=`Kolom ${NM[i]} (angka ${d}): ${fmt(a)} × ${d} = ${fmt(a*d)}.`;
    if(i)t+=` Karena posisi ${NM[i]}, tambahkan ${i} nol → ${fmt(p)}.`;
    st.push(t);parts.push(p);
  });
  if(parts.length>1)st.push(`Jumlahkan semua hasil: ${parts.map(fmt).join(' + ')} = ${fmt(a*b)}.`);
  else st.push(`Hasil akhirnya ${fmt(a*b)}.`);
  return{st,ans:fmt(a*b)};
}
function div(a,b){
  if(b===0)return{err:'Tidak bisa membagi dengan 0.'};
  const D=String(a).split('').map(Number),st=[];let rem=0,q='';
  D.forEach((d,i)=>{
    rem=rem*10+d;const qd=Math.floor(rem/b);
    let t=(i?`Turunkan angka ${d} → `:`Mulai dari angka ${d} → `)+`${rem}. `;
    t+=qd?`${rem} ÷ ${b} = ${qd}, karena ${b} × ${qd} = ${b*qd}. Sisa ${rem-b*qd}.`:`${b} belum muat di ${rem}, tulis 0. Sisa ${rem}.`;
    rem-=b*qd;q+=qd;st.push(t);
  });
  const Q=Number(q);
  st.push(rem?`Hasil bagi ${fmt(Q)}, sisa ${rem}. Cek: ${fmt(b)} × ${fmt(Q)} + ${rem} = ${fmt(a)}.`:`Habis dibagi. Cek: ${fmt(b)} × ${fmt(Q)} = ${fmt(a)}.`);
  return{st,ans:fmt(Q)+(rem?` sisa ${rem}`:'')};
}
function run(){
  const out=$('#out'),sa=$('#na').value.trim(),sb=$('#nb').value.trim();
  if(!/^\d+$/.test(sa)||!/^\d+$/.test(sb)){out.innerHTML='<p class="err">Isi kedua kotak dengan angka bulat (tanpa koma atau tanda minus).</p>';return}
  const a=+sa,b=+sb,sym={'+':'+','-':'−','*':'×','/':'÷'}[op];
  const r={'+':add,'-':sub,'*':mul,'/':div}[op](a,b);
  if(r.err){out.innerHTML=`<p class="err">${r.err}</p>`;return}
  out.innerHTML=`<div class="res">${fmt(a)} ${sym} ${fmt(b)} = ${r.ans}</div><ol class="steps">${r.st.map((s,i)=>`<li${i===r.st.length-1?' class="last"':''}>${s}</li>`).join('')}</ol>`;
}
$('#go').onclick=run;
['#na','#nb'].forEach(s=>$(s).addEventListener('keydown',e=>{if(e.key==='Enter')run()}));
run();

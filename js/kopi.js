// ===== Pengaturan traktir kopi (ubah di sini) =====
const KOPI = {
  nama: 'ARDI LUKMANUL HAKIM',
  rekening: '6801178160',
  tampilan: 'keduanya',   // 'keduanya' | 'kotak' (hanya kotak di bawah) | 'popup' (hanya tombol melayang)
  autoBuka: true,         // popup muncul sendiri satu kali per kunjungan
  autoBukaDetik: 90       // setelah berapa detik
};


// ===== Gaya (disuntikkan otomatis, tidak perlu mengubah style.css) =====
const KOPI_CSS = `
.kopi{margin-top:18px;background:var(--card);border:2px dashed var(--ink);border-radius:14px;padding:16px;display:flex;gap:14px;align-items:center}
.kopi[hidden],.kofab[hidden],.kmodal[hidden]{display:none}
.kisi{flex:1;min-width:0}
.kwrap h2{margin:0 0 4px;font-size:1.15rem;font-weight:800}
.kwrap p{margin:0 0 12px;color:var(--mut)}
.kwrap .note{margin:8px 0 12px;min-height:1.3rem;color:var(--ok);font-weight:600}
.kopi .note{margin-bottom:0}
.rek{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;background:var(--soft);border-radius:10px;padding:12px 14px}
.rek .bank{display:block;font-size:.85rem;color:var(--mut)}
.rek strong{font-size:1.5rem;letter-spacing:.06em;font-variant-numeric:tabular-nums}
.kcup{display:inline-block;width:56px;height:56px;flex:none}
.kcup.big{display:block;width:96px;height:96px;margin:0 auto 6px}
.kcup svg{width:100%;height:100%;overflow:visible}
.kcup .cup{fill:var(--hi);stroke:var(--ink);stroke-width:3;stroke-linejoin:round}
.kcup .hdl{fill:none;stroke:var(--ink);stroke-width:3;stroke-linecap:round}
.kcup .cof{fill:var(--ink)}
.kcup .stm{fill:none;stroke:var(--mut);stroke-width:3;stroke-linecap:round;opacity:0}
.kofab{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:20;display:flex;align-items:center;gap:6px;font:inherit;font-weight:600;font-size:.9rem;background:var(--hi);color:var(--hiInk);border:2px solid var(--ink);border-radius:999px;padding:4px 16px 4px 8px;cursor:pointer;box-shadow:3px 3px 0 var(--ink)}
.kofab .kcup{width:40px;height:40px}
.kofab:focus-visible,.kmodal button:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.kmodal{position:fixed;inset:0;z-index:30;background:rgba(10,20,30,.6);display:grid;place-items:center;padding:16px}
.kcard{background:var(--card);border:2px solid var(--ink);border-radius:16px;padding:20px;width:100%;max-width:380px;text-align:center}
.kcard .rek{text-align:left;margin-bottom:0}
@media (max-width:480px){.kopi{flex-direction:column;align-items:flex-start}}
@media (prefers-reduced-motion:no-preference){
.kcup .stm{animation:uap 2.4s ease-in infinite}
.kcup .s2{animation-delay:.8s}.kcup .s3{animation-delay:1.6s}
@keyframes uap{0%{transform:translateY(6px);opacity:0}25%{opacity:.9}100%{transform:translateY(-10px);opacity:0}}
.kofab{animation:ngambang 3s ease-in-out infinite}
@keyframes ngambang{50%{transform:translateY(-4px)}}
.kmodal:not([hidden]) .kcard{animation:muncul .28s cubic-bezier(.2,1.4,.4,1) both}
@keyframes muncul{from{opacity:0;transform:scale(.9) translateY(12px)}}
}
@media (prefers-reduced-motion:reduce){.kcup .stm{opacity:.7}}
`;
const st = document.createElement('style');
st.textContent = KOPI_CSS;
document.head.appendChild(st);

// ===== Markup (disuntikkan otomatis, tidak perlu mengubah index.html) =====
document.querySelector('main').insertAdjacentHTML('beforeend', `
<aside class="kopi kwrap" id="kotakKopi" aria-labelledby="kopiJudul">
<div class="kcup" data-cup aria-hidden="true"></div>
<div class="kisi">
<h2 id="kopiJudul">Traktir kopi ☕</h2>
<p>Kalau web ini bermanfaat dan membantu belajar, boleh traktir kopi untuk pembuatnya. Terima kasih banyak!</p>
<div class="rek">
<div><span class="bank">Transfer BCA a.n. <span class="k-nama"></span></span><strong class="k-rek"></strong></div>
<button class="btn salin" type="button">Salin nomor</button>
</div>
<p class="note salinInfo" aria-live="polite"></p>
</div>
</aside>
`);
document.body.insertAdjacentHTML('beforeend', `
<button class="kofab" id="kofab" type="button" aria-haspopup="dialog">
<span class="kcup" data-cup aria-hidden="true"></span><span>Traktir kopi</span>
</button>

<div class="kmodal" id="kmodal" hidden>
<div class="kcard kwrap" role="dialog" aria-modal="true" aria-labelledby="kmJudul">
<div class="kcup big" data-cup aria-hidden="true"></div>
<h2 id="kmJudul">Traktir kopi ☕</h2>
<p>Kalau web ini bermanfaat dan membantu, boleh traktir kopi untuk pembuatnya. Berapa pun sangat berarti.</p>
<div class="rek">
<div><span class="bank">Transfer BCA a.n. <span class="k-nama"></span></span><strong class="k-rek"></strong></div>
<button class="btn salin" type="button">Salin nomor</button>
</div>
<p class="note salinInfo" aria-live="polite"></p>
<button class="btn alt" id="ktutup" type="button" style="width:100%">Nanti saja</button>
</div>
</div>
`);

const CANGKIR = '<svg viewBox="0 0 64 64"><path class="stm s1" d="M22 22c-4-4 3-7-1-12"/><path class="stm s2" d="M32 22c-4-4 3-7-1-12"/><path class="stm s3" d="M42 22c-4-4 3-7-1-12"/><path class="cup" d="M12 28h34v12a14 14 0 0 1-14 14h-6a14 14 0 0 1-14-14z"/><ellipse class="cof" cx="29" cy="28" rx="17" ry="3"/><path class="hdl" d="M46 31h3a6 6 0 0 1 0 12h-5"/><path class="hdl" d="M10 58h38"/></svg>';
document.querySelectorAll('[data-cup]').forEach(el => { el.innerHTML = CANGKIR; });
document.querySelectorAll('.k-nama').forEach(el => { el.textContent = KOPI.nama; });
document.querySelectorAll('.k-rek').forEach(el => { el.textContent = KOPI.rekening; });

const kotak = document.querySelector('#kotakKopi'), fab = document.querySelector('#kofab'), modal = document.querySelector('#kmodal');
kotak.hidden = KOPI.tampilan === 'popup';
fab.hidden = KOPI.tampilan === 'kotak';

// Salin nomor rekening
document.querySelectorAll('.salin').forEach(btn => btn.onclick = () => {
  const info = btn.closest('.kwrap').querySelector('.salinInfo');
  const no = KOPI.rekening;
  const ok = () => { info.textContent = 'Nomor rekening tersalin. Terima kasih!'; };
  const gagal = () => { info.textContent = 'Gagal menyalin. Salin manual: ' + no; };
  const cadangan = () => {
    const t = document.createElement('textarea');
    t.value = no; document.body.appendChild(t); t.select();
    try { document.execCommand('copy') ? ok() : gagal(); } catch (e) { gagal(); }
    t.remove();
  };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(no).then(ok, cadangan);
  else cadangan();
});

// Popup
let terakhirFokus = null;
function buka() {
  terakhirFokus = document.activeElement;
  modal.hidden = false;
  modal.querySelector('.salinInfo').textContent = '';
  document.querySelector('#ktutup').focus();
}
function tutup() {
  modal.hidden = true;
  if (terakhirFokus && terakhirFokus.focus) terakhirFokus.focus();
}
fab.onclick = buka;
document.querySelector('#ktutup').onclick = tutup;
modal.addEventListener('click', e => { if (e.target === modal) tutup(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) tutup(); });

// Muncul sendiri satu kali per kunjungan
if (KOPI.tampilan !== 'kotak' && KOPI.autoBuka) {
  let sudah = false;
  try { sudah = sessionStorage.getItem('kopiSudah') === '1'; } catch (e) {}
  if (!sudah) setTimeout(() => {
    if (modal.hidden) buka();
    try { sessionStorage.setItem('kopiSudah', '1'); } catch (e) {}
  }, KOPI.autoBukaDetik * 1000);
}

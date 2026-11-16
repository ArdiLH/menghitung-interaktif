// ===== Pengaturan traktir kopi (ubah di sini) =====
const KOPI = {
  nama: 'ARDI LUKMANUL HAKIM',
  rekening: '6801178160',
  tampilan: 'keduanya',   // 'keduanya' | 'kotak' | 'popup'
  autoBuka: true,
  autoBukaDetik: 90
};

const CANGKIR = '<svg viewBox="0 0 64 64"><path class="stm s1" d="M22 22c-4-4 3-7-1-12"/><path class="stm s2" d="M32 22c-4-4 3-7-1-12"/><path class="stm s3" d="M42 22c-4-4 3-7-1-12"/><path class="cup" d="M12 28h34v12a14 14 0 0 1-14 14h-6a14 14 0 0 1-14-14z"/><ellipse class="cof" cx="29" cy="28" rx="17" ry="3"/><path class="hdl" d="M46 31h3a6 6 0 0 1 0 12h-5"/><path class="hdl" d="M10 58h38"/></svg>';
document.querySelectorAll('[data-cup]').forEach(el => { el.innerHTML = CANGKIR; });
document.querySelectorAll('.k-nama').forEach(el => { el.textContent = KOPI.nama; });
document.querySelectorAll('.k-rek').forEach(el => { el.textContent = KOPI.rekening; });

const kotak = $('#kotakKopi'), fab = $('#kofab'), modal = $('#kmodal');
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
  $('#ktutup').focus();
}
function tutup() {
  modal.hidden = true;
  if (terakhirFokus && terakhirFokus.focus) terakhirFokus.focus();
}
fab.onclick = buka;
$('#ktutup').onclick = tutup;
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

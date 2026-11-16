# Belajar Hitung

Web sederhana untuk menghafal tabel perkalian 1–10 dan belajar hitung dasar (tambah, kurang, kali, bagi) langkah demi langkah. Dibuat dengan HTML, CSS, dan JavaScript biasa, tanpa framework dan tanpa build.

## Struktur folder

```
belajar-hitung/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── utils.js    # fungsi bantu ($, rnd)
│   ├── tabs.js     # pindah tab
│   ├── table.js    # tabel perkalian
│   ├── quiz.js     # latihan perkalian
│   ├── calc.js     # hitung langkah demi langkah
│   └── kopi.js     # traktir kopi (kotak, popup, salin nomor)
├── .gitignore
└── README.md
```

Urutan `<script>` di `index.html` penting: `utils.js` harus dimuat paling awal.

## Menjalankan di komputer

Buka `index.html` di browser, atau di VS Code pasang ekstensi **Live Server**, lalu klik kanan `index.html` dan pilih **Open with Live Server**.

## Publish ke GitHub Pages

1. Buat repository baru di github.com, misalnya `belajar-hitung` (Public, tanpa README karena sudah ada).
2. Di terminal VS Code (Ctrl+`), dari dalam folder proyek:

```bash
git init
git add .
git commit -m "Versi pertama Belajar Hitung"
git branch -M main
git remote add origin https://github.com/USERNAME/belajar-hitung.git
git push -u origin main
```

Ganti `USERNAME` dengan nama akun GitHub Anda.

3. Di GitHub buka **Settings → Pages**. Pada **Build and deployment**, pilih **Source: Deploy from a branch**, branch **main**, folder **/ (root)**, lalu **Save**.
4. Tunggu 1–2 menit. Alamat situs: `https://USERNAME.github.io/belajar-hitung/`

## Mengubah dan memperbarui

Setelah mengedit file, kirim perubahan dengan:

```bash
git add .
git commit -m "Jelaskan perubahan Anda"
git push
```

GitHub Pages akan memperbarui situsnya otomatis.

## Pengaturan traktir kopi

Buka `js/kopi.js`, bagian paling atas (`KOPI`):

- `nama` dan `rekening`: data rekening yang tampil.
- `tampilan`: `'keduanya'` (kotak di bawah + tombol melayang dengan popup), `'kotak'` (hanya kotak), atau `'popup'` (hanya tombol melayang).
- `autoBuka` dan `autoBukaDetik`: popup muncul sendiri satu kali per kunjungan setelah sekian detik. Atur `autoBuka: false` kalau tidak mau.

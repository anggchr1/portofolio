# Portofolio Muhammad Angga Choirul

Portofolio pribadi: ML × Flutter Developer. Dibangun dengan React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion.

Live: `https://anggchr1.github.io/portofolio/` (deploy otomatis via GitHub Actions tiap push ke `main`).

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`. Untuk cek di HP (satu WiFi): `npm run dev -- --host`, lalu buka URL Network di browser HP.

## Build

```bash
npm run build
npm run preview
```

## Struktur

```text
.github/workflows/deploy.yml      # deploy otomatis ke GitHub Pages
public/
  CV-Muhammad-Angga-Choirul.pdf   # file CV (tombol Lihat/Unduh + modal pratinjau)
  foto-profil.png                  # foto formal (avatar hero)
  foto-tentang.jpg                 # foto selfie (section Tentang)
  sertifikat/                      # PDF sertifikat Dicoding + Pijak
src/
  App.tsx                          # routing hash (#/, #/proyek/:id, #/blog/:slug, #/admin)
  components/site/                 # section dan halaman:
                                   # Navbar, Hero, Content (Fokus/Proyek/Skills),
                                   # Sections (Tentang/Pengalaman/Saat Ini),
                                   # Demo, Certificates, Blog, More (Layanan/Testimoni/FAQ),
                                   # Comments, ProjectPage, Contact, Photo, Admin
  data/
    portfolio.ts                   # konten: proyek, pengalaman, skill, sertifikat,
                                   # repo GitHub, blog, layanan, FAQ, Formspree, helper asset()
    store.ts                       # localStorage + kredensial admin (hash, lihat bawah)
```

## Admin

Klik logo `angga.choirul` di footer, lalu login. Username default `admin`.
Password TIDAK disimpan plaintext di kode, yang disimpan hanya hash-nya
(`ADMIN_PASS_HASH` di `src/data/store.ts`), jadi tidak bisa dibaca dari View Source.

Ganti password: minta hash baru (jangan hitung sendiri), lalu ganti nilai
`ADMIN_PASS_HASH`. Sesi admin berakhir saat tab browser ditutup.

Di dalam: kelola komentar masuk (hapus yang kasar/spam), CRUD testimoni,
tambah/ubah/hapus sertifikat (bisa upload PDF maks 2,5 MB), CRUD pengalaman,
dan ubah level keahlian. Semua perubahan langsung tampil di situs.

Catatan jujur soal keamanan: situs ini 100% frontend tanpa server, jadi data
admin dan komentar tersimpan di `localStorage` browser masing-masing perangkat
(antar-pengunjung tidak saling berbagi data). Login admin menghentikan pembaca
iseng, bukan peretas serius. Karena tidak ada data bersama di server, tidak ada
yang bisa dirusak dari jarak jauh.

## Form kontak

Tanpa backend: tombol Kirim membuka aplikasi email dengan pesan terisi otomatis.
Untuk pengiriman langsung, isi `FORMSPREE_ENDPOINT` di `src/data/portfolio.ts`
dengan ID gratis dari formspree.io.

## Deploy (GitHub Pages, gratis)

Repo: `anggchr1/portofolio` (Public). Setiap push ke `main` otomatis di-build
dan publish oleh workflow ke `https://anggchr1.github.io/portofolio/`.

```bash
git add .
git commit -m "pesan perubahan"
git push
```

Lalu Settings → Pages → Source: GitHub Actions (cukup sekali saja).

Penting: `base: '/portofolio/'` di `vite.config.ts` harus sama dengan nama repo.
Semua file `public/` wajib diakses lewat helper `asset()` agar path-nya ikut base.
Kalau repo diganti nama, ubah `base` tersebut lalu push ulang.

# Portofolio Muhammad Angga Choirul

Portofolio pribadi: ML × Flutter Developer. Dibangun dengan React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion.

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
public/
  CV-Muhammad-Angga-Choirul.pdf   # file CV (tombol Lihat/Unduh)
  foto-profil.png                  # foto formal (avatar hero)
  foto-tentang.jpg                 # foto selfie (section Tentang)
  sertifikat/                      # PDF sertifikat Dicoding + Pijak
src/
  App.tsx                          # routing hash (#/, #/proyek/:id, #/blog/:slug, #/admin)
  components/site/                 # section dan halaman (Navbar, Hero, Demo, Admin, ...)
  data/
    portfolio.ts                   # konten: proyek, pengalaman, skill, sertifikat, blog, FAQ
    store.ts                       # localStorage + kredensial admin (ganti di sini)
```

## Admin

Klik logo `angga.choirul` di footer, lalu login (lihat `ADMIN_USER` / `ADMIN_PASS` di `src/data/store.ts`, wajib diganti).
Kelola komentar, testimoni, sertifikat, pengalaman, dan level keahlian. Data tersimpan di
localStorage browser.

## Form kontak

Tanpa backend: tombol Kirim membuka aplikasi email dengan pesan terisi otomatis.
Untuk pengiriman langsung, isi `FORMSPREE_ENDPOINT` di `src/data/portfolio.ts` dengan
ID gratis dari formspree.io.

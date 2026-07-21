# Website Komunitas — Akar Harapan

Starter website organisasi/komunitas dibangun dengan **Next.js (React) +
Tailwind CSS v4 + Supabase**. Sudah termasuk halaman publik dan panel admin
sederhana untuk mengelola berita, program, galeri, pesan masuk, dan
pendaftaran relawan — tanpa perlu sentuh kode untuk update konten
sehari-hari.

> Nama "Akar Harapan", warna, dan teks di dalamnya hanyalah **contoh**.
> Ganti sesuai identitas organisasimu — lihat bagian *Mengganti Identitas*
> di bawah.

## Fitur

**Publik:** Beranda, Tentang Kami, Program, Berita, Galeri, Kontak (form),
Jadi Relawan (form pendaftaran).

**Admin (`/admin`):** Login, dashboard ringkasan, CRUD berita, CRUD
program, unggah/hapus foto galeri, lihat pesan kontak, kelola status
pendaftar relawan.

Fitur donasi sengaja belum disertakan — bisa ditambahkan belakangan setelah
kamu siap dengan rekening/payment gateway resmi.

## 1. Jalankan di komputer sendiri

```bash
npm install
cp .env.example .env.local   # lalu isi dengan kredensial Supabase (lihat langkah 2)
npm run dev
```

Buka `http://localhost:3000`.

## 2. Setup Supabase (gratis)

1. Buat project baru di [supabase.com](https://supabase.com) (kalau belum
   punya project untuk website ini).
2. Buka **SQL Editor** di dashboard Supabase, klik **New query**, lalu
   copy-paste seluruh isi file [`supabase/schema.sql`](./supabase/schema.sql)
   dari project ini. Klik **Run**. Ini akan membuat semua tabel yang
   dibutuhkan (`posts`, `programs`, `gallery_items`, `contact_messages`,
   `volunteers`) beserta aturan keamanannya (RLS), dan storage bucket
   `media` untuk gambar.
3. Buka **Project Settings > API**, salin:
   - `Project URL` → isi ke `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → isi ke `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Buat akun admin: buka **Authentication > Users > Add user**, isi email
   dan password kamu. Akun ini yang dipakai untuk login di `/admin/login`.
   (Halaman admin **tidak** menyediakan form pendaftaran akun baru — ini
   sengaja, supaya hanya kamu yang bisa jadi admin.)

## 3. Deploy gratis ke Vercel

1. Push project ini ke repository GitHub (buat repo baru, lalu
   `git init && git add . && git commit -m "init" && git remote add origin <url-repo> && git push -u origin main`).
2. Buka [vercel.com](https://vercel.com), daftar/login pakai akun GitHub.
3. Klik **Add New > Project**, pilih repo yang baru kamu push.
4. Saat konfigurasi, buka bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   (nilainya sama seperti di `.env.local`)
5. Klik **Deploy**. Setelah selesai (±1-2 menit), website kamu online di
   `nama-project.vercel.app`.
6. Setiap kali kamu `git push`, Vercel otomatis deploy ulang versi terbaru.

**Domain sendiri (opsional):** kalau punya domain `.org`/`.id`/`.com`, buka
**Project Settings > Domains** di Vercel dan ikuti instruksinya untuk
menghubungkan domain tersebut. Tanpa domain sendiri pun subdomain
`.vercel.app` gratis sudah bisa dipakai secara normal.

Batas free tier Vercel (100GB bandwidth/bulan) dan Supabase (500MB
database, 1GB storage) jauh lebih dari cukup untuk website komunitas skala
kecil-menengah.

## 4. Mengganti identitas organisasi

- **Nama & teks:** cari-ganti "Akar Harapan" di `src/components/Navbar.tsx`,
  `src/components/Footer.tsx`, `src/app/layout.tsx` (metadata), dan
  `src/app/page.tsx` (hero).
- **Logo:** ganti teks logo di `Navbar.tsx`/`Footer.tsx` dengan `<img>`
  logo kamu, taruh filenya di folder `public/`.
- **Warna:** semua warna diatur terpusat di `src/app/globals.css` bagian
  `@theme` (variabel `--color-forest-*`, `--color-marigold-*`,
  `--color-clay-*`). Ubah nilai hex-nya untuk mengganti seluruh skema warna
  website sekaligus.
- **Font:** diatur di `src/app/layout.tsx` (saat ini Fraunces + Plus
  Jakarta Sans + IBM Plex Mono dari Google Fonts).
- **Konten halaman Tentang, pengurus, statistik dampak:** masih berupa teks
  statis di `src/app/tentang/page.tsx` dan `src/app/page.tsx` — edit
  langsung sesuai data organisasimu.

## Struktur folder singkat

```
src/app/              → halaman publik (App Router)
src/app/admin/        → panel admin (dilindungi login, lihat src/middleware.ts)
src/components/       → komponen UI publik
src/components/admin/ → komponen UI admin
src/lib/supabase/     → koneksi ke Supabase (client & server)
src/lib/actions.ts        → server actions form publik (kontak, relawan)
src/lib/admin-actions.ts  → server actions CRUD admin
supabase/schema.sql   → skema database, jalankan di Supabase SQL Editor
```

## Menambah fitur donasi nanti

Saat siap, tabel & halaman baru bisa ditambahkan mengikuti pola yang sama
seperti `programs`/`posts`: buat tabel di Supabase, buat halaman
`/donasi`, dan hubungkan ke payment gateway (mis. Midtrans/Xendit) atau
cukup tampilkan info rekening + form konfirmasi transfer manual untuk
versi paling sederhana.

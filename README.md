# bfreshgigi.com — B Fresh Dental Care

Rework situs publik **B Fresh Dental Care** (bfreshgigi.com) — jaringan klinik gigi
15 cabang di 5 kota Jawa Timur. Dibangun ulang total dari WordPress (Elementor +
Slider Revolution, terindikasi ter-compromise spam judi) menjadi **Astro static site**.

## Stack

- **Astro 6** static build + Tailwind CSS v4 (design token dari warna logo resmi)
- Konten via **Content Collections**: `blog` (820 MDX ter-audit medis), `services` (9), `doctors` (5 profil)
- Data operasional via **JSON hasil ekstraksi DB produksi** (`src/data/`): 15 cabang,
  9 dokter spesialis, testimoni NPS, promo aktif, FAQ, quiz 16 soal, galeri 65 kasus
- Interaktivitas vanilla JS (quiz, locator, tabs, mobile menu) — tanpa framework island berat
- Booking = redirect ke `app.bfreshgigi.com/reservasi` (sistem internal bfdc_app)
- Deploy: static files → VPS Hostinger (HestiaCP) — tanpa Node runtime

## Perintah

```bash
npm install
npm run dev      # dev server
npm run build    # dist/
npm run preview  # preview build
```

## Struktur penting

```
src/
├── content/          # MDX: blog/ services/ doctors/ (draft:true = tidak di-build)
├── data/             # JSON hasil ekstraksi DB + siteConfig + taksonomi layanan
├── components/       # sections/, cards/, ui/, layout/
├── pages/            # index + layanan/dokter/cabang/galeri/promo/informasi/harga/tentang/karir/kontak
└── styles/global.css # design token (@theme) — palet logo + accent CTA
```

## Sumber data konten (audit 10 Sep 2026)

| Data | Sumber |
|---|---|
| 15 cabang + koordinat | `ssi_bfdc_app.hospital` + `ssi_bfdc_hrm.cabangs` |
| Layanan + harga | `ssi_bfdc_app.payment_category` (150 treatment) |
| Dokter + spesialis | `ssi_bfdc_app.doctor` (9 Sp. aktif) |
| Testimoni | `ssi_bfdc_mkt.nps` (1.620 responden, 95,8% ≥8) |
| Promo aktif | `ssi_bfdc_mkt.promos` |
| FAQ | `ssi_bfdc_mkt.faqs` (IG DM asli) |
| Blog 820 MDX + webp | migrasi WordPress lama (ter-audit keamanan medis) |
| Galeri 65 kasus | galeri.bfreshgigi.com (dilebur ke /galeri) |

## Catatan deploy

- **API publik dinamis**: halaman cabang (jadwal dokter live) & /promo meng-fetch
  `PUBLIC_API_URL` (default `https://app.bfreshgigi.com/api/public/*` — endpoint ada
  di repo bfdc_app, jalankan `git pull` + `php artisan cache:clear` di server app).
  Untuk pengembangan lokal: `.env` berisi `PUBLIC_API_URL=https://bfdc_app.test`
  (gitignored). **Saat build produksi: hapus `.env`** (atau set ke URL produksi).
- Build ulang data: jalankan ulang skrip ekstraksi DB (lihat `projects/bfdc-web.md` di memory opencode)
- **301 redirect** level server (nginx/Apache) untuk URL WordPress lama — sebagian
  sudah disiapkan stub meta-refresh di `src/pages/{perjalanan,visi-misi,misi-sosial,cabang-klinik,blog}`
- Saat cutover: **matikan WordPress lama total** (ter-hack — jangan reuse file/servernya)
- Sitemap: `sitemap-index.xml` otomatis — resubmit ke Google Search Console

## Identitas

- Badan hukum: PT Bertumbuh Melejit Berkah
- CS reservasi: 0857-9238-2539 · marketing@bfreshgigi.com
- Karir: hrm.bfreshgigi.com/lowongan

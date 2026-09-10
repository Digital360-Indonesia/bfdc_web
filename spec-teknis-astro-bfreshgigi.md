# Technical Spec — Rebuild bfreshgigi.com dengan Astro
*Untuk developer. Referensi desain/UX ada di `spec-desain-bfreshgigi-rework.md`.*

---

## 1. Tech Stack

| Layer | Pilihan | Alasan |
|---|---|---|
| Framework | **Astro** (latest stable) | Output static HTML, cocok untuk marketing site, SEO-friendly by default |
| Styling | **Tailwind CSS** (via `@astrojs/tailwind`) | Cepat implementasi design token (warna/tipografi) dari spec desain, kecil di production karena purge otomatis |
| Interaktivity | Astro Islands — pakai **Alpine.js** atau **Astro + minimal vanilla JS** untuk komponen interaktif (locator, kuis, carousel) | Hindari React/Vue penuh kalau interaktivitasnya ringan — jaga bundle size kecil |
| Content | **Astro Content Collections** (`src/content/`) untuk: layanan, dokter, cabang, blog/artikel, testimoni | Type-safe, gampang di-generate dari data internal (CSV/JSON/Markdown) tanpa perlu CMS dulu |
| Forms/Booking | Tetap redirect ke sistem existing `app.bfreshgigi.com`, ATAU embed via iframe/API kalau developer app internal bisa expose endpoint — **perlu keputusan Anda**, lihat §6 |
| Images | `astro:assets` (built-in image optimization) | Auto resize/format (WebP/AVIF), penting karena banyak foto dokter/galeri/klinik |
| Deployment target | **Static build** (`astro build` → output `dist/`) di-serve lewat Apache/nginx di VPS Hostinger (HestiaCP) yang sudah Anda kelola | Tidak butuh Node runtime untuk hosting produksi — cukup static file, ringan, konsisten dengan setup VPS yang sudah ada |
| Search engine / analytics | `astro-seo` atau manual `<head>` component + sitemap integration `@astrojs/sitemap` | Wajib karena situs lama sudah punya SEO history sejak 2009, jangan sampai drop |

---

## 2. Struktur Folder (usulan)

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── StickyBookingBar.astro     # sticky CTA, persistent di semua halaman
│   │   └── WhatsAppFloat.astro
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── TrustBar.astro             # angka cabang/dokter/tahun berdiri
│   │   ├── BranchLocator.astro        # dropdown/search cabang by kota
│   │   ├── ServiceGrid.astro
│   │   ├── DoctorGrid.astro
│   │   ├── DentalQuiz.astro           # kuis kesehatan gigi (island interaktif)
│   │   ├── Testimonials.astro
│   │   ├── GalleryTabs.astro
│   │   ├── BlogPreview.astro
│   │   └── NewsletterCTA.astro
│   ├── cards/
│   │   ├── ServiceCard.astro
│   │   ├── DoctorCard.astro
│   │   ├── BranchCard.astro
│   │   └── TestimonialCard.astro
│   └── ui/
│       ├── Button.astro
│       ├── Badge.astro
│       └── SectionHeading.astro
├── content/
│   ├── config.ts                       # schema Content Collections
│   ├── services/                       # 1 file per layanan (markdown/mdx)
│   ├── doctors/                        # 1 file per dokter
│   ├── branches/                       # 1 file per cabang
│   ├── blog/                           # artikel edukasi
│   └── testimonials/
├── layouts/
│   ├── BaseLayout.astro
│   ├── ServiceLayout.astro
│   ├── DoctorLayout.astro
│   └── BlogLayout.astro
├── pages/
│   ├── index.astro
│   ├── layanan/
│   │   ├── index.astro                 # daftar semua layanan (kategori)
│   │   └── [slug].astro                # detail per layanan
│   ├── dokter/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── cabang/
│   │   ├── index.astro                 # locator page
│   │   └── [slug].astro                # detail 1 cabang
│   ├── promo/
│   ├── informasi/                      # blog/edukasi (index + [slug])
│   ├── tentang/
│   ├── karir/
│   └── kontak.astro
├── styles/
│   └── global.css                      # Tailwind base + design tokens (CSS vars)
└── data/
    └── siteConfig.ts                   # kontak global, jam operasional, social links
public/
├── favicon, robots.txt, dst.
```

---

## 3. Content Collections — Skema Data

Contoh schema (`src/content/config.ts`) supaya developer punya struktur data konsisten saat migrasi konten dari data internal Anda:

```ts
import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['estetika', 'ortodonti', 'bedah-mulut', 'perawatan-umum', 'anak']),
    shortDescription: z.string(),
    icon: z.string().optional(),
    heroImage: z.string().optional(),
    order: z.number().default(0),
  }),
});

const doctors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),          // e.g. "drg." / "drg., Sp.KG"
    specialties: z.array(z.string()),
    photo: z.string(),
    branches: z.array(z.string()), // slug cabang tempat praktik
    instagram: z.string().optional(),
    yearsExperience: z.number().optional(),
  }),
});

const branches = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    city: z.enum(['sidoarjo', 'surabaya', 'gresik', 'malang', 'pasuruan']),
    address: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    openingHours: z.string(),
    mapEmbedUrl: z.string().optional(),
    photo: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishedDate: z.date(),
    author: z.string(),
    category: z.enum(['edukasi', 'promo', 'kegiatan-sosial', 'testimoni']),
    coverImage: z.string(),
    excerpt: z.string(),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    patientName: z.string(),
    quote: z.string(),
    photo: z.string().optional(),
    rating: z.number().min(1).max(5).default(5),
    branch: z.string().optional(),
  }),
});

export const collections = { services, doctors, branches, blog, testimonials };
```

Data internal Anda tinggal di-convert ke format ini (markdown frontmatter atau JSON) — developer bisa buat script migrasi kalau datanya sudah dalam bentuk Excel/database.

---

## 4. Halaman & Routing

| Route | Sumber data | Catatan |
|---|---|---|
| `/` | Semua collection (ringkasan) | Homepage sesuai urutan section di spec desain |
| `/layanan` | `services` (grouped by category) | Grid dikelompokkan per kategori klinis |
| `/layanan/[slug]` | `services` | Detail 1 layanan + CTA booking dengan pre-fill layanan |
| `/dokter` | `doctors` | Grid semua dokter |
| `/dokter/[slug]` | `doctors` | Profil dokter + jadwal/cabang |
| `/cabang` | `branches` | Locator (search/filter by kota) |
| `/cabang/[slug]` | `branches` | Detail cabang: alamat, jam, dokter praktik, map |
| `/informasi` (blog) | `blog` | Listing + pagination |
| `/informasi/[slug]` | `blog` | Detail artikel |
| `/promo` | subset `blog` category=promo, atau collection sendiri | |
| `/tentang`, `/karir`, `/kontak` | static content | |

---

## 5. Komponen Interaktif (Islands) — Perlu Perhatian Khusus Developer

Astro defaultnya static — komponen berikut butuh `client:*` directive atau vanilla JS:

1. **BranchLocator** — filter/search cabang by kota → bisa pure client-side JS (data cabang sudah di-generate statis, tinggal filter array di browser), tidak perlu API call.
2. **DentalQuiz** — 17 pertanyaan, state per langkah → cocok pakai Alpine.js (`x-data`) atau small vanilla JS state machine, TIDAK perlu React penuh.
3. **StickyBookingBar** — visible on scroll, mobile floating bar → CSS + sedikit JS scroll listener.
4. **GalleryTabs / Testimonial carousel** — bisa pakai library ringan (misalnya `Splide` atau native CSS scroll-snap) daripada framework besar.

**Prinsip:** jangan import framework UI besar (React/Vue) hanya untuk komponen kecil ini — Astro Islands paling efisien kalau interaktivitasnya minimal dan di-load selektif (`client:visible` / `client:idle`).

---

## 6. Booking Flow — Keputusan yang Perlu Diambil

Saat ini reservasi redirect ke `app.bfreshgigi.com` (subdomain terpisah, kemungkinan sistem klinik/PMS berbeda). Developer perlu tahu salah satu dari opsi ini sebelum mulai:

- **Opsi A (paling cepat, minim risiko):** Tetap redirect ke `app.bfreshgigi.com`, tapi setiap CTA di web baru membawa parameter (cabang/layanan/dokter ter-pre-select) via query string, kalau app tersebut mendukung pre-fill via URL param.
- **Opsi B (integrasi lebih dalam):** Kalau app booking (`app.bfreshgigi.com`) punya API, embed form booking langsung di halaman Astro (via island component yang fetch API tsb) supaya user tidak berpindah domain.
- **Opsi C:** Ganti total ke widget booking pihak ketiga.

👉 **Ini perlu dikonfirmasi ke tim/vendor yang pegang `app.bfreshgigi.com`** sebelum development dimulai, karena akan menentukan kompleksitas komponen booking di Astro.

---

## 7. SEO & Migrasi dari WordPress

Karena domain sudah beroperasi sejak 2009 (ganti nama beberapa kali tapi domain historis punya SEO value):

1. **Sitemap**: gunakan `@astrojs/sitemap`, submit ulang ke Google Search Console setelah launch.
2. **Redirect map**: audit semua URL WordPress lama (`/service/scaling-gigi/`, `/doctor/drg-kurnia/`, dll) → buat mapping 301 redirect ke struktur URL baru Astro (idealnya slug dipertahankan sama supaya tidak perlu redirect masif).
3. **Meta tags**: replikasi title/meta description yang sudah ada di WP (tersedia via plugin SEO lama) ke frontmatter masing-masing content collection.
4. **Structured data**: tambahkan JSON-LD schema `Dentist`/`MedicalClinic` + `LocalBusiness` per cabang — ini yang biasanya belum dioptimalkan di site lama, akan bantu muncul di Google Maps/local pack.
5. **Domain/hosting cutover**: karena Anda yang pegang VPS-nya sendiri, cutover bisa dilakukan terkontrol — build Astro ke static files, upload ke direktori baru di VPS, test di subdomain staging dulu sebelum swap DNS/document root.
6. **Keamanan**: pastikan proses migrasi TIDAK memindahkan file lama yang ter-infeksi (lihat temuan hack di spec desain sebelumnya) — mulai dari struktur file bersih, jangan copy folder WordPress lama mentah-mentah ke server yang sama.

---

## 8. Performance Checklist untuk Developer

- [ ] Semua gambar lewat `astro:assets` (`<Image />` component), format WebP/AVIF otomatis
- [ ] Lazy-load semua gambar di luar viewport pertama (default Astro sudah begini untuk `<Image />`)
- [ ] Font: self-host atau `font-display: swap`, hindari render-blocking Google Fonts tanpa preconnect
- [ ] Hindari JS island yang tidak perlu — audit `client:*` directive, pastikan tidak ada yang `client:load` kalau bisa `client:visible`/`client:idle`
- [ ] Tailwind purge aktif di production build (default sudah otomatis di Astro+Tailwind integration)
- [ ] Target Lighthouse: Performance & SEO ≥ 90 di mobile

---

## 9. Yang Perlu Disiapkan dari Sisi Anda (Data Internal)

Supaya developer bisa langsung populate Content Collections:
- Daftar layanan + kategori + deskripsi singkat (per §3 schema `services`)
- Daftar dokter + spesialisasi + cabang tempat praktik + foto
- Daftar cabang lengkap (alamat, jam operasional per cabang — bukan generik, WA masing-masing kalau beda)
- Artikel blog existing (kalau mau dipertahankan, export dari WP dulu — bisa via WP REST API atau export XML)
- Testimoni yang mau ditampilkan + foto pasien (dengan izin/consent)
- Keputusan booking flow (§6) dari vendor `app.bfreshgigi.com`

---

## 10. Ringkasan untuk Developer

- Astro static build, Tailwind, minimal JS (Alpine/vanilla) untuk island interaktif
- Content Collections sebagai "database" konten (bisa upgrade ke headless CMS nanti kalau perlu)
- Deploy sebagai static files di VPS existing, tidak perlu server Node
- Prioritas SEO migration (redirect map + structured data) karena domain sudah punya histori sejak 2009
- Booking flow masih perlu keputusan arsitektur (§6) sebelum mulai coding komponen terkait

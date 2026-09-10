# Spec Desain Rework — bfreshgigi.com
*Fokus: Style & Layouting (bukan konten). Konten akan disuplai dari data internal.*

---

## 0. Catatan Metodologi

- **bfreshgigi.com**: dianalisa langsung dari struktur HTML live site.
- **fdcdentalclinic.co.id & audydental.com**: kedua situs memblokir akses otomatis (robots.txt), jadi analisa kompetitor di sini berbasis data sekunder (deskripsi bisnis, skala klinik, positioning, feature yang disebut di press/listing) + pola umum desain website klinik gigi jaringan besar di Indonesia. Kalau butuh detail visual presisi, akan lebih akurat kalau Anda screenshot beberapa halaman kompetitor lalu saya analisa dari situ.

---

## 1. TEMUAN KRITIS — Perlu Ditangani Sebelum/Bersamaan dengan Rework

🚨 **Indikasi kuat situs bfreshgigi.com sudah ter-compromise (hacked).**

Di body halaman (termasuk homepage) ditemukan puluhan link tersembunyi ke situs judi online (dominoqq, bandarqq, pkv-games) yang mengarah ke domain-domain acak — termasuk salah satu link mengarah ke path di dalam domain sendiri (`bfreshgigi.com/wp-includes/pkv-games/`). Ini pola klasik **SEO spam injection** pada WordPress: file/plugin disusupi untuk generate halaman gambling demi numpang ranking di Google.

Dampaknya:
- Reputasi domain bisa kena flag "situs berbahaya" oleh Google Safe Browsing → traffic organik anjlok.
- Kredibilitas brand jatuh kalau pasien/calon pasien tidak sengaja klik.
- Kalau tidak dibersihkan sebelum rework, rework baru berisiko ke-infect ulang dari residual malware di server/database yang sama.

**Rekomendasi:** audit & bersihkan core WP, plugin, database (cari suntikan di `wp_options`, `.htaccess`, file tema) SEBELUM atau BERSAMAAN dengan proses desain ulang. Kalau butuh, saya bisa bantu susun langkah cleanup-nya terpisah.

---

## 2. Audit Kondisi bfreshgigi.com Saat Ini

**Platform:** WordPress + Elementor + Slider Revolution (plugin builder lama, berat).

**Struktur halaman (urutan section homepage):**
1. Top bar kontak (telepon, jam operasional, email)
2. Header/logo + mega menu (Tentang, Layanan, Dokter, Galeri, Cabang, Karir, Informasi, Kontak)
3. Hero slider (Slider Revolution) — promosi/banner
4. Widget kuis interaktif "cek kesehatan gigi" (17 pertanyaan) — cukup unik tapi peletakannya di atas hero terasa mengganggu alur
5. 3 kolom value proposition (ikon + teks pendek)
6. "Berkomitmen Memberikan Pelayanan Terbaik" — 3 kolom teks tanpa visual kuat
7. Grid dokter (foto + nama + social link)
8. "Layanan Terfavorit" — grid 6 layanan
9. Galeri (tab: Dokter, Pemeriksaan, Model Gigi, Ruang Tunggu, Ruang Pemeriksaan)
10. Testimoni (card quote + foto pasien)
11. Blog/artikel edukasi (3 post terbaru)
12. Logo klien/partner (belum terisi — masih placeholder "your-link.com")
13. CTA "Buat Reservasi" (redirect ke app.bfreshgigi.com — subdomain terpisah untuk booking)
14. Newsletter signup
15. Footer (info kontak, layanan, jam buka, sosmed)
16. Widget chat WhatsApp floating

**Observasi Style & Layout:**

| Aspek | Kondisi saat ini |
|---|---|
| Builder | Elementor + Slider Revolution → berat, loading lambat, sulit maintain jangka panjang |
| Navigasi | Mega menu dalam, terlalu banyak sub-item flat (Behel, Scaling, Cabut, Tambal, dst semua sejajar tanpa kategori visual) |
| Hierarki visual homepage | Datar — hampir semua section punya "berat" visual yang sama, tidak ada section yang jelas jadi fokus utama setelah hero |
| Booking flow | Reservasi ada di app.bfreshgigi.com (subdomain terpisah) — user harus pindah "aplikasi", bukan flow menyatu |
| Konsistensi foto | Campur: foto dokter formal, foto testimoni kasual (crop tidak seragam), galeri promosi lama |
| Placeholder yang belum diisi | Section logo klien masih placeholder — kesan belum selesai/tidak dirawat |
| Copy/CTA | CTA generik berulang ("Buat Reservasi", "Konsultasi") tanpa hierarki prioritas jelas |
| Kuis kesehatan gigi | Fitur bagus untuk engagement, tapi UX-nya interupsi (muncul sebelum user lihat apa pun tentang klinik) |
| Trust signal | Testimoni ada tapi generik; belum ada trust signal kuat seperti jumlah cabang, jumlah pasien, sertifikasi, before-after |

---

## 3. Benchmark Kompetitor

### FDC Dental Clinic (fdcdentalclinic.co.id)
- Skala: jaringan klinik gigi **terbesar di Indonesia** (~70+ cabang per 2026, target 100 di akhir tahun), 60 ribu+ pasien/bulan.
- Positioning: teknologi + customer experience + harga terjangkau ("smile makers" mass-market).
- Punya **app mobile sendiri** (1,5 juta+ download) untuk reservasi, pilih dokter, cek estimasi biaya — booking terintegrasi jadi bagian dari brand experience, bukan sekadar link keluar.
- Klinik didesain dengan nuansa "seperti coffee shop" — estetik, kasual-modern, bukan kesan klinis-dingin.
- **Insight untuk bfreshgigi**: booking flow yang mulus & terasa "satu produk" (bukan lompat ke subdomain berbeda) adalah standar kompetitor besar.

### Audy Dental (audydental.com)
- Skala: 50+ cabang, salah satu jaringan spesialis terbesar.
- Tagline "Smile Without Doubt" — branding personal/emosional, bukan cuma daftar layanan.
- Fitur locator cabang by kota/area yang jadi kompetitor langsung terhadap kebutuhan bfreshgigi yang sudah multi-kota (Sidoarjo, Surabaya, Gresik, Malang, Pasuruan).
- Kompetitor lain dalam ekosistem yang sama secara traffic: sozodental.com, orangedentalhouse.com, happydentalclinic.com, satudental.com — semua bermain di segmen jaringan klinik gigi modern-mass market.

### Pola umum di seluruh kompetitor kelas ini
1. **Clinic/branch locator** yang prominent (search by kota) — krusial buat bfreshgigi yang sudah 10+ titik lintas kota.
2. **Booking terintegrasi** langsung di web/app, real-time pilih dokter & cabang, bukan sekadar tombol WhatsApp.
3. **Branding hangat, bukan klinis** — palet warna soft, tone approachable (mengatasi "takut ke dokter gigi").
4. **Struktur layanan dikelompokkan per kategori klinis** (ortodonti, konservasi, bedah mulut, kosmetik) — bukan daftar flat 10+ item sejajar di menu.
5. **Section dokter dengan kredensial jelas** (spesialisasi, jumlah tahun praktik, sertifikasi) untuk membangun trust — bukan cuma foto+nama+IG.

---

## 4. SPEC DESAIN REWORK

### 4.1 Prinsip Desain
1. **Warm & reassuring**, bukan klinis-dingin — target audiens takut ke dokter gigi.
2. **Booking-first**: setiap section penting harus punya jalur cepat ke reservasi tanpa loncat "app" yang terasa asing.
3. **Hierarki jelas per section** — tiap section punya SATU tujuan (bukan campur info + CTA + testimoni dalam satu blok).
4. **Multi-cabang sebagai kekuatan**, bukan disembunyikan di menu — locator harus mudah ditemukan di atas fold.
5. **Ringan & cepat** — lepas ketergantungan Slider Revolution; ganti hero dengan native CSS/lightweight carousel atau visual statis + CTA kuat.

### 4.2 Struktur Halaman Beranda (revisi urutan)
1. **Header** — sticky, logo + menu dikelompokkan per kategori layanan (bukan flat list) + tombol reservasi selalu terlihat (persistent CTA)
2. **Hero** — 1 pesan utama + 1 CTA primer (Booking) + 1 CTA sekunder (WhatsApp) + visual foto klinik/dokter asli (bukan slider promosi generik)
3. **Trust bar** — angka kunci: jumlah cabang, tahun berdiri (2009→sekarang), jumlah dokter, rating — bentuk strip horizontal ringkas
4. **Branch locator** — pilih kota/kecamatan langsung dari homepage (Sidoarjo/Surabaya/Gresik/Malang/Pasuruan)
5. **Layanan** — grid dikelompokkan per kategori klinis (bukan 6 kartu flat), tiap kartu ke halaman layanan spesifik
6. **Kenapa Pilih Kami** — 3 value prop, disertai ikon/ilustrasi ringan, bukan teks datar
7. **Tim Dokter** — foto konsisten (rasio & background seragam) + kredensial singkat
8. **Kuis kesehatan gigi** — dipindah ke sini (mid-page), bukan interupsi di awal, framing sebagai "tools interaktif" opsional
9. **Testimoni** — carousel ringkas, foto konsisten
10. **Galeri fasilitas** — highlight ruang tunggu/ruang periksa untuk kurangi rasa takut
11. **Blog edukasi** — 3 artikel terbaru
12. **CTA penutup + newsletter**
13. **Footer** — kontak, jam operasional per cabang (bukan generik), sosmed, sitemap

### 4.3 Sistem Warna

**Diekstrak langsung dari logo resmi B Fresh** (bukan lagi rekomendasi arah — ini token final):

| Token | Hex | RGB | Sumber & Pemakaian |
|---|---|---|---|
| `primary` | `#0E6AB3` | (14, 106, 179) | Biru dominan logo (teks "B FRESH" + siluet gigi) — header, link, ikon, elemen identitas utama |
| `primary-light` | `#69C4ED` | (105, 196, 237) | Biru muda/highlight pada ikon gigi — background section, badge, hover state |
| `secondary` (fresh green) | `#61A74D` | (97, 167, 77) | Hijau daun pada logo — aksen "fresh/sehat": badge promo, ikon checklist, indikator rating positif |
| `accent-cta` | **perlu ditentukan** — usul: oranye hangat, mis. `#F2994A` (sample, bukan final) | — | **Tidak ada di logo** — sengaja ditambahkan di luar palet brand khusus untuk tombol booking/CTA. Logo hanya berisi biru+hijau; kalau CTA juga biru/hijau, tombol booking berisiko tenggelam senada dengan section sekitarnya. Perlu 1 warna hangat kontras supaya CTA selalu menonjol. |
| `neutral-bg` | `#F7FAFC` | — | Background section (off-white, bukan putih pekat) |
| `neutral-text` | `#1F2937` | — | Body text (abu gelap, bukan hitam pekat) |

**Catatan implementasi:**
- Hindari terlalu banyak warna kompetitif di satu section — `primary` + `secondary` + `accent-cta` + netral sudah cukup; jangan tambah warna brand baru di luar 3 ini.
- `accent-cta` di atas masih **sample/usulan**, belum final — perlu konfirmasi dari sisi Anda/brand sebelum dikunci ke Tailwind config developer.
- Semua token siap dipetakan langsung ke `tailwind.config` sebagai CSS custom properties (lihat spec teknis Astro, §1).

### 4.4 Tipografi
- Heading: satu typeface humanis/rounded sans-serif (kesan ramah) — hindari font yang terlalu tegas/korporat
- Body: sans-serif netral, ukuran dasar min. 16px, line-height longgar (1.6+) untuk keterbacaan konten edukasi
- Batasi maksimal 2 typeface

### 4.5 Komponen UI Kunci
- **Sticky booking button** (desktop: di header; mobile: floating bottom bar) — visible di semua halaman
- **Kartu layanan**: ikon/ilustrasi + judul + 1 kalimat + link "Detail" — konsisten di semua grid layanan
- **Kartu dokter**: foto rasio 1:1 seragam, nama, spesialisasi, CTA "Lihat Jadwal"
- **Branch card**: nama cabang, alamat singkat, jam buka, tombol "Pilih Cabang Ini" langsung ke booking dengan cabang ter-pre-select
- **Testimoni card**: foto bulat kecil + rating bintang + quote singkat (bukan paragraf panjang)

### 4.6 Navigasi & Information Architecture
Menu utama disederhanakan jadi kategori besar (bukan 10+ item flat):
- Beranda
- Layanan (dropdown per kategori: Estetika, Ortodonti, Bedah Mulut, Perawatan Umum, Anak)
- Dokter
- Cabang (dengan locator)
- Promo
- Edukasi/Blog
- Tentang Kami
- **[Tombol terpisah, bukan menu]** Reservasi

### 4.7 Mobile-first
Karena target lokal (Sidoarjo–Surabaya–Gresik–Malang–Pasuruan) mayoritas akses dari HP:
- Floating WhatsApp + Booking bar tetap di bawah layar
- Branch locator jadi dropdown sederhana di mobile, bukan map interaktif berat
- Galeri & testimoni pakai swipe carousel, bukan grid statis panjang

### 4.8 Teknis
- Migrasi dari Slider Revolution ke hero yang lebih ringan (native slider/CSS) untuk kecepatan load
- Evaluasi apakah tetap di Elementor atau pindah ke tema custom lebih ringan — pertimbangkan performa jangka panjang, terutama karena riwayat rentan disusupi
- Pastikan struktur URL & sitemap tetap terjaga (redirect 301) saat rework untuk tidak kehilangan SEO yang sudah terbangun sejak 2009–2020

---

## 5. Ringkasan Prioritas
1. 🚨 Bersihkan hack/spam injection (paralel/sebelum rework)
2. Sederhanakan navigasi jadi kategori, bukan flat list panjang
3. Satukan flow booking (jangan lompat ke subdomain app yang terasa terpisah)
4. Tambahkan branch locator prominent di homepage
5. Perkuat trust signal (angka cabang, tahun berdiri, jumlah dokter)
6. Ringankan teknis (lepas dependency berat seperti Slider Revolution)
7. Konsistenkan visual (foto, kartu, warna) di semua section

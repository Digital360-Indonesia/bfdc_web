/**
 * Konfigurasi global situs — satu sumber kebenaran utk identitas, kontak, stat & nav.
 */
export const SITE = {
  name: "B Fresh Dental Care",
  legalName: "PT Bertumbuh Melejit Berkah",
  tagline: "Klinik Gigi Keluarga Terpercaya sejak 2009",
  description:
    "B Fresh Dental Care — jaringan klinik dokter gigi keluarga di Sidoarjo, Surabaya, Gresik, Pasuruan & Malang. 15 cabang, 80+ dokter gigi & 9 dokter spesialis. Reservasi mudah, harga transparan.",
  url: "https://bfreshgigi.com",
  since: 2009,
  phone: "0857-9238-2539", // CS Reservasi (WA resmi web & T&C promo)
  phoneRaw: "6285792382539",
  waMessage:
    "Halo B Fresh Dental Care, saya ingin konsultasi / reservasi perawatan gigi. Terima kasih.",
  email: "marketing@bfreshgigi.com",
  bookingUrl: "https://app.bfreshgigi.com/reservasi",
  careersUrl: "https://hrm.bfreshgigi.com/lowongan",
  /** API publik read-only di app.bfreshgigi.com (deploy bfdc_app dulu agar live) */
  publicApi: "https://app.bfreshgigi.com",
  // ⚠️ asumsi sementara — menunggu konfirmasi jam per cabang
  hours: "Setiap Hari · 09.00–21.00",
  social: {
    instagram: "https://www.instagram.com/bfreshdentalcare/",
    facebook: "https://www.facebook.com/bfresh.dentalcare",
    youtube: "https://www.youtube.com/channel/UCzLQ0zVw9YYdMSmE8A9ZF3Q",
  },
} as const;

export const waLink = (msg = SITE.waMessage) =>
  `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(msg)}`;

/** Angka TrustBar (sumber: audit DB produksi Sep 2026) */
export const STATS = [
  { value: "2009", label: "Berdiri & Melayani" },
  { value: "15", suffix: " cabang", label: "di 5 Kota Jawa Timur" },
  { value: "80+", label: "Dokter Gigi" },
  { value: "150+", label: "Jenis Perawatan" },
  { value: "57rb+", label: "Pasien Terdaftar" },
  { value: "95%", label: "Kepuasan Pasien" },
] as const;

export const NAV = [
  { label: "Layanan", href: "/layanan", children: "services" },
  { label: "Harga", href: "/harga" },
  { label: "Dokter", href: "/dokter" },
  { label: "Cabang", href: "/cabang" },
  { label: "Promo", href: "/promo" },
  { label: "Edukasi", href: "/informasi" },
  { label: "Tentang", href: "/tentang" },
] as const;

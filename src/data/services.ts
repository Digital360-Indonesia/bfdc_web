/**
 * Taksonomi layanan — 6 kategori berbasis data riil payment_category.
 * Hub: kategori → halaman layanan MDX yang termasuk + harga mulai (kurasi marketing).
 */
export type KategoriSlug =
  | "perawatan-umum"
  | "ortodonti"
  | "gigi-tiruan"
  | "estetika"
  | "bedah-mulut"
  | "anak";

export interface Kategori {
  slug: KategoriSlug;
  label: string;
  tagline: string;
  desc: string;
  icon: string; // emoji fallback; MDX icon dipakai utk kartu layanan
  priceFrom: number; // kurasi marketing dari price DB
  includes: string[]; // slug layanan MDX
}

export const KATEGORI: Kategori[] = [
  {
    slug: "perawatan-umum",
    label: "Perawatan Umum",
    tagline: "Cegah & rawat sejak dini",
    desc: "Konsultasi, scaling, tambal gigi, hingga perawatan saluran akar — pemeriksaan menyeluruh untuk seluruh keluarga.",
    icon: "tooth",
    priceFrom: 50000,
    includes: ["scaling-gigi", "tambal-gigi", "saluran-akar"],
  },
  {
    slug: "ortodonti",
    label: "Ortodonti (Behel)",
    tagline: "Senyum lebih lurus & percaya diri",
    desc: "Behel metal, ceramic, hingga Damon — dirawat dokter Sp.Ort dengan rencana perawatan yang jelas.",
    icon: "smile",
    priceFrom: 1499000,
    includes: ["behel-gigi"],
  },
  {
    slug: "gigi-tiruan",
    label: "Gigi Tiruan",
    tagline: "Kunyah & bicara seperti semula",
    desc: "Gigi palsu akrilik, Lucitone, Valplast, hingga termosen — dipasang dokter Sp.Pros sesuai kondisi mulut Anda.",
    icon: "crown",
    priceFrom: 500000,
    includes: ["gigi-tiruan"],
  },
  {
    slug: "estetika",
    label: "Estetika Gigi",
    tagline: "Senyum lebih cerah & rapi",
    desc: "Bleaching gigi dan veneer untuk mempercantik senyum dengan bahan aman dan hasil natural.",
    icon: "sparkles",
    priceFrom: 699000,
    includes: ["bleaching-gigi", "veneer-gigi"],
  },
  {
    slug: "bedah-mulut",
    label: "Bedah Mulut",
    tagline: "Kasus kompleks ditangani ahlinya",
    desc: "Pencabutan gigi hingga odontektomi gigi bungsu oleh dokter Sp.BMM — aman dan nyaman.",
    icon: "shield-plus",
    priceFrom: 149000,
    includes: ["cabut-gigi"],
  },
  {
    slug: "anak",
    label: "Gigi Anak",
    tagline: "Kenalan dokter gigi sejak kecil",
    desc: "Perawatan ramah anak oleh dokter Sp.KGA — kunjungan pertama yang menyenangkan, bebas trauma.",
    icon: "baby",
    priceFrom: 100000,
    includes: ["perawatan-anak"],
  },
];

export const kategoriBySlug = (s: string) => KATEGORI.find((k) => k.slug === s);

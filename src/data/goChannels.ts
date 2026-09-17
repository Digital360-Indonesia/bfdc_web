/**
 * Data halaman link-in-bio (go-ig / go-tt / go-fb / go-gmb).
 * Dipisah ke module agar bisa diakses getStaticPaths (scope frontmatter .astro tidak terlihat olehnya).
 * UTM per channel dipertahankan agar atribusi traffic sosial tetap jalan.
 */
import { SITE } from "./siteConfig";

export const IG = "https://www.instagram.com/bfreshdentalcare/";
export const TIKTOK = "https://www.tiktok.com/@bfresh.dentalcare";
export const SHOPEE = "https://shopee.co.id/bfreshdentalcare";
export const TOKOPEDIA = "https://tokopedia.link/cEaoZ5x3nVb";
export const INSIDE_IG = "https://www.instagram.com/inside.bfresh/";

export interface Channel {
  label: string;
  /** sumber dalam pesan WA CS — verbatim dgn halaman lama */
  waCs: string;
  waPricelist: string;
  waGiveaway: string;
  utm: string;
  description: string;
}

export const CHANNELS: Record<string, Channel> = {
  ig: {
    label: "Instagram", waCs: "instagram", waPricelist: "instagram", waGiveaway: "instagram",
    utm: "instagram",
    description: "Tautan resmi dari bio Instagram B Fresh Dental Care — reservasi online, pricelist, lokasi 15 cabang, dan galeri hasil perawatan.",
  },
  tt: {
    label: "TikTok", waCs: "tiktok", waPricelist: "tiktok", waGiveaway: "tiktok",
    utm: "tiktok",
    description: "Tautan resmi dari bio TikTok B Fresh Dental Care — reservasi online, pricelist, giveaway, lokasi 15 cabang, dan galeri hasil perawatan.",
  },
  fb: {
    label: "Facebook", waCs: "facebook", waPricelist: "facebook", waGiveaway: "facebook",
    utm: "facebook",
    description: "Tautan resmi dari Facebook B Fresh Dental Care — reservasi online, pricelist, giveaway, lokasi 15 cabang, dan galeri hasil perawatan.",
  },
  gmb: {
    label: "Google Bisnis", waCs: "gmb", waPricelist: "google bisnis", waGiveaway: "google bisnis",
    utm: "googlemybusiness",
    description: "Tautan resmi dari profil Google Bisnis B Fresh Dental Care — reservasi online, pricelist, giveaway, lokasi 15 cabang, dan galeri hasil perawatan.",
  },
};

export const wa = (msg: string, utm: string) =>
  `https://wa.me/${SITE.phoneRaw}/?text=${encodeURIComponent(msg)}&utm_source=${utm}&utm_medium=referral`;

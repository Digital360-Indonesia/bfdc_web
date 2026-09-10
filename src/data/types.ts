/** Tipe data bersama (sumber: src/data/*.json hasil ekstraksi DB) */
export interface Branch {
  id: number;
  slug: string;
  code: string;
  name: string;
  city: string;
  cityLabel: string;
  address: string;
  phone: string;
  wa: string;
  lat: number | null;
  lng: number | null;
  mapUrl: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  quote: string;
  branch: string;
  branchId: number | null;
}

export interface Promo {
  id: number;
  nama: string;
  harga: string;
  img: string | null;
  deskripsi: string;
  mulai: string;
  akhir: string;
  special: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

export interface GaleriItem {
  slug: string;
  url: string;
  title: string;
  kategori: string;
  images: string[];
  local_images: string[];
}

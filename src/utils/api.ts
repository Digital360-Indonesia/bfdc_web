// API publik bfdc_app — env-aware.
// Lokal: set PUBLIC_API_URL=https://bfdc_app.test di .env (gitignored).
// Produksi (tanpa .env): otomatis pakai app.bfreshgigi.com.
import { SITE } from "../data/siteConfig";

export const publicApi: string =
  (import.meta.env.PUBLIC_API_URL as string | undefined) ?? SITE.publicApi;

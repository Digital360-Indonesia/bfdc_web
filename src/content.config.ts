import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Skema kompatibel dgn hasil migrasi lama (820 blog MDX, 50 dokter, 7+ layanan)
 * — jangan ubah field tanpa membaca catatan migrasi.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    excerpt: z.string(),
    image: z.string().optional(),
    category: z.enum([
      "edukasi",
      "promo",
      "kegiatan-sosial",
      "testimoni",
      "quote",
      "lowongan-kerja",
      "informasi",
      "uncategorized",
    ]),
    tags: z.array(z.string()).default([]),
    author: z.string().default("B Fresh Dental Care"),
    faq: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .optional(),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    image: z.string(),
    icon: z.string(),
    gallery: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    pricing: z
      .array(
        z.object({
          name: z.string(),
          price: z.string(),
          original: z.string().optional(),
          desc: z.string().optional(),
        }),
      )
      .default([]),
    order: z.number().default(0),
    /** kategori baru — fallback perawatan-umum utk MDX lama */
    kategori: z
      .enum([
        "perawatan-umum",
        "ortodonti",
        "gigi-tiruan",
        "estetika",
        "bedah-mulut",
        "anak",
      ])
      .default("perawatan-umum"),
  }),
});

const doctors = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/doctors" }),
  schema: z.object({
    title: z.string(),
    name: z.string(),
    slug: z.string(),
    photo: z.string(),
    specialty: z.string(),
    branch: z.string(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    youtube: z.string().optional(),
    certifications: z.array(z.string()).default([]),
    passions: z.array(z.string()).default([]),
    order: z.number().default(0),
    /** true = tampil di section Tim Dokter homepage */
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, services, doctors };

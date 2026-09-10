import { SITE, waLink } from "../data/siteConfig";

type Faq = { question: string; answer: string };

/** Organization/Dentist utk homepage & semua halaman */
export function jsonLdOrg() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/logos/logo.png`,
    image: `${SITE.url}/og-image.jpg`,
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: String(SITE.since),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sidoarjo",
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    areaServed: ["Sidoarjo", "Surabaya", "Gresik", "Pasuruan", "Malang"].map(
      (c) => ({ "@type": "City", name: c }),
    ),
    sameAs: Object.values(SITE.social),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "reservations",
      url: SITE.bookingUrl,
    },
  };
}

/** MedicalClinic per halaman cabang */
export function jsonLdClinic(b: {
  name: string; cityLabel: string; address: string; phone: string;
  lat: number | null; lng: number | null; slug: string;
}) {
  const geo =
    b.lat != null && b.lng != null
      ? { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng }
      : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: `B Fresh Dental Care ${b.name}`,
    medicalSpecialty: "Dentistry",
    url: `${SITE.url}/cabang/${b.slug}`,
    telephone: b.phone,
    priceRange: "$$",
    image: `${SITE.url}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address,
      addressLocality: b.cityLabel,
      addressRegion: "Jawa Timur",
      addressCountry: "ID",
    },
    ...(geo ? { geo } : {}),
    parentOrganization: { "@type": "Organization", name: SITE.legalName },
  };
}

export function jsonLdFaq(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function jsonLdArticle(a: {
  title: string; excerpt: string; image?: string;
  date: Date; author: string; slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    image: a.image ? `${SITE.url}${a.image}` : `${SITE.url}/og-image.jpg`,
    datePublished: a.date.toISOString().slice(0, 10),
    author: { "@type": "Organization", name: a.author },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/informasi/${a.slug}`,
  };
}

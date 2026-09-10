/** Util format umum */

export function rupiah(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

export function rupiahShort(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `Rp ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1).replace(".", ",")} jt`;
  }
  if (n >= 1_000) return `Rp ${Math.round(n / 100_000) > 0 ? (n / 1000).toFixed(0) : n / 1000}rb`;
  return rupiah(n);
}

const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export function tanggalID(d: Date | string): string {
  const dt = typeof d === "string" ? new Date(d) : d;
  return `${dt.getDate()} ${BULAN[dt.getMonth()]} ${dt.getFullYear()}`;
}

/** Nama depan + inisial utk privasi testimoni */
export function maskName(full: string): string {
  const p = full.trim().split(/\s+/);
  if (p.length === 1) return cap(p[0]);
  return `${cap(p[0])} ${p[p.length - 1][0].toUpperCase()}.`;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

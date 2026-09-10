import sharp from "sharp";
import { glob } from "node:fs/promises";
const files = [];
for await (const f of glob("public/galeri/**/*.jpg", { cwd: process.cwd() })) files.push([f, "jpeg"]);
for await (const f of glob("public/galeri/**/*.jpeg", { cwd: process.cwd() })) files.push([f, "jpeg"]);
for await (const f of glob("public/galeri/**/*.png", { cwd: process.cwd() })) files.push([f, "png"]);
let before = 0, after = 0, n = 0;
for (const [file, type] of files) {
  const buf = await sharp(file).resize({ width: 1080, height: 1080, fit: "inside", withoutEnlargement: true })
    [type === "jpeg" ? "jpeg" : "png"]({ quality: type === "jpeg" ? 78 : 80, ...(type === "png" ? { palette: true } : { mozjpeg: true }) })
    .toBuffer();
  const orig = (await import("node:fs")).statSync(file).size;
  if (buf.length < orig) { (await import("node:fs")).writeFileSync(file, buf); after += buf.length; } else after += orig;
  before += orig; n++;
}
console.log(`${n} gambar: ${(before/1048576).toFixed(1)}MB → ${(after/1048576).toFixed(1)}MB (-${(100-after/before*100).toFixed(0)}%)`);

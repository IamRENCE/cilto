import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const template = path.join(root, "scripts", "og-template.html");
const out = path.join(root, "public", "og.png");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 720, deviceScaleFactor: 1 },
});

await page.goto(pathToFileURL(template).href, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  await document.fonts.ready;
  // Force Syne + JetBrains Mono to resolve before capture
  await Promise.all([
    document.fonts.load("600 220px Syne"),
    document.fonts.load("500 30px 'JetBrains Mono'"),
    document.fonts.load("600 30px 'JetBrains Mono'"),
    document.fonts.load("500 46px Syne"),
  ]);
});
await page.waitForTimeout(300);
await page.screenshot({ path: out, type: "png" });
await browser.close();

try {
  const sharp = (await import("sharp")).default;
  const tmp = `${out}.tmp.png`;
  await sharp(out)
    .png({ compressionLevel: 9, palette: true, quality: 95, effort: 10, colors: 128 })
    .toFile(tmp);
  const { renameSync } = await import("node:fs");
  renameSync(tmp, out);
} catch {
  // sharp is optional; leave the full PNG if it's not installed
}

console.log(`Wrote ${out}`);

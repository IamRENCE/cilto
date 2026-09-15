import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "fonts");
fs.mkdirSync(dir, { recursive: true });

const cssUrl =
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&family=Syne:wght@500;600&display=swap";

const cssRes = await fetch(cssUrl, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
});
const css = await cssRes.text();
const urls = [...css.matchAll(/https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2/g)].map(
  (m) => m[0],
);
const unique = [...new Set(urls)];
console.log("found", unique.length, "fonts");

let localCss = css;
let i = 0;
for (const url of unique) {
  i += 1;
  const name = `font-${i}.woff2`;
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  fs.writeFileSync(path.join(dir, name), buf);
  localCss = localCss.split(url).join(`./${name}`);
  console.log(name, buf.length);
}

fs.writeFileSync(path.join(dir, "fonts.css"), localCss);
console.log("wrote fonts.css");

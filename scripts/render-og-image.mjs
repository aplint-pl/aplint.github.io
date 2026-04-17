/**
 * Rasteruje public/images/og-image.svg -> public/images/og-image.jpg (1200x630).
 * Wymaga ffmpeg w PATH (konwersja PNG -> JPEG).
 * Uruchom: npm run render:og
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svgPath = path.join(root, "public", "images", "og-image.svg");
const pngPath = path.join(root, "public", "images", "og-image-temp.png");
const jpgPath = path.join(root, "public", "images", "og-image.jpg");

const svg = fs.readFileSync(svgPath, "utf-8");
const resvg = new Resvg(svg, {
  fitTo: {
    mode: "width",
    value: 1200,
  },
});
const pngData = resvg.render();
fs.writeFileSync(pngPath, pngData.asPng());

const ff = spawnSync(
  "ffmpeg",
  [
    "-y",
    "-i",
    pngPath,
    "-q:v",
    "88",
    "-frames:v",
    "1",
    "-update",
    "1",
    jpgPath,
  ],
  { stdio: "inherit" }
);

fs.unlinkSync(pngPath);

if (ff.status !== 0) {
  process.exit(ff.status ?? 1);
}

console.log("Zapisano:", path.relative(root, jpgPath));

/**
 * Generuje `dist/sitemap.xml` na podstawie statycznych tras aplikacji.
 * Uruchamiany na końcu `npm run build`.
 *
 * Ustaw bazowy URL przez env:
 * - SITEMAP_BASE_URL
 * - lub SITE_URL
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");

const baseUrlRaw =
  process.env.SITEMAP_BASE_URL || process.env.SITE_URL || "https://aplint.pl";
const baseUrl = baseUrlRaw.replace(/\/+$/, "");

// Musi być zgodne z tym, co pre-renderujemy w `prerender.mjs`
const routes = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/polityka-prywatnosci", changefreq: "monthly", priority: 0.6 },
  { path: "/faq", changefreq: "monthly", priority: 0.5 },
];

const lastmod = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const urlsXml = routes
  .map((r) => {
    const fullPath = r.path === "/" ? baseUrl : `${baseUrl}${r.path}`;
    return [
      "  <url>",
      `    <loc>${fullPath}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      r.changefreq ? `    <changefreq>${r.changefreq}</changefreq>` : "",
      `    <priority>${r.priority.toFixed(1)}</priority>`,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  })
  .join("\n");

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urlsXml,
  "</urlset>",
  "",
].join("\n");

fs.mkdirSync(distDir, { recursive: true });
const outPath = path.join(distDir, "sitemap.xml");
fs.writeFileSync(outPath, sitemapXml, "utf-8");
console.log("Zapisano:", path.relative(distDir, outPath));


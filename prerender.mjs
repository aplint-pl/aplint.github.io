/**
 * Pre-renderuje główną trasę do statycznego HTML przy buildzie.
 * Dzięki temu boty wyszukiwarek i LLM widzą pełną treść bez wykonywania JS.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist");
const indexPath = path.join(distDir, "index.html");
const serverEntryPath = path.resolve(distDir, "server", "entry-server.js");

const PRERENDER_ROUTES = ["/", "/polityka-prywatnosci", "/faq"];

async function main() {
  let template = fs.readFileSync(indexPath, "utf-8");

  const { render } = await import(pathToFileURL(serverEntryPath).href);

  for (const route of PRERENDER_ROUTES) {
    const appHtml = render(route);
    const html = template.replace("<!--ssr-outlet-->", appHtml);
    const outPath = route === "/" ? indexPath : path.join(distDir, route, "index.html");
    if (route !== "/") {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
    }
    fs.writeFileSync(outPath, html, "utf-8");
  }

  console.log("Pre-render zakończony:", PRERENDER_ROUTES.join(", "));
}

main().catch((err) => {
  console.error("Błąd pre-renderu:", err);
  process.exit(1);
});

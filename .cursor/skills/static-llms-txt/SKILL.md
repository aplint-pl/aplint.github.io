---
name: static-llms-txt
description: >-
  Authors a curated static llms.txt file in llmstxt.org markdown format for a
  website or docs site, placed so it is served at /llms.txt (e.g. Vite public/).
  Use when the user asks for llms.txt, /llms.txt, an LLM-facing site map, Cursor
  context for the project domain, or llms-txt following the community spec.
---

# Static llms.txt (curated)

## Goal

Produce a **single, hand-authored** `llms.txt`: concise, accurate, and readable for humans and LLMs. Do **not** synthesize it by stripping production HTML unless the user explicitly asks for that approach (it usually reads poorly).

Official format overview: [llmstxt.org](https://llmstxt.org).

## Output shape (required order)

1. `# Title` - product or site name.
2. Blank line, then `> One-line summary` (value proposition).
3. Optional short paragraph(s) with facts the model should not guess (language, audience, canonical URL).
4. One or more `## Section` headers; under each, a **markdown list** of links:
   - `- [Label](https://absolute.url/path): Short note what the page contains.`
5. Optional final section titled exactly `## Optional` - links that may be skipped in short context (legal boilerplate, long policies, external reference dumps).

Use **absolute `https://` URLs** for every link. Match the site’s real public routes.

## Where to save (Vite / SPA)

- Path: `public/llms.txt`
- Effect: served at `https://<host>/llms.txt` after build (Vite copies `public/` to dist root).

If the project is not Vite, use the framework’s static-public equivalent (e.g. `public/llms.txt`, `static/llms.txt`) so the deployed URL is still `/llms.txt`.

## Workflow

1. **Canonical base URL** - confirm with the user or take from `index.html` / env / README (e.g. `https://example.com`). No trailing slash in prose; URLs in links follow normal path rules.
2. **Inventory** - list only **public** pages that help an LLM answer questions about the product (home, FAQ, pricing, key docs). Omit auth-only or huge generated indexes unless asked.
3. **Draft** - write clear link labels and **specific** notes (not “more info”).
4. **Optional block** - put privacy/terms, sitemaps, or very long PDFs here if included at all.
5. **Review** - no broken paths; language consistent with the site; no duplicate `## Optional` titles.

## Template (copy and fill)

```markdown
# Your Product Name

> One sentence: what it is and for whom.

Language: … Canonical site: https://example.com/

## Main

- [Home](https://example.com/): …
- [FAQ](https://example.com/faq): …

## Optional

- [Privacy policy](https://example.com/privacy): Legal text; skip for short answers.
```

## Project-specific defaults (this repo)

When working in **aplint.github.io**:

- Canonical site: `https://aplint.pl` (adjust if the user says otherwise).
- Typical sections: home `/`, `/faq`, `/polityka-prywatnosci` - describe offerings, process, contact, and team at a high level in link notes; do not invent services.
- File location: `public/llms.txt`.

## Anti-patterns

- Dumping unstructured text or pasting entire HTML.
- Relative URLs like `/faq` inside `llms.txt` (always absolute for agents fetching by URL).
- Using `## Optional` for primary product pages (defeats the spec).
- Stale dates or claims; if unsure, keep notes generic or ask the user.

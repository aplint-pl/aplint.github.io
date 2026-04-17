import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootEl = document.getElementById("root")!
// Only hydrate when prerender/SSR left real element markup. A lone `<!--ssr-outlet-->`
// comment counts as a child node but must not trigger hydration in dev - that causes
// React to mismatch the DOM with the client tree (e.g. next-themes injection script).
const hasPrerenderedContent = rootEl.children.length > 0

if (hasPrerenderedContent) {
  hydrateRoot(rootEl, <App />)
} else {
  createRoot(rootEl).render(<App />)
}

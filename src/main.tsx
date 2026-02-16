import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootEl = document.getElementById("root")!
const hasPrerenderedContent = rootEl.hasChildNodes()

if (hasPrerenderedContent) {
  hydrateRoot(rootEl, <App />)
} else {
  createRoot(rootEl).render(<App />)
}

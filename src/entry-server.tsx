import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Renders the application to HTML for the given URL (pre-render / SSG).
 * Used during build to generate static HTML for bots and LLM.
 */
export function render(url: string): string {
  return renderToString(<App url={url} />);
}

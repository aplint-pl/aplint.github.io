/**
 * Matomo: MTM (`window._mtm`) + tracker (`window._paq`).
 * Samo `_mtm.push` nie wywołuje żądań do `matomo.php` - trzeba też `trackEvent` przez `_paq`
 * (albo osobny tag w MTM podpięty pod to zdarzenie).
 * Kontener MTM: `src/App.tsx`.
 */

export function trackContactProtocolLinkClick(href: string): void {
  if (typeof window === "undefined") return;

  const protocol = href.startsWith("tel:")
    ? "tel"
    : href.startsWith("mailto:")
      ? "mailto"
      : null;
  if (!protocol) return;

  const w = window as unknown as {
    _mtm?: Array<Record<string, unknown>>;
    _paq?: unknown[][];
  };

  w._mtm = w._mtm || [];
  w._mtm.push({
    event: "contact_protocol_link_click",
    contact_protocol: protocol,
    contact_href: href,
    page_path: window.location?.pathname ?? "",
  });

  w._paq = w._paq || [];
  w._paq.push([
    "trackEvent",
    "Kontakt",
    protocol === "tel" ? "Telefon" : "Email",
    href,
  ]);
}

/** CTA otwierające Calendly (`ConsultationModal` i spójne zdarzenie w MTM). */
export function trackConsultationCalendlyClick(ctaLabel: string): void {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    _mtm?: Array<Record<string, unknown>>;
    _paq?: unknown[][];
  };

  w._mtm = w._mtm || [];
  w._mtm.push({
    event: "cta_consultation_click",
    cta_label: ctaLabel,
    page_path: window.location?.pathname ?? "",
  });

  w._paq = w._paq || [];
  w._paq.push(["trackEvent", "Konsultacja", "Calendly", ctaLabel]);
}

export function trackConsultationModalOpen(ctaLabel: string): void {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    _mtm?: Array<Record<string, unknown>>;
    _paq?: unknown[][];
  };

  w._mtm = w._mtm || [];
  w._mtm.push({
    event: "consultation_modal_open",
    cta_label: ctaLabel,
    page_path: window.location?.pathname ?? "",
  });

  w._paq = w._paq || [];
  w._paq.push(["trackEvent", "Konsultacja", "Modal open", ctaLabel]);
}

export function trackConsultationRequestSubmit(
  method: "email" | "phone",
  outcome: "success" | "fallback_mailto" | "validation_error",
): void {
  if (typeof window === "undefined") return;

  const w = window as unknown as {
    _mtm?: Array<Record<string, unknown>>;
    _paq?: unknown[][];
  };

  w._mtm = w._mtm || [];
  w._mtm.push({
    event: "consultation_request_submit",
    preferred_contact_method: method,
    submit_outcome: outcome,
    page_path: window.location?.pathname ?? "",
  });

  w._paq = w._paq || [];
  w._paq.push([
    "trackEvent",
    "Konsultacja",
    `Submit ${outcome}`,
    method === "email" ? "Email" : "Telefon",
  ]);
}

/** Wszystkie `<a href="tel:…">` i `<a href="mailto:…">` na stronie (również dodane później). */
export function bindMatomoContactLinkTracking(): () => void {
  if (typeof document === "undefined") return () => undefined;

  const onClick = (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    const a = e.target.closest("a[href]");
    if (!a || !(a instanceof HTMLAnchorElement)) return;
    const href = a.getAttribute("href")?.trim() ?? "";
    if (href.startsWith("tel:") || href.startsWith("mailto:")) {
      trackContactProtocolLinkClick(href);
    }
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}

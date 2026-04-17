import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { suppressNextHomeHashScrollSync } from "@/hooks/home-hash-scroll-suppress";

/** Tylko sekcje z menu - kolejność jak na stronie głównej (scroll-spy + hash w URL) */
const SECTION_IDS = [
  "dla-kogo",
  "oferta",
  "jak-dzialamy",
  "technologie",
  "case-study",
  "zespol",
  "kontakt",
] as const;

/** Linia „odczytu” w viewport (poniżej nagłówka): która sekcja ją przecina jest aktywna */
const PROBE_Y_RATIO = 0.32;

function decodeHashFragment(hash: string): string {
  const raw = hash.replace(/^#/, "");
  if (!raw) return "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function resolveActiveSectionId(probeY: number): string | null {
  const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
    (el): el is HTMLElement => el !== null
  );

  let current: string | null = null;
  for (const el of sections) {
    const rect = el.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom >= probeY) {
      current = el.id;
      break;
    }
  }
  if (current === null && sections.length > 0) {
    for (let i = sections.length - 1; i >= 0; i--) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top < probeY) {
        current = sections[i].id;
        break;
      }
    }
  }
  return current;
}

/**
 * Id sekcji widocznej na stronie głównej (scroll-spy). Na innych trasach zwraca null.
 *
 * Przy przewijaniu na `/` ustawia hash w URL (`replace`). Przed `navigate` ustawiana jest flaga,
 * żeby `useScrollToHashOnHome` nie wywołał `scrollIntoView` (tylko klik w menu / hash z linku przewija).
 */
export function useActiveNavSection(): string | null {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (location.pathname !== "/" || typeof document === "undefined") {
      return;
    }

    const probeY = () => window.innerHeight * PROBE_Y_RATIO;

    const updateHighlight = (): string | null => {
      const current = resolveActiveSectionId(probeY());
      setActiveId(current);
      return current;
    };

    const syncHashIfNeeded = (current: string | null): void => {
      const inUrl = decodeHashFragment(window.location.hash);
      if (current) {
        if (inUrl === current) return;
        suppressNextHomeHashScrollSync();
        navigate({ pathname: "/", hash: current }, { replace: true });
        return;
      }
      if (inUrl) {
        suppressNextHomeHashScrollSync();
        navigate({ pathname: "/", hash: "" }, { replace: true });
      }
    };

    updateHighlight();
    const syncOnce = window.setTimeout(() => updateHighlight(), 0);

    const onScrollOrResize = (): void => {
      const current = updateHighlight();
      syncHashIfNeeded(current);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    let raf1 = 0;
    let raf2 = 0;
    if (!window.location.hash) {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          const current = updateHighlight();
          syncHashIfNeeded(current);
        });
      });
    }

    return () => {
      clearTimeout(syncOnce);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [location.pathname, navigate]);

  return location.pathname === "/" ? activeId : null;
}

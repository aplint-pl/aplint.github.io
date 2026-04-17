import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { consumeHomeHashScrollSuppress } from "@/hooks/home-hash-scroll-suppress";

export function useScrollToHashOnHome(): void {
  const location = useLocation();

  useEffect(() => {
    const skipScrollFromHashEffect = consumeHomeHashScrollSuppress();

    if (location.pathname !== "/") return;

    const getId = (): string => {
      const raw = (location.hash || window.location.hash || "").replace(/^#/, "");
      return raw ? decodeURIComponent(raw) : "";
    };

    const scrollToEl = (): boolean => {
      const id = getId();
      if (!id) return true;
      const el = document.getElementById(id);
      if (!el) return false;
      const probeY = window.innerHeight * 0.32;
      const rect = el.getBoundingClientRect();
      if (rect.top <= probeY && rect.bottom >= probeY) return true;
      el.scrollIntoView({ behavior: "auto", block: "start" });
      return true;
    };

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const tryLater = (delayMs: number, attempt: number): void => {
      if (attempt > 15 || cancelled) return;
      timeouts.push(
        window.setTimeout(() => {
          if (cancelled) return;
          if (scrollToEl()) return;
          tryLater(40, attempt + 1);
        }, delayMs)
      );
    };

    if (!skipScrollFromHashEffect) {
      if (!scrollToEl()) {
        tryLater(0, 0);
      }
    }

    const onHashChange = (): void => {
      scrollToEl();
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelled = true;
      for (const t of timeouts) clearTimeout(t);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [location.pathname, location.hash, location.key]);
}

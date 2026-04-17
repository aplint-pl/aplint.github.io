import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const RobotIllustration = () => {
  return (
    <svg
      viewBox="0 0 520 380"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Holograficzna sieć AI skanuje zagubioną ścieżkę"
      className="w-full h-auto drop-shadow-[0_14px_40px_hsl(var(--primary)/0.18)]"
    >
      <defs>
        <linearGradient id="holoLine" x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0%"
            stopColor="hsl(var(--primary) / 0.85)"
            stopOpacity="1"
          />
          <stop
            offset="100%"
            stopColor="hsl(var(--accent) / 0.65)"
            stopOpacity="1"
          />
        </linearGradient>

        <radialGradient id="holoGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.28)" />
          <stop offset="65%" stopColor="hsl(var(--primary) / 0.10)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Soft glow behind the hologram */}
      <ellipse cx="258" cy="210" rx="168" ry="120" fill="url(#holoGlow)" opacity="0.9" />

      {/* Holographic network */}
      <g className="motion-safe:animate-float" style={{ transformOrigin: "260px 210px" }}>
        <path
          d="M70 250 C120 190 175 165 235 195 C295 225 335 160 388 154 C438 148 466 172 485 214"
          fill="none"
          stroke="url(#holoLine)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M95 290 C150 255 196 235 250 240 C312 245 352 285 400 270 C450 255 475 225 492 190"
          fill="none"
          stroke="hsl(var(--primary) / 0.35)"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Connection nodes */}
        <g opacity="0.95">
          <circle cx="140" cy="202" r="9" fill="hsl(var(--accent) / 0.65)" className="motion-safe:animate-glow" />
          <circle cx="235" cy="195" r="7" fill="hsl(var(--primary) / 0.45)" className="motion-safe:animate-pulse" />
          <circle cx="335" cy="165" r="8" fill="hsl(var(--accent) / 0.45)" className="motion-safe:animate-pulse" style={{ animationDelay: "120ms" }} />
          <circle cx="438" cy="210" r="7" fill="hsl(var(--primary) / 0.38)" className="motion-safe:animate-pulse" style={{ animationDelay: "240ms" }} />
        </g>

        {/* Status fragments */}
        <g opacity="0.55">
          <text
            x="255"
            y="222"
            textAnchor="middle"
            fontSize="54"
            fontWeight="900"
            fill="hsl(var(--primary-foreground) / 0.10)"
            style={{ letterSpacing: "-0.06em" }}
          >
            404
          </text>
        </g>

        {/* Thin scan rays */}
        <g opacity="0.85">
          <path d="M150 310 L225 240" stroke="hsl(var(--primary) / 0.45)" strokeWidth="3" strokeLinecap="round" />
          <path d="M265 265 L350 180" stroke="hsl(var(--accent) / 0.42)" strokeWidth="3" strokeLinecap="round" />
          <path d="M380 290 L460 190" stroke="hsl(var(--primary) / 0.35)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Błąd 404: Użytkownik próbował wejść na nieistniejącą ścieżkę:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background effects */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-95 bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.26)_0%,transparent_55%),radial-gradient(circle_at_85%_25%,hsl(var(--accent)/0.20)_0%,transparent_52%),radial-gradient(circle_at_55%_80%,hsl(var(--primary)/0.16)_0%,transparent_58%)]" />

        {/* Wireframe grid */}
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,hsl(var(--primary)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.25)_1px,transparent_1px)] [background-size:52px_52px]" />

        {/* Scanlines */}
        <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(to_bottom,hsl(var(--foreground)/0.10)_0px,hsl(var(--foreground)/0.10)_1px,transparent_6px,transparent_13px)] motion-safe:animate-float" />

        {/* Floating frame */}
        <div className="absolute -left-24 top-24 h-[420px] w-[420px] rounded-full border border-primary/25 opacity-70 motion-safe:animate-glow" />
      </div>

      {/* Hologram illustration */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-10 -top-14 w-[420px] sm:w-[520px] opacity-95">
          <RobotIllustration />
        </div>
      </div>

      <main className="relative z-10 mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <section className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-7 sm:p-9 shadow-[var(--shadow-elegant)]">
          {/* Terminal header */}
          <div className="flex items-center gap-3">
            <span className="h-3.5 w-3.5 rounded-full bg-destructive/70" />
            <span className="h-3.5 w-3.5 rounded-full bg-accent/70" />
            <span className="h-3.5 w-3.5 rounded-full bg-primary/70" />
            <span className="ml-1 text-sm text-foreground/60">terminal</span>
          </div>

          {/* Status */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/40 px-3 py-1 text-sm text-foreground/70">
              <span className="relative h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-accent/80 animate-ping opacity-70" />
                <span className="relative block h-2.5 w-2.5 rounded-full bg-accent/85" />
              </span>
              Analizuję ścieżkę…
            </div>

            <div className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/30 px-3 py-1 text-sm text-foreground/60">
              <span className="font-mono">kod:</span>
              <span className="font-semibold">404</span>
            </div>
          </div>

          {/* Main content */}
          <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
            <div>
              <h1 className="relative text-5xl sm:text-6xl font-extrabold tracking-tight">
                <span className="block">404</span>
                <span
                  aria-hidden
                  className="absolute inset-0 text-primary/70"
                  style={{
                    transform: "translate(2px, 0px)",
                    animation: "glitchA 2.4s infinite linear",
                  }}
                >
                  404
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 text-accent/70"
                  style={{
                    transform: "translate(-2px, 0px)",
                    animation: "glitchB 2.9s infinite linear",
                  }}
                >
                  404
                </span>
              </h1>

              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground">
                Nie znaleziono strony
              </h2>

              <p className="mt-3 text-base sm:text-lg text-foreground/70 leading-relaxed">
                Ten adres nie istnieje albo został przeniesiony. Spróbuj wrócić na stronę główną
                lub zajrzeć do FAQ.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-start">
                <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
                  <a href="/">Wróć na stronę główną</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <a href="/faq">Zobacz FAQ</a>
                </Button>
              </div>

              <style>{`
                @keyframes glitchA {
                  0%, 100% { clip-path: inset(0 0 0 0); opacity: 0.75; }
                  12% { clip-path: inset(12% 0 64% 0); opacity: 0.95; }
                  28% { clip-path: inset(40% 0 20% 0); opacity: 0.85; }
                  46% { clip-path: inset(65% 0 10% 0); opacity: 0.9; }
                  62% { clip-path: inset(25% 0 45% 0); opacity: 0.95; }
                  78% { clip-path: inset(58% 0 14% 0); opacity: 0.8; }
                }
                @keyframes glitchB {
                  0%, 100% { clip-path: inset(0 0 0 0); opacity: 0.65; }
                  10% { clip-path: inset(55% 0 15% 0); opacity: 0.95; }
                  22% { clip-path: inset(15% 0 55% 0); opacity: 0.85; }
                  36% { clip-path: inset(48% 0 18% 0); opacity: 0.9; }
                  58% { clip-path: inset(30% 0 40% 0); opacity: 0.95; }
                  74% { clip-path: inset(8% 0 70% 0); opacity: 0.8; }
                }
                @media (prefers-reduced-motion: reduce) {
                  .motion-safe\\:animate-float,
                  .motion-safe\\:animate-glow,
                  .motion-safe\\:animate-pulse,
                  .motion-safe\\:animate-ping {
                    animation: none !important;
                  }
                  h1 > span[aria-hidden] { animation: none !important; }
                }
              `}</style>
            </div>

            <div>
              <div className="rounded-xl border border-border/40 bg-background/35 p-4">
                <div className="text-xs font-semibold text-foreground/60">Szczegóły</div>
                <div className="mt-3 space-y-2 text-sm text-foreground/70">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-foreground/60">ścieżka</span>
                    <span className="font-mono break-all text-right">{location.pathname}</span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-foreground/60">status</span>
                    <span className="inline-flex items-center gap-2 font-semibold">
                      <span className="h-2 w-2 rounded-full bg-accent/85 animate-pulse" />
                      nie znaleziono
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-foreground/60">wskazówka</span>
                    <span className="text-right">Spróbuj `/` albo `/faq`.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotFound;

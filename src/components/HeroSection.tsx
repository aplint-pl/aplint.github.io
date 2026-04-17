import { Button } from "@/components/ui/button";
import ConsultationModal from "@/components/ConsultationModal";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative scroll-mt-14 min-h-[calc(85svh-3.5rem)] flex items-center justify-center bg-gradient-bg overflow-visible">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle branded mesh + grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
        <div
          className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] [background-size:48px_48px]"
        />

        {/* Brand orbs */}
        <div className="absolute -top-10 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-[34rem] h-[34rem] bg-primary-glow/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        {/* AI Network Pattern */}
        <div className="absolute top-6 right-6 opacity-15">
          <svg width="220" height="220" viewBox="0 0 200 200" className="animate-glow">
            <defs>
              <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="4" fill="url(#networkGradient)" />
            <circle cx="150" cy="50" r="4" fill="url(#networkGradient)" />
            <circle cx="100" cy="100" r="4" fill="url(#networkGradient)" />
            <circle cx="50" cy="150" r="4" fill="url(#networkGradient)" />
            <circle cx="150" cy="150" r="4" fill="url(#networkGradient)" />
            <line x1="50" y1="50" x2="150" y2="50" stroke="url(#networkGradient)" strokeWidth="1" />
            <line x1="50" y1="50" x2="100" y2="100" stroke="url(#networkGradient)" strokeWidth="1" />
            <line x1="150" y1="50" x2="100" y2="100" stroke="url(#networkGradient)" strokeWidth="1" />
            <line x1="100" y1="100" x2="50" y2="150" stroke="url(#networkGradient)" strokeWidth="1" />
            <line x1="100" y1="100" x2="150" y2="150" stroke="url(#networkGradient)" strokeWidth="1" />
          </svg>
        </div>
      </div>
      
      <div className="relative container mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/images/aplint-logo.svg"
            alt="APLiNT"
            className="h-24 md:h-32 dark:hidden"
          />
          <img
            src="/images/aplint-logo-inv.svg"
            alt="APLiNT"
            className="hidden h-24 md:h-32 dark:block"
          />
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7x1 font-bold mb-6 text-balance">
          Wdrażamy AI w Twoim biznesie
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
          Automatyzujemy procesy w działach produkcji, finansów i logistyki.
          Szybkie wdrożenie. Integracja z Twoimi systemami.
          <br />
          Dane zostają u Ciebie.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <ConsultationModal
            trigger={
              <Button
                variant="hero"
                size="xl"
                className="hover:animate-none"
              >
                Bezpłatna konsultacja
              </Button>
            }
          />
          <Button variant="outline" size="xl" asChild>
            <Link to="/#oferta">Nasza oferta</Link>
          </Button>
        </div>

        <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mt-4 text-balance">
          Porozmawiajmy o Twoich pomysłach - bez zobowiązań
        </p>

      </div>
    </section>
  );
};

export default HeroSection;

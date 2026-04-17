import ConsultationModal from "@/components/ConsultationModal";
import { Button } from "@/components/ui/button";

export default function PreContactCtaSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-muted/20" />
        <div className="absolute -top-16 left-1/4 w-80 h-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full bg-primary-glow/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] [background-size:64px_64px]"
        />
      </div>

      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto rounded-2xl border border-primary/20 bg-card/70 backdrop-blur-md shadow-elegant p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-foreground">
            Gotowy, żeby usprawnić swoje procesy?
          </h2>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 text-balance">
            Porozmawiajmy o Twoich wyzwaniach. Pierwsza konsultacja jest
            bezpłatna i niezobowiązująca.
          </p>

          <div className="flex flex-col items-center gap-4">
            <ConsultationModal
              trigger={
                <Button variant="hero" size="xl" className="group">
                  Umów rozmowę
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}


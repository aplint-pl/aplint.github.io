import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProcessSection = () => {
  const steps = [
    {
      number: "1",
      title: "Analiza potrzeb",
      time: "1-2 tygodnie",
      description:
        "Rozmawiamy z Twoim zespołem, mapujemy procesy i identyfikujemy miejsca, gdzie AI da największy efekt. Nie wdrażamy technologii dla samej technologii - szukamy realnych korzyści biznesowych.",
      deliverable: "Raport z rekomendacjami i estymacją ROI",
    },
    {
      number: "2",
      title: "Pilotaż",
      time: "2-4 tygodnie",
      description:
        "Budujemy działający prototyp na rzeczywistych danych. Pokazujemy efekty, zanim zainwestujesz w pełne wdrożenie. To moment, w którym weryfikujesz wartość rozwiązania.",
      deliverable: "Działające rozwiązanie w ograniczonym zakresie",
    },
    {
      number: "3",
      title: "Wdrożenie",
      time: "4-8 tygodni",
      description:
        "Rozwijamy pilotaż do pełnego rozwiązania, integrujemy z Twoimi systemami i szkolimy użytkowników końcowych. Dbamy o to, żeby przejście było płynne i bezbolesne.",
      deliverable:
        "Produkcyjne rozwiązanie AI zintegrowane z Twoją infrastrukturą",
    },
    {
      number: "4",
      title: "Wsparcie i rozwój",
      time: "Ciągłe",
      description:
        "Monitorujemy działanie rozwiązania, reagujemy na problemy i rozwijamy funkcjonalności. AI to nie jest projekt jednorazowy - to narzędzie, które rośnie razem z Twoją firmą.",
      deliverable:
        "SLA, monitoring, regularne przeglądy i aktualizacje",
    }
  ];

  return (
    <section id="jak-dzialamy" className="scroll-mt-14 py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
            Jak wdrażamy AI w Twojej firmie
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6 text-balance">
            Sprawdzony proces, który minimalizuje ryzyko i maksymalizuje efekty
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step) => (
            <Card
              key={step.number}
              className="group relative flex h-full flex-col overflow-hidden border-border bg-card/70 backdrop-blur-sm hover:shadow-elegant transition-all duration-500"
            >
              <div className="absolute top-4 right-4 text-4xl lg:text-5xl font-bold text-primary/25">
                {step.number}
              </div>

              <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-lg text-foreground pr-10">
                  {step.title}
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {step.time}
                </div>
              </CardHeader>

              <CardContent className="relative z-10 flex flex-1 flex-col pt-0">
                <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {step.description}
                </CardDescription>

                <div className="mt-auto space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">
                    Co dostarczamy
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {step.deliverable}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Typowy czas wdrożenia
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto text-balance">
                Typowy czas od pierwszego kontaktu do działającego rozwiązania:
                8-14 tygodni
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
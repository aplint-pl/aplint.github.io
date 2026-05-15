import ConsultationModal from "@/components/ConsultationModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PortfolioSection = () => {
  return (
    <section
      id="case-study"
      className="scroll-mt-14 py-20 bg-gradient-to-b from-muted/10 to-background"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Przykład wdrożenia
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto text-balance">
            Jak AI usprawniło proces w firmie produkcyjnej
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border bg-card/70 backdrop-blur-sm overflow-hidden">
            <CardHeader>
              <Badge variant="secondary" className="text-sm">
                Dział finansów • Automatyzacja
              </Badge>
              <CardTitle className="text-2xl text-foreground mt-3">
                Automatyzacja wniosków zakupowych w globalnej firmie produkcyjnej
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-foreground">
                  Kontekst
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Globalna firma produkcyjna z branży AGD borykała się z
                  czasochłonnym procesem tworzenia wniosków zakupowych. Zespół
                  finansowy spędzał godziny na ręcznym przepisywaniu danych i
                  weryfikacji dokumentów.
                </CardDescription>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-foreground">
                  Wyzwanie
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Ręczne tworzenie wniosków zakupowych wymagało dużo czasu,
                  było podatne na błędy i angażowało wykwalifikowanych
                  pracowników w powtarzalne zadania.
                </CardDescription>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-foreground">
                  Rozwiązanie
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Wdrożyliśmy system AI, który automatycznie analizuje dokumenty
                  źródłowe, wyciąga kluczowe dane i generuje gotowe wnioski
                  zakupowe zgodne z wewnętrznymi procedurami firmy.
                </CardDescription>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-foreground">
                  Wyniki
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold" aria-hidden="true">
                      92%
                    </span>
                    <span>mniej ręcznych interwencji</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold" aria-hidden="true">
                      ↑
                    </span>
                    <span>Większa dokładność danych</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-semibold" aria-hidden="true">
                      ↑
                    </span>
                    <span>Szybszy czas przetwarzania</span>
                  </li>
                </ul>
              </div>

              <blockquote className="border-l-2 border-primary/40 pl-4 py-2 text-sm text-muted-foreground">
                „Nasz zespół może teraz skupić się na analizie i optymalizacji
                zamiast na przepisywaniu danych.”
                <div className="text-xs text-muted-foreground/80 mt-2">
                  — Dyrektor finansowy
                </div>
              </blockquote>

              <div className="text-center pt-4">
                <div className="text-2xl font-bold text-foreground mb-2">
                  Masz podobne wyzwanie? Porozmawiajmy!
                </div>
                <ConsultationModal
                  trigger={
                    <Button variant="hero" size="xl" className="group">
                      Umów bezpłatną konsultację
                    </Button>
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
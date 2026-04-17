import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, FileText, Settings, Target } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Settings,
      title: "Automatyzacja procesów",
      description:
        "Identyfikujemy powtarzalne zadania, które pochłaniają czas Twojego zespołu, i automatyzujemy je za pomocą AI. Faktury, wnioski, raporty, korespondencja - to wszystko może dziać się samo.",
      effects: [
        "Redukcja czasu na rutynowe zadania nawet o 90%",
        "Eliminacja błędów ludzkich",
        "Pracownicy skupiają się na tym, co ważne",
      ],
    },
    {
      icon: Target,
      title: "Wspomaganie decyzji",
      description:
        "AI analizuje dane z Twoich systemów i dostarcza rekomendacje w czasie rzeczywistym. Zamiast zgadywać lub tracić godziny na analizę Exceli - dostajesz konkretne odpowiedzi.",
      effects: [
        "Szybsze podejmowanie decyzji",
        "Decyzje oparte na danych, nie intuicji",
        "Wczesne wykrywanie problemów i szans",
      ],
    },
    {
      icon: FileText,
      title: "Analiza treści i dokumentów",
      description:
        "Maile, zapytania ofertowe, umowy, specyfikacje - AI czyta, kategoryzuje i wyciąga kluczowe informacje. Twój zespół dostaje gotowe podsumowania zamiast stosów dokumentów.",
      effects: [
        "Automatyczna kategoryzacja korespondencji",
        "Wyciąganie kluczowych danych z dokumentów",
        "Szybsza reakcja na zapytania klientów",
      ],
    }
  ];

  return (
    <section id="oferta" className="scroll-mt-14 py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Co robimy
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto text-balance">
            Trzy obszary, w których AI przynosi wymierne korzyści
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group transition-all duration-300 hover:shadow-elegant border-border bg-card/50 backdrop-blur-sm overflow-hidden"
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-primary/10 flex items-center justify-center mb-4">
                  <service.icon
                    className="h-7 w-7 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <CardTitle className="text-xl text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </CardDescription>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide">
                    Efekty
                  </div>
                  <ul className="space-y-2">
                    {service.effects.map((effect) => (
                      <li
                        key={effect}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check
                          className="mt-0.5 h-5 w-5 text-primary"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

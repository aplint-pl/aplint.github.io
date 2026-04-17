import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Check, Factory, Package } from "lucide-react";

const forWho = [
  {
    icon: Factory,
    title: "Dział produkcji",
    description:
      "Optymalizacja planowania, predykcja awarii, kontrola jakości. AI analizuje dane z maszyn i systemów, żebyś mógł podejmować lepsze decyzje - szybciej.",
    bullets: [
      "Automatyczne planowanie produkcji",
      "Wczesne wykrywanie anomalii",
      "Analiza przyczyn przestojów",
    ],
  },
  {
    icon: BarChart3,
    title: "Dział finansów",
    description:
      "Automatyzacja powtarzalnych zadań - od przetwarzania faktur po tworzenie wniosków zakupowych. Mniej ręcznej pracy, mniej błędów, więcej czasu na analizę.",
    bullets: [
      "Automatyczne tworzenie wniosków zakupowych",
      "Przetwarzanie i kategoryzacja faktur",
      "Wykrywanie anomalii w rozliczeniach",
    ],
  },
  {
    icon: Package,
    title: "Dział logistyki",
    description:
      "Inteligentna analiza zapytań ofertowych, automatyzacja dokumentacji transportowej, optymalizacja zapasów. AI odciąża Twój zespół od rutynowych zadań.",
    bullets: [
      "Automatyczna analiza zapytań ofertowych",
      "Kategoryzacja i priorytetyzacja zamówień",
      "Prognozowanie stanów magazynowych",
    ],
  },
];

export default function ForWhoSection() {
  return (
    <section
      id="dla-kogo"
      className="relative scroll-mt-14 py-20 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
        <div
          className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div className="absolute -top-24 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
            Wspieramy działy, które mają najwięcej do zyskania
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Wspieramy średnie i duże przedsiębiorstwa (30-1000 pracowników),
            które chcą usprawnić codzienne operacje bez rewolucji w IT.
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {forWho.map((item) => (
            <Card
              key={item.title}
              className="group max-w-md mx-auto relative bg-gradient-to-br from-primary/15 to-transparent border-border bg-card/60 backdrop-blur-sm"
            >
              <CardHeader className="text-center relative z-10">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center mb-4">
                  <item.icon
                    className="h-7 w-7 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <CardTitle className="text-xl text-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-muted-foreground leading-relaxed mb-4 text-base md:text-lg">
                  {item.description}
                </CardDescription>
                <ul className="space-y-3 text-muted-foreground">
                  {item.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 rounded-lg border border-primary/15 bg-primary/5 px-3 py-2 transition-colors hover:border-primary/25"
                    >
                      <Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span className="leading-relaxed text-sm md:text-base">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


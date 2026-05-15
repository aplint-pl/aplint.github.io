import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bolt, Link2, ShieldCheck } from "lucide-react";

const highlights = [
  {
    icon: Bolt,
    label: "Tempo wdrożeń",
    title: "Wdrożenia w tygodniach, nie miesiącach",
    description:
      "Nie wierzymy w projekty ciągnące się latami. Działamy zwinnie - pierwsze efekty zobaczysz szybciej, niż myślisz. Zaczynamy od pilotażu, który udowadnia wartość, zanim zainwestujesz więcej.",
  },
  {
    icon: Link2,
    label: "Kompatybilność",
    title: "Integracja z każdym systemem",
    description:
      "Masz ERP, WMS, CRM lub własne rozwiązania? Nie musisz niczego wymieniać. Nasze rozwiązania AI łączą się z Twoją istniejącą infrastrukturą - Comarch, SAP, Subiekt, Excel czy systemy dedykowane.",
  },
  {
    icon: ShieldCheck,
    label: "Kontrola danych",
    title: "Twoje dane zostają u Ciebie",
    description:
      "Wykorzystujemy lokalne modele AI, które działają w Twojej infrastrukturze. Dane produkcyjne, ceny, receptury i informacje o klientach nie opuszczają Twojej firmy. Pełna zgodność i kontrola.",
  },
];

export default function HighlightsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance">
            Dlaczego firmy produkcyjne wybierają APLiNT
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto" />
          <div className="mt-6 flex justify-center">
            <Button variant="outline" size="xl" asChild>
              <a href="/faq">Często zadawane pytania</a>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 md:grid-rows-2 md:gap-8">
          {highlights.map((h, index) => {
            const placement =
              index === 0
                ? "md:col-span-5 md:col-start-1 md:row-start-1"
                : index === 1
                  ? "md:col-span-5 md:col-start-7 md:row-start-1"
                  : "md:col-span-6 md:col-start-4 md:row-start-2";

            return (
            <Card
              key={h.title}
              className={[
                "group relative overflow-hidden transition-all duration-300 hover:shadow-elegant border-border bg-card/60 backdrop-blur-sm",
                placement,
              ].join(" ")}
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-60" />

              <CardHeader className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-semibold text-primary">
                    {h.label}
                  </span>
                </div>

                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-primary/10 ring-1 ring-primary/20 flex items-center justify-center mb-4">
                  <h.icon className="h-7 w-7 text-primary" aria-hidden="true" />
                </div>

                <CardTitle className="text-xl text-foreground text-center">
                  {h.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <CardDescription className="text-muted-foreground leading-relaxed text-base md:text-[1.02rem]">
                  {h.description}
                </CardDescription>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}


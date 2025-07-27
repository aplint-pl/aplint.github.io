import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, PenTool, Wrench, HeartHandshake } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Analiza potrzeb",
      description: "Zaczynamy od dokładnego zrozumienia Twoich wyzwań i celów. Nasz zespół przeprowadza szczegółową analizę, aby zidentyfikować obszary, w których sztuczna inteligencja może przynieść największe korzyści."
    },
    {
      icon: PenTool,
      number: "02",
      title: "Projektowanie rozwiązań",
      description: "Na podstawie zebranych informacji tworzymy spersonalizowaną strategię, która odpowiada na Twoje unikalne potrzeby. Nasze rozwiązania są projektowane z myślą o maksymalnej efektywności i dopasowaniu do specyfiki Twojego biznesu."
    },
    {
      icon: Wrench,
      number: "03",
      title: "Wdrożenie i testowanie",
      description: "Przechodzimy do implementacji i optymalizacji rozwiązań. Nasz zespół dba o to, aby proces wdrożenia przebiegał sprawnie, a wszystkie systemy działały zgodnie z oczekiwaniami. Testujemy i dostosowujemy technologie, aby zapewnić ich najwyższą wydajność."
    },
    {
      icon: HeartHandshake,
      number: "04",
      title: "Wsparcie i rozwój",
      description: "Oferujemy ciągłe wsparcie i aktualizacje technologii, aby Twoje rozwiązania AI były zawsze na bieżąco z najnowszymi trendami i możliwościami. Jesteśmy z Tobą na każdym etapie rozwoju Twojego biznesu."
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Jak działamy - nasz proces
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-500"
            >
              {/* Step number background */}
              <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                {step.number}
              </div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-primary rounded-lg group-hover:animate-glow">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Krok {step.number}
                  </div>
                </div>
                <CardTitle className="text-xl text-foreground">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Od małych firm do enterprise
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto">
                Stosujemy rozwiązania chmurowe oraz lokalne. Niezależnie od tego, czy prowadzisz zaawansowaną produkcję, biuro rachunkowe, czy fundację, dobierzemy odpowiednie rozwiązania, które spełnią Twoje oczekiwania i pomogą osiągnąć sukces.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
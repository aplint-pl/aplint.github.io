import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, PenTool, Wrench, HeartHandshake } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: Search,
      number: "1",
      title: "Analiza potrzeb",
      description: "Zaczynamy od dokładnego zrozumienia Twoich wyzwań i celów. Nasz zespół przeprowadza szczegółową analizę, aby zidentyfikować obszary, w których sztuczna inteligencja może przynieść największe korzyści.",
      image: "/images/chart.jpg"
    },
    {
      icon: PenTool,
      number: "2",
      title: "Projektowanie rozwiązań",
      description: "Na podstawie zebranych informacji tworzymy spersonalizowaną strategię, która odpowiada na Twoje unikalne potrzeby. Nasze rozwiązania są projektowane z myślą o maksymalnej efektywności i dopasowaniu do specyfiki Twojego biznesu.",
      image: "/images/draw.jpg"
    },
    {
      icon: Wrench,
      number: "3",
      title: "Wdrożenie i testowanie",
      description: "Przechodzimy do implementacji i optymalizacji rozwiązań. Nasz zespół dba o to, aby proces wdrożenia przebiegał sprawnie, a wszystkie systemy działały zgodnie z oczekiwaniami. Testujemy i dostosowujemy technologie, aby zapewnić ich najwyższą wydajność.",
      image: "/images/dashboard.jpg"
    },
    {
      icon: HeartHandshake,
      number: "4",
      title: "Wsparcie i rozwój",
      description: "Oferujemy ciągłe wsparcie i aktualizacje technologii, aby Twoje rozwiązania AI były zawsze na bieżąco z najnowszymi trendami i możliwościami. Jesteśmy z Tobą na każdym etapie rozwoju Twojego biznesu.",
      image: "/images/clock.jpg"
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

        {/* Process Timeline Visualization */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-bold text-center text-foreground mb-6">Nasz proces krok po kroku</h3>
            <div className="flex items-center justify-between relative max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-2 animate-glow">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-sm font-medium text-foreground text-center max-w-20">{step.title}</div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                    {step.number}
                  </div>
                </div>
              ))}
              {/* Connection line */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-gradient-primary opacity-30 -z-10"></div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-500"
            >
              {/* Step Image */}
              <div className="w-full h-32 relative overflow-hidden mb-4">
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                {/* Image overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                {/* Step number overlay */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {step.number}
                </div>
                
                {/* Step icon overlay */}
                <div className="absolute top-2 left-2 p-2 rounded-full bg-gradient-primary group-hover:animate-glow">
                  <step.icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              
              {/* Step number background */}
              <div className="absolute bottom-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                {step.number}
              </div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Krok {step.number}
                  </div>
                </div>
                <CardTitle className="text-xl text-foreground">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                  {step.description}
                </CardDescription>
                
                {/* Process indicators */}
                <div className="flex items-center justify-center space-x-2">
                  {[...Array(4)].map((_, dotIndex) => (
                    <div 
                      key={dotIndex} 
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${dotIndex <= index ? 'bg-primary' : 'bg-primary/20'}`}
                    ></div>
                  ))}
                </div>
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
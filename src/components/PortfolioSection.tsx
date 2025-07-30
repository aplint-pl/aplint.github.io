import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, Users } from "lucide-react";

const PortfolioSection = () => {
  const projects = [
    {
      title: "System optymalizacji produkcji",
      industry: "Produkcja",
      description: "Wdrożenie AI do optymalizacji procesów produkcyjnych w fabryce mebli. Redukcja kosztów o 30% i zwiększenie efektywności o 45%.",
      results: ["30% redukcja kosztów", "45% wzrost efektywności", "90% mniej błędów"],
      metrics: { time: "3 miesiące", users: "150+", growth: "+45%" },
      imageType: "Dashboard analityczny",
      image: "/images/chart.png"
    },
    {
      title: "Chatbot obsługi klienta",
      industry: "E-commerce",
      description: "Inteligentny asystent AI dla sklepu internetowego. Automatyzacja 80% zapytań klientów i poprawa satysfakcji o 60%.",
      results: ["80% automatyzacja", "60% wzrost satysfakcji", "24/7 dostępność"],
      metrics: { time: "2 miesiące", users: "1000+", growth: "+60%" },
      imageType: "Interface chatbota",
      image: "/images/chart.png"
    },
    {
      title: "Predykcja sprzedaży",
      industry: "Retail",
      description: "System przewidywania popytu wykorzystujący machine learning. Optymalizacja stanów magazynowych i redukcja marnotrawstwa.",
      results: ["25% redukcja zapasów", "15% wzrost sprzedaży", "Eliminacja braków"],
      metrics: { time: "4 miesiące", users: "50+", growth: "+25%" },
      imageType: "Wykresy predykcji",
      image: "/images/chart.png"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Nasze realizacje
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Poznaj przykłady naszych projektów AI, które przyniosły realne korzyści biznesowe
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:scale-105 transition-all duration-300 hover:shadow-elegant border-border bg-card/70 backdrop-blur-sm overflow-hidden">
              {/* Project Image */}
              <div className="w-full h-48 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Image overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                {/* Before/After indicator */}
                <div className="absolute top-3 left-3 bg-background/90 px-2 py-1 rounded text-xs font-medium text-foreground">
                  Case Study
                </div>
                
                {/* Industry badge */}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="text-xs">
                    {project.industry}
                  </Badge>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-primary"></div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Results */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-foreground mb-2">Kluczowe rezultaty:</div>
                  <div className="space-y-1">
                    {project.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                        {result}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {project.metrics.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {project.metrics.users}
                  </div>
                  <div className="flex items-center text-primary">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {project.metrics.growth}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Chcesz zobaczyć więcej realizacji?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Skontaktuj się z nami, aby poznać pełne case studies i sprawdzić, jak możemy pomóc Twojemu biznesowi.
            </p>
            <Button variant="hero" size="lg" className="group">
              Zobacz pełne portfolio
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
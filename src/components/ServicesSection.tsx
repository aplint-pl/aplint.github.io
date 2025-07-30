import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      image: "/images/office.png",
      title: "Wdrażanie rozwiązań AI",
      description: "Nasz zespół ekspertów pomaga firmom w integracji zaawansowanych rozwiązań sztucznej inteligencji (SI, AI), które zwiększają efektywność operacyjną i wspierają rozwój biznesu. Od analizy potrzeb po pełne wdrożenie - jesteśmy z Tobą na każdym etapie."
    },
    {
      image: "/images/meeting.png",
      title: "Konsultacje i doradztwo",
      description: "Oferujemy profesjonalne doradztwo w zakresie strategii AI, pomagając firmom zrozumieć, jak najlepiej wykorzystać sztuczną inteligencję do osiągnięcia ich celów biznesowych. Nasze konsultacje obejmują ocenę gotowości technologicznej, identyfikację możliwości oraz planowanie wdrożeń."
    },
    {
      image: "/images/work.png",
      title: "Dostosowywanie technologii",
      description: "Personalizacja rozwiązań dla specyficznych potrzeb klientów. Rozumiemy, że każda firma jest inna, dlatego dostosowujemy nasze technologie, aby idealnie pasowały do unikalnych wymagań i celów Twojego biznesu. Dzięki temu zapewniamy maksymalną wartość i skuteczność wdrożonych rozwiązań."
    }
  ];

  return (
    <section id="oferta" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Oferta i usługi
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:scale-105 transition-all duration-300 hover:shadow-elegant border-border bg-card/50 backdrop-blur-sm overflow-hidden"
            >
              {/* Service Image */}
              <div className="w-full h-48 relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                {/* Image overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </CardDescription>
                
                {/* Process Schema Placeholder */}
                <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                  <div className="text-xs text-muted-foreground/70 mb-2">Schemat procesu:</div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-1"></div>
                      Analiza
                    </span>
                    <div className="flex-1 mx-2 border-t border-primary/30 relative">
                      <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-primary border-t-2 border-b-2 border-t-transparent border-b-transparent transform -translate-y-1/2"></div>
                    </div>
                    <span className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-1"></div>
                      Wdrożenie
                    </span>
                    <div className="flex-1 mx-2 border-t border-primary/30 relative">
                      <div className="absolute right-0 top-0 w-0 h-0 border-l-4 border-l-primary border-t-2 border-b-2 border-t-transparent border-b-transparent transform -translate-y-1/2"></div>
                    </div>
                    <span className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-glow mr-1"></div>
                      Sukces
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-6">
          <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Zamów bezpłatną konsultację
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Skontaktuj się z nami i dowiedz się, jak możemy przyspieszyć Twoje procesy
            </p>
            <Button variant="hero" size="lg" className="group" onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}>
              Kontakt
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;

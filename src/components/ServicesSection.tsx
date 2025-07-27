import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Users, Settings } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Bot,
      title: "Wdrażanie rozwiązań AI",
      description: "Nasz zespół ekspertów pomaga firmom w integracji zaawansowanych rozwiązań sztucznej inteligencji (SI, AI), które zwiększają efektywność operacyjną i wspierają rozwój biznesu. Od analizy potrzeb po pełne wdrożenie - jesteśmy z Tobą na każdym etapie."
    },
    {
      icon: Users,
      title: "Konsultacje i doradztwo",
      description: "Oferujemy profesjonalne doradztwo w zakresie strategii AI, pomagając firmom zrozumieć, jak najlepiej wykorzystać sztuczną inteligencję do osiągnięcia ich celów biznesowych. Nasze konsultacje obejmują ocenę gotowości technologicznej, identyfikację możliwości oraz planowanie wdrożeń."
    },
    {
      icon: Settings,
      title: "Dostosowywanie technologii",
      description: "Personalizacja rozwiązań dla specyficznych potrzeb klientów. Rozumiemy, że każda firma jest inna, dlatego dostosowujemy nasze technologie, aby idealnie pasowały do unikalnych wymagań i celów Twojego biznesu. Dzięki temu zapewniamy maksymalną wartość i skuteczność wdrożonych rozwiązań."
    }
  ];

  return (
    <section id="ofertas" className="py-20 px-6">
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
              className="group hover:scale-105 transition-all duration-300 hover:shadow-elegant border-border bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center group-hover:animate-glow">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
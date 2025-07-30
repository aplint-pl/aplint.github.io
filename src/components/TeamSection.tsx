import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TeamSection = () => {
  const team = [
    {
      name: "Kamil",
      image: "/images/kamilk.jpg",
      specialty: "Ekspert AI - Branża produkcyjna",
      description: "Specjalizujący się w branży produkcyjnej. Dzięki swojemu doświadczeniu pomaga firmom w optymalizacji procesów produkcyjnych za pomocą nowoczesnych technologii.",
      skills: ["Produkcja", "Optymalizacja procesów", "Automatyzacja"]
    },
    {
      name: "Mateusz",
      image: "/images/mateuszk.png",
      specialty: "Ekspert AI - Strategie wdrożeniowe",
      description: "Specjalizujący się w strategiach wdrożeniowych. Jego umiejętność tworzenia efektywnych planów wdrożeniowych pozwala na płynne i skuteczne integracje AI w różnych sektorach biznesu.",
      skills: ["Strategie wdrożeniowe", "Planowanie", "Integracja AI"]
    },
    {
      name: "Kamil",
      image: "/images/kamilp.jpg",
      specialty: "Ekspert AI - Innowacje",
      description: "Odpowiedzialny za innowacje. Skupia się na poszukiwaniu i implementacji najnowszych rozwiązań technologicznych, które mogą przynieść realne korzyści dla klientów.",
      skills: ["Innowacje", "R&D", "Nowe technologie"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Nasz zespół
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card 
              key={index} 
              className="group hover:scale-105 transition-all duration-500 hover:shadow-elegant border-border bg-card/70 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="text-center relative z-10">
                {/* Professional Photo */}
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 relative overflow-hidden group-hover:shadow-elegant transition-all duration-500">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                  {/* Photo overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50"></div>
                </div>
                
                <CardTitle className="text-2xl text-foreground mb-2">{member.name}</CardTitle>
                <Badge variant="secondary" className="mb-3 text-sm">
                  {member.specialty}
                </Badge>

              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                  {member.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline" className="text-xs border-primary/30 text-primary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Factory, Target, Lightbulb } from "lucide-react";

const TeamSection = () => {
  const team = [
    {
      name: "Kamil",
      icon: Factory,
      specialty: "Ekspert AI - Branża produkcyjna",
      description: "Specjalizujący się w branży produkcyjnej. Dzięki swojemu doświadczeniu pomaga firmom w optymalizacji procesów produkcyjnych za pomocą nowoczesnych technologii.",
      skills: ["Produkcja", "Optymalizacja procesów", "Automatyzacja"]
    },
    {
      name: "Mateusz",
      icon: Target,
      specialty: "Ekspert AI - Strategie wdrożeniowe",
      description: "Specjalizujący się w strategiach wdrożeniowych. Jego umiejętność tworzenia efektywnych planów wdrożeniowych pozwala na płynne i skuteczne integracje AI w różnych sektorach biznesu.",
      skills: ["Strategie wdrożeniowe", "Planowanie", "Integracja AI"]
    },
    {
      name: "Kamil",
      icon: Lightbulb,
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
                {/* Professional Photo Placeholder */}
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 relative overflow-hidden group-hover:shadow-elegant transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 rounded-full bg-gradient-primary group-hover:animate-glow">
                      <member.icon className="h-12 w-12 text-primary-foreground" />
                    </div>
                  </div>
                  {/* Photo overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50"></div>
                  
                  {/* Photo placeholder text */}
                  <div className="absolute bottom-1 right-1 text-xs text-muted-foreground/60 bg-background/90 px-1 py-0.5 rounded text-center">
                    Zdjęcie<br/>{member.name}
                  </div>
                </div>
                
                <CardTitle className="text-2xl text-foreground mb-2">{member.name}</CardTitle>
                <Badge variant="secondary" className="mb-3 text-sm">
                  {member.specialty}
                </Badge>
                
                {/* Specialization Icon Background */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <member.icon className="h-16 w-16 text-primary" />
                </div>
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
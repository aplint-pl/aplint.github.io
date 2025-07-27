import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cloud, Database, Code, Cpu, Shield } from "lucide-react";

const TechnologiesSection = () => {
  const techCategories = [
    {
      title: "Machine Learning & AI",
      icon: Brain,
      description: "Zaawansowane algorytmy uczenia maszynowego i sztucznej inteligencji",
      technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenAI API", "Hugging Face"],
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Cloud & Infrastructure",
      icon: Cloud,
      description: "Skalowalne rozwiązania chmurowe dla wdrożeń AI",
      technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"],
      color: "from-green-500/20 to-blue-500/20"
    },
    {
      title: "Bazy danych & Analytics",
      icon: Database,
      description: "Zarządzanie danymi i analityka dla projektów AI",
      technologies: ["PostgreSQL", "MongoDB", "Redis", "Apache Spark", "Elasticsearch", "BigQuery"],
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Development & APIs",
      icon: Code,
      description: "Narzędzia deweloperskie i integracje systemowe",
      technologies: ["FastAPI", "Node.js", "React", "GraphQL", "REST APIs", "WebSockets"],
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Edge Computing",
      icon: Cpu,
      description: "Rozwiązania AI na urządzeniach brzegowych",
      technologies: ["NVIDIA Jetson", "Raspberry Pi", "Intel NUC", "ARM Processors", "ONNX", "TensorRT"],
      color: "from-yellow-500/20 to-orange-500/20"
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      description: "Bezpieczeństwo i zgodność z regulacjami",
      technologies: ["OAuth 2.0", "JWT", "GDPR", "ISO 27001", "Encryption", "Access Control"],
      color: "from-red-500/20 to-rose-500/20"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Technologie i narzędzia
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Wykorzystujemy najnowsze technologie AI i sprawdzone rozwiązania infrastrukturalne
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">
          {techCategories.map((category, index) => (
            <Card key={index} className="group hover:scale-105 transition-all duration-300 hover:shadow-elegant border-border bg-card/70 backdrop-blur-sm overflow-hidden">
              {/* Technology Visualization */}
              <div className={`w-full h-32 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-background/80 backdrop-blur-sm group-hover:animate-glow">
                    <category.icon className="h-12 w-12 text-primary" />
                  </div>
                </div>
                
                {/* Tech pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-6 gap-1 h-full w-full p-2">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="bg-current rounded-sm opacity-30" style={{
                        animationDelay: `${i * 0.1}s`
                      }}></div>
                    ))}
                  </div>
                </div>
                
                {/* Schema placeholder */}
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground/60 bg-background/90 px-2 py-1 rounded">
                  Schemat architektury
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {category.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Technology badges */}
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="outline" 
                      className="text-xs border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Logo placeholders row */}
                <div className="mt-4 pt-3 border-t border-border/50">
                  <div className="text-xs text-muted-foreground/70 mb-2">Loga technologii:</div>
                  <div className="flex items-center justify-between">
                    {[...Array(3)].map((_, logoIndex) => (
                      <div key={logoIndex} className="w-8 h-8 rounded bg-muted/50 flex items-center justify-center">
                        <div className="w-4 h-4 bg-primary/30 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Infrastructure Diagram Section */}
        <div className="bg-gradient-to-r from-primary/5 to-primary-glow/5 rounded-lg p-8 border border-primary/10">
          <h3 className="text-2xl font-bold text-center text-foreground mb-6">
            Architektura naszych rozwiązań
          </h3>
          
          {/* Infrastructure diagram placeholder */}
          <div className="bg-background/50 rounded-lg p-6 border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Data Layer */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                  <Database className="h-10 w-10 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground">Warstwa danych</div>
                <div className="text-xs text-muted-foreground">Bazy danych, Data Lakes</div>
              </div>
              
              {/* Processing Layer */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                  <Brain className="h-10 w-10 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground">Przetwarzanie AI</div>
                <div className="text-xs text-muted-foreground">ML Models, Analytics</div>
              </div>
              
              {/* Application Layer */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center">
                  <Code className="h-10 w-10 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground">Warstwa aplikacji</div>
                <div className="text-xs text-muted-foreground">APIs, Frontend, Mobile</div>
              </div>
            </div>
            
            {/* Connection lines */}
            <div className="hidden md:block">
              <div className="relative h-1 bg-gradient-primary my-6 rounded-full opacity-30">
                <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-bg overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
      </div>
      
      <div className="relative container mx-auto px-6 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/lovable-uploads/e38032ee-0198-4ff7-919a-c0a6a9c55fba.png" 
            alt="APLINT Logo" 
            className="h-24 md:h-32 animate-glow"
          />
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Wykorzystaj moc AI,<br />zwiększ swoje możliwości
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Wdrażamy AI dla Twojego Biznesu
        </p>

        {/* CTA Button */}
        <Button 
          variant="hero" 
          size="xl" 
          className="animate-pulse hover:animate-none"
          onClick={() => document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Sprawdź naszą ofertę
        </Button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
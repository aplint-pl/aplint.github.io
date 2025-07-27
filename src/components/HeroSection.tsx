import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-bg overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
        
        {/* AI Network Pattern */}
        <div className="absolute top-10 right-10 opacity-20">
          <svg width="200" height="200" viewBox="0 0 200 200" className="animate-glow">
            <defs>
              <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="4" fill="url(#networkGradient)" />
            <circle cx="150" cy="50" r="4" fill="url(#networkGradient)" />
            <circle cx="100" cy="100" r="4" fill="url(#networkGradient)" />
            <circle cx="50" cy="150" r="4" fill="url(#networkGradient)" />
            <circle cx="150" cy="150" r="4" fill="url(#networkGradient)" />
            <line x1="50" y1="50" x2="150" y2="50" stroke="url(#networkGradient)" strokeWidth="1" />
            <line x1="50" y1="50" x2="100" y2="100" stroke="url(#networkGradient)" strokeWidth="1" />
            <line x1="150" y1="50" x2="100" y2="100" stroke="url(#networkGradient)" strokeWidth="1" />
            <line x1="100" y1="100" x2="50" y2="150" stroke="url(#networkGradient)" strokeWidth="1" />
            <line x1="100" y1="100" x2="150" y2="150" stroke="url(#networkGradient)" strokeWidth="1" />
          </svg>
        </div>

        {/* Floating AI Icons */}
        <div className="absolute top-1/3 left-10 opacity-30 animate-float" style={{animationDelay: '1s'}}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="hsl(var(--primary))">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>

        <div className="absolute bottom-1/3 right-20 opacity-30 animate-float" style={{animationDelay: '3s'}}>
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-glow/20 to-primary/20 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="hsl(var(--primary-glow))">
              <path d="M9.5 2A7.5 7.5 0 0 0 2 9.5c0 5.74 7.5 11.5 7.5 11.5s7.5-5.76 7.5-11.5A7.5 7.5 0 0 0 9.5 2z"/>
            </svg>
          </div>
        </div>
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
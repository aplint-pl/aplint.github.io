import HeroSection from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";
import ForWhoSection from "@/components/ForWhoSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import TeamSection from "@/components/TeamSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import ContactSection from "@/components/ContactSection";
import PreContactCtaSection from "@/components/PreContactCtaSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <HighlightsSection />
      <ForWhoSection />
      <ServicesSection />
      <ProcessSection />
      <TechnologiesSection />
      <PortfolioSection />
      <TeamSection />
      <PreContactCtaSection />
      <ContactSection />
    </div>
  );
};

export default Index;

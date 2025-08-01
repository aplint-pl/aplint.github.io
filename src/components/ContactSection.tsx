import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Dziękujemy za kontakt!",
      description: "Otrzymaliśmy Twoją wiadomość i skontaktujemy się z Tobą wkrótce.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/20" id="kontakt">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Kontakt
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Skontaktuj się z nami i dowiedz się, jak możemy przyspieszyć Twoje procesy
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 max-w-2xl mx-auto w-full">
            <Card className="bg-card/70 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Dane kontaktowe</CardTitle>
                <CardDescription>
                  Skontaktuj się z nami bezpośrednio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a href="mailto:kontakt@aplint.pl" className="text-primary hover:text-primary-glow transition-colors">
                      kontakt@aplint.pl
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Telefon</p>
                    <div className="space-y-1">
                      <a href="tel:+48725116342" className="block text-primary hover:text-primary-glow transition-colors">
                        +48 725 116 342
                      </a>
                      <a href="tel:+48883572813" className="block text-primary hover:text-primary-glow transition-colors">
                        +48 883 572 813
                      </a>
                      <a href="tel:+48519500510" className="block text-primary hover:text-primary-glow transition-colors">
                        +48 519 500 510
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Lokalizacja</p>
                    <p className="text-muted-foreground">Aplint Sp. z o.o.<br />Wrocław</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company logo on light background */}
            <Card className="bg-gradient-to-br from-foreground/5 to-primary/5 border-border">
              <CardContent className="p-8 text-center">
                <img 
                  src="/images/aplint-logo.png" 
                  alt="APLINT" 
                  className="h-16 mx-auto opacity-80 hover:opacity-100 transition-opacity"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

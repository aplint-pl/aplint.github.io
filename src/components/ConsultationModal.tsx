import React from "react";
import { useToast } from "@/hooks/use-toast";
import {
  trackConsultationCalendlyClick,
  trackConsultationModalOpen,
  trackConsultationRequestSubmit,
} from "@/lib/matomo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CALENDLY_ENABLED } from "@/config/features";

export const CALENDLY_URL = "https://calendly.com/kontakt-aplint/30min";

type ConsultationTriggerProps = {
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

type ConsultationModalProps = {
  trigger: React.ReactElement<ConsultationTriggerProps>;
};

export default function ConsultationModal({
  trigger,
}: ConsultationModalProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const [contactMethod, setContactMethod] = React.useState<"email" | "phone">(
    "email",
  );
  const [contactValue, setContactValue] = React.useState("");
  const [nameOrCompany, setNameOrCompany] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const ctaLabel =
    typeof trigger.props.children === "string"
      ? trigger.props.children.trim()
      : "CTA";

  const originalOnClick = trigger.props.onClick;

  const handleOpenCalendly = () => {
    if (typeof window === "undefined") return;

    trackConsultationCalendlyClick(ctaLabel);

    toast({
      title: "Otwieramy rezerwację",
      description: "Przekierowujemy do Calendly (nowa karta).",
    });
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  };

  const resetForm = () => {
    setContactMethod("email");
    setContactValue("");
    setNameOrCompany("");
    setDetails("");
  };

  const handleRequestContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedContactValue = contactValue.trim();
    const trimmedNameOrCompany = nameOrCompany.trim();
    const trimmedDetails = details.trim();

    if (!trimmedContactValue || !trimmedNameOrCompany) {
      trackConsultationRequestSubmit(contactMethod, "validation_error");
      toast({
        title: "Uzupełnij wymagane pola",
        description:
          "Podaj dane kontaktowe oraz imię i nazwisko albo nazwę firmy.",
        variant: "destructive",
      });
      return;
    }

    if (typeof window === "undefined") return;

    const subject = encodeURIComponent("Zamów kontakt - APLiNT");
    const preferredMethodLabel = contactMethod === "email" ? "Email" : "Telefon";
    const message = [
      "Nowe zgłoszenie z formularza 'Zamów kontakt':",
      "",
      `Preferowana forma kontaktu: ${preferredMethodLabel}`,
      `Dane kontaktowe: ${trimmedContactValue}`,
      `Imię i nazwisko / firma: ${trimmedNameOrCompany}`,
      trimmedDetails ? `Dodatkowe informacje: ${trimmedDetails}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/kontakt@aplint.pl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Zamów kontakt - APLiNT",
          name: trimmedNameOrCompany,
          email: contactMethod === "email" ? trimmedContactValue : "kontakt-telefon@aplint.pl",
          message,
          preferredContactMethod: preferredMethodLabel,
          contactValue: trimmedContactValue,
          _captcha: "false",
          _template: "table",
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast({
        title: "Zgłoszenie wysłane",
        description: "Dziękujemy. Skontaktujemy się z Tobą najszybciej jak to możliwe.",
      });
      trackConsultationRequestSubmit(contactMethod, "success");
      setIsOpen(false);
      resetForm();
    } catch {
      const encodedBody = encodeURIComponent(message);
      window.location.href = `mailto:kontakt@aplint.pl?subject=${subject}&body=${encodedBody}`;
      trackConsultationRequestSubmit(contactMethod, "fallback_mailto");
      toast({
        title: "Nie udało się wysłać automatycznie",
        description: "Otworzyliśmy email jako plan B, żeby nie stracić zgłoszenia.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (CALENDLY_ENABLED) {
    return React.cloneElement(trigger, {
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        originalOnClick?.(e);
        handleOpenCalendly();
      },
    } as Partial<ConsultationTriggerProps>);
  }

  const modalTrigger = React.cloneElement(trigger, {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      originalOnClick?.(e);
    },
  } as Partial<ConsultationTriggerProps>);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          trackConsultationModalOpen(ctaLabel);
        }
      }}
    >
      <DialogTrigger asChild>{modalTrigger}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Bezpłatna konsultacja</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <a
            href="mailto:kontakt@aplint.pl"
            className="block text-primary hover:text-primary-glow transition-colors"
          >
            kontakt@aplint.pl
          </a>
          <a
            href="tel:+48725116342"
            className="block text-primary hover:text-primary-glow transition-colors"
          >
            +48 725 116 342
          </a>
          <a
            href="tel:+48883572813"
            className="block text-primary hover:text-primary-glow transition-colors"
          >
            +48 883 572 813
          </a>
          <a
            href="tel:+48519500510"
            className="block text-primary hover:text-primary-glow transition-colors"
          >
            +48 519 500 510
          </a>
        </div>

        <form onSubmit={handleRequestContact} className="space-y-4">
          <p className="font-semibold text-foreground">Zamów kontakt</p>

          <div className="space-y-2">
            <Label>Preferowana forma kontaktu</Label>
            <RadioGroup
              value={contactMethod}
              onValueChange={(value) =>
                setContactMethod(value as "email" | "phone")
              }
              className="grid grid-cols-2 gap-3"
            >
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="email" id="contact-method-email" />
                <Label htmlFor="contact-method-email">Email</Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value="phone" id="contact-method-phone" />
                <Label htmlFor="contact-method-phone">Telefon</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-value">
              Twój {contactMethod === "email" ? "email" : "telefon"}
            </Label>
            <Input
              id="contact-value"
              type={contactMethod === "email" ? "email" : "tel"}
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              placeholder={
                contactMethod === "email"
                  ? "np. jan@firma.pl"
                  : "np. +48 600 123 456"
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name-or-company">Imię i nazwisko albo firma</Label>
            <Input
              id="name-or-company"
              value={nameOrCompany}
              onChange={(e) => setNameOrCompany(e.target.value)}
              placeholder="np. Jan Kowalski / Firma XYZ"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Dodatkowe informacje (opcjonalnie)</Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Krótko opisz, czego potrzebujesz."
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Wysyłanie..." : "Zamów kontakt"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}


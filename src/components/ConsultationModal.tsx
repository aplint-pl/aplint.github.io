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
import { cn } from "@/lib/utils";

export const CALENDLY_URL = "https://calendly.com/kontakt-aplint/30min";

const formFieldClassName =
  "h-12 min-h-12 px-4 text-base md:h-10 md:min-h-0 md:px-3 md:text-sm";
const formTextareaClassName =
  "min-h-[7.5rem] px-4 py-3 text-base md:min-h-[80px] md:px-3 md:py-2 md:text-sm";
const formLabelClassName = "text-base md:text-sm";
const contactMethodOptionClassName =
  "flex min-h-12 cursor-pointer items-center gap-3 rounded-md border p-4 md:min-h-0 md:gap-2 md:p-3";

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
      <DialogContent
        className={cn(
          "max-w-xl gap-3 p-4 sm:gap-4 sm:p-6",
          "w-[calc(100%-2rem)] sm:w-full",
          "max-h-[90dvh] overflow-y-auto overscroll-contain",
          "max-sm:left-0 max-sm:top-0 max-sm:w-screen max-sm:max-w-none max-sm:h-[100dvh] max-sm:max-h-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none",
        )}
      >
        <DialogHeader className="pr-8 text-left">
          <DialogTitle>Bezpłatna konsultacja</DialogTitle>
        </DialogHeader>

        <div className="space-y-1.5 text-sm sm:space-y-2">
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
          <p className="text-base font-semibold text-foreground">Zamów kontakt</p>

          <div className="space-y-2.5">
            <Label className={formLabelClassName}>Preferowana forma kontaktu</Label>
            <RadioGroup
              value={contactMethod}
              onValueChange={(value) =>
                setContactMethod(value as "email" | "phone")
              }
              className="grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2 min-[400px]:gap-3"
            >
              <div className={contactMethodOptionClassName}>
                <RadioGroupItem
                  value="email"
                  id="contact-method-email"
                  className="h-5 w-5 md:h-4 md:w-4"
                />
                <Label
                  htmlFor="contact-method-email"
                  className={cn(formLabelClassName, "cursor-pointer font-normal")}
                >
                  Email
                </Label>
              </div>
              <div className={contactMethodOptionClassName}>
                <RadioGroupItem
                  value="phone"
                  id="contact-method-phone"
                  className="h-5 w-5 md:h-4 md:w-4"
                />
                <Label
                  htmlFor="contact-method-phone"
                  className={cn(formLabelClassName, "cursor-pointer font-normal")}
                >
                  Telefon
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="contact-value" className={formLabelClassName}>
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
              className={formFieldClassName}
              required
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="name-or-company" className={formLabelClassName}>
              Imię i nazwisko albo firma
            </Label>
            <Input
              id="name-or-company"
              value={nameOrCompany}
              onChange={(e) => setNameOrCompany(e.target.value)}
              placeholder="np. Jan Kowalski / Firma XYZ"
              className={formFieldClassName}
              required
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="details" className={formLabelClassName}>
              Dodatkowe informacje (opcjonalnie)
            </Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Krótko opisz, czego potrzebujesz."
              className={formTextareaClassName}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="h-12 w-full text-base md:h-11 md:text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Wysyłanie..." : "Zamów kontakt"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}


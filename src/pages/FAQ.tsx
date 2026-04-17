import ConsultationModal from "@/components/ConsultationModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqItems = [
  {
    question: "Ile kosztuje wdrożenie AI?",
    answer:
      "Koszt zależy od zakresu i złożoności projektu. Zaczynamy od bezpłatnej konsultacji, po której przedstawiamy konkretną wycenę dopasowaną do Twoich potrzeb. Rozliczamy się projektowo lub w modelu abonamentowym - zależnie od Twoich preferencji.",
  },
  {
    question: "Jak szybko zobaczę pierwsze efekty?",
    answer:
      "Pierwsze efekty widać już na etapie pilotażu, czyli po 3-6 tygodniach od startu. Pełne wdrożenie trwa zwykle 8-14 tygodni. To znacznie szybciej niż tradycyjne projekty IT, bo działamy zwinnie i zaczynamy od konkretnego problemu, a nie od wielomiesięcznej analizy.",
  },
  {
    question: "Czy muszę wymieniać swoje obecne systemy (ERP, CRM)?",
    answer:
      "Nie. Nasze rozwiązania AI integrują się z Twoją istniejącą infrastrukturą. Pracujemy z systemami takimi jak SAP, Comarch, Subiekt, Microsoft Dynamics, a także z rozwiązaniami dedykowanymi i arkuszami Excel. Celem jest uzupełnienie tego, co już masz a nie rewolucja w IT.",
  },
  {
    question: "Co z bezpieczeństwem moich danych?",
    answer:
      "Bezpieczeństwo to nasz priorytet. Oferujemy wdrożenia on-premise, gdzie dane nie opuszczają Twojej infrastruktury. Wykorzystujemy lokalne modele AI, które działają na Twoich serwerach. Wszystkie rozwiązania są zgodne z RODO i gotowe na audyty. Ty zachowujesz pełną kontrolę nad danymi.",
  },
  {
    question: "Czy potrzebuję własnego działu IT?",
    answer:
      "Nie jest to konieczne. Zajmujemy się całością wdrożenia - od analizy po utrzymanie. Jeśli masz dział IT, chętnie z nim współpracujemy. Jeśli nie masz - zapewniamy pełne wsparcie techniczne. Po wdrożeniu oferujemy SLA i bieżący monitoring, więc nie musisz martwić się o stronę techniczną.",
  },
  {
    question: "Co jeśli wdrożenie nie przyniesie oczekiwanych efektów?",
    answer:
      "Dlatego zaczynamy od pilotażu. To działający prototyp na Twoich danych, który pokazuje realne efekty przed pełnym wdrożeniem. Jeśli pilotaż nie potwierdzi wartości biznesowej - nie idziemy dalej. Minimalizujesz ryzyko, bo płacisz za pełne wdrożenie dopiero wtedy, gdy widzisz, że rozwiązanie działa.",
  },
  {
    question: "Czy AI sprawdzi się w mojej firmie?",
    answer:
      "AI najlepiej sprawdza się tam, gdzie są powtarzalne procesy, duże ilości danych lub dokumentów i potrzeba szybszego podejmowania decyzji. Jeśli Twój zespół spędza godziny na przepisywaniu danych, analizie Exceli czy ręcznym przetwarzaniu dokumentów - jest duża szansa, że AI znacząco usprawni te procesy. Najlepiej porozmawiajmy - podczas bezpłatnej konsultacji ocenimy potencjał i dopasowanie.",
  },
] as const;

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background px-6 py-20">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
          Często zadawane pytania
        </h1>
        <div className="w-24 h-1 bg-gradient-primary mb-6" />
        <p className="text-muted-foreground text-lg leading-relaxed mb-10 text-pretty">
          Odpowiedzi na pytania, które najczęściej słyszymy od firm rozważających
          wdrożenie AI
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base md:text-lg px-2 font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground px-2 leading-relaxed text-base md:text-[1.02rem] pr-6">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-14 rounded-2xl border border-primary/20 bg-card/70 backdrop-blur-md shadow-elegant p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground text-balance">
            Masz pytania, na które nie ma odpowiedzi powyżej?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto text-balance">
            Umów bezpłatną konsultację - omówimy Twój przypadek bez zobowiązań.
          </p>
          <ConsultationModal
            trigger={
              <Button variant="hero" size="xl">
                Zamów konsultację
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ;

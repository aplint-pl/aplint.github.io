const forWho = [
  {
    title: "Dział produkcji",
    description:
      "Optymalizacja planowania, predykcja awarii, kontrola jakości. AI analizuje dane z maszyn i systemów, żebyś mógł podejmować lepsze decyzje — szybciej.",
    bullets: [
      "Automatyczne planowanie produkcji",
      "Wczesne wykrywanie anomalii",
      "Analiza przyczyn przestojów",
    ],
  },
  {
    title: "Dział finansów",
    description:
      "Automatyzacja powtarzalnych zadań — od przetwarzania faktur po tworzenie wniosków zakupowych. Mniej ręcznej pracy, mniej błędów, więcej czasu na analizę.",
    bullets: [
      "Automatyczne tworzenie wniosków zakupowych",
      "Przetwarzanie i kategoryzacja faktur",
      "Wykrywanie anomalii w rozliczeniach",
    ],
  },
  {
    title: "Dział logistyki",
    description:
      "Inteligentna analiza zapytań ofertowych, automatyzacja dokumentacji transportowej, optymalizacja zapasów. AI odciąża Twój zespół od rutynowych zadań.",
    bullets: [
      "Automatyczna analiza zapytań ofertowych",
      "Kategoryzacja i priorytetyzacja zamówień",
      "Prognozowanie stanów magazynowych",
    ],
  },
];

export default function ForWhoSection() {
  return (
    <section id="dla-kogo" className="scroll-mt-14 py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <header className="mb-12 border-b border-foreground/15 pb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance mb-4">
            Wspieramy działy, które mają najwięcej do zyskania
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed text-balance">
            Pracujemy ze średnimi i dużymi przedsiębiorstwami (30–1000
            pracowników), które chcą usprawnić codzienne operacje bez rewolucji
            w IT.
          </p>
        </header>

        <div className="divide-y divide-foreground/15">
          {forWho.map((item) => (
            <article
              key={item.title}
              className="grid gap-8 py-12 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:gap-16"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
                {item.title}
              </h3>

              <div>
                <p className="text-muted-foreground leading-relaxed mb-8 md:mb-10">
                  {item.description}
                </p>

                <ul
                  role="list"
                  className="border-t border-foreground/10 divide-y divide-foreground/10"
                >
                  {item.bullets.map((bullet, index) => (
                    <li
                      key={bullet}
                      className="flex items-baseline gap-6 py-4 first:pt-5"
                    >
                      <span
                        className="shrink-0 text-sm font-medium tabular-nums text-muted-foreground/50"
                        aria-hidden="true"
                      >
                        {String(index + 1)}
                      </span>
                      <span className="text-foreground/90 leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const privacyPoints = [
  {
    title: "Pełna zgodność z RODO",
    description: "Od projektowania po wdrożenie i utrzymanie.",
  },
  {
    title: "Wdrożenie on-premise",
    description: "AI może działać lokalnie, na serwerach klienta.",
  },
  {
    title: "Opcja zero transferu danych",
    description:
      "Informacje nie muszą opuszczać infrastruktury firmy, jeśli jest to wymagane.",
  },
  {
    title: "Pełna kontrola",
    description: "Zachowujesz 100% własności i nadzoru nad danymi.",
  },
  {
    title: "Audytowalność",
    description: "Przejrzyste procesy gotowe na kontrole i certyfikacje.",
  },
];

type TechnologyItem = {
  name: string;
  logo: string;
  /** Jeśli ustawione, w ciemnym motywie używane zamiast `logo`. */
  logoInv?: string;
};

const TechnologiesSection = () => {
  const technologies: TechnologyItem[] = [
    { name: "AWS", logo: "/images/tech-logos/aws.svg", logoInv: "/images/tech-logos/aws-inv.svg" },
    { name: "Google Cloud", logo: "/images/tech-logos/google-cloud.svg" },
    { name: "Azure", logo: "/images/tech-logos/azure.svg" },
    { name: "Docker", logo: "/images/tech-logos/docker.svg" },
    { name: "React", logo: "/images/tech-logos/react.svg" },
    { name: "TypeScript", logo: "/images/tech-logos/typescript.svg" },
    { name: ".NET", logo: "/images/tech-logos/dotnet.svg" },
    { name: "Node.js", logo: "/images/tech-logos/nodejs.svg" },
    { name: "OpenAI", logo: "/images/tech-logos/openai.svg", logoInv: "/images/tech-logos/openai-inv.svg" },
    {
      name: "Anthropic",
      logo: "/images/tech-logos/anthropic.svg",
      logoInv: "/images/tech-logos/anthropic-inv.svg",
    },
    { name: "LLaMA", logo: "/images/tech-logos/llama.svg", logoInv: "/images/tech-logos/llama-inv.svg" },
    {
      name: "LangChain",
      logo: "/images/tech-logos/langchain.svg",
      logoInv: "/images/tech-logos/langchain-inv.svg",
    },
    { name: "Qdrant", logo: "/images/tech-logos/qdrant.svg" },
    { name: "MS SQL", logo: "/images/tech-logos/mssql.svg", logoInv: "/images/tech-logos/mssql-inv.svg" },
    { name: "PostgreSQL", logo: "/images/tech-logos/postgresql.svg" },
  ];

  return (
    <section id="technologie" className="scroll-mt-14">
      <div className="container mx-auto py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Technologie, które stosujemy
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Sprawdzone narzędzia dopasowane do Twojej infrastruktury
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center gap-2 rounded-md border border-border/60 bg-muted/30 p-3 transition-colors hover:bg-primary/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md p-1">
                {tech.logoInv ? (
                  <>
                    <img
                      src={tech.logo}
                      alt={`${tech.name} logo`}
                      className="h-8 w-8 object-contain dark:hidden"
                      loading="lazy"
                    />
                    <img
                      src={tech.logoInv}
                      alt=""
                      className="h-8 w-8 hidden object-contain dark:block"
                      loading="lazy"
                      aria-hidden
                    />
                  </>
                ) : (
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    className="h-8 w-8 object-contain"
                    loading="lazy"
                  />
                )}
              </div>
              <span className="text-[11px] text-center text-muted-foreground leading-tight">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border-y border-border/40 py-20">
        <div className="container mx-auto">
          <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 lg:gap-20 items-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance">
                Prywatność i zgodność
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 text-balance">
                Prywatność i zgodność regulacyjna są wbudowane w każde nasze
                rozwiązanie.
              </p>
              <p className="text-lg md:text-xl font-semibold text-foreground leading-relaxed text-balance">
                Dostosowujemy model wdrożenia do wymagań klienta — od chmury po
                całkowicie lokalne instalacje.
              </p>
            </div>

            <ul
              role="list"
              className="border-y border-foreground/10 divide-y divide-foreground/10"
            >
              {privacyPoints.map((point) => (
                <li key={point.title} className="py-5 first:pt-6 last:pb-6">
                  <p className="font-semibold text-foreground">{point.title}</p>
                  <p className="mt-1 text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;

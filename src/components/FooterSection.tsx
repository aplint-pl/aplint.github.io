import { Card, CardContent } from "./ui/card";

export default function FooterSection() {
  return (
    <footer className="py-16 border-t border-border bg-background/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            © 2020-2026 Aplint Sp. z o.o. Wszelkie prawa zastrzeżone.
          </div>
          <div>
              <img
                src="/images/aplint-logo.svg"
                alt="APLiNT"
                className="h-16 dark:hidden"
              />
              <img
                src="/images/aplint-logo-inv.svg"
                alt="APLiNT"
                className="hidden h-16 dark:block"
              />
          </div>
          <a
            href="/polityka-prywatnosci"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Polityka prywatności
          </a>
        </div>
      </div>
    </footer>
  );
}


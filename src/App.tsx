import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
  StaticRouter,
} from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import { ThemeProvider } from "next-themes";
import React from 'react';
import ThemeToggle from "./components/ThemeToggle";
import ConsultationModal from "@/components/ConsultationModal";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useActiveNavSection } from "@/hooks/use-active-nav-section";
import { useScrollToHashOnHome } from "@/hooks/use-scroll-to-hash";
import { cn } from "@/lib/utils";
import { bindMatomoContactLinkTracking } from "@/lib/matomo";
import FooterSection from "./components/FooterSection";

const queryClient = new QueryClient();

const jakDzialamySubmenuItems = [
  { href: "/#jak-dzialamy", sectionId: "jak-dzialamy" as const, label: "Jak działamy" },
  { href: "/#technologie", sectionId: "technologie" as const, label: "Technologie" },
  { href: "/#case-study", sectionId: "case-study" as const, label: "Case study" },
  { href: "/faq", sectionId: null, label: "FAQ" },
] as const;

const jakDzialamyScrollSectionIds = new Set<string>([
  "jak-dzialamy",
  "technologie",
  "case-study",
]);

const navLinks = [
  { href: "/#dla-kogo", sectionId: "dla-kogo", label: "Dla kogo" },
  { href: "/#oferta", sectionId: "oferta", label: "Oferta" },
  { href: "/#zespol", sectionId: "zespol", label: "Zespół" },
  { href: "/#kontakt", sectionId: "kontakt", label: "Kontakt" },
] as const;

function isJakDzialamyNavActive(
  activeSectionId: string | null,
  pathname: string
): boolean {
  if (pathname === "/faq") return true;
  return (
    activeSectionId !== null && jakDzialamyScrollSectionIds.has(activeSectionId)
  );
}

function navLinkClassName(active: boolean) {
  return cn(
    "px-3 py-2 rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/45",
    active
      ? "text-foreground bg-primary/15 font-semibold"
      : "text-foreground/80 hover:text-foreground hover:bg-primary/10"
  );
}

function AppShell() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useScrollToHashOnHome();
  const activeSectionId = useActiveNavSection();
  const jakDzialamyActive = isJakDzialamyNavActive(
    activeSectionId,
    location.pathname
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur shadow-sm">
        <div className="container mx-auto py-3 flex items-center gap-4">
          <div className="flex-none w-24">
            <Link
              to="/"
              className="block transition-all duration-300 opacity-100 translate-y-0 pointer-events-auto"
              aria-label="Aplint - strona główna"
            >
              <img
                src="/images/aplint-logo.svg"
                alt="APLiNT"
                className="h-14 w-auto dark:hidden mx-auto"
              />
              <img
                src="/images/aplint-logo-inv.svg"
                alt="APLiNT"
                className="hidden h-14 w-auto dark:block mx-auto"
              />
            </Link>
          </div>
          <div className="flex-1 flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Otwórz nawigację"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 w-[85%] sm:max-w-sm"
                data-site-nav-sheet=""
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <nav className="flex flex-col gap-2.5 p-4" aria-label="Główna nawigacja">
                  {navLinks.slice(0, 2).map((l) => {
                    const active = activeSectionId === l.sectionId;
                    return (
                      <SheetClose key={l.href} asChild>
                        <Link
                          to={l.href}
                          className={navLinkClassName(active)}
                          aria-current={active ? "location" : undefined}
                        >
                          {l.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                  <div className="flex flex-col gap-1.5">
                    <span
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-semibold text-foreground/70"
                      )}
                    >
                      Jak działamy
                    </span>
                    <div className="flex flex-col gap-1 pl-2 border-l-2 border-primary/25 ml-3">
                      {jakDzialamySubmenuItems.map((item) => {
                        const active =
                          item.sectionId !== null
                            ? activeSectionId === item.sectionId
                            : location.pathname === "/faq";
                        return (
                          <SheetClose key={item.href} asChild>
                            <Link
                              to={item.href}
                              className={cn(
                                navLinkClassName(active),
                                "text-sm"
                              )}
                              aria-current={active ? "location" : undefined}
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        );
                      })}
                    </div>
                  </div>
                  {navLinks.slice(2).map((l) => {
                    const active = activeSectionId === l.sectionId;
                    return (
                      <SheetClose key={l.href} asChild>
                        <Link
                          to={l.href}
                          className={navLinkClassName(active)}
                          aria-current={active ? "location" : undefined}
                        >
                          {l.label}
                        </Link>
                      </SheetClose>
                    );
                  })}
                  <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
                    <ThemeToggle />
                    <a
                      href="tel:+48725116342"
                      className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                    >
                      Zadzwoń: +48 725 116 342
                    </a>
                    <ConsultationModal
                      trigger={
                        <Button variant="hero" className="w-full">
                          Bezpłatna konsultacja
                        </Button>
                      }
                    />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            <nav
              className="hidden lg:flex flex-1 flex-wrap items-center justify-start gap-1 text-base font-medium"
              aria-label="Główna nawigacja"
            >
              {navLinks.slice(0, 2).map((l) => {
                const active = activeSectionId === l.sectionId;
                return (
                  <Link
                    key={l.href}
                    to={l.href}
                    className={navLinkClassName(active)}
                    aria-current={active ? "location" : undefined}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger
                  className={cn(
                    "inline-flex items-center gap-0.5",
                    navLinkClassName(jakDzialamyActive),
                    "data-[state=open]:bg-primary/15"
                  )}
                  aria-current={jakDzialamyActive ? "location" : undefined}
                >
                  Jak działamy
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="flex min-w-[12rem] flex-col gap-0.5 p-1"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  {jakDzialamySubmenuItems.map((item) => {
                    const active =
                      item.sectionId !== null
                        ? activeSectionId === item.sectionId
                        : location.pathname === "/faq";
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          to={item.href}
                          className={cn(active && "bg-primary/10 font-semibold")}
                          aria-current={active ? "location" : undefined}
                        >
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              {navLinks.slice(2).map((l) => {
                const active = activeSectionId === l.sectionId;
                return (
                  <Link
                    key={l.href}
                    to={l.href}
                    className={navLinkClassName(active)}
                    aria-current={active ? "location" : undefined}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex-none flex items-center shrink-0">
            <div className="flex flex-col items-end gap-1.5">
              <a
                href="tel:+48725116342"
                className="hidden md:inline text-sm font-medium text-foreground/80 hover:text-foreground whitespace-nowrap transition-colors text-right"
              >
                Zadzwoń: +48 725 116 342
              </a>
              <ConsultationModal
                trigger={
                  <Button variant="hero" className="font-semibold text-sm px-3 sm:px-4">
                    <span className="sm:hidden">Konsultacja</span>
                    <span className="hidden sm:inline">Bezpłatna konsultacja</span>
                  </Button>
                }
              />
            </div>
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <main id="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <FooterSection />
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
}

interface AppProps {
  /** When set, StaticRouter (pre-render/SSR) is used instead of BrowserRouter */
  url?: string;
}

const App = ({ url }: AppProps) => {
  React.useEffect(() => {
      const w = window as unknown as { _mtm?: Array<Record<string, unknown>> };
      w._mtm = w._mtm || [];
      const _mtm = w._mtm;
      _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
      const d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src='https://matomo.aplint.pl/js/container_bHu0xCzw.js'; s.parentNode.insertBefore(g,s);
  }, []);

  React.useEffect(() => {
    return bindMatomoContactLinkTracking();
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      nonce=""
    >
      {url !== undefined ? (
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      ) : (
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      )}
    </ThemeProvider>
  )
}

export default App;

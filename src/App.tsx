import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import React from 'react';

const queryClient = new QueryClient();

interface AppProps {
  /** When set, StaticRouter (pre-render/SSR) is used instead of BrowserRouter */
  url?: string;
}

const App = ({ url }: AppProps) => {
  React.useEffect(() => {
      const _mtm = window._mtm = window._mtm || [];
      _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
      const d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src='https://matomo.aplint.pl/js/container_bHu0xCzw.js'; s.parentNode.insertBefore(g,s);
  }, [])

  const router = url !== undefined ? (
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StaticRouter>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {router}
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App;

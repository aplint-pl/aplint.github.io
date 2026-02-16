import { jsx, jsxs } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import * as React from "react";
import React__default, { useState, useEffect } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, ArrowRight, Search, PenTool, Wrench, HeartHandshake, Brain, Cloud, Database, Code, Cpu, Shield, Mail, Phone, MapPin } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation, Routes, Route, BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Slot } from "@radix-ui/react-slot";
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-primary text-primary-foreground hover:scale-105 hover:shadow-2xl font-semibold",
        glow: "bg-primary text-primary-foreground hover:animate-glow"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-lg",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const HeroSection = () => {
  return /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center bg-gradient-bg overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float", style: { animationDelay: "2s" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-10 right-10 opacity-20", children: /* @__PURE__ */ jsxs("svg", { width: "200", height: "200", viewBox: "0 0 200 200", className: "animate-glow", children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "networkGradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "hsl(var(--primary))" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "hsl(var(--primary-glow))" })
        ] }) }),
        /* @__PURE__ */ jsx("circle", { cx: "50", cy: "50", r: "4", fill: "url(#networkGradient)" }),
        /* @__PURE__ */ jsx("circle", { cx: "150", cy: "50", r: "4", fill: "url(#networkGradient)" }),
        /* @__PURE__ */ jsx("circle", { cx: "100", cy: "100", r: "4", fill: "url(#networkGradient)" }),
        /* @__PURE__ */ jsx("circle", { cx: "50", cy: "150", r: "4", fill: "url(#networkGradient)" }),
        /* @__PURE__ */ jsx("circle", { cx: "150", cy: "150", r: "4", fill: "url(#networkGradient)" }),
        /* @__PURE__ */ jsx("line", { x1: "50", y1: "50", x2: "150", y2: "50", stroke: "url(#networkGradient)", strokeWidth: "1" }),
        /* @__PURE__ */ jsx("line", { x1: "50", y1: "50", x2: "100", y2: "100", stroke: "url(#networkGradient)", strokeWidth: "1" }),
        /* @__PURE__ */ jsx("line", { x1: "150", y1: "50", x2: "100", y2: "100", stroke: "url(#networkGradient)", strokeWidth: "1" }),
        /* @__PURE__ */ jsx("line", { x1: "100", y1: "100", x2: "50", y2: "150", stroke: "url(#networkGradient)", strokeWidth: "1" }),
        /* @__PURE__ */ jsx("line", { x1: "100", y1: "100", x2: "150", y2: "150", stroke: "url(#networkGradient)", strokeWidth: "1" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/3 left-10 opacity-30 animate-float", style: { animationDelay: "1s" }, children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "hsl(var(--primary))", children: /* @__PURE__ */ jsx("path", { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/3 right-20 opacity-30 animate-float", style: { animationDelay: "3s" }, children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-gradient-to-r from-primary-glow/20 to-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "hsl(var(--primary-glow))", children: /* @__PURE__ */ jsx("path", { d: "M9.5 2A7.5 7.5 0 0 0 2 9.5c0 5.74 7.5 11.5 7.5 11.5s7.5-5.76 7.5-11.5A7.5 7.5 0 0 0 9.5 2z" }) }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative container mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8 flex justify-center", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/aplint-logo-inv.png",
          alt: "APLINT",
          className: "h-24 md:h-32 animate-glow"
        }
      ) }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent", children: [
        "Wykorzystaj moc AI,",
        /* @__PURE__ */ jsx("br", {}),
        "zwiększ swoje możliwości"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto", children: "Wdrażamy AI dla Twojego Biznesu" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "hero",
          size: "xl",
          className: "animate-glow hover:animate-none",
          onClick: () => document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" }),
          children: "Sprawdź naszą ofertę"
        }
      )
    ] })
  ] });
};
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const ServicesSection = () => {
  const services = [
    {
      image: "/images/deployment.jpg",
      title: "Wdrażanie rozwiązań AI",
      description: "Nasz zespół ekspertów pomaga firmom w integracji zaawansowanych rozwiązań sztucznej inteligencji (SI, AI), które zwiększają efektywność operacyjną i wspierają rozwój biznesu. Od analizy potrzeb po pełne wdrożenie - jesteśmy z Tobą na każdym etapie."
    },
    {
      image: "/images/meeting.jpg",
      title: "Konsultacje i doradztwo",
      description: "Oferujemy profesjonalne doradztwo w zakresie strategii AI, pomagając firmom zrozumieć, jak najlepiej wykorzystać sztuczną inteligencję do osiągnięcia ich celów biznesowych. Nasze konsultacje obejmują ocenę gotowości technologicznej, identyfikację możliwości oraz planowanie wdrożeń."
    },
    {
      image: "/images/work.jpg",
      title: "Dostosowywanie technologii",
      description: "Personalizacja rozwiązań dla specyficznych potrzeb klientów. Rozumiemy, że każda firma jest inna, dlatego dostosowujemy nasze technologie, aby idealnie pasowały do unikalnych wymagań i celów Twojego biznesu. Dzięki temu zapewniamy maksymalną wartość i skuteczność wdrożonych rozwiązań."
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "oferta", className: "py-20 px-6", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-foreground", children: "Oferta i usługi" }),
      /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: services.map((service, index) => /* @__PURE__ */ jsxs(
      Card,
      {
        className: "group hover:scale-105 transition-all duration-300 hover:shadow-elegant border-border bg-card/50 backdrop-blur-sm overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full h-48 relative overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: service.image,
                alt: service.title,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" })
          ] }),
          /* @__PURE__ */ jsx(CardHeader, { className: "text-center", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-xl text-foreground", children: service.title }) }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx(CardDescription, { className: "text-muted-foreground leading-relaxed mb-4", children: service.description }),
            /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-lg bg-card/50 border border-border/50", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground/70 mb-2", children: "Schemat procesu:" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary mr-1" }),
                  "Analiza"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex-1 mx-2 border-t border-primary/30 relative", children: /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 w-0 h-0 border-l-4 border-l-primary border-t-2 border-b-2 border-t-transparent border-b-transparent transform -translate-y-1/2" }) }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary mr-1" }),
                  "Wdrożenie"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex-1 mx-2 border-t border-primary/30 relative", children: /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 w-0 h-0 border-l-4 border-l-primary border-t-2 border-b-2 border-t-transparent border-b-transparent transform -translate-y-1/2" }) }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary-glow mr-1" }),
                  "Sukces"
                ] })
              ] })
            ] })
          ] })
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg p-8 border border-primary/20", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-foreground mb-4", children: "Zamów bezpłatną konsultację" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6 max-w-xl mx-auto", children: "Skontaktuj się z nami i dowiedz się, jak możemy przyspieszyć Twoje procesy" }),
      /* @__PURE__ */ jsxs(Button, { variant: "hero", size: "lg", className: "group", onClick: () => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" }), children: [
        "Kontakt",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" })
      ] })
    ] }) })
  ] }) });
};
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const TeamSection = () => {
  const team = [
    {
      name: "Kamil",
      image: "/images/kamilk.jpg",
      specialty: "Ekspert AI - Branża produkcyjna",
      description: "Specjalizujący się w branży produkcyjnej. Dzięki swojemu doświadczeniu pomaga firmom w optymalizacji procesów produkcyjnych za pomocą nowoczesnych technologii.",
      skills: ["Produkcja", "Optymalizacja procesów", "Automatyzacja"]
    },
    {
      name: "Mateusz",
      image: "/images/mateuszk.jpg",
      specialty: "Ekspert AI - Strategie wdrożeniowe",
      description: "Specjalizujący się w strategiach wdrożeniowych. Jego umiejętność tworzenia efektywnych planów wdrożeniowych pozwala na płynne i skuteczne integracje AI w różnych sektorach biznesu.",
      skills: ["Strategie wdrożeniowe", "Planowanie", "Integracja AI"]
    },
    {
      name: "Kamil",
      image: "/images/kamilp.jpg",
      specialty: "Ekspert AI - Innowacje",
      description: "Odpowiedzialny za innowacje. Skupia się na poszukiwaniu i implementacji najnowszych rozwiązań technologicznych, które mogą przynieść realne korzyści dla klientów.",
      skills: ["Innowacje", "R&D", "Nowe technologie"]
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-20 px-6 bg-gradient-to-b from-background to-muted/20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-foreground", children: "Nasz zespół" }),
      /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-8", children: team.map((member, index) => /* @__PURE__ */ jsxs(
      Card,
      {
        className: "group hover:scale-105 transition-all duration-500 hover:shadow-elegant border-border bg-card/70 backdrop-blur-sm relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
          /* @__PURE__ */ jsxs(CardHeader, { className: "text-center relative z-10", children: [
            /* @__PURE__ */ jsxs("div", { className: "w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 relative overflow-hidden group-hover:shadow-elegant transition-all duration-500", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: member.image,
                  alt: member.name,
                  className: "w-full h-full object-cover rounded-full"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50" })
            ] }),
            /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl text-foreground mb-2", children: member.name }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "mb-3 text-sm", children: member.specialty })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "relative z-10", children: [
            /* @__PURE__ */ jsx(CardDescription, { className: "text-muted-foreground leading-relaxed mb-4", children: member.description }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: member.skills.map((skill, skillIndex) => /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs border-primary/30 text-primary", children: skill }, skillIndex)) })
          ] })
        ]
      },
      index
    )) })
  ] }) });
};
const ProcessSection = () => {
  const steps = [
    {
      icon: Search,
      number: "1",
      title: "Analiza potrzeb",
      description: "Zaczynamy od dokładnego zrozumienia Twoich wyzwań i celów. Nasz zespół przeprowadza szczegółową analizę, aby zidentyfikować obszary, w których sztuczna inteligencja może przynieść największe korzyści.",
      image: "/images/chart.jpg"
    },
    {
      icon: PenTool,
      number: "2",
      title: "Projektowanie rozwiązań",
      description: "Na podstawie zebranych informacji tworzymy spersonalizowaną strategię, która odpowiada na Twoje unikalne potrzeby. Nasze rozwiązania są projektowane z myślą o maksymalnej efektywności i dopasowaniu do specyfiki Twojego biznesu.",
      image: "/images/draw.jpg"
    },
    {
      icon: Wrench,
      number: "3",
      title: "Wdrożenie i testowanie",
      description: "Przechodzimy do implementacji i optymalizacji rozwiązań. Nasz zespół dba o to, aby proces wdrożenia przebiegał sprawnie, a wszystkie systemy działały zgodnie z oczekiwaniami. Testujemy i dostosowujemy technologie, aby zapewnić ich najwyższą wydajność.",
      image: "/images/dashboard.jpg"
    },
    {
      icon: HeartHandshake,
      number: "4",
      title: "Wsparcie i rozwój",
      description: "Oferujemy ciągłe wsparcie i aktualizacje technologii, aby Twoje rozwiązania AI były zawsze na bieżąco z najnowszymi trendami i możliwościami. Jesteśmy z Tobą na każdym etapie rozwoju Twojego biznesu.",
      image: "/images/clock.jpg"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-20 px-6", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-foreground", children: "Jak działamy - nasz proces" }),
      /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg p-6 border border-primary/20", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-center text-foreground mb-6", children: "Nasz proces krok po kroku" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between relative max-w-4xl mx-auto", children: [
        steps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center relative z-10", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-2 animate-glow", children: /* @__PURE__ */ jsx(step.icon, { className: "w-6 h-6 text-primary-foreground" }) }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground text-center max-w-20", children: step.title }),
          /* @__PURE__ */ jsx("div", { className: "absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary", children: step.number })
        ] }, index)),
        /* @__PURE__ */ jsx("div", { className: "absolute top-6 left-6 right-6 h-0.5 bg-gradient-primary opacity-30 -z-10" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8 mb-16", children: steps.map((step, index) => /* @__PURE__ */ jsxs(
      Card,
      {
        className: "group relative overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-500",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full h-32 relative overflow-hidden mb-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: step.image,
                alt: step.title,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2 w-8 h-8 bg-primary/90 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm", children: step.number }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2 p-2 rounded-full bg-gradient-primary group-hover:animate-glow", children: /* @__PURE__ */ jsx(step.icon, { className: "h-5 w-5 text-primary-foreground" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-500", children: step.number }),
          /* @__PURE__ */ jsxs(CardHeader, { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 mb-4", children: /* @__PURE__ */ jsxs("div", { className: "text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full", children: [
              "Krok ",
              step.number
            ] }) }),
            /* @__PURE__ */ jsx(CardTitle, { className: "text-xl text-foreground", children: step.title })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { className: "relative z-10", children: [
            /* @__PURE__ */ jsx(CardDescription, { className: "text-muted-foreground leading-relaxed mb-4", children: step.description }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center space-x-2", children: [...Array(4)].map((_, dotIndex) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `w-2 h-2 rounded-full transition-colors duration-300 ${dotIndex <= index ? "bg-primary" : "bg-primary/20"}`
              },
              dotIndex
            )) })
          ] })
        ]
      },
      index
    )) }),
    /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Card, { className: "bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-foreground mb-4", children: "Od małych firm do enterprise" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto", children: "Stosujemy rozwiązania chmurowe oraz lokalne. Niezależnie od tego, czy prowadzisz zaawansowaną produkcję, biuro rachunkowe, czy fundację, dobierzemy odpowiednie rozwiązania, które spełnią Twoje oczekiwania i pomogą osiągnąć sukces." })
    ] }) }) })
  ] }) });
};
const TechnologiesSection = () => {
  const techCategories = [
    {
      title: "Machine Learning & AI",
      icon: Brain,
      description: "Zaawansowane algorytmy uczenia maszynowego i sztucznej inteligencji",
      technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenAI API", "Hugging Face"],
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Cloud & Infrastructure",
      icon: Cloud,
      description: "Skalowalne rozwiązania chmurowe dla wdrożeń AI",
      technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"],
      color: "from-green-500/20 to-blue-500/20"
    },
    {
      title: "Bazy danych & Analytics",
      icon: Database,
      description: "Zarządzanie danymi i analityka dla projektów AI",
      technologies: ["SQL Server", "PostgreSQL", "MongoDB", "Redis", "Qdrant", "Elasticsearch", "BigQuery"],
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "Development & APIs",
      icon: Code,
      description: "Narzędzia deweloperskie i integracje systemowe",
      technologies: ["FastAPI", "Node.js", "React", "GraphQL", "REST APIs", "WebSockets"],
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Edge Computing",
      icon: Cpu,
      description: "Rozwiązania AI na urządzeniach brzegowych",
      technologies: ["NVIDIA Jetson", "Raspberry Pi", "Intel NUC", "ARM Processors", "ONNX", "TensorRT"],
      color: "from-yellow-500/20 to-orange-500/20"
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      description: "Bezpieczeństwo i zgodność z regulacjami",
      technologies: ["OAuth 2.0", "JWT", "GDPR", "ISO 27001", "Encryption", "Access Control"],
      color: "from-red-500/20 to-rose-500/20"
    }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-20 px-6", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-foreground", children: "Technologie i narzędzia" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-6 max-w-2xl mx-auto", children: "Wykorzystujemy najnowsze technologie AI i sprawdzone rozwiązania infrastrukturalne" }),
      /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12", children: techCategories.map((category, index) => /* @__PURE__ */ jsxs(Card, { className: "group hover:scale-105 transition-all duration-300 hover:shadow-elegant border-border bg-card/70 backdrop-blur-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: `w-full h-32 bg-gradient-to-br ${category.color} relative overflow-hidden`, children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "p-4 rounded-full bg-background/80 backdrop-blur-sm group-hover:animate-glow", children: /* @__PURE__ */ jsx(category.icon, { className: "h-12 w-12 text-primary" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-20", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 gap-1 h-full w-full p-2", children: [...Array(24)].map((_, i) => /* @__PURE__ */ jsx("div", { className: "bg-current rounded-sm opacity-30", style: {
          animationDelay: `${i * 0.1}s`
        } }, i)) }) })
      ] }),
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-xl text-foreground group-hover:text-primary transition-colors", children: category.title }),
        /* @__PURE__ */ jsx(CardDescription, { className: "text-muted-foreground", children: category.description })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: category.technologies.map((tech, techIndex) => /* @__PURE__ */ jsx(
        Badge,
        {
          variant: "outline",
          className: "text-xs border-primary/30 text-primary hover:bg-primary/10 transition-colors",
          children: tech
        },
        techIndex
      )) }) })
    ] }, index)) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-primary/5 to-primary-glow/5 rounded-lg p-8 border border-primary/10", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-center text-foreground mb-6", children: "Architektura naszych rozwiązań" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-background/50 rounded-lg p-6 border border-border/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto mb-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Database, { className: "h-10 w-10 text-primary" }) }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground", children: "Warstwa danych" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Bazy danych, Data Lakes" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto mb-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Brain, { className: "h-10 w-10 text-primary" }) }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground", children: "Przetwarzanie AI" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "ML Models, Analytics" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 mx-auto mb-3 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center", children: /* @__PURE__ */ jsx(Code, { className: "h-10 w-10 text-primary" }) }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground", children: "Warstwa aplikacji" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "APIs, Frontend, Mobile" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxs("div", { className: "relative h-1 bg-gradient-primary my-6 rounded-full opacity-30", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/3 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-1/3 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2" })
        ] }) })
      ] })
    ] })
  ] }) });
};
const ContactSection = () => {
  useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  return /* @__PURE__ */ jsx("section", { className: "py-20 px-6 bg-gradient-to-b from-background to-muted/20", id: "kontakt", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4 text-foreground", children: "Kontakt" }),
      /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto mb-6" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "Skontaktuj się z nami i dowiedz się, jak możemy przyspieszyć Twoje procesy" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "space-y-8 max-w-2xl mx-auto w-full", children: [
      /* @__PURE__ */ jsxs(Card, { className: "bg-card/70 backdrop-blur-sm border-border", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl text-foreground", children: "Dane kontaktowe" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Skontaktuj się z nami bezpośrednio" })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-gradient-primary rounded-lg", children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: "Email" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:kontakt@aplint.pl", className: "text-primary hover:text-primary-glow transition-colors", children: "kontakt@aplint.pl" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-gradient-primary rounded-lg", children: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: "Telefon" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("a", { href: "tel:+48725116342", className: "block text-primary hover:text-primary-glow transition-colors", children: "+48 725 116 342" }),
                /* @__PURE__ */ jsx("a", { href: "tel:+48883572813", className: "block text-primary hover:text-primary-glow transition-colors", children: "+48 883 572 813" }),
                /* @__PURE__ */ jsx("a", { href: "tel:+48519500510", className: "block text-primary hover:text-primary-glow transition-colors", children: "+48 519 500 510" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-gradient-primary rounded-lg", children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: "Dane spółki" }),
              /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
                "Aplint Sp. z o.o.",
                /* @__PURE__ */ jsx("br", {}),
                "KRS 0000845044",
                /* @__PURE__ */ jsx("br", {}),
                "NIP 8842802170",
                /* @__PURE__ */ jsx("br", {}),
                "REGON 386247610",
                /* @__PURE__ */ jsx("br", {}),
                "Kapitał zakładowy 5 tys. zł",
                /* @__PURE__ */ jsx("br", {}),
                "Data rejestracji 8 czerwca 2020 r.",
                /* @__PURE__ */ jsx("br", {}),
                "ul. Marsz. Józefa Piłsudskiego 74/320, 50-020 Wrocław"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { className: "bg-gradient-to-br from-foreground/5 to-primary/5 border-border", children: /* @__PURE__ */ jsx(CardContent, { className: "p-8 text-center", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/aplint-logo.png",
          alt: "APLINT",
          className: "h-16 mx-auto opacity-80 hover:opacity-100 transition-opacity"
        }
      ) }) })
    ] }) })
  ] }) });
};
const Index = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(ServicesSection, {}),
    /* @__PURE__ */ jsx(TeamSection, {}),
    /* @__PURE__ */ jsx(ProcessSection, {}),
    /* @__PURE__ */ jsx(TechnologiesSection, {}),
    /* @__PURE__ */ jsx(ContactSection, {})
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-4", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-blue-500 hover:text-blue-700 underline", children: "Return to Home" })
  ] }) });
};
const queryClient = new QueryClient();
const App = ({ url }) => {
  React__default.useEffect(() => {
    const _mtm = window._mtm = window._mtm || [];
    _mtm.push({ "mtm.startTime": (/* @__PURE__ */ new Date()).getTime(), "event": "mtm.Start" });
    const d = document, g = d.createElement("script"), s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src = "https://matomo.aplint.pl/js/container_bHu0xCzw.js";
    s.parentNode.insertBefore(g, s);
  }, []);
  const router = url !== void 0 ? /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] }) }) : /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] }) });
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsx(Toaster$1, {}),
    /* @__PURE__ */ jsx(Toaster, {}),
    router
  ] }) });
};
function render(url) {
  return renderToString(/* @__PURE__ */ jsx(App, { url }));
}
export {
  render
};

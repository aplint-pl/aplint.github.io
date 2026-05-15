import * as React$1 from "react";
import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { Bolt, Check, ChevronDown, ChevronRight, Circle, FileText, Link2, Mail, MapPin, Menu, Moon, Phone, Settings, ShieldCheck, Sun, Target, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Link, Route, Routes, StaticRouter, useLocation, useNavigate } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
//#region src/hooks/use-toast.ts
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
	count = (count + 1) % Number.MAX_SAFE_INTEGER;
	return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
	if (toastTimeouts.has(toastId)) return;
	const timeout = setTimeout(() => {
		toastTimeouts.delete(toastId);
		dispatch({
			type: "REMOVE_TOAST",
			toastId
		});
	}, TOAST_REMOVE_DELAY);
	toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TOAST": return {
			...state,
			toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
		};
		case "UPDATE_TOAST": return {
			...state,
			toasts: state.toasts.map((t) => t.id === action.toast.id ? {
				...t,
				...action.toast
			} : t)
		};
		case "DISMISS_TOAST": {
			const { toastId } = action;
			if (toastId) addToRemoveQueue(toastId);
			else state.toasts.forEach((toast) => {
				addToRemoveQueue(toast.id);
			});
			return {
				...state,
				toasts: state.toasts.map((t) => t.id === toastId || toastId === void 0 ? {
					...t,
					open: false
				} : t)
			};
		}
		case "REMOVE_TOAST":
			if (action.toastId === void 0) return {
				...state,
				toasts: []
			};
			return {
				...state,
				toasts: state.toasts.filter((t) => t.id !== action.toastId)
			};
	}
};
var listeners = [];
var memoryState = { toasts: [] };
function dispatch(action) {
	memoryState = reducer(memoryState, action);
	listeners.forEach((listener) => {
		listener(memoryState);
	});
}
function toast$1({ ...props }) {
	const id = genId();
	const update = (props) => dispatch({
		type: "UPDATE_TOAST",
		toast: {
			...props,
			id
		}
	});
	const dismiss = () => dispatch({
		type: "DISMISS_TOAST",
		toastId: id
	});
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
	const [state, setState] = React$1.useState(memoryState);
	React$1.useEffect(() => {
		listeners.push(setState);
		return () => {
			const index = listeners.indexOf(setState);
			if (index > -1) listeners.splice(index, 1);
		};
	}, [state]);
	return {
		...state,
		toast: toast$1,
		dismiss: (toastId) => dispatch({
			type: "DISMISS_TOAST",
			toastId
		})
	};
}
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/toast.tsx
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Viewport, {
	ref,
	className: cn("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", className),
	...props
}));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = cva("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
	variants: { variant: {
		default: "border bg-background text-foreground",
		destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
	} },
	defaultVariants: { variant: "default" }
});
var Toast = React$1.forwardRef(({ className, variant, ...props }, ref) => {
	return /* @__PURE__ */ jsx(ToastPrimitives.Root, {
		ref,
		className: cn(toastVariants({ variant }), className),
		...props
	});
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Action, {
	ref,
	className: cn("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", className),
	...props
}));
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Close, {
	ref,
	className: cn("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", className),
	"toast-close": "",
	...props,
	children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
}));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, {
	ref,
	className: cn("text-sm font-semibold", className),
	...props
}));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, {
	ref,
	className: cn("text-sm opacity-90", className),
	...props
}));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
//#endregion
//#region src/components/ui/toaster.tsx
function Toaster$2() {
	const { toasts } = useToast();
	return /* @__PURE__ */ jsxs(ToastProvider, { children: [toasts.map(function({ id, title, description, action, ...props }) {
		return /* @__PURE__ */ jsxs(Toast, {
			...props,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid gap-1",
					children: [title && /* @__PURE__ */ jsx(ToastTitle, { children: title }), description && /* @__PURE__ */ jsx(ToastDescription, { children: description })]
				}),
				action,
				/* @__PURE__ */ jsx(ToastClose, {})
			]
		}, id);
	}), /* @__PURE__ */ jsx(ToastViewport, {})] });
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	const { theme = "system" } = useTheme();
	return /* @__PURE__ */ jsx(Toaster, {
		theme,
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/components/ui/tooltip.tsx
var TooltipProvider = TooltipPrimitive.Provider;
TooltipPrimitive.Root;
TooltipPrimitive.Trigger;
var TooltipContent = React$1.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
	...props
}));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			hero: "bg-gradient-primary text-primary-foreground hover:shadow-2xl font-semibold",
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
});
var Button = React$1.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ jsx(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region src/lib/matomo.ts
/**
* Matomo: MTM (`window._mtm`) + tracker (`window._paq`).
* Samo `_mtm.push` nie wywołuje żądań do `matomo.php` - trzeba też `trackEvent` przez `_paq`
* (albo osobny tag w MTM podpięty pod to zdarzenie).
* Kontener MTM: `src/App.tsx`.
*/
function trackContactProtocolLinkClick(href) {
	if (typeof window === "undefined") return;
	const protocol = href.startsWith("tel:") ? "tel" : href.startsWith("mailto:") ? "mailto" : null;
	if (!protocol) return;
	const w = window;
	w._mtm = w._mtm || [];
	w._mtm.push({
		event: "contact_protocol_link_click",
		contact_protocol: protocol,
		contact_href: href,
		page_path: window.location?.pathname ?? ""
	});
	w._paq = w._paq || [];
	w._paq.push([
		"trackEvent",
		"Kontakt",
		protocol === "tel" ? "Telefon" : "Email",
		href
	]);
}
function trackConsultationModalOpen(ctaLabel) {
	if (typeof window === "undefined") return;
	const w = window;
	w._mtm = w._mtm || [];
	w._mtm.push({
		event: "consultation_modal_open",
		cta_label: ctaLabel,
		page_path: window.location?.pathname ?? ""
	});
	w._paq = w._paq || [];
	w._paq.push([
		"trackEvent",
		"Konsultacja",
		"Modal open",
		ctaLabel
	]);
}
function trackConsultationRequestSubmit(method, outcome) {
	if (typeof window === "undefined") return;
	const w = window;
	w._mtm = w._mtm || [];
	w._mtm.push({
		event: "consultation_request_submit",
		preferred_contact_method: method,
		submit_outcome: outcome,
		page_path: window.location?.pathname ?? ""
	});
	w._paq = w._paq || [];
	w._paq.push([
		"trackEvent",
		"Konsultacja",
		`Submit ${outcome}`,
		method === "email" ? "Email" : "Telefon"
	]);
}
/** Wszystkie `<a href="tel:…">` i `<a href="mailto:…">` na stronie (również dodane później). */
function bindMatomoContactLinkTracking() {
	if (typeof document === "undefined") return () => void 0;
	const onClick = (e) => {
		if (!(e.target instanceof Element)) return;
		const a = e.target.closest("a[href]");
		if (!a || !(a instanceof HTMLAnchorElement)) return;
		const href = a.getAttribute("href")?.trim() ?? "";
		if (href.startsWith("tel:") || href.startsWith("mailto:")) trackContactProtocolLinkClick(href);
	};
	document.addEventListener("click", onClick);
	return () => document.removeEventListener("click", onClick);
}
//#endregion
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
DialogPrimitive.Close;
var DialogOverlay = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/input.tsx
var Input = React$1.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/ui/label.tsx
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = LabelPrimitive.Root.displayName;
//#endregion
//#region src/components/ui/radio-group.tsx
var RadioGroup = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx(RadioGroupPrimitive.Item, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
//#endregion
//#region src/components/ui/textarea.tsx
var Textarea = React$1.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var formFieldClassName = "h-12 min-h-12 px-4 text-base md:h-10 md:min-h-0 md:px-3 md:text-sm";
var formTextareaClassName = "min-h-[7.5rem] px-4 py-3 text-base md:min-h-[80px] md:px-3 md:py-2 md:text-sm";
var formLabelClassName = "text-base md:text-sm";
var contactMethodOptionClassName = "flex min-h-12 cursor-pointer items-center gap-3 rounded-md border p-4 md:min-h-0 md:gap-2 md:p-3";
function ConsultationModal({ trigger }) {
	const { toast } = useToast();
	const [isOpen, setIsOpen] = React.useState(false);
	const [contactMethod, setContactMethod] = React.useState("email");
	const [contactValue, setContactValue] = React.useState("");
	const [nameOrCompany, setNameOrCompany] = React.useState("");
	const [details, setDetails] = React.useState("");
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const ctaLabel = typeof trigger.props.children === "string" ? trigger.props.children.trim() : "CTA";
	const originalOnClick = trigger.props.onClick;
	const resetForm = () => {
		setContactMethod("email");
		setContactValue("");
		setNameOrCompany("");
		setDetails("");
	};
	const handleRequestContact = async (e) => {
		e.preventDefault();
		const trimmedContactValue = contactValue.trim();
		const trimmedNameOrCompany = nameOrCompany.trim();
		const trimmedDetails = details.trim();
		if (!trimmedContactValue || !trimmedNameOrCompany) {
			trackConsultationRequestSubmit(contactMethod, "validation_error");
			toast({
				title: "Uzupełnij wymagane pola",
				description: "Podaj dane kontaktowe oraz imię i nazwisko albo nazwę firmy.",
				variant: "destructive"
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
			trimmedDetails ? `Dodatkowe informacje: ${trimmedDetails}` : null
		].filter(Boolean).join("\n");
		setIsSubmitting(true);
		try {
			if (!(await fetch("https://formsubmit.co/ajax/kontakt@aplint.pl", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({
					_subject: "Zamów kontakt - APLiNT",
					name: trimmedNameOrCompany,
					email: contactMethod === "email" ? trimmedContactValue : "kontakt-telefon@aplint.pl",
					message,
					preferredContactMethod: preferredMethodLabel,
					contactValue: trimmedContactValue,
					_captcha: "false",
					_template: "table"
				})
			})).ok) throw new Error("Request failed");
			toast({
				title: "Zgłoszenie wysłane",
				description: "Dziękujemy. Skontaktujemy się z Tobą najszybciej jak to możliwe."
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
				description: "Otworzyliśmy email jako plan B, żeby nie stracić zgłoszenia."
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ jsxs(Dialog, {
		open: isOpen,
		onOpenChange: (open) => {
			setIsOpen(open);
			if (open) trackConsultationModalOpen(ctaLabel);
		},
		children: [/* @__PURE__ */ jsx(DialogTrigger, {
			asChild: true,
			children: React.cloneElement(trigger, { onClick: (e) => {
				originalOnClick?.(e);
			} })
		}), /* @__PURE__ */ jsxs(DialogContent, {
			className: cn("max-w-xl gap-3 p-4 sm:gap-4 sm:p-6", "w-[calc(100%-2rem)] sm:w-full", "max-h-[90dvh] overflow-y-auto overscroll-contain", "max-sm:left-0 max-sm:top-0 max-sm:w-screen max-sm:max-w-none max-sm:h-[100dvh] max-sm:max-h-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none"),
			children: [
				/* @__PURE__ */ jsx(DialogHeader, {
					className: "pr-8 text-left",
					children: /* @__PURE__ */ jsx(DialogTitle, { children: "Bezpłatna konsultacja" })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-1.5 text-sm sm:space-y-2",
					children: [
						/* @__PURE__ */ jsx("a", {
							href: "mailto:kontakt@aplint.pl",
							className: "block text-primary hover:text-primary-glow transition-colors",
							children: "kontakt@aplint.pl"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "tel:+48725116342",
							className: "block text-primary hover:text-primary-glow transition-colors",
							children: "+48 725 116 342"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "tel:+48883572813",
							className: "block text-primary hover:text-primary-glow transition-colors",
							children: "+48 883 572 813"
						}),
						/* @__PURE__ */ jsx("a", {
							href: "tel:+48519500510",
							className: "block text-primary hover:text-primary-glow transition-colors",
							children: "+48 519 500 510"
						})
					]
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: handleRequestContact,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-base font-semibold text-foreground",
							children: "Zamów kontakt"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2.5",
							children: [/* @__PURE__ */ jsx(Label, {
								className: formLabelClassName,
								children: "Preferowana forma kontaktu"
							}), /* @__PURE__ */ jsxs(RadioGroup, {
								value: contactMethod,
								onValueChange: (value) => setContactMethod(value),
								className: "grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2 min-[400px]:gap-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: contactMethodOptionClassName,
									children: [/* @__PURE__ */ jsx(RadioGroupItem, {
										value: "email",
										id: "contact-method-email",
										className: "h-5 w-5 md:h-4 md:w-4"
									}), /* @__PURE__ */ jsx(Label, {
										htmlFor: "contact-method-email",
										className: cn(formLabelClassName, "cursor-pointer font-normal"),
										children: "Email"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: contactMethodOptionClassName,
									children: [/* @__PURE__ */ jsx(RadioGroupItem, {
										value: "phone",
										id: "contact-method-phone",
										className: "h-5 w-5 md:h-4 md:w-4"
									}), /* @__PURE__ */ jsx(Label, {
										htmlFor: "contact-method-phone",
										className: cn(formLabelClassName, "cursor-pointer font-normal"),
										children: "Telefon"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2.5",
							children: [/* @__PURE__ */ jsxs(Label, {
								htmlFor: "contact-value",
								className: formLabelClassName,
								children: ["Twój ", contactMethod === "email" ? "email" : "telefon"]
							}), /* @__PURE__ */ jsx(Input, {
								id: "contact-value",
								type: contactMethod === "email" ? "email" : "tel",
								value: contactValue,
								onChange: (e) => setContactValue(e.target.value),
								placeholder: contactMethod === "email" ? "np. jan@firma.pl" : "np. +48 600 123 456",
								className: formFieldClassName,
								required: true
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2.5",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "name-or-company",
								className: formLabelClassName,
								children: "Imię i nazwisko albo firma"
							}), /* @__PURE__ */ jsx(Input, {
								id: "name-or-company",
								value: nameOrCompany,
								onChange: (e) => setNameOrCompany(e.target.value),
								placeholder: "np. Jan Kowalski / Firma XYZ",
								className: formFieldClassName,
								required: true
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2.5",
							children: [/* @__PURE__ */ jsx(Label, {
								htmlFor: "details",
								className: formLabelClassName,
								children: "Dodatkowe informacje (opcjonalnie)"
							}), /* @__PURE__ */ jsx(Textarea, {
								id: "details",
								value: details,
								onChange: (e) => setDetails(e.target.value),
								placeholder: "Krótko opisz, czego potrzebujesz.",
								className: formTextareaClassName
							})]
						}),
						/* @__PURE__ */ jsx(Button, {
							type: "submit",
							size: "lg",
							className: "h-12 w-full text-base md:h-11 md:text-sm",
							disabled: isSubmitting,
							children: isSubmitting ? "Wysyłanie..." : "Zamów kontakt"
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/HeroSection.tsx
var HeroSection = () => {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative scroll-mt-14 min-h-[calc(85svh-3.5rem)] flex items-center justify-center bg-gradient-bg overflow-visible",
		children: [/* @__PURE__ */ jsxs("div", {
			"aria-hidden": "true",
			className: "absolute inset-0 overflow-hidden pointer-events-none",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" }),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] [background-size:48px_48px]" }),
				/* @__PURE__ */ jsx("div", { className: "absolute -top-10 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" }),
				/* @__PURE__ */ jsx("div", {
					className: "absolute bottom-0 right-1/4 w-[34rem] h-[34rem] bg-primary-glow/10 rounded-full blur-3xl animate-float",
					style: { animationDelay: "2s" }
				}),
				/* @__PURE__ */ jsx("div", {
					className: "absolute top-6 right-6 opacity-15",
					children: /* @__PURE__ */ jsxs("svg", {
						width: "220",
						height: "220",
						viewBox: "0 0 200 200",
						className: "animate-glow",
						children: [
							/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
								id: "networkGradient",
								x1: "0%",
								y1: "0%",
								x2: "100%",
								y2: "100%",
								children: [/* @__PURE__ */ jsx("stop", {
									offset: "0%",
									stopColor: "hsl(var(--primary))"
								}), /* @__PURE__ */ jsx("stop", {
									offset: "100%",
									stopColor: "hsl(var(--primary-glow))"
								})]
							}) }),
							/* @__PURE__ */ jsx("circle", {
								cx: "50",
								cy: "50",
								r: "4",
								fill: "url(#networkGradient)"
							}),
							/* @__PURE__ */ jsx("circle", {
								cx: "150",
								cy: "50",
								r: "4",
								fill: "url(#networkGradient)"
							}),
							/* @__PURE__ */ jsx("circle", {
								cx: "100",
								cy: "100",
								r: "4",
								fill: "url(#networkGradient)"
							}),
							/* @__PURE__ */ jsx("circle", {
								cx: "50",
								cy: "150",
								r: "4",
								fill: "url(#networkGradient)"
							}),
							/* @__PURE__ */ jsx("circle", {
								cx: "150",
								cy: "150",
								r: "4",
								fill: "url(#networkGradient)"
							}),
							/* @__PURE__ */ jsx("line", {
								x1: "50",
								y1: "50",
								x2: "150",
								y2: "50",
								stroke: "url(#networkGradient)",
								strokeWidth: "1"
							}),
							/* @__PURE__ */ jsx("line", {
								x1: "50",
								y1: "50",
								x2: "100",
								y2: "100",
								stroke: "url(#networkGradient)",
								strokeWidth: "1"
							}),
							/* @__PURE__ */ jsx("line", {
								x1: "150",
								y1: "50",
								x2: "100",
								y2: "100",
								stroke: "url(#networkGradient)",
								strokeWidth: "1"
							}),
							/* @__PURE__ */ jsx("line", {
								x1: "100",
								y1: "100",
								x2: "50",
								y2: "150",
								stroke: "url(#networkGradient)",
								strokeWidth: "1"
							}),
							/* @__PURE__ */ jsx("line", {
								x1: "100",
								y1: "100",
								x2: "150",
								y2: "150",
								stroke: "url(#networkGradient)",
								strokeWidth: "1"
							})
						]
					})
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative container mx-auto text-center",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "mb-8 flex justify-center",
					children: [/* @__PURE__ */ jsx("img", {
						src: "/images/aplint-logo.svg",
						alt: "APLiNT",
						className: "h-24 md:h-32 dark:hidden"
					}), /* @__PURE__ */ jsx("img", {
						src: "/images/aplint-logo-inv.svg",
						alt: "APLiNT",
						className: "hidden h-24 md:h-32 dark:block"
					})]
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "text-4xl md:text-6xl lg:text-7x1 font-bold mb-6 text-balance",
					children: "Wdrażamy AI w Twoim biznesie"
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance",
					children: [
						"Automatyzujemy procesy w działach produkcji, finansów i logistyki. Szybkie wdrożenie. Integracja z Twoimi systemami.",
						/* @__PURE__ */ jsx("br", {}),
						"Dane zostają u Ciebie."
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-wrap items-center justify-center gap-3",
					children: [/* @__PURE__ */ jsx(ConsultationModal, { trigger: /* @__PURE__ */ jsx(Button, {
						variant: "hero",
						size: "xl",
						className: "hover:animate-none",
						children: "Bezpłatna konsultacja"
					}) }), /* @__PURE__ */ jsx(Button, {
						variant: "outline",
						size: "xl",
						asChild: true,
						children: /* @__PURE__ */ jsx(Link, {
							to: "/#oferta",
							children: "Nasza oferta"
						})
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm md:text-base text-muted-foreground max-w-3xl mx-auto mt-4 text-balance",
					children: "Porozmawiajmy o Twoich pomysłach - bez zobowiązań"
				})
			]
		})]
	});
};
//#endregion
//#region src/components/ui/card.tsx
var Card = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", {
	ref,
	className: cn("text-2xl font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
//#endregion
//#region src/components/HighlightsSection.tsx
var highlights = [
	{
		icon: Bolt,
		label: "Tempo wdrożeń",
		title: "Wdrożenia w tygodniach, nie miesiącach",
		description: "Nie wierzymy w projekty ciągnące się latami. Działamy zwinnie - pierwsze efekty zobaczysz szybciej, niż myślisz. Zaczynamy od pilotażu, który udowadnia wartość, zanim zainwestujesz więcej."
	},
	{
		icon: Link2,
		label: "Kompatybilność",
		title: "Integracja z każdym systemem",
		description: "Masz ERP, WMS, CRM lub własne rozwiązania? Nie musisz niczego wymieniać. Nasze rozwiązania AI łączą się z Twoją istniejącą infrastrukturą - Comarch, SAP, Subiekt, Excel czy systemy dedykowane."
	},
	{
		icon: ShieldCheck,
		label: "Kontrola danych",
		title: "Twoje dane zostają u Ciebie",
		description: "Wykorzystujemy lokalne modele AI, które działają w Twojej infrastrukturze. Dane produkcyjne, ceny, receptury i informacje o klientach nie opuszczają Twojej firmy. Pełna zgodność i kontrola."
	}
];
function HighlightsSection() {
	return /* @__PURE__ */ jsx("section", {
		className: "py-20 bg-gradient-to-b from-background to-muted/20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-16",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance",
						children: "Dlaczego firmy produkcyjne wybierają APLiNT"
					}),
					/* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto" }),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 flex justify-center",
						children: /* @__PURE__ */ jsx(Button, {
							variant: "outline",
							size: "xl",
							asChild: true,
							children: /* @__PURE__ */ jsx("a", {
								href: "/faq",
								children: "Często zadawane pytania"
							})
						})
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid gap-6 lg:grid-cols-12 md:grid-rows-2 md:gap-8",
				children: highlights.map((h, index) => {
					return /* @__PURE__ */ jsxs(Card, {
						className: ["group relative overflow-hidden transition-all duration-300 hover:shadow-elegant border-border bg-card/60 backdrop-blur-sm", index === 0 ? "md:col-span-5 md:col-start-1 md:row-start-1" : index === 1 ? "md:col-span-5 md:col-start-7 md:row-start-1" : "md:col-span-6 md:col-start-4 md:row-start-2"].join(" "),
						children: [
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-transparent" }),
							/* @__PURE__ */ jsx("div", { className: "absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-60" }),
							/* @__PURE__ */ jsxs(CardHeader, {
								className: "relative z-10",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "flex items-center justify-center mb-4",
										children: /* @__PURE__ */ jsx("span", {
											className: "inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-semibold text-primary",
											children: h.label
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mx-auto w-16 h-16 rounded-2xl bg-gradient-primary/10 ring-1 ring-primary/20 flex items-center justify-center mb-4",
										children: /* @__PURE__ */ jsx(h.icon, {
											className: "h-7 w-7 text-primary",
											"aria-hidden": "true"
										})
									}),
									/* @__PURE__ */ jsx(CardTitle, {
										className: "text-xl text-foreground text-center",
										children: h.title
									})
								]
							}),
							/* @__PURE__ */ jsx(CardContent, {
								className: "relative z-10",
								children: /* @__PURE__ */ jsx(CardDescription, {
									className: "text-muted-foreground leading-relaxed text-base md:text-[1.02rem]",
									children: h.description
								})
							})
						]
					}, h.title);
				})
			})]
		})
	});
}
//#endregion
//#region src/components/ForWhoSection.tsx
var forWho = [
	{
		title: "Dział produkcji",
		description: "Optymalizacja planowania, predykcja awarii, kontrola jakości. AI analizuje dane z maszyn i systemów, żebyś mógł podejmować lepsze decyzje — szybciej.",
		bullets: [
			"Automatyczne planowanie produkcji",
			"Wczesne wykrywanie anomalii",
			"Analiza przyczyn przestojów"
		]
	},
	{
		title: "Dział finansów",
		description: "Automatyzacja powtarzalnych zadań — od przetwarzania faktur po tworzenie wniosków zakupowych. Mniej ręcznej pracy, mniej błędów, więcej czasu na analizę.",
		bullets: [
			"Automatyczne tworzenie wniosków zakupowych",
			"Przetwarzanie i kategoryzacja faktur",
			"Wykrywanie anomalii w rozliczeniach"
		]
	},
	{
		title: "Dział logistyki",
		description: "Inteligentna analiza zapytań ofertowych, automatyzacja dokumentacji transportowej, optymalizacja zapasów. AI odciąża Twój zespół od rutynowych zadań.",
		bullets: [
			"Automatyczna analiza zapytań ofertowych",
			"Kategoryzacja i priorytetyzacja zamówień",
			"Prognozowanie stanów magazynowych"
		]
	}
];
function ForWhoSection() {
	return /* @__PURE__ */ jsx("section", {
		id: "dla-kogo",
		className: "scroll-mt-14 py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto max-w-5xl px-4",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "mb-12 border-b border-foreground/15 pb-10",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-3xl md:text-4xl font-bold text-foreground text-balance mb-4",
					children: "Wspieramy działy, które mają najwięcej do zyskania"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-lg text-muted-foreground max-w-3xl leading-relaxed text-balance",
					children: "Pracujemy ze średnimi i dużymi przedsiębiorstwami (30–1000 pracowników), które chcą usprawnić codzienne operacje bez rewolucji w IT."
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "divide-y divide-foreground/15",
				children: forWho.map((item) => /* @__PURE__ */ jsxs("article", {
					className: "grid gap-8 py-12 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:gap-16",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-2xl md:text-3xl font-bold text-foreground text-balance",
						children: item.title
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "text-muted-foreground leading-relaxed mb-8 md:mb-10",
						children: item.description
					}), /* @__PURE__ */ jsx("ul", {
						role: "list",
						className: "border-t border-foreground/10 divide-y divide-foreground/10",
						children: item.bullets.map((bullet, index) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-baseline gap-6 py-4 first:pt-5",
							children: [/* @__PURE__ */ jsx("span", {
								className: "shrink-0 text-sm font-medium tabular-nums text-muted-foreground/50",
								"aria-hidden": "true",
								children: String(index + 1)
							}), /* @__PURE__ */ jsx("span", {
								className: "text-foreground/90 leading-relaxed",
								children: bullet
							})]
						}, bullet))
					})] })]
				}, item.title))
			})]
		})
	});
}
//#endregion
//#region src/components/ServicesSection.tsx
var ServicesSection = () => {
	return /* @__PURE__ */ jsx("section", {
		id: "oferta",
		className: "scroll-mt-14 py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-16",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-3xl md:text-4xl font-bold mb-4 text-foreground",
					children: "Trzy obszary, w których AI przynosi wymierne korzyści"
				}), /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto" })]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid lg:grid-cols-3 gap-8",
				children: [
					{
						icon: Settings,
						title: "Automatyzacja procesów",
						description: "Identyfikujemy powtarzalne zadania, które pochłaniają czas Twojego zespołu, i automatyzujemy je za pomocą AI. Faktury, wnioski, raporty, korespondencja - to wszystko może dziać się samo.",
						effects: [
							"Redukcja czasu na rutynowe zadania nawet o 90%",
							"Eliminacja błędów ludzkich",
							"Pracownicy skupiają się na tym, co ważne"
						]
					},
					{
						icon: Target,
						title: "Wspomaganie decyzji",
						description: "AI analizuje dane z Twoich systemów i dostarcza rekomendacje w czasie rzeczywistym. Zamiast zgadywać lub tracić godziny na analizę Exceli - dostajesz konkretne odpowiedzi.",
						effects: [
							"Szybsze podejmowanie decyzji",
							"Decyzje oparte na danych, nie intuicji",
							"Wczesne wykrywanie problemów i szans"
						]
					},
					{
						icon: FileText,
						title: "Analiza treści i dokumentów",
						description: "Maile, zapytania ofertowe, umowy, specyfikacje - AI czyta, kategoryzuje i wyciąga kluczowe informacje. Twój zespół dostaje gotowe podsumowania zamiast stosów dokumentów.",
						effects: [
							"Automatyczna kategoryzacja korespondencji",
							"Wyciąganie kluczowych danych z dokumentów",
							"Szybsza reakcja na zapytania klientów"
						]
					}
				].map((service, index) => /* @__PURE__ */ jsxs(Card, {
					className: "group transition-all duration-300 hover:shadow-elegant border-border bg-card/50 backdrop-blur-sm overflow-hidden",
					children: [/* @__PURE__ */ jsxs(CardHeader, {
						className: "text-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "mx-auto w-14 h-14 rounded-2xl bg-gradient-primary/10 flex items-center justify-center mb-4",
							children: /* @__PURE__ */ jsx(service.icon, {
								className: "h-7 w-7 text-primary",
								"aria-hidden": "true"
							})
						}), /* @__PURE__ */ jsx(CardTitle, {
							className: "text-xl text-foreground",
							children: service.title
						})]
					}), /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx(CardDescription, {
						className: "text-muted-foreground leading-relaxed mb-4",
						children: service.description
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsx("div", {
							className: "text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide",
							children: "Efekty"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-2",
							children: service.effects.map((effect) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ jsx(Check, {
									className: "mt-0.5 h-5 w-5 text-primary",
									"aria-hidden": "true"
								}), /* @__PURE__ */ jsx("span", {
									className: "leading-relaxed",
									children: effect
								})]
							}, effect))
						})]
					})] })]
				}, index))
			})]
		})
	});
};
//#endregion
//#region src/components/ProcessSection.tsx
var ProcessSection = () => {
	return /* @__PURE__ */ jsx("section", {
		id: "jak-dzialamy",
		className: "scroll-mt-14 py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "text-center mb-16",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-3xl md:text-4xl font-bold mb-4 text-foreground text-balance",
							children: "Jak wdrażamy AI w Twojej firmie"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-6 text-balance",
							children: "Sprawdzony proces, który minimalizuje ryzyko i maksymalizuje efekty"
						}),
						/* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto" })
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16",
					children: [
						{
							number: "1",
							title: "Analiza potrzeb",
							time: "1-2 tygodnie",
							description: "Rozmawiamy z Twoim zespołem, mapujemy procesy i identyfikujemy miejsca, gdzie AI da największy efekt. Nie wdrażamy technologii dla samej technologii - szukamy realnych korzyści biznesowych.",
							deliverable: "Raport z rekomendacjami i estymacją ROI"
						},
						{
							number: "2",
							title: "Pilotaż",
							time: "2-4 tygodnie",
							description: "Budujemy działający prototyp na rzeczywistych danych. Pokazujemy efekty, zanim zainwestujesz w pełne wdrożenie. To moment, w którym weryfikujesz wartość rozwiązania.",
							deliverable: "Działające rozwiązanie w ograniczonym zakresie"
						},
						{
							number: "3",
							title: "Wdrożenie",
							time: "4-8 tygodni",
							description: "Rozwijamy pilotaż do pełnego rozwiązania, integrujemy z Twoimi systemami i szkolimy użytkowników końcowych. Dbamy o to, żeby przejście było płynne i bezbolesne.",
							deliverable: "Produkcyjne rozwiązanie AI zintegrowane z Twoją infrastrukturą"
						},
						{
							number: "4",
							title: "Wsparcie i rozwój",
							time: "Ciągłe",
							description: "Monitorujemy działanie rozwiązania, reagujemy na problemy i rozwijamy funkcjonalności. AI to nie jest projekt jednorazowy - to narzędzie, które rośnie razem z Twoją firmą.",
							deliverable: "SLA, monitoring, regularne przeglądy i aktualizacje"
						}
					].map((step) => /* @__PURE__ */ jsxs(Card, {
						className: "group relative flex h-full flex-col overflow-hidden border-border bg-card/70 backdrop-blur-sm hover:shadow-elegant transition-all duration-500",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "absolute top-4 right-4 text-4xl lg:text-5xl font-bold text-primary/25",
								children: step.number
							}),
							/* @__PURE__ */ jsxs(CardHeader, {
								className: "relative z-10 pb-2",
								children: [/* @__PURE__ */ jsx(CardTitle, {
									className: "text-lg text-foreground pr-10",
									children: step.title
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm text-muted-foreground",
									children: step.time
								})]
							}),
							/* @__PURE__ */ jsxs(CardContent, {
								className: "relative z-10 flex flex-1 flex-col pt-0",
								children: [/* @__PURE__ */ jsx(CardDescription, {
									className: "text-sm text-muted-foreground leading-relaxed mb-4 flex-1",
									children: step.description
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-auto space-y-2",
									children: [/* @__PURE__ */ jsx("div", {
										className: "text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide",
										children: "Co dostarczamy"
									}), /* @__PURE__ */ jsx("div", {
										className: "text-sm text-muted-foreground leading-relaxed",
										children: step.deliverable
									})]
								})]
							})
						]
					}, step.number))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "text-center",
					children: /* @__PURE__ */ jsx(Card, {
						className: "bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20 backdrop-blur-sm",
						children: /* @__PURE__ */ jsxs(CardContent, {
							className: "p-8",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-2xl font-bold text-foreground mb-4",
								children: "Typowy czas wdrożenia"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto text-balance",
								children: "Typowy czas od pierwszego kontaktu do działającego rozwiązania: 8-14 tygodni"
							})]
						})
					})
				})
			]
		})
	});
};
//#endregion
//#region src/components/ui/badge.tsx
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
//#region src/components/PortfolioSection.tsx
var PortfolioSection = () => {
	return /* @__PURE__ */ jsx("section", {
		id: "case-study",
		className: "scroll-mt-14 py-20 bg-gradient-to-b from-muted/10 to-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-16",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-3xl md:text-4xl font-bold mb-4 text-foreground",
						children: "Przykład wdrożenia"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-lg text-muted-foreground mb-6 max-w-2xl mx-auto text-balance",
						children: "Jak AI usprawniło proces w firmie produkcyjnej"
					}),
					/* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto" })
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "max-w-4xl mx-auto",
				children: /* @__PURE__ */ jsxs(Card, {
					className: "border-border bg-card/70 backdrop-blur-sm overflow-hidden",
					children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(Badge, {
						variant: "secondary",
						className: "text-sm",
						children: "Dział finansów • Automatyzacja"
					}), /* @__PURE__ */ jsx(CardTitle, {
						className: "text-2xl text-foreground mt-3",
						children: "Automatyzacja wniosków zakupowych w globalnej firmie produkcyjnej"
					})] }), /* @__PURE__ */ jsxs(CardContent, {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-sm font-semibold text-foreground",
									children: "Kontekst"
								}), /* @__PURE__ */ jsx(CardDescription, {
									className: "text-muted-foreground leading-relaxed",
									children: "Globalna firma produkcyjna z branży AGD borykała się z czasochłonnym procesem tworzenia wniosków zakupowych. Zespół finansowy spędzał godziny na ręcznym przepisywaniu danych i weryfikacji dokumentów."
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-sm font-semibold text-foreground",
									children: "Wyzwanie"
								}), /* @__PURE__ */ jsx(CardDescription, {
									className: "text-muted-foreground leading-relaxed",
									children: "Ręczne tworzenie wniosków zakupowych wymagało dużo czasu, było podatne na błędy i angażowało wykwalifikowanych pracowników w powtarzalne zadania."
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-sm font-semibold text-foreground",
									children: "Rozwiązanie"
								}), /* @__PURE__ */ jsx(CardDescription, {
									className: "text-muted-foreground leading-relaxed",
									children: "Wdrożyliśmy system AI, który automatycznie analizuje dokumenty źródłowe, wyciąga kluczowe dane i generuje gotowe wnioski zakupowe zgodne z wewnętrznymi procedurami firmy."
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-sm font-semibold text-foreground",
									children: "Wyniki"
								}), /* @__PURE__ */ jsxs("ul", {
									className: "space-y-2 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ jsxs("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-primary font-semibold",
												"aria-hidden": "true",
												children: "92%"
											}), /* @__PURE__ */ jsx("span", { children: "mniej ręcznych interwencji" })]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-primary font-semibold",
												"aria-hidden": "true",
												children: "↑"
											}), /* @__PURE__ */ jsx("span", { children: "Większa dokładność danych" })]
										}),
										/* @__PURE__ */ jsxs("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-primary font-semibold",
												"aria-hidden": "true",
												children: "↑"
											}), /* @__PURE__ */ jsx("span", { children: "Szybszy czas przetwarzania" })]
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("blockquote", {
								className: "border-l-2 border-primary/40 pl-4 py-2 text-sm text-muted-foreground",
								children: ["„Nasz zespół może teraz skupić się na analizie i optymalizacji zamiast na przepisywaniu danych.”", /* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground/80 mt-2",
									children: "— Dyrektor finansowy"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center pt-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-2xl font-bold text-foreground mb-2",
									children: "Masz podobne wyzwanie? Porozmawiajmy!"
								}), /* @__PURE__ */ jsx(ConsultationModal, { trigger: /* @__PURE__ */ jsx(Button, {
									variant: "hero",
									size: "xl",
									className: "group",
									children: "Umów bezpłatną konsultację"
								}) })]
							})
						]
					})]
				})
			})]
		})
	});
};
//#endregion
//#region src/components/TeamSection.tsx
var TeamSection = () => {
	return /* @__PURE__ */ jsx("section", {
		id: "zespol",
		className: "scroll-mt-14 py-20 bg-gradient-to-b from-background to-muted/20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-16",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-3xl md:text-4xl font-bold mb-4 text-foreground",
						children: "Nasz zespół"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-xl text-muted-foreground max-w-3xl mx-auto",
						children: "Trzech ekspertów, którzy przeprowadzą Cię przez wdrożenie"
					}),
					/* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto mt-6" })
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid lg:grid-cols-3 gap-8",
				children: [
					{
						name: "Kamil",
						image: "/images/kamilk.jpg",
						specialty: "Ekspert AI - Branża produkcyjna",
						description: "Specjalizuje się w optymalizacji procesów produkcyjnych. Pomaga firmom wykorzystać dane z maszyn i systemów do podejmowania lepszych decyzji operacyjnych.",
						skills: [
							"Produkcja",
							"Optymalizacja procesów",
							"Automatyzacja"
						]
					},
					{
						name: "Mateusz",
						image: "/images/mateuszk.jpg",
						specialty: "Ekspert AI - Strategie wdrożeniowe",
						description: "Projektuje strategie wdrożeń AI dopasowane do realiów firmy. Dba o to, żeby każdy projekt miał jasny cel biznesowy i mierzalne efekty.",
						skills: [
							"Strategie wdrożeniowe",
							"Planowanie",
							"Integracja AI"
						]
					},
					{
						name: "Kamil",
						image: "/images/kamilp.jpg",
						specialty: "Ekspert AI - Innowacje i R&D",
						description: "Śledzi najnowsze trendy w AI i dobiera technologie, które przynoszą realne korzyści. Testuje rozwiązania, zanim trafią do klientów.",
						skills: [
							"Innowacje",
							"R&D",
							"Nowe technologie"
						]
					}
				].map((member, index) => /* @__PURE__ */ jsxs(Card, {
					className: "group max-w-md mx-auto transition-all duration-500 hover:shadow-elegant border-border bg-card/70 backdrop-blur-sm relative overflow-hidden",
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
						/* @__PURE__ */ jsxs(CardHeader, {
							className: "text-center relative z-10",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary-glow/20 relative overflow-hidden group-hover:shadow-elegant transition-all duration-500",
									children: [/* @__PURE__ */ jsx("img", {
										src: member.image,
										alt: member.name,
										className: "w-full h-full object-cover rounded-full"
									}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50" })]
								}),
								/* @__PURE__ */ jsx(CardTitle, {
									className: "text-2xl text-foreground mb-2",
									children: member.name
								}),
								/* @__PURE__ */ jsx(Badge, {
									variant: "secondary",
									className: "mb-3 text-sm",
									children: member.specialty
								})
							]
						}),
						/* @__PURE__ */ jsxs(CardContent, {
							className: "relative z-10",
							children: [/* @__PURE__ */ jsx(CardDescription, {
								className: "text-muted-foreground leading-relaxed mb-4",
								children: member.description
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: member.skills.map((skill, skillIndex) => /* @__PURE__ */ jsx(Badge, {
									variant: "outline",
									className: "text-xs border-primary/30 text-primary",
									children: skill
								}, skillIndex))
							})]
						})
					]
				}, index))
			})]
		})
	});
};
//#endregion
//#region src/components/TechnologiesSection.tsx
var privacyPoints = [
	{
		title: "Pełna zgodność z RODO",
		description: "Od projektowania po wdrożenie i utrzymanie."
	},
	{
		title: "Wdrożenie on-premise",
		description: "AI może działać lokalnie, na serwerach klienta."
	},
	{
		title: "Opcja zero transferu danych",
		description: "Informacje nie muszą opuszczać infrastruktury firmy, jeśli jest to wymagane."
	},
	{
		title: "Pełna kontrola",
		description: "Zachowujesz 100% własności i nadzoru nad danymi."
	},
	{
		title: "Audytowalność",
		description: "Przejrzyste procesy gotowe na kontrole i certyfikacje."
	}
];
var TechnologiesSection = () => {
	return /* @__PURE__ */ jsxs("section", {
		id: "technologie",
		className: "scroll-mt-14",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container mx-auto py-20",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-16",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-3xl md:text-4xl font-bold mb-4 text-foreground",
						children: "Technologie, które stosujemy"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-lg text-muted-foreground mb-6 max-w-2xl mx-auto",
						children: "Sprawdzone narzędzia dopasowane do Twojej infrastruktury"
					}),
					/* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto" })
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-3",
				children: [
					{
						name: "AWS",
						logo: "/images/tech-logos/aws.svg",
						logoInv: "/images/tech-logos/aws-inv.svg"
					},
					{
						name: "Google Cloud",
						logo: "/images/tech-logos/google-cloud.svg"
					},
					{
						name: "Azure",
						logo: "/images/tech-logos/azure.svg"
					},
					{
						name: "Docker",
						logo: "/images/tech-logos/docker.svg"
					},
					{
						name: "React",
						logo: "/images/tech-logos/react.svg"
					},
					{
						name: "TypeScript",
						logo: "/images/tech-logos/typescript.svg"
					},
					{
						name: ".NET",
						logo: "/images/tech-logos/dotnet.svg"
					},
					{
						name: "Node.js",
						logo: "/images/tech-logos/nodejs.svg"
					},
					{
						name: "OpenAI",
						logo: "/images/tech-logos/openai.svg",
						logoInv: "/images/tech-logos/openai-inv.svg"
					},
					{
						name: "Anthropic",
						logo: "/images/tech-logos/anthropic.svg",
						logoInv: "/images/tech-logos/anthropic-inv.svg"
					},
					{
						name: "LLaMA",
						logo: "/images/tech-logos/llama.svg",
						logoInv: "/images/tech-logos/llama-inv.svg"
					},
					{
						name: "LangChain",
						logo: "/images/tech-logos/langchain.svg",
						logoInv: "/images/tech-logos/langchain-inv.svg"
					},
					{
						name: "Qdrant",
						logo: "/images/tech-logos/qdrant.svg"
					},
					{
						name: "MS SQL",
						logo: "/images/tech-logos/mssql.svg",
						logoInv: "/images/tech-logos/mssql-inv.svg"
					},
					{
						name: "PostgreSQL",
						logo: "/images/tech-logos/postgresql.svg"
					}
				].map((tech) => /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center justify-center gap-2 rounded-md border border-border/60 bg-muted/30 p-3 transition-colors hover:bg-primary/5",
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-md p-1",
						children: tech.logoInv ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("img", {
							src: tech.logo,
							alt: `${tech.name} logo`,
							className: "h-8 w-8 object-contain dark:hidden",
							loading: "lazy"
						}), /* @__PURE__ */ jsx("img", {
							src: tech.logoInv,
							alt: "",
							className: "h-8 w-8 hidden object-contain dark:block",
							loading: "lazy",
							"aria-hidden": true
						})] }) : /* @__PURE__ */ jsx("img", {
							src: tech.logo,
							alt: `${tech.name} logo`,
							className: "h-8 w-8 object-contain",
							loading: "lazy"
						})
					}), /* @__PURE__ */ jsx("span", {
						className: "text-[11px] text-center text-muted-foreground leading-tight",
						children: tech.name
					})]
				}, tech.name))
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "bg-card border-y border-border/40 py-20",
			children: /* @__PURE__ */ jsx("div", {
				className: "container mx-auto",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12 lg:gap-20 items-start",
					children: [/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h3", {
							className: "text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance",
							children: "Prywatność i zgodność"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 text-balance",
							children: "Prywatność i zgodność regulacyjna są wbudowane w każde nasze rozwiązanie."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-lg md:text-xl font-semibold text-foreground leading-relaxed text-balance",
							children: "Dostosowujemy model wdrożenia do wymagań klienta — od chmury po całkowicie lokalne instalacje."
						})
					] }), /* @__PURE__ */ jsx("ul", {
						role: "list",
						className: "border-y border-foreground/10 divide-y divide-foreground/10",
						children: privacyPoints.map((point) => /* @__PURE__ */ jsxs("li", {
							className: "py-5 first:pt-6 last:pb-6",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-semibold text-foreground",
								children: point.title
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-muted-foreground leading-relaxed",
								children: point.description
							})]
						}, point.title))
					})]
				})
			})
		})]
	});
};
//#endregion
//#region src/components/ContactSection.tsx
var ContactSection = () => {
	return /* @__PURE__ */ jsx("section", {
		className: "scroll-mt-14 py-20 bg-gradient-to-b from-background to-muted/20",
		id: "kontakt",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-16",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-3xl md:text-4xl font-bold mb-4 text-foreground",
						children: "Kontakt"
					}),
					/* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mx-auto mb-6" }),
					/* @__PURE__ */ jsx("p", {
						className: "text-xl text-muted-foreground max-w-2xl mx-auto text-balance",
						children: "Skontaktuj się z nami i dowiedz się, jak możemy przyspieszyć Twoje procesy"
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "max-w-6xl mx-auto",
				children: /* @__PURE__ */ jsx("div", {
					className: "space-y-8 max-w-2xl mx-auto w-full",
					children: /* @__PURE__ */ jsxs(Card, {
						className: "bg-card/70 backdrop-blur-sm border-border",
						children: [/* @__PURE__ */ jsxs(CardHeader, { children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-2xl text-foreground",
							children: "Dane kontaktowe"
						}), /* @__PURE__ */ jsx(CardDescription, { children: "Skontaktuj się z nami bezpośrednio" })] }), /* @__PURE__ */ jsxs(CardContent, {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "p-3 bg-gradient-primary rounded-lg",
										children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 text-primary-foreground" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "font-semibold text-foreground",
										children: "Email"
									}), /* @__PURE__ */ jsx("a", {
										href: "mailto:kontakt@aplint.pl",
										className: "text-primary hover:text-primary-glow transition-colors",
										children: "kontakt@aplint.pl"
									})] })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "p-3 bg-gradient-primary rounded-lg",
										children: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 text-primary-foreground" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "font-semibold text-foreground",
										children: "Telefon"
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ jsx("a", {
												href: "tel:+48725116342",
												className: "block text-primary hover:text-primary-glow transition-colors",
												children: "+48 725 116 342"
											}),
											/* @__PURE__ */ jsx("a", {
												href: "tel:+48883572813",
												className: "block text-primary hover:text-primary-glow transition-colors",
												children: "+48 883 572 813"
											}),
											/* @__PURE__ */ jsx("a", {
												href: "tel:+48519500510",
												className: "block text-primary hover:text-primary-glow transition-colors",
												children: "+48 519 500 510"
											})
										]
									})] })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "p-3 bg-gradient-primary rounded-lg",
										children: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-primary-foreground" })
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "font-semibold text-foreground",
										children: "Dane spółki"
									}), /* @__PURE__ */ jsxs("p", {
										className: "text-muted-foreground",
										children: [
											"Aplint Sp. z o.o.",
											/* @__PURE__ */ jsx("br", {}),
											"KRS 0000845044",
											/* @__PURE__ */ jsx("br", {}),
											"NIP 8842802170",
											/* @__PURE__ */ jsx("br", {}),
											"REGON 386247610",
											/* @__PURE__ */ jsx("br", {}),
											"Kapitał zakładowy: 5 000 zł",
											/* @__PURE__ */ jsx("br", {}),
											"ul. Marsz. Józefa Piłsudskiego 74/320",
											/* @__PURE__ */ jsx("br", {}),
											"50-020 Wrocław"
										]
									})] })]
								})
							]
						})]
					})
				})
			})]
		})
	});
};
//#endregion
//#region src/components/PreContactCtaSection.tsx
function PreContactCtaSection() {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative py-24 overflow-hidden",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "absolute inset-0 pointer-events-none",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-muted/20" }),
				/* @__PURE__ */ jsx("div", { className: "absolute -top-16 left-1/4 w-80 h-80 rounded-full bg-primary/15 blur-3xl" }),
				/* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 right-1/4 w-96 h-96 rounded-full bg-primary-glow/15 blur-3xl" }),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10 [background-image:linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)] [background-size:64px_64px]" })
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "container mx-auto relative",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-4xl mx-auto rounded-2xl border border-primary/20 bg-card/70 backdrop-blur-md shadow-elegant p-5 sm:p-8 md:p-12 text-center",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "text-3xl md:text-5xl font-bold mb-5 text-foreground",
						children: "Gotowy, żeby usprawnić swoje procesy?"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 text-balance",
						children: "Porozmawiajmy o Twoich wyzwaniach. Pierwsza konsultacja jest bezpłatna i niezobowiązująca."
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex flex-col items-center gap-4",
						children: /* @__PURE__ */ jsx(ConsultationModal, { trigger: /* @__PURE__ */ jsx(Button, {
							variant: "hero",
							size: "xl",
							className: "group",
							children: "Umów rozmowę"
						}) })
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/pages/Index.tsx
var Index = () => {
	return /* @__PURE__ */ jsxs("article", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ jsx(HeroSection, {}),
			/* @__PURE__ */ jsx(HighlightsSection, {}),
			/* @__PURE__ */ jsx(ForWhoSection, {}),
			/* @__PURE__ */ jsx(ServicesSection, {}),
			/* @__PURE__ */ jsx(ProcessSection, {}),
			/* @__PURE__ */ jsx(TechnologiesSection, {}),
			/* @__PURE__ */ jsx(PortfolioSection, {}),
			/* @__PURE__ */ jsx(TeamSection, {}),
			/* @__PURE__ */ jsx(PreContactCtaSection, {}),
			/* @__PURE__ */ jsx(ContactSection, {})
		]
	});
};
//#endregion
//#region src/pages/NotFound.tsx
var RobotIllustration = () => {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 520 380",
		xmlns: "http://www.w3.org/2000/svg",
		role: "img",
		"aria-label": "Holograficzna sieć AI skanuje zagubioną ścieżkę",
		className: "w-full h-auto drop-shadow-[0_14px_40px_hsl(var(--primary)/0.18)]",
		children: [
			/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsxs("linearGradient", {
				id: "holoLine",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ jsx("stop", {
					offset: "0%",
					stopColor: "hsl(var(--primary) / 0.85)",
					stopOpacity: "1"
				}), /* @__PURE__ */ jsx("stop", {
					offset: "100%",
					stopColor: "hsl(var(--accent) / 0.65)",
					stopOpacity: "1"
				})]
			}), /* @__PURE__ */ jsxs("radialGradient", {
				id: "holoGlow",
				cx: "50%",
				cy: "50%",
				r: "55%",
				children: [
					/* @__PURE__ */ jsx("stop", {
						offset: "0%",
						stopColor: "hsl(var(--primary) / 0.28)"
					}),
					/* @__PURE__ */ jsx("stop", {
						offset: "65%",
						stopColor: "hsl(var(--primary) / 0.10)"
					}),
					/* @__PURE__ */ jsx("stop", {
						offset: "100%",
						stopColor: "transparent"
					})
				]
			})] }),
			/* @__PURE__ */ jsx("ellipse", {
				cx: "258",
				cy: "210",
				rx: "168",
				ry: "120",
				fill: "url(#holoGlow)",
				opacity: "0.9"
			}),
			/* @__PURE__ */ jsxs("g", {
				className: "motion-safe:animate-float",
				style: { transformOrigin: "260px 210px" },
				children: [
					/* @__PURE__ */ jsx("path", {
						d: "M70 250 C120 190 175 165 235 195 C295 225 335 160 388 154 C438 148 466 172 485 214",
						fill: "none",
						stroke: "url(#holoLine)",
						strokeWidth: "3",
						strokeLinecap: "round",
						opacity: "0.95"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M95 290 C150 255 196 235 250 240 C312 245 352 285 400 270 C450 255 475 225 492 190",
						fill: "none",
						stroke: "hsl(var(--primary) / 0.35)",
						strokeWidth: "2.2",
						strokeLinecap: "round",
						opacity: "0.85"
					}),
					/* @__PURE__ */ jsxs("g", {
						opacity: "0.95",
						children: [
							/* @__PURE__ */ jsx("circle", {
								cx: "140",
								cy: "202",
								r: "9",
								fill: "hsl(var(--accent) / 0.65)",
								className: "motion-safe:animate-glow"
							}),
							/* @__PURE__ */ jsx("circle", {
								cx: "235",
								cy: "195",
								r: "7",
								fill: "hsl(var(--primary) / 0.45)",
								className: "motion-safe:animate-pulse"
							}),
							/* @__PURE__ */ jsx("circle", {
								cx: "335",
								cy: "165",
								r: "8",
								fill: "hsl(var(--accent) / 0.45)",
								className: "motion-safe:animate-pulse",
								style: { animationDelay: "120ms" }
							}),
							/* @__PURE__ */ jsx("circle", {
								cx: "438",
								cy: "210",
								r: "7",
								fill: "hsl(var(--primary) / 0.38)",
								className: "motion-safe:animate-pulse",
								style: { animationDelay: "240ms" }
							})
						]
					}),
					/* @__PURE__ */ jsx("g", {
						opacity: "0.55",
						children: /* @__PURE__ */ jsx("text", {
							x: "255",
							y: "222",
							textAnchor: "middle",
							fontSize: "54",
							fontWeight: "900",
							fill: "hsl(var(--primary-foreground) / 0.10)",
							style: { letterSpacing: "-0.06em" },
							children: "404"
						})
					}),
					/* @__PURE__ */ jsxs("g", {
						opacity: "0.85",
						children: [
							/* @__PURE__ */ jsx("path", {
								d: "M150 310 L225 240",
								stroke: "hsl(var(--primary) / 0.45)",
								strokeWidth: "3",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ jsx("path", {
								d: "M265 265 L350 180",
								stroke: "hsl(var(--accent) / 0.42)",
								strokeWidth: "3",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ jsx("path", {
								d: "M380 290 L460 190",
								stroke: "hsl(var(--primary) / 0.35)",
								strokeWidth: "2.5",
								strokeLinecap: "round"
							})
						]
					})
				]
			})
		]
	});
};
var NotFound = () => {
	const location = useLocation();
	useEffect(() => {
		console.error("Błąd 404: Użytkownik próbował wejść na nieistniejącą ścieżkę:", location.pathname);
	}, [location.pathname]);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative min-h-screen overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ jsxs("div", {
				"aria-hidden": true,
				className: "absolute inset-0 pointer-events-none",
				children: [
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-95 bg-[radial-gradient(circle_at_15%_20%,hsl(var(--primary)/0.26)_0%,transparent_55%),radial-gradient(circle_at_85%_25%,hsl(var(--accent)/0.20)_0%,transparent_52%),radial-gradient(circle_at_55%_80%,hsl(var(--primary)/0.16)_0%,transparent_58%)]" }),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,hsl(var(--primary)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.25)_1px,transparent_1px)] [background-size:52px_52px]" }),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(to_bottom,hsl(var(--foreground)/0.10)_0px,hsl(var(--foreground)/0.10)_1px,transparent_6px,transparent_13px)] motion-safe:animate-float" }),
					/* @__PURE__ */ jsx("div", { className: "absolute -left-24 top-24 h-[420px] w-[420px] rounded-full border border-primary/25 opacity-70 motion-safe:animate-glow" })
				]
			}),
			/* @__PURE__ */ jsx("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0",
				children: /* @__PURE__ */ jsx("div", {
					className: "absolute -right-10 -top-14 w-[420px] sm:w-[520px] opacity-95",
					children: /* @__PURE__ */ jsx(RobotIllustration, {})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "relative z-10 mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20",
				children: /* @__PURE__ */ jsxs("section", {
					className: "rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-7 sm:p-9 shadow-[var(--shadow-elegant)]",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsx("span", { className: "h-3.5 w-3.5 rounded-full bg-destructive/70" }),
								/* @__PURE__ */ jsx("span", { className: "h-3.5 w-3.5 rounded-full bg-accent/70" }),
								/* @__PURE__ */ jsx("span", { className: "h-3.5 w-3.5 rounded-full bg-primary/70" }),
								/* @__PURE__ */ jsx("span", {
									className: "ml-1 text-sm text-foreground/60",
									children: "terminal"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-7 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/40 px-3 py-1 text-sm text-foreground/70",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "relative h-2.5 w-2.5",
									children: [/* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-accent/80 animate-ping opacity-70" }), /* @__PURE__ */ jsx("span", { className: "relative block h-2.5 w-2.5 rounded-full bg-accent/85" })]
								}), "Analizuję ścieżkę…"]
							}), /* @__PURE__ */ jsxs("div", {
								className: "inline-flex items-center gap-1 rounded-full border border-border/40 bg-background/30 px-3 py-1 text-sm text-foreground/60",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-mono",
									children: "kod:"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-semibold",
									children: "404"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("h1", {
									className: "relative text-5xl sm:text-6xl font-extrabold tracking-tight",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "block",
											children: "404"
										}),
										/* @__PURE__ */ jsx("span", {
											"aria-hidden": true,
											className: "absolute inset-0 text-primary/70",
											style: {
												transform: "translate(2px, 0px)",
												animation: "glitchA 2.4s infinite linear"
											},
											children: "404"
										}),
										/* @__PURE__ */ jsx("span", {
											"aria-hidden": true,
											className: "absolute inset-0 text-accent/70",
											style: {
												transform: "translate(-2px, 0px)",
												animation: "glitchB 2.9s infinite linear"
											},
											children: "404"
										})
									]
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "mt-4 text-2xl sm:text-3xl font-bold text-foreground",
									children: "Nie znaleziono strony"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 text-base sm:text-lg text-foreground/70 leading-relaxed",
									children: "Ten adres nie istnieje albo został przeniesiony. Spróbuj wrócić na stronę główną lub zajrzeć do FAQ."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-8 flex flex-col gap-3 sm:flex-row sm:justify-start",
									children: [/* @__PURE__ */ jsx(Button, {
										asChild: true,
										variant: "hero",
										size: "lg",
										className: "w-full sm:w-auto",
										children: /* @__PURE__ */ jsx("a", {
											href: "/",
											children: "Wróć na stronę główną"
										})
									}), /* @__PURE__ */ jsx(Button, {
										asChild: true,
										variant: "outline",
										size: "lg",
										className: "w-full sm:w-auto",
										children: /* @__PURE__ */ jsx("a", {
											href: "/faq",
											children: "Zobacz FAQ"
										})
									})]
								}),
								/* @__PURE__ */ jsx("style", { children: `
                @keyframes glitchA {
                  0%, 100% { clip-path: inset(0 0 0 0); opacity: 0.75; }
                  12% { clip-path: inset(12% 0 64% 0); opacity: 0.95; }
                  28% { clip-path: inset(40% 0 20% 0); opacity: 0.85; }
                  46% { clip-path: inset(65% 0 10% 0); opacity: 0.9; }
                  62% { clip-path: inset(25% 0 45% 0); opacity: 0.95; }
                  78% { clip-path: inset(58% 0 14% 0); opacity: 0.8; }
                }
                @keyframes glitchB {
                  0%, 100% { clip-path: inset(0 0 0 0); opacity: 0.65; }
                  10% { clip-path: inset(55% 0 15% 0); opacity: 0.95; }
                  22% { clip-path: inset(15% 0 55% 0); opacity: 0.85; }
                  36% { clip-path: inset(48% 0 18% 0); opacity: 0.9; }
                  58% { clip-path: inset(30% 0 40% 0); opacity: 0.95; }
                  74% { clip-path: inset(8% 0 70% 0); opacity: 0.8; }
                }
                @media (prefers-reduced-motion: reduce) {
                  .motion-safe\\:animate-float,
                  .motion-safe\\:animate-glow,
                  .motion-safe\\:animate-pulse,
                  .motion-safe\\:animate-ping {
                    animation: none !important;
                  }
                  h1 > span[aria-hidden] { animation: none !important; }
                }
              ` })
							] }), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", {
								className: "rounded-xl border border-border/40 bg-background/35 p-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-xs font-semibold text-foreground/60",
									children: "Szczegóły"
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-3 space-y-2 text-sm text-foreground/70",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-foreground/60",
												children: "ścieżka"
											}), /* @__PURE__ */ jsx("span", {
												className: "font-mono break-all text-right",
												children: location.pathname
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-foreground/60",
												children: "status"
											}), /* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-2 font-semibold",
												children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-accent/85 animate-pulse" }), "nie znaleziono"]
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-foreground/60",
												children: "wskazówka"
											}), /* @__PURE__ */ jsx("span", {
												className: "text-right",
												children: "Spróbuj `/` albo `/faq`."
											})]
										})
									]
								})]
							}) })]
						})
					]
				})
			})
		]
	});
};
//#endregion
//#region src/pages/PrivacyPolicy.tsx
var PrivacyPolicy = () => {
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-background py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto max-w-3xl",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-3xl md:text-4xl font-bold mb-4",
					children: "Polityka prywatności"
				}),
				/* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mb-8" }),
				/* @__PURE__ */ jsxs("p", {
					className: "text-muted-foreground text-lg leading-relaxed mb-8",
					children: [
						"Niniejsza polityka prywatności określa zasady przetwarzania danych osobowych oraz wykorzystywania plików cookie, narzędzia Matomo i pamięci lokalnej przeglądarki w związku z korzystaniem z serwisu internetowego dostępnego pod adresem",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: "https://aplint.pl",
							className: "text-primary hover:text-primary-glow transition-colors",
							children: "aplint.pl"
						}),
						" ",
						"(dalej: „Serwis”)."
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "space-y-8",
					children: [
						/* @__PURE__ */ jsxs("section", { children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold mb-2",
								children: "1. Administrator danych"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed mb-3",
								children: "Administratorem danych osobowych w rozumieniu rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) jest:"
							}),
							/* @__PURE__ */ jsxs("address", {
								className: "not-italic text-muted-foreground leading-relaxed mb-3",
								children: [
									/* @__PURE__ */ jsx("strong", {
										className: "text-foreground font-medium",
										children: "Aplint Sp. z o.o."
									}),
									/* @__PURE__ */ jsx("br", {}),
									"ul. Marsz. Józefa Piłsudskiego 74/320, 50-020 Wrocław",
									/* @__PURE__ */ jsx("br", {}),
									"KRS: 0000845044, NIP: 8842802170, REGON: 386247610"
								]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-muted-foreground leading-relaxed",
								children: [
									"Kontakt w sprawach ochrony danych osobowych i prywatności:",
									" ",
									/* @__PURE__ */ jsx("a", {
										href: "mailto:kontakt@aplint.pl",
										className: "text-primary hover:text-primary-glow transition-colors",
										children: "kontakt@aplint.pl"
									}),
									", tel.",
									" ",
									/* @__PURE__ */ jsx("a", {
										href: "tel:+48725116342",
										className: "text-primary hover:text-primary-glow transition-colors",
										children: "+48 725 116 342"
									}),
									" ",
									"(oraz numery podane w zakładce Kontakt w Serwisie)."
								]
							})
						] }),
						/* @__PURE__ */ jsxs("section", { children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold mb-2",
								children: "2. Charakter Serwisu i zakres danych"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed mb-3",
								children: "Serwis ma charakter informacyjny i prezentacyjny: przedstawia ofertę, zespół i sposób działania APLiNT. Samo przeglądanie treści nie wymaga rejestracji ani podawania danych osobowych."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed",
								children: "Dane osobowe mogą zostać przez Ciebie przekazane dobrowolnie, w szczególności w treści wiadomości e-mail, podczas rozmowy telefonicznej lub po przejściu do zewnętrznego serwisu rezerwacji spotkań Calendly (Calendly LLC), który przetwarza dane na własnych zasadach - obowiązuje wtedy polityka prywatności tego podmiotu."
							})
						] }),
						/* @__PURE__ */ jsxs("section", { children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold mb-2",
								children: "3. Pliki cookie i analityka Matomo"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-muted-foreground leading-relaxed mb-3",
								children: [
									"W Serwisie stosujemy pliki cookie oraz podobne technologie, w tym w celu prowadzenia statystyk ruchu za pomocą",
									" ",
									/* @__PURE__ */ jsx("strong", {
										className: "text-foreground font-medium",
										children: "Matomo"
									}),
									" - narzędzia open source do analityki internetowej, obsługiwanego przez Administratora (żądania mogą być kierowane do domeny",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "text-foreground",
										children: "matomo.aplint.pl"
									}),
									"). Matomo pozwala m.in. analizować odwiedzane podstrony, źródła ruchu, typ urządzenia i przeglądarki oraz przybliżoną lokalizację (np. kraj lub region). W konfiguracji mogą być stosowane mechanizmy ograniczające identyfikowalność, w tym skracanie lub anonimizacja adresu IP."
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed mb-3",
								children: "Listę plików cookie zapisywanych w Twojej przeglądarce oraz ich czas trwania możesz sprawdzić w ustawieniach przeglądarki (np. narzędzia deweloperskie / pamięć witryny). Możesz w każdej chwili usunąć pliki cookie lub zablokować ich zapis - może to jednak wpłynąć na działanie części funkcji Serwisu."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed",
								children: "Podstawą prawną przetwarzania danych w zakresie analityki jest art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora: prowadzenie statystyk, poprawa działania i bezpieczeństwa Serwisu). Przysługuje Ci prawo wniesienia sprzeciwu w zakresie przetwarzania opartego na tym interesie, z uwzględnieniem przepisów prawa."
							})
						] }),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-semibold mb-2",
							children: "4. Pamięć lokalna przeglądarki (local storage)"
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-muted-foreground leading-relaxed",
							children: [
								"W celu zapamiętania preferencji wyświetlania Serwisu (np. tryb jasny lub ciemny) wykorzystywana jest lokalna pamięć przeglądarki",
								" ",
								/* @__PURE__ */ jsx("strong", {
									className: "text-foreground font-medium",
									children: "(Web Storage / local storage)"
								}),
								". Zapis odbywa się na Twoim urządzeniu i domyślnie nie jest automatycznie przesyłany na serwer Administratora. Usunięcie danych witryny w ustawieniach przeglądarki usuwa te zapisy. Podstawą prawną jest art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes: zapewnienie wygodnego korzystania z Serwisu)."
							]
						})] }),
						/* @__PURE__ */ jsxs("section", { children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold mb-2",
								children: "5. Cele, podstawy i zakres przetwarzania danych osobowych"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed mb-3",
								children: "Dane osobowe przekazane przez Ciebie w związku z kontaktem lub zapytniami (np. imię i nazwisko, adres e-mail, numer telefonu, nazwa firmy, treść wiadomości) przetwarzamy w celu:"
							}),
							/* @__PURE__ */ jsxs("ul", {
								className: "list-disc pl-6 text-muted-foreground space-y-2 mb-3",
								children: [/* @__PURE__ */ jsx("li", { children: "udzielenia odpowiedzi i prowadzenia komunikacji;" }), /* @__PURE__ */ jsx("li", { children: "przygotowania oferty lub nawiązania i realizacji współpracy (jeśli do niej dojdzie)." })]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed mb-3",
								children: "Podstawą prawną jest w zależności od sytuacji art. 6 ust. 1 lit. f RODO (kontakt, odpowiedź na zapytanie) oraz - w przypadku zawarcia lub wykonania umowy - art. 6 ust. 1 lit. b RODO. Gdy przepisy prawa będą tego wymagały, może mieć zastosowanie art. 6 ust. 1 lit. c RODO."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed",
								children: "Nie prowadzimy wobec Ciebie zautomatyzowanego podejmowania decyzji ani profilowania w rozumieniu art. 22 RODO wyłącznie na podstawie danych zbieranych automatycznie w Serwisie."
							})
						] }),
						/* @__PURE__ */ jsxs("section", { children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold mb-2",
								children: "6. Odbiorcy danych i przekazywanie poza EOG"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed mb-3",
								children: "Dane mogą być powierzane podmiotom przetwarzającym je na nasze polecenie (np. hosting, utrzymanie infrastruktury IT, obsługa poczty), wyłącznie na podstawie umowy powierzenia przetwarzania danych i w zakresie niezbędnym do świadczenia usług. Dane z Matomo przetwarzane są w środowisku przez nas zarządzanym."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed",
								children: "Korzystanie z Calendly może wiązać się z przekazaniem danych do państwa trzeciego (np. USA). Taki podmiot stosuje mechanizmy zgodności przewidziane przez RODO (np. decyzje stosowności Komisji Europejskiej lub standardowe klauzule umowne). Szczegóły znajdują się w dokumentacji Calendly."
							})
						] }),
						/* @__PURE__ */ jsxs("section", { children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold mb-2",
								children: "7. Okres przechowywania danych"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed mb-3",
								children: "Dane z korespondencji i zapytań przechowujemy przez czas niezbędny do udzielenia odpowiedzi i ewentualnego prowadzenia dalszych rozmów, a następnie przez okres wymagany przepisami prawa lub - w zakresie dochodzenia lub obrony roszczeń - przez czas wynikający z prawnie uzasadnionego interesu Administratora, zwykle nie dłużej niż do upływu terminów przedawnienia roszczeń cywilnych, o ile dłuższy okres nie wynika z przepisów szczególnych."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed",
								children: "Dane statystyczne w Matomo są przechowywane przez okres wynikający z konfiguracji narzędzia. Zapisy w pamięci lokalnej przeglądarki pozostają do momentu ich usunięcia przez Ciebie."
							})
						] }),
						/* @__PURE__ */ jsxs("section", { children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold mb-2",
								children: "8. Prawa osób, których dane dotyczą"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed mb-3",
								children: "Przysługuje Ci prawo do: dostępu do danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie, a także prawo do przenoszenia danych - w zakresie przewidzianym przez RODO."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-muted-foreground leading-relaxed mb-3",
								children: "W zakresie, w jakim przetwarzanie odbywa się na podstawie zgody, możesz ją wycofać w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania przed jej cofnięciem."
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-muted-foreground leading-relaxed",
								children: [
									"Przysługuje Ci ponadto prawo wniesienia skargi do organu nadzorczego - w Polsce jest nim Prezes Urzędu Ochrony Danych Osobowych (",
									/* @__PURE__ */ jsx("a", {
										href: "https://uodo.gov.pl",
										className: "text-primary hover:text-primary-glow transition-colors",
										rel: "noopener noreferrer",
										children: "uodo.gov.pl"
									}),
									")."
								]
							})
						] }),
						/* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-semibold mb-2",
							children: "9. Zmiany polityki prywatności"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground leading-relaxed",
							children: "Administrator może aktualizować niniejszą politykę w razie zmian w Serwisie, wykorzystywanych technologiach lub obowiązujących przepisach. Aktualna treść jest zawsze dostępna pod adresem Serwisu wskazanym w stopce. O istotnych zmianach możemy poinformować dodatkowo, jeśli wymaga tego prawo."
						})] })
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-xs text-muted-foreground mt-10",
					children: "Ostatnia aktualizacja: 29 marca 2026 r."
				})
			]
		})
	});
};
//#endregion
//#region src/components/ui/accordion.tsx
var Accordion = AccordionPrimitive.Root;
var AccordionItem = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, {
	className: "flex",
	children: /* @__PURE__ */ jsxs(AccordionPrimitive.Trigger, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Content, {
	ref,
	className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ jsx("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
//#endregion
//#region src/pages/FAQ.tsx
var faqItems = [
	{
		question: "Ile kosztuje wdrożenie AI?",
		answer: "Koszt zależy od zakresu i złożoności projektu. Zaczynamy od bezpłatnej konsultacji, po której przedstawiamy konkretną wycenę dopasowaną do Twoich potrzeb. Rozliczamy się projektowo lub w modelu abonamentowym - zależnie od Twoich preferencji."
	},
	{
		question: "Jak szybko zobaczę pierwsze efekty?",
		answer: "Pierwsze efekty widać już na etapie pilotażu, czyli po 3-6 tygodniach od startu. Pełne wdrożenie trwa zwykle 8-14 tygodni. To znacznie szybciej niż tradycyjne projekty IT, bo działamy zwinnie i zaczynamy od konkretnego problemu, a nie od wielomiesięcznej analizy."
	},
	{
		question: "Czy muszę wymieniać swoje obecne systemy (ERP, CRM)?",
		answer: "Nie. Nasze rozwiązania AI integrują się z Twoją istniejącą infrastrukturą. Pracujemy z systemami takimi jak SAP, Comarch, Subiekt, Microsoft Dynamics, a także z rozwiązaniami dedykowanymi i arkuszami Excel. Celem jest uzupełnienie tego, co już masz a nie rewolucja w IT."
	},
	{
		question: "Co z bezpieczeństwem moich danych?",
		answer: "Bezpieczeństwo to nasz priorytet. Oferujemy wdrożenia on-premise, gdzie dane nie opuszczają Twojej infrastruktury. Wykorzystujemy lokalne modele AI, które działają na Twoich serwerach. Wszystkie rozwiązania są zgodne z RODO i gotowe na audyty. Ty zachowujesz pełną kontrolę nad danymi."
	},
	{
		question: "Czy potrzebuję własnego działu IT?",
		answer: "Nie jest to konieczne. Zajmujemy się całością wdrożenia - od analizy po utrzymanie. Jeśli masz dział IT, chętnie z nim współpracujemy. Jeśli nie masz - zapewniamy pełne wsparcie techniczne. Po wdrożeniu oferujemy SLA i bieżący monitoring, więc nie musisz martwić się o stronę techniczną."
	},
	{
		question: "Co jeśli wdrożenie nie przyniesie oczekiwanych efektów?",
		answer: "Dlatego zaczynamy od pilotażu. To działający prototyp na Twoich danych, który pokazuje realne efekty przed pełnym wdrożeniem. Jeśli pilotaż nie potwierdzi wartości biznesowej - nie idziemy dalej. Minimalizujesz ryzyko, bo płacisz za pełne wdrożenie dopiero wtedy, gdy widzisz, że rozwiązanie działa."
	},
	{
		question: "Czy AI sprawdzi się w mojej firmie?",
		answer: "AI najlepiej sprawdza się tam, gdzie są powtarzalne procesy, duże ilości danych lub dokumentów i potrzeba szybszego podejmowania decyzji. Jeśli Twój zespół spędza godziny na przepisywaniu danych, analizie Exceli czy ręcznym przetwarzaniu dokumentów - jest duża szansa, że AI znacząco usprawni te procesy. Najlepiej porozmawiajmy - podczas bezpłatnej konsultacji ocenimy potencjał i dopasowanie."
	}
];
var FAQ = () => {
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-background py-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto max-w-3xl",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-3xl md:text-4xl font-bold mb-4 text-balance",
					children: "Często zadawane pytania"
				}),
				/* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-gradient-primary mb-6" }),
				/* @__PURE__ */ jsx("p", {
					className: "text-muted-foreground text-lg leading-relaxed mb-10 text-pretty",
					children: "Odpowiedzi na pytania, które najczęściej słyszymy od firm rozważających wdrożenie AI"
				}),
				/* @__PURE__ */ jsx(Accordion, {
					type: "single",
					collapsible: true,
					className: "w-full",
					children: faqItems.map((item, index) => /* @__PURE__ */ jsxs(AccordionItem, {
						value: `item-${index}`,
						children: [/* @__PURE__ */ jsx(AccordionTrigger, {
							className: "text-left text-base md:text-lg px-2 font-semibold hover:no-underline",
							children: item.question
						}), /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground px-2 leading-relaxed text-base md:text-[1.02rem] pr-6",
							children: item.answer
						}) })]
					}, item.question))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-14 rounded-2xl border border-primary/20 bg-card/70 backdrop-blur-md shadow-elegant p-8 md:p-10 text-center",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "text-2xl md:text-3xl font-bold mb-3 text-foreground text-balance",
							children: "Masz pytania, na które nie ma odpowiedzi powyżej?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-muted-foreground text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto text-balance",
							children: "Umów bezpłatną konsultację - omówimy Twój przypadek bez zobowiązań."
						}),
						/* @__PURE__ */ jsx(ConsultationModal, { trigger: /* @__PURE__ */ jsx(Button, {
							variant: "hero",
							size: "xl",
							children: "Zamów konsultację"
						}) })
					]
				})
			]
		})
	});
};
//#endregion
//#region src/components/ui/switch.tsx
var Switch = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitives.Root, {
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, { className: cn("pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = SwitchPrimitives.Root.displayName;
//#endregion
//#region src/components/ThemeToggle.tsx
var ThemeToggle = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const mounted = resolvedTheme !== void 0;
	const isDark = resolvedTheme === "dark";
	return /* @__PURE__ */ jsxs("div", {
		className: cn("flex items-center gap-2 px-3 py-2", mounted ? "opacity-100" : "opacity-90"),
		children: [
			/* @__PURE__ */ jsx(Sun, {
				className: cn("h-5 w-5 transition-opacity text-primary", mounted && !isDark ? "opacity-100" : "opacity-50"),
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsx(Switch, {
				"aria-label": "Motyw",
				className: "data-[state=unchecked]:bg-primary/20 data-[state=unchecked]:border-primary/20 data-[state=checked]:border-primary/40",
				checked: mounted ? isDark : false,
				onCheckedChange: (checked) => setTheme(checked ? "dark" : "light")
			}),
			/* @__PURE__ */ jsx(Moon, {
				className: cn("h-5 w-5 transition-opacity text-foreground", mounted && isDark ? "opacity-100" : "opacity-50"),
				"aria-hidden": "true"
			})
		]
	});
};
//#endregion
//#region src/components/ui/sheet.tsx
var Sheet = DialogPrimitive.Root;
var SheetTrigger = DialogPrimitive.Trigger;
var SheetClose = DialogPrimitive.Close;
var SheetPortal = DialogPrimitive.Portal;
var SheetOverlay = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = React$1.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [/* @__PURE__ */ jsx(SheetOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = DialogPrimitive.Content.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogPrimitive.Title.displayName;
var SheetDescription = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/components/ui/dropdown-menu.tsx
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
DropdownMenuPrimitive.Group;
DropdownMenuPrimitive.Portal;
DropdownMenuPrimitive.Sub;
DropdownMenuPrimitive.RadioGroup;
var DropdownMenuSubTrigger = React$1.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.SubTrigger, {
	ref,
	className: cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto h-4 w-4" })]
}));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.SubContent, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
	...props
}));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React$1.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, {
	ref,
	sideOffset,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
	...props
}) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React$1.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, {
	ref,
	className: cn("relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React$1.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.CheckboxItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenuPrimitive.RadioItem, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React$1.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Label, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Separator, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ jsx("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
//#endregion
//#region src/hooks/home-hash-scroll-suppress.ts
/**
* Gdy hash na `/` zmienia się przez scroll-spy (`navigate`), efekt w `useScrollToHashOnHome`
* nie powinien wywoływać `scrollIntoView` - ustaw przed `navigate`, efekt ją zużyje i wyzeruje.
*/
var suppressNextHomeHashScrollEffect = false;
function suppressNextHomeHashScrollSync() {
	suppressNextHomeHashScrollEffect = true;
}
/** Zwraca i zeruje flagę (wywołaj na początku efektu scroll-to-hash). */
function consumeHomeHashScrollSuppress() {
	if (!suppressNextHomeHashScrollEffect) return false;
	suppressNextHomeHashScrollEffect = false;
	return true;
}
//#endregion
//#region src/hooks/use-active-nav-section.ts
/** Tylko sekcje z menu - kolejność jak na stronie głównej (scroll-spy + hash w URL) */
var SECTION_IDS = [
	"dla-kogo",
	"oferta",
	"jak-dzialamy",
	"technologie",
	"case-study",
	"zespol",
	"kontakt"
];
/** Linia „odczytu” w viewport (poniżej nagłówka): która sekcja ją przecina jest aktywna */
var PROBE_Y_RATIO = .32;
function decodeHashFragment(hash) {
	const raw = hash.replace(/^#/, "");
	if (!raw) return "";
	try {
		return decodeURIComponent(raw);
	} catch {
		return raw;
	}
}
function resolveActiveSectionId(probeY) {
	const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter((el) => el !== null);
	let current = null;
	for (const el of sections) {
		const rect = el.getBoundingClientRect();
		if (rect.top <= probeY && rect.bottom >= probeY) {
			current = el.id;
			break;
		}
	}
	if (current === null && sections.length > 0) {
		for (let i = sections.length - 1; i >= 0; i--) if (sections[i].getBoundingClientRect().top < probeY) {
			current = sections[i].id;
			break;
		}
	}
	return current;
}
/**
* Id sekcji widocznej na stronie głównej (scroll-spy). Na innych trasach zwraca null.
*
* Przy przewijaniu na `/` ustawia hash w URL (`replace`). Przed `navigate` ustawiana jest flaga,
* żeby `useScrollToHashOnHome` nie wywołał `scrollIntoView` (tylko klik w menu / hash z linku przewija).
*/
function useActiveNavSection() {
	const location = useLocation();
	const navigate = useNavigate();
	const [activeId, setActiveId] = useState(null);
	useEffect(() => {
		if (location.pathname !== "/" || typeof document === "undefined") return;
		const probeY = () => window.innerHeight * PROBE_Y_RATIO;
		const updateHighlight = () => {
			const current = resolveActiveSectionId(probeY());
			setActiveId(current);
			return current;
		};
		const syncHashIfNeeded = (current) => {
			const inUrl = decodeHashFragment(window.location.hash);
			if (current) {
				if (inUrl === current) return;
				suppressNextHomeHashScrollSync();
				navigate({
					pathname: "/",
					hash: current
				}, { replace: true });
				return;
			}
			if (inUrl) {
				suppressNextHomeHashScrollSync();
				navigate({
					pathname: "/",
					hash: ""
				}, { replace: true });
			}
		};
		updateHighlight();
		const syncOnce = window.setTimeout(() => updateHighlight(), 0);
		const onScrollOrResize = () => {
			syncHashIfNeeded(updateHighlight());
		};
		window.addEventListener("scroll", onScrollOrResize, { passive: true });
		window.addEventListener("resize", onScrollOrResize, { passive: true });
		let raf1 = 0;
		let raf2 = 0;
		if (!window.location.hash) raf1 = requestAnimationFrame(() => {
			raf2 = requestAnimationFrame(() => {
				syncHashIfNeeded(updateHighlight());
			});
		});
		return () => {
			clearTimeout(syncOnce);
			cancelAnimationFrame(raf1);
			cancelAnimationFrame(raf2);
			window.removeEventListener("scroll", onScrollOrResize);
			window.removeEventListener("resize", onScrollOrResize);
		};
	}, [location.pathname, navigate]);
	return location.pathname === "/" ? activeId : null;
}
//#endregion
//#region src/hooks/use-scroll-to-hash.ts
function useScrollToHashOnHome() {
	const location = useLocation();
	useEffect(() => {
		const skipScrollFromHashEffect = consumeHomeHashScrollSuppress();
		if (location.pathname !== "/") return;
		const getId = () => {
			const raw = (location.hash || window.location.hash || "").replace(/^#/, "");
			return raw ? decodeURIComponent(raw) : "";
		};
		const scrollToEl = () => {
			const id = getId();
			if (!id) return true;
			const el = document.getElementById(id);
			if (!el) return false;
			const probeY = window.innerHeight * .32;
			const rect = el.getBoundingClientRect();
			if (rect.top <= probeY && rect.bottom >= probeY) return true;
			el.scrollIntoView({
				behavior: "auto",
				block: "start"
			});
			return true;
		};
		const timeouts = [];
		let cancelled = false;
		const tryLater = (delayMs, attempt) => {
			if (attempt > 15 || cancelled) return;
			timeouts.push(window.setTimeout(() => {
				if (cancelled) return;
				if (scrollToEl()) return;
				tryLater(40, attempt + 1);
			}, delayMs));
		};
		if (!skipScrollFromHashEffect) {
			if (!scrollToEl()) tryLater(0, 0);
		}
		const onHashChange = () => {
			scrollToEl();
		};
		window.addEventListener("hashchange", onHashChange);
		return () => {
			cancelled = true;
			for (const t of timeouts) clearTimeout(t);
			window.removeEventListener("hashchange", onHashChange);
		};
	}, [
		location.pathname,
		location.hash,
		location.key
	]);
}
//#endregion
//#region src/components/FooterSection.tsx
function FooterSection() {
	return /* @__PURE__ */ jsx("footer", {
		className: "py-16 border-t border-border bg-background/50",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col md:flex-row md:items-center md:justify-between gap-3",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-sm text-muted-foreground",
						children: "© 2020-2026 Aplint Sp. z o.o. Wszelkie prawa zastrzeżone."
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("img", {
						src: "/images/aplint-logo.svg",
						alt: "APLiNT",
						className: "h-16 dark:hidden"
					}), /* @__PURE__ */ jsx("img", {
						src: "/images/aplint-logo-inv.svg",
						alt: "APLiNT",
						className: "hidden h-16 dark:block"
					})] }),
					/* @__PURE__ */ jsx("a", {
						href: "/polityka-prywatnosci",
						className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
						children: "Polityka prywatności"
					})
				]
			})
		})
	});
}
//#endregion
//#region src/App.tsx
var queryClient = new QueryClient();
var jakDzialamySubmenuItems = [
	{
		href: "/#jak-dzialamy",
		sectionId: "jak-dzialamy",
		label: "Jak działamy"
	},
	{
		href: "/#technologie",
		sectionId: "technologie",
		label: "Technologie"
	},
	{
		href: "/#case-study",
		sectionId: "case-study",
		label: "Case study"
	},
	{
		href: "/faq",
		sectionId: null,
		label: "FAQ"
	}
];
var jakDzialamyScrollSectionIds = new Set([
	"jak-dzialamy",
	"technologie",
	"case-study"
]);
var navLinks = [
	{
		href: "/#dla-kogo",
		sectionId: "dla-kogo",
		label: "Dla kogo"
	},
	{
		href: "/#oferta",
		sectionId: "oferta",
		label: "Oferta"
	},
	{
		href: "/#zespol",
		sectionId: "zespol",
		label: "Zespół"
	},
	{
		href: "/#kontakt",
		sectionId: "kontakt",
		label: "Kontakt"
	}
];
function isJakDzialamyNavActive(activeSectionId, pathname) {
	if (pathname === "/faq") return true;
	return activeSectionId !== null && jakDzialamyScrollSectionIds.has(activeSectionId);
}
function navLinkClassName(active) {
	return cn("px-3 py-2 rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/45", active ? "text-foreground bg-primary/15 font-semibold" : "text-foreground/80 hover:text-foreground hover:bg-primary/10");
}
function AppShell() {
	const location = useLocation();
	React.useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "auto"
		});
	}, [location.pathname]);
	useScrollToHashOnHome();
	const activeSectionId = useActiveNavSection();
	const jakDzialamyActive = isJakDzialamyNavActive(activeSectionId, location.pathname);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("header", {
		className: "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur shadow-sm",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto py-3 flex items-center gap-4",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex-none w-24",
					children: /* @__PURE__ */ jsxs(Link, {
						to: "/",
						className: "block transition-all duration-300 opacity-100 translate-y-0 pointer-events-auto",
						"aria-label": "Aplint - strona główna",
						children: [/* @__PURE__ */ jsx("img", {
							src: "/images/aplint-logo.svg",
							alt: "APLiNT",
							className: "h-14 w-auto dark:hidden mx-auto"
						}), /* @__PURE__ */ jsx("img", {
							src: "/images/aplint-logo-inv.svg",
							alt: "APLiNT",
							className: "hidden h-14 w-auto dark:block mx-auto"
						})]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex-1 flex items-center",
					children: [/* @__PURE__ */ jsxs(Sheet, { children: [/* @__PURE__ */ jsx(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ jsx(Button, {
							variant: "ghost",
							size: "icon",
							className: "lg:hidden",
							"aria-label": "Otwórz nawigację",
							children: /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
						})
					}), /* @__PURE__ */ jsx(SheetContent, {
						side: "left",
						className: "p-0 w-[85%] sm:max-w-sm",
						"data-site-nav-sheet": "",
						onCloseAutoFocus: (e) => e.preventDefault(),
						children: /* @__PURE__ */ jsxs("nav", {
							className: "flex flex-col gap-2.5 p-4",
							"aria-label": "Główna nawigacja",
							children: [
								navLinks.slice(0, 2).map((l) => {
									const active = activeSectionId === l.sectionId;
									return /* @__PURE__ */ jsx(SheetClose, {
										asChild: true,
										children: /* @__PURE__ */ jsx(Link, {
											to: l.href,
											className: navLinkClassName(active),
											"aria-current": active ? "location" : void 0,
											children: l.label
										})
									}, l.href);
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-1.5",
									children: [/* @__PURE__ */ jsx("span", {
										className: cn("px-3 py-2 rounded-md text-sm font-semibold text-foreground/70"),
										children: "Jak działamy"
									}), /* @__PURE__ */ jsx("div", {
										className: "flex flex-col gap-1 pl-2 border-l-2 border-primary/25 ml-3",
										children: jakDzialamySubmenuItems.map((item) => {
											const active = item.sectionId !== null ? activeSectionId === item.sectionId : location.pathname === "/faq";
											return /* @__PURE__ */ jsx(SheetClose, {
												asChild: true,
												children: /* @__PURE__ */ jsx(Link, {
													to: item.href,
													className: cn(navLinkClassName(active), "text-sm"),
													"aria-current": active ? "location" : void 0,
													children: item.label
												})
											}, item.href);
										})
									})]
								}),
								navLinks.slice(2).map((l) => {
									const active = activeSectionId === l.sectionId;
									return /* @__PURE__ */ jsx(SheetClose, {
										asChild: true,
										children: /* @__PURE__ */ jsx(Link, {
											to: l.href,
											className: navLinkClassName(active),
											"aria-current": active ? "location" : void 0,
											children: l.label
										})
									}, l.href);
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-4 pt-4 border-t border-border flex flex-col gap-3",
									children: [
										/* @__PURE__ */ jsx(ThemeToggle, {}),
										/* @__PURE__ */ jsx("a", {
											href: "tel:+48725116342",
											className: "px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground",
											children: "Zadzwoń: +48 725 116 342"
										}),
										/* @__PURE__ */ jsx(ConsultationModal, { trigger: /* @__PURE__ */ jsx(Button, {
											variant: "hero",
											className: "w-full",
											children: "Bezpłatna konsultacja"
										}) })
									]
								})
							]
						})
					})] }), /* @__PURE__ */ jsxs("nav", {
						className: "hidden lg:flex flex-1 flex-wrap items-center justify-start gap-1 text-base font-medium",
						"aria-label": "Główna nawigacja",
						children: [
							navLinks.slice(0, 2).map((l) => {
								const active = activeSectionId === l.sectionId;
								return /* @__PURE__ */ jsx(Link, {
									to: l.href,
									className: navLinkClassName(active),
									"aria-current": active ? "location" : void 0,
									children: l.label
								}, l.href);
							}),
							/* @__PURE__ */ jsxs(DropdownMenu, {
								modal: false,
								children: [/* @__PURE__ */ jsxs(DropdownMenuTrigger, {
									className: cn("inline-flex items-center gap-0.5", navLinkClassName(jakDzialamyActive), "data-[state=open]:bg-primary/15"),
									"aria-current": jakDzialamyActive ? "location" : void 0,
									children: ["Jak działamy", /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 opacity-70" })]
								}), /* @__PURE__ */ jsx(DropdownMenuContent, {
									align: "start",
									className: "flex min-w-[12rem] flex-col gap-0.5 p-1",
									onCloseAutoFocus: (e) => e.preventDefault(),
									children: jakDzialamySubmenuItems.map((item) => {
										const active = item.sectionId !== null ? activeSectionId === item.sectionId : location.pathname === "/faq";
										return /* @__PURE__ */ jsx(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ jsx(Link, {
												to: item.href,
												className: cn(active && "bg-primary/10 font-semibold"),
												"aria-current": active ? "location" : void 0,
												children: item.label
											})
										}, item.href);
									})
								})]
							}),
							navLinks.slice(2).map((l) => {
								const active = activeSectionId === l.sectionId;
								return /* @__PURE__ */ jsx(Link, {
									to: l.href,
									className: navLinkClassName(active),
									"aria-current": active ? "location" : void 0,
									children: l.label
								}, l.href);
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex-none flex items-center shrink-0",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-end gap-1.5",
						children: [/* @__PURE__ */ jsx("a", {
							href: "tel:+48725116342",
							className: "hidden md:inline text-sm font-medium text-foreground/80 hover:text-foreground whitespace-nowrap transition-colors text-right",
							children: "Zadzwoń: +48 725 116 342"
						}), /* @__PURE__ */ jsx(ConsultationModal, { trigger: /* @__PURE__ */ jsxs(Button, {
							variant: "hero",
							className: "font-semibold text-sm px-3 sm:px-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "sm:hidden",
								children: "Konsultacja"
							}), /* @__PURE__ */ jsx("span", {
								className: "hidden sm:inline",
								children: "Bezpłatna konsultacja"
							})]
						}) })]
					}), /* @__PURE__ */ jsx("div", {
						className: "hidden lg:block",
						children: /* @__PURE__ */ jsx(ThemeToggle, {})
					})]
				})
			]
		})
	}), /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
			/* @__PURE__ */ jsx(Toaster$2, {}),
			/* @__PURE__ */ jsx(Toaster$1, {}),
			/* @__PURE__ */ jsx("main", {
				id: "main-content",
				tabIndex: -1,
				children: /* @__PURE__ */ jsxs(Routes, { children: [
					/* @__PURE__ */ jsx(Route, {
						path: "/",
						element: /* @__PURE__ */ jsx(Index, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/polityka-prywatnosci",
						element: /* @__PURE__ */ jsx(PrivacyPolicy, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "/faq",
						element: /* @__PURE__ */ jsx(FAQ, {})
					}),
					/* @__PURE__ */ jsx(Route, {
						path: "*",
						element: /* @__PURE__ */ jsx(NotFound, {})
					})
				] })
			}),
			/* @__PURE__ */ jsx(FooterSection, {})
		] })
	})] });
}
var App = ({ url }) => {
	React.useEffect(() => {
		const w = window;
		w._mtm = w._mtm || [];
		w._mtm.push({
			"mtm.startTime": (/* @__PURE__ */ new Date()).getTime(),
			"event": "mtm.Start"
		});
		const d = document, g = d.createElement("script"), s = d.getElementsByTagName("script")[0];
		g.async = true;
		g.src = "https://matomo.aplint.pl/js/container_bHu0xCzw.js";
		s.parentNode.insertBefore(g, s);
	}, []);
	React.useEffect(() => {
		return bindMatomoContactLinkTracking();
	}, []);
	return /* @__PURE__ */ jsx(ThemeProvider, {
		attribute: "class",
		defaultTheme: "system",
		enableSystem: true,
		storageKey: "theme",
		nonce: "",
		children: url !== void 0 ? /* @__PURE__ */ jsx(StaticRouter, {
			location: url,
			children: /* @__PURE__ */ jsx(AppShell, {})
		}) : /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsx(AppShell, {}) })
	});
};
//#endregion
//#region src/entry-server.tsx
/**
* Renders the application to HTML for the given URL (pre-render / SSG).
* Used during build to generate static HTML for bots and LLM.
*/
function render(url) {
	return renderToString(/* @__PURE__ */ jsx(App, { url }));
}
//#endregion
export { render };

/**
 * Gdy hash na `/` zmienia się przez scroll-spy (`navigate`), efekt w `useScrollToHashOnHome`
 * nie powinien wywoływać `scrollIntoView` - ustaw przed `navigate`, efekt ją zużyje i wyzeruje.
 */
let suppressNextHomeHashScrollEffect = false;

export function suppressNextHomeHashScrollSync(): void {
  suppressNextHomeHashScrollEffect = true;
}

/** Zwraca i zeruje flagę (wywołaj na początku efektu scroll-to-hash). */
export function consumeHomeHashScrollSuppress(): boolean {
  if (!suppressNextHomeHashScrollEffect) return false;
  suppressNextHomeHashScrollEffect = false;
  return true;
}

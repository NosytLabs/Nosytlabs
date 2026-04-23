declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export function track(event: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params ?? {});
  } catch {
    // analytics is best-effort; never break UX
  }
}

export {};

// Browser-side Meta Pixel helpers. Pixel base code is injected once in __root head.
export const META_PIXEL_ID = "1177512728428986";
type Fbq = (...args: unknown[]) => void;
const fbq = (): Fbq | undefined => (typeof window === "undefined" ? undefined : (window as unknown as { fbq?: Fbq }).fbq);

export const newEventId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export function track(event: string, params: Record<string, unknown> = {}, eventId = newEventId()) {
  fbq()?.("track", event, params, { eventID: eventId });
  return eventId;
}

const ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "src", "sck"];

// Store attribution params from the landing URL so they survive navigation.
export function captureAttribution() {
  const q = new URLSearchParams(window.location.search);
  const saved: Record<string, string> = JSON.parse(sessionStorage.getItem("attr") || "{}");
  ATTR_KEYS.forEach((k) => { const v = q.get(k); if (v) saved[k] = v; });
  sessionStorage.setItem("attr", JSON.stringify(saved));
}

// Append saved attribution params to a checkout URL.
export function withAttribution(url: string) {
  if (typeof window === "undefined") return url;
  const u = new URL(url);
  const saved: Record<string, string> = JSON.parse(sessionStorage.getItem("attr") || "{}");
  Object.entries(saved).forEach(([k, v]) => { if (!u.searchParams.has(k)) u.searchParams.set(k, v); });
  return u.toString();
}

// Fire InitiateCheckout then navigate (short delay lets the pixel request leave).
export function goToCheckout(url: string, value: number, name: string) {
  track("InitiateCheckout", { value, currency: "BRL", content_name: name, content_type: "product", num_items: 1 });
  setTimeout(() => { window.location.href = withAttribution(url); }, 250);
}

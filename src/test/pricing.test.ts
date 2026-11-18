import { describe, it, expect } from "vitest";
import { PRICES, upsellTotal } from "@/lib/pricing";
describe("pricing", () => {
  it("basic plan is R$10", () => expect(PRICES.basic).toBe(10));
  it("pop-up adds R$10 for R$20 total", () => expect(upsellTotal()).toBe(20));
  it("premium is R$37,90", () => expect(PRICES.premium).toBe(37.9));
});

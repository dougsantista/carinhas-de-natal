export const PRICES = {
  basic: 10,
  upsellAddon: 10,
  premium: 37.9,
};
export const upsellTotal = () => PRICES.basic + PRICES.upsellAddon;
export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

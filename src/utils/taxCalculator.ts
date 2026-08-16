import type { IProduct } from "../models/Product";

export const TAX_RATES: Record<string, number> = {
  groceries: 3.0,
  medicine: 0.0,
  clothing: 4.0,
  default: 4.75,
}

export function roundToCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function calculateTax(price: number, taxRate: number): number {
  if (price <= 0 || taxRate <= 0) return 0;
  const taxAmount = price * (taxRate / 100);
  return roundToCurrency(taxAmount);
}

export function getTaxRate(category?: string): number {
  const normalizedCategory = category?.trim().toLowerCase() ?? "";
  return TAX_RATES[normalizedCategory] ?? TAX_RATES.default;
}

export interface ITaxBreakdown {
  subtotal: number;
  rate: number;
  tax: number;
  total: number;
}

export function calculateProductTax(product: IProduct): ITaxBreakdown {
  const rate = getTaxRate(product.category);
  const tax = calculateTax(product.price, rate);

  return {
    subtotal: roundToCurrency(product.price),
    rate,
    tax,
    total: roundToCurrency(product.price + tax),
  };
}
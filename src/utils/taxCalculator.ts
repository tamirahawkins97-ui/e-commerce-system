import { Product } from "../models/Product";

export function calculateTax(price: number, taxRate: number): number {
  const taxAmount = price * (taxRate / 100);
  return Number(taxAmount.toFixed(2));
};

const taxRate = Product.category === 'groceries' ? 3 : 4.75;
export const STANDARD_TAX_RATE = 4.75;
export const GROCERY_TAX_RATE = 3.0;

/**
 * Calculates the dollar amount of tax applied to a product.
 * Groceries are taxed at 3%, all other categories at 4.75%.
 * Example: $100 price with non-grocery category returns 4.75.
 */
export function calculateTax(price: number, category: string): number {
  if (price <= 0) return 0;

  const isGrocery = category.trim().toLowerCase() === 'groceries';
  const taxRate = isGrocery ? GROCERY_TAX_RATE : STANDARD_TAX_RATE;

  const taxAmount = price * (taxRate / 100);
  return Number(taxAmount.toFixed(2));
}
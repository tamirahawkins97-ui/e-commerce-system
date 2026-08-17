/**
 * Calculates the dollar amount a product is discounted by.
 * Example: $100 price with 10% discount returns 10.
 */
export function calculateDiscount(price: number, discountPercentage: number): number {
  if (price <= 0 || discountPercentage <= 0) return 0;
  
  if (discountPercentage > 100) {
    throw new Error('Discount percentage cannot exceed 100%');
  }

  const discountAmount = price * (discountPercentage / 100);
  return Number(discountAmount.toFixed(2));
}

/**
 * Calculates the final price after applying the discount amount.
 * Example: $100 price with 10% discount returns 90.
 */
export function calculateDiscountedPrice(price: number, discountPercentage: number): number {
  const discountAmount = calculateDiscount(price, discountPercentage);
  return Number((price - discountAmount).toFixed(2));
}
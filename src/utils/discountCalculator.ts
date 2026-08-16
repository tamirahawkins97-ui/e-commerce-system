import { roundToCurrency } from './taxCalculator';

export function calculateDiscountAmount(price: number, discountPercentage: number): number {
  if (price < 0) {
    throw new Error('Price must be greater than or equal to 0');
  }

  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100');
  }

  return roundToCurrency(price * (discountPercentage / 100));
}

export function calculateDiscountedPrice(price: number, discountPercentage: number): number {
  const discountAmount = calculateDiscountAmount(price, discountPercentage);
  return roundToCurrency(price - discountAmount);
}
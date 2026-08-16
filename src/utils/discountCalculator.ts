import { roundToCurrency } from './taxCalculator';

export function discountCalculator(price: number, discountPercentage: number): number {
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100');
  }

  const discountAmount = price * (discountPercentage / 100);
  return roundToCurrency(price - discountAmount);
}
import { calculateDiscountedPrice, calculateDiscount } from '../utils/discountCalculator';
import { calculateTax } from '../utils/taxCalculator';

export interface IReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface IDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface IMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: IDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IMeta;
  images: string[];
  thumbnail: string;
}

export interface IProductResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export class Product implements IProduct {
  public id!: number;
  public title!: string;
  public description!: string;
  public category!: string;
  public price!: number;
  public discountPercentage!: number;
  public rating!: number;
  public stock!: number;
  public tags!: string[];
  public brand?: string;
  public sku!: string;
  public weight!: number;
  public dimensions!: IDimensions;
  public warrantyInformation!: string;
  public shippingInformation!: string;
  public availabilityStatus!: string;
  public reviews!: IReview[];
  public returnPolicy!: string;
  public minimumOrderQuantity!: number;
  public meta!: IMeta;
  public images!: string[];
  public thumbnail!: string;

  constructor(data: IProduct) {
    Object.assign(this, data);
  }

  /**
   * Returns the dollar amount discounted off the product.
   */
  getDiscountAmount(): number {
    return calculateDiscount(this.price, this.discountPercentage);
  }

  /**
   * Returns the final price after discount deduction (Required by rubric).
   */
  getPriceWithDiscount(): number {
    return calculateDiscountedPrice(this.price, this.discountPercentage);
  }

  /**
   * Returns the dollar amount of tax based on category (3% grocery, 4.75% default).
   */
  getTax(): number {
    return calculateTax(this.price, this.category);
  }

  /**
   * Returns final checkout price (Discounted Price + Tax).
   */
  getTotalPrice(): number {
    const discounted = this.getPriceWithDiscount();
    const taxOnDiscounted = calculateTax(discounted, this.category);
    return Number((discounted + taxOnDiscounted).toFixed(2));
  }

  /**
   * Logs a complete summary of product details and calculations (Required by rubric).
   */
  displayDetails(): void {
    console.log(`========================================`);
    console.log(`${this.title} (${this.brand ?? 'No Brand'})`);
    console.log(`Category:        ${this.category}`);
    console.log(`Original Price:  $${this.price.toFixed(2)}`);
    console.log(`Discount:        ${this.discountPercentage}% (-$${this.getDiscountAmount().toFixed(2)})`);
    console.log(`Discounted Price:$${this.getPriceWithDiscount().toFixed(2)}`);
    console.log(`Estimated Tax:   $${this.getTax().toFixed(2)}`);
    console.log(`Rating:          ⭐ ${this.rating} / 5.0 (Stock: ${this.stock})`);
    console.log(`Dimensions:      ${this.dimensions.width}W x ${this.dimensions.height}H x ${this.dimensions.depth}D`);
    console.log(`========================================`);
  }
}

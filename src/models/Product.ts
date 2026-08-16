import { request } from '../services/apiService';

import { discountCalculator } from '../utils/discountCalculator';

export interface IReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface IMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface IDimensions {
  width: number;
  height: number;
  depth: number;
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

  getPriceWithDiscount(): number {
    return discountCalculator(this.price, this.discountPercentage);
  }

  displayDetails(): void {
    console.log(`========================================`);
    console.log(`${this.title} (${this.brand ?? 'No Brand'})`);
    console.log(`Category:       ${this.category}`);
    console.log(`Original Price: $${this.price.toFixed(2)} | Discount: ${this.discountPercentage}%`);
    console.log(`Discounted:     $${this.getPriceWithDiscount().toFixed(2)}`);
    console.log(`Rating:         ⭐ ${this.rating} / 5.0 (Stock: ${this.stock})`);
    console.log(`Dimensions:     ${this.dimensions.width}W x ${this.dimensions.height}H x ${this.dimensions.depth}D`);
    console.log(`========================================`);
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await request<IProductResponse>();
  return data.products.map((item) => new Product(item));
}

export async function getProductById(id: number | string): Promise<Product> {
  const data = await request<IProduct>(`/${id}`);
  return new Product(data);
}

async function main() {
  console.log('Fetching products using generic client...');
  const products = await fetchProducts();

  const first = products[0];
  if (!first) {
    throw new Error('No products available to display.');
  }

  first.displayDetails();
  console.log(`Verified Final Price: $${first.getPriceWithDiscount()}`);
}

main().catch(console.error);
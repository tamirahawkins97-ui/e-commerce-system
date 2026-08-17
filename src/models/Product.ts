import { request } from '../services/apiService';

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
    return this.price * (1 - this.discountPercentage / 100);
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await request<IProductResponse>();
  return data.products.map((item) => new Product(item));
}
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

// 1. Fetch function (Single network call)
export async function fetchProducts(): Promise<IProduct[]> {
  const response = await fetch('https://dummyjson.com/products');

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data: IProductResponse = await response.json();
  return data.products;
}

// 2. Formatted detailed view
function displayProductList(products: IProduct[]): void {
  console.log('--- DETAILED PRODUCT LIST ---');
  products.forEach((p, idx) => {
    console.log(`${idx + 1}. ${p.title} (${p.brand ?? 'No Brand'}) - $${p.price}`);
    console.log(`Dimensions: ${p.dimensions.width}W x ${p.dimensions.height}H x ${p.dimensions.depth}D`);
  });
}

// 3. Clean table view
function displayProductTable(products: IProduct[]): void {
  console.log('\n--- PRODUCT SUMMARY TABLE ---');
  console.table(
    products.map((p) => ({
      ID: p.id,
      Title: p.title,
      Brand: p.brand ?? 'N/A',
      Price: `$${p.price}`,
      Rating: p.rating,
      Stock: p.stock,
    }))
  );
}

// 4. Main runner function
async function main() {
  console.log('Fetching products...');
  const products = await fetchProducts();
  console.log(`Loaded ${products.length} products successfully.`);

  displayProductTable(products); // prints table grid
  displayProductList(products);  // prints detailed log
}

main().catch((error) => {
  console.error('Error in main runner:', error);
});
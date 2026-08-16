import './style.css'
import { fetchProducts, getProductById, type Product } from './models/Product';
import { calculateProductTax, type ITaxBreakdown } from './utils/taxCalculator';

/**
 * Formats and prints a comprehensive receipt view for a given product
 */
function renderProductReceipt(product: Product): void {
  const discountedPrice = product.getPriceWithDiscount();
  const taxBreakdown: ITaxBreakdown = calculateProductTax(product);

  console.log(`\n==================================================`);
  console.log(`📦 PRODUCT RECEIPT: ${product.title.toUpperCase()}`);
  console.log(`==================================================`);
  console.log(`Brand:              ${product.brand ?? 'Generic / No Brand'}`);
  console.log(`Category:           ${product.category}`);
  console.log(`Stock Remaining:    ${product.stock} units`);
  console.log(`Customer Rating:    ⭐ ${product.rating} / 5.0`);
  console.log(`--------------------------------------------------`);
  console.log(`Original Price:     $${product.price.toFixed(2)}`);
  console.log(`Discount Applied:   ${product.discountPercentage}% OFF`);
  console.log(`Discounted Subtotal:$${discountedPrice.toFixed(2)}`);
  console.log(`Tax (${taxBreakdown.rate}%):          +$${taxBreakdown.tax.toFixed(2)}`);
  console.log(`--------------------------------------------------`);
  console.log(`FINAL TOTAL DUE:    $${taxBreakdown.total.toFixed(2)}`);
  console.log(`==================================================\n`);
}

/**
 * Main application execution flow
 */
async function main(): Promise<void> {
  try {
    console.log('⏳ Connecting to API and fetching inventory catalog...');
    const products = await fetchProducts();

    if (!products.length) {
      console.warn('⚠️ Warning: No products returned from inventory service.');
      return;
    }

    console.log(`✅ Successfully loaded ${products.length} products.\n`);

    // 1. Display first product in catalog
    const firstProduct = products[0];
    console.log('▶ Processing catalog item:');
    renderProductReceipt(firstProduct);

    // 2. Fetch and display a specific item by ID (e.g., ID 2)
    console.log('▶ Querying direct product lookup (ID: 2)...');
    const specificProduct = await getProductById(2);
    renderProductReceipt(specificProduct);

  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Execution Failed: [${error.name}] ${error.message}`);
    } else {
      console.error('❌ An unknown error occurred during execution.');
    }
  }
}

// Kick off the application
main().catch(console.error);
import { request } from './services/apiService';
import { Product, type IProductResponse } from './models/Product';
import { formatErrorMessage } from './utils/errorHandler';

const container = document.getElementById('product-container');
const totalCount = document.getElementById('total-count');

function renderProducts(products: Product[]): void {
  if (!container) return;

  container.innerHTML = products
    .map((item) => {
      const isGrocery = item.category.trim().toLowerCase() === 'groceries';
      const taxRateLabel = isGrocery ? '3% Grocery Rate' : '4.75% Standard Rate';

      return `
        <div class="card" data-id="${item.id}">
          <div class="card-header">
            <h3>${item.title}</h3>
            <span class="category-badge ${isGrocery ? 'grocery' : 'standard'}">
              ${item.category}
            </span>
          </div>

          <!-- PRICING & DISCOUNT BREAKDOWN -->
          <div class="pricing-breakdown">
            <div class="price-row">
              <span class="label">Original Price:</span>
              <span class="original-price">$${item.price.toFixed(2)}</span>
            </div>

            <div class="price-row discount-row">
              <span class="label">Discount (${item.discountPercentage}% OFF):</span>
              <span class="discount-saved">-$${item.getDiscountAmount().toFixed(2)}</span>
            </div>

            <div class="price-row final-row">
              <span class="label">Discounted Price:</span>
              <span class="final-price">$${item.getPriceWithDiscount().toFixed(2)}</span>
            </div>

            <div class="price-row tax-row">
              <span class="label">Estimated Tax (${taxRateLabel}):</span>
              <span class="tax-amount">+$${item.getTax().toFixed(2)}</span>
            </div>
          </div>

          <p class="description">${item.description}</p>
          <p class="meta">
            Brand: <strong>${item.brand ?? 'N/A'}</strong> | 
            Rating: <strong>⭐ ${item.rating}</strong> | 
            Stock: <strong>${item.stock} in stock</strong>
          </p>
        </div>
      `;
    })
    .join('');
}

async function init(): Promise<void> {
  try {
    const data = await request<IProductResponse>();

    // Transform raw API objects into OOP Product instances
    const products: Product[] = data.products.map((raw) => new Product(raw));

    if (totalCount) {
      totalCount.textContent = String(products.length);
    }

    // Call OOP display method for console inspection
    products.forEach((p) => p.displayDetails());

    // Render formatted cards with calculations
    renderProducts(products);
  } catch (error) {
    if (container) {
      container.innerHTML = `<p class="error-state">${formatErrorMessage(error)}</p>`;
    }
    console.error('Initialization error:', error);
  }
}

document.addEventListener('DOMContentLoaded', init);
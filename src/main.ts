import { fetchProducts, type IProduct } from './models/Product';

const container = document.getElementById('product-container') as HTMLElement;
const totalCount = document.getElementById('total-count') as HTMLElement;

function renderProducts(products: IProduct[]): void {
  if (!container) return;

  container.innerHTML = products
    .map(
      (item) => `
        <div class="card" data-id="${item.id}">
          <h3 class="item-title">${item.title}</h3>
          <p style="color: var(--accent); font-weight: bold; margin: 6px 0;">
            $${item.price.toFixed(2)}
            <span style="font-size: 0.85em; color: var(--text);">
              (Rating: ⭐ ${item.rating} | Stock: ${item.stock})
            </span>
          </p>
          <p style="margin: 8px 0; line-height: 1.4;">${item.description}</p>
          <p style="font-size: 0.85em; color: var(--text);">
            Category: <strong>${item.category}</strong> |
            Brand: <strong>${item.brand || 'Generic'}</strong>
          </p>
        </div>
      `
    )
    .join('');
}

async function fetchAllProductData(): Promise<void> {
  if (!container || !totalCount) return;

  try {
    const products = await fetchProducts();
    totalCount.textContent = String(products.length);
    renderProducts(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    container.textContent = `Error loading products: ${message}`;
  }
}

document.addEventListener('DOMContentLoaded', fetchAllProductData);
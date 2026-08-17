import { fetchProducts, type IProduct } from './models/Product';

const container = document.getElementById('product-container');
const totalCount = document.getElementById('total-count');

function renderProducts(products: IProduct[]): void {
  if (!container) return;

  container.innerHTML = products
    .map(
      (item) => `
        <div class="card" data-id="${item.id}">
          <h3>${item.title}</h3>
          <p>$${item.price.toFixed(2)}</p>
          <p>${item.description}</p>
        </div>
      `
    )
    .join('');
}

async function initProducts(): Promise<void> {
  try {
    const products = await fetchProducts();

    if (totalCount) {
      totalCount.textContent = String(products.length);
    }

    renderProducts(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    if (container) {
      container.innerHTML = `<p>Error loading products: ${message}</p>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', initProducts);

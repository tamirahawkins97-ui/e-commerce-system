import { fetchProducts } from './models/Product';

console.log('Vite app initialized cleanly.');

// Run your model fetch test without touching the DOM
fetchProducts()
  .then((products) => {
    console.log(`Loaded ${products.length} products via Product model.`);
  })
  .catch(console.error);
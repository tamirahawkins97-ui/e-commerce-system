fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(console.log);

const data = { products: [] };
const productNames = data.products.map(product => product.title);
console.log(data);
console.log(productNames);



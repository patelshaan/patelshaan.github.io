// script.js
const productGrid = document.querySelector('.product-grid');

// Fetch product data from an API or database
const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is the first product',
    price: 19.99
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is the second product',
    price: 24.99
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is the third product',
    price: 14.99
  }
];

// Render the product items
products.forEach(product => {
  const productItem = document.createElement('div');
  productItem.classList.add('product-item');

  const productName = document.createElement('h3');
  productName.textContent = product.name;

  const productDescription = document.createElement('p');
  productDescription.textContent = product.description;

  const productPrice = document.createElement('p');
  productPrice.textContent = `$${product.price}`;

  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.addEventListener('click', () => {
    // Add logic to add the product to the cart
    console.log(`Added ${product.name} to the cart.`);
  });

  productItem.appendChild(productName);
  productItem.appendChild(productDescription);
  productItem.appendChild(productPrice);
  productItem.appendChild(addToCartButton);

  productGrid.appendChild(productItem);
});

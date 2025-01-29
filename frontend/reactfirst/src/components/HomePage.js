import React from 'react';
import products from '../data/products';
import ProductCard from './ProductCard';

const HomePage = ({ search }) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-grid">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default HomePage;

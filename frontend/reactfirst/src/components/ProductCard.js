import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <Link to={`/product/${product.id}`}>
        <button className="view-details-button">View Details</button>
      </Link>
    </div>
  );
};

export default ProductCard;

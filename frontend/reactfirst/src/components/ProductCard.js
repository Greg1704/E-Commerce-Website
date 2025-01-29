import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* Imagen del producto */}
      {product.picture[0]?.file?.data && (
        <img
          src={`data:${product.picture[0].file.contentType};base64,${product.picture[0].file.data}`}
          alt={product.name}
          className="product-image"
        />
      )}
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <Link to={`/product/${product.id}`}>
        <button className="view-details-button">View Details</button>
      </Link>
    </div>
  );
};

export default ProductCard;

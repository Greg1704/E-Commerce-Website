import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: ${product.price.toFixed(2)}</p>

      <div className="product-images">
        {product.picture.map((pic, index) => (
          <img
            key={index}
            src={`data:${pic.file.contentType};base64,${pic.file.data}`}
            alt={`Product ${index + 1}`}
            className="product-image"
          />
        ))}
      </div>

      <h2>Reviews</h2>
      <div className="product-reviews">
        {product.review.length > 0 ? (
          product.review.map((r, index) => (
            <div key={index} className="review">
              <h3>{r.Title}</h3>
              <p>{r.description}</p>
            </div>
          ))
        ) : (
          <p>No reviews available for this product.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

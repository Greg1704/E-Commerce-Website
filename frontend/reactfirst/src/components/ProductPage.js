import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  // Estado para la cantidad seleccionada
  const [quantity, setQuantity] = useState(1);

  // Funciones para aumentar o disminuir la cantidad
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  // Manejo del cambio directo en el input
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  // Función para agregar al carrito
  const addToCart = () => {
    // Aquí deberías implementar la lógica para agregar al carrito
    console.log(`Producto ${product.name} agregado al carrito con ${quantity} unidades.`);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: ${product.price.toFixed(2)}</p>

      {/* Contenedor para los detalles y botones */}
      <div className="product-details">
        <div className="product-info">
          {/* Imagen del producto */}
          <img src={product.picture} alt={product.name} className="product-image" />
          
          {/* Nombre y precio del producto */}
          <div className="price-total">
            <span>Precio: ${product.price}</span>
            <span>Total: ${product.price * quantity}</span>
          </div>
        </div>

        {/* Contenedor para los botones de cantidad y agregar al carrito */}
        <div className="quantity-and-add" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="quantity-control" style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={decrement}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              style={{ width: '50px', margin: '0 10px' }}
            />
            <button onClick={increment}>+</button>
          </div>

          {/* Botón para agregar al carrito */}
          <button onClick={addToCart} className="add-to-cart-button" style={{ marginLeft: '20px' }}>
            Agregar al carrito
          </button>
        </div>
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

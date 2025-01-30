import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams(); // Debe ser "id" porque así está en la ruta
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  console.log("ID obtenido desde useParams:", id);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    console.log("Productos en localStorage:", storedProducts);

    // Comparar correctamente con `_id`, convirtiéndolo en string para evitar errores de tipo
    const foundProduct = storedProducts.find((p) => String(p._id) === id);
    console.log("Producto encontrado:", foundProduct);

    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const addToCart = () => {
    console.log(`Producto ${product.name} agregado al carrito con ${quantity} unidades.`);
  };

  return (
    <div className="product-container">
      <h1>{product.name}</h1>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: ${product.price.toFixed(2)}</p>
  
      <div className="product-details">
        <div className="product-info">
          <img src={product.picture} alt={product.name} className="product-image" />
          <div className="price-total">
            <span>Precio: ${product.price}</span>
            <span>Total: ${product.price * quantity}</span>
          </div>
        </div>
  
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
  
          <button onClick={addToCart} className="add-to-cart-button" style={{ marginLeft: '20px' }}>
            Agregar al carrito
          </button>
        </div>
      </div>
  
      <h2>Reviews</h2>
      <div className="product-reviews">
        {product.review?.length > 0 ? (
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

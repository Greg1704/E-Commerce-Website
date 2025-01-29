import React, { useState, useEffect } from 'react';

// Datos de ejemplo de productos en el carrito
const initialCart = [
  {
    id: 1,
    name: 'Producto 1',
    price: 50,
    quantity: 2,
    picture: 'https://via.placeholder.com/50',
  },
  {
    id: 2,
    name: 'Producto 2',
    price: 30,
    quantity: 1,
    picture: 'https://via.placeholder.com/50',
  },
];

const CartPage = () => {
  const [cart, setCart] = useState([]);

  // Inicializa el carrito con los datos de ejemplo cuando el componente se monta
  useEffect(() => {
    setCart(initialCart);
  }, []);

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Tu carrito</h1>
      <div className="cart-items">
        {cart.map(product => (
          <div key={product.id} className="cart-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', height: '120px' }}>
            {/* Imagen del producto */}
            <img src={product.picture} alt={product.name} style={{ width: '60px', height: '60px', marginRight: '20px' }} />

            {/* Información del producto */}
            <div className="product-info" style={{ flex: 1 }}>
              <span>{product.name}</span>
              <div className="price-total" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Precio: ${product.price}</span>
                <span>Total: ${product.price * product.quantity}</span>
              </div>
            </div>

            {/* Controles de cantidad y eliminar */}
            <div className="actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div className="quantity-control" style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</button>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                  min="1"
                  style={{ width: '40px', margin: '0 10px' }}
                />
                <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(product.id)}className="delete-button" style={{ marginTop: '10px' }}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;

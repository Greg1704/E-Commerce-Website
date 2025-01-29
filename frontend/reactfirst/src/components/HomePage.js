import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/client/product'); 
      setProducts(response.data['allProducts']);
      localStorage.setItem('products', JSON.stringify(response.data['allProducts']));
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts().catch(err => console.log('Error capturado:', err));;
  }, []);

  const filteredProducts = products.filter(product =>
    product.name ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  return (
    <div>
      {/* Botón para recargar productos */}
      <button onClick={fetchProducts}>Home</button>

      {/* Contenedor de productos */}
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

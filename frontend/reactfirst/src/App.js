import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import './App.css';

const App = () => {
  const [search, setSearch] = useState(""); // Estado de búsqueda

  return (
    <Router>
      <Navbar onSearch={setSearch} /> {/* Pasamos la función de búsqueda */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage search={search} />} /> {/* Pasamos la búsqueda */}
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

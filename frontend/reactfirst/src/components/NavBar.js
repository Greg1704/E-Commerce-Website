import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Botones de navegación */}
        <Link to="/">
          <button className="navbar-button">Home</button>
        </Link>
        <Link to="/cart">
          <button className="navbar-button">Carrito</button>
        </Link>
      </div>
      {/* Única barra de búsqueda */}
      <div className="navbar-search">
        <input 
          type="text" 
          placeholder="Buscar producto..." 
          onChange={(e) => onSearch(e.target.value)} 
          className="search-input" 
        />
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { FaShoppingCart, FaUser, FaHome, FaBoxOpen } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate=useNavigate()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogoutResponse = () => {
    localStorage.removeItem('token');
    navigate('/login')
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <img src="/resize.png" alt="Gada Electronics" />
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/">
            <FaHome size={18} />
            <span>Home</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/shop/products">
            <FaBoxOpen size={18} />
            <span>Shop</span>
          </Link>
        </li>
      </ul>
      <div className="navbar-icons">
        <Link to="/shop/getCart" className="navbar-icon">
          <FaShoppingCart size={24} />
          <span className="navbar-name">Cart</span>
        </Link>
        {token ? (
          <div className="navbar-dropdown">
            <div className="navbar-icon" onClick={toggleDropdown}>
              <FaUser size={24} />
              <span className="navbar-name">User</span>
            </div>
            {isDropdownOpen && (
              <ul className="dropdown-menu" onBlur={closeDropdown}>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <button onClick={handleLogoutResponse}>Logout</button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div className="navbar-auth">
            <Link to="/login" className="navbar-auth-link">Login</Link>
            <span className="navbar-auth-separator">/</span>
            <Link to="/signup" className="navbar-auth-link">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

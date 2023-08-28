// Home.jsx

import React, { useState, useEffect } from 'react';
import './home.css';
import Carousel from '../pages/admin/carousel';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the API
    fetch(`${process.env.REACT_APP_BACKEND_URL}admin/getProducts`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Set the fetched product data to the state
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  // Sample data for the banners and additional products
  const banners = [
    {
      id: 'banner1',
      offer: '50% Off',
      image: 'Banner1.jpg',
      products: getRandomProducts(4),
    },
    {
      id: 'banner2',
      offer: 'Special Deal',
      image: 'sales.jpg',
      products: getRandomProducts(4),
    },
    {
      id: 'banner3',
      offer: 'Limited Time Offer',
      image: '/path/to/banner3-image.jpg',
      products: getRandomProducts(4),
    },
    // Add more banners as needed
  ];

  function getRandomProducts(numProducts) {
    const randomProducts = products
      .sort(() => 0.5 - Math.random())
      .slice(0, numProducts);
    return randomProducts;
  }

  return (
    <div className="home-container">
            <div className="home-container1">

      <Carousel />
      </div>

      <div className="home-content">
        <h1>Welcome to Our E-commerce Store</h1>

        {/* Banners */}
        <div className="banner-list">
          {banners.slice(0, 2).map((banner) => (
            <div key={banner.id} className="banner-item">
              <h2 className="banner-offer">{banner.offer}</h2>
              <img src={banner.image} alt={`Banner ${banner.id}`} className="banner-image" />
              <div className="banner-products">
                {banner.products.map((product) => (
                  <Link to={`/shop/products/`} key={product.id} className="product-item">
                    <img
  src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}                      alt={product.name}
                      className="product-image"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Male Clothing */}
        <div className="section">
          <h2 className="section-title">Electronic Product</h2>
          <div className="grid-2x2">
            {getRandomProducts(4).map((product) => (
              <div key={product.id} className="product-item">
                <img
                   src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}   
                  alt={product.name}
                  className="product-image"
                />
                <p className="product-name">{product.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Female Clothing */}
        <div className="section">
          <h2 className="section-title">Electronic Accessories</h2>
          <div className="grid-2x2">
            {getRandomProducts(4).map((product) => (
              <div key={product.id} className="product-item">
                <img
                   src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}   
                  alt={product.name}
                  className="product-image"
                />
                <p className="product-name">{product.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: aayushbahukhandi66@gmail.com</p>
              <p>Phone: 9410155821</p>
              <p>Address: Patel Nagar,Dehradun</p>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <p>Facebook</p>
              <p>Twitter</p>
              <p>Instagram</p>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-section">
              <h3>Created by</h3>
              <Link to="/about">Aayush Bahukhandi&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Link>
            
            </div>
          </div>
        </footer>
      </div>
  );
};

export default Home;

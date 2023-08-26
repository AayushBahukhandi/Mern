import React, { useEffect, useState } from "react";
import "./shopProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ShopProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products when the component mounts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}admin/getProducts`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          throw new Error("Invalid product data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Add a product to the cart
  const addToCart = (product) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}shop/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ productId: product._id }),
    })
      .then((res) => {
        navigate('/shop/getCart');
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // Component to display a single product
  const ProductItem = ({ product }) => (
    <div key={product._id} className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Price: {product.price}</p>
      <img className="product-image" src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`} alt={product.name} /><br/><br/>
      <Link to={`/shop/getProduct/${product._id}`} className="product-link">
        Product Details
      </Link>
      <div className="product-actions">
        <button className="shop-button" onClick={() => addToCart(product)}>
          <FontAwesomeIcon icon={faCartPlus} />
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="product-list-container">
      <div className="product-card-container">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopProduct;

import React, { useEffect, useState } from "react";
import "./productdetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import withAdminAuth from './withAdminAuth';


const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const navigate= useNavigate()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}admin/getProducts`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching products');
        }
      })
      .then((data) => {
        console.log(data)
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    console.log(productId);
    fetch(`${process.env.REACT_APP_BACKEND_URL}admin/deleteProduct/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then((response) => {
        console.log(response);
        navigate('/admin/addProduct')
        navigate('/admin/ProductDetails')

        if (response.ok) {

          return response.json();

        } else {
          throw new Error('Error deleting product');
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Sidebar />
      <div className="product-list-container">
        <h2 className="product-list-heading">Product List</h2>
        <div className="product-card-container">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">
                Description: {product.description}
              </p>
              <p className="product-price">Price: {product.price}</p>
              <img
                className="product-image"
                src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}
                alt={product.title}
              />
              <ul className="product-specifications">
                {product.specifications.map((specification, index) => (
                  <li key={index}>
                    {specification.name}: {specification.value}
                  </li>
                ))}
              </ul>
              <div className="product-actions">
                <Link to={`/admin/addProduct/${product._id}?edit=true`}>
                  <button className="action-button">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </Link>
                <button
                  className="action-button"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default withAdminAuth(ProductDetails);

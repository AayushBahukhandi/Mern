import React, { useEffect, useState } from "react";
import "./getProducts.css";
import { useParams } from "react-router-dom";

const GetProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}shop/getProduct/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        return response.json();
      })
      .then((data) => {
        if (typeof data === "object") {
          setProduct(data);
        } else {
          throw new Error("Invalid product data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error and display an error message to the user
      });
  }, [id]);

  return (
    <div className="product1-card">
      <h3 className="product1-name">Product Details</h3>
      <p className="product1-name">Name: {product.name}</p>
      <p className="product1-price">Price: {product.price}</p>
      <p className="product1-description">Description: {product.description}</p>
      <img
        className="product1-image"
        src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}
        alt={product.name}
      />
      <h3 className="product1-name">Specification</h3>
      <ul className="product1-specifications">
        {product.specifications &&
          product.specifications.map((specification) => (
            <li key={specification._id}>
              {specification.name}: {specification.value}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GetProduct;

import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import "./addproduct.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import withAdminAuth from './withAdminAuth';
import ImageUpload from "../../components/imageComponent";
import { useNavigate } from "react-router-dom";


const categories = {
  Laptop: [
    {
      name: 'Processor',
      values: ['Intel i5', 'Intel i7', 'AMD Ryzen 5', 'AMD Ryzen 7'],
    },
    {
      name: 'Storage',
      values: ['256GB SSD', '512GB SSD', '1TB HDD', '2TB HDD'],
    },
    {
      name: 'Display',
      values: ['15.6 inches', '14 inches', '13.3 inches', '17.3 inches'],
    },
    {
      name: 'Operating System',
      values: ['Windows 10', 'macOS', 'Linux', 'Chrome OS'],
    },
    {
      name: 'RAM',
      values: ['2GB', '4GB', '6GB', '8GB', '16GB'],
    },
  ],
  Smartphone: [
    {
      name: 'Brand',
      values: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Sony', 'LG'],
    },
    {
      name: 'Display Size',
      values: ['6.2 inches', '6.5 inches', '6.7 inches', '6.9 inches'],
    },
    {
      name: 'Processor',
      values: ['Qualcomm Snapdragon 888', 'Apple A15 Bionic', 'Exynos 2100', 'MediaTek Dimensity 1200'],
    },
    {
      name: 'RAM',
      values: ['4GB', '6GB', '8GB', '12GB', '16GB'],
    },
    {
      name: 'Storage',
      values: ['64GB', '128GB', '256GB', '512GB', '1TB'],
    },
    {
      name: 'Operating System',
      values: ['Android 12', 'iOS 15'],
    },
    {
      name: 'Camera',
      values: ['12 MP', '48 MP', '64 MP', '108 MP'],
    },
  ],
  Smarttv: [
    {
      name: 'Brand',
      values: ['Sony', 'Samsung', 'LG', 'TCL', 'Hisense', 'Vizio', 'Panasonic'],
    },
    {
      name: 'Screen Size',
      values: ['43 inches', '55 inches', '65 inches', '75 inches', '85 inches'],
    },
    {
      name: 'Resolution',
      values: ['Full HD', '4K Ultra HD', '8K Ultra HD'],
    },
    {
      name: 'Smart Platform',
      values: ['Android TV', 'webOS', 'Tizen', 'Roku TV'],
    },
    {
      name: 'HDR Support',
      values: ['HDR10', 'Dolby Vision', 'HLG'],
    },
    {
      name: 'Connectivity',
      values: ['Wi-Fi', 'Bluetooth', 'Ethernet', 'HDMI', 'USB'],
    },
  ],
  DigitalCamera: [
    {
    name: 'Brand',
    values: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'Olympus'],
    },
    {
    name: 'Sensor Type',
    values: ['APS-C', 'Full Frame', 'Micro Four Thirds'],
    },
    {
    name: 'Megapixels',
    values: ['20 MP', '24 MP', '30 MP', '45 MP', '61 MP'],
    },
    {
    name: 'Lens Mount',
    values: ['Canon EF', 'Nikon F', 'Sony E-mount', 'Fujifilm X'],
    },
    {
    name: 'Video Recording',
    values: ['4K UHD', 'Full HD', '120fps Slow-motion'],
    },
    {
    name: 'Image Stabilization',
    values: ['In-body IS', 'Lens IS', 'Digital IS'],
    },
    ],
    
    GamingConsole: [
    {
    name: 'Brand',
    values: ['Sony PlayStation', 'Microsoft Xbox', 'Nintendo Switch'],
    },
    {
    name: 'Storage',
    values: ['500GB HDD', '1TB HDD', '512GB SSD', '1TB SSD'],
    },
    {
    name: 'Resolution',
    values: ['1080p', '4K UHD'],
    },
    {
    name: 'Controller',
    values: ['DualShock 4', 'Xbox Wireless Controller', 'Joy-Con'],
    },
    {
    name: 'Backward Compatibility',
    values: ['Yes', 'No'],
    },
    {
    name: 'Online Services',
    values: ['PlayStation Plus', 'Xbox Live Gold', 'Nintendo Switch Online'],
    }
    ],
};

const Product = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [specifications, setSpecifications] = useState([]);
  const [newSpecification, setNewSpecification] = useState("");
  const [specificationValue, setSpecificationValue] = useState("");
  const navigate=useNavigate()
  const { id } = useParams();

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);

  const editable = queryParams.get("edit") !== null;

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("name", title);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("image", imageUrl);
    formdata.append("category", category);
    formdata.append("specifications", JSON.stringify(specifications));

    for(let  p of formdata){
      console.log(p);
    }

    const apiUrl = id
      ? `${process.env.REACT_APP_BACKEND_URL}admin/updateProduct/${id}`
      : `${process.env.REACT_APP_BACKEND_URL}admin/addProduct`;

    fetch(apiUrl, {
      method: id ? "PATCH" : "POST",
      body: formdata,
    })
      .then((response) => {
        console.log(response);
        return response.json()})
      .then((data) => {
        console.log("Server Response:", data);
        navigate('/admin/ProductDetails')
        
        setTitle("");
        setPrice("");
        setImageUrl("");
        setDescription("");
        setCategory("");
        setSpecifications([]);
        setNewSpecification("");
        setSpecificationValue("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
useEffect(() => {
    const getProduct = async () => {
      if (editable) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}admin/getProduct/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const data = await response.json();
          console.log(data);
          setTitle(data.name);
          setPrice(data.price);
          setImageUrl(data.image);
          setDescription(data.description);
          setCategory(data.category);
          setSpecifications(data.specifications);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    getProduct();
  }, [id, editable]);

  const handleAddSpecification = () => {
    if (newSpecification.trim() !== "") {
      setSpecifications((prevState) => [
        ...prevState,
        {
          name: newSpecification,
          value: specificationValue,
        },
      ]);
      setNewSpecification("");
      setSpecificationValue("");
    }
  };

  const handleRemoveSpecification = (index) => {
    setSpecifications((prevState) => {
      const updatedSpecifications = [...prevState];
      updatedSpecifications.splice(index, 1);
      return updatedSpecifications;
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSpecifications([]);
    setNewSpecification("");
    setSpecificationValue("");
  };

  const handleSpecificationValueChange = (e) => {
    const selectedValue = e.target.value;
    setSpecificationValue(selectedValue);
  };
  const getImageHandler=(selectedImage)=>{
    setImageUrl(selectedImage);
  }

  const categorySpecifications = categories[category] || [];

  return (
    <>
      <Sidebar />

      <div className="add-product-container">
        <h2>{id ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleUpdateProduct} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Title:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
          <ImageUpload getImage={getImageHandler} uploadedImage={imageUrl}/>
            
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
              // required
            >
              <option value="">Select a category</option>
            <option value="Laptop">Laptop</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Smarttv">Smart Tv</option>
            <option value="DigitalCamera">Digital Camera</option>
            <option value="GamingConsole">Gaming Console</option>
            </select>
          </div>
          {category && (
            <div className="form-group">
              <label htmlFor="specification">Specifications:</label>
              <div className="specification-list">
                {specifications.map((specification, index) => (
                  <div key={index} className="specification-line">
                    {specification.name}: {specification.value}
                    <FaTimes
                      className="remove-specification"
                      onClick={() => handleRemoveSpecification(index)}
                    />
                  </div>
                ))}
              </div>
              <div className="specification-input">
                <select
                  id="specification"
                  name="newSpecification"
                  value={newSpecification}
                  onChange={(e) => setNewSpecification(e.target.value)}
                >
                  <option value="">Select a specification</option>
                  {categorySpecifications.map((spec, index) => (
                    <option key={index} value={spec.name}>
                      {spec.name}
                    </option>
                  ))}
                </select>
                <select
                  id="specification-value"
                  name="specificationValue"
                  value={specificationValue}
                  onChange={handleSpecificationValueChange}
                >
                  <option value="">Select a value</option>
                  {categorySpecifications
                    .find((spec) => spec.name === newSpecification)
                    ?.values.map((value, index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    ))}
                </select>
                <button
                  className="addProductButton"
                  type="button"
                  onClick={handleAddSpecification}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button className="submitButton" type="submit">
            {id ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default withAdminAuth(Product);

import React, { useState, useEffect } from "react";
import "./carousel.css";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Replace this fetch with your API call to get the images
    fetch(`${process.env.REACT_APP_BACKEND_URL}admin/getImage`)
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Automatically change the slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (images.length === 0) {
    return <div>Loading images...</div>;
  }

  return (
    <div className="carousel-container-wrapper">
      <div className="carousel-container">
        {images.map((image, index) => (
          <img
            key={index}
            className={`carousel-image ${
              index === currentIndex ? "active" : ""
            }`}
            src={image.imageUrl}
            alt={image.imageUrl}
          />
        ))}
        <div className="carousel-buttons">
          <button className="carousel-prev-button" onClick={handlePrevious}>
            &lt;
          </button>
          <button className="carousel-next-button" onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

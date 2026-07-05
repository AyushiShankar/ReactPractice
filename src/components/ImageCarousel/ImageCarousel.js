import React, { useState } from "react";
import './styles.css'

const ImageCarousel = ({ images = [] }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexPrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    }
    else {
      setCurrentIndex((prev) => prev - 1);
    }

  };

  const handleIndexNext = () => {
    const index = (currentIndex + 1) % images.length;
    setCurrentIndex(index);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        maxHeight: "400px",
        width: "100%",
        margin: "auto",
        position: "relative",
        backgroundColor: "black",
      }}
    >
      {images.length === 0 && <p>No images available.</p>}
      <img
        src={images[currentIndex]?.src}
        alt={images[currentIndex]?.alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          margin: "auto",
        }}
      />
      <button
        id="Previous"
        onClick={handleIndexPrev}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          cursor: "pointer",
          transform: "translateY(-50%)",
        }}
      >
        Previous
      </button>
      <button
        id="Next"
        onClick={handleIndexNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          cursor: "pointer",
          transform: "translateY(-50%)",
        }}
      >
        Next
      </button>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {images.map((image, index) => (
          <button
            id={`pageButton-${index}`}
            key={image.alt}
            style={{
              backgroundColor: currentIndex === index ? "black" : "white",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              margin: "4px",
              border: "1px solid black",
              cursor: "pointer",
            }}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;

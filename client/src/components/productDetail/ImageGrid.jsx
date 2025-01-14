/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./ImageGrid.module.scss";

function ImageGrid({ images }) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateLayout = () => {
    const screenWidth = window.innerWidth;
    setIsMobile(screenWidth < 768);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  if (isMobile) {
    // Carousel for mobile
    return (
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }} className={styles.imageGrid}>
        <button
          onClick={handlePrevious}
          style={{
            position: "absolute",
            top: "50%",
            left: "1rem",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          &#8249;
        </button>
        <img
          src={images[currentIndex]}
          alt={`product-${currentIndex}`}
          style={{
            width: "100%",
            height: "40rem",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
        />
        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            top: "50%",
            right: "1rem",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          &#8250;
        </button>
      </div>
    );
  }

  // Grid for non-mobile screens
  const columns =
    images.length === 1
      ? 1
      : images.length > 2 && images.length < 4
      ? 2
      : images.length >= 4
      ? 2
      : 1;

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: "1rem",
  };

  return (
    <div style={gridStyle}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`product-${index}`}
          style={{
            width: "100%",
            height: images.length === 1 ? "80rem" : "40rem",
          }}
        />
      ))}
    </div>
  );
}

export default ImageGrid;

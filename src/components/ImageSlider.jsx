import React, { useEffect, useState } from "react";
import "./ImageSlider.css";
import hero_one from "../assets/hero_one.jpg";
import hero_two from "../assets/hero_two.jpg";
import hero_three from "../assets/hero_three.jpg";
import hero_four from "../assets/hero_four.jpg";
import hero_five from "../assets/hero_five.jpg";

const ImageSlider = () => {
  const images = [hero_one, hero_two, hero_three, hero_four, hero_five];

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-slider-container">
      <div
        className="slider-images"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="slider-item" key={index}>
            <img src={image} alt={`slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index) }
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;

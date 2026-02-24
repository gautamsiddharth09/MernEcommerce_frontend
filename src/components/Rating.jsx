import React, { useState } from "react";
import "./Rating.css";

const Rating = ({ value, onRatingChange, disabled }) => {
  const [hoverRating, setHoverRating] = useState(1);
  const [selectRating, setSelectRating] = useState(value || 0);

  // handle star hover
  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoverRating(rating);
    }
  };
  // Mouse Leave
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };
  // handle click
  const handleClick = (rating) => {
    if (!disabled) {
      setSelectRating(rating);
      if (onRatingChange) {
        onRatingChange(rating);
      }
    }
  };
  // Function to generate stars based on the selected rating
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoverRating || selectRating);
      stars.push(
        <span 
        key={i} 
        className={`star ${isFilled ? "filled" : "empty"}`}
        onMouseEnter={()=>handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        onClick={()=>handleClick(i)}
        style={{pointerEvents:disabled ? 'none' : 'auto'}}
        >🟊</span>
      );
    }
    return stars;
  };

  return (
    <div>
      <div className="rating">{generateStars()}</div>
    </div>
  );
};

export default Rating;

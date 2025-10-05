import React, { useState } from "react";
import StarRating from "./StarRating";

function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState("yellow");

  const colorMap = {
    yellow: { hex: "#E6CA97", label: "Yellow Gold" },
    white: { hex: "#D9D9D9", label: "White Gold" },
    rose: { hex: "#E1A4A9", label: "Rose Gold" },
  };

  return (
    <div
      style={{
        width: "300px",
        flexShrink: 0,       
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* Image */}
      <img
        src={product.images[selectedColor] }
        alt={product.name}
        style={{
          width: "100%",
          aspectRatio: "1 / 1", // square image
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />

      {/* Title */}
      <p
        style={{
          marginTop: "0.8rem",
          fontSize: "15px",
          fontFamily: "Montserrat-Medium",
        }}
      >
        {product.name}
      </p>

      {/* Price */}
      <p 
        style={{
          margin: "0.3rem 0",
          fontSize: "15px",
          fontFamily: "Montserrat-Regular",
        }}
      >
        ${product.price.toFixed(2)} USD
      </p>

      {/* Color Selection */}
      <div style={{ marginTop: "0.5rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {Object.entries(colorMap).map(([key, { hex, label }]) => {
            const isSelected = selectedColor === key;
            return (
              <div
                key={key}
                onClick={() => setSelectedColor(key)}
                title={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: isSelected ? "24px" : "22px",
                  height: isSelected ? "24px" : "22px",
                  borderRadius: "100%",
                  border: isSelected ? "1px solid #333" : "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: hex,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Selected Color Name */}
        <p 
          style={{ 
            marginTop: "0.8rem", 
            fontSize: "12px", 
            fontFamily: "Avenir-Book",
          }}
        >
          {colorMap[selectedColor].label}
        </p>
      </div>
      <StarRating score={product.popularityScore * 5} />
</div>
  );
}

export default ProductCard;

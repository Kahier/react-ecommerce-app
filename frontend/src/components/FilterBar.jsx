import React, { useState } from "react";

function FilterBar({ onFilterChange }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");

  const handleApply = () => {
    onFilterChange({
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      minScore: minScore || "",
      maxScore: maxScore || "",
    });
  };

  const inputStyle = {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontFamily: "Montserrat-Regular",
    fontSize: "0.9rem",
    outline: "none",
    width: "100px",
    transition: "border 0.2s",
  };

  const labelStyle = {
    fontFamily: "Avenir-Book",
    fontSize: "0.85rem",
    marginBottom: "4px",
  };

  const buttonStyle = {
    padding: "6px 14px",
    borderRadius: "6px",
    border: "1px solid #E6CA97",
    background: "transparent",
    fontFamily: "Montserrat-Medium",
    cursor: "pointer",
    transition: "all 0.2s",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        padding: "0.5rem 0",
        marginBottom: "2rem",
        flexWrap: "wrap",
        alignItems: "flex-end",
      }}
    >
      {/* Min Price */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>Min Price ($)</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="0"
          style={inputStyle}
          className="no-spinner"
        />
      </div>

      {/* Max Price */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>Max Price ($)</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="1000"
          style={inputStyle}
          className="no-spinner"
        />
      </div>

      {/* Min Score */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>Min Score</label>
        <input
          type="number"
          value={minScore}
          min="0"
          max="5"
          step="0.1"
          onChange={(e) => setMinScore(e.target.value)}
          placeholder="0"
          style={inputStyle}
          className="no-spinner"
        />
      </div>

      {/* Max Score */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={labelStyle}>Max Score</label>
        <input
          type="number"
          value={maxScore}
          min="0"
          max="5"
          step="0.1"
          onChange={(e) => setMaxScore(e.target.value)}
          placeholder="5"
          style={inputStyle}
          className="no-spinner"
        />
      </div>

      {/* Apply Button */}
      <button style={buttonStyle} onClick={handleApply}>
        Apply
      </button>
    </div>
  );
}

export default FilterBar;

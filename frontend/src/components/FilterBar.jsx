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
        onChange={(e) => {
          let val = e.target.value;
          if (val < 0) val = 0;
          if (val > 5000) val = 5000;
          setMinPrice(val);
        }}
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
        onChange={(e) => {
          let val = e.target.value;
          if (val < 0) val = 0;
          if (val > 5000) val = 5000;
          setMaxPrice(val);
        }}
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
        onChange={(e) => {
          let val = e.target.value;
          if (val < 0) val = 0;
          if (val > 5) val = 5;
          setMinScore(val);
        }}
        step="0.1"
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
        onChange={(e) => {
          let val = e.target.value;
          if (val < 0) val = 0;
          if (val > 5) val = 5;
          setMaxScore(val);
        }}
        step="0.1"
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

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import arrowImg from "../assets/image/arrow.png";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <p
        style={{
          textAlign: "center",
          fontSize: "45px",
          fontFamily: "Avenir-Book",
        }}
      >
        Product List
      </p>
      <div style={{ position: "relative" }}>
        {/* Left Arrow */}
        <button
          onClick={() =>
            document.getElementById("product-scroll").scrollBy({ left: -300, behavior: "smooth" })
          }
          style={{
            position: "absolute",
            top: "30%",
            transform: "translateY(-50%)",
            background: "white",
            color: "black",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <img
            src={arrowImg}
            alt="left arrow"
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </button>

        {/* Product list */}
        <div
          id="product-scroll"
          className="product-scroll"
          style={{
            display: "flex",
            gap: "11rem",
            marginTop: "1rem",
            flexWrap: "nowrap",
            overflowX: "auto",
            scrollBehavior: "smooth",
            padding: "2rem 3rem",
          }}
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() =>
            document.getElementById("product-scroll").scrollBy({ left: 300, behavior: "smooth" })
          }
          style={{
            position: "absolute",
            top: "30%",
            right: 0,
            transform: "translateY(-50%)",
            background: "white",
            color: "black",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <img
            src={arrowImg}
            alt="left arrow"
            style={{
              width: "20px",
              height: "20px",
              transform: "rotate(180deg)",
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default ProductList;

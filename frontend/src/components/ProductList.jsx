import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

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
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "12rem",
        marginTop: "1rem"
      }}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;

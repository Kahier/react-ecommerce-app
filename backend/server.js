import express from "express";
import fs from "fs";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load products from JSON file
const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

// Fetch gold price (dummy for now)
async function getGoldPrice() {
  try {
    // Example: GoldAPI.io or metals-api (replace with your key later)
    // const res = await axios.get("https://api.example.com/gold");
    // return res.data.pricePerGramUSD;
    return 60; // fallback fixed value ($60 per gram)
  } catch (error) {
    console.error("Error fetching gold price:", error);
    return 60;
  }
}

// API endpoint
app.get("/api/products", async (req, res) => {
  const goldPrice = await getGoldPrice();

  const updatedProducts = products.map((p) => {
    const price = (p.popularityScore + 1) * p.weight * goldPrice;
    return { 
      ...p, 
      price: Number(price.toFixed(2))  // ensures it's a number, not a string
    };
  });

  res.json(updatedProducts);
});


app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

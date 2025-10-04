import express from "express";
import fs from "fs";
import axios from "axios";
import cors from "cors";
import { getGoldPricePerGram } from "./services/goldprice.js";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

async function getGoldPrice() {
  try {
    const goldPrice = await getGoldPricePerGram();
    return goldPrice;
  } catch (err) {
    console.error(err);
    return goldPrice;
  }
}

app.get("/api/products", async (req, res) => {
  try {
    const goldPrice = await getGoldPrice();

    const updatedProducts = products.map((p) => {
      const price = (p.popularityScore + 1) * p.weight * goldPrice;
      return {
        ...p,
        price: Number(price.toFixed(2)),
      };
    });

    res.json(updatedProducts);
  } catch (err) {
    console.error("Error calculating prices:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

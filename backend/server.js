import express from "express";
import fs from "fs";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { getGoldPricePerGram } from "./services/goldprice.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const products = JSON.parse(
  fs.readFileSync(path.join(__dirname, "products.json"), "utf-8")
);

async function getGoldPrice() {
  try {
    const goldPrice = await getGoldPricePerGram();
    return goldPrice;
  } catch (err) {
    console.error("Error fetching gold price:", err);
    return 1;
  }
}

app.get("/api/products", async (req, res) => {
  try {
    const goldPrice = await getGoldPrice();

    let updatedProducts = products.map((p) => {
      const price = (p.popularityScore + 1) * p.weight * goldPrice;
      return {
        ...p,
        price: Number(price.toFixed(2)),
      };
    });

    const { minPrice, maxPrice, minScore, maxScore } = req.query;

    if (minPrice) {
      updatedProducts = updatedProducts.filter(
        (p) => p.price >= Number(minPrice)
      );
    }
    if (maxPrice) {
      updatedProducts = updatedProducts.filter(
        (p) => p.price <= Number(maxPrice)
      );
    }
    if (minScore) {
      updatedProducts = updatedProducts.filter(
        (p) => p.popularityScore >= Number(minScore) / 5
      );
    }
    if (maxScore) {
      updatedProducts = updatedProducts.filter(
        (p) => p.popularityScore <= Number(maxScore) / 5
      );
    }

    res.json(updatedProducts);
  } catch (err) {
    console.error("Error calculating prices:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const frontendPath = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

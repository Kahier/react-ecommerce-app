import axios from "axios";

let cachedGoldPrice = null;
let lastFetched = 0;
const CACHE_DURATION = 10 * 60 * 1000;

export async function getGoldPricePerGram() {
  const now = Date.now();

  if (cachedGoldPrice && now - lastFetched < CACHE_DURATION) {
    return cachedGoldPrice;
  }

  try {
    const apiKey = "goldapi-favtsmgcu3lpb-io";
    const url = "https://www.goldapi.io/api/XAU/USD";

    const response = await axios.get(url, {
      headers: {
        "x-access-token": apiKey,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    const pricePerOunceUSD = data.price;
    const gramsInOunce = 31.1035;
    const pricePerGram = pricePerOunceUSD / gramsInOunce;

    cachedGoldPrice = pricePerGram;
    lastFetched = now;
    return pricePerGram;

  } catch (error) {
    console.error("Error fetching gold price:", error.message || error);

    if (cachedGoldPrice) {
      return cachedGoldPrice;
    }

    const fallback = 100;
    console.warn(`Using fallback gold price: $${fallback} per gram.`);
    return fallback;
  }
}

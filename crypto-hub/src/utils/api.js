export const fetchTopCoins = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );
  return res.json();
};

export async function fetchCoinPrice(name) {
  try {
    // 1️⃣ First, search for the correct coin ID
    const searchResponse = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${name}`
    );
    const searchData = await searchResponse.json();

    if (!searchData.coins.length) return null;

    const coinId = searchData.coins[0].id;

    // 2️⃣ Now fetch its current price
    const priceResponse = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
    );
    const priceData = await priceResponse.json();

    return priceData[coinId]?.usd || null;
  } catch (error) {
    console.error("Error fetching coin price:", error);
    return null;
  }
}


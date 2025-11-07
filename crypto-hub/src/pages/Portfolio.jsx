import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [coinInput, setCoinInput] = useState("");
  const [amount, setAmount] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch coin price
  const fetchCoinData = async (coinId) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
      );
      const data = await res.json();
      return data[coinId]?.usd || 0;
    } catch (err) {
      console.error("Error fetching coin data:", err);
      return 0;
    }
  };

  // ✅ Add a coin
  const addCoin = async (e) => {
    e.preventDefault();
    if (!coinInput || !amount) return;

    setLoading(true);
    const price = await fetchCoinData(coinInput.toLowerCase());
    if (price === 0) {
      alert("Invalid Coin ID. Please try again (e.g., bitcoin)");
      setLoading(false);
      return;
    }

    const newCoin = {
      id: coinInput.toLowerCase(),
      amount: parseFloat(amount),
      price,
      value: parseFloat(amount) * price,
    };

    const updatedPortfolio = [...portfolio, newCoin];
    setPortfolio(updatedPortfolio);
    setCoinInput("");
    setAmount("");
    setLoading(false);
  };

  // ✅ Calculate total portfolio value
  useEffect(() => {
    const total = portfolio.reduce((sum, coin) => sum + coin.value, 0);
    setTotalValue(total);
  }, [portfolio]);

  // ✅ Refresh all prices
  const refreshPrices = async () => {
    setLoading(true);
    const updated = await Promise.all(
      portfolio.map(async (coin) => {
        const newPrice = await fetchCoinData(coin.id);
        return {
          ...coin,
          price: newPrice,
          value: newPrice * coin.amount,
        };
      })
    );
    setPortfolio(updated);
    setLoading(false);
  };

  // ✅ Load & Save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cryptoPortfolio");
    if (saved) setPortfolio(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (portfolio.length > 0) {
      localStorage.setItem("cryptoPortfolio", JSON.stringify(portfolio));
    } else {
      localStorage.removeItem("cryptoPortfolio");
    }
  }, [portfolio]);

  // ✅ Chart Colors
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#845EC2",
    "#D65DB1",
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Portfolio</h2>

      {/* Add Coin Form */}
      <form
        onSubmit={addCoin}
        className="flex flex-col sm:flex-row gap-3 mb-4 justify-center"
      >
        <input
          type="text"
          placeholder="Coin ID (e.g. bitcoin)"
          value={coinInput}
          onChange={(e) => setCoinInput(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Loading..." : "Add"}
        </button>
      </form>

      {/* Refresh Button */}
      <button
        onClick={refreshPrices}
        className="px-3 py-2 bg-green-600 rounded hover:bg-green-700 mb-4"
        disabled={loading}
      >
        {loading ? "Refreshing..." : "Refresh Prices"}
      </button>

      {/* Coin List */}
      <div className="space-y-3">
        {portfolio.length === 0 ? (
          <p className="text-gray-400 text-center">No coins added yet.</p>
        ) : (
          portfolio.map((coin, index) => (
            <div
              key={index}
              className="flex justify-between bg-gray-800 px-4 py-2 rounded"
            >
              <span className="capitalize">
                {coin.id} ({coin.amount})
              </span>
              <span>${coin.value.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>

      {/* Total Value */}
      <div className="mt-5 text-center border-t border-gray-700 pt-3 text-lg">
        <strong>Total Portfolio Value:</strong> ${totalValue.toFixed(2)}
      </div>

      {/* Portfolio Chart */}
      {portfolio.length > 0 && (
        <div className="mt-8 bg-gray-800 rounded-lg p-4">
          <h3 className="text-center text-xl font-semibold mb-4">
            Portfolio Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolio}
                dataKey="value"
                nameKey="id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {portfolio.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

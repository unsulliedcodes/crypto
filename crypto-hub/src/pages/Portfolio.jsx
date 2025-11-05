import React, { useState, useEffect } from "react";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(
    JSON.parse(localStorage.getItem("portfolio")) || []
  );
  const [coin, setCoin] = useState("");
  const [quantity, setQuantity] = useState("");

  const addCoin = () => {
    if (!coin || !quantity) return;
    const newPortfolio = [...portfolio, { coin, quantity }];
    setPortfolio(newPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(newPortfolio));
    setCoin("");
    setQuantity("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Portfolio Tracker</h1>
      <div className="flex justify-center gap-2 mb-6">
        <input
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          placeholder="Coin Name"
          className="border p-2 rounded"
        />
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="border p-2 rounded"
        />
        <button
          onClick={addCoin}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Coin</th>
            <th className="p-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{item.coin}</td>
              <td className="p-2">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;

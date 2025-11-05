import React, { useEffect, useState } from "react";
import { fetchTopCoins } from "../utils/api";
import CryptoCard from "../components/CryptoCard";

const Home = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTopCoins();
      setCoins(data);
    };
    loadData();
  }, []);

  return (
    <div className="w-full border flex flex-col justify-center px-[50px]">
      <h1 className="text-2xl font-bold mb-4 text-left">Live Market</h1>
      <div className="grid grid-cols-4 gap-[10px] justify-center">
        {coins.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};

export default Home;

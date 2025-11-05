import React from "react";

const CryptoCard = ({ coin }) => (
  <div className="bg-white shadow-md rounded text-center p-4 border">
    <div className="first-part flex justify-around align-center">
      <img
        src={coin.image}
        alt={coin.name}
        className="w-[50px] h-[50px] self-center"
      />
      <h2 className="font-semibold">{coin.name}</h2>
    </div>
    <div className="second-part flex justify-around align-center">
      <div className="flex flex-col justify-center align-center">
        <p>{coin.symbol.toUpperCase()}</p>
        <p className="font-bold">${coin.current_price.toLocaleString()}</p>
      </div>
      <div className="flex flex-col justify-center align-center">
        <hr className="w-[30px] border p-6 mb-[30px]" />
        <p
          className={`${
            coin.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  </div>
);

export default CryptoCard;

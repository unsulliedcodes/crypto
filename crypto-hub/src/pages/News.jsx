import React, { useEffect, useState } from "react";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN")
      .then((res) => res.json())
      .then((data) => setNews(data.Data.slice(0, 6)));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Crypto News</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {news.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border p-4 rounded hover:shadow-lg transition"
          >
            <h2 className="font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-600">
              {item.body.slice(0, 120)}...
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default News;

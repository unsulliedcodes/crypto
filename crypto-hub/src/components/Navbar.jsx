import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="flex justify-between items-center bg-gray-900 text-white px-[100px] py-4">
    <h1 className="text-xl font-bold">CryptoHub</h1>
    <div className="flex gap-[20px]">
      <Link to="/">Home</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/news">News</Link>
      <button className="bg-blue-600 px-4 py-1 rounded">Sign In</button>
    </div>
  </nav>
);

export default Navbar;

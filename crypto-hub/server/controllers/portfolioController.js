import Portfolio from "../models/Portfolio.js";
import jwt from "jsonwebtoken";

const getUserId = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch {
    return null;
  }
};

export const getPortfolio = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const userId = getUserId(token);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const portfolio = await Portfolio.findOne({ userId });
  res.json(portfolio || { holdings: [] });
};

export const updatePortfolio = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const userId = getUserId(token);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const { holdings } = req.body;
  const portfolio = await Portfolio.findOneAndUpdate(
    { userId },
    { holdings },
    { new: true, upsert: true }
  );
  res.json(portfolio);
};

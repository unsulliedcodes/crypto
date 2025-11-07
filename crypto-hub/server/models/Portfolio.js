import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  holdings: [
    {
      coin: String,
      quantity: Number,
    },
  ],
});

export default mongoose.model("Portfolio", portfolioSchema);

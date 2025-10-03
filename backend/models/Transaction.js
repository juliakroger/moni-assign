const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  chain: { type: Number, required: true },
  amount: { type: String, required: true },
  token: { type: String, required: true },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "FAILED"],
    default: "PENDING",
  },
  transactionHash: { type: String, required: true },
  date: { type: Date, default: Date.now },
  senderWallet: { type: String, required: true },
  receiverWallet: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);

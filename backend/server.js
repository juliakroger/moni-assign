const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Transaction = require("./models/Transaction");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/moni-test")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Erro MongoDB:", err));

app.get("/transactions", async (req, res) => {
  try {
    const { walletAddress } = req.query;

    const txs = await Transaction.find({
      $or: [{ receiverWallet: walletAddress }, { senderWallet: walletAddress }],
    }).sort({ date: -1 });
    res.json(txs);
  } catch (err) {
    console.error("Error on GET /transactions", err);
    res.status(500).json({ error: "Failed to get transactions" });
  }
});

app.post("/transactions", async (req, res) => {
  try {
    const tx = new Transaction(req.body);
    await tx.save();
    res.status(201).json(tx);
  } catch (err) {
    console.error("Error on POST /transactions", err);
    res.status(500).json({ error: "Failed to create transaction" });
  }
});

app.get("/transaction/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const tx = await Transaction.findById(id);

    if (!tx) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(tx);
  } catch (err) {
    console.error(`Error on GET /transaction/${id}`, err);
    res.status(500).json({ error: "Failed to get transaction" });
  }
});

app.put("/transaction/:id", async (req, res) => {
  const { id } = req.params;
  const { transactionHash, status, senderWallet } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Transaction ID is required" });
  }

  try {
    await Transaction.findByIdAndUpdate(id, {
      transactionHash,
      status,
      senderWallet,
    });
    res.json({});
  } catch (err) {
    console.error("Error on PUT /transactions/:id", err);
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

app.listen(4000, () => console.log("Backend Running"));

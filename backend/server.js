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
    const txs = await Transaction.find().sort({ date: -1 });
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

app.put("/transactions", async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ date: -1 });
    res.json(txs);
  } catch (err) {
    console.error("Error on PUT /transactions", err);
    res.status(500).json({ error: "Failed to update transactions" });
  }
});

app.listen(4000, () => console.log("Backend Running"));

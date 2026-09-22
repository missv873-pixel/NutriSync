require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;

async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db(process.env.MONGODB_DB || "NutriSyncDB");
  console.log("MongoDB connected");
}

app.get("/", (req, res) => {
  res.json({ message: "NutriSync backend is running" });
});

app.get("/api/health", (req, res) => {
  res.json({
    server: "ok",
    database: db ? "connected" : "not connected"
  });
});

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`NutriSync backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
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

  await db.collection("users").createIndex(
    { email: 1 },
    { unique: true }
  );

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

/* ==========================================
   REGISTER
========================================== */

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields."
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2) {
      return res.status(400).json({
        message: "Please enter a valid name."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters."
      });
    }

    const existingUser = await db.collection("users").findOne({
      email: cleanEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name: cleanName,
      email: cleanEmail,
      passwordHash: passwordHash,
      createdAt: new Date()
    });

    res.status(201).json({
      message: "Registration successful!",
      user: {
        id: result.insertedId.toString(),
        name: cleanName,
        email: cleanEmail
      }
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    res.status(500).json({
      message: "Registration failed. Please try again."
    });
  }
});

/* ==========================================
   LOGIN
========================================== */

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter your email and password."
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await db.collection("users").findOne({
      email: cleanEmail
    });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password."
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Incorrect email or password."
      });
    }

    res.json({
      message: "Login successful!",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Login failed. Please try again."
    });
  }
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

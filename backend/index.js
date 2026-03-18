const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Debug logs
console.log("DEBUG: Current folder:", process.cwd());
console.log("DEBUG: Files in folder:", require("fs").readdirSync(process.cwd()));
console.log("DEBUG: MONGO_URI =", process.env.MONGO_URI);

// 🔥 Crash detector (important)
process.on("uncaughtException", (err) => {
  console.error("❌ UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ UNHANDLED PROMISE:", err);
});

// Safety check
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("❌ MONGO_URI is undefined! Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// 🔥 Debug incoming requests
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

// Routes
const cardRoutes = require("./routes/cards");
app.use("/api/cards", cardRoutes);

const usersFormRoutes = require("./routes/usersForm");
app.use("/api/form", usersFormRoutes);

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const debitCardRoutes = require("./routes/debitCards");
app.use("/api/debit-cards", debitCardRoutes);

const forgetCustomerRoutes = require("./routes/forgetCustomerId");
app.use("/api/users/forget-customer-id", forgetCustomerRoutes);

const forgotPasswordRoutes = require("./routes/forgotPassword");
app.use("/api/users/forgot-password", forgotPasswordRoutes);

const otpRoutes = require("./routes/otp");
app.use("/api/otp", otpRoutes);

const adminAuthRoutes = require("./routes/adminAuth");
app.use("/api/admin", adminAuthRoutes);

// 🔥 FIX: bind to 0.0.0.0 (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
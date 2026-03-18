const express = require("express");
const router = express.Router();
const ForgetCustomerId = require("../models/ForgetCustomer");

// POST /api/users/forget-customer-id
router.post("/", async (req, res) => {
  try {
    const { mobile, pan } = req.body;

    if (!mobile || !pan) {
      return res.status(400).json({ error: "Mobile and PAN are required" });
    }

    const record = new ForgetCustomerId({ mobile, pan });
    await record.save();

    res.status(201).json({ message: "Request saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/list", async (req, res) => {
  try {
    const customers = await ForgetCustomerId.find().sort({ _id: -1 });
    res.status(200).json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch forget customer data" });
  }
});


module.exports = router;

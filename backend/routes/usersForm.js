const express = require("express");
const router = express.Router();
const UserForm = require("../models/UserForm");


console.log("✅ usersForm route file loaded");
// ✅ POST: Save form data
router.post("/data", async (req, res) => {
  try {
    const { name, cardLimit, mobile, email, city, zip } = req.body;

    if (!name || !cardLimit || !mobile || !email || !city || !zip) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = new UserForm({
      name,
      cardLimit,
      mobile,
      email,
      city,
      zip,
    });

    await newUser.save();

    res.status(201).json({
      message: "Data saved successfully",
      data: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ GET: Fetch all user form data
router.get("/datafetch", async (req, res) => {
  try {
    const users = await UserForm.find().sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
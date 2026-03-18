const express = require('express');
const bcrypt = require('bcrypt');
const AdminUser = require('../models/AdminUser');

const router = express.Router();

/**
 * POST /api/admin/login
 */
router.post('/login', async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find admin user
    const admin = await AdminUser.findOne({ userId });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Success
    res.status(200).json({
      message: 'Login successful',
      adminId: admin._id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

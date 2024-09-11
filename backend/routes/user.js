const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get user data
router.get('/:token', async (req, res) => {
    const token = req.params.token;
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decode.userId);
    res.json(user);
  });

module.exports = router;
const express = require("express");
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const user = require("../model/user");
const router = express.Router();
const {
  userValidatorCreate,
  userValidatorForgotPassword,
} = require("../validators/user");
// Lấy danh sách người dùng
router.get("/", async (req, res) => {
  res.send("User/get");
  // try {
  //     const users = await User.find();
  //     res.json(users);
  // } catch (err) {
  //     res.status(500).json({ message: err.message });
  // }
});

// Tạo người dùng mới
router.post("/", userValidatorCreate, async (req, res) => {
  //Step 1: Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, phone, password,location } = req.body;
  const existingUser = await user.findOne({ phone });
  if (existingUser) {
    return res.status(400).json({ message: "phoneIsUsed" });
  }
  //Step 2: Injection Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new user({
    name,
    phone,
    password: hashedPassword,
    location
  });
  await newUser.save();
  res.status(201).json({ message: "registerSuccess", user: newUser });
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const userModel = require("../model/user");
const router = express.Router();
const {
  userValidatorCreate,
  userValidatorForgotPassword,
} = require("../validators/user");

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "getDataSuccess", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", userValidatorCreate, async (req, res) => {
  try {
    //Step 1: Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, password, location } = req.body;
    const existingUser = await userModel.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "phoneIsUsed" });
    }
    //Step 2: Injection Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      phone,
      password: hashedPassword,
      location,
    });
    await newUser.save();
    res.status(201).json({ message: "registerSuccess", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;

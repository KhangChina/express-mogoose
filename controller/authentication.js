const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user");
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ phone: username });
  if (!user) {
    return res.status(404).json({ message: "userNotFound" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "passwordIsIncorrect" });
  }

  const accessToken = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "loginSuccess",
    data: {
      accessToken: accessToken,
      refreshToken: "",
    },
  });
});

module.exports = router;

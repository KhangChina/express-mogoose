const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../model/user");
const { generateAccessToken, generateRefreshToken } = require("../utility/jwt");
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
  const refreshToken = generateRefreshToken(user);
  await userModel.updateOne(
    { _id: user._id },
    { $set: { refreshToken: refreshToken } }
  );

  res.json({
    message: "loginSuccess",
    data: {
      accessToken: generateAccessToken(user),
      refreshToken: refreshToken,
    },
  });
});

module.exports = router;

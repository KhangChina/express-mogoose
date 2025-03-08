const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../model/user");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utility/jwt");
router.post("/login", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const decoded = verifyRefreshToken(refreshToken);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return res.status(403).json({ message: "refreshTokenHasExpired" });
    }

    const user = await userModel.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "refreshTokenIsInvalid" });
    }
    const newAccessToken = generateAccessToken(user);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "refreshTokenIsInvalid" });
  }
});

module.exports = router;

const jwt = require("jsonwebtoken");
const { verifyAccessToken } = require("../utility/jwt");
const userModel = require("../model/user");
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "noTokenAccessDenied" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyAccessToken(token);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "userNotExist" });
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      return res.status(401).json({ message: "tokenExpired", expired: true });
    }

    const timeLeft = decoded.exp - currentTime;
    if (timeLeft < 60) {
      res.setHeader("X-Token-Expired-Soon", "true");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalidToken" });
  }
};

module.exports = authMiddleware;

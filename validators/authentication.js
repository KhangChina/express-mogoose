const { body } = require("express-validator");

const loginValidator = [
  body("username").notEmpty().withMessage("usernameIsRequired"),
  body("password").notEmpty().withMessage("passwordIsRequired"),
];
const refreshTokenValidator = [
  body("refreshToken").notEmpty().withMessage("refreshTokenIsRequired"),
];
module.exports = {
  loginValidator,
  refreshTokenValidator
};

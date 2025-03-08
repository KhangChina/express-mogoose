const { body } = require("express-validator");

const userValidatorCreate = [
  body("name")
    .notEmpty()
    .withMessage("nameIsRequired")
    .isString()
    .withMessage("nameIsString")
    .isLength({ min: 3 })
    .withMessage("nameMinLength3"),
  body("phone")
    .isString()
    .matches(/^\d{10,11}$/)
    .withMessage("invalidPhoneNumber"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("passwordMinLength6")
    .notEmpty()
    .withMessage("passwordIsRequired"),
];

const userValidatorForgotPassword = [
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("passwordMinLength6")
    .notEmpty()
    .withMessage("passwordIsRequired"),
];

module.exports = {
  userValidatorCreate,
  userValidatorForgotPassword,
};

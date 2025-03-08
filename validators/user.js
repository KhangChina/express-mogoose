const { body } = require("express-validator");

const userValidatorCreate = [
  body("name")
    .notEmpty()
    .withMessage("nameIsRequired")
    .isString()
    .withMessage("Tên phải là một chuỗi")
    .isLength({ min: 3 })
    .withMessage("Tên phải có ít nhất 3 ký tự"),
  body("phone")
    .isString()
    .matches(/^\d{10,11}$/)
    .withMessage("invalidPhoneNumber"),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự")
    .notEmpty()
    .withMessage("passwordIsRequired"),
];

const userValidatorForgotPassword = [
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự")
    .notEmpty()
    .withMessage("passwordIsRequired"),
];

module.exports = {
  userValidatorCreate,
  userValidatorForgotPassword,
};

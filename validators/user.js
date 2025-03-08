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
  body("location")
    .optional()  
    .isObject()
    .withMessage("locationMustBeObject") 
    .custom((value) => {
      if (value && value.type !== "Point") {
        throw new Error("locationTypeMustBePoint");
      }
      if (value && !Array.isArray(value.coordinates)) {
        throw new Error("coordinatesMustBeArray");
      }
      if (value && value.coordinates.length !== 2) {
        throw new Error("coordinatesArrayLengthInvalid");
      }
      const [longitude, latitude] = value.coordinates;
      if (typeof longitude !== "number" || typeof latitude !== "number") {
        throw new Error("coordinatesMustBeNumbers");
      }
      if (longitude < -180 || longitude > 180) {
        throw new Error("longitudeOutOfRange");
      }
      if (latitude < -90 || latitude > 90) {
        throw new Error("latitudeOutOfRange");
      }
      return true;
    })
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

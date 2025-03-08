const mongoose = require("mongoose");
const roles = require("../config/roles");
const locationTypes = require("../config/locationTypes");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{10,11}$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: Object.values(roles),
      default: roles.staff,
    },
    location: {
      type: {
        type: String,
        enum: Object.values(locationTypes),
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
    refreshToken: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);

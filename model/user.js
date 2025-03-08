const mongoose = require("mongoose");
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
    location: {
      type: {
        type: String,
        enum: ["Point"], 
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);

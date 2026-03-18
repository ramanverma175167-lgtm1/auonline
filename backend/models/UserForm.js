const mongoose = require("mongoose");

const userFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cardLimit: {
      type: Number,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

const UserForm = mongoose.model("UserForm", userFormSchema);

module.exports = UserForm;
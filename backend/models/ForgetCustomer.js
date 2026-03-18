const mongoose = require("mongoose");
const forgetCustomerSchema = new mongoose.Schema(
  {
    mobile: String,
    pan: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ForgetCustomer", forgetCustomerSchema);

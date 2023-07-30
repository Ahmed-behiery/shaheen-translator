const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    fullname: String,
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Contact", contactSchema);

const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    comment: String,
    file: String,
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

module.exports = mongoose.model("Request", requestSchema);

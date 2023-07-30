const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    image: String,
    link: String,
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

module.exports = mongoose.model("Customer", customerSchema);

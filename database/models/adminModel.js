const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  {
    timestamps: true,
    toObject: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Admin", adminSchema);

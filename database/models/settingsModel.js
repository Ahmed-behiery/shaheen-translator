const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    address_ar: String,
    address_en: String,
    email: String,
    phone: String,
    phone2: String,
    facebook: String,
    twitter: String,
    instagram: String,
    youtube: String,
    google: String,
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

module.exports = mongoose.model("Settings", settingsSchema);

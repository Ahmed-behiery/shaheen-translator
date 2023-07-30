const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    image: String,
    imageSlider: String,
    description_en: String,
    description_ar: String,
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

module.exports = mongoose.model("About", aboutSchema);

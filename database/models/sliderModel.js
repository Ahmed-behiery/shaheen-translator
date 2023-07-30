const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema(
  {
    image: String,
    title_ar: String,
    description_ar: String,
    title_en: String,
    description_en: String,
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

module.exports = mongoose.model("Slider", sliderSchema);

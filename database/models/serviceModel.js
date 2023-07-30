const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    image: String,
    title_en: String,
    title_ar: String,
    description_en: String,
    description_ar: String,
    descriptionInDetails_en: String,
    descriptionInDetails_ar: String,
    related_images: [
      {
        type: String,
      },
    ],
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

module.exports = mongoose.model("Service", serviceSchema);

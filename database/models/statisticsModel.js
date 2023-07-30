const mongoose = require("mongoose");

const statisticsSchema = new mongoose.Schema(
  {
    text_en: String,
    title_en: String,
    text_ar: String,
    title_ar: String,
    count: String,
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

module.exports = mongoose.model("Statistics", statisticsSchema);

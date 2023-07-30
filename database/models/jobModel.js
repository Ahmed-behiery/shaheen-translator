const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    name_en: String,
    name_ar: String,
    description_en: String,
    description_ar: String,
    salary: String,
    show: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      enum: ["On-Site", "On-line"],
      default: "On-line",
    },
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

module.exports = mongoose.model("Job", jobSchema);

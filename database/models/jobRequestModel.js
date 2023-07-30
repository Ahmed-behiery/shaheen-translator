const mongoose = require("mongoose");
const Job = require("./jobModel");

const jobRequestSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    file: String,
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
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

module.exports = mongoose.model("JobRequest", jobRequestSchema);

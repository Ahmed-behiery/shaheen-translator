const JobRequest = require("../database/models/jobRequestModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");
const cloudinary = require("cloudinary").v2;
const { sendMailFun } = require("../utils/sendMail");
var fs = require("fs");
var axios = require("axios");
var FormData = require("form-data");

cloudinary.config({
  cloud_name: "dax2tujx9",
  api_key: "427563815881951",
  api_secret: "CDp2kFwXnE7HS2Fevk9j3DQp15s",
});

const ITEMS_PER_PAGE = 20;

// create jobRequest
module.exports.createJobRequest = async (req) => {
  try {
    const file = req.files.file;
    const filename = req.files.file.name;

    file.mv("./uploads/" + filename, (err) => {
      if (err) {
        throw new Error("error is occurred: " + err);
      } else {
        req.body.file = "/uploads/" + filename;
      }
    });

    req.body.file = "https://shaheen-files.herokuapp.com/uploads/" + filename;

    let jobRequest = new JobRequest({ ...req.body });
    let result = await jobRequest.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: jobRequest: createJobRequest:", error);
    throw new Error(error);
  }
};

module.exports.getAllJobRequests = async (query) => {
  try {
    const page = +query.page || 1;
    let jobRequestData = {};

    let totalItems = await JobRequest.find().countDocuments();

    let jobRequests = await JobRequest.find({})
      .populate({
        path: "job",
        select: ["name_en", "name_ar"],
      })
      .sort({ createdAt: "desc" })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    jobRequestData = {
      jobRequests,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    return jobRequestData;
  } catch (error) {
    console.log("Something went wrong: jobRequest: getAllJobRequests:", error);
    throw new Error(error);
  }
};

module.exports.getJobRequestById = async ({ id }) => {
  try {
    checkObjectId(id);
    let jobRequest = await JobRequest.findById(id).populate({
      path: "job",
      select: ["name_en", "name_ar"],
    });
    if (!jobRequest) {
      throw new Error(constants.jobRequestMessage.JOB_REQUEST_NOT_FOUND);
    }
    return formatMongoData(jobRequest);
  } catch (error) {
    console.log("Something went wrong: jobRequest: getJobRequestById:", error);
    throw new Error(error);
  }
};

module.exports.updateJobRequest = async ({ id, req }) => {
  try {
    checkObjectId(id);

    if (req.files.length > 0) {
      var data = new FormData();
      data.append("file", new Buffer(req.files[0].buffer));

      let uploadFileRes = await axios.post(
        "https://shaheen-files.herokuapp.com/",
        data
      );

      if (uploadFileRes.data.status === 200) {
        req.body.file =
          "https://shaheen-files.herokuapp.com/" +
          uploadFileRes.data.data.url.split("/")[2];
      } else {
        throw new Error(uploadFileRes.data.message);
      }
    }

    let jobRequest = await JobRequest.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!jobRequest) {
      throw new Error(constants.jobRequestMessage.JOB_REQUEST_NOT_FOUND);
    }
    return formatMongoData(jobRequest);
  } catch (error) {
    console.log("Something went wrong: jobRequest: updateJobRequest:", error);
    throw new Error(error);
  }
};

module.exports.deleteJobRequest = async ({ id }) => {
  try {
    checkObjectId(id);
    let jobRequest = await JobRequest.findByIdAndDelete(id);
    if (!jobRequest) {
      throw new Error(constants.jobRequestMessage.JOB_REQUEST_NOT_FOUND);
    }
    return formatMongoData(jobRequest);
  } catch (error) {
    console.log("Something went wrong: jobRequest: deletejobRequest:", error);
    throw new Error(error);
  }
};

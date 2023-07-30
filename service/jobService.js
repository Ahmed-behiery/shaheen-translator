const Job = require("../database/models/jobModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");

const ITEMS_PER_PAGE = 20;
// create job
module.exports.createJob = async (serviceData) => {
  try {
    let job = new Job({ ...serviceData });
    let result = await job.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createJob:", error);
    throw new Error(error);
  }
};

module.exports.getAllJobs = async (query) => {
  try {
    const page = +query.page || 1;
    let jobData = {};

    let totalItems = await Job.find().countDocuments();

    let jobs = await Job.find({})
      .sort({ createdAt: "desc" })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    jobData = {
      jobs,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    return jobData;
  } catch (error) {
    console.log("Something went wrong: Service: getAllJobs:", error);
    throw new Error(error);
  }
};

module.exports.getJobById = async ({ id }) => {
  try {
    checkObjectId(id);
    let job = await Job.findById(id);
    if (!job) {
      throw new Error(constants.jobMessage.JOB_NOT_FOUND);
    }
    return formatMongoData(job);
  } catch (error) {
    console.log("Something went wrong: Service: getJobById:", error);
    throw new Error(error);
  }
};

module.exports.updateJob = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let job = await Job.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!job) {
      throw new Error(constants.jobMessage.JOB_NOT_FOUND);
    }
    return formatMongoData(job);
  } catch (error) {
    console.log("Something went wrong: Service: updateJob:", error);
    throw new Error(error);
  }
};

module.exports.deleteJob = async ({ id }) => {
  try {
    checkObjectId(id);
    let job = await Job.findByIdAndDelete(id);
    if (!job) {
      throw new Error(constants.jobMessage.JOB_NOT_FOUND);
    }
    return formatMongoData(job);
  } catch (error) {
    console.log("Something went wrong: Service:deleteJob:", error);
    throw new Error(error);
  }
};

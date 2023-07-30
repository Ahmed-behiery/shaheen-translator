const jobService = require("../service/jobService");
const constants = require("../constants");

// create job
module.exports.createJob = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await jobService.createJob(req.body);
    response.status = 200;
    response.message = constants.jobMessage.JOB_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createJob:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

// get all jobs
module.exports.getAllJobs = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await jobService.getAllJobs(req.query);
    response.status = 200;
    response.message = constants.jobMessage.JOB_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllJobs:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getJobById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await jobService.getJobById(req.params);
    response.status = 200;
    response.message = constants.jobMessage.JOB_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getJobById:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateJob = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await jobService.updateJob({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.jobMessage.JOB_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateJob:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteJob = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await jobService.deleteJob(req.params);
    response.status = 200;
    response.message = constants.jobMessage.JOB_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteJob:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

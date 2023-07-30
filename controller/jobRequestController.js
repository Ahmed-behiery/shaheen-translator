const jobRequestService = require("../service/jobRequestService");
const constants = require("../constants");

// create jobRequest
module.exports.createJobRequest = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await jobRequestService.createJobRequest(req);
    response.status = 200;
    response.message = constants.jobRequestMessage.JOB_REQUEST_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createJobRequest:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

// get all jobRequests
module.exports.getAllJobRequests = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await jobRequestService.getAllJobRequests(
      req.query
    );
    response.status = 200;
    response.message = constants.jobRequestMessage.JOB_REQUEST_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllJobRequests:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getJobRequestById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await jobRequestService.getJobRequestById(
      req.params
    );
    response.status = 200;
    response.message = constants.jobRequestMessage.JOB_REQUEST_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getJobRequestById:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateJobRequest = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await jobRequestService.updateJobRequest({
      id: req.params.id,
      req,
    });
    response.status = 200;
    response.message = constants.jobRequestMessage.JOB_REQUEST_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateJobRequest:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteJobRequest = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await jobRequestService.deleteJobRequest(
      req.params
    );
    response.status = 200;
    response.message = constants.jobRequestMessage.JOB_REQUEST_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteJobRequest:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

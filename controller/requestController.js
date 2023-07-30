const requestService = require("../service/requestService");
const constants = require("../constants");

// create request
module.exports.createRequest = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await requestService.createRequest(req);
    response.status = 200;
    response.message = constants.requestMessage.REQUEST_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createRequest:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

// get all requests
module.exports.getAllRequests = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await requestService.getAllRequests(req.query);
    response.status = 200;
    response.message = constants.requestMessage.REQUEST_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllRequests:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getRequestById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await requestService.getRequestById(req.params);
    response.status = 200;
    response.message = constants.requestMessage.REQUEST_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getRequestById:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateRequest = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await requestService.updateRequest({
      id: req.params.id,
      req,
    });
    response.status = 200;
    response.message = constants.requestMessage.REQUEST_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateRequest:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteRequest = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await requestService.deleteRequest(req.params);
    response.status = 200;
    response.message = constants.requestMessage.REQUEST_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteRequest:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

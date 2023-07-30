const serviceService = require("../service/serviceService");
const constants = require("../constants");

// create service
module.exports.createService = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await serviceService.createService(req);
    response.status = 200;
    response.message = constants.serviceMessage.SERVICE_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createService:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

// get all services
module.exports.getAllServices = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await serviceService.getAllServices(req.query);
    response.status = 200;
    response.message = constants.serviceMessage.SERVICE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllServices:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getServiceById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await serviceService.getServiceById(req.params);
    response.status = 200;
    response.message = constants.serviceMessage.SERVICE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getServiceById:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateService = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const service = await serviceService.getServiceById(req.params);
    req.body.image = service.image;
    req.body.related_images = service.related_images;

    const responseFromService = await serviceService.updateService({
      id: req.params.id,
      request: req,
    });
    response.status = 200;
    response.message = constants.serviceMessage.SERVICE_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateService:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteService = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await serviceService.deleteService(req.params);
    response.status = 200;
    response.message = constants.serviceMessage.SERVICE_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteService:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

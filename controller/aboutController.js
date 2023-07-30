const aboutService = require("../service/aboutService");
const constants = require("../constants");

// create about
module.exports.createAbout = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await aboutService.createAbout(req);
    response.status = 200;
    response.message = constants.aboutMessage.ABOUT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createAbout:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

// get all Abouts
module.exports.getAllAbouts = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await aboutService.getAllAbouts(req.query);
    response.status = 200;
    response.message = constants.aboutMessage.ABOUT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllAbouts:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAboutById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await aboutService.getAboutById(req.params);
    response.status = 200;
    response.message = constants.aboutMessage.ABOUT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAboutById:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateAbout = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const about = await aboutService.getAboutById(req.params);
    req.body.image = about.image;
    req.body.imageSlider = about.imageSlider;

    const responseFromService = await aboutService.updateAbout({
      id: req.params.id,
      request: req,
    });
    response.status = 200;
    response.message = constants.aboutMessage.ABOUT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateAbout:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteAbout = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await aboutService.deleteAbout(req.params);
    response.status = 200;
    response.message = constants.aboutMessage.ABOUT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteAbout:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

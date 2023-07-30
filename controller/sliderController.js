const sliderService = require("../service/sliderService");
const constants = require("../constants");

// create slider
module.exports.createSlider = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await sliderService.createSlider(req);
    response.status = 200;
    response.message = constants.sliderMessage.SLIDER_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createSlider:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

// get all sliders
module.exports.getAllSliders = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await sliderService.getAllSliders(req.query);
    response.status = 200;
    response.message = constants.sliderMessage.SLIDER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllSliders:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getSliderById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await sliderService.getSliderById(req.params);
    response.status = 200;
    response.message = constants.sliderMessage.SLIDER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getSliderById:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateSlider = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const slider = await sliderService.getSliderById(req.params);
    req.body.image = slider.image;

    const responseFromService = await sliderService.updateSlider({
      id: req.params.id,
      request: req,
    });
    response.status = 200;
    response.message = constants.sliderMessage.SLIDER_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateSlider:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteSlider = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await sliderService.deleteSlider(req.params);
    response.status = 200;
    response.message = constants.sliderMessage.SLIDER_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteSlider:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

const settingsService = require("../service/settingsService");
const constants = require("../constants");

// create product
module.exports.createSettings = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await settingsService.createSettings(req.body);
    response.status = 200;
    response.message = constants.SettingsMessage.SETTING_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createSettings:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllSettings = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await settingsService.getAllSettings(req.query);
    response.status = 200;
    response.message = constants.SettingsMessage.SETTING_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllSettings:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getSettingById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await settingsService.getSettingById(
      req.params
    );
    response.status = 200;
    response.message = constants.SettingsMessage.SETTING_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getSettingById:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateSetting = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await settingsService.updateSetting({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.SettingsMessage.SETTING_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateSetting:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteSetting = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await settingsService.deleteSetting(req.params);
    response.status = 200;
    response.message = constants.SettingsMessage.SETTING_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteSetting:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

const constants = require("../constants");
const adminService = require("../service/adminService");

module.exports.signup = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await adminService.signup(req.body);
    response.status = 200;
    response.message = constants.adminMessage.SIGNUP_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: signup:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.login = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await adminService.login(req.body);
    response.status = 200;
    response.message = constants.adminMessage.LOGIN_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: login:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getUser = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await adminService.getUserById(req.params);
    response.status = 200;
    response.message = constants.adminMessage.USER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getUserById:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

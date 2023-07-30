const statisticsService = require("../service/statisticsService");
const constants = require("../constants");

// create statistics
module.exports.createStatistics = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await statisticsService.createStatistics(
      req.body
    );
    response.status = 200;
    response.message = constants.statisticsMessage.STATISTICS_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createStatistics:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

// get all Statistics
module.exports.getAllStatistics = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await statisticsService.getAllStatistics(
      req.query
    );
    response.status = 200;
    response.message = constants.statisticsMessage.STATISTICS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllStatistics:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getStatisticsById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await statisticsService.getStatisticsById(
      req.params
    );
    response.status = 200;
    response.message = constants.statisticsMessage.STATISTICS_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getStatisticsById:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateStatistics = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await statisticsService.updateStatistics({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.statisticsMessage.STATISTICS_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateStatistics:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteStatistics = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await statisticsService.deleteStatistics(
      req.params
    );
    response.status = 200;
    response.message = constants.statisticsMessage.STATISTICS_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteStatistics:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

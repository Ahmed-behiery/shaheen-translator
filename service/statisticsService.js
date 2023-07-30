const Statistics = require("../database/models/statisticsModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");

const ITEMS_PER_PAGE = 20;

// create statistics
module.exports.createStatistics = async (serviceData) => {
  try {
    let statistics = new Statistics({ ...serviceData });
    let result = await statistics.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createStatistics:", error);
    throw new Error(error);
  }
};

module.exports.getAllStatistics = async (query) => {
  try {
    const page = +query.page || 1;
    let statisticsData = {};

    let totalItems = await Statistics.find().countDocuments();

    let statistics = await Statistics.find({})
      .sort({ createdAt: "desc" })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    statisticsData = {
      statistics,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    return statisticsData;
  } catch (error) {
    console.log("Something went wrong: Service: getAllStatisticss:", error);
    throw new Error(error);
  }
};

module.exports.getStatisticsById = async ({ id }) => {
  try {
    checkObjectId(id);
    let statistics = await Statistics.findById(id);
    if (!statistics) {
      throw new Error(constants.statisticsMessage.STATISTICS_NOT_FOUND);
    }
    return formatMongoData(statistics);
  } catch (error) {
    console.log("Something went wrong: Service: getStatisticsById:", error);
    throw new Error(error);
  }
};

module.exports.updateStatistics = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let statistics = await Statistics.findOneAndUpdate(
      { _id: id },
      updateInfo,
      {
        new: true,
      }
    );
    if (!statistics) {
      throw new Error(constants.statisticsMessage.STATISTICS_NOT_FOUND);
    }
    return formatMongoData(statistics);
  } catch (error) {
    console.log("Something went wrong: Service: updateStatistics:", error);
    throw new Error(error);
  }
};

module.exports.deleteStatistics = async ({ id }) => {
  try {
    checkObjectId(id);
    let statistics = await Statistics.findByIdAndDelete(id);
    if (!statistics) {
      throw new Error(constants.statisticsMessage.STATISTICS_NOT_FOUND);
    }
    return formatMongoData(statistics);
  } catch (error) {
    console.log("Something went wrong: Service:deleteStatistics:", error);
    throw new Error(error);
  }
};

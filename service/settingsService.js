const Settings = require("../database/models/settingsModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");

const ITEMS_PER_PAGE = 20;
// create Settings
module.exports.createSettings = async (serviceData) => {
  try {
    let settings = new Settings({ ...serviceData });
    let result = await settings.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createSettings:", error);
    throw new Error(error);
  }
};

module.exports.getAllSettings = async (query) => {
  try {
    const page = +query.page || 1;
    let settingData = {};

    let totalItems = await Settings.find().countDocuments();

    let settings = await Settings.find({})
      .sort({ createdAt: "desc" })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    settingData = {
      settings,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    return settingData;
  } catch (error) {
    console.log("Something went wrong: Service: getAllSettings:", error);
    throw new Error(error);
  }
};

module.exports.getSettingById = async ({ id }) => {
  try {
    checkObjectId(id);
    let settings = await Settings.findById(id);
    if (!settings) {
      throw new Error(constants.SettingsMessage.SETTING_NOT_FOUND);
    }
    return formatMongoData(settings);
  } catch (error) {
    console.log("Something went wrong: Service: getSettingById:", error);
    throw new Error(error);
  }
};

module.exports.updateSetting = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let settings = await Settings.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!settings) {
      throw new Error(constants.settingsMessage.SETTING_NOT_FOUND);
    }
    return formatMongoData(settings);
  } catch (error) {
    console.log("Something went wrong: Service: updateSetting:", error);
    throw new Error(error);
  }
};

module.exports.deleteSetting = async ({ id }) => {
  try {
    checkObjectId(id);
    let Settings = await Settings.findByIdAndDelete(id);
    if (!Settings) {
      throw new Error(constants.productMessage.SETTING_NOT_FOUND);
    }
    return formatMongoData(Settings);
  } catch (error) {
    console.log("Something went wrong: Service: deleteSettings:", error);
    throw new Error(error);
  }
};

const Slider = require("../database/models/sliderModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dax2tujx9",
  api_key: "427563815881951",
  api_secret: "CDp2kFwXnE7HS2Fevk9j3DQp15s",
});

const ITEMS_PER_PAGE = 20;
// create slider
module.exports.createSlider = async (req) => {
  try {
    let image = "";

    req.files.forEach((file) => {
      if (file.fieldname === "image") {
        image = file.filename + "." + file.mimetype.split("/")[1];
      }
    });

    req.body.image = image;
    let slider = new Slider({ ...req.body });
    let result = await slider.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createSlider:", error);
    throw new Error(error);
  }
};

module.exports.getAllSliders = async (query) => {
  try {
    const page = +query.page || 1;
    let sliderData = {};

    let totalItems = await Slider.find().countDocuments();

    let sliders = await Slider.find({})
      .sort({ createdAt: "desc" })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    sliderData = {
      sliders,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    return sliderData;
  } catch (error) {
    console.log("Something went wrong: Service: getAllSliders:", error);
    throw new Error(error);
  }
};

module.exports.getSliderById = async ({ id }) => {
  try {
    checkObjectId(id);
    let slider = await Slider.findById(id);
    if (!slider) {
      throw new Error(constants.sliderMessage.SLIDER_NOT_FOUND);
    }
    return formatMongoData(slider);
  } catch (error) {
    console.log("Something went wrong: Service: getSliderById:", error);
    throw new Error(error);
  }
};

module.exports.updateSlider = async ({ id, request }) => {
  try {
    checkObjectId(id);

    let image = "";
    let imageFlag = false;

    request.files.forEach((file) => {
      if (file.fieldname === "image") {
        image = file.filename + "." + file.mimetype.split("/")[1];
        imageFlag = true;
      }
    });

    request.body.image = imageFlag ? image : request.body.image;

    let slider = await Slider.findOneAndUpdate({ _id: id }, request.body, {
      new: true,
    });
    if (!slider) {
      throw new Error(constants.sliderMessage.SLIDER_NOT_FOUND);
    }
    return formatMongoData(slider);
  } catch (error) {
    console.log("Something went wrong: Service: updateSlider:", error);
    throw new Error(error);
  }
};

module.exports.deleteSlider = async ({ id }) => {
  try {
    checkObjectId(id);
    let slider = await Slider.findByIdAndDelete(id);

    if (!slider) {
      throw new Error(constants.sliderMessage.SLIDER_NOT_FOUND);
    }
    if (slider.image) {
      cloudinary.uploader.destroy(
        slider.image.split(".")[0],
        function (error, result) {
          if (error) {
            throw new Error(error);
          } else {
            console.log(result);
          }
        }
      );
    }
    return formatMongoData(slider);
  } catch (error) {
    console.log("Something went wrong: Service: deleteSlider:", error);
    throw new Error(error);
  }
};

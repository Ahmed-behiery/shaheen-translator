const About = require("../database/models/aboutModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dax2tujx9",
  api_key: "427563815881951",
  api_secret: "CDp2kFwXnE7HS2Fevk9j3DQp15s",
});

const ITEMS_PER_PAGE = 20;

// create about
module.exports.createAbout = async (req) => {
  try {
    let image = "";
    let imageSlider = "";

    req.files.forEach((file) => {
      if (file.fieldname === "image") {
        image = file.filename + "." + file.mimetype.split("/")[1];
      }
      if (file.fieldname === "imageSlider") {
        imageSlider = file.filename + "." + file.mimetype.split("/")[1];
      }
    });

    req.body.image = image;
    req.body.imageSlider = imageSlider;

    let about = new About({ ...req.body });
    let result = await about.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createAbout:", error);
    throw new Error(error);
  }
};

module.exports.getAllAbouts = async (query) => {
  try {
    const page = +query.page || 1;
    let aboutData = {};

    let totalItems = await About.find().countDocuments();
    let abouts = await About.find({})
      .sort({ createdAt: "desc" })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    aboutData = {
      abouts,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    return aboutData;
  } catch (error) {
    console.log("Something went wrong: Service: getAllAbouts:", error);
    throw new Error(error);
  }
};

module.exports.getAboutById = async ({ id }) => {
  try {
    checkObjectId(id);
    let about = await About.findById(id);
    if (!about) {
      throw new Error(constants.aboutMessage.ABOUT_NOT_FOUND);
    }
    return formatMongoData(about);
  } catch (error) {
    console.log("Something went wrong: Service: getAboutById:", error);
    throw new Error(error);
  }
};

module.exports.updateAbout = async ({ id, request }) => {
  try {
    checkObjectId(id);

    let image = "";
    let imageFlag = false;
    let imageSlider = "";
    let imageSliderFlag = false;

    request.files.forEach((file) => {
      if (file.fieldname === "image") {
        image = file.filename + "." + file.mimetype.split("/")[1];
        imageFlag = true;
      }
      if (file.fieldname === "imageSlider") {
        imageSlider = file.filename + "." + file.mimetype.split("/")[1];
        imageSliderFlag = true;
      }
    });

    request.body.image = imageFlag ? image : request.body.image;
    request.body.imageSlider = imageSliderFlag
      ? imageSlider
      : request.body.imageSlider;

    let about = await About.findOneAndUpdate({ _id: id }, request.body, {
      new: true,
    });
    if (!about) {
      throw new Error(constants.aboutMessage.ABOUT_NOT_FOUND);
    }
    return formatMongoData(about);
  } catch (error) {
    console.log("Something went wrong: Service: updateAbout:", error);
    throw new Error(error);
  }
};

module.exports.deleteAbout = async ({ id }) => {
  try {
    checkObjectId(id);
    let about = await About.findByIdAndDelete(id);

    if (!about) {
      throw new Error(constants.aboutMessage.ABOUT_NOT_FOUND);
    }
    if (about.image) {
      cloudinary.uploader.destroy(
        about.image.split(".")[0],
        function (error, result) {
          if (error) {
            throw new Error(error);
          } else {
            console.log(result);
          }
        }
      );
    }
    return formatMongoData(about);
  } catch (error) {
    console.log("Something went wrong: Service: deleteAbout:", error);
    throw new Error(error);
  }
};

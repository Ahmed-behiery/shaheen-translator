const Service = require("../database/models/serviceModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dax2tujx9",
  api_key: "427563815881951",
  api_secret: "CDp2kFwXnE7HS2Fevk9j3DQp15s",
});

const ITEMS_PER_PAGE = 20;

// create service
module.exports.createService = async (req) => {
  try {
    let image = "";
    let related_images = [];

    req.files.forEach((file) => {
      if (file.fieldname === "image") {
        image = file.filename + "." + file.mimetype.split("/")[1];
      } else if (file.fieldname === "related_images") {
        related_images.push(file.filename + "." + file.mimetype.split("/")[1]);
      }
    });

    req.body.image = image;
    req.body.related_images = related_images;
    let service = new Service({ ...req.body });
    let result = await service.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createService:", error);
    throw new Error(error);
  }
};

module.exports.getAllServices = async (query) => {
  try {
    const page = +query.page || 1;
    let serviceData = {};

    let totalItems = await Service.find().countDocuments();

    let services = await Service.find({})
      .sort({ createdAt: "desc" })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    serviceData = {
      services,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    return serviceData;
  } catch (error) {
    console.log("Something went wrong: Service: getAllServices:", error);
    throw new Error(error);
  }
};

module.exports.getServiceById = async ({ id }) => {
  try {
    checkObjectId(id);
    let service = await Service.findById(id);
    if (!service) {
      throw new Error(constants.serviceMessage.SERVICE_NOT_FOUND);
    }
    return formatMongoData(service);
  } catch (error) {
    console.log("Something went wrong: Service: getServiceById:", error);
    throw new Error(error);
  }
};

module.exports.updateService = async ({ id, request }) => {
  try {
    checkObjectId(id);

    let image = "";
    let imageFlag = false;
    let related_images = [];
    let related_imagesFlag = false;

    request.files.forEach((file) => {
      if (file.fieldname === "image") {
        image = file.filename + "." + file.mimetype.split("/")[1];
        imageFlag = true;
      }
      if (file.fieldname === "related_images") {
        related_images.push(file.filename + "." + file.mimetype.split("/")[1]);
        related_imagesFlag = true;
      }
    });

    request.body.image = imageFlag ? image : request.body.image;
    request.body.related_images = [
      ...request.body.related_images,
      ...related_images,
    ];

    let service = await Service.findOneAndUpdate({ _id: id }, request.body, {
      new: true,
    });
    if (!service) {
      throw new Error(constants.serviceMessage.SERVICE_NOT_FOUND);
    }
    return formatMongoData(service);
  } catch (error) {
    console.log("Something went wrong: Service: updateService:", error);
    throw new Error(error);
  }
};

module.exports.deleteService = async ({ id }) => {
  try {
    checkObjectId(id);
    let service = await Service.findByIdAndDelete(id);

    if (!service) {
      throw new Error(constants.serviceMessage.SERVICE_NOT_FOUND);
    }
    if (service.image) {
      cloudinary.uploader.destroy(
        service.image.split(".")[0],
        function (error, result) {
          if (error) throw new Error(error);
        }
      );
    } else if (service.related_images.length > 0) {
      for (let i = 0; i < related_images.length; i++) {
        cloudinary.uploader.destroy(
          service.related_images[i].split(".")[0],
          function (error, result) {
            if (error) throw new Error(error);
          }
        );
      }
    }
    return formatMongoData(service);
  } catch (error) {
    console.log("Something went wrong: Service: deleteService:", error);
    throw new Error(error);
  }
};

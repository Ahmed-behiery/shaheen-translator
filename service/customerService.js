const Customer = require("../database/models/customerModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dax2tujx9",
  api_key: "427563815881951",
  api_secret: "CDp2kFwXnE7HS2Fevk9j3DQp15s",
});

const ITEMS_PER_PAGE = 20;
// create customer
module.exports.createCustomer = async (req) => {
  try {
    let image = "";

    req.files.forEach((file) => {
      if (file.fieldname === "image") {
        image = file.filename + "." + file.mimetype.split("/")[1];
      }
    });

    req.body.image = image;
    let customer = new Customer({ ...req.body });
    let result = await customer.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createCustomer:", error);
    throw new Error(error);
  }
};

module.exports.getAllCustomers = async (query) => {
  try {
    const page = +query.page || 1;
    let customerData = {};

    let totalItems = await Customer.find().countDocuments();

    let customers = await Customer.find({})
      .sort({ createdAt: "desc" })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    customerData = {
      customers,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    return customerData;
  } catch (error) {
    console.log("Something went wrong: Service: getAllCustomers:", error);
    throw new Error(error);
  }
};

module.exports.getCustomerById = async ({ id }) => {
  try {
    checkObjectId(id);
    let customer = await Customer.findById(id);
    if (!customer) {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_FOUND);
    }
    return formatMongoData(customer);
  } catch (error) {
    console.log("Something went wrong: Service: getCustomerById:", error);
    throw new Error(error);
  }
};

module.exports.updateCustomer = async ({ id, request }) => {
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

    let customer = await Customer.findOneAndUpdate({ _id: id }, request.body, {
      new: true,
    });
    if (!customer) {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_FOUND);
    }
    return formatMongoData(customer);
  } catch (error) {
    console.log("Something went wrong: Service: updateCustomer:", error);
    throw new Error(error);
  }
};

module.exports.deleteCustomer = async ({ id }) => {
  try {
    checkObjectId(id);
    let customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      throw new Error(constants.customerMessage.CUSTOMER_NOT_FOUND);
    }
    if (customer.image) {
      cloudinary.uploader.destroy(
        customer.image.split(".")[0],
        function (error, result) {
          if (error) {
            throw new Error(error);
          } else {
            console.log(result);
          }
        }
      );
    }
    return formatMongoData(customer);
  } catch (error) {
    console.log("Something went wrong: Service: deleteCustomer:", error);
    throw new Error(error);
  }
};

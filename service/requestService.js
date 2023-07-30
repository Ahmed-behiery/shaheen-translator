const Request = require("../database/models/requestModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");
const cloudinary = require("cloudinary").v2;
const { sendMailFun } = require("../utils/sendMail");
var fs = require("fs");
var axios = require("axios");
var FormData = require("form-data");

const ITEMS_PER_PAGE = 20;

cloudinary.config({
  cloud_name: "dax2tujx9",
  api_key: "427563815881951",
  api_secret: "CDp2kFwXnE7HS2Fevk9j3DQp15s",
});

// create request
module.exports.createRequest = async (req) => {
  try {
    const file = req.files.file;
    const filename = req.files.file.name;

    file.mv("./uploads/" + filename, (err) => {
      if (err) {
        throw new Error("error is occurred: " + err);
      } else {
        req.body.file = "/uploads/" + filename;
      }
    });

    req.body.file = "https://shaheen-files.herokuapp.com/uploads/" + filename;

    const emailBody = `
   <h3>Dear Shaheen Company,</h3>

    <p>This is a translation request from the client, (  ${
      req.body.name
    } )</p>. Click the link below to proceed.<br />
    <p>
      <a href=${req.body.file}>The File to be translated</a>
    </p>
        
    <strong>Client Data</strong>
    <p>Name: <span>${req.body.name}</span></p>
    <p>Email: <span>${req.body.email}</span></p>
    <p>Mobile No: <span>${req.body.phone}</span></p>
    <p>Client Comment: <span>${
      req.body.comment ? req.body.comment : "No More"
    }</span></p>
    <br />

    Best regards,
    `;

    sendMailFun(`Translating Request Making ( ${req.body.name} )`, emailBody);

    let request = new Request({ ...req.body });
    let result = await request.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: request: createRequest:", error);
    throw new Error(error);
  }
};

module.exports.getAllRequests = async (query) => {
  try {
    const page = +query.page || 1;
    let requestData = {};

    let totalItems = await Request.find().countDocuments();

    let requests = await Request.find({})
      .sort({ createdAt: "desc" })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    requestData = {
      requests,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    return requestData;
  } catch (error) {
    console.log("Something went wrong: request: getAllRequests:", error);
    throw new Error(error);
  }
};

module.exports.getRequestById = async ({ id }) => {
  try {
    checkObjectId(id);
    let request = await Request.findById(id);
    if (!request) {
      throw new Error(constants.requestMessage.REQUEST_NOT_FOUND);
    }
    return formatMongoData(request);
  } catch (error) {
    console.log("Something went wrong: request: getRequestById:", error);
    throw new Error(error);
  }
};

module.exports.updateRequest = async ({ id, req }) => {
  try {
    checkObjectId(id);

    if (req.files.length > 0) {
      var data = new FormData();
      data.append("file", new Buffer(req.files[0].buffer));

      let uploadFileRes = await axios.post(
        "https://shaheen-files.herokuapp.com/",
        data
      );

      if (uploadFileRes.data.status === 200) {
        req.body.file =
          "https://shaheen-files.herokuapp.com/" +
          uploadFileRes.data.data.url.split("/")[2];
      } else {
        throw new Error(uploadFileRes.data.message);
      }
    }

    let request = await Request.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!request) {
      throw new Error(constants.requestMessage.REQUEST_NOT_FOUND);
    }
    return formatMongoData(request);
  } catch (error) {
    console.log("Something went wrong: request: updateRequest:", error);
    throw new Error(error);
  }
};

module.exports.deleteRequest = async ({ id }) => {
  try {
    checkObjectId(id);
    let request = await Request.findByIdAndDelete(id);

    if (!request) {
      throw new Error(constants.requestMessage.REQUEST_NOT_FOUND);
    }
    return formatMongoData(request);
  } catch (error) {
    console.log("Something went wrong: request: deleteRequest:", error);
    throw new Error(error);
  }
};

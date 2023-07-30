const Admin = require("../database/models/adminModel");
const { formatMongoData } = require("../helper/dbHelper");
const constants = require("../constants");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.signup = async ({ email, password }) => {
  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      throw new Error(constants.adminMessage.DUPLICATE_EMAIL);
    }
    password = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({ email, password });
    let result = await newAdmin.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: signup:", error);
    throw new Error(error);
  }
};

module.exports.login = async ({ email, password }) => {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error(constants.adminMessage.admin_NOT_FOUND);
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      throw new Error(constants.adminMessage.INVALID_PASSWORD);
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.SECRET_KEY || "my-secret-key",
      { expiresIn: "7d" }
    );
    return { token, id: admin._id };
  } catch (error) {
    console.log("Something went wrong: Service: signup:", error);
    throw new Error(error);
  }
};

module.exports.getUserById = async ({ id }) => {
  try {
    let admin = await Admin.findById(id);
    if (!admin) {
      throw new Error(constants.adminMessage.USER_NOT_FOUND);
    }
    return formatMongoData(admin);
  } catch (error) {
    console.log("Something went wrong: Service: getUserById:", error);
    throw new Error(error);
  }
};

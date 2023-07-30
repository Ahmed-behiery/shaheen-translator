const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const customerSchema = require("../apiSchema/customerSchema");
const tokenValidation = require("../middleware/tokenValidation");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dax2tujx9",
  api_key: "427563815881951",
  api_secret: "CDp2kFwXnE7HS2Fevk9j3DQp15s",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  foldeuploadProductImager: "Shaheen",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 1688, height: 600, crop: "scale" }],
});
const parser = multer({ storage: storage });

router.post(
  "/",
  //   tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(customerSchema.createCustomerSchema),
  parser.any(),
  customerController.createCustomer
);

router.get(
  "/:id",
  //   tokenValidation.validateToken,
  customerController.getCustomerById
);

router.put(
  "/:id",
  //   tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(customerSchema.updateCustomer),
  parser.any(),
  customerController.updateCustomer
);

router.get(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(customerSchema.getAllCustomersSchema),
  customerController.getAllCustomers
);

router.delete(
  "/:id",
  //   tokenValidation.validateToken,
  customerController.deleteCustomer
);

module.exports = router;

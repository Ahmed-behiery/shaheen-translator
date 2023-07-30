const express = require("express");
const router = express.Router();
const serviceController = require("../controller/serviceController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const serviceSchema = require("../apiSchema/serviceSchema");
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
  // joiSchemaValidation.validateBody(serviceSchema.createServiceSchema),
  parser.any(),
  serviceController.createService
);

router.get(
  "/:id",
  //   tokenValidation.validateToken,
  serviceController.getServiceById
);

router.put(
  "/:id",
  //   tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(serviceSchema.updateService),
  parser.any(),
  serviceController.updateService
);

router.get(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(serviceSchema.getAllServicesSchema),
  serviceController.getAllServices
);

router.delete(
  "/:id",
  //   tokenValidation.validateToken,
  serviceController.deleteService
);

module.exports = router;

const express = require("express");
const router = express.Router();
const aboutController = require("../controller/aboutController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const aboutSchema = require("../apiSchema/aboutSchema");
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
  // joiSchemaValidation.validateBody(aboutSchema.createAboutSchema),
  parser.any(),
  aboutController.createAbout
);

router.get(
  "/:id",
  //   tokenValidation.validateToken,
  aboutController.getAboutById
);

router.put(
  "/:id",
  //   tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(aboutSchema.updateAbout),
  parser.any(),
  aboutController.updateAbout
);

router.get(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(aboutSchema.getAllAboutsSchema),
  aboutController.getAllAbouts
);

router.delete(
  "/:id",
  //   tokenValidation.validateToken,
  aboutController.deleteAbout
);

module.exports = router;

const express = require("express");
const router = express.Router();
const sliderController = require("../controller/sliderController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const sliderSchema = require("../apiSchema/sliderSchema");
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
  // joiSchemaValidation.validateBody(sliderSchema.createSliderSchema),
  parser.any(),
  sliderController.createSlider
);

router.get(
  "/:id",
  //   tokenValidation.validateToken,
  sliderController.getSliderById
);

router.put(
  "/:id",
  //   tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(sliderSchema.updateSlider),
  parser.any(),
  sliderController.updateSlider
);

router.get(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(sliderSchema.getAllSlidersSchema),
  sliderController.getAllSliders
);

router.delete(
  "/:id",
  //   tokenValidation.validateToken,
  sliderController.deleteSlider
);

module.exports = router;

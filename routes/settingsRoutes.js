const express = require("express");
const router = express.Router();
const settingsController = require("../controller/settingsController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const settingsSchema = require("../apiSchema/settingsSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateBody(settingsSchema.createSettingsSchema),
  settingsController.createSettings
);

router.get(
  "/:id",
  //   tokenValidation.validateToken,
  settingsController.getSettingById
);

router.put(
  "/:id",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateBody(settingsSchema.updateSettings),
  settingsController.updateSetting
);

router.get(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(settingsSchema.getAllSettingsSchema),
  settingsController.getAllSettings
);

router.delete(
  "/:id",
  //   tokenValidation.validateToken,
  settingsController.deleteSetting
);

module.exports = router;

const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const adminSchema = require("../apiSchema/adminSchema");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");

router.post(
  "/signup",
  joiSchemaValidation.validateBody(adminSchema.createAdminSchema),
  adminController.signup
);

router.post(
  "/login",
  joiSchemaValidation.validateBody(adminSchema.login),
  adminController.login
);

router.get("/user/:id", adminController.getUser);

module.exports = router;

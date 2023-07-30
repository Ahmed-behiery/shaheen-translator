const express = require("express");
const router = express.Router();
const contactController = require("../controller/contactController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const contactSchema = require("../apiSchema/contactSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateBody(contactSchema.createContactSchema),
  contactController.createContact
);

router.get(
  "/:id",
  //   tokenValidation.validateToken,
  contactController.getContactById
);

router.put(
  "/:id",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateBody(contactSchema.updateContact),
  contactController.updateContact
);

router.get(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(contactSchema.getAllContactsSchema),
  contactController.getAllContacts
);

router.delete(
  "/:id",
  //   tokenValidation.validateToken,
  contactController.deleteContact
);

module.exports = router;

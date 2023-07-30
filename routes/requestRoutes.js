const express = require("express");
const router = express.Router();
const requestController = require("../controller/requestController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const requestSchema = require("../apiSchema/requestSchema");
const tokenValidation = require("../middleware/tokenValidation");
const multer = require("multer");

const parser = multer();

//

router.post(
  "/",
  //   tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(requestSchema.createRequestSchema),
  // parser.any(),
  requestController.createRequest
);

router.get(
  "/:id",
  //   tokenValidation.validateToken,
  requestController.getRequestById
);

router.put(
  "/:id",
  //   tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(requestSchema.updateRequest),
  parser.any(),
  requestController.updateRequest
);

router.get(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(requestSchema.getAllRequestsSchema),
  requestController.getAllRequests
);

router.delete(
  "/:id",
  //   tokenValidation.validateToken,
  requestController.deleteRequest
);

module.exports = router;

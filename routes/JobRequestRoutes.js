const express = require("express");
const router = express.Router();
const jobRequestController = require("../controller/jobRequestController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const jobRequestSchema = require("../apiSchema/jobRequestSchema");
const tokenValidation = require("../middleware/tokenValidation");
const multer = require("multer");

const parser = multer();

router.post(
  "/",
  //   tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(jobRequestSchema.createJobRequestSchema),
  // parser.any(),
  jobRequestController.createJobRequest
);

router.get(
  "/:id",
  //   tokenValidation.validateToken,
  jobRequestController.getJobRequestById
);

router.put(
  "/:id",
  //   tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(jobRequestSchema.updateJobRequest),
  parser.any(),
  jobRequestController.updateJobRequest
);

router.get(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(
    jobRequestSchema.getAllJobRequestsSchema
  ),
  jobRequestController.getAllJobRequests
);

router.delete(
  "/:id",
  //   tokenValidation.validateToken,
  jobRequestController.deleteJobRequest
);

module.exports = router;

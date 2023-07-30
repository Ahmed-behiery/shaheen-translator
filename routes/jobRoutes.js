const express = require("express");
const router = express.Router();
const jobController = require("../controller/jobController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const jobSchema = require("../apiSchema/jobSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateBody(jobSchema.createJobSchema),
  jobController.createJob
);

router.get(
  "/:id",
  //   tokenValidation.validateToken,
  jobController.getJobById
);

router.put(
  "/:id",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateBody(jobSchema.updateJob),
  jobController.updateJob
);

router.get(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(jobSchema.getAllJobsSchema),
  jobController.getAllJobs
);

router.delete(
  "/:id",
  //   tokenValidation.validateToken,
  jobController.deleteJob
);

module.exports = router;

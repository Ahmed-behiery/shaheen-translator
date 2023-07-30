const express = require("express");
const router = express.Router();
const statisticsController = require("../controller/statisticsController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const statisticsSchema = require("../apiSchema/statisticsSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateBody(statisticsSchema.createStatisticsSchema),
  statisticsController.createStatistics
);

router.get(
  "/:id",
  //   tokenValidation.validateToken,
  statisticsController.getStatisticsById
);

router.put(
  "/:id",
  //   tokenValidation.validateToken,
  // joiSchemaValidation.validateBody(statisticsSchema.updateStatistics),
  statisticsController.updateStatistics
);

router.get(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(
    statisticsSchema.getAllStatisticsSchema
  ),
  statisticsController.getAllStatistics
);

router.delete(
  "/:id",
  //   tokenValidation.validateToken,
  statisticsController.deleteStatistics
);

module.exports = router;

const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const commentSchema = require("../apiSchema/commentSchema");
const tokenValidation = require("../middleware/tokenValidation");

router.post(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateBody(commentSchema.createCommentSchema),
  commentController.createComment
);

router.get(
  "/:id",
  //   tokenValidation.validateToken,
  commentController.getCommentById
);

router.put(
  "/:id",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateBody(commentSchema.updateComment),
  commentController.updateComment
);

router.get(
  "/",
  //   tokenValidation.validateToken,
  joiSchemaValidation.validateQueryParams(commentSchema.getAllCommentsSchema),
  commentController.getAllComments
);

router.delete(
  "/:id",
  //   tokenValidation.validateToken,
  commentController.deleteComment
);

module.exports = router;

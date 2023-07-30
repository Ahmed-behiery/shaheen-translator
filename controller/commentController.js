const commentService = require("../service/commentService");
const constants = require("../constants");

// create comment
module.exports.createComment = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await commentService.createComment(req.body);
    response.status = 200;
    response.message = constants.commentMessage.COMMENT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createComment:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

// get all comments
module.exports.getAllComments = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await commentService.getAllComments(req.query);
    response.status = 200;
    response.message = constants.commentMessage.COMMENT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllComments:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getCommentById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await commentService.getCommentById(req.params);
    response.status = 200;
    response.message = constants.commentMessage.COMMENT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getCommentById:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateComment = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await commentService.updateComment({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.commentMessage.COMMENT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateComment:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteComment = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await commentService.deleteComment(req.params);
    response.status = 200;
    response.message = constants.commentMessage.COMMENT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteComment:", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

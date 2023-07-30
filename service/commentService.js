const Comment = require("../database/models/commentModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");

const ITEMS_PER_PAGE = 20;
// create comment
module.exports.createComment = async (serviceData) => {
  try {
    let comment = new Comment({ ...serviceData });
    let result = await comment.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createComment:", error);
    throw new Error(error);
  }
};

module.exports.getAllComments = async (query) => {
  try {
    const page = +query.page || 1;
    let commentData = {};

    let totalItems = await Comment.find().countDocuments();
    let comments = await Comment.find({})
      .sort({ createdAt: "desc" })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    commentData = {
      comments,
      totalItems,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    return commentData;
  } catch (error) {
    console.log("Something went wrong: Service: getAllComments:", error);
    throw new Error(error);
  }
};

module.exports.getCommentById = async ({ id }) => {
  try {
    checkObjectId(id);
    let comment = await Comment.findById(id);
    if (!comment) {
      throw new Error(constants.commentMessage.COMMENT_NOT_FOUND);
    }
    return formatMongoData(comment);
  } catch (error) {
    console.log("Something went wrong: Service: getCommentById:", error);
    throw new Error(error);
  }
};

module.exports.updateComment = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let comment = await Comment.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!comment) {
      throw new Error(constants.commentMessage.COMMENT_NOT_FOUND);
    }
    return formatMongoData(comment);
  } catch (error) {
    console.log("Something went wrong: Service: updateComment:", error);
    throw new Error(error);
  }
};

module.exports.deleteComment = async ({ id }) => {
  try {
    checkObjectId(id);
    let comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      throw new Error(constants.commentMessage.COMMENT_NOT_FOUND);
    }
    return formatMongoData(comment);
  } catch (error) {
    console.log("Something went wrong: Service: deleteComment:", error);
    throw new Error(error);
  }
};

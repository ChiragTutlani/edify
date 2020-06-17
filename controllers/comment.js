const Comment = require("../models/Comment");
const Post = require("../models/Post");

// @desc  Create a comment
// @route POST /api/v1/comment
// @access  Private
exports.createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);
    if (!post) {
      res.status(400).json({
        success: false,
        error: "Post does not exist",
      });
      return;
    }
    req.body.author = req.user._id;
    const comment = await Comment.create(req.body);
    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Get all comments
// @route GET /api/v1/comment
// @access  Public
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Get all comments of a single post
// @route GET /api/v1/comment/:postId
// @access  Public
exports.getCommentsPost = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    });
    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Delete comment
// @route DELETE /api/v1/comment/:id
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(400).json({
        success: false,
        error: "Comment does not exist",
      });
      return;
    }
    if (comment.author.toString() !== req.user._id.toString()) {
      res.status(400).json({
        success: false,
        error: "invalid request",
      });
      return;
    }
    await comment.remove();
    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

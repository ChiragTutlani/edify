const Post = require("../models/Post");

// @desc  Get all posts
// @route GET /api/v1/post
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Get a post
// @route GET /api/v1/post/:id
// @access  Public
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author")
      .populate("comments");
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Get post by category
// @route GET /api/v1/post/category
// @access  Public
exports.getPostByCategory = async (req, res) => {
  try {
    const categories = req.body.categories;
    const post = await Post.find({
      categories: {
        $in: categories,
      },
    }).populate("author");
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Create a post
// @route POST /api/v1/post
// @access  Private
exports.createPost = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const post = await Post.create(req.body);
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Update a post
// @route PUT /api/v1/post/:id
// @access  Private
exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.user._id.toString()) {
      throw Error("Unauthorized request");
    }
    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Delete a post
// @route DELETE /api/v1/post/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() !== req.user._id.toString()) {
      throw Error("Unauthorized request");
    }
    await post.remove();
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendTokenResponse = require("../middleware/sendTokenResponse");

// @desc  Create an user
// @route POST /api/v1/user
// @access  Public
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Get all users
// @route GET /api/v1/user
// @access  Private
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("posts").select("-password");

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Get an user
// @route GET /api/v1/user/:id
// @access  Private
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("posts")
      .select("-password");

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Get current user
// @route GET /api/v1/user/me
// @access  Private
exports.getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

// @desc  Update an user (updates logged in user and as well as others)
// @route PUT /api/v1/user/:id
// @access  Private
exports.updateUser = async (req, res) => {
  let user = await User.findById(req.params.id).select("-password");

  if (user) {
    try {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
      }
      user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        error: err,
      });
    }
  } else {
    res.status(404).json({
      success: false,
      error: "Bad request",
    });
  }
};

// @desc  Delete current user
// @route DELETE /api/v1/user/me (delete current logged in user)
// @access  Private
exports.deleteCurrentUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

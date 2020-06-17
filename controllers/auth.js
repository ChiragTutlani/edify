const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendTokenResponse = require("../middleware/sendTokenResponse");

// @desc  Login user
// @route GET /api/v1/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(404).json({
        success: false,
        error: "Please enter crediantials",
      });
    }
    let user = await User.findOne({ username: req.body.username })
      .populate("posts")
      .select("+password");
    if (!user) {
      user = await User.findOne({ email: req.body.username })
        .populate("posts")
        .select("+password");
    }
    if (!user) {
      res.status(404).json({
        success: false,
        error: "Invalid crediantials",
      });
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      sendTokenResponse(user, 200, res);
    } else {
      res.status(404).json({
        success: false,
        error: "Invalid crediantials",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

// @desc  Logout user
// @route GET /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  sendTokenResponse(req.user, 200, res, true);
};

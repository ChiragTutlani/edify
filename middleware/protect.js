const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.token) {
      token = req.cookies.token;
    } else {
      throw Error();
    }

    const decodedID = jwt.verify(token, process.env.JWT_SECRET).id;

    // attach logged in user to request
    req.user = await User.findById(decodedID)
      .populate("posts")
      .select("-password");
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: "Unauthorized request",
    });
  }
};

module.exports = protect;

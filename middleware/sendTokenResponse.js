const sendTokenResponse = (user, statusCode, res, emptyToken = false) => {
  if (user.password) {
    delete user.password;
  }

  if (emptyToken) {
    res.status(statusCode).cookie("token", "").json({
      success: true,
      data: user,
    });
    return;
  }

  // Create token
  const token = user.getSignedJWTToken();

  const options = {
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    data: user,
  });
};

module.exports = sendTokenResponse;

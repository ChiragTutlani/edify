const sendTokenResponse = (user, statusCode, res) => {
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

const verifiedUser = (req, res, next) => {
  if (!req.user.verified) {
    res.status(401).json({
      success: false,
      error: "Only verified user can create post",
    });
    return;
  }
  next();
};

module.exports = verifiedUser;

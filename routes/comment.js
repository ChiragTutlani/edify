const express = require("express");
const {
  createComment,
  getComments,
  getCommentsPost,
  deleteComment,
} = require("../controllers/comment");
const protect = require("../middleware/protect");
const verifiedUser = require("../middleware/verified");
const router = express.Router();

router.route("/").post(protect, verifiedUser, createComment).get(getComments);
router.route("/:postId").get(getCommentsPost);
router.route("/:id").delete(protect, deleteComment);

module.exports = router;

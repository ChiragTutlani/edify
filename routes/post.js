const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const protect = require("../middleware/protect");
const verifiedUser = require("../middleware/verified");
const router = express.Router();

router.route("/").get(getPosts).post(protect, verifiedUser, createPost);
router
  .route("/:id")
  .get(getPost)
  .put(protect, verifiedUser, updatePost)
  .delete(protect, verifiedUser, deletePost);

module.exports = router;

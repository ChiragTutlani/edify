const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  deleteCurrentUser,
} = require("../controllers/user");
const protect = require("../middleware/protect");
const router = express.Router();

router.route("/").post(createUser).get(protect, getUsers);
router.route("/me").get(protect, getCurrentUser);
router.route("/:id").get(protect, getUser);
router.route("/:id").put(protect, updateUser);
router.route("/me").delete(protect, deleteCurrentUser);

module.exports = router;

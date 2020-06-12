const express = require("express");
const { login, logout } = require("../controllers/auth");

const router = express.Router();

router.get("/login", login);
router.get("/logout", logout);

module.exports = router;

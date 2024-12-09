const express = require("express");

const doesUserExist = require("../middlewares/user");
const { createUser, signinUser } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", doesUserExist, createUser);
router.post("/signin", signinUser);

module.exports = router;

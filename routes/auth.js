const express = require('express');
const { check } = require('express-validator');
const { register, login, forgotpassword } = require("../controller/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", [check('email', 'Please provide a valid email address').isEmail(), check('password', 'Please provide a password').exists()], login);
router.post("/forgotpassword", forgotpassword);

module.exports = router;
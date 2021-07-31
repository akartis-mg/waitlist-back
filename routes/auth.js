const express = require('express');
const { check } = require('express-validator');
const { register, login, forgotpassword, resetpassword } = require("../controller/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", [check('email', 'Please provide a valid email address').isEmail(), check('password', 'Please provide a password').exists()], login);
router.post("/forgotpassword", forgotpassword);
router.put("/resetpassword/:resetToken", resetpassword);

module.exports = router;
const express = require('express');
const { getDateresa , getAvailableTimes } = require("../controller/dateresa.js");

const router = express.Router();
const auth = require('../middleware/auth');


router.route("/findDateresa/:bid").get(auth, getDateresa);
router.route("/getAvailableTimes/:bid/:jour/:daySelected").get(getAvailableTimes);

module.exports = router;
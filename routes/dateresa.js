const express = require('express');
const { getDateresa, updateDateresa } = require("../controller/dateresa.js");

const router = express.Router();
const auth = require('../middleware/auth');


router.route("/findDateresa/:bid").get(auth, getDateresa);
//router.route("/updateDateresa").put(auth, updateDateresa);

module.exports = router;
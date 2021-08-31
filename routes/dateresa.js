const express = require('express');
const { createDateresa ,  getOneDateresa , getDateresa , updateDateresa  } = require("../controller/dateresa.js");

const router = express.Router();
const  auth  = require('../middleware/auth');

router.route("/newDateresa").post( auth , createDateresa);
router.route("/findOneDateresa").get( auth , getOneDateresa);
router.route("/findAllDateresa").get( auth , getDateresa);
router.route("/updateDateresa").put(auth ,  updateDateresa);

module.exports = router;
const express = require('express');
const { createStaff ,  getOneStaff , getStaff , updateStaff , deleteStaff } = require("../controller/staff.js");

const router = express.Router();
const  auth  = require('../middleware/auth');

router.route("/newStaff").post( auth , createStaff);
router.route("/findOneStaff").get( auth , getOneStaff);
router.route("/findAllStaff").get( auth , getStaff);
router.route("/updateStaff").put( auth , updateStaff);
router.route("/deleteStaff").delete(auth , deleteStaff);

module.exports = router;
const express = require('express');
const { createStaff ,  getOneStaff , getStaff , updateStaff , deleteStaff } = require("../controller/staff.js");

const router = express.Router();
const  auth  = require('../middleware/auth');

router.route("/newStaff").post( createStaff);
router.route("/findOneStaff").get( getOneStaff);
router.route("/findAllStaff").get( getStaff);
router.route("/updateStaff").put( updateStaff);
router.route("/deleteStaff").delete( deleteStaff);

module.exports = router;
const express = require('express');
const { createStaff ,  getOneStaff , getStaffManager , updateStaff , deleteStaff } = require("../controller/staff.js");

const router = express.Router();
const  auth  = require('../middleware/auth');

router.route("/newStaff").post(  createStaff);
router.route("/findOneStaff").get( auth , getOneStaff);
router.route("/findStaffManager").get( auth , getStaffManager);
router.route("/updateStaff").put(auth ,  updateStaff);
router.route("/deleteStaff").delete( auth ,  deleteStaff);

module.exports = router;
const express = require('express');
const { createStaff ,  getOneStaff , getStaffManager , getStaff , updateStaff , deleteStaff } = require("../controller/staff.js");

const router = express.Router();
const  auth  = require('../middleware/auth');

router.route("/newStaff").post(  createStaff);
router.route("/findOneStaff").get( auth , getOneStaff);
router.route("/findStaffManager/:bid").get( auth , getStaffManager);
router.route("/findStaff/:bid").get( auth , getStaff);
router.route("/updateStaff").put(auth ,  updateStaff);
router.route("/deleteStaff/:sid").delete( auth ,  deleteStaff);

module.exports = router;
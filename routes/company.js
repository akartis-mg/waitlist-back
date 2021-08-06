const express = require('express');

const  auth  = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

const { createCompany, getOneCompany , getCompany , updateCompany, deleteCompany } = require("../controller/company.js");

const router = express.Router();

router.route("/newCompany").post( createCompany);
router.route("/findOneCompany").get( getOneCompany);
router.route("/findAllCompany").get( getCompany);
router.route("/updateCompany").put( updateCompany);
router.route("/deleteCompany").delete( deleteCompany);

module.exports = router;
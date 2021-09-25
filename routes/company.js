const express = require('express');

const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

const { createCompany, getOneCompany, getCompany, updateCompany, deleteCompany } = require("../controller/company.js");

const router = express.Router();

router.route("/newCompany").post(auth, createCompany);
router.route("/findOneCompany/:cid").get(auth, getOneCompany);
router.route("/findAllCompany").get(getCompany);
router.route("/updateCompany").put(auth, updateCompany);
router.route("/deleteCompany").delete(auth, deleteCompany);

module.exports = router;
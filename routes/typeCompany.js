const express = require("express");
const {
  findOneTypeCompany,
  findAllTypeCompany,
} = require("../controller/typeCompany.js");

const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");

const router = express.Router();

router.route("/findOneTypeCompany").get( auth , findOneTypeCompany);
router.route("/findAllTypeCompany").get(auth , findAllTypeCompany);

module.exports = router;

const express = require('express');
const { createBranch , getOneBranch , getBranch , updateBranch , deleteBranch } = require("../controller/branch.js");

const  auth  = require('../middleware/auth');

const router = express.Router();

router.route("/newBranch").post(createBranch);
router.route("/findOneBranch").get( getOneBranch);
router.route("/findAllBranch").get( getBranch);
router.route("/updatebranch").put( updateBranch);
router.route("/deletebranch").delete( deleteBranch);

module.exports = router;
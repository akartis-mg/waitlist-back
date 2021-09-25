const express = require('express');
const { createBranch, getOneBranch, getBranch, updateBranch, deleteBranch } = require("../controller/branch.js");

const auth = require('../middleware/auth');

const router = express.Router();

router.route("/newBranch").post(auth, createBranch);
router.route("/findOneBranch/:bid").get(auth, getOneBranch);
router.route("/findAllBranch").get(auth, getBranch);
router.route("/updatebranch").put(auth, updateBranch);
router.route("/deletebranch").delete(auth, deleteBranch);

module.exports = router;
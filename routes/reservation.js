const express = require('express');
const { createReservation, getReservationByBranchId, getReservation, updateReservation, deleteReservation } = require("../controller/reservation.js");

const router = express.Router();
const auth = require('../middleware/auth');

router.route("/newReservation").post(auth, createReservation);
router.route("/findReservation/:bid").get(auth, getReservationByBranchId);
router.route("/findAllReservation/:uid/:type").get(auth, getReservation);
router.route("/updateReservation").put(auth, updateReservation);
router.route("/deleteReservation").delete(auth, deleteReservation);

module.exports = router;
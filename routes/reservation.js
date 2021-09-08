const express = require('express');
const { createReservation, getOneReservation, getReservation, updateReservation, deleteReservation } = require("../controller/reservation.js");

const router = express.Router();
const auth = require('../middleware/auth');

router.route("/newReservation").post(auth, createReservation);
router.route("/findOneReservation/:rid").get(auth, getOneReservation);
router.route("/findAllReservation").get(auth, getReservation);
router.route("/updateReservation").put(auth, updateReservation);
router.route("/deleteReservation").delete(auth, deleteReservation);

module.exports = router;
const express = require('express');
const { createReservation , getOneReservation , getReservation , updateReservation , deleteReservation } = require("../controller/reservation.js");

const router = express.Router();
const  auth  = require('../middleware/auth');

router.route("/newReservation").post( createReservation);
router.route("/findOneReservation").get( getOneReservation);
router.route("/findAllReservation").get( getReservation);
router.route("/updateReservation").put( updateReservation);
router.route("/deleteReservation").delete( deleteReservation);

module.exports = router;
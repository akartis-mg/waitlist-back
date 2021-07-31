const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
    {
        name : { type : String } , 
        date_reservation : { type : Datetime },
        time : { type : Datetime },
        nb_spots : { type : Number },
        phone : { type : Number }

    },
    { timestamps: true }
  );


module.exports = Reservation = mongoose.model("Reservation", ReservationSchema); 
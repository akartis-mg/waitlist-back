const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
    {
      bid: {
        type: String,
        require: true,
      },
        name : { type : String } , 
        date_reservation : { type : Date },
        time : { type : Date },
        nb_spots : { type : Number },
        phone : { type : Number }

    },
    { timestamps: true }
  );


module.exports = Reservation = mongoose.model("Reservation", ReservationSchema); 
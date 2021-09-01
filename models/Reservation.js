const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
    {
      bid: 
      {
          type: String
      },
      uid: 
      {
          type: String 
      }
      ,
        status : { type : String , default: "waiting" },
        name : { type : String } , 
        date_reservation : { type : String },
        time : { type : String },
        nb_spots : { type : Number }

    },
    { timestamps: true }
  );


module.exports = Reservation = mongoose.model("Reservation", ReservationSchema); 
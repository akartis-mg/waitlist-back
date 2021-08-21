const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
    {
      bid: 
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Branch'
      },
      uid: 
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users'
      }
      ,
        name : { type : String } , 
        date_reservation : { type : Date },
        time : { type : Number },
        nb_spots : { type : Number }

    },
    { timestamps: true }
  );


module.exports = Reservation = mongoose.model("Reservation", ReservationSchema); 
const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
    {
        name : { type : String },
        email : { type : String },
        password : { type : String },
        type : { type : String }
    },
    { timestamps: true }
  );


module.exports = Reservation = mongoose.model("Reservation", StaffSchema); 
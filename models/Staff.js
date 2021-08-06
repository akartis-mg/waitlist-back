const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
    {
      bid: {
        type: String,
        require: true,
      },
        name : { type : String },
        email : { type : String },
        password : { type : String },
        type : { type : String }
    },
    { timestamps: true }
  );


module.exports = Staff = mongoose.model("Staff", StaffSchema); 
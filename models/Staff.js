const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
    {
      bid: 
      [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Branch'
      }],
        name : { type : String },
        email : { type : String },
        password : { type : String },
        type : { type : String }
    },
    { timestamps: true }
  );


module.exports = Staff = mongoose.model("Staff", StaffSchema); 
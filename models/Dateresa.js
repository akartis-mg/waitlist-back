const mongoose = require("mongoose");

const DateresaSchema = new mongoose.Schema(
    {
      bid: 
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Branch'
      }
      ,
      jour: { type : String },
      info:[]

    },
    { timestamps: true }
  );


module.exports = Dateresa = mongoose.model("Dateresa", DateresaSchema); 
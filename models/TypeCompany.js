const mongoose = require("mongoose");

const TypeCompanySchema = new mongoose.Schema(
    {
        name: { type: String }
    },
    { timestamps: true }
  );


module.exports = TypeCompany = mongoose.model("TypeCompany", TypeCompanySchema); 
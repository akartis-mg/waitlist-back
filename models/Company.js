const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
        name: { type: String },
        typeCompany: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'TypeCompany'
            }
        ],
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Branch'
            }
        ],

    },
    { timestamps: true }
  );


module.exports = Company = mongoose.model("Company", CompanySchema);  
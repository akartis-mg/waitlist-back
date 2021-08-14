const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
        name: { type: String },
        typeCompanyID:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TypeCompany'
        }
        ,
        branchs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Branch'
            }
        ],

    },
    { timestamps: true }
);


module.exports = Company = mongoose.model("Company", CompanySchema);
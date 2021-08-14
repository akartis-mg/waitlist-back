const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
        name: { type: String },
        isActive: { type: Boolean, default: true },
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
        logoUrl: {
            type: String
        }
    },
    { timestamps: true }
);




module.exports = Company = mongoose.model("Company", CompanySchema);

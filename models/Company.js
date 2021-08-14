const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
    {
        name: { type: String },
        isActive : { type: Boolean },
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


CompanySchema.pre('save', function (next) {
    this.isActive = true;

})


module.exports = Company = mongoose.model("Company", CompanySchema);

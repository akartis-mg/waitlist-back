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


<<<<<<< HEAD
module.exports = Company = mongoose.model("Company", CompanySchema);
=======
  CompanySchema.pre('save', function (next) {
    this.IsActive = true;

})


module.exports = Company = mongoose.model("Company", CompanySchema);
>>>>>>> 2dafbcd44c44b015cab79c08f8d82fb6d66e05a1

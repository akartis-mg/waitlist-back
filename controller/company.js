const Company = require('../models/Company');
const TypeCompany = require('../models/TypeCompany');
const ErrorResponse = require('../utils/errorResponse')

exports.createCompany = async (req, res, next) => {
    const onecompany = new Company(req.body.company);

    try {

        const typeCompany = await TypeCompany.findOne({ _id: req.body.typeCompanyID });

        onecompany.typeCompanyID = typeCompany;

        const savedcompany = await onecompany.save();

        res.status(200).json(savedcompany);
    } catch (error) {
        next(error);
    }
}

exports.getOneCompany = async (req, res, next) => {

    const cid = req.body.companyId;

    try {
        const company = await Company.findOne({ _id: cid })
        res.status(200).json(company);
    } catch (error) {
        next(error);
    }

}


exports.getCompany = async (req, res, next) => {

    try {
        const company = await Company.find({}).populate('branchs');

        res.status(200).json(company);

    } catch (error) {
        next(error);
    }
}



exports.updateCompany = async (req, res, next) => {

    const cid = req.body.company.cid;

    try {
        const company = await Company.findOne({ _id: cid });

        if (!company) {
            return next(new ErrorResponse("company cannot be updated", 404));
        }

        company.isActive = req.body.company.isActive;
        const typeCompany = await TypeCompany.findOne({ _id: req.body.typeCompanyID });
        company.typeCompanyID = typeCompany;
        company.logo = req.body.company.logo;
        company.name = req.body.company.name;
        const updatedcompany = await company.save();

        res.status(200).json(updatedcompany);

    } catch (error) {
        next(error);
    }

}


exports.deleteCompany = async (req, res, next) => {

    const cid = req.body.companyId;

    try {
        const company = await Company.findOne({ _id: cid });

        if (!company) {
            return next(new ErrorResponse("Company cannot be updated", 404));
        }

        company.isActive = false;
        const deletedcompany = await company.save();

        res.status(200).json(deletedcompany);


    } catch (error) {
        next(error);
    }


}
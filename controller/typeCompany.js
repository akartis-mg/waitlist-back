
const TypeCompany = require('../models/TypeCompany');

exports.findOneTypeCompany = async (req, res, next) => {
    const uid = req.body.typeId ;
    console.log(uid)

    try {
        const typeCompany = await TypeCompany.findOne({ _id: uid })
        res.status(200).json(typeCompany);
    } catch (error) {
        next(error);
    }
}


exports.findAllTypeCompany = async (req, res, next) => {

    try {
        const typeCompany = await TypeCompany.find({})
        res.status(200).json(typeCompany);

    } catch (error) {
        next(error);
    }
}
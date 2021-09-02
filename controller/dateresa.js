const Branch = require('../models/Branch');
const Staff = require('../models/Staff');
const Reservation = require('../models/Reservation');
const Dateresa = require('../models/Dateresa');


exports.getDateresa = async (req, res, next) => {

    const bid = req.body.branchId;

    try {
        const dateresa = await Dateresa.find({ bid: bid })
        res.status(200).json(dateresa);
    } catch (error) {
        next(error);
    }

}

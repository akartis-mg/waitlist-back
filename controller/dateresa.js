const Branch = require('../models/Branch');
const Staff = require('../models/Staff');
const Reservation = require('../models/Reservation');
const Dateresa = require('../models/Dateresa');


exports.createDateresa = async (req, res, next) => {

    const bid = req.body.bid;
    const dateresa = new Branch(req.body.dateresa);
    dateresa.bid=bid;
   
    try {
        const saveddateresa = await dateresa.save();

        const branch = await Branch.findOne({ _id: bid });
        branch.reservations.push(savedreservation);
        await branch.save();

        res.status(200).json(saveddateresa);
    }

    catch (error) {
        next(error);
    }
}
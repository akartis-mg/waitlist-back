const Company = require('../models/Company');
const TypeCompany = require('../models/TypeCompany');
const Branch  = require('../models/Branch');
const Reservation  = require('../models/Reservation');


exports.createReservation = async (req, res, next) => {
    
    const bid = req.body.bid;
    const reservation = new Reservation(req.body);

    try {
        const savedreservation = await reservation.save();

        const branch = await Branch.findOne({ _id: bid })
        branch.reservations.push(savedreservation);
        await branch.save();

        res.status(200).json(savedreservation);
    } catch (error) {
        next(error);
    }

}


exports.getOneReservation = async (req, res, next) => {

    const rid = req.body.reservationId ;

    try {
        const reservation = await Reservation.findOne({ _id: rid })
        res.status(200).json(reservation);
    } catch (error) {
        next(error);
    }

}


exports.getReservation = async (req, res, next) => {

    try {
        const reservation = await Reservation.find({});

        res.status(200).json(reservation);

    } catch (error) {
        next(error);
    }
}


// Update a todo
exports.updateReservation = async (req, res, next) => {
    const rid = req.body.reservationId;

    try {
        const reservation = await Reservation.findOne({ _id: rid });

        if (!reservation) {
            return next(new ErrorResponse("Reservation cannot be updated", 404));
        }

        reservation.name = req.body.name;
        reservation.date_reservation = req.body.date_reservation;
        reservation.time = req.body.time;
        reservation.nb_spots = req.body.nb_spots;
        reservation.phone = req.body.phone; 

        const updatedReservation = await reservation.save();

        res.status(200).json(updatedReservation);

    } catch (error) {
        next(error);
    }
}


// Delete a todo
exports.deleteReservation = async (req, res, next) => {
    const rid = req.body.reservationId;

    try {
        const reservation = await Reservation.findOne({ _id: rid });

        if (!reservation) {
            return next(new ErrorResponse("Reservation cannot be deleted", 404));
        }

        const bid = reservation.bid;

        const deletedreservation = await reservation.remove();

        const branch = await Branch.findOne({ _id: bid });
        for (let x in branch.reservations) {
            if (branch.reservations[x] == rid) {
                branch.reservations.pull(branch.reservations[x]);
                await branch.save();
            }
        }

        res.status(202).json(deletedreservation);

    } catch (error) {
        next(error);
    }
}


const Company = require('../models/Company');
const TypeCompany = require('../models/TypeCompany');
const Branch  = require('../models/Branch');
const Reservation  = require('../models/Reservation');


exports.createReservation = async (req, res, next) => {
    
    const bid = req.body.bid;
    const reservation = new Reservation(req.body);

    try {
        const savedreservation = await reservation.save();

        const branch = await Branch.findOne({ _id: bid });
        branch.spots.available = branch.spots.available - savedreservation.nb_spots;
        branch.spots.not_available = branc.spots.not_available + savedreservation.nb_spots;
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

    const type = req.body.type ;

    try {

        if( type === "Customer") {
            const uid = req.body.uid ;
            const reservation = await Reservation.find({  uid : uid }  );

            res.status(200).json(reservation);

        }

        else{
            const bid = req.body.bid ;
            
            const reservation = await Reservation.find({ bid : bid  });

            res.status(200).json(reservation);
        }


        

    } catch (error) {
        next(error);
    }
}


// Update a todo
exports.updateReservation = async (req, res, next) => {
    const rid = req.body.reservationId;
    const bid = req.body.bid;
    try {
        const reservation = await Reservation.findOne({ _id: rid });

        if (!reservation) {
            return next(new ErrorResponse("Reservation cannot be updated", 404));
        }

        const branch = await Branch.findOne({ _id: bid });

        if(req.body.status == "Done" ){
             //initialise
             branch.spots.available = branch.spots.available + reservation.nb_spots;
             branch.spots.not_available = branc.spots.not_available - reservation.nb_spots;
        }

        else{
            //initialise
            branch.spots.available = branch.spots.available + reservation.nb_spots;
            branch.spots.not_available = branc.spots.not_available - reservation.nb_spots;

            //modify
            branch.spots.available = branch.spots.available - req.body.nb_spots;
            branch.spots.not_available = branc.spots.not_available + req.body.nb_spots;
        }
      
        await branch.save();

        reservation.status = req.body.status;
        reservation.name = req.body.name;
        reservation.date_reservation = req.body.date_reservation;
        reservation.time = req.body.time;
        reservation.nb_spots = req.body.nb_spots;

        const updatedReservation = await reservation.save();

       // branch.spots.available = branch.spots.available - savedreservation.nb_spots;
       // branch.spots.not_available = branc.spots.not_available + savedreservation.nb_spots;

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
        //initialise
        branch.spots.available = branch.spots.available + reservation.nb_spots;
        branch.spots.not_available = branc.spots.not_available - reservation.nb_spots;

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


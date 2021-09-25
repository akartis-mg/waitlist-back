const Company = require('../models/Company');
const TypeCompany = require('../models/TypeCompany');
const Branch = require('../models/Branch');
const Reservation = require('../models/Reservation');
const User = require('../models/Users');
const Dateresa = require('../models/Dateresa');
const ErrorResponse = require('../utils/errorResponse');


exports.createReservation = async (req, res, next) => {

    //const bid = req.body.bid;
    //const uid = req.body.uid;
    const reservation = new Reservation(req.body);

    try {

        const dateresa = await Dateresa.findOne({ bid: req.body.bid });

        const savedreservation = await reservation.save();

        if (dateresa != null) {

            /*let check = false;

            for (i = 0; i < dateresa.info.length; i++) {

                if (dateresa.info[i].date == req.body.date_reservation) {
                    console.log("SAME DATE");

                    check = true;
                    let checkinterv = false;


                    for (j = 0; j < dateresa.info[i].interval.length; j++) {

                        if (dateresa.info[i].interval[j].hours == req.body.time) {

                            checkinterv = true;
                            dateresa.info[i].interval[j].seats = dateresa.info[i].interval[j].seats + req.body.nb_spots
                            dateresa.info[i].interval[j].id_resa.push(savedreservation._id);

                        }

                    }

                    if (checkinterv == false) {
                        console.log("INTERVAL");
                        dateresa.info[i].interval.push({
                            hours: req.body.time,
                            seats: req.body.nb_spots,
                            id_resa: [
                                savedreservation._id
                            ]
                        })
                        await dateresa.save();

                        console.log("TEST: ", dateresa.info[i]);
                    }
                }

            }


            if (check == false) {
                dateresa.info.push({
                    date: req.body.date_reservation,
                    interval: [{
                        hours: req.body.time,
                        seats: req.body.nb_spots,
                        id_resa: [
                            savedreservation._id
                        ]
                    }]
                })
            }

            console.log("TEST 2: ", dateresa.info[1].interval);

            const saveddateresa = await dateresa.save();
            res.status(200).json(saveddateresa);

            console.log("TEST 3: ", saveddateresa.info[1].interval)*/

            const dateresaIndex = dateresa.info.findIndex(
                (i) => i.date == req.body.date_reservation
            );
            if (dateresaIndex != -1) {

                dateresa.info = dateresa.info.map(i => {
                    if (i.date == req.body.date_reservation) {

                        //check = true;
                        let checkInterv = false;
                        const y = 0;
                        const value = {
                            ...i,
                            interval: [
                                ...i.interval.map(interv => {
                                    if (interv.hours == req.body.time) {
                                        checkInterv = true;
                                        const seats = interv.seats;
                                        const nb_spots = seats + req.body.nb_spots;
                                        interv.id_resa.push(savedreservation._id);
                                        const id_resa = interv.id_resa;
                                        const intvalue = {
                                            ...interv,
                                            seats: nb_spots,
                                            id_resa
                                        };
                                        return intvalue;
                                    }
                                    else {
                                        return interv
                                    }
                                })
                            ]
                        }
                        if (!checkInterv) {
                            value.interval.push({
                                hours: req.body.time,
                                seats: req.body.nb_spots,
                                id_resa: [
                                    savedreservation._id
                                ]
                            })
                        }
                        return value;
                    }
                    else {
                        return i;
                    }
                })

            }
            else {

                dateresa.info.push({
                    date: req.body.date_reservation,
                    interval: [{
                        hours: req.body.time,
                        seats: req.body.nb_spots,
                        id_resa: [
                            savedreservation._id
                        ]
                    }]
                })

            }


            const savedreservation2 = await dateresa.save();
            res.status(200).json(savedreservation2);
        }

        else {

            const newdateresa = new Dateresa();
            newdateresa.bid = req.body.bid;
            newdateresa.info.push({
                date: req.body.date_reservation,
                interval: [{
                    hours: req.body.time,
                    seats: req.body.nb_spots,
                    id_resa: [
                        savedreservation._id
                    ]
                }]
            })

            const saveddateresa = await newdateresa.save();
            const branch = await Branch.findOne({ _id: req.body.bid });
            branch.dateresa.push(saveddateresa);
            await branch.save();
            res.status(200).json(savedreservation);
        }
    } catch (error) {
        next(error);
    }

}


exports.getReservationByBranchId = async (req, res, next) => {

    const bid = req.params.bid;

    try {
        const reservation = await Reservation.find({ bid })
        res.status(200).json(reservation);
    } catch (error) {
        next(error);
    }

}


exports.getReservation = async (req, res, next) => {

    const type = req.params.type;

    try {

        if (type == "customer") {

            const reservation = await Reservation.find({ uid: req.params.uid });

            res.status(200).json(reservation);

        }

        else {
            const bid = req.body.bid;

            const reservation = await Reservation.find({ bid: bid });

            res.status(200).json(reservation);
        }




    } catch (error) {
        next(error);
    }
}


// Update a todo
exports.updateReservation = async (req, res, next) => {
    const rid = req.body._id;
    const bid = req.body.bid;
    try {
        const reservation = await Reservation.findOne({ _id: rid });

        if (!reservation) {
            return next(new ErrorResponse("Reservation cannot be updated", 404));
        }

        // waiting - confirm - inprogress - done - desable 
        const branch = await Branch.findOne({ _id: bid });

        const dateresa = await Dateresa.findOne({ bid: bid });


        //init 
        dateresa.info = dateresa.info.map(i => {
            if (i.date == req.body.date_reservation) {
                let checkInterv = false;
                const y = 0;
                const value = {
                    ...i,
                    interval: [
                        ...i.interval.map(interv => {
                            //if (interv.hours == req.body.time) {
                            checkInterv = true;
                            let seats = interv.seats;
                            let arr = [];

                            const idResaIndex = interv.id_resa.findIndex(
                                (i) => i == rid && (interv.hours == reservation.time)
                            );

                            if (idResaIndex != -1) {
                                seats = seats - reservation.nb_spots;
                                arr = interv.id_resa.filter((id) =>
                                    id != rid
                                )

                            }
                            else {
                                arr = interv.id_resa;

                            }


                            const intvalue = {
                                ...interv,
                                seats,
                                id_resa: arr
                            };
                            return intvalue;
                            /*}
                            else {
                                return interv
                            }*/
                        })
                    ]
                }
                return value;
            }
            else {
                return i;
            }
        })


        let bool = false;

        if (req.body.status == "disable" || req.body.status == "done") {
            bool = true
        }

        if (!bool) {
            //if ((req.body.status).toString() != 'done' || (req.body.status).toString() != 'disable') {

            //update
            const dateresaIndex = dateresa.info.findIndex(
                (i) => i.date === req.body.date_reservation
            );
            if (dateresaIndex > 0) {

                dateresa.info = dateresa.info.map(i => {
                    if (i.date == req.body.date_reservation) {
                        //check = true;
                        let checkInterv = false;
                        const y = 0;
                        const value = {
                            ...i,
                            interval: [
                                ...i.interval.map(interv => {
                                    if (interv.hours == req.body.time) {
                                        checkInterv = true;
                                        const seats = interv.seats;
                                        const nb_spots = seats + req.body.nb_spots;
                                        interv.id_resa.push(reservation._id);
                                        const id_resa = interv.id_resa;
                                        const intvalue = {
                                            ...interv,
                                            seats: nb_spots,
                                            id_resa
                                        };
                                        return intvalue;
                                    }
                                    else {
                                        return interv
                                    }
                                })
                            ]
                        }
                        if (!checkInterv) {
                            value.interval.push({
                                hours: req.body.time,
                                seats: req.body.nb_spots,
                                id_resa: [
                                    reservation._id
                                ]
                            })
                        }
                        return value;
                    }
                    else {
                        return i;
                    }
                })

            }
            else {

                dateresa.info.push({
                    date: req.body.date_reservation,
                    interval: [{
                        hours: req.body.time,
                        seats: req.body.nb_spots,
                        id_resa: [
                            reservation._id
                        ]
                    }]
                })

            }

        }


        await dateresa.save()

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
        //branch.spots.available = branch.spots.available + reservation.nb_spots;
        //branch.spots.not_available = branc.spots.not_available - reservation.nb_spots;

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


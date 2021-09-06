const Company = require('../models/Company');
const TypeCompany = require('../models/TypeCompany');
const Branch = require('../models/Branch');
const Reservation = require('../models/Reservation');
const User = require('../models/Users');
const Dateresa = require('../models/Dateresa');


exports.createReservation = async (req, res, next) => {

    //const bid = req.body.bid;
    //const uid = req.body.uid;
    const reservation = new Reservation(req.body);

    try {

        const dataresa = Dateresa.findOne({ bid : req.body.bid });

        const savedreservation = await reservation.save();

        if (dataresa != null ){

              for( i = 0 ; i < dataresa.info.length() ; i++ ){
                  if  (dateresa.info[i].date == req.body.date_reservation){

                        for( j = 0 ; j < dateresa.info[i].interval.length() ; j++ ){

                                if( dateresa.info[i].interval[j].hours == req.body.time ){

                                     dateresa.info[i].interval[j].seats = dateresa.info[i].interval[j].seats + req.body.nb_spots
                                     dateresa.info[i].interval[j].id_resa.push(savedreservation._id);    

                                }

                                else{

                                    dateresa.info[i].interval[j].push( [{
                                        hours: req.body.time,
                                        seats: req.body.nb_spots,
                                        id_resa: [
                                            savedreservation._id
                                        ]
                                    }] )

                                }

                        }

                  }
                  else
                  {
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
              }


              const x = 0;  
              const check = false;

               dateresa.info =  dateresa.info.map( i =>{

                x++;
                      
                   
                        if(i.date == req.body.date_reservation ){
                            check = true;

                            const checkInterv = false;
                            const y = 0;
                            
                            const value = {
                                ...i,
                                interval : [
                                     
                                    ...i.interval.map(interv => {
                                        y++;
                                        if(interv.hours == req.body.time ){
                                            checkInterv = true;
                                            const seats = interv.seats;
                                            const nb_spots = seats + req.body.nb_spots;
                                            interv.id_resa.push(savedreservation._id);
                                            const id_resa = id_resa;
                                            const intvalue = {
                                                ...interv,
                                                nb_spots,
                                                id_resa
                                            };

                                            return intvalue;
                                        }

                                        else
                                        {
                                            
                                            // const nb_spots = req.body.nb_spots;
                                            // interv.id_resa.push(savedreservation._id);
                                            // const hours = req.body.time,
                                            // const id_resa = id_resa;
                                            // const intvalue = {
                                            //     hours,
                                            //     ...interv,
                                            //     nb_spots,
                                            //     id_resa
                                            // };
                                            // return intvalue;

                                            return interv


                                        }
                                    })

                                ]
                            }  

                            if( !checkInterv ){
                                value.interval.push([{
                                    hours: req.body.time,
                                    seats: req.body.nb_spots,
                                    id_resa: [
                                        savedreservation._id
                                    ]
                                }])
                            }

                           

                            return value;


                        }

                        else{

                           

                            return  i  ; 

                           
                    
                    }

                    
                   

              })


              if(!check ){
                
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





        }

        else{
            
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
        }

        


        const saveddateresa = await newdateresa.save();

        const branch = await Branch.findOne({ _id: req.body.bid });
        branch.dateresa.push(saveddateresa);
        await branch.save();

        res.status(200).json(savedreservation);
    } catch (error) {
        next(error);
    }

}


exports.getOneReservation = async (req, res, next) => {

    const rid = req.body.rid;

    try {
        const reservation = await Reservation.findOne({ _id: rid })
        res.status(200).json(reservation);
    } catch (error) {
        next(error);
    }

}


exports.getReservation = async (req, res, next) => {

    const type = req.body.type;

    try {

        if (type === "Customer") {
            const uid = req.body.uid;
            const reservation = await Reservation.find({ uid: uid });

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
    const rid = req.body.reservationId;
    const bid = req.body.bid;
    try {
        const reservation = await Reservation.findOne({ _id: rid });

        if (!reservation) {
            return next(new ErrorResponse("Reservation cannot be updated", 404));
        }

        // waiting - confirm - inprogress - done - desable 
        const branch = await Branch.findOne({ _id: bid });

        if (req.body.status == "waiting") {

            reservation.nb_spots = req.body.nb_spots;

        }

        else if (req.body.status == "confirm") {

            if (reservation.status == "waiting") {

                reservation.nb_spots = req.body.nb_spots


                for (let x in branch.info.opening_days) {
                    if (branch.info.opening_days[x].open) {
                        //branch.info.opening_days[x].hour_interval[0] = req.body.branch.info.opening_days[x].hour_interval[0];
                        branch.info.opening_days[x].hour_interval.push(req.body.branch.info.opening_days[x].hour_interval[0]);
                    }
                }
                branch.spots.not_available = branc.spots.not_available + reservation.nb_spots;


            }

            else {

                //initialise
                branch.spots.available = branch.spots.available + reservation.nb_spots;
                branch.spots.not_available = branc.spots.not_available - reservation.nb_spots;

                //modify
                branch.spots.available = branch.spots.available - req.body.nb_spots;
                branch.spots.not_available = branc.spots.not_available + req.body.nb_spots;

                reservation.nb_spots = req.body.nb_spots;
            }

        }

        else if (req.body.status == "Done" || req.body.status == "Desable") {
            //initialise
            branch.spots.available = branch.spots.available + reservation.nb_spots;
            branch.spots.not_available = branc.spots.not_available - reservation.nb_spots;

            reservation.nb_spots = req.body.nb_spots;
        }

        else {

            //initialise
            //branch.spots.available = branch.spots.available + reservation.nb_spots;
            //branch.spots.not_available = branc.spots.not_available - reservation.nb_spots;

            //modify
            //branch.spots.available = branch.spots.available - req.body.nb_spots;
            //branch.spots.not_available = branc.spots.not_available + req.body.nb_spots;
        }

        await branch.save();

        reservation.status = req.body.status;
        reservation.name = req.body.name;
        reservation.date_reservation = req.body.date_reservation;
        reservation.time = req.body.time;


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


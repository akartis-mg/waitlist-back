const Branch = require('../models/Branch');
const Staff = require('../models/Staff');
const Reservation = require('../models/Reservation');
const Dateresa = require('../models/Dateresa');
const moment = require('moment');

exports.getDateresa = async (req, res, next) => {

    const bid = req.params.bid;

    try {
        const dateresa = await Dateresa.find({ bid: bid })
        res.status(200).json(dateresa);
    } catch (error) {
        next(error);
    }

}


exports.getAvailableTimes = async (req, res, next) => {

    const bid = req.params.bid;
    const jour =  req.params.jour;
    const daySelected =  moment(req.params.daySelected).format("DD/MM/YYYY") ;
    let intervalHours = [];
    let timesAvailable = [];

    console.log("date",daySelected);

    try {
        const dateresa = await Dateresa.findOne({ bid: bid}, {info : { $elemMatch: { date : daySelected  } }  })

        const branch = await Branch.findOne({  _id : bid  })

        //get available hour for day clicked
        branch.info.opening_days[jour].hour_interval[0].map((h) => {
            timesAvailable.push({
              hours: h.hours,
              seats: branch.spots.available,
            });
          });





          console.log("date",dateresa);

          if(dateresa){

                console.log("eo");

                    dateresa.info
                    .map((ht) => {
                  //  console.log("taken ", ht.interval);
                    intervalHours = ht.interval;
                    });

                

                if (intervalHours.length > 0) {
                

                    console.log("eo ian ");

                    for (var i = 0; i < timesAvailable.length; i++) {
                    for (var j = 0; j < intervalHours.length; j++) {
                        //compare hours from default and taken

                        //console.log("ta", timesAvailable[i].hours);
                        //console.log("ih", intervalHours[j].hours);
                        if (timesAvailable[i].hours == intervalHours[j].hours) {
                        if (branch.spots.available == intervalHours[j].seats) {
                            console.log("tonga eto", i);
                            //timesAvailable.filter((item) => item != timesAvailable[i]);
                            timesAvailable.splice(i, 1);
                        } else {
                            //set new seats available
                            console.log("testing.........");
                            timesAvailable[i].seats =
                            branch.spots.available - intervalHours[j].seats;
                        }
                        }
                    }
                    }
                }

          }
        


        console.log("timesAvailable" , timesAvailable );  

        res.status(200).json(timesAvailable);
    } catch (error) {
        next(error);
    }

}

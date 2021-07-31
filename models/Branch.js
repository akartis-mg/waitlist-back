const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
    {
        name: { type: String },
        average_duration : { type: Number },
        address: {
            street : { type : String  },
            city : { type : String },
            postal_code : { type : Number  },
            longitude: { type: Number },
            latitude: { type: Number }
        },
        info : {
            opening_days : {
                monday : {
                    open: {type: Boolean},
                    open_hour : { type: Timestamp },
                    closing_hour : { type : Timestamp },
                },
                tuesday : { 
                    open: {type: Boolean},
                    open_hour : { type: Timestamp },
                    closing_hour : { type : Timestamp }
                },
                wednesday : {
                    open: {type: Boolean},
                    open_hour : { type: Timestamp },
                    closing_hour : { type : Timestamp }
                },
                thursday : {
                    open: {type: Boolean},
                    open_hour : { type: Timestamp },
                    closing_hour : { type : Timestamp }
                },
                friday : {
                    open: {type: Boolean},
                    open_hour : { type: Timestamp },
                    closing_hour : { type : Timestamp }
                } ,
                saturday : {
                    open: {type: Boolean},
                    open_hour : { type: Timestamp },
                    closing_hour : { type : Timestamp }
                },
                sunday : {
                    open: {type: Boolean},
                    open_hour : { type: Timestamp },
                    closing_hour : { type : Timestamp }
                } 
            },
             phone : {
                 type : Number
             },
             website : {
                 type : String 
             }
        },

        spots : {
              available : { type : Number },
              not_available : { type : Number },
        },

        staff : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Staff'
            }
        ],

        reservation : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Reservation'
            }
        ],

    },
    { timestamps: true }
  );


module.exports = Branch = mongoose.model("Branch", BranchSchema); 
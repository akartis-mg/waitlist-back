const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
  {
    cid: {
      type: String,
      require: true,
    },
    isActive : { type: Boolean },
    name: { type: String },
    average_duration: { type: Number },
    address: {
      street: { type: String },
      city: { type: String },
      postal_code: { type: Number },
      longitude: { type: Number },
      latitude: { type: Number },
    },
    info: {
      opening_days: {
        monday: {
          open: { type: Boolean },
          open_hour: { type: Number },
          closing_hour: { type: Number },
        },
        tuesday: {
          open: { type: Boolean },
          open_hour: { type: Number },
          closing_hour: { type: Number },
        },
        wednesday: {
          open: { type: Boolean },
          open_hour: { type: Number },
          closing_hour: { type: Number },
        },
        thursday: {
          open: { type: Boolean },
          open_hour: { type: Number },
          closing_hour: { type: Number },
        },
        friday: {
          open: { type: Boolean },
          open_hour: { type: Number },
          closing_hour: { type: Number },
        },
        saturday: {
          open: { type: Boolean },
          open_hour: { type: Number },
          closing_hour: { type: Number },
        },
        sunday: {
          open: { type: Boolean },
          open_hour: { type: Number },
          closing_hour: { type: Number },
        },
      },
      phone: {
        type: Number,
      },
      website: {
        type: String,
      },
    },

    spots: {
      available: { type: Number },
      not_available: { type: Number },
    },

    staffs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
      },
    ],

    reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  { timestamps: true }
);

BranchSchema.pre('save', function (next) {
  this.isActive = true;
  
}) 

module.exports = Branch = mongoose.model("Branch", BranchSchema);

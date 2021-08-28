const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
  {
    cid: {
      type: String,
      require: true,
    },
    isActive: { type: Boolean, default: true },
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
          hour_interval : { type , Array },
          open_hour: { type: String },
          closing_hour: { type: String },
        },
        tuesday: {
          open: { type: Boolean },
          hour_interval : { type , Array },
          open_hour: { type: String },
          closing_hour: { type: String },
        },
        wednesday: {
          open: { type: Boolean },
          hour_interval : { type , Array },
          open_hour: { type: String },
          closing_hour: { type: String },
        },
        thursday: {
          open: { type: Boolean },
          hour_interval : { type , Array },
          open_hour: { type: String },
          closing_hour: { type: String },
        },
        friday: {
          open: { type: Boolean },
          hour_interval : { type , Array },
          open_hour: { type: String },
          closing_hour: { type: String },
        },
        saturday: {
          open: { type: Boolean },
          hour_interval : { type , Array },
          open_hour: { type: String },
          closing_hour: { type: String },
        },
        sunday: {
          open: { type: Boolean },
          hour_interval : { type , Array },
          open_hour: { type: String },
          closing_hour: { type: String },
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

module.exports = Branch = mongoose.model("Branch", BranchSchema);

const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
  {
    cid: {
      type: String,
      require: true,
    },
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
          open_hour: { type: Date },
          closing_hour: { type: Date },
        },
        tuesday: {
          open: { type: Boolean },
          open_hour: { type: Date },
          closing_hour: { type: Date },
        },
        wednesday: {
          open: { type: Boolean },
          open_hour: { type: Date },
          closing_hour: { type: Date },
        },
        thursday: {
          open: { type: Boolean },
          open_hour: { type: Date },
          closing_hour: { type: Date },
        },
        friday: {
          open: { type: Boolean },
          open_hour: { type: Date },
          closing_hour: { type: Date },
        },
        saturday: {
          open: { type: Boolean },
          open_hour: { type: Date },
          closing_hour: { type: Date },
        },
        sunday: {
          open: { type: Boolean },
          open_hour: { type: Date },
          closing_hour: { type: Date },
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

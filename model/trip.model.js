const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    start_date: String,
    end_date: String,
    duration: String,
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;

const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    start_date: String,
    end_date: String,
    duration: String,
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;

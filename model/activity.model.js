const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: String,
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    place: { 
      city: String,
      area: String,
      state: String,
      address: String,
      mapPosition: { 
        lat: Number,
        lng: Number
      }
    },
    description: String,
    image_url: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    editedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;

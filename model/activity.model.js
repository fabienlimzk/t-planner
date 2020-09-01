const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: String,
    start_date: Date,
    end_date: Date,
    duration: String,
    address: String,
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

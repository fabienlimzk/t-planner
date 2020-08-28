const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({
    description: String,
    start_date: String,
    end_date: String,
    no_of_days: Number
}, {
    timestamps: true
})

const Activity = mongoose.model("Activity", activitySchema)

module.exports = Activity
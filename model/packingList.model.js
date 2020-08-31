const mongoose = require("mongoose");

const packingListSchema = new mongoose.Schema(
  {
    title: String,
    items: [String],
  },
  {
    timestamps: true,
  }
);

const PackingList = mongoose.model("PackingList", packingListSchema);

module.exports = PackingList;

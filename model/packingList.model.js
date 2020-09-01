const mongoose = require("mongoose");

const packingListSchema = new mongoose.Schema(
  {
    title: String,
    items: [String],
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

const PackingList = mongoose.model("PackingList", packingListSchema);

module.exports = PackingList;

//===== require all dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//== add all middlewares
require("./config/db"); // calls mongoose connection to clean this file
app.use(express.json()); // allows me to receive JSON files from HEADER of REQUEST
app.use(cors()); // allows all requests from outside servers or apps

//== setup my routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/activities", require("./routes/activity.route"));
app.use("/api/packingLists", require("./routes/packingList.route"));
app.use("/api/trips", require("./routes/trip.route"));

//== 404 errors
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 not found", code: "EB404" });
});

//== setup the server port
app.listen(process.env.PORT, () =>
  console.log(`running on ${process.env.PORT}`)
);

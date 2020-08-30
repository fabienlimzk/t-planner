const router = require("express").Router();
const Trip = require("../model/trip.model");

/* 
  @route GET api/trips/:id
  @desc gets one trip
  @access public
*/
router.get("/:id", async (req, res) => {
  try {
    let trip = await Trip.findById(req.params.id);
    res.status(200).json({
      message: "Trip found",
      trip,
    });
  } catch (err) {
    res.status(500).json({
      message: "No trip found",
      statuscode: "EB500",
    });
  }
});

/* 
  @route PUT api/trips
  @desc updates one trip
  @access public
*/
router.put("/:id", async (req, res) => {
  try {
    let trip = await Trip.findByIdAndUpdate(req.params.id, req.body);

    if (trip) {
      res.status(200).json({
        message: "Trip has been edited",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/* 
  @route DELETE api/trips/:id
  @desc deletes one trip
  @access public
*/
router.delete("/:id", async (req, res) => {
  try {
    let tripDelete = await Trip.findByIdAndDelete(req.params.id);

    if (tripDelete) {
      res.status(200).json({
        message: "Trip deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      statuscode: "EB500",
    });
  }
});

/* 
  @route POST api/trips
  @desc gets all trips
  @access public
*/
router.post("/", async (req, res) => {
  try {
    let trip = new Trip(req.body);

    let savedTrip = await trip.save();
    res.status(201).json({
      message: "Trip has been created!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Trip has been rejected",
      statuscode: "EB500",
    });
  }
});

/* 
  @route GET api/trips
  @desc gets all trips
  @access public
*/
router.get("/", async (req, res) => {
  console.log(req.user);

  try {
    let trips = await Trip.find();

    res.status(200).json({
      count: trips.length,
      trips,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      statuscode: "EB500",
    });
  }
});

module.exports = router;

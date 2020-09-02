const router = require("express").Router();
const User = require("../model/user.model");
const Trip = require("../model/trip.model");
const checkToken = require("../config/config.js");

/* 
  @route GET api/trips/:id
  @desc gets one trip
  @access public
*/
// GET only one trip
router.get("/:id", checkToken, async (req, res) => {
  try {
    let trip = await Trip.findById(req.params.id)
      .populate("createdBy")
      .populate("activities");
    console.log("this is from get one trip " + trip);
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
// EDIT that one trip
router.put("/:id", checkToken, async (req, res) => {
  try {
    let editedTrip = {
      title: req.body.title,
      description: req.body.description,
      country: req.body.country,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      editedBy: req.user.id,
    };

    let trip = await Trip.findByIdAndUpdate(req.params.id, editedTrip);

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
// CREATE new trip
router.post("/", checkToken, async (req, res) => {
  try {
    let { title, description, country, start_date, end_date } = req.body;

    let trip = new Trip({
      title,
      description,
      country,
      start_date,
      end_date,
      createdBy: req.user.id,
    });

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
// GET all trips
router.get("/", checkToken, async (req, res) => {
  console.log(req.user);

  try {
    let user = await User.find();
    let trips = await Trip.find().populate("createdBy");
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

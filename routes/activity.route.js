const router = require("express").Router();
const Activity = require("../model/activity.model");

/* 
    @route GET api/activities/:id
    @desc Gets one activity
    @access public
*/
router.get("/:id", async (req, res) => {
  try {
    let activity = await Activity.findById(req.params.id);
    res.status(200).json({
      message: "get works",
      activity,
    });
  } catch (err) {
    res.status(500).json({
      message: "get dont work",
      statuscode: "EB500",
    });
  }
});
/* 
    @route PUT api/activities/:id
    @desc updates one activity
    @access public
*/
router.put("/:id", async (req, res) => {
  try {
    let activity = await Activity.findByIdAndUpdate(req.params.id, req.body);

    if (activity) {
      res.status(200).json({
        message: "put works",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "put dont work",
      statuscode: "EB500",
    });
  }
});

/* 
    @route DELETE api/activities/:id
    @desc deletes one activity
    @access public
*/
router.delete("/:id", async (req, res) => {
  try {
    let activityDelete = await Activity.findByIdAndDelete(req.params.id);

    if (activityDelete) {
      res.status(200).json({
        message: "delete works",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "delete doenst work",
      statuscode: "EB500",
    });
  }
});

/* 
    @route POST api/activities
    @desc Gets all activities
    @access public
*/
router.post("/", async (req, res) => {
  try {
    let activity = new Activity(req.body);

    let savedactivity = await activity.save();

    res.status(201).json({
      message: "post works",
    });
  } catch (error) {
    res.status(500).json({
      message: "post doesnt work",
      statuscode: "EB500",
    });
  }
});
/* 
@route GET api/activities
@desc Gets all activities
@access public
*/
router.get("/", async (req, res) => {
  try {
    let activities = await Activity.find();

    res.status(200).send({
      message: "get all works",
      count: activities.length,
      activities,
    });
  } catch (error) {
    res.status(500).json({
      message: "get all doenst work",
      statuscode: "EB500",
    });
  }
});

module.exports = router;

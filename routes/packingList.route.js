const router = require("express").Router();
const PackingList = require("../model/packingList.model");

/* 
    @route GET api/packingLists/:id
    @desc Gets one packingList
    @access public
*/
router.get("/:id", async (req, res) => {
  try {
    let packingList = await PackingList.findById(req.params.id);
    res.status(200).json({
      message: "get works",
      packingList,
    });
  } catch (err) {
    res.status(500).json({
      message: "get dont work",
      statuscode: "EB500",
    });
  }
});
/* 
    @route PUT api/packingLists/:id
    @desc updates one packingList
    @access public
*/
router.put("/:id", async (req, res) => {
  try {
    let packingList = await PackingList.findByIdAndUpdate(req.params.id, req.body);

    if (packingList) {
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
    @route DELETE api/packingLists/:id
    @desc deletes one packingList
    @access public
*/
router.delete("/:id", async (req, res) => {
  try {
    let packingListDelete = await PackingList.findByIdAndDelete(req.params.id);

    if (packingListDelete) {
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
    @route POST api/packingLists
    @desc Gets all packingLists
    @access public
*/
router.post("/", async (req, res) => {
  try {
    let packingList = new PackingList(req.body);

    let savedpackingList = await packingList.save();

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
@route GET api/packingLists
@desc Gets all packingLists
@access public
*/
router.get("/", async (req, res) => {
  try {
    let packingLists = await PackingList.find();

    res.status(200).send({
      message: "get all works",
      count: packingLists.length,
      packingLists,
    });
  } catch (error) {
    res.status(500).json({
      message: "get all doenst work",
      statuscode: "EB500",
    });
  }
});

module.exports = router;

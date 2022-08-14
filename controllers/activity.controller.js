const Activity = require("../models/activity.model");
const mongoose = require("mongoose");

/**
 * It's an async function that uses the Activity model to find all activities and then returns a status
 * of 200 with the activities in the res body.
 * @param req - The request object.
 * @param res - the res object
 */
const getActivities = async (req, res) => {
  // console.log("getActivities:", req.body);
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * It's an async function that uses the Activity model to find an activity by id and then returns a status
 * of 200 with the activity in the res body.
 * @param req - The request object.
 * @param res - the res object
 */
const getActivity = async (req, res) => {
  // console.log("getActivity id: ", req.params.id);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid object id");
  }
  try {
    const activity = await Activity.findById(req.params.id);
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * It creates a new activity and saves it to the database.
 * @param req - The request object.
 * @param res - the res object
 */
const addActivity = async (req, res) => {
  // console.log("addActivity:", req.body);
  const activity = new Activity(req.body);

  try {
    const newActivity = await activity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * It's an async function that uses the Activity model to find and activity by id, update it, and then returns a status
 * of 200 with the activities in the res body.
 * @param req - The request object.
 * @param res - the res object
 */

const editActivity = async (req, res) => {
  // console.log("editActivity req.body:", req.body);
  // console.log("editActivity req.params.id:", req.params.id);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid object id");
  }
  await Activity.findByIdAndUpdate(
    req.params.id,
    req.body,
    [(lean = true), (returnDocument = "after")],
    (err, doc) => {
      if (!err) {
        // return activity;
        // console.log(
        //   "Callback from editActivity Activity.findByIdAndUpdate: ",
        //   doc
        // );
        res.status(200).send(doc);
      }
    }
  )
    .clone()
    .catch(function (err) {
      // console.log("editActivity error:", err);
      res.status(500).send(err);
    });
};

/**
 * It's an async function that uses the Activity model to find an activity by id, delete it, and then returns a status
 * of 200 with the activities in the res body.
 * @param req - The request object.
 * @param res - the res object
 */
const removeActivity = async (req, res) => {
  // console.log("removeActivity req.params.id: ", req.params.id);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid object id");
  }
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) res.status(404).send("Cannot find activity");
    res.status(200).send("activity deleted successfully");
  } catch (error) {
    console.log("removeActivity error: ", error);
    res.status(500).send(error);
  }
};

module.exports = {
  getActivities,
  getActivity,
  addActivity,
  editActivity,
  removeActivity,
};

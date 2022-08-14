const express = require("express");

const {
  getActivities,
  getActivity,
  addActivity,
  editActivity,
  removeActivity,
} = require("../controllers/activity.controller");

const router = express.Router();

/* Creating a route for the GET request. */
router.get("/activities", getActivities);
/* Creating a route for the GET request. */
router.get("/activity/:id", getActivity);
/* Creating a route for the POST request. */
router.post("/activity", addActivity);
/* Createing a route for the PATCH request */
router.put("/activity/:id", editActivity);
/* Createing a route for the DELETE request */
router.delete("/activity/:id", removeActivity);

module.exports = router;

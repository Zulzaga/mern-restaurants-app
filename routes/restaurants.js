const router = require("express").Router();
let Restaurant = require("../models/restaurant.model");

router.route("/").get(async (req, res) => {
  const time = req.query.datetime;

  if (req.query.name || time) {
    let query = {};
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }

    if (time) {
      const currentTime =
        new Date(time).getHours() + "." + new Date(time).getMinutes();
      const weekdays = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

      query.openHours = {
        $elemMatch: {
          day: weekdays[new Date(time).getDay() - 1],
          startTime: { $lte: currentTime },
          endTime: { $gte: currentTime },
        },
      };
    }

    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } else {
    Restaurant.find()
      .limit(100)
      .then((restaurants) => res.json(restaurants))
      .catch((err) => res.status(400).json("Error: " + err));
  }
});

module.exports = router;

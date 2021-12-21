const router = require("express").Router();
let User = require("../models/user.model");
let Restaurant = require("../models/restaurant.model");

router.route("/:user_id").get((req, res) => {
  User.findById(req.params.user_id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:user_id/collections").get(async (req, res) => {
  const user = await User.findById(req.params.user_id);

  const newCollections = [];
  for (let i = 0; i < user.collections.length; i++) {
    newCollections.push({
      name: user.collections[i].name,
      restaurants: [],
    });

    if (user.collections[i].restaurants.length) {
      const restaurants = await Restaurant.find({
        _id: { $in: user.collections[i].restaurants },
      });

      newCollections[i].restaurants = restaurants;
    }
  }

  res.json(newCollections);
});

router.route("/:user_id/collections").post(async (req, res) => {
  const user = await User.findOne({ _id: req.params.user_id });

  user.collections = [
    ...user.collections,
    {
      name: req.body.name,
      restaurants: [],
    },
  ];
  user.save();

  const newCollections = [];
  for (let i = 0; i < user.collections.length; i++) {
    newCollections.push({
      name: user.collections[i].name,
      restaurants: [],
    });

    if (user.collections[i].restaurants.length) {
      const restaurants = await Restaurant.find({
        _id: { $in: user.collections[i].restaurants },
      });

      newCollections[i].restaurants = restaurants;
    }
  }

  res.json(newCollections);
});

router.route("/:user_id/collections/:name").get((req, res) => {
  User.findById(req.params.user_id)
    .then((user) => {
      const collections = user.collections;
      const restaurant_ids = collections.filter(
        (collection) => collection.name === req.params.name
      ).restaurants;

      Restaurant.find({ _id: { $in: restaurant_ids } })
        .then((restaurants) => {
          res.json(restaurants);
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:user_id/collections/:name").post((req, res) => {
  User.findById(req.params.user_id)
    .then((user) => {
      for (let i = 0; i < user.collections.length; i++) {
        if (user.collections[i].name === req.params.name) {
          const old = user.collections[i].restaurants;
          if (!old.includes(req.body.id)) old.push(req.body.id);
          user.collections[i].restaurants = old;
          break;
        }
      }

      user.save();
      res.json(user.collections);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

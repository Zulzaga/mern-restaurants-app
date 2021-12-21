const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  openHours: [
    {
      day: String,
      startTime: Number,
      endTime: Number,
    },
  ],
  displayValue: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;

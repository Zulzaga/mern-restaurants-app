const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  collections: [
    {
      name: String,
      restaurants: [mongoose.ObjectId],
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

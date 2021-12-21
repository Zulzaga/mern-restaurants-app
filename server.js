const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://admin-zulsar:123456abcd@cluster0.azhm7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB db connection established successfully");
});

const fs = require("fs");
let data = fs.readFileSync("restaurants.txt", "utf8");
data = data.replaceAll("Thurs", "Thu");
data = data.replaceAll("Weds", "Wed");
let restaurants = data.split("\n");
let Restaurant = require("./models/restaurant.model");

const weekdays = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

const converDates = (date) => {
  let dates = date.split(", ");
  let newDates = [];
  for (let date of dates) {
    if (!date.includes("-")) {
      newDates.push(date);
    } else {
      let splittedDates = date.split("-");
      let startIndex = weekdays.indexOf(splittedDates[0].trim());
      while (weekdays[startIndex] !== splittedDates[1].trim()) {
        newDates.push(weekdays[startIndex]);
        startIndex += 1;
        startIndex %= weekdays.length;
      }
    }
  }

  return newDates;
};

const parseHour = (time) => {
  let hours = time.split(" ")[0];
  let result = parseInt(hours.split(":")[0]);

  if (time.includes("pm")) {
    if (result != 12) {
      result += 12;
    }
  }

  result = String(result);
  if (hours.split(":")[1]) {
    result += "." + hours.split(":")[1];
  }
  return parseFloat(Math.round(result));
};

const parseTime = (time) => {
  const ranges = time.split(" - ");

  return ranges;
};

const parseHours = (openHour) => {
  for (let index = 0; index < openHour.length; index++) {
    if ("1234567890".includes(openHour[index])) {
      const dates = converDates(openHour.substring(0, index - 1));
      const times = parseTime(openHour.substring(index));
      const weekdays = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

      const newDates = [];
      for (let date of dates) {
        if (!times[1].includes("am")) {
          newDates.push({
            day: date,
            startTime: parseHour(times[0]),
            endTime: parseHour(times[1]),
          });
        } else {
          // need to separate into 2 different dates
          const endTime = parseInt(parseHour(times[1]));
          if (times[0].includes("am")) {
            if (parseHour(times[0]) < parseHour(times[1])) {
              newDates.push({
                day: date,
                startTime: parseHour(times[0]),
                endTime: parseHour(times[1]),
              });
            } else {
              newDates.push({
                day: date,
                startTime: parseHour(times[0]),
                endTime: 24,
              });

              newDates.push({
                day: weekdays[(weekdays.indexOf(date) + 1) % weekdays.length],
                startTime: 0,
                endTime: parseHour(times[1]),
              });
            }
          } else if (parseHour(times[1]) === 12) {
            newDates.push({
              day: date,
              startTime: parseHour(times[0]),
              endTime: 24,
            });
          } else {
            newDates.push({
              day: date,
              startTime: parseHour(times[0]),
              endTime: 24,
            });

            newDates.push({
              day: weekdays[(weekdays.indexOf(date) + 1) % weekdays.length],
              startTime: 0,
              endTime: parseHour(times[1]),
            });
          }
        }
      }
      return newDates;
    }
  }

  return [];
};

const LOAD_DB = false;

Restaurant.find().then((results) => {
  if (!results.length) {
    for (let restaurant of restaurants) {
      const result = restaurant.split('"');
      const name = result[1];
      let openHours = result[3];
      openHours = openHours.split(" / ");
      let newHours = [];

      for (let openHour of openHours) {
        for (let parsed of parseHours(openHour)) {
          newHours.push(parsed);
        }
      }

      const newRestaurant = new Restaurant({
        name: name,
        openHours: newHours,
        displayValue: result[3],
      });

      newRestaurant.save((err, doc) => {
        if (err) console.log(err);
      });
    }
  }
});

const restaurantsRouter = require("./routes/restaurants");
const usersRouter = require("./routes/users");

app.use("/api/restaurants", restaurantsRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

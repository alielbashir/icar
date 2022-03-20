var express = require("express");
var router = express.Router();
var verifyToken = require("./auth");
const databaseClient = require("/workspace/backend/database");

router.get("/", verifyToken, async (req, res) => {
  const user_id = req.user;
  console.log(user_id);
  // getting user's cars
  const data = await databaseClient.clinet.query(
    `SELECT * FROM cars WHERE user_id = $1`,
    [user_id]
  );

  carsData = data.rows;

  var car_ids = [];
  for (var i = 0; i < carsData.length; i++) {
    car_ids.push(carsData[i].car_id);
  }

  console.log(`car IDS for user ${user_id} = ${car_ids.toString()}`);

  const db = await databaseClient.connectToMongo(
    "mongodb://mongodb:27017/icarDB"
  );
  console.log("connected to mongodb");

  const carsOptions = carsData.map((car) => {
    return { car_id: car.car_id };
  });
  console.log("car options = ", carsOptions);
  const thirtyMinsAgo = (new Date().getTime() - 30 * 60000) / 1000;
  // const thirtyMinsAgo = (Date.UTC();
  console.log(thirtyMinsAgo);
  const options = {
    $or: carsOptions,
    time: { $gt: thirtyMinsAgo },
  };

  const cars = await db.collection("locations").find(options).toArray();
  console.log(`cars belonging to user ${user_id} = ${JSON.stringify(cars)}`);

  res.status(200).json(cars);
});

module.exports = router;

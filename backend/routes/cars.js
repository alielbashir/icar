var express = require("express");
var router = express.Router();
var verifyToken = require("./auth");
const databaseClient = require("/workspace/backend/database");


router.get("/", verifyToken, async (req, res) => {
  const user_id = req.user;
  console.log(user_id);
  // getting user's cars
  const data = await databaseClient.query(
    `SELECT * FROM cars WHERE user_id = $1`,
    [user_id]
  );

  carsData = data.rows;
  var car_ids = [];
  for (var i = 0; i < carsData.length; i++) {
    car_ids.push(carsData[i].car_id);
  }

  res.status(200).json({
    car_ids: car_ids,
  });
});

module.exports = router;

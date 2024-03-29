var express = require("express");
var router = express.Router();
const databaseClient = require("/workspace/backend/database");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("test123");
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    console.log(`awaiting db...`);
    const data = await databaseClient.clinet.query(
      `SELECT * FROM users WHERE username = $1 AND password = $2`,
      [username, password]
    ); //Verifying if the user exists in the database
    console.log(`finished awaiting db`);

    const userData = data.rows;

    if (userData.length === 0) {
      res.status(400).json({
        error: "Incorrect credentials. Please try again",
      });
      return;
    }

    const time = new Date().toISOString();
    await databaseClient.clinet.query(
      `INSERT INTO "dates" ("user_id", "timestamp")  
       VALUES ($1, $2)`,
      [userData[0].id, time]
    );

    const token = jwt.sign(
      {
        user_id: userData[0].id,
      },
      process.env.ACCESS_TOKEN
    );
    res.status(200).json({
      message: "User signed in!",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
});

module.exports = router;

const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(`received auth header = ${authHeader}`);
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log(`received token = ${token}`);
    const decoded = jwt.verify(token, config.ACCESS_TOKEN);
    req.user = decoded["user_id"];
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;

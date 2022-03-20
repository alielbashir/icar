var createError = require("http-errors");
var express = require("express");
const databaseClient = require("./database");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var carsRouter = require("./routes/cars");
const dotenv = require("dotenv");
const {verifyAccessToken} = require('/workspace/backend/routes/auth')

var app = express();


// parse application/json
// app.use(bodyParser.json());
// app.use(logger('dev'))
app.use(express.json())
// get config vars
dotenv.config();
databaseClient.connect(); // connecting to databse
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/cars", carsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;

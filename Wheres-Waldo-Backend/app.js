var createError = require("http-errors");
const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require('dotenv').config()

var app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const mongoDB = process.env.MONGODB_KEY;
main().catch((err) => console.log(err));
async function main() {
	console.log('connecting')
	await mongoose.connect(mongoDB);
	console.log("connected");
}

const allowedOrigins = ['https://wheres-waldo-rho.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.set("trust proxy", 1);

const requestTime = function (req, res, next) {
	req.requestTime = Date.now();
	next();
};

app.use(requestTime);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

process.on("unhandledRejection", (reason, promise) => {
	console.log(reason, promise);
	// Application specific error-handling here
});

module.exports = app;

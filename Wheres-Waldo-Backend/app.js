var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

var app = express();
const cloudinary = require("cloudinary");
const mongoDB = process.env.MONGODB_KEY;
main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
	console.log("connected");
}
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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

(async function () {
	// Configuration
	cloudinary.config({
		cloud_name: "dak6py2ng",
		api_key: "375799247189141",
		api_secret: process.env.CLOUDINARY_KEY, // Click 'View Credentials' below to copy your API secret
	});

	const images = [
		"../wheres-waldo-frontend/src/assets/waldoBeach.jpg",
		"../wheres-waldo-frontend/src/assets/waldoDowntown.jpg",
		"../wheres-waldo-frontend/src/assets/waldoFactory.jpg",
	];

	// Upload an image

	const uploadImages = async () => {
		for (const image in images) {
			console.log(image, "this is image");
			const result = await cloudinary.uploader.upload(images[image]);
			console.log(result, "this is result");
		}
	};

	await uploadImages();

	// // Optimize delivery by resizing and applying auto-format and auto-quality
	// const optimizeUrl = cloudinary.url(images, {
	// 	fetch_format: "auto",
	// 	quality: "auto",
	// });

	// console.log(optimizeUrl);

	// // Transform the image: auto-crop to square aspect_ratio
	// const autoCropUrl = cloudinary.url(images, {
	// 	crop: "auto",
	// 	gravity: "auto",
	// 	width: 500,
	// 	height: 500,
	// });

	// console.log(autoCropUrl);
})();

module.exports = app;

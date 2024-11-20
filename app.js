const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

// DB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "secretcode",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// Page not found error

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
});

// Error Middleware

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.listen(8080, () => {
  console.log("The Server is running on Port 8080");
});

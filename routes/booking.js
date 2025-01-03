const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middelware.js");
const bookingController = require("../controllers/bookingController.js");

// Booking route: show booking form
router.get("/:id/book", isLoggedIn, wrapAsync(bookingController.showBookingForm));

// Booking route: handle booking form submission
router.post("/:id/book", isLoggedIn, wrapAsync(bookingController.createBooking));

module.exports = router;

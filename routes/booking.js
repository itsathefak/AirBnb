const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middelware"); // Ensure correct file name for middleware
const bookingController = require("../controllers/bookingController");

// Booking route: show booking form
router.get("/:id/book", isLoggedIn, wrapAsync(bookingController.showBookingForm));

// Booking route: handle booking form submission
router.post("/:id/book", isLoggedIn, wrapAsync(bookingController.createBooking));

// // Booking confirmation page
// router.get("/:id/confirmation", isLoggedIn, wrapAsync(bookingController.showConfirmationPage));


module.exports = router;

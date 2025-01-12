const Booking = require('../Models/booking');
const Listing = require('../Models/listing');
const { sendBookingConfirmationEmail } = require("../utils/bookingMailer"); // Import the email function

// Show booking form for a specific listing
exports.showBookingForm = async (req, res) => {
    try {
        const listingId = req.params.id; // Get the listingId from the URL
        const listing = await Listing.findById(listingId); // Find the listing by ID

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Render the booking form with the listing data
        res.render('listings/book', { listing });
    } catch (error) {
        console.error('Error retrieving booking form:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the booking form' });
    }
};



// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const {
      firstName, lastName, email, phone, checkIn, checkOut, guests, requests,
      cardName, cardNumber, expiryDate, cvv, listingId
    } = req.body;

    // Find the listing by ID to get the title, location, and price
    const listing = await Listing.findById(listingId);
    if (!listing) {
      console.error(`Listing not found with ID: ${listingId}`);
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Create a new booking
    const booking = new Booking({
      firstName,
      lastName,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      requests,
      cardName,
      cardNumber,
      expiryDate,
      cvv,
      listing: listingId
    });

    // Save the booking to the database
    await booking.save();

    // Update the listing with booking info
    listing.bookings.push(booking._id);
    await listing.save();

    // Prepare booking details for email
    const bookingDetails = {
        image: listing.image.url,
      title: listing.title,
      location: listing.location,
      checkIn,
      checkOut,
      totalPrice: listing.price
    };

    // Send booking confirmation email
    await sendBookingConfirmationEmail(email, bookingDetails);

    // Flash success message and redirect
    req.flash("success", "Your Booking has been Confirmed");
    res.redirect('/listings'); 
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'An error occurred while creating the booking', error });
  }
};


// Show booking confirmation page (optional)
exports.showConfirmationPage = async (req, res) => {
    try {
        const { id } = req.params; // Booking ID
        const booking = await Booking.findById(id).populate("listing"); // Fetch booking with listing data
        if (!booking) {
            return res.status(404).send("Booking not found");
        }

        // Render the confirmation page with booking data
        res.render("listings/bookingconfirmed", { booking });
    } catch (error) {
        console.error("Error displaying confirmation page:", error);
        res.status(500).send("An error occurred while displaying the confirmation page");
    }
};

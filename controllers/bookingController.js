const Booking = require('../models/booking');
const Listing = require('../Models/listing'); // Fixed case sensitivity

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
      // Log the incoming request body to check what data is being sent
      console.log(req.body);

      const {
          firstName, lastName, email, phone, checkIn, checkOut, guests, requests, 
          cardName, cardNumber, expiryDate, cvv, listingId
      } = req.body;

      // Check if all required fields are provided
      if (!firstName || !lastName || !email || !phone || !checkIn || !checkOut || 
          !guests || !cardName || !cardNumber || !expiryDate || !cvv || !listingId) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      // Find the listing by ID
      const listing = await Listing.findById(listingId);
      if (!listing) {
          return res.status(404).json({ message: 'Listing not found' });
      }

      // Calculate the total price based on the number of nights
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 3600 * 24)); // Number of nights
      const totalPrice = listing.price * nights;

      // Create a new booking document
      const newBooking = new Booking({
          listingId,
          firstName,
          lastName,
          email,
          phone,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          guests,
          cardName,
          cardNumber,
          expiryDate,
          cvv,
          requests,
          totalPrice
      });

      // Save the new booking to the database
      await newBooking.save();

      // Redirect to the listings page after successful booking
      res.redirect('/listings');
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the booking' });
  }
};

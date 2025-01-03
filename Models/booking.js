const mongoose = require('mongoose');

// Define the booking schema
const bookingSchema = new mongoose.Schema({
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    guests: {
        type: Number,
    },
    requests: {
        type: String,
        default: ''
    },
    cardName: {
        type: String,
    },
    cardNumber: {
        type: String,
    },
    expiryDate: {
        type: String,
    },
    cvv: {
        type: String,
    },
    totalPrice: {
        type: Number,
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

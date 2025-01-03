const mongoose = require('mongoose');

// Define the booking schema
const bookingSchema = new mongoose.Schema({
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    requests: {
        type: String,
        default: ''
    },
    cardName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

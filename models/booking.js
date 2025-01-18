// models/booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    totalBookingAmount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    gstAmount: { type: Number, default: 0 },
    igstAmount: { type: Number, default: 0 },
    sgstAmount: { type: Number, default: 0 },
    cgstAmount: { type: Number, default: 0 },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;

// routes/gst.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

const GST_RATE = 0.18; // 18%

// Add a new booking
router.post('/bookings', async (req, res) => {
    const { id, name, totalBookingAmount } = req.body;
    const booking = new Booking({ id, name, totalBookingAmount });
    
    try {
        await booking.save();
        res.status(201).json({ message: "Booking added successfully", booking });
    } catch (error) {
        res.status(400).json({ message: "Error adding booking", error });
    }
});

// Update booking status
router.patch('/bookings/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const booking = await Booking.findOne({ id });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = status;

        if (status === 'finished') {
            const gstAmount = booking.totalBookingAmount * GST_RATE;
            booking.gstAmount = gstAmount;
            booking.igstAmount = gstAmount; // Assuming interstate for simplicity
            booking.sgstAmount = gstAmount / 2; // For intrastate
            booking.cgstAmount = gstAmount / 2; // For intrastate
        }

        await booking.save();
        res.json({ message: "Booking status updated successfully", booking });
    } catch (error) {
        res.status(400).json({ message: "Error updating booking", error });
    }
});

module.exports = router;

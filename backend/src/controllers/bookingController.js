import { Booking } from '../models/Booking.js';
import { Property } from '../models/Property.js';
import { Notification } from '../models/Notification.js';

export const createBooking = async (req, res) => {
  try {
    const {
      propertyId,
      visitDate,
      visitTime,
      visitType,
      notes,
      userName,
      userEmail,
      userPhone,
    } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const booking = new Booking({
      property: property._id,
      propertyTitle: property.title,
      propertyLocation: `${property.location.locality}, ${property.location.city}`,
      propertyImage: property.images && property.images[0] ? property.images[0] : '',
      user: req.user ? req.user._id : null,
      userName: userName || (req.user ? req.user.name : 'Valued Client'),
      userEmail: userEmail || (req.user ? req.user.email : 'client@example.com'),
      userPhone: userPhone || (req.user ? req.user.phone : ''),
      visitDate,
      visitTime,
      visitType: visitType || 'In-Person Visit',
      notes: notes || '',
      status: 'Pending',
    });

    const savedBooking = await booking.save();

    // Auto-create a notification
    await Notification.create({
      title: 'New Site Visit Scheduled',
      message: `${savedBooking.userName} booked a ${savedBooking.visitType} for "${property.title}" on ${visitDate} at ${visitTime}.`,
      type: 'booking',
      link: '/admin',
    });

    res.status(201).json({
      success: true,
      message: 'Site visit successfully scheduled! Our agent will confirm shortly.',
      booking: savedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const query = req.user
      ? { $or: [{ user: req.user._id }, { userEmail: req.user.email }] }
      : {};
    const bookings = await Booking.find(query).sort({ createdAt: -1 }).populate('property');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).populate('property');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    // Trigger notification
    await Notification.create({
      title: `Visit Booking ${status}`,
      message: `The site visit for "${booking.propertyTitle}" has been updated to "${status}".`,
      type: 'booking',
      link: '/my-bookings',
    });

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

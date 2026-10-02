import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    propertyTitle: {
      type: String,
      default: '',
    },
    propertyLocation: {
      type: String,
      default: '',
    },
    propertyImage: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    visitDate: {
      type: String,
      required: true,
    },
    visitTime: {
      type: String,
      required: true,
    },
    visitType: {
      type: String,
      enum: ['In-Person Visit', 'Virtual 3D Video Tour'],
      default: 'In-Person Visit',
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model('Booking', bookingSchema);

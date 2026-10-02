import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
      enum: ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Studio', 'Plot', 'Commercial'],
      default: 'Apartment',
    },
    listingType: {
      type: String,
      required: true,
      enum: ['Sale', 'Rent'],
      default: 'Sale',
    },
    price: {
      type: Number,
      required: true,
    },
    priceDisplay: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
      default: 2,
    },
    bathrooms: {
      type: Number,
      required: true,
      default: 2,
    },
    bhk: {
      type: Number,
      required: true,
      default: 2,
    },
    areaSqFt: {
      type: Number,
      required: true,
    },
    pricePerSqFt: {
      type: Number,
      default: function () {
        return this.areaSqFt > 0 ? Math.round(this.price / this.areaSqFt) : 0;
      },
    },
    location: {
      address: { type: String, required: true },
      locality: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, default: 'Maharashtra' },
      pincode: { type: String, default: '400001' },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    amenities: [
      {
        type: String,
      },
    ],
    furnishing: {
      type: String,
      enum: ['Fully Furnished', 'Semi-Furnished', 'Unfurnished'],
      default: 'Semi-Furnished',
    },
    images: [
      {
        type: String,
      },
    ],
    videoUrl: {
      type: String,
      default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    floorPlanUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    },
    yearBuilt: {
      type: Number,
      default: 2024,
    },
    parkingSpaces: {
      type: Number,
      default: 1,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    verificationDetails: {
      reraApproved: { type: Boolean, default: true },
      titleClear: { type: Boolean, default: true },
      physicalInspectionDone: { type: Boolean, default: true },
      registeredId: { type: String, default: 'PR/MH/2026/09918' },
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent',
    },
    agentDetails: {
      name: { type: String, default: 'Ayan Sharma' },
      phone: { type: String, default: '+91 98765 43210' },
      whatsapp: { type: String, default: '+919876543210' },
      email: { type: String, default: 'ayan.agent@realestate.com' },
      image: { type: String, default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
      rating: { type: Number, default: 4.9 },
    },
    status: {
      type: String,
      enum: ['Available', 'Under Offer', 'Sold', 'Rented'],
      default: 'Available',
    },
    views: {
      type: Number,
      default: 142,
    },
  },
  {
    timestamps: true,
  }
);

propertySchema.index({
  title: 'text',
  description: 'text',
  'location.city': 'text',
  'location.locality': 'text',
});

export const Property = mongoose.model('Property', propertySchema);

import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
      default: '',
    },
    experienceYears: {
      type: Number,
      default: 5,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewsCount: {
      type: Number,
      default: 32,
    },
    bio: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    },
    licenseNumber: {
      type: String,
      default: 'RERA/AG/2026/8942',
    },
    specialties: [
      {
        type: String,
      },
    ],
    verified: {
      type: Boolean,
      default: true,
    },
    propertiesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Agent = mongoose.model('Agent', agentSchema);

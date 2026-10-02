import { Property } from '../models/Property.js';
import { Booking } from '../models/Booking.js';
import { Enquiry } from '../models/Enquiry.js';
import { Agent } from '../models/Agent.js';
import { User } from '../models/User.js';

export const getAdminStats = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const verifiedProperties = await Property.countDocuments({ isVerified: true });
    const forSaleCount = await Property.countDocuments({ listingType: 'Sale' });
    const forRentCount = await Property.countDocuments({ listingType: 'Rent' });

    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });

    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: 'New' });

    const totalAgents = await Agent.countDocuments();
    const totalUsers = await User.countDocuments();

    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    const recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      stats: {
        totalProperties,
        verifiedProperties,
        forSaleCount,
        forRentCount,
        totalBookings,
        pendingBookings,
        totalEnquiries,
        newEnquiries,
        totalAgents,
        totalUsers,
      },
      recentBookings,
      recentEnquiries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

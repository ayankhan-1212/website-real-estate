import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Agent } from '../models/Agent.js';
import { Property } from '../models/Property.js';
import { Booking } from '../models/Booking.js';
import { Enquiry } from '../models/Enquiry.js';
import { Notification } from '../models/Notification.js';
import { agentsData, propertiesData } from './seedData.js';

dotenv.config();

const seedDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI ||
      'mongodb+srv://Chmtycsayan:Ayan1120@sunny.5f6su9t.mongodb.net/RealEstate_db?appName=sunny';

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB Atlas for full demo seeding...');

    // Clear existing collections
    await User.deleteMany();
    await Agent.deleteMany();
    await Property.deleteMany();
    await Booking.deleteMany();
    await Enquiry.deleteMany();
    await Notification.deleteMany();
    console.log('🗑️ Existing collections cleared.');

    // 1. Create Users
    const adminUser = await User.create({
      name: 'RealEstate Master Admin',
      email: 'admin@realestate.com',
      password: 'admin123',
      role: 'admin',
      phone: '+91 99999 88888',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    });

    const demoUser = await User.create({
      name: 'Sunny Rajbhar',
      email: 'user@realestate.com',
      password: 'user123',
      role: 'user',
      phone: '+91 98765 12345',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    });

    const user2 = await User.create({
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      password: 'user123',
      role: 'user',
      phone: '+91 98200 44332',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    });

    const user3 = await User.create({
      name: 'Kavita Patel',
      email: 'kavita.patel@example.com',
      password: 'user123',
      role: 'user',
      phone: '+91 99870 11223',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    });

    console.log('👤 Admin & Multiple Demo Users created.');

    // 2. Create Agents
    const createdAgents = await Agent.insertMany(agentsData);
    console.log(`👨‍💼 ${createdAgents.length} Verified Agents created.`);

    // 3. Create Properties and link to agents
    const propertiesWithAgents = propertiesData.map((prop, idx) => {
      const assignedAgent = createdAgents[idx % createdAgents.length];
      return {
        ...prop,
        agent: assignedAgent._id,
        agentDetails: {
          name: assignedAgent.name,
          phone: assignedAgent.phone,
          whatsapp: assignedAgent.whatsapp,
          email: assignedAgent.email,
          image: assignedAgent.image,
          rating: assignedAgent.rating,
        },
      };
    });

    const createdProperties = await Property.insertMany(propertiesWithAgents);
    console.log(`🏠 ${createdProperties.length} Luxury Properties created across India.`);

    // Populate Wishlists
    demoUser.wishlist = [
      createdProperties[0]._id, // Worli Penthouse
      createdProperties[1]._id, // Goa Villa
      createdProperties[6]._id, // Marine Drive
      createdProperties[12]._id, // Juhu Villa
    ];
    await demoUser.save();

    user2.wishlist = [createdProperties[3]._id, createdProperties[5]._id];
    await user2.save();

    console.log('❤️ Demo Wishlists populated.');

    // 4. Create Rich Site Visit Bookings (Feature 9)
    await Booking.create([
      {
        property: createdProperties[0]._id,
        propertyTitle: createdProperties[0].title,
        propertyLocation: `${createdProperties[0].location.locality}, ${createdProperties[0].location.city}`,
        propertyImage: createdProperties[0].images[0],
        user: demoUser._id,
        userName: demoUser.name,
        userEmail: demoUser.email,
        userPhone: demoUser.phone,
        visitDate: '2026-10-15',
        visitTime: '11:30 AM',
        visitType: 'In-Person Visit',
        notes: 'Interested in inspecting the private sky plunge pool and car parking slots.',
        status: 'Confirmed',
      },
      {
        property: createdProperties[1]._id,
        propertyTitle: createdProperties[1].title,
        propertyLocation: `${createdProperties[1].location.locality}, ${createdProperties[1].location.city}`,
        propertyImage: createdProperties[1].images[0],
        user: demoUser._id,
        userName: demoUser.name,
        userEmail: demoUser.email,
        userPhone: demoUser.phone,
        visitDate: '2026-10-22',
        visitTime: '02:00 PM',
        visitType: 'Virtual 3D Video Tour',
        notes: 'Requested live Google Meet spatial walkthrough with agent Priya Mehra.',
        status: 'Confirmed',
      },
      {
        property: createdProperties[2]._id,
        propertyTitle: createdProperties[2].title,
        propertyLocation: `${createdProperties[2].location.locality}, ${createdProperties[2].location.city}`,
        propertyImage: createdProperties[2].images[0],
        user: demoUser._id,
        userName: demoUser.name,
        userEmail: demoUser.email,
        userPhone: demoUser.phone,
        visitDate: '2026-10-28',
        visitTime: '04:00 PM',
        visitType: 'In-Person Visit',
        notes: 'Sunset viewing appointment for the Bandra wrap-around balcony.',
        status: 'Pending',
      },
      {
        property: createdProperties[6]._id,
        propertyTitle: createdProperties[6].title,
        propertyLocation: `${createdProperties[6].location.locality}, ${createdProperties[6].location.city}`,
        propertyImage: createdProperties[6].images[0],
        user: user2._id,
        userName: user2.name,
        userEmail: user2.email,
        userPhone: user2.phone,
        visitDate: '2026-10-18',
        visitTime: '10:00 AM',
        visitType: 'In-Person Visit',
        notes: 'Rental lease inspection with legal documentation check.',
        status: 'Confirmed',
      },
      {
        property: createdProperties[3]._id,
        propertyTitle: createdProperties[3].title,
        propertyLocation: `${createdProperties[3].location.locality}, ${createdProperties[3].location.city}`,
        propertyImage: createdProperties[3].images[0],
        user: user3._id,
        userName: user3.name,
        userEmail: user3.email,
        userPhone: user3.phone,
        visitDate: '2026-10-08',
        visitTime: '06:00 PM',
        visitType: 'Virtual 3D Video Tour',
        notes: 'Completed video walkthrough of Whitefield clubhouse.',
        status: 'Completed',
      },
      {
        property: createdProperties[5]._id,
        propertyTitle: createdProperties[5].title,
        propertyLocation: `${createdProperties[5].location.locality}, ${createdProperties[5].location.city}`,
        propertyImage: createdProperties[5].images[0],
        user: user2._id,
        userName: user2.name,
        userEmail: user2.email,
        userPhone: user2.phone,
        visitDate: '2026-10-05',
        visitTime: '02:00 PM',
        visitType: 'In-Person Visit',
        notes: 'Client rescheduled due to travel plans.',
        status: 'Cancelled',
      },
    ]);
    console.log('📅 6 Site Visit Bookings seeded across various statuses.');

    // 5. Create Rich Inquiries & Leads (Feature 10)
    await Enquiry.create([
      {
        property: createdProperties[0]._id,
        propertyTitle: createdProperties[0].title,
        name: 'Karan Kapoor',
        email: 'karan.k@example.com',
        phone: '+91 91234 56789',
        message: 'Is the duplex penthouse price negotiable? Can we discuss payment milestones and registry timelines?',
        status: 'New',
      },
      {
        property: createdProperties[1]._id,
        propertyTitle: createdProperties[1].title,
        name: 'Ritu Sen',
        email: 'ritu.sen@example.com',
        phone: '+91 98888 77777',
        message: 'Looking to purchase this Assagao villa as a vacation rental property. Can you share rental yield history?',
        status: 'Contacted',
      },
      {
        property: createdProperties[3]._id,
        propertyTitle: createdProperties[3].title,
        name: 'Amitabh Joshi',
        email: 'a.joshi@example.com',
        phone: '+91 99201 12345',
        message: 'Does the Whitefield apartment building have dual EV fast charging stations in the basement?',
        status: 'Closed',
      },
      {
        property: createdProperties[12]._id,
        propertyTitle: createdProperties[12].title,
        name: 'Neelam Oberoi',
        email: 'neelam.o@example.com',
        phone: '+91 98110 99887',
        message: 'Enquiring on behalf of a family trust. Interested in a private walkthrough of the Juhu Beachfront Villa.',
        status: 'New',
      },
      {
        property: createdProperties[6]._id,
        propertyTitle: createdProperties[6].title,
        name: 'Dr. Siddharth Rao',
        email: 'dr.siddharth@example.com',
        phone: '+91 98450 33221',
        message: 'Relocating to Mumbai for hospital posting. Need 24-month lease on Marine Drive apartment starting Nov 1st.',
        status: 'Contacted',
      },
    ]);
    console.log('💬 5 Customer Leads & Inquiries seeded.');

    // 6. Create Smart Notifications (Feature 12)
    await Notification.create([
      {
        title: 'Site Visit Confirmed! 📅',
        message: 'Your site visit for "Skyline Luxe Penthouse" in Worli is confirmed for Oct 15 at 11:30 AM with Ayan Sharma.',
        type: 'booking',
        link: '/my-bookings',
        isRead: false,
      },
      {
        title: 'Price Drop Alert 💰',
        message: 'Emerald Bayview Residence in Bandra West price adjusted by 5%. Now listed at ₹5.20 Cr.',
        type: 'price_drop',
        link: `/properties/${createdProperties[2]._id}`,
        isRead: false,
      },
      {
        title: 'New Beachfront Villa Listed ✨',
        message: 'Check out "The Juhu Sands Beachfront Villa" with direct Arabian Sea private access.',
        type: 'new_property',
        link: `/properties/${createdProperties[12]._id}`,
        isRead: false,
      },
      {
        title: 'Virtual 3D Tour Scheduled 🎥',
        message: 'Live video walkthrough for "Serene Palms Private Villa" scheduled for Oct 22 at 02:00 PM.',
        type: 'booking',
        link: '/my-bookings',
        isRead: true,
      },
      {
        title: 'New Lead Assigned 👨‍💼',
        message: 'Neelam Oberoi submitted an enquiry for Juhu Beachfront Villa.',
        type: 'enquiry',
        link: '/admin',
        isRead: true,
      },
    ]);
    console.log('🔔 5 Smart Real-time Notifications seeded.');

    console.log('🎉 Comprehensive demo dataset seeded into MongoDB Atlas successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    process.exit(1);
  }
};

seedDB();

import { Enquiry } from '../models/Enquiry.js';
import { Property } from '../models/Property.js';
import { Notification } from '../models/Notification.js';

export const createEnquiry = async (req, res) => {
  try {
    const { propertyId, name, email, phone, message } = req.body;

    let propertyTitle = 'General Enquiry';
    if (propertyId) {
      const property = await Property.findById(propertyId);
      if (property) {
        propertyTitle = property.title;
      }
    }

    const enquiry = new Enquiry({
      property: propertyId || null,
      propertyTitle,
      name,
      email,
      phone,
      message,
      status: 'New',
    });

    const saved = await enquiry.save();

    await Notification.create({
      title: 'New Property Lead / Enquiry',
      message: `${name} sent an enquiry regarding "${propertyTitle}": "${message.slice(0, 60)}..."`,
      type: 'enquiry',
      link: '/admin',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. An agent will connect with you right away.',
      enquiry: saved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).populate('property');
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    enquiry.status = status;
    await enquiry.save();
    res.json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

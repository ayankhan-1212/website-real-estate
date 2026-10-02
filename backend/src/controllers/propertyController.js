import { Property } from '../models/Property.js';

export const getProperties = async (req, res) => {
  try {
    const {
      search,
      city,
      locality,
      propertyType,
      listingType,
      minPrice,
      maxPrice,
      bhk,
      furnishing,
      amenities,
      isVerified,
      isFeatured,
      sort,
      limit = 50,
      page = 1,
    } = req.query;

    const query = {};

    // Keyword search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.locality': { $regex: search, $options: 'i' } },
        { 'location.address': { $regex: search, $options: 'i' } },
      ];
    }

    // City & Locality
    if (city && city !== 'All') {
      query['location.city'] = { $regex: new RegExp(`^${city}$`, 'i') };
    }
    if (locality) {
      query['location.locality'] = { $regex: locality, $options: 'i' };
    }

    // Property Type & Listing Type
    if (propertyType && propertyType !== 'All') {
      query.propertyType = propertyType;
    }
    if (listingType && listingType !== 'All') {
      query.listingType = listingType;
    }

    // BHK
    if (bhk && bhk !== 'All') {
      if (bhk === '5+') {
        query.bhk = { $gte: 5 };
      } else {
        query.bhk = Number(bhk);
      }
    }

    // Furnishing
    if (furnishing && furnishing !== 'All') {
      query.furnishing = furnishing;
    }

    // Verified
    if (isVerified === 'true' || isVerified === true) {
      query.isVerified = true;
    }

    // Featured
    if (isFeatured === 'true' || isFeatured === true) {
      query.isFeatured = true;
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Amenities filter
    if (amenities) {
      const amenitiesList = Array.isArray(amenities)
        ? amenities
        : amenities.split(',').map((a) => a.trim());
      if (amenitiesList.length > 0) {
        query.amenities = { $all: amenitiesList };
      }
    }

    // Sorting
    let sortQuery = { createdAt: -1 };
    if (sort === 'price_asc') sortQuery = { price: 1 };
    else if (sort === 'price_desc') sortQuery = { price: -1 };
    else if (sort === 'views') sortQuery = { views: -1 };
    else if (sort === 'sqft_desc') sortQuery = { areaSqFt: -1 };
    else if (sort === 'newest') sortQuery = { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Property.countDocuments(query);
    const properties = await Property.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit))
      .populate('agent');

    res.json({
      properties,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedProperties = async (req, res) => {
  try {
    const featured = await Property.find({ isFeatured: true }).limit(6).populate('agent');
    res.json(featured);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('agent');
    if (property) {
      // Increment views count
      property.views = (property.views || 0) + 1;
      await property.save();
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const compareProperties = async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.status(400).json({ message: 'Please provide property IDs to compare' });
    }
    const idArray = ids.split(',').filter(Boolean);
    const properties = await Property.find({ _id: { $in: idArray } }).populate('agent');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    Object.assign(property, req.body);
    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    await property.deleteOne();
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

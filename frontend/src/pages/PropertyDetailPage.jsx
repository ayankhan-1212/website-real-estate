import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ShieldCheck,
  Heart,
  Scale,
  MapPin,
  PlayCircle,
  Images,
  Phone,
  MessageSquare,
  Share2,
  CheckCircle,
  Eye,
  Car,
  Home,
  Check,
} from 'lucide-react';
import { propertyAPI } from '../services/api';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import VerifiedBadge from '../components/VerifiedBadge';
import PropertyGalleryModal from '../components/PropertyGalleryModal';
import BookingModal from '../components/BookingModal';
import EnquiryModal from '../components/EnquiryModal';
import EmiCalculator from '../components/EmiCalculator';
import InteractiveMap from '../components/InteractiveMap';
import PropertyCard from '../components/PropertyCard';
import toast from 'react-hot-toast';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await propertyAPI.getById(id);
        setProperty(res.data);

        // Fetch similar properties in the same city
        const similarRes = await propertyAPI.getAll({
          city: res.data.location?.city,
          limit: 3,
        });
        setSimilarProperties(
          (similarRes.data.properties || []).filter((p) => p._id !== id).slice(0, 3)
        );
      } catch (err) {
        console.error('Error fetching property detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="h-96 bg-slate-900 rounded-3xl animate-pulse border border-slate-800" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Property Not Found</h2>
        <Link to="/properties" className="text-emerald-400 font-semibold hover:underline">
          &larr; Back to Listings
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(property._id);
  const isCompared = isInCompare(property._id);
  const images = property.images || [];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard! 📋');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* 1. TOP HEADER & TITLE BAR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-lg text-xs font-black uppercase ${
                property.listingType === 'Rent'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-emerald-500 text-slate-950'
              }`}
            >
              For {property.listingType}
            </span>
            {property.isVerified && (
              <VerifiedBadge verificationDetails={property.verificationDetails} />
            )}
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Eye className="w-3.5 h-3.5 text-slate-500" /> {property.views || 140} Views
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-1.5 text-sm text-slate-400">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>
              {property.location?.address}, {property.location?.locality},{' '}
              {property.location?.city} - {property.location?.pincode}
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="flex flex-row md:flex-col items-start md:items-end justify-between gap-3">
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            {property.priceDisplay}
            <span className="text-xs text-slate-400 block font-normal">
              (₹{property.pricePerSqFt?.toLocaleString('en-IN') || 0} / sq ft)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleCompare(property)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isCompared
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Compare"
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(property)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isSaved
                  ? 'bg-rose-600 text-white border-rose-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-rose-400'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:text-white transition-colors"
              title="Share Listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. HD PHOTO & VIDEO GALLERY (Feature 5) */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-3.5 rounded-3xl overflow-hidden shadow-2xl">
        {/* Main Large Photo */}
        <div
          onClick={() => setGalleryOpen(true)}
          className="md:col-span-2 aspect-[16/10] md:aspect-auto md:h-[450px] relative overflow-hidden group cursor-pointer bg-slate-800"
        >
          <img
            src={images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Supporting Secondary Photos */}
        <div className="hidden md:grid col-span-2 grid-cols-2 gap-3.5 h-[450px]">
          {images.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setGalleryOpen(true)}
              className="relative overflow-hidden group cursor-pointer bg-slate-800 rounded-xl"
            >
              <img
                src={img}
                alt={`Photo ${idx + 2}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>

        {/* Floating View All Photos Button */}
        <button
          onClick={() => setGalleryOpen(true)}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-white text-xs font-bold backdrop-blur-md border border-slate-700 shadow-xl transition-all hover:scale-105"
        >
          <Images className="w-4 h-4 text-emerald-400" />
          View All Photos ({images.length}) & Video Tour
        </button>
      </div>

      {/* 3. MAIN CONTENT: SPECS, AMENITIES, MAP & RIGHT SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Columns: Specifications, Description, Amenities, Map, EMI */}
        <div className="lg:col-span-2 space-y-10">
          {/* Key Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs flex items-center justify-center gap-1">
                <Bed className="w-4 h-4 text-emerald-400" /> Bedrooms
              </span>
              <p className="font-bold text-white text-base">{property.bhk} BHK</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-xs flex items-center justify-center gap-1">
                <Bath className="w-4 h-4 text-emerald-400" /> Bathrooms
              </span>
              <p className="font-bold text-white text-base">{property.bathrooms} Baths</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-xs flex items-center justify-center gap-1">
                <Maximize2 className="w-4 h-4 text-emerald-400" /> Super Area
              </span>
              <p className="font-bold text-white text-base">{property.areaSqFt} sq ft</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400 text-xs flex items-center justify-center gap-1">
                <Car className="w-4 h-4 text-emerald-400" /> Parking
              </span>
              <p className="font-bold text-white text-base">{property.parkingSpaces || 1} Covered</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">About This Property</h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities Checklist */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Amenities & Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(property.amenities || []).map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200"
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Property Map (Feature 4) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" /> Location & Neighborhood
              </h3>
              <span className="text-xs text-slate-400">
                Lat: {property.location?.lat}, Lng: {property.location?.lng}
              </span>
            </div>
            <InteractiveMap
              properties={[property]}
              selectedProperty={property}
              height="350px"
            />
          </div>

          {/* Interactive EMI Calculator (Feature 11) */}
          <div className="space-y-4">
            <EmiCalculator defaultPrice={property.price} />
          </div>
        </div>

        {/* Right 1 Column: Agent Card, Book Visit, Send Enquiry */}
        <div className="space-y-6">
          {/* Action CTAs */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="font-bold text-lg text-white">Tour or Enquire</h3>
            <button
              onClick={() => setBookingOpen(true)}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
            >
              <Calendar className="w-4 h-4" /> Book Site Visit
            </button>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl flex items-center justify-center gap-2 border border-slate-700 transition-all"
            >
              <MessageSquare className="w-4 h-4" /> Send Direct Enquiry
            </button>
          </div>

          {/* Agent Profile Card (Feature 8) */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-4">
              <img
                src={
                  property.agentDetails?.image ||
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80'
                }
                alt={property.agentDetails?.name || 'Agent'}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-700"
              />
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  Assigned Listing Agent
                </span>
                <h4 className="font-bold text-white text-base">
                  {property.agentDetails?.name || 'Ayan Sharma'}
                </h4>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                  ★ {property.agentDetails?.rating || 4.9} Rating • Verified
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <a
                href={`tel:${property.agentDetails?.phone || '+919876543210'}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{property.agentDetails?.phone || '+91 98765 43210'}</span>
              </a>
              <a
                href={`https://wa.me/${property.agentDetails?.whatsapp?.replace(/[^0-9]/g, '') || '919876543210'}?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 text-emerald-300 font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SIMILAR PROPERTIES CAROUSEL/GRID */}
      {similarProperties.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-slate-800">
          <h3 className="text-2xl font-bold text-white">Similar Properties in {property.location?.city}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <PropertyGalleryModal
        images={images}
        videoUrl={property.videoUrl}
        title={property.title}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
      <BookingModal
        property={property}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
      <EnquiryModal
        property={property}
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </div>
  );
};

export default PropertyDetailPage;

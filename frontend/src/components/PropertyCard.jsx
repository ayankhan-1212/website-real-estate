import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Scale, Bed, Bath, Maximize2, MapPin, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import VerifiedBadge from './VerifiedBadge';

const PropertyCard = ({ property }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare } = useCompare();

  const isSaved = isInWishlist(property._id);
  const isCompared = isInCompare(property._id);

  const mainImage =
    property.images && property.images.length > 0
      ? property.images[0]
      : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col h-full">
      {/* Image & Badges Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 items-center">
          <span
            className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg shadow-md ${
              property.listingType === 'Rent'
                ? 'bg-amber-500 text-slate-950 font-extrabold'
                : 'bg-emerald-500 text-slate-950 font-extrabold'
            }`}
          >
            For {property.listingType}
          </span>
          {property.isFeatured && (
            <span className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-indigo-600 text-white rounded-lg shadow-md">
              <Sparkles className="w-3 h-3 text-amber-300" /> Featured
            </span>
          )}
        </div>

        {/* Action Buttons: Wishlist & Compare */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={() => toggleCompare(property)}
            title={isCompared ? 'Remove from compare' : 'Add to compare'}
            className={`p-2 rounded-xl backdrop-blur-md transition-colors shadow-lg ${
              isCompared
                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleWishlist(property)}
            title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`p-2 rounded-xl backdrop-blur-md transition-colors shadow-lg ${
              isSaved
                ? 'bg-rose-600 text-white hover:bg-rose-500'
                : 'bg-slate-900/80 text-slate-300 hover:text-rose-400 hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Verified Badge on Bottom Left of Image */}
        {property.isVerified && (
          <div className="absolute bottom-3 left-3">
            <VerifiedBadge verificationDetails={property.verificationDetails} compact={true} />
          </div>
        )}

        {/* Price Badge on Bottom Right */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-emerald-400 font-extrabold text-base rounded-xl shadow-lg">
            {property.priceDisplay}
          </span>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">
              {property.location?.locality}, {property.location?.city}
            </span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property._id}`} className="group-hover:text-emerald-400 transition-colors">
            <h3 className="font-bold text-slate-100 text-lg line-clamp-1 mb-2.5">
              {property.title}
            </h3>
          </Link>

          {/* Specifications Pills */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-xs text-slate-300 mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-emerald-400" />
              <span>{property.bhk} BHK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-emerald-400" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-emerald-400" />
              <span>{property.areaSqFt} sq ft</span>
            </div>
          </div>
        </div>

        {/* Card Footer: Agent Mini Info & CTA */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <img
              src={
                property.agentDetails?.image ||
                'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'
              }
              alt={property.agentDetails?.name || 'Agent'}
              className="w-7 h-7 rounded-full object-cover border border-slate-700"
            />
            <span className="text-xs text-slate-400 truncate max-w-[100px]">
              {property.agentDetails?.name || 'Verified Agent'}
            </span>
          </div>

          <Link
            to={`/properties/${property._id}`}
            className="px-3 py-1.5 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition-colors duration-200"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

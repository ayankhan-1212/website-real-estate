import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, Check, ArrowRight, ShieldCheck, Bed, Bath, Maximize2 } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

const AMENITIES_TO_COMPARE = [
  'Private Swimming Pool',
  'Gym & Fitness Studio',
  '24x7 Security & Concierge',
  'Covered Parking',
  'Smart Home Tech',
  'Clubhouse & Spa',
  'Private Balcony',
  'Power Backup',
];

const ComparePage = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">No Properties Selected For Comparison</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          You can compare up to 4 properties side-by-side. Browse our listings and click the scale (⚖️) icon on any card to add them to compare.
        </p>
        <div className="pt-2">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Explore Properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
            <Scale className="w-4 h-4" /> Feature 7: Property Comparison
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Side-by-Side Property Comparison ({compareList.length}/4)
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearCompare}
            className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Clear Comparison
          </button>
          <Link
            to="/properties"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors"
          >
            + Add Another Property
          </Link>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="p-4 sm:p-6 w-48 text-xs font-bold uppercase text-slate-400 bg-slate-950/60">
                Property Overview
              </th>
              {compareList.map((item) => (
                <th key={item._id} className="p-4 sm:p-6 min-w-[260px] bg-slate-900/80 align-top">
                  <div className="relative group rounded-2xl overflow-hidden aspect-video mb-3 bg-slate-800">
                    <img
                      src={
                        item.images && item.images[0]
                          ? item.images[0]
                          : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'
                      }
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFromCompare(item._id)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition-colors"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-bold text-sm text-white line-clamp-1 mb-1">{item.title}</h4>
                  <div className="text-lg font-black text-emerald-400 mb-2">
                    {item.priceDisplay}
                  </div>
                  <Link
                    to={`/properties/${item._id}`}
                    className="block text-center py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    View Details
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-xs">
            {/* Price Per Sq Ft */}
            <tr>
              <td className="p-4 font-semibold text-slate-400 bg-slate-950/40">Price / Sq Ft</td>
              {compareList.map((item) => (
                <td key={item._id} className="p-4 font-bold text-slate-200">
                  ₹{item.pricePerSqFt?.toLocaleString('en-IN') || '—'} / sq ft
                </td>
              ))}
            </tr>

            {/* Type & Intent */}
            <tr>
              <td className="p-4 font-semibold text-slate-400 bg-slate-950/40">Type & Listing</td>
              {compareList.map((item) => (
                <td key={item._id} className="p-4 text-slate-300">
                  {item.propertyType} • For {item.listingType}
                </td>
              ))}
            </tr>

            {/* Bedrooms & Bathrooms */}
            <tr>
              <td className="p-4 font-semibold text-slate-400 bg-slate-950/40">Bedrooms / Baths</td>
              {compareList.map((item) => (
                <td key={item._id} className="p-4 text-slate-300">
                  {item.bhk} BHK • {item.bathrooms} Bathrooms
                </td>
              ))}
            </tr>

            {/* Super Builtup Area */}
            <tr>
              <td className="p-4 font-semibold text-slate-400 bg-slate-950/40">Super Area</td>
              {compareList.map((item) => (
                <td key={item._id} className="p-4 font-semibold text-white">
                  {item.areaSqFt} sq ft
                </td>
              ))}
            </tr>

            {/* Location */}
            <tr>
              <td className="p-4 font-semibold text-slate-400 bg-slate-950/40">Location / City</td>
              {compareList.map((item) => (
                <td key={item._id} className="p-4 text-slate-300">
                  {item.location?.locality}, {item.location?.city}
                </td>
              ))}
            </tr>

            {/* Furnishing */}
            <tr>
              <td className="p-4 font-semibold text-slate-400 bg-slate-950/40">Furnishing</td>
              {compareList.map((item) => (
                <td key={item._id} className="p-4 text-slate-300">
                  {item.furnishing}
                </td>
              ))}
            </tr>

            {/* Verification Status */}
            <tr>
              <td className="p-4 font-semibold text-slate-400 bg-slate-950/40">Verification</td>
              {compareList.map((item) => (
                <td key={item._id} className="p-4">
                  {item.isVerified ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                      <ShieldCheck className="w-4 h-4" /> RERA Verified
                    </span>
                  ) : (
                    <span className="text-slate-500">Standard</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Amenities Checklist Matrix */}
            {AMENITIES_TO_COMPARE.map((amenity) => (
              <tr key={amenity}>
                <td className="p-4 font-semibold text-slate-400 bg-slate-950/40">{amenity}</td>
                {compareList.map((item) => {
                  const has = (item.amenities || []).some(
                    (a) => a.toLowerCase().includes(amenity.toLowerCase()) || amenity.toLowerCase().includes(a.toLowerCase())
                  );
                  return (
                    <td key={item._id} className="p-4">
                      {has ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;

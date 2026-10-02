import React from 'react';
import { Filter, X, RotateCcw, CheckSquare, Square, ShieldCheck } from 'lucide-react';

const ALL_AMENITIES = [
  'Private Swimming Pool',
  'Gym & Fitness Studio',
  '24x7 Security & Concierge',
  'Covered Parking',
  'Clubhouse & Spa',
  'Smart Home Tech',
  'Private Balcony',
  'Panoramic Sea View',
  'Lush Gardens',
  'Power Backup',
];

const FilterDrawer = ({ filters, setFilters, onReset, isOpen, onClose }) => {
  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities ? filters.amenities.split(',').filter(Boolean) : [];
    let updated;
    if (current.includes(amenity)) {
      updated = current.filter((a) => a !== amenity);
    } else {
      updated = [...current, amenity];
    }
    setFilters((prev) => ({ ...prev, amenities: updated.join(',') }));
  };

  const selectedAmenities = filters.amenities
    ? filters.amenities.split(',').filter(Boolean)
    : [];

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-lg text-white">Advanced Filters</h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All
        </button>
      </div>

      {/* Verified Only Toggle */}
      <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verified Properties Only
          </span>
          <input
            type="checkbox"
            checked={filters.isVerified === 'true' || filters.isVerified === true}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                isVerified: e.target.checked ? 'true' : '',
              }))
            }
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-800 border-slate-700 cursor-pointer"
          />
        </label>
      </div>

      {/* Listing Type */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
          Listing Intent
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['All', 'Sale', 'Rent'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  listingType: type === 'All' ? '' : type,
                }))
              }
              className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                (type === 'All' && !filters.listingType) || filters.listingType === type
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {type === 'All' ? 'Any' : `For ${type}`}
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms (BHK) */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
          Bedrooms (BHK)
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {['All', '1', '2', '3', '4', '5+'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  bhk: num === 'All' ? '' : num,
                }))
              }
              className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                (num === 'All' && !filters.bhk) || filters.bhk === num
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {num} {num !== 'All' ? 'BHK' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Furnishing */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
          Furnishing Status
        </label>
        <select
          value={filters.furnishing || ''}
          onChange={(e) => setFilters((prev) => ({ ...prev, furnishing: e.target.value }))}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="">Any Furnishing</option>
          <option value="Fully Furnished">Fully Furnished</option>
          <option value="Semi-Furnished">Semi-Furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
          Price Range (INR)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block mb-1">Min Price</span>
            <input
              type="number"
              placeholder="e.g. 5000000"
              value={filters.minPrice || ''}
              onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block mb-1">Max Price</span>
            <input
              type="number"
              placeholder="e.g. 150000000"
              value={filters.maxPrice || ''}
              onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Amenities Checklist */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
          Key Amenities
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {ALL_AMENITIES.map((amenity) => {
            const checked = selectedAmenities.includes(amenity);
            return (
              <button
                key={amenity}
                type="button"
                onClick={() => handleAmenityToggle(amenity)}
                className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs text-left transition-colors ${
                  checked
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {checked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className="truncate">{amenity}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
          Sort Results By
        </label>
        <select
          value={filters.sort || ''}
          onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="newest">Newest First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="views">Most Popular (Views)</option>
          <option value="sqft_desc">Largest Area (Sq Ft)</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block w-72 shrink-0 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl h-fit sticky top-24">
        {content}
      </div>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <div className="relative ml-auto w-full max-w-xs bg-slate-900 border-l border-slate-800 p-6 overflow-y-auto h-full shadow-2xl z-10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterDrawer;

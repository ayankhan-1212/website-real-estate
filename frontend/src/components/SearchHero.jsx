import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, Key, IndianRupee } from 'lucide-react';

const SearchHero = () => {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState('Sale');
  const [city, setCity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bhk, setBhk] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (listingType) params.append('listingType', listingType);
    if (city && city !== 'All') params.append('city', city);
    if (propertyType && propertyType !== 'All') params.append('propertyType', propertyType);
    if (bhk && bhk !== 'All') params.append('bhk', bhk);
    if (maxPrice) params.append('maxPrice', maxPrice);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Listing Type Toggle Tabs */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => setListingType('Sale')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-t-xl text-sm font-bold transition-all ${
            listingType === 'Sale'
              ? 'bg-slate-900/90 text-emerald-400 border-t-2 border-emerald-500 shadow-lg'
              : 'bg-slate-900/50 text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-4 h-4" />
          Buy Property
        </button>
        <button
          type="button"
          onClick={() => setListingType('Rent')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-t-xl text-sm font-bold transition-all ${
            listingType === 'Rent'
              ? 'bg-slate-900/90 text-amber-400 border-t-2 border-amber-500 shadow-lg'
              : 'bg-slate-900/50 text-slate-400 hover:text-white'
          }`}
        >
          <Key className="w-4 h-4" />
          Rent Property
        </button>
      </div>

      {/* Main Search Panel */}
      <form
        onSubmit={handleSearch}
        className="glass-panel p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end"
      >
        {/* City Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> City / Location
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Goa">Goa</option>
            <option value="Gurugram">Gurugram</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Alibaug">Alibaug</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-emerald-400" /> Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Studio">Studio</option>
          </select>
        </div>

        {/* BHK Bedrooms */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Bedrooms (BHK)</label>
          <select
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">Any BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
            <option value="5+">5+ BHK</option>
          </select>
        </div>

        {/* Max Budget */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> Max Budget
          </label>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">No Limit</option>
            {listingType === 'Sale' ? (
              <>
                <option value="10000000">Up to ₹1.0 Cr</option>
                <option value="25000000">Up to ₹2.5 Cr</option>
                <option value="50000000">Up to ₹5.0 Cr</option>
                <option value="100000000">Up to ₹10.0 Cr</option>
                <option value="150000000">Up to ₹15.0 Cr</option>
              </>
            ) : (
              <>
                <option value="50000">Up to ₹50,000/mo</option>
                <option value="100000">Up to ₹1 Lakh/mo</option>
                <option value="200000">Up to ₹2 Lakh/mo</option>
              </>
            )}
          </select>
        </div>

        {/* Search Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search className="w-4 h-4" />
            Find Homes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchHero;

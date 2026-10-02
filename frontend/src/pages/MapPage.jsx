import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Building, Filter } from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';
import { propertyAPI } from '../services/api';

const MapPage = () => {
  const [properties, setProperties] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertyAPI
      .getAll({ city: cityFilter, limit: 100 })
      .then((res) => setProperties(res.data.properties || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [cityFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & City Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Compass className="w-4 h-4" /> Feature 4: Interactive Property Map
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Geospatial Property Explorer
          </h1>
          <p className="text-xs text-slate-400">
            Click on any location pin to inspect property photographs, pricing, and key specifications.
          </p>
        </div>

        {/* City Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          {['All', 'Mumbai', 'Pune', 'Bengaluru', 'Goa', 'Gurugram', 'Hyderabad'].map((city) => (
            <button
              key={city}
              onClick={() => setCityFilter(city === 'All' ? '' : city)}
              className={`px-3.5 py-2 rounded-xl font-bold border transition-all ${
                (city === 'All' && !cityFilter) || cityFilter === city
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      {loading ? (
        <div className="h-[650px] bg-slate-900 rounded-3xl animate-pulse border border-slate-800" />
      ) : (
        <InteractiveMap properties={properties} height="650px" />
      )}
    </div>
  );
};

export default MapPage;

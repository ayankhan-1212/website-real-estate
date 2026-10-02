import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, LayoutGrid, List, MapPin, Building, RotateCcw } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import FilterDrawer from '../components/FilterDrawer';
import { propertyAPI } from '../services/api';

const PropertiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Filter state initialized from URL search params
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || '',
    propertyType: searchParams.get('propertyType') || '',
    listingType: searchParams.get('listingType') || '',
    bhk: searchParams.get('bhk') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    furnishing: searchParams.get('furnishing') || '',
    amenities: searchParams.get('amenities') || '',
    isVerified: searchParams.get('isVerified') || '',
    sort: searchParams.get('sort') || 'newest',
  });

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const cleanParams = {};
      Object.keys(filters).forEach((key) => {
        if (filters[key]) cleanParams[key] = filters[key];
      });

      const res = await propertyAPI.getAll(cleanParams);
      setProperties(res.data.properties || []);
      setTotalCount(res.data.total || 0);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const handleResetFilters = () => {
    const empty = {
      search: '',
      city: '',
      propertyType: '',
      listingType: '',
      bhk: '',
      minPrice: '',
      maxPrice: '',
      furnishing: '',
      amenities: '',
      isVerified: '',
      sort: 'newest',
    };
    setFilters(empty);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Search Bar & Controls */}
      <div className="glass-panel p-4 md:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Keyword Search Input */}
          <div className="relative w-full md:max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by locality, tower name, landmark..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Quick Controls: Mobile Filter Button & View Toggles */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* City Filter Quick Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold shrink-0">Popular Cities:</span>
          {['All', 'Mumbai', 'Pune', 'Bengaluru', 'Goa', 'Gurugram', 'Hyderabad'].map((c) => (
            <button
              key={c}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  city: c === 'All' ? '' : c,
                }))
              }
              className={`shrink-0 px-3 py-1.5 rounded-lg border font-medium transition-all ${
                (c === 'All' && !filters.city) || filters.city === c
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: Filter Sidebar + Properties Content */}
      <div className="flex gap-8 items-start">
        {/* Advanced Filter Drawer Component */}
        <FilterDrawer
          filters={filters}
          setFilters={setFilters}
          onReset={handleResetFilters}
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
        />

        {/* Listings Display Column */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing <strong className="text-white">{properties.length}</strong> of{' '}
              <strong className="text-white">{totalCount}</strong> verified properties
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-slate-900 rounded-2xl animate-pulse border border-slate-800" />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="glass-panel rounded-3xl p-12 text-center space-y-4 border border-slate-800">
              <Building className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No properties match your filters</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your price range, clearing specific amenities, or switching cities to see available homes.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6'
              }
            >
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;

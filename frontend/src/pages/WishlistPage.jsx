import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import PropertyCard from '../components/PropertyCard';

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
            <Heart className="w-4 h-4 fill-current" /> Feature 6: Saved Favorites
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            My Wishlist ({wishlist.length})
          </h1>
        </div>
        <Link
          to="/properties"
          className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
        >
          Explore More Properties &rarr;
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-4 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Your Wishlist is Empty</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Click the heart icon on any property card to save your favorite luxury apartments, villas, and penthouses here for easy review anytime.
          </p>
          <div className="pt-2">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg"
            >
              Start Exploring <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <PropertyCard key={item._id} property={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

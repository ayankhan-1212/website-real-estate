import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, X, ArrowRight } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

const ComparisonBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-4xl glass-panel border border-slate-700/80 rounded-2xl p-3 md:p-4 shadow-2xl animate-bounce-subtle">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Compare Properties ({compareList.length}/4)
            </h4>
            <p className="text-xs text-slate-400 hidden md:block">
              Side-by-side specs, price/sqft, and amenities
            </p>
          </div>
        </div>

        {/* Middle Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-xs md:max-w-md">
          {compareList.map((item) => (
            <div
              key={item._id}
              className="relative w-14 h-10 md:w-16 md:h-12 rounded-lg overflow-hidden shrink-0 border border-slate-700 group"
            >
              <img
                src={
                  item.images && item.images[0]
                    ? item.images[0]
                    : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80'
                }
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeFromCompare(item._id)}
                className="absolute inset-0 bg-red-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={clearCompare}
            className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Clear
          </button>
          <Link
            to="/compare"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02]"
          >
            Compare Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;

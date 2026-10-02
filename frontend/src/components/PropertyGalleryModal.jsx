import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, PlayCircle, Image as ImageIcon, Compass } from 'lucide-react';

const PropertyGalleryModal = ({ images = [], videoUrl, title, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'video' | 'virtual'
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 md:p-6 select-none animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-base md:text-lg text-white truncate max-w-md">
              {title}
            </h3>
            {/* View Switcher Tabs */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'photos'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" /> HD Photos ({images.length})
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'video'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <PlayCircle className="w-3.5 h-3.5" /> HD Video Tour
              </button>
              <button
                onClick={() => setActiveTab('virtual')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'virtual'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" /> 360° Virtual Tour
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Viewer Area */}
        <div className="flex-1 relative flex items-center justify-center bg-black/50 p-2 md:p-6 overflow-hidden">
          {activeTab === 'photos' && (
            <>
              {images.length > 0 ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={images[currentIndex]}
                    alt={`Property view ${currentIndex + 1}`}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-200">
                    {currentIndex + 1} / {images.length}
                  </div>
                </div>
              ) : (
                <div className="text-slate-400">No photos available</div>
              )}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 p-3 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white backdrop-blur-md transition-colors shadow-xl"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 p-3 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white backdrop-blur-md transition-colors shadow-xl"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </>
          )}

          {activeTab === 'video' && (
            <div className="w-full h-full max-w-4xl flex items-center justify-center p-4">
              <iframe
                title="Property Video Walkthrough"
                src="https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1"
                className="w-full h-full rounded-2xl border border-slate-800 shadow-2xl aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {activeTab === 'virtual' && (
            <div className="w-full h-full max-w-4xl flex flex-col items-center justify-center text-center p-8 bg-slate-950/60 rounded-2xl border border-slate-800">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 mb-4 animate-pulse">
                <Compass className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Interactive 360° Spatial Walkthrough</h4>
              <p className="text-slate-400 text-sm max-w-md mb-6">
                Explore every room, terrace, and corridor in high-definition panoramic perspective.
              </p>
              <button
                onClick={() => setActiveTab('photos')}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
              >
                Launch 360 Explorer View
              </button>
            </div>
          )}
        </div>

        {/* Bottom Thumbnails Strip (When in Photos mode) */}
        {activeTab === 'photos' && images.length > 1 && (
          <div className="p-3 bg-slate-950/80 border-t border-slate-800 overflow-x-auto flex gap-3 justify-center">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  currentIndex === idx
                    ? 'border-emerald-500 scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyGalleryModal;

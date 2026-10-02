import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Video, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MyBookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingAPI
      .getMyBookings()
      .then((res) => setBookings(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'Completed':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40';
      case 'Cancelled':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Calendar className="w-4 h-4" /> Feature 9: Site Visit Appointments
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            My Scheduled Property Tours ({bookings.length})
          </h1>
        </div>
        <Link
          to="/properties"
          className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
        >
          Schedule Another Tour &rarr;
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-slate-900 rounded-2xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-4 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <Calendar className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">No Site Visits Scheduled Yet</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ready to experience your prospective home in real life? Visit any property listing and click "Book Site Visit" to schedule a physical or 3D tour.
          </p>
          <div className="pt-2">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg"
            >
              Browse Properties <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="glass-panel border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-lg hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    booking.propertyImage ||
                    booking.property?.images?.[0] ||
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80'
                  }
                  alt={booking.propertyTitle}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      {booking.visitType.includes('Virtual') ? (
                        <Video className="w-3.5 h-3.5 text-indigo-400" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      {booking.visitType}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base">
                    {booking.propertyTitle || 'Luxury Property'}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1 font-semibold text-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" /> {booking.visitDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> {booking.visitTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Actions */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                {booking.property && (
                  <Link
                    to={`/properties/${booking.property._id || booking.property}`}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                  >
                    View Listing
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;

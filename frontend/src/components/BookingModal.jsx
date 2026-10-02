import React, { useState } from 'react';
import { X, Calendar, Clock, Video, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import toast from 'react-hot-toast';

const BookingModal = ({ property, isOpen, onClose }) => {
  const { user } = useAuth();
  const { refreshNotifications } = useNotifications();

  const [visitType, setVisitType] = useState('In-Person Visit');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [userName, setUserName] = useState(user?.name || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [userPhone, setUserPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!visitDate) {
      toast.error('Please choose a preferred visit date');
      return;
    }
    if (!userPhone) {
      toast.error('Please provide a contact phone number');
      return;
    }

    setLoading(true);
    try {
      await bookingAPI.create({
        propertyId: property._id,
        visitDate,
        visitTime,
        visitType,
        notes,
        userName: userName || 'Valued Buyer',
        userEmail: userEmail || 'buyer@example.com',
        userPhone,
      });

      setIsSuccess(true);
      toast.success('Site Visit scheduled successfully! 📅');
      refreshNotifications();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not schedule booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Visit Scheduled!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto mb-6">
              Your appointment request for{' '}
              <span className="text-emerald-400 font-semibold">{property.title}</span> has been received. Our assigned representative will contact you via WhatsApp / Call.
            </p>
            <div className="bg-slate-800/80 rounded-2xl p-4 text-xs text-slate-300 space-y-1.5 mb-6 text-left border border-slate-700">
              <div><strong className="text-slate-100">Date:</strong> {visitDate}</div>
              <div><strong className="text-slate-100">Slot:</strong> {visitTime}</div>
              <div><strong className="text-slate-100">Format:</strong> {visitType}</div>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Book Site Visit</h3>
                <p className="text-xs text-slate-400 truncate max-w-xs">{property.title}</p>
              </div>
            </div>

            {/* Visit Type Toggle */}
            <div>
              <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Visit Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setVisitType('In-Person Visit')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    visitType === 'In-Person Visit'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" /> In-Person Site Visit
                </button>
                <button
                  type="button"
                  onClick={() => setVisitType('Virtual 3D Video Tour')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    visitType === 'Virtual 3D Video Tour'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" /> Virtual 3D Video Tour
                </button>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Preferred Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1.5 block">Preferred Time Slot</label>
                <select
                  value={visitTime}
                  onChange={(e) => setVisitTime(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="10:00 AM">10:00 AM (Morning)</option>
                  <option value="11:30 AM">11:30 AM (Late Morning)</option>
                  <option value="02:00 PM">02:00 PM (Afternoon)</option>
                  <option value="04:00 PM">04:00 PM (Evening)</option>
                  <option value="06:00 PM">06:00 PM (Sunset Slot)</option>
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1 block">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunny Rajbhar"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-1 block">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 mb-1 block">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 mb-1 block">Notes / Specific Requirements (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Interested in seeing parking space and clubhouse"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/30 text-sm"
            >
              {loading ? 'Confirming Appointment...' : 'Confirm Site Visit Booking'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;

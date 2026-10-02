import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Building,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Users,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';
import { adminAPI, propertyAPI, bookingAPI, enquiryAPI } from '../services/api';
import toast from 'react-hot-toast';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'properties' | 'bookings' | 'enquiries'
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Property Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newProp, setNewProp] = useState({
    title: '',
    description: '',
    propertyType: 'Apartment',
    listingType: 'Sale',
    price: '',
    priceDisplay: '',
    bhk: 3,
    bathrooms: 3,
    areaSqFt: 1800,
    address: '',
    locality: '',
    city: 'Mumbai',
    lat: 19.076,
    lng: 72.8777,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    isVerified: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, propRes, bookRes, enqRes] = await Promise.all([
        adminAPI.getStats(),
        propertyAPI.getAll({ limit: 100 }),
        bookingAPI.getAllBookings(),
        enquiryAPI.getAll(),
      ]);
      setStats(statsRes.data.stats);
      setProperties(propRes.data.properties || []);
      setBookings(bookRes.data || []);
      setEnquiries(enqRes.data || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await propertyAPI.delete(id);
      toast.success('Property deleted successfully');
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      toast.error('Failed to delete property');
    }
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      await bookingAPI.updateStatus(id, status);
      toast.success(`Booking status marked as ${status}`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      toast.error('Failed to update booking status');
    }
  };

  const handleUpdateEnquiryStatus = async (id, status) => {
    try {
      await enquiryAPI.updateStatus(id, status);
      toast.success(`Enquiry marked as ${status}`);
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status } : e))
      );
    } catch (err) {
      toast.error('Failed to update enquiry status');
    }
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: newProp.title,
        description: newProp.description,
        propertyType: newProp.propertyType,
        listingType: newProp.listingType,
        price: Number(newProp.price),
        priceDisplay: newProp.priceDisplay || `₹${Number(newProp.price).toLocaleString('en-IN')}`,
        bhk: Number(newProp.bhk),
        bathrooms: Number(newProp.bathrooms),
        bedrooms: Number(newProp.bhk),
        areaSqFt: Number(newProp.areaSqFt),
        location: {
          address: newProp.address || 'Signature Tower, Sea Link Road',
          locality: newProp.locality || 'Worli',
          city: newProp.city,
          lat: Number(newProp.lat),
          lng: Number(newProp.lng),
        },
        images: [newProp.image],
        isFeatured: newProp.isFeatured,
        isVerified: newProp.isVerified,
        amenities: ['Private Balcony', '24x7 Security', 'Covered Parking', 'Gym & Fitness Studio'],
      };

      const res = await propertyAPI.create(payload);
      toast.success('New luxury property created successfully! 🏡');
      setProperties((prev) => [res.data, ...prev]);
      setAddModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create property');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <LayoutDashboard className="w-4 h-4" /> Feature 14: Central Control Center
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            EstateHub Administrator Dashboard
          </h1>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Add New Property
        </button>
      </div>

      {/* Overview Metric KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Total Properties</span>
              <Building className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats.totalProperties}</div>
            <div className="text-[11px] text-emerald-400">
              {stats.verifiedProperties} RERA Verified
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Site Visits Booked</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats.totalBookings}</div>
            <div className="text-[11px] text-amber-400">
              {stats.pendingBookings} Pending Confirmation
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Inquiries & Leads</span>
              <MessageSquare className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats.totalEnquiries}</div>
            <div className="text-[11px] text-cyan-400">{stats.newEnquiries} Action Required</div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span>Active Agents</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-white">{stats.totalAgents}</div>
            <div className="text-[11px] text-indigo-400">100% Verified Consultants</div>
          </div>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-bold">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
          { id: 'properties', label: `Manage Properties (${properties.length})`, icon: Building },
          { id: 'bookings', label: `Site Visits (${bookings.length})`, icon: Calendar },
          { id: 'enquiries', label: `Leads & Inquiries (${enquiries.length})`, icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW SUMMARY */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" /> Recent Site Visit Requests
              </h3>
              <button
                onClick={() => setActiveTab('bookings')}
                className="text-xs text-emerald-400 hover:underline"
              >
                View All &rarr;
              </button>
            </div>
            <div className="space-y-3">
              {bookings.slice(0, 4).map((b) => (
                <div
                  key={b._id}
                  className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <h5 className="font-bold text-slate-200">{b.userName}</h5>
                    <p className="text-slate-400 truncate max-w-xs">{b.propertyTitle}</p>
                    <span className="text-[11px] text-emerald-400">
                      {b.visitDate} • {b.visitTime}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" /> Recent Buyer Inquiries
              </h3>
              <button
                onClick={() => setActiveTab('enquiries')}
                className="text-xs text-emerald-400 hover:underline"
              >
                View All &rarr;
              </button>
            </div>
            <div className="space-y-3">
              {enquiries.slice(0, 4).map((e) => (
                <div
                  key={e._id}
                  className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{e.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300">
                      {e.status}
                    </span>
                  </div>
                  <p className="text-slate-400 line-clamp-1 italic">"{e.message}"</p>
                  <p className="text-[10px] text-slate-500">Phone: {e.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROPERTIES MANAGER */}
      {activeTab === 'properties' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {properties.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-800/40">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={p.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80'}
                        alt={p.title}
                        className="w-12 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-bold text-white truncate max-w-xs">{p.title}</div>
                        <div className="text-[10px] text-slate-400">{p.bhk} BHK • {p.areaSqFt} sq ft</div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">{p.propertyType}</td>
                    <td className="p-4 text-slate-300">{p.location?.locality}, {p.location?.city}</td>
                    <td className="p-4 font-bold text-emerald-400">{p.priceDisplay}</td>
                    <td className="p-4">
                      {p.isVerified ? (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md font-bold text-[10px]">
                          Verified
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md text-[10px]">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleDeleteProperty(p._id)}
                        className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: BOOKINGS MANAGER */}
      {activeTab === 'bookings' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">Client Details</th>
                  <th className="p-4">Date & Slot</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-800/40">
                    <td className="p-4 font-bold text-white max-w-xs truncate">
                      {b.propertyTitle}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-200">{b.userName}</div>
                      <div className="text-[10px] text-slate-400">{b.userPhone} • {b.userEmail}</div>
                    </td>
                    <td className="p-4 text-slate-300">
                      {b.visitDate} ({b.visitTime})
                    </td>
                    <td className="p-4 text-slate-300">{b.visitType}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-200">
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => handleUpdateBookingStatus(b._id, 'Confirmed')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 transition-colors text-[10px] font-bold"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleUpdateBookingStatus(b._id, 'Completed')}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50 transition-colors text-[10px] font-bold"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleUpdateBookingStatus(b._id, 'Cancelled')}
                        className="px-2.5 py-1 rounded-lg bg-rose-600/30 text-rose-300 hover:bg-rose-600/50 transition-colors text-[10px] font-bold"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ENQUIRIES MANAGER */}
      {activeTab === 'enquiries' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-4">Prospect</th>
                  <th className="p-4">Property Targeted</th>
                  <th className="p-4">Inquiry Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {enquiries.map((e) => (
                  <tr key={e._id} className="hover:bg-slate-800/40">
                    <td className="p-4">
                      <div className="font-bold text-white">{e.name}</div>
                      <div className="text-[10px] text-slate-400">{e.phone} • {e.email}</div>
                    </td>
                    <td className="p-4 text-slate-300 max-w-xs truncate">{e.propertyTitle}</td>
                    <td className="p-4 text-slate-300 max-w-sm">{e.message}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-slate-800 text-cyan-300 rounded-md font-bold text-[10px]">
                        {e.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => handleUpdateEnquiryStatus(e._id, 'Contacted')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600/50 text-[10px] font-bold"
                      >
                        Mark Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateEnquiryStatus(e._id, 'Closed')}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-[10px] font-bold"
                      >
                        Close
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {addModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setAddModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4 pb-3 border-b border-slate-800 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-400" /> Create Luxury Property Listing
            </h3>

            <form onSubmit={handleCreateProperty} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Listing Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skyline Signature Sea-Facing Penthouse"
                  value={newProp.title}
                  onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Property Type</label>
                  <select
                    value={newProp.propertyType}
                    onChange={(e) => setNewProp({ ...newProp, propertyType: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Studio">Studio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Listing Intent</label>
                  <select
                    value={newProp.listingType}
                    onChange={(e) => setNewProp({ ...newProp, listingType: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Sale">For Sale</option>
                    <option value="Rent">For Rent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Exact Numeric Price (INR)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 75000000"
                    value={newProp.price}
                    onChange={(e) => setNewProp({ ...newProp, price: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Display Price Label</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹7.50 Cr or ₹1.5 Lakh/mo"
                    value={newProp.priceDisplay}
                    onChange={(e) => setNewProp({ ...newProp, priceDisplay: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">BHK</label>
                  <input
                    type="number"
                    value={newProp.bhk}
                    onChange={(e) => setNewProp({ ...newProp, bhk: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Bathrooms</label>
                  <input
                    type="number"
                    value={newProp.bathrooms}
                    onChange={(e) => setNewProp({ ...newProp, bathrooms: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Area (Sq Ft)</label>
                  <input
                    type="number"
                    value={newProp.areaSqFt}
                    onChange={(e) => setNewProp({ ...newProp, areaSqFt: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">City</label>
                  <select
                    value={newProp.city}
                    onChange={(e) => setNewProp({ ...newProp, city: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Goa">Goa</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Locality / Neighborhood</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Worli Sea Face"
                    value={newProp.locality}
                    onChange={(e) => setNewProp({ ...newProp, locality: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">HD Primary Photo URL</label>
                <input
                  type="url"
                  required
                  value={newProp.image}
                  onChange={(e) => setNewProp({ ...newProp, image: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Detailed Description</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Architectural features, views, and materials..."
                  value={newProp.description}
                  onChange={(e) => setNewProp({ ...newProp, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 text-xs transition-all"
              >
                Publish Property Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;

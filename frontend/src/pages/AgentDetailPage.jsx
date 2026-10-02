import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, MessageSquare, Mail, Star, ShieldCheck, Award, ArrowLeft } from 'lucide-react';
import { agentAPI } from '../services/api';
import PropertyCard from '../components/PropertyCard';

const AgentDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    agentAPI
      .getById(id)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-96 bg-slate-900 rounded-3xl animate-pulse border border-slate-800" />
      </div>
    );
  }

  if (!data || !data.agent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Agent Not Found</h2>
        <Link to="/agents" className="text-emerald-400 font-semibold hover:underline">
          &larr; Back to Agents
        </Link>
      </div>
    );
  }

  const { agent, properties } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link
        to="/agents"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Agents Directory
      </Link>

      {/* Agent Profile Hero Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-2 border-emerald-500/40 shadow-xl"
          />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{agent.name}</h1>
              {agent.verified && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-current" /> {agent.rating} ({agent.reviewsCount} reviews)
              </span>
              <span>•</span>
              <span>{agent.experienceYears} Years Advisory</span>
              <span>•</span>
              <span>RERA: {agent.licenseNumber}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {agent.bio}
            </p>
          </div>
        </div>

        {/* Contact Links */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <a
            href={`tel:${agent.phone}`}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl flex items-center justify-center gap-2 text-xs transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-400" /> {agent.phone}
          </a>
          <a
            href={`https://wa.me/${agent.whatsapp?.replace(/[^0-9]/g, '') || '919876543210'}?text=Hello%20${encodeURIComponent(agent.name)}`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-xs shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
          >
            <MessageSquare className="w-4 h-4" /> Message on WhatsApp
          </a>
        </div>
      </div>

      {/* Agent's Listings */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">
          Active Listings Managed By {agent.name} ({properties?.length || 0})
        </h2>
        {properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 bg-slate-900 rounded-2xl border border-slate-800 text-sm">
            No properties currently listed under this agent.
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDetailPage;

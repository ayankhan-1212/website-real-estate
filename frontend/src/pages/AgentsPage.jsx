import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Phone, MessageSquare, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { agentAPI } from '../services/api';

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agentAPI
      .getAll()
      .then((res) => setAgents(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-2xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <Users className="w-4 h-4" /> Feature 8: Verified Agent Directory
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Certified Luxury Real Estate Advisors
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Connect directly with RERA-registered real estate consultants who possess deep hyperlocal knowledge and a commitment to transparent advisory.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-96 bg-slate-900 rounded-3xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-800">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {agent.verified && (
                    <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-500/40 flex items-center gap-1 shadow-md">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                    {agent.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{agent.rating}</span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 block mb-3">
                  RERA: <span className="font-mono text-slate-300">{agent.licenseNumber}</span>
                </span>

                <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {agent.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(agent.specialties || []).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 border border-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                <div className="flex gap-2">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" /> Call
                  </a>
                  <a
                    href={`https://wa.me/${agent.whatsapp?.replace(/[^0-9]/g, '') || '919876543210'}?text=Hello%20${encodeURIComponent(agent.name)},%20I%20am%20looking%20for%20property%20assistance.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 text-emerald-300 font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>

                <Link
                  to={`/agents/${agent._id}`}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  View Listings & Profile <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentsPage;

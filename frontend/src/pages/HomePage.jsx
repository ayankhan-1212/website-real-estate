import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Key,
  Users,
  Compass,
  Award,
  ChevronRight,
  Star,
  CheckCircle2,
} from 'lucide-react';
import SearchHero from '../components/SearchHero';
import PropertyCard from '../components/PropertyCard';
import { propertyAPI, agentAPI } from '../services/api';

const CATEGORIES = [
  {
    name: 'Luxury Penthouses',
    type: 'Penthouse',
    count: '3 Exclusive Units',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Private Villas',
    type: 'Villa',
    count: '2 Heritage Villas',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Premium Apartments',
    type: 'Apartment',
    count: '5 Verified Towers',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Modern Townhouses',
    type: 'Townhouse',
    count: '1 Bespoke House',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80',
  },
];

const STATS = [
  { label: 'Verified Properties', value: '100%' },
  { label: 'Portfolio Value', value: '₹500+ Cr' },
  { label: 'Site Visits Conducted', value: '1,450+' },
  { label: 'Customer Satisfaction', value: '4.9 ★' },
];

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, agentRes] = await Promise.all([
          propertyAPI.getFeatured(),
          agentAPI.getAll(),
        ]);
        setFeaturedProperties(propRes.data || []);
        setAgents(agentRes.data ? agentRes.data.slice(0, 4) : []);
      } catch (err) {
        console.error('Home page fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-28 px-4 overflow-hidden">
        {/* Background Image with Ambient Glow */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"
            alt="Luxury Architecture"
            className="w-full h-full object-cover opacity-25 scale-105 transform motion-safe:animate-pulse [animation-duration:8s]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Discover Elite Certified Real Estate Across India
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Find Your Sanctuary In The Sky &{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Verified Luxury Living
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Direct access to verified penthouses, seaside estates, and architectural masterworks. Experience 3D virtual walkthroughs, instant site visit booking, and complete RERA transparency.
          </p>

          {/* Smart Search Bar Component */}
          <div className="pt-4">
            <SearchHero />
          </div>
        </div>
      </section>

      {/* 2. STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="glass-panel border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Sparkles className="w-4 h-4 text-amber-300" /> Handpicked Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Signature Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Explore All Listings ({featuredProperties.length}+) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-slate-900 rounded-2xl animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* 4. EXPLORE BY PROPERTY TYPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Architectural Typologies
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Curated Categories For Every Lifestyle
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Whether looking for high-rise panoramas or tranquil coastal gardens, we have the perfect residence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={`/properties?propertyType=${cat.type}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-slate-800 hover:border-emerald-500/50 shadow-xl transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                  {cat.count}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                  {cat.name}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE MAP TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold border border-indigo-500/30">
              <Compass className="w-3.5 h-3.5" /> Feature 4: Interactive Property Map
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Discover Homes By Pinpoint Geographical Coordinates
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore neighborhoods, metro proximity, school districts, and sea fronts using our intuitive OpenStreetMap geospatial map interface.
            </p>
            <div className="pt-2">
              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
              >
                Launch Interactive Map <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-96 aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
              alt="Map Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 text-center shadow-2xl">
                <Compass className="w-8 h-8 text-emerald-400 mx-auto mb-1 animate-spin [animation-duration:15s]" />
                <span className="text-xs font-bold text-white block">12 Properties Geo-Pinned</span>
                <span className="text-[10px] text-slate-400">Click to Explore All Cities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED ASSURANCE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Trust & Transparency
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            The EstateHub Verification Standard
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Every home listed on our portal undergoes strict triple-layer scrutiny before being made public.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">100% RERA Certified</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every project registration ID is verified directly with government state RERA portals to prevent delayed or unauthorized developments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Title & Encumbrance Audits</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our legal associates verify clean land titles, bank mortgage encumbrance clearance, and municipal sanction approvals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Physical On-Site Inspection</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Carpet area, plumbing, electrical fixtures, amenities, and floor plans are physically audited with authentic HD photography.
            </p>
          </div>
        </div>
      </section>

      {/* 7. TOP VERIFIED AGENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              Top Rated Advisors
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Meet Our Verified Real Estate Agents
            </h2>
          </div>
          <Link
            to="/agents"
            className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            All Agents &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <Link
              key={agent._id}
              to={`/agents/${agent._id}`}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg group transition-all"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-slate-800">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                  {agent.name}
                </h4>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{agent.rating}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">{agent.bio}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-slate-800">
                <span>{agent.experienceYears}+ Yrs Experience</span>
                <span className="text-emerald-400 font-semibold">{agent.propertiesCount} Properties</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION SITE VISIT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-black text-white max-w-xl mx-auto">
            Ready To Tour Your Future Dream Residence?
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Book an in-person site visit or virtual 3D walkthrough with our verified agents today with guaranteed zero commission hassle.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/properties"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
            >
              Browse All Properties
            </Link>
            <Link
              to="/calculator"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all"
            >
              Calculate Home Loan EMI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

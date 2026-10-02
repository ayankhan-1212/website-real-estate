import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Home className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold text-white">
                Estate<span className="text-emerald-400">Hub</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India’s premier verified luxury real estate marketplace. Explore RERA-certified penthouses, private villas, beachfront residences, and modern urban apartments with total transparency.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4" /> 100% Legal & Structural Verification Guarantee
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Explore Portfolios</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/properties?city=Mumbai" className="hover:text-emerald-400 transition-colors">Mumbai Penthouses</Link></li>
              <li><Link to="/properties?city=Goa" className="hover:text-emerald-400 transition-colors">Goa Luxury Villas</Link></li>
              <li><Link to="/properties?city=Bengaluru" className="hover:text-emerald-400 transition-colors">Bengaluru Tech Hubs</Link></li>
              <li><Link to="/properties?city=Pune" className="hover:text-emerald-400 transition-colors">Pune Townhouses</Link></li>
              <li><Link to="/properties?listingType=Rent" className="hover:text-emerald-400 transition-colors">Premium Rentals</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Core Features</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/map" className="hover:text-emerald-400 transition-colors">Interactive Pin Map</Link></li>
              <li><Link to="/calculator" className="hover:text-emerald-400 transition-colors">Home Loan EMI Tool</Link></li>
              <li><Link to="/compare" className="hover:text-emerald-400 transition-colors">Property Comparison</Link></li>
              <li><Link to="/agents" className="hover:text-emerald-400 transition-colors">Verified Agent Directory</Link></li>
              <li><Link to="/my-bookings" className="hover:text-emerald-400 transition-colors">Site Visit Scheduler</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Concierge Desk</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>BKC Financial District, Mumbai, 400051</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 (022) 6789-0123</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>concierge@estatehub.luxury</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 EstateHub Luxury Real Estate Ltd. Built with MERN Stack.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for elite living</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

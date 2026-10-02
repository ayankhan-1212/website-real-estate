import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, X } from 'lucide-react';

const VerifiedBadge = ({ verificationDetails, compact = false }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setShowModal(true);
        }}
        className={`inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200 cursor-pointer shadow-sm ${
          compact
            ? 'px-2 py-0.5 text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
            : 'px-3 py-1 text-sm bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30'
        }`}
        title="Click to view full verification details"
      >
        <ShieldCheck className={compact ? 'w-3.5 h-3.5 text-emerald-400' : 'w-4 h-4 text-emerald-400'} />
        <span>Verified Listing</span>
      </button>

      {/* Verification Transparency Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(false);
          }}
        >
          <div
            className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/40">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">EstateHub Verified Property</h3>
                <p className="text-xs text-slate-400">100% Trust & Transparency Guarantee</p>
              </div>
            </div>

            <div className="space-y-3 my-4">
              <div className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">RERA Registered & Approved</h4>
                  <p className="text-xs text-slate-400">
                    Reg ID: <span className="font-mono text-emerald-300">{verificationDetails?.registeredId || 'P51900021489'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Legal Title & Ownership Cleared</h4>
                  <p className="text-xs text-slate-400">Encumbrance certificate and municipal sanctions audited.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">Physical Site Audit Complete</h4>
                  <p className="text-xs text-slate-400">Verified floor plans, actual carpet area, and authentic photos.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-colors mt-2"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifiedBadge;

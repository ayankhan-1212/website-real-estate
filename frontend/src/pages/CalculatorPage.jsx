import React from 'react';
import { Calculator, CheckCircle2, HelpCircle } from 'lucide-react';
import EmiCalculator from '../components/EmiCalculator';

const CalculatorPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase">
          <Calculator className="w-3.5 h-3.5" /> Feature 11: Home Loan Financial Planner
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Mortgage & EMI Estimator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Model loan repayments, down payments, and tenure scenarios with zero guesswork before planning your purchase.
        </p>
      </div>

      <EmiCalculator defaultPrice={12500000} />

      {/* Helpful Mortgage Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Optimal Down Payment
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Putting down at least 20% reduces overall interest burden and eliminates additional mortgage indemnity premiums.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tax Deductions
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Under Section 80C and Section 24(b) of the Income Tax Act, homebuyers can claim exemptions on both principal repayment and interest.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Prepayment Advantage
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Making just 1 extra EMI payment per calendar year can trim up to 4 years off a 20-year mortgage duration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;

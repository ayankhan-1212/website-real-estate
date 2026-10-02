import React, { useState, useMemo } from 'react';
import { Calculator, IndianRupee, PieChart, Sparkles } from 'lucide-react';

const EmiCalculator = ({ defaultPrice = 5000000 }) => {
  const [propertyPrice, setPropertyPrice] = useState(defaultPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const {
    loanAmount,
    monthlyEmi,
    totalInterest,
    totalPayment,
    principalPercent,
    interestPercent,
  } = useMemo(() => {
    const downPayment = (propertyPrice * downPaymentPercent) / 100;
    const principal = propertyPrice - downPayment;

    if (principal <= 0 || interestRate <= 0 || tenureYears <= 0) {
      return {
        loanAmount: 0,
        monthlyEmi: 0,
        totalInterest: 0,
        totalPayment: 0,
        principalPercent: 0,
        interestPercent: 0,
      };
    }

    const monthlyRate = interestRate / (12 * 100);
    const months = tenureYears * 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const total = emi * months;
    const interest = total - principal;

    const pPct = Math.round((principal / total) * 100);
    const iPct = 100 - pPct;

    return {
      loanAmount: Math.round(principal),
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(interest),
      totalPayment: Math.round(total),
      principalPercent: pPct,
      interestPercent: iPct,
    };
  }, [propertyPrice, downPaymentPercent, interestRate, tenureYears]);

  const formatCurrency = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${Number(val).toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="flex items-center justify-between pb-5 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-xl text-white">Smart Home Loan EMI Calculator</h3>
            <p className="text-xs text-slate-400">Estimate your monthly mortgage payments instantly</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Input Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">Property Price</label>
              <span className="text-sm font-extrabold text-emerald-400">
                {formatCurrency(propertyPrice)}
              </span>
            </div>
            <input
              type="range"
              min="1000000"
              max="200000000"
              step="500000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>₹10 Lakh</span>
              <span>₹20 Cr</span>
            </div>
          </div>

          {/* Down Payment % */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="text-sm font-extrabold text-slate-200">
                {formatCurrency((propertyPrice * downPaymentPercent) / 100)}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>10%</span>
              <span>80%</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">Interest Rate</label>
              <span className="text-sm font-extrabold text-amber-400">{interestRate}% p.a.</span>
            </div>
            <input
              type="range"
              min="6.5"
              max="15.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>6.5%</span>
              <span>15.0%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">Loan Tenure</label>
              <span className="text-sm font-extrabold text-indigo-400">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>5 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Results Card Column */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div className="text-center pb-5 border-b border-slate-800">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
              Estimated Monthly EMI
            </span>
            <div className="text-3xl font-black text-emerald-400 tracking-tight">
              ₹{monthlyEmi.toLocaleString('en-IN')}
              <span className="text-xs text-slate-400 font-normal"> / month</span>
            </div>
          </div>

          <div className="space-y-3 my-5 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Principal Loan Amount</span>
              <span className="font-semibold text-slate-200">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Interest Payable</span>
              <span className="font-semibold text-amber-400">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-800 font-bold">
              <span className="text-slate-300">Total Payment (Principal + Int)</span>
              <span className="text-white">{formatCurrency(totalPayment)}</span>
            </div>
          </div>

          {/* Visual Breakdown Bar */}
          <div>
            <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Principal ({principalPercent}%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Interest ({interestPercent}%)
              </span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${principalPercent}%` }}
                className="bg-emerald-500 h-full transition-all duration-300"
              />
              <div
                style={{ width: `${interestPercent}%` }}
                className="bg-amber-500 h-full transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;

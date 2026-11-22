import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { capabilitiesList } from '../data/companyData';
import { ArrowUpRight, TrendingUp, ShieldCheck, Globe, Activity } from 'lucide-react';

export const CapabilitiesTabs: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(capabilitiesList[0].id);
  const [activeTimeframe, setActiveTimeframe] = useState<'1H' | '1D' | '1W' | '1M' | 'ALL'>('1W');

  const currentCapability = capabilitiesList.find(c => c.id === selectedId) || capabilitiesList[0];

  // Dynamic SVG path variations based on timeframe
  const getPathData = (timeframe: string, data: number[]) => {
    const scaleFactor = timeframe === '1H' ? 0.6 : timeframe === '1D' ? 0.8 : timeframe === '1W' ? 1 : timeframe === '1M' ? 1.2 : 1.4;
    return `M 0 120 Q 50 ${130 - data[1] * scaleFactor}, 100 ${120 - data[3] * scaleFactor} T 200 ${110 - data[5] * scaleFactor} T 300 ${90 - data[7] * scaleFactor} T 400 ${70 - data[9] * scaleFactor} T 500 ${50 - data[11] * 0.8}`;
  };

  return (
    <section id="capabilities" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-t border-neutral-100">
      
      {/* Top Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 font-sans">
          Engineered for institutional scale and precision
        </h2>
        <p className="mt-4 text-neutral-500 text-base sm:text-lg">
          Explore our proprietary infrastructure modules designed to eliminate operational vulnerabilities.
        </p>
      </div>

      {/* Grid: Vertical List on Left + Card on Right (Directly inspired by MONELIQ frame_07/08) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Interactive Vertical Navigation with Dot Indicator */}
        <div className="lg:col-span-4 space-y-2">
          {capabilitiesList.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                  isSelected 
                    ? 'bg-neutral-100 text-neutral-950 font-semibold' 
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Dot Indicator matching reference */}
                  <span 
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      isSelected ? 'bg-neutral-950 scale-125' : 'bg-transparent group-hover:bg-neutral-300'
                    }`} 
                  />
                  <span className="text-sm tracking-tight">{item.title}</span>
                </div>
                {isSelected && (
                  <motion.span 
                    layoutId="activeTabPill"
                    className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full"
                  >
                    Active
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Soft Gray Container with Rich Telemetry (Inspired by MONELIQ frame_07) */}
        <div className="lg:col-span-8">
          <div className="bg-[#F4F5F7] rounded-[32px] p-6 sm:p-10 border border-neutral-200/60 shadow-xs">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCapability.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                
                {/* Header inside Gray Card */}
                <div className="flex flex-wrap items-center justify-between pb-4 border-b border-neutral-200 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                      {currentCapability.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mt-1">
                      {currentCapability.headline}
                    </h3>
                  </div>

                  {/* Timeframe Filter Buttons matching frame_07 */}
                  <div className="flex items-center bg-white rounded-lg p-1 border border-neutral-200 text-xs shadow-2xs">
                    {(['1H', '1D', '1W', '1M', 'ALL'] as const).map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setActiveTimeframe(tf)}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                          activeTimeframe === tf 
                            ? 'bg-neutral-900 text-white shadow-xs' 
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Visual Performance Chart */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                    <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-emerald-600" />
                      Deterministic Execution Index
                    </span>
                    <span className="text-emerald-600 font-mono font-medium">+18.4% Efficiency Gain</span>
                  </div>

                  <div className="h-44 sm:h-52 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="capGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid lines */}
                      <line x1="0" y1="40" x2="500" y2="40" stroke="#F3F4F6" strokeDasharray="4 4" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#F3F4F6" strokeDasharray="4 4" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#F3F4F6" strokeDasharray="4 4" />

                      {/* Path fill */}
                      <motion.path
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        d={`${getPathData(activeTimeframe, currentCapability.chartData)} L 500 160 L 0 160 Z`}
                        fill="url(#capGrad)"
                      />

                      {/* Path stroke line */}
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        d={getPathData(activeTimeframe, currentCapability.chartData)}
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <span>T-00:00:00</span>
                    <span>T-06:00:00</span>
                    <span>T-12:00:00</span>
                    <span>T-18:00:00</span>
                    <span>CURRENT VERIFIED</span>
                  </div>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentCapability.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="bg-white rounded-xl p-4 border border-neutral-200/80">
                      <div className="text-[11px] font-medium text-neutral-400">{m.label}</div>
                      <div className="text-xl font-bold font-mono text-neutral-900 mt-1">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                        {m.unit}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Editorial Caption below chart matching MONELIQ frame_07 */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2">
                  <strong className="text-neutral-900">Comprehensive enterprise architecture: </strong>
                  {currentCapability.description}
                </p>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>

    </section>
  );
};

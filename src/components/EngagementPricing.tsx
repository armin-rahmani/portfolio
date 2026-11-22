import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pricingPlans } from '../data/companyData';
import { Check, ArrowUpRight, Sparkles } from 'lucide-react';

interface EngagementPricingProps {
  onOpenContact: () => void;
}

export const EngagementPricing: React.FC<EngagementPricingProps> = ({ onOpenContact }) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'milestone'>('annual');

  return (
    <section id="engagement" className="py-20 sm:py-32 px-3 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      
      {/* Large Dark Rounded Container (Direct recreation of MONELIQ frame_16) */}
      <div className="relative bg-[#090C0B] rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-neutral-800 shadow-2xl pt-16 sm:pt-20 pb-16 sm:pb-20 px-5 sm:px-10 lg:px-14 text-white">
        
        {/* Subtle Ambient Emerald Lighting */}
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[500px] pointer-events-none opacity-50"
          style={{
            background: 'radial-gradient(circle at 40% 30%, rgba(52, 211, 153, 0.15) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 75%)',
          }}
        />
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-30" />

        {/* Section Header */}
        <div className="relative z-10 max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Institutional Retainers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white font-sans">
            Transparent frameworks designed for institutional scale
          </h2>

          <p className="mt-4 text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            Predictable engagement models backed by rigorous service level guarantees and direct partner access.
          </p>

          {/* Pill Switcher Toggle (matching MONELIQ frame_16) */}
          <div className="mt-8 inline-flex items-center bg-neutral-900 border border-neutral-800 p-1 rounded-full text-xs">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                billingCycle === 'annual' 
                  ? 'bg-white text-neutral-950 font-semibold shadow-xs' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Annual Partnership (15% Preferred)
            </button>
            <button
              onClick={() => setBillingCycle('milestone')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                billingCycle === 'milestone' 
                  ? 'bg-white text-neutral-950 font-semibold shadow-xs' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Milestone Deployment
            </button>
          </div>
        </div>

        {/* 4 Tier Columns (Direct recreation of MONELIQ frame_16) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.isHighlighted
                    ? 'bg-gradient-to-b from-[#141A17] to-[#0D1210] border-2 border-emerald-500/40 shadow-xl shadow-emerald-950/20'
                    : 'bg-[#101412]/80 border border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                {plan.isHighlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-neutral-950 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                    Most Selected
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold text-white tracking-tight">{plan.name}</h3>
                  </div>
                  
                  <div className="text-[11px] text-neutral-400 mb-4">{plan.validity}</div>

                  {/* Price */}
                  <div className="mb-4 pb-4 border-b border-neutral-800/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
                        {price}
                      </span>
                      {price !== "Custom" && (
                        <span className="text-xs text-neutral-400 font-normal">/ mo</span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-6 text-xs text-neutral-300">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Button */}
                <button
                  onClick={onOpenContact}
                  className={`w-full py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    plan.isHighlighted
                      ? 'bg-emerald-400 text-neutral-950 hover:bg-emerald-300 shadow-md'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700/60'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Centered Floating Bar matching MONELIQ frame_16 */}
        <div className="relative z-10 mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenContact}
            className="bg-white text-neutral-950 hover:bg-neutral-100 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide shadow-md transition-all cursor-pointer"
          >
            Initiate Engagement Today
          </button>
          <button
            onClick={onOpenContact}
            className="bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white px-6 py-2.5 rounded-full text-xs font-medium tracking-wide border border-neutral-800 transition-all cursor-pointer"
          >
            Contact Strategic Office
          </button>
        </div>

      </div>
    </section>
  );
};

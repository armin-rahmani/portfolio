import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe2, Cpu, CheckCircle } from 'lucide-react';
import { whyChooseUsData } from '../data/companyData';

export const WhyChooseUs: React.FC = () => {
  const icons = {
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
    Zap: <Zap className="w-5 h-5 text-emerald-700" />,
    Globe2: <Globe2 className="w-5 h-5 text-emerald-700" />,
    Cpu: <Cpu className="w-5 h-5 text-emerald-700" />,
  };

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-t border-neutral-100">
      
      {/* Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>Institutional Superiority</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 font-sans">
          Built for zero-failure operational environments
        </h2>
        <p className="mt-4 text-neutral-500 text-base sm:text-lg">
          Why sovereign funds, Tier-1 custodians, and enterprise leaders trust Aurelius for mission-critical digital architecture.
        </p>
      </div>

      {/* 4 Clean Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {whyChooseUsData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="bg-[#F8F9FA] hover:bg-[#F3F4F6] rounded-2xl p-7 border border-neutral-100 transition-all duration-200 group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform">
                {icons[item.iconName as keyof typeof icons]}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200/50 flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-700">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Independently Audited</span>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Shield, Cpu, Zap, ArrowUpRight } from 'lucide-react';
import { heroStats } from '../data/companyData';

export const Introduction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center 45%"]
  });

  const words = [
    "We", "engineer", "enduring", "enterprise", "advantage",
    "by", "converging", "mission-critical", "computational", "architecture",
    "with", "sovereign", "capital", "intelligence."
  ];

  return (
    <section 
      id="philosophy" 
      ref={containerRef}
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Subtle Green Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wide mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>Core Philosophy</span>
        </motion.div>

        {/* Oversized Kinetic Headline — Word by Word illumination */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.18] text-neutral-900 max-w-3xl mx-auto">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <WordSpan key={i} word={word} progress={scrollYProgress} range={[start, end]} />
            );
          })}
        </h2>

        {/* Centered Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-base sm:text-lg text-neutral-500 font-normal max-w-2xl mx-auto leading-relaxed"
        >
          Where legacy banking models encounter friction and latency, Aurelius deploys fault-tolerant, deterministic clearing pipelines that empower multinational enterprises to operate with autonomy.
        </motion.p>

      </div>

      {/* 4 Metric Columns with soft gray surface */}
      <div className="mt-20 sm:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {heroStats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-[#F8F9FA] hover:bg-[#F3F4F6] rounded-2xl p-6 sm:p-7 border border-neutral-100 transition-all duration-200 group"
          >
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              {stat.label}
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-neutral-950 group-hover:text-emerald-700 transition-colors">
              {stat.value}
            </div>
            <div className="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1">
              <span>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Word helper for kinetic scroll
interface WordSpanProps {
  word: string;
  progress: any;
  range: [number, number];
}

const WordSpan: React.FC<WordSpanProps> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const color = useTransform(progress, range, ["#9CA3AF", "#111827"]);

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.28em] transition-colors duration-150">
      {word}
    </motion.span>
  );
};

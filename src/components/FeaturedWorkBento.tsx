import React from 'react';
import { motion } from 'framer-motion';
import { bentoProjects } from '../data/companyData';
import { ArrowUpRight, ShieldCheck, Lock, Activity, Sparkles, Building, Layers } from 'lucide-react';

interface FeaturedWorkBentoProps {
  onOpenContact: () => void;
}

export const FeaturedWorkBento: React.FC<FeaturedWorkBentoProps> = ({ onOpenContact }) => {
  return (
    <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-t border-neutral-100">
      
      {/* Header */}
      <div className="max-w-3xl mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>Proven Engagements</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 font-sans">
          Deployments that redefine institutional benchmarks
        </h2>
        <p className="mt-4 text-neutral-500 text-base sm:text-lg">
          A selection of sovereign infrastructure deployments engineered for zero failure tolerances.
        </p>
      </div>

      {/* Bento Grid (Directly inspired by MONELIQ frame_12) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Large Top Bento Card (12 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-12 bg-[#F5F6F8] rounded-[32px] p-8 sm:p-12 border border-neutral-200/60 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          <div className="max-w-xl space-y-4 z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
              Sovereign Architecture
            </span>
            <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-neutral-950">
              Continental Sovereign Treasury Pipeline
            </h3>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              An interconnected multi-signatory settlement rail enabling 12 central banks and Tier-1 custodians to clear cross-border obligations atomically, eliminating correspondent counterparty risk.
            </p>
            
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenContact}
                className="bg-neutral-950 text-white hover:bg-neutral-800 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer flex items-center gap-2 group"
              >
                <span>Read Institutional Brief</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <div className="text-xs font-mono text-neutral-600">
                Stat: <strong className="text-emerald-700 font-bold">€14.2B Daily Clearance</strong>
              </div>
            </div>
          </div>

          {/* Right Floating Pills / Visual Mockup (Direct reference to frame_12) */}
          <div className="relative w-full lg:w-auto flex-1 max-w-md flex flex-col items-center justify-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-neutral-200/70 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-4">
              Consortium Validator Topology
            </div>

            {/* Floating Node Badges */}
            <div className="grid grid-cols-2 gap-2.5 w-full">
              {[
                { name: "Zurich Core Node", status: "Active", tps: "48k TPS" },
                { name: "Frankfurt Hub", status: "Active", tps: "36k TPS" },
                { name: "London Prime Desk", status: "Active", tps: "52k TPS" },
                { name: "Singapore Gateway", status: "Active", tps: "41k TPS" },
              ].map((node, i) => (
                <div 
                  key={i} 
                  className="bg-neutral-50 hover:bg-neutral-100 p-2.5 rounded-xl border border-neutral-200 text-left transition-colors"
                >
                  <div className="text-xs font-semibold text-neutral-900">{node.name}</div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-neutral-500 font-mono">
                    <span className="text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {node.status}
                    </span>
                    <span>{node.tps}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 w-full flex justify-between text-[11px] text-neutral-500 font-mono">
              <span>Latency: <strong>&lt; 14ms</strong></span>
              <span>Finality: <strong>Immediate (T+0)</strong></span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Card 1: Keep Count / Automated Treasury */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-4 bg-[#F5F6F8] rounded-[32px] p-7 border border-neutral-200/60 flex flex-col justify-between"
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Autonomous Balancing
            </span>
            <h4 className="text-xl font-semibold text-neutral-900">
              Continuous Treasury Sweeping
            </h4>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Algorithmic liquidity sweeps automatically concentrate fragmented operating balances into highest-yielding sovereign reserve vaults.
            </p>
          </div>

          <div className="mt-6 bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs space-y-3">
            {[
              { cat: "Operating Sweep", amount: "$4,200,000", pct: 70 },
              { cat: "Yield Collateral", amount: "$1,850,000", pct: 25 },
              { cat: "Discretionary Liquidity", amount: "$350,000", pct: 5 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] font-medium">
                  <span className="text-neutral-700">{item.cat}</span>
                  <span className="font-mono text-neutral-900">{item.amount}</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neutral-900 rounded-full" 
                    style={{ width: `${item.pct}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Card 2: Security that never sleeps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-4 bg-[#F5F6F8] rounded-[32px] p-7 border border-neutral-200/60 flex flex-col justify-between"
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Cryptographic Fortress
            </span>
            <h4 className="text-xl font-semibold text-neutral-900">
              Security that never sleeps
            </h4>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Hardware-enforced Multi-Party Computation (MPC) ensures no single key custodian or jurisdiction holds unilateral transaction control.
            </p>
          </div>

          {/* Minimal 3D-styled Holographic Shield Mockup */}
          <div className="my-6 py-6 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center text-emerald-400 shadow-lg shadow-neutral-950/20 mb-3 animate-pulse-subtle">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono font-bold text-neutral-900">Quantum-Resistant Enclave</span>
            <span className="text-[10px] text-emerald-600 font-medium">Hardware Encrypted · Zero Breaches</span>
          </div>
        </motion.div>

        {/* Bottom Card 3: Institutional Scale / Join the Leaders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="md:col-span-4 bg-[#F5F6F8] rounded-[32px] p-7 border border-neutral-200/60 flex flex-col justify-between"
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Ecosystem Volume
            </span>
            <h4 className="text-xl font-semibold text-neutral-900">
              Institutional Scale Network
            </h4>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Connecting 180+ multinational corporations, top-tier asset managers, and sovereign funds with uniform deterministic execution.
            </p>
          </div>

          <div className="mt-6 bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs space-y-2">
            {[
              { type: "Sovereign Bond Clearing", val: "€820,000", time: "12s ago" },
              { type: "Corporate FX Arbitrage", val: "$479,800", time: "28s ago" },
              { type: "Cross-Border Escrow", val: "CHF 250,500", time: "1m ago" },
            ].map((feed, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                <div className="font-medium text-neutral-800">{feed.type}</div>
                <div className="text-right">
                  <div className="font-mono font-bold text-neutral-950">{feed.val}</div>
                  <div className="text-[9px] text-neutral-400">{feed.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

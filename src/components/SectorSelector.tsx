import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sectorsList } from '../data/companyData';
import { ArrowUpRight, Cpu, Zap, Shield, Globe2, Activity } from 'lucide-react';

export const SectorSelector: React.FC = () => {
  const [activeSectorId, setActiveSectorId] = useState<string>(sectorsList[0].id);

  const activeSector = sectorsList.find(s => s.id === activeSectorId) || sectorsList[0];

  return (
    <section id="sectors" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-t border-neutral-100">
      
      {/* Header (Directly inspired by MONELIQ frame_14) */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wide mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>Industry Solutions</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-950 font-sans"
        >
          Unlocking transformation across critical global sectors
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-neutral-500 font-normal"
        >
          Deploying bespoke sovereign backbones tailored to distinct regulatory environments.
        </motion.p>
      </div>

      {/* Horizontal Interactive Tabs (Direct recreation of MONELIQ frame_14) */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 border-b border-neutral-200 scrollbar-none gap-2 sm:gap-8">
        {sectorsList.map((sector) => {
          const isActive = sector.id === activeSectorId;
          return (
            <button
              key={sector.id}
              onClick={() => setActiveSectorId(sector.id)}
              className={`relative pb-3 text-xs sm:text-sm font-semibold tracking-tight whitespace-nowrap px-2 cursor-pointer transition-colors duration-200 ${
                isActive ? 'text-neutral-950' : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <span>{sector.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeSectorUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Sector Presentation Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSector.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-[#F4F5F7] rounded-[32px] p-6 sm:p-10 lg:p-12 border border-neutral-200/60"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-mono text-neutral-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Sector Code: {activeSector.shortCode}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-950">
                {activeSector.title}
              </h3>

              <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
                {activeSector.description}
              </p>

              {/* Highlight Metric */}
              <div className="pt-2">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-neutral-950">
                  {activeSector.keyMetric}
                </div>
                <div className="text-xs text-neutral-400 font-medium uppercase tracking-wider mt-0.5">
                  {activeSector.metricLabel}
                </div>
              </div>
            </div>

            {/* Right Live Nodes Verification Table (Inspired by frame_14 floating elements) */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs">
                  <span className="font-bold text-neutral-900 uppercase tracking-wider">
                    Distributed Infrastructure Nodes
                  </span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono text-[10px]">
                    100% HEALTH
                  </span>
                </div>

                <div className="space-y-2">
                  {activeSector.nodes.map((node, i) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2 font-medium text-neutral-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{node.label}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-neutral-500 text-[11px]">
                        <span className="uppercase text-[10px] text-neutral-400">{node.status}</span>
                        <span className="text-emerald-600 font-bold">{node.latency}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Cryptographic Proof: <strong>Zk-SNARK Verified</strong></span>
                  <span>Consensus: <strong>Byzantine Fault Tolerant</strong></span>
                </div>
              </div>
            </div>

          </div>

          {/* 4 Cards underneath matching MONELIQ frame_15 (Easiness, Storage, Buy/sell, Security) */}
          <div className="mt-8 pt-8 border-t border-neutral-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Autonomous Operations",
                desc: "Algorithmic routing reduces human intervention and removes settlement friction completely."
              },
              {
                title: "Segregated Custody",
                desc: "Air-gapped multi-sig vaults protect institutional principal across all jurisdictions."
              },
              {
                title: "Atomic Dispatch",
                desc: "Simultaneous execution guarantees zero counterparty delivery risk."
              },
              {
                title: "Post-Quantum Security",
                desc: "NIST-compliant lattice cryptography safeguards data against future computational threats."
              }
            ].map((f, fIdx) => (
              <div key={fIdx} className="bg-white/80 p-4 rounded-2xl border border-neutral-200/60">
                <div className="w-7 h-7 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center text-xs font-bold mb-2.5">
                  0{fIdx + 1}
                </div>
                <h4 className="text-xs font-bold text-neutral-900 mb-1">{f.title}</h4>
                <p className="text-[11px] text-neutral-500 leading-normal">{f.desc}</p>
              </div>
            ))}
          </div>

        </motion.div>
      </AnimatePresence>

    </section>
  );
};

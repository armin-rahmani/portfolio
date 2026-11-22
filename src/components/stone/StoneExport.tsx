import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe, Anchor, ShieldCheck, Box, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StoneExportProps {
  onOpenQuote: () => void;
}

export const StoneExport: React.FC<StoneExportProps> = ({ onOpenQuote }) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.export-reveal',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="export" ref={containerRef} className="py-28 md:py-36 bg-black border-t border-b border-white/10 relative text-white select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 md:px-12">
        
        {/* Header */}
        <div className="export-reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span>GLOBAL LOGISTICS</span>
            </div>
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl text-white font-bold tracking-tighter uppercase">
              WORLDWIDE <span className="font-light text-neutral-400">EXPORT</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-neutral-400 mt-2 tracking-wider uppercase">
              ISPM-15 FUMIGATED BUNDLES • SECURE OCEAN FREIGHT VIA BANDAR ABBAS
            </p>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              Arash Stone Co. ships high-grade slabs and calibrated tiles across the Persian Gulf, Europe, Central Asia, and Australia, rigorously adhering to international packaging and third-party inspection protocols.
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="export-reveal p-8 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white mb-6">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-sans font-bold text-white mb-2">
                ISPM-15 Fumigated Bundles
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Certified heat-treated heavy timber A-frames with official IPPC stamps. Shock-absorbing polyethylene foam sheets between each slab face prevent abrasion and vibration fractures during sea transit.
              </p>
            </div>
            <div className="space-y-1.5 text-[11px] font-mono text-neutral-300 pt-4 border-t border-white/10">
              <div>✓ Heat Treatment IPPC Certified</div>
              <div>✓ Waterproof Shrink-Wrap Membrane</div>
              <div>✓ Steel Corner Angle Protectors</div>
            </div>
          </div>

          <div className="export-reveal p-8 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white mb-6">
                <Anchor className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-sans font-bold text-white mb-2">
                Heavy-Duty 20ft Containers
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Loaded in dedicated 20ft dry ocean containers anchored with reinforced structural steel lashing straps and timber dunnage to withstand heavy maritime roll and pitch from Bandar Abbas to worldwide destination ports.
              </p>
            </div>
            <div className="space-y-1.5 text-[11px] font-mono text-neutral-300 pt-4 border-t border-white/10">
              <div>✓ 2cm Slabs: ~430 - 450 m² / Container</div>
              <div>✓ 3cm Slabs: ~280 - 300 m² / Container</div>
              <div>✓ Payload: 26 to 28 Metric Tons</div>
            </div>
          </div>

          <div className="export-reveal p-8 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center text-white mb-6">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-sans font-bold text-white mb-2">
                Full Export Documentation
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Comprehensive documentation issued on every consignment: Commercial Invoice, Detailed Packing List with exact slab dimensions, Certificate of Origin, and SGS / Bureau Veritas quality inspection reports.
              </p>
            </div>
            <div className="space-y-1.5 text-[11px] font-mono text-neutral-300 pt-4 border-t border-white/10">
              <div>✓ Chamber of Commerce Certificate</div>
              <div>✓ SGS & BV Inspection Available</div>
              <div>✓ FOB Bandar Abbas / CIF Global Ports</div>
            </div>
          </div>

        </div>

        {/* Global Destinations Card */}
        <div className="export-reveal p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-xl sm:text-2xl font-sans font-bold text-white mb-2">
              Serving Global Architects & Importers
            </h4>
            <p className="text-xs text-neutral-400 max-w-xl">
              Regular shipments to United Arab Emirates, Qatar, Oman, Turkey, Germany, Italy, Russia, Australia, and Iraq.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="px-6 py-3.5 rounded-lg bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-xl flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span>Request Export CIF Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

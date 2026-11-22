import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, MessageSquare } from 'lucide-react';
import { StoneProduct } from './StoneCatalog';

interface StoneDetailModalProps {
  stone: StoneProduct | null;
  onClose: () => void;
  onOpenQuote: (stoneName: string) => void;
}

export const StoneDetailModal: React.FC<StoneDetailModalProps> = ({
  stone,
  onClose,
  onOpenQuote
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!stone) return;

    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
      .fromTo(
        modalRef.current,
        { scale: 0.95, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' },
        '-=0.15'
      );

    return () => {
      document.body.style.overflow = '';
    };
  }, [stone]);

  if (!stone) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 select-none">
      
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col text-white"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10 bg-black">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-white/10 text-white text-xs font-mono uppercase tracking-widest border border-white/20">
              {stone.family}
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-sans font-bold text-white leading-tight">
                {stone.name}
              </h3>
              <span className="text-xs font-mono text-neutral-400">
                {stone.quarryOrigin}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Stone Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* Main Visual Slab */}
          <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-white/10 group bg-black">
            <img
              src={stone.image}
              alt={stone.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                Visual Chromatic Profile
              </span>
              <p className="text-xs sm:text-sm font-medium text-neutral-200">
                {stone.tone}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Architectural & Geological Description
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              {stone.description}
            </p>
          </div>

          {/* ASTM Technical Spec Matrix */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-300 mb-3">
              Certified Technical Specifications (ASTM / EN Standard)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-black border border-white/10">
                <span className="text-[10px] text-neutral-400 block">Density</span>
                <span className="text-white font-bold text-sm">{stone.density}</span>
              </div>
              <div className="p-3 rounded-lg bg-black border border-white/10">
                <span className="text-[10px] text-neutral-400 block">Water Absorption</span>
                <span className="text-white font-bold text-sm">{stone.absorption}</span>
              </div>
              <div className="p-3 rounded-lg bg-black border border-white/10">
                <span className="text-[10px] text-neutral-400 block">Compressive Load</span>
                <span className="text-white font-bold text-sm">135 MPa</span>
              </div>
              <div className="p-3 rounded-lg bg-black border border-white/10">
                <span className="text-[10px] text-neutral-400 block">Resin Support</span>
                <span className="text-white font-bold text-sm">Tenax Vacuum</span>
              </div>
            </div>
          </div>

          {/* Available Formats */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Available Formats & Cuts
            </h4>
            <div className="flex flex-wrap gap-2">
              {stone.formats.map((fmt, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-md bg-black border border-white/10 text-xs font-mono text-neutral-200"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* Available Finishes */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Surface Processing Options
            </h4>
            <div className="flex flex-wrap gap-2">
              {stone.finishes.map((fn, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-md bg-white/5 border border-white/15 text-xs font-mono text-neutral-200"
                >
                  {fn}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-white/10 bg-black flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-400 text-center sm:text-left">
            In stock at Mahmudabad Factory Yard, Isfahan
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-mono transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote(stone.name);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire This Stone</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

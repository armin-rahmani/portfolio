import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, ArrowUpRight, Phone, MessageSquare, MapPin } from 'lucide-react';

interface StoneMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

const MENU_ITEMS = [
  { label: 'Pietra Gray (Lashotor)', href: '#pietra-gray', sub: 'Master Marble Slabs' },
  { label: 'Stone Collections', href: '#catalog', sub: 'Travertine, Onyx, Crystal' },
  { label: 'Surface Finishes', href: '#finishes', sub: 'Polished, Honed, Bush-Hammered' },
  { label: 'Quarry & Factory', href: '#process', sub: 'Italian Cutting & Breton Polish' },
  { label: 'Worldwide Export', href: '#export', sub: 'ISPM-15 Wooden Bundles' },
  { label: 'Factory Contact', href: '#contact', sub: 'Mahmudabad Industrial Zone' }
];

export const StoneMobileMenu: React.FC<StoneMobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenQuote
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();

      tl.set(containerRef.current, { visibility: 'visible' })
        .fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: 'power2.out' }
        )
        .fromTo(
          panelRef.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.5, ease: 'power4.out' },
          '-=0.2'
        )
        .fromTo(
          linksRef.current.filter(Boolean),
          { opacity: 0, x: 25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power3.out'
          },
          '-=0.25'
        );
    } else {
      document.body.style.overflow = '';
      if (containerRef.current) {
        gsap.to(panelRef.current, {
          xPercent: 100,
          duration: 0.35,
          ease: 'power3.in',
          onComplete: () => {
            gsap.set(containerRef.current, { visibility: 'hidden' });
          }
        });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 });
      }
    }
  }, { scope: containerRef, dependencies: [isOpen] });

  const handleLinkClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] select-none"
      style={{ visibility: 'hidden' }}
    >
      {/* Dark Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
      />

      {/* Slide-out Clean Panel */}
      <div
        ref={panelRef}
        className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#0A0A0A] border-l border-white/10 flex flex-col justify-between p-6 sm:p-10 shadow-2xl overflow-y-auto"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex flex-col">
            <span className="font-sans font-bold text-white text-base tracking-tight uppercase">
              ARASH STONE CO.
            </span>
            <span className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase">
              ISFAHAN • EST. 1974
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
            aria-label="Close mobile menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="my-8 space-y-4">
          {MENU_ITEMS.map((item, idx) => (
            <a
              key={item.href}
              ref={(el) => { linksRef.current[idx] = el; }}
              onClick={() => handleLinkClick(item.href)}
              className="block group py-2.5 border-b border-white/5 hover:border-white/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-sans font-semibold text-neutral-300 group-hover:text-white transition-colors">
                  {item.label}
                </span>
                <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-mono text-neutral-500 block mt-0.5">
                {item.sub}
              </span>
            </a>
          ))}
        </nav>

        {/* Bottom Actions & Contacts */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <button
            onClick={onOpenQuote}
            className="w-full py-3.5 rounded-lg bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Request Factory Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href="tel:03133808419"
            className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-neutral-400" />
            <span>Call Factory: 031-33808419</span>
          </a>

          <a
            href="https://wa.me/989133129210"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-neutral-400" />
            <span>WhatsApp: +98 913 312 9210</span>
          </a>

          <div className="text-[11px] font-mono text-neutral-500 text-center pt-2">
            Mahmudabad Industrial Zone, 34th St., Isfahan, Iran
          </div>
        </div>

      </div>
    </div>
  );
};

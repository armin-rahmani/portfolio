import React from 'react';
import { ArrowUp, MapPin, Phone, Mail, Globe, ShieldCheck } from 'lucide-react';

export const StoneFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090C] border-t border-white/10 text-neutral-400 select-none">
      
      {/* Top Banner with Stone Brand Statement */}
      <div className="border-b border-white/5 py-12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl border border-[#C5A059]/40 bg-[#14171D] flex items-center justify-center text-[#C5A059]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <line x1="12" y1="22" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" />
                <line x1="12" y1="12" x2="22" y2="8.5" stroke="currentColor" strokeWidth="1.2" />
                <line x1="12" y1="12" x2="2" y2="8.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
            <div>
              <span className="font-serif-luxury font-bold tracking-[0.14em] text-white text-lg uppercase block">
                ARASH STONE CO.
              </span>
              <span className="text-xs font-mono text-[#C5A059]">
                صنایع سنگ آرش اصفهان • ۵۰ سال تعهد در استخراج و فرآوری سنگ ساختمانی
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>ISPM-15 Certified Export</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#C5A059]" />
              <span>Breton Diamond Processing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Col 1: Heritage & Narrative */}
        <div>
          <h4 className="text-sm font-mono uppercase tracking-widest text-white mb-4">
            About Arash Stone
          </h4>
          <p className="text-xs leading-relaxed text-neutral-400 mb-4">
            Founded over five decades ago in Isfahan, Arash Stone Co. is a leading Iranian producer and exporter of Lashotor (Pietra Gray) marble, silver travertine, and bookmatch luxury slabs.
          </p>
          <span className="text-[11px] font-mono text-[#C5A059] block">
            Annual Production: 500,000+ m²
          </span>
        </div>

        {/* Col 2: Flagship Stone Collections */}
        <div>
          <h4 className="text-sm font-mono uppercase tracking-widest text-white mb-4">
            Flagship Materials
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            <li>
              <a href="#pietra-gray" className="hover:text-[#C5A059] transition-colors">
                Lashotor (Pietra Gray) Marble
              </a>
            </li>
            <li>
              <a href="#catalog" className="hover:text-[#C5A059] transition-colors">
                Takab Silver Travertine
              </a>
            </li>
            <li>
              <a href="#catalog" className="hover:text-[#C5A059] transition-colors">
                Abbas Abad Super White
              </a>
            </li>
            <li>
              <a href="#catalog" className="hover:text-[#C5A059] transition-colors">
                Kashan Golden Black Marble
              </a>
            </li>
            <li>
              <a href="#catalog" className="hover:text-[#C5A059] transition-colors">
                Aligudarz White Crystal Slabs
              </a>
            </li>
            <li>
              <a href="#catalog" className="hover:text-[#C5A059] transition-colors">
                Persian Backlit Honey Onyx
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Quick Navigation */}
        <div>
          <h4 className="text-sm font-mono uppercase tracking-widest text-white mb-4">
            Architecture & Factory
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            <li>
              <a href="#pietra-gray" className="hover:text-[#C5A059] transition-colors">
                Bookmatch Studio
              </a>
            </li>
            <li>
              <a href="#finishes" className="hover:text-[#C5A059] transition-colors">
                Artisan Surface Finishes
              </a>
            </li>
            <li>
              <a href="#process" className="hover:text-[#C5A059] transition-colors">
                Italian Gangsaw Processing
              </a>
            </li>
            <li>
              <a href="#export" className="hover:text-[#C5A059] transition-colors">
                Container Logistics & Bundles
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#C5A059] transition-colors">
                Factory Quotation Calculator
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Verified Contact */}
        <div>
          <h4 className="text-sm font-mono uppercase tracking-widest text-white mb-4">
            Factory & Showroom
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
              <span>
                اصفهان، شهرک صنعتی محمودآباد، خیابان ۳۴، صنایع سنگ آرش
                <span className="block font-mono text-[11px] text-neutral-500 mt-0.5">
                  Mahmudabad Industrial Zone, 34th St., Isfahan
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2.5 font-mono">
              <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
              <a href="tel:03133808419" className="hover:text-[#C5A059]">
                031-33808419 / 031-33808418
              </a>
            </div>

            <div className="flex items-center gap-2.5 font-mono">
              <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
              <a href="mailto:info@arashstoneco.com" className="hover:text-[#C5A059]">
                info@arashstoneco.com
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal & Back to Top */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>
            © {new Date().getFullYear()} Arash Stone Co. (صنایع سنگ آرش اصفهان). All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-400 hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <span>Back to Summit</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

    </footer>
  );
};

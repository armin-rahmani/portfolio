import React from 'react';
import { ArrowUpRight, Mail, Phone, ArrowUp } from 'lucide-react';

interface DMFooterProps {
  onOpenContact: () => void;
}

export const DMFooter: React.FC<DMFooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0A0A] text-white pt-24 sm:pt-32 md:pt-44 pb-12 px-6 md:px-12 border-t border-white/10 overflow-hidden select-none">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#5363F6]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Massive Call To Action Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex -space-x-3 overflow-hidden">
              <img
                src="/images/dm/digitalmakers-robin-white.avif"
                alt="Robin"
                className="w-12 h-12 rounded-full ring-2 ring-white/20 object-cover bg-gray-800"
              />
              <img
                src="/images/dm/digitalmakers-nick-white.avif"
                alt="Nick"
                className="w-12 h-12 rounded-full ring-2 ring-white/20 object-cover bg-gray-800"
              />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F8CB47]">
              Let’s build something extraordinary
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-10">
            Let’s boost your digital experience
          </h2>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#5363F6] text-white hover:bg-[#4352E4] transition-all duration-300 font-semibold text-base shadow-xl shadow-[#5363F6]/30 hover:scale-105 active:scale-95"
            >
              <span>Book a brief meeting</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 font-semibold text-base backdrop-blur-md hover:scale-105 active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Reach out</span>
            </button>
          </div>
        </div>

        {/* Multi-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <img
                src="/images/dm/digitalmakers-logo-white.svg"
                alt="Digitalmakers"
                className="w-32 h-auto mb-6"
              />
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light mb-6">
                We think and act digital. Helping ambitious brands step forward with sharper visual identity, faster websites, and high-impact digital marketing.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Based in Rotterdam • Working Globally</span>
            </div>
          </div>

          {/* Col 2: Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#approach" className="hover:text-white transition-colors">
                  Brand Strategy & Identity
                </a>
              </li>
              <li>
                <a href="#approach" className="hover:text-white transition-colors">
                  Webflow CMS Development
                </a>
              </li>
              <li>
                <a href="#approach" className="hover:text-white transition-colors">
                  GSAP Interactive Motion
                </a>
              </li>
              <li>
                <a href="#approach" className="hover:text-white transition-colors">
                  Technical SEO & Analytics
                </a>
              </li>
              <li>
                <a href="#approach" className="hover:text-white transition-colors">
                  Conversion Optimization
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#approach" className="hover:text-white transition-colors">
                  What we do
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-white transition-colors">
                  Our cases
                </a>
              </li>
              <li>
                <a href="#statement" className="hover:text-white transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#updates" className="hover:text-white transition-colors">
                  Update Log
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  Client Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Armin Rahmani Info (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div>
                <span className="block text-[11px] text-gray-500 uppercase tracking-wider font-mono">
                  Personal Email
                </span>
                <a
                  href="mailto:arminrahmani318@gmail.com"
                  className="text-white hover:text-[#5363F6] transition-colors font-medium break-all"
                >
                  arminrahmani318@gmail.com
                </a>
              </div>

              <div>
                <span className="block text-[11px] text-gray-500 uppercase tracking-wider font-mono">
                  Studio Email
                </span>
                <a
                  href="mailto:hello@digitalmakers.nl"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  hello@digitalmakers.nl
                </a>
              </div>

              <div>
                <span className="block text-[11px] text-gray-500 uppercase tracking-wider font-mono">
                  Direct Phone Numbers
                </span>
                <div className="flex flex-col gap-1 font-mono text-xs sm:text-sm mt-1">
                  <a href="tel:09138763394" className="text-white hover:text-[#5363F6] transition-colors">
                    09138763394
                  </a>
                  <a href="tel:09203275255" className="text-gray-300 hover:text-white transition-colors">
                    09203275255
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2027 Digitalmakers. Crafted with GSAP & Webflow standards.</p>

          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-white transition-all hover:bg-white/5 active:scale-95"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

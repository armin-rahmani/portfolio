import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Shield, Globe, Menu, X, CheckCircle2 } from 'lucide-react';
import { navigationData } from '../data/companyData';
import { Perspective } from '../types';

interface HeaderProps {
  perspective: Perspective;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ perspective, onOpenContact }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/85 backdrop-blur-md border-b border-neutral-200/60 shadow-xs py-3' 
          : 'bg-white/50 backdrop-blur-xs py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 text-[13px] font-medium text-neutral-600">
            {/* Solutions Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 hover:text-neutral-950 transition-colors py-2 cursor-pointer focus:outline-hidden"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 w-[580px] bg-white rounded-2xl shadow-2xl border border-neutral-100 p-6 z-50"
                  >
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-900">{navigationData.solutions.title}</h4>
                        <p className="text-xs text-neutral-500">{navigationData.solutions.subtitle}</p>
                      </div>
                      <a href="#services" className="text-xs font-semibold text-emerald-600 flex items-center gap-1 hover:gap-1.5 transition-all">
                        <span>Explore all</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {navigationData.solutions.columns.map((col, idx) => (
                        <div key={idx} className="space-y-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">{col.heading}</span>
                          <div className="space-y-2">
                            {col.links.map((link, lIdx) => (
                              <a 
                                key={lIdx} 
                                href="#capabilities" 
                                className="group block p-1.5 -mx-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
                              >
                                <div className="text-xs font-semibold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                                  {link.name}
                                </div>
                                <div className="text-[11px] text-neutral-500 leading-tight">
                                  {link.desc}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Featured bottom teaser */}
                    <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between bg-neutral-50/80 -mx-6 -mb-6 p-4 rounded-b-2xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          {navigationData.solutions.featured.tag}
                        </span>
                        <span className="text-xs font-medium text-neutral-700">
                          {navigationData.solutions.featured.title}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-400 group-hover:text-neutral-700">Read &rarr;</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Practice Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('practice')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 hover:text-neutral-950 transition-colors py-2 cursor-pointer focus:outline-hidden"
              >
                <span>Practice</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'practice' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'practice' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 w-[540px] bg-white rounded-2xl shadow-2xl border border-neutral-100 p-6 z-50"
                  >
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-900">{navigationData.practice.title}</h4>
                        <p className="text-xs text-neutral-500">{navigationData.practice.subtitle}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {navigationData.practice.columns.map((col, idx) => (
                        <div key={idx} className="space-y-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">{col.heading}</span>
                          <div className="space-y-2">
                            {col.links.map((link, lIdx) => (
                              <a 
                                key={lIdx} 
                                href="#sectors" 
                                className="group block p-1.5 -mx-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
                              >
                                <div className="text-xs font-semibold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                                  {link.name}
                                </div>
                                <div className="text-[11px] text-neutral-500 leading-tight">
                                  {link.desc}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Institutional Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('institutional')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className="flex items-center gap-1 hover:text-neutral-950 transition-colors py-2 cursor-pointer focus:outline-hidden"
              >
                <span>Institutional</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'institutional' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === 'institutional' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 w-[500px] bg-white rounded-2xl shadow-2xl border border-neutral-100 p-6 z-50"
                  >
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-900">{navigationData.institutional.title}</h4>
                        <p className="text-xs text-neutral-500">{navigationData.institutional.subtitle}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {navigationData.institutional.columns.map((col, idx) => (
                        <div key={idx} className="space-y-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">{col.heading}</span>
                          <div className="space-y-2">
                            {col.links.map((link, lIdx) => (
                              <a 
                                key={lIdx} 
                                href="#engagement" 
                                className="group block p-1.5 -mx-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
                              >
                                <div className="text-xs font-semibold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                                  {link.name}
                                </div>
                                <div className="text-[11px] text-neutral-500 leading-tight">
                                  {link.desc}
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#projects" className="hover:text-neutral-950 transition-colors py-2">
              Case Briefs
            </a>
          </nav>

          {/* Center: Monogram / Brand Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-5 h-5 rounded-md bg-neutral-950 flex items-center justify-center text-white text-[11px] font-black tracking-tighter">
                A
              </div>
              <span className="text-base sm:text-lg font-black tracking-[0.22em] text-neutral-950 group-hover:opacity-85 transition-opacity uppercase font-sans">
                AURELIUS
              </span>
            </a>
          </div>

          {/* Right Navigation & CTAs */}
          <div className="hidden lg:flex items-center space-x-6 text-[13px] font-medium">
            <a href="#philosophy" className="text-neutral-600 hover:text-neutral-950 transition-colors">
              Insights
            </a>
            <div className="flex items-center gap-1 text-neutral-500 hover:text-neutral-900 cursor-pointer">
              <Globe className="w-3.5 h-3.5" />
              <span>Global / EN</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <a 
              href="#client-portal" 
              onClick={(e) => { e.preventDefault(); onOpenContact(); }}
              className="text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              Client Portal
            </a>
            
            {/* Pill CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenContact}
              className="bg-neutral-950 text-white hover:bg-neutral-800 px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all shadow-xs cursor-pointer"
            >
              Schedule Briefing
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={onOpenContact}
              className="bg-neutral-950 text-white px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-neutral-200 px-6 py-6 overflow-hidden"
          >
            <div className="space-y-4">
              <div className="pb-3 border-b border-neutral-100">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">Navigation</span>
                <div className="space-y-2">
                  <a 
                    href="#services" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-neutral-900 py-1"
                  >
                    Enterprise Solutions
                  </a>
                  <a 
                    href="#capabilities" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-neutral-900 py-1"
                  >
                    Core Capabilities
                  </a>
                  <a 
                    href="#projects" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-neutral-900 py-1"
                  >
                    Featured Projects
                  </a>
                  <a 
                    href="#sectors" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-neutral-900 py-1"
                  >
                    Industry Sectors
                  </a>
                  <a 
                    href="#engagement" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm font-semibold text-neutral-900 py-1"
                  >
                    Engagement Models
                  </a>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full bg-neutral-950 text-white py-2.5 rounded-full text-xs font-medium tracking-wide"
                >
                  Schedule Executive Briefing
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

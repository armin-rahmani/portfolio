import React from 'react';
import { Link } from 'react-router-dom';
import { CelestiqueLogo } from './CelestiqueLogo';
import { ArrowUp, Sparkles } from 'lucide-react';

export const CelestiqueFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#C7BEB2] text-[#1C1917] pt-16 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-12 border-t border-[#1C1917]/10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        {/* Top Navigation Row (Exact Reference Match) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-[#1C1917]/15">
          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-tenor uppercase tracking-[0.2em] text-[#1C1917]/80">
            <a href="#hero" className="hover:text-[#1C1917] transition-colors">
              HOME
            </a>
            <a href="#categories" className="hover:text-[#1C1917] transition-colors">
              PRODUCTS
            </a>
            <a href="#about" className="hover:text-[#1C1917] transition-colors">
              ABOUT US
            </a>
            <a href="#products" className="hover:text-[#1C1917] transition-colors">
              CREATIONS
            </a>
            <Link to="/" className="text-[#1C1917] font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity">
              ARMIN PORTFOLIO
            </Link>
            <Link to="/sohub" className="hover:text-[#1C1917] transition-colors">
              RAYA STUDIO
            </Link>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/40 hover:bg-[#1C1917] hover:text-white transition-all duration-300 flex items-center justify-center shadow-2xs"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/40 hover:bg-[#1C1917] hover:text-white transition-all duration-300 flex items-center justify-center shadow-2xs"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.65 5H18V0h-3.808C10.597 0 9 1.582 9 4.615V8z" />
                </svg>
              </a>
              <div
                className="w-9 h-9 rounded-full bg-white/40 flex items-center justify-center shadow-2xs text-xs font-tenor font-bold"
                title="Pinterest"
              >
                P
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/60 hover:bg-[#1C1917] hover:text-white transition-all duration-300 text-xs font-tenor tracking-widest uppercase shadow-2xs cursor-pointer ml-2"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Center: Massive White Celestique Logo (Exact Reference Match) */}
        <div className="w-full text-center py-12 sm:py-16 overflow-hidden">
          <CelestiqueLogo
            size="footer"
            variant="light"
            className="w-full justify-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          />
        </div>

        {/* Bottom Legal & Mandatory Armin Rahmani Attribution Bar */}
        <div className="pt-8 border-t border-[#1C1917]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-tenor text-[#1C1917]/70 tracking-widest uppercase">
          {/* Copyright */}
          <div>
            © 2025 CELESTIQUE HAUTE JOAILLERIE. ALL RIGHTS RESERVED.
          </div>

          {/* MANDATORY USER ATTRIBUTION */}
          <div className="px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-xs border border-[#1C1917]/10 text-[#1C1917] font-semibold tracking-[0.16em] flex items-center gap-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
            <span>DESIGNED & ENGINEERED BY ARMIN RAHMANI</span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-[11px] text-[#1C1917]/60">
            <span className="hover:text-[#1C1917] cursor-pointer">PRIVACY</span>
            <span>•</span>
            <span className="hover:text-[#1C1917] cursor-pointer">TERMS</span>
            <span>•</span>
            <span className="hover:text-[#1C1917] cursor-pointer">SUSTAINABILITY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

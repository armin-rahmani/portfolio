import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, ArrowUpRight } from 'lucide-react';

interface DMMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const DMMenuDrawer: React.FC<DMMenuDrawerProps> = ({ isOpen, onClose, onOpenContact }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [timeStr, setTimeStr] = useState('');

  // Live CET Clock (Amsterdam / Rotterdam)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Amsterdam',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTimeStr(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance & Exit animation
  useGSAP(() => {
    if (!drawerRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(drawerRef.current, {
        autoAlpha: 1,
        duration: 0.35,
        ease: 'power2.out'
      });

      const links = linksRef.current?.querySelectorAll('.menu-item-link');
      if (links && links.length > 0) {
        gsap.fromTo(
          links,
          { y: 60, opacity: 0, rotateX: 20 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.15
          }
        );
      }
    } else {
      document.body.style.overflow = '';
      gsap.to(drawerRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, { scope: drawerRef, dependencies: [isOpen] });

  const handleNavClick = (anchor: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div
      ref={drawerRef}
      className="fixed inset-0 z-[9990] bg-[#0E0E0E]/98 text-white backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 md:p-20 overflow-y-auto"
      style={{ visibility: 'hidden', opacity: 0 }}
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between w-full border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <img
            src="/images/dm/digitalmakers-logo-white.svg"
            alt="Digitalmakers"
            className="w-24 sm:w-28 h-auto"
          />
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <p className="text-xs font-mono text-gray-400 tracking-wider">
            {timeStr} <span className="text-[#5363F6]">CET</span>
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white/50 text-xs uppercase tracking-wider font-medium transition-all group"
        >
          <span>Close</span>
          <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
        </button>
      </div>

      {/* Main Large Links */}
      <div ref={contentRef} className="py-12 md:py-16">
        <div ref={linksRef} className="flex flex-col gap-4 md:gap-6 perspective-1000">
          <button
            onClick={() => handleNavClick('#approach')}
            className="menu-item-link text-left text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight hover:text-[#5363F6] transition-colors flex items-baseline gap-4 group"
          >
            <span>What we do</span>
            <ArrowUpRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#5363F6]" />
          </button>

          <button
            onClick={() => handleNavClick('#cases')}
            className="menu-item-link text-left text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight hover:text-[#5363F6] transition-colors flex items-baseline gap-4 group"
          >
            <span>
              Showcase<sup className="text-2xl sm:text-3xl font-mono text-[#F8CB47]">5</sup>
            </span>
            <ArrowUpRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#5363F6]" />
          </button>

          <button
            onClick={() => handleNavClick('#statement')}
            className="menu-item-link text-left text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight hover:text-[#5363F6] transition-colors flex items-baseline gap-4 group"
          >
            <span>About us</span>
            <ArrowUpRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#5363F6]" />
          </button>

          <button
            onClick={() => handleNavClick('#updates')}
            className="menu-item-link text-left text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight hover:text-[#5363F6] transition-colors flex items-baseline gap-4 group"
          >
            <span>Update Log</span>
            <ArrowUpRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#5363F6]" />
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="menu-item-link text-left text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#5363F6] hover:text-white transition-colors flex items-baseline gap-4 group"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </button>
        </div>
      </div>

      {/* Drawer Footer Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10 text-xs sm:text-sm text-gray-400">
        <div>
          <span className="block text-gray-500 uppercase tracking-widest text-[10px] mb-2 font-semibold">
            Socials
          </span>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/company/thedigitalmakers/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/digitalmakers.nl/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://github.com/arminrahmani318"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div>
          <span className="block text-gray-500 uppercase tracking-widest text-[10px] mb-2 font-semibold">
            Direct Contact
          </span>
          <a
            href="mailto:arminrahmani318@gmail.com"
            className="block text-white hover:text-[#5363F6] transition-colors font-medium"
          >
            arminrahmani318@gmail.com
          </a>
          <a
            href="mailto:hello@digitalmakers.nl"
            className="block text-gray-400 hover:text-white transition-colors mt-0.5"
          >
            hello@digitalmakers.nl
          </a>
        </div>

        <div>
          <span className="block text-gray-500 uppercase tracking-widest text-[10px] mb-2 font-semibold">
            Direct Phone
          </span>
          <a
            href="tel:09138763394"
            className="block text-white hover:text-[#5363F6] transition-colors font-mono"
          >
            09138763394
          </a>
          <a
            href="tel:09203275255"
            className="block text-gray-400 hover:text-white transition-colors font-mono mt-0.5"
          >
            09203275255
          </a>
        </div>
      </div>
    </div>
  );
};

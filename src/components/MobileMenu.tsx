import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, ArrowUpRight, Mail, Phone, MessageSquare } from 'lucide-react';
import { useContactModal } from '../context/ContactModalContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (target: string, label: string) => void;
}

const MENU_ITEMS = [
  { id: '/', label: 'Home', number: '01' },
  { id: '#about', label: 'About', number: '02' },
  { id: '#services', label: 'Services', number: '03' },
  { id: '#work', label: 'Work', number: '04' },
  { id: '#process', label: 'Process', number: '05' }
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);
  const { openContactModal } = useContactModal();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // GSAP Floating Menu Animation
  useGSAP(() => {
    if (!overlayRef.current || !floatingCardRef.current || !backdropRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // 1. Show overlay container
      gsap.set(overlayRef.current, { autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // 2. Backdrop fade in
      tl.fromTo(
        backdropRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3 }
      );

      // 3. Floating Card springs down into screen
      tl.fromTo(
        floatingCardRef.current,
        {
          y: -40,
          scale: 0.9,
          autoAlpha: 0,
          rotateX: 10
        },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          rotateX: 0,
          duration: 0.5,
          ease: 'back.out(1.4)'
        },
        '-=0.15'
      );

      // 4. Staggered navigation links entrance
      const items = linksContainerRef.current?.querySelectorAll('.floating-menu-item');
      if (items && items.length > 0) {
        tl.fromTo(
          items,
          { y: 18, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power3.out'
          },
          '-=0.25'
        );
      }

      // 5. Continuous gentle floating wave effect while on screen
      floatTweenRef.current = gsap.to(floatingCardRef.current, {
        y: '+=6',
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.6
      });

    } else {
      document.body.style.overflow = '';

      // Kill floating hover animation if active
      if (floatTweenRef.current) {
        floatTweenRef.current.kill();
        floatTweenRef.current = null;
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power2.in' },
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { autoAlpha: 0 });
          }
        }
      });

      tl.to(floatingCardRef.current, {
        y: -25,
        scale: 0.92,
        autoAlpha: 0,
        duration: 0.25
      })
      .to(
        backdropRef.current,
        { autoAlpha: 0, duration: 0.2 },
        '-=0.15'
      );
    }
  }, { scope: overlayRef, dependencies: [isOpen] });

  const handleLinkClick = (target: string, label: string) => {
    if (floatTweenRef.current) {
      floatTweenRef.current.kill();
      floatTweenRef.current = null;
    }

    if (floatingCardRef.current) {
      gsap.to(floatingCardRef.current, {
        y: -20,
        scale: 0.94,
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          onClose();
          onNavigate(target, label);
        }
      });
      if (backdropRef.current) {
        gsap.to(backdropRef.current, { autoAlpha: 0, duration: 0.2 });
      }
    } else {
      onClose();
      onNavigate(target, label);
    }
  };

  const handleTalkToMe = () => {
    if (floatTweenRef.current) {
      floatTweenRef.current.kill();
      floatTweenRef.current = null;
    }

    onClose();
    setTimeout(() => {
      openContactModal();
    }, 250);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9990] sm:hidden select-none flex items-center justify-center p-4"
      style={{ visibility: 'hidden', opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      {/* Background Dimmer Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      {/* Floating Menu Island Card */}
      <div
        ref={floatingCardRef}
        className="relative z-10 w-full max-w-sm bg-[#0E0E0E]/95 backdrop-blur-2xl border border-white/15 text-white rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.75)] transform-gpu max-h-[90vh] flex flex-col justify-between overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex flex-col">
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
              Navigation
            </span>
            <span className="text-sm font-bold tracking-tight text-white uppercase font-sans">
              Armin Rahmani
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer"
            aria-label="Close Floating Menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links Group */}
        <div ref={linksContainerRef} className="py-5 space-y-1">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleLinkClick(item.id, item.label.toUpperCase())}
              className="floating-menu-item group w-full flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 text-left transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-500 font-semibold group-hover:text-white transition-colors">
                  {item.number}
                </span>
                <span className="text-lg font-bold tracking-tight text-neutral-200 group-hover:text-white group-hover:translate-x-1 transition-all">
                  {item.label}
                </span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>
          ))}
        </div>

        {/* Quick Action CTA inside Floating Menu */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <button
            onClick={handleTalkToMe}
            className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Talk to me</span>
          </button>

          {/* Contact Details */}
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 px-1 pt-1">
            <span className="truncate">arminrahmani318@gmail.com</span>
            <span className="text-neutral-500 shrink-0">Available</span>
          </div>
        </div>

      </div>
    </div>
  );
};

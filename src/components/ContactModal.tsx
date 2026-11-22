import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useContactModal } from '../context/ContactModalContext';
import { usePageTransition } from '../context/TransitionContext';

export const ContactModal: React.FC = () => {
  const { isOpen, closeContactModal } = useContactModal();
  const { navigateTo } = usePageTransition();
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeContactModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeContactModal]);

  // GSAP Entrance & Exit Orchestration
  useGSAP(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.35,
        visibility: 'visible',
        pointerEvents: 'auto'
      })
      .fromTo(
        drawerRef.current,
        { x: '100%', opacity: 0.5 },
        { x: '0%', opacity: 1, duration: 0.65, ease: 'power4.out' },
        '-=0.2'
      )
      .fromTo(
        '.contact-drawer-item',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power3.out' },
        '-=0.35'
      );
    } else {
      document.body.style.overflow = '';
      if (overlayRef.current && drawerRef.current) {
        const tl = gsap.timeline({
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.visibility = 'hidden';
              overlayRef.current.style.pointerEvents = 'none';
            }
          }
        });

        tl.to(drawerRef.current, {
          x: '100%',
          opacity: 0.6,
          duration: 0.35,
          ease: 'power3.in'
        })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in'
        }, '-=0.15');
      }
    }
  }, { scope: overlayRef, dependencies: [isOpen] });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2000);
  };

  const handleOpenBrief = () => {
    closeContactModal();
    navigateTo('/contact', 'CONTACT');
  };

  // GSAP magnetic button handler
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(target, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleBtnMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: 'elastic.out(1.2, 0.4)',
      overwrite: 'auto'
    });
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) closeContactModal();
      }}
      className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-md opacity-0 pointer-events-none select-none transition-opacity"
      style={{ visibility: 'hidden' }}
      role="dialog"
      aria-modal="true"
      aria-label="Direct Contact Armin Rahmani"
    >
      <div
        ref={drawerRef}
        className="w-full max-w-xl sm:max-w-2xl h-full bg-[#F8F7F4] bg-grain border-l border-neutral-300 text-[#0e0e0e] p-[5vw] sm:p-[2.8vw] flex flex-col justify-between overflow-y-auto shadow-2xl relative"
      >
        {/* Top Header */}
        <div className="contact-drawer-item flex items-center justify-between pb-[1.5vw] border-b border-neutral-300/80">
          <div className="flex items-center gap-[0.5vw]">
            <span className="extraSmallText uppercase tracking-[0.15em] text-neutral-500 font-medium">
              Direct Contact • Armin Rahmani
            </span>
          </div>
          <button
            onClick={closeContactModal}
            className="extraSmallText text-neutral-400 hover:text-black cursor-pointer transition-colors font-mono"
            title="Press Esc to close"
          >
            'esc' to close [×]
          </button>
        </div>

        {/* Main Content */}
        <div className="my-[3vw] flex-1 flex flex-col justify-center space-y-[2.5vw]">
          {/* Title & Bio */}
          <div className="contact-drawer-item">
            <h2 className="largeText font-normal leading-[0.88] tracking-tight text-[#0e0e0e]">
              let's talk.
            </h2>
            <p className="smallText text-neutral-600 mt-[1.2vw] leading-relaxed max-w-lg">
              Available for full-stack engineering, high-performance web systems, bespoke UI/UX design, and SEO architecture. Reach out directly below:
            </p>
          </div>

          {/* Contact Channels Styled Identically to Whole Website */}
          <div className="space-y-[1.2vw]">
            {/* 1. Direct Email */}
            <div className="contact-drawer-item p-[1.4vw] bg-white/70 rounded-[0.5vw] border border-neutral-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <span className="detailText font-mono uppercase text-neutral-400 block mb-0.5">
                  Direct Email
                </span>
                <a
                  href="mailto:arminrahmani318@gmail.com"
                  className="smallText font-medium text-[#0e0e0e] hover:text-yellow transition-colors font-mono"
                >
                  arminrahmani318@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="mailto:arminrahmani318@gmail.com"
                  onMouseMove={handleBtnMouseMove}
                  onMouseLeave={handleBtnMouseLeave}
                  className="main-btn extraSmallText will-change-transform"
                >
                  <span className="main-btn__icon" aria-hidden="true" />
                  <span className="main-btn__label">
                    <span className="main-btn__clip">
                      <span className="main-btn__from">Send Email</span>
                      <span className="main-btn__to" aria-hidden="true">Send Email</span>
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('arminrahmani318@gmail.com', 'email')}
                  className="px-3 py-1.5 rounded-sm border border-neutral-300 text-xs text-neutral-600 hover:text-black hover:border-black transition-all cursor-pointer bg-white"
                >
                  {copiedItem === 'email' ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>
            </div>

            {/* 2. Primary Mobile / WhatsApp */}
            <div className="contact-drawer-item p-[1.4vw] bg-white/70 rounded-[0.5vw] border border-neutral-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <span className="detailText font-mono uppercase text-neutral-400 block mb-0.5">
                  Primary Mobile / WhatsApp
                </span>
                <a
                  href="tel:09138763394"
                  className="smallText font-medium text-[#0e0e0e] hover:text-yellow transition-colors font-mono"
                >
                  09138763394
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/989138763394"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleBtnMouseMove}
                  onMouseLeave={handleBtnMouseLeave}
                  className="main-btn extraSmallText will-change-transform"
                >
                  <span className="main-btn__icon" aria-hidden="true" />
                  <span className="main-btn__label">
                    <span className="main-btn__clip">
                      <span className="main-btn__from">WhatsApp</span>
                      <span className="main-btn__to" aria-hidden="true">WhatsApp</span>
                    </span>
                  </span>
                </a>
                <a
                  href="tel:09138763394"
                  className="px-3 py-1.5 rounded-sm border border-neutral-300 text-xs text-neutral-600 hover:text-black hover:border-black transition-all cursor-pointer bg-white"
                >
                  Call
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('09138763394', 'phone1')}
                  className="px-3 py-1.5 rounded-sm border border-neutral-300 text-xs text-neutral-600 hover:text-black hover:border-black transition-all cursor-pointer bg-white"
                >
                  {copiedItem === 'phone1' ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>
            </div>

            {/* 3. Secondary Mobile */}
            <div className="contact-drawer-item p-[1.4vw] bg-white/70 rounded-[0.5vw] border border-neutral-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <span className="detailText font-mono uppercase text-neutral-400 block mb-0.5">
                  Secondary Mobile
                </span>
                <a
                  href="tel:09203275255"
                  className="smallText font-medium text-[#0e0e0e] hover:text-yellow transition-colors font-mono"
                >
                  09203275255
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="tel:09203275255"
                  className="px-3 py-1.5 rounded-sm border border-neutral-300 text-xs text-neutral-600 hover:text-black hover:border-black transition-all cursor-pointer bg-white"
                >
                  Call
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('09203275255', 'phone2')}
                  className="px-3 py-1.5 rounded-sm border border-neutral-300 text-xs text-neutral-600 hover:text-black hover:border-black transition-all cursor-pointer bg-white"
                >
                  {copiedItem === 'phone2' ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Drawer Footer */}
        <div className="contact-drawer-item pt-[1.5vw] border-t border-neutral-300/80 flex items-center justify-between">
          <span className="extraSmallText text-neutral-400 font-mono">
            Have a detailed RFP or scope?
          </span>
          <button
            type="button"
            onClick={handleOpenBrief}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
            className="text-xs font-medium text-yellow hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer will-change-transform"
          >
            <span>Open Project Brief Form</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

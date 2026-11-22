import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SohubFooterProps {
  onSelectView: (view: 'home' | 'studio' | 'work' | 'contact') => void;
  onOpenContact: () => void;
}

export const SohubFooter: React.FC<SohubFooterProps> = ({
  onSelectView,
  onOpenContact
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const elementRef = useRef<HTMLImageElement>(null);
  const goUpBtnRef = useRef<HTMLButtonElement>(null);

  // Scroll Parallax on 3D Element and Magnetic "Go Up" Button
  useGSAP(() => {
    // 1. 3D Element floating & Scroll scrub
    if (elementRef.current) {
      gsap.to(elementRef.current, {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 3.5,
        ease: 'sine.inOut'
      });

      gsap.to(elementRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1.2
        }
      });
    }

    // 2. Magnetic "Go Up" Button Physics on Desktop
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop && goUpBtnRef.current) {
      const xTo = gsap.quickTo(goUpBtnRef.current, 'x', { duration: 0.35, ease: 'power2.out' });
      const yTo = gsap.quickTo(goUpBtnRef.current, 'y', { duration: 0.35, ease: 'power2.out' });

      const onMouseMove = (e: MouseEvent) => {
        const rect = goUpBtnRef.current?.getBoundingClientRect();
        if (!rect) return;
        xTo((e.clientX - (rect.left + rect.width / 2)) * 0.3);
        yTo((e.clientY - (rect.top + rect.height / 2)) * 0.3);
      };

      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      const el = goUpBtnRef.current;
      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
    }
  }, { scope: containerRef });

  const handleGoUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={containerRef}
      dir="rtl"
      className="relative z-[30] w-full overflow-hidden bg-[#FBFBFB] flex flex-col justify-end pt-12 sm:pt-20 font-vazir"
    >
      {/* Giant Typography Brand Header */}
      <div className="w-full text-center px-4 select-none mb-6">
        <h2 className="text-6xl sm:text-9xl lg:text-[13rem] font-black tracking-tight text-[#0C1016]/90 leading-none">
          رایا
        </h2>
        <span className="text-xs sm:text-base font-mono font-bold tracking-[0.3em] uppercase text-[#7F8790] block mt-2">
          RAYA CREATIVE DIGITAL STUDIO
        </span>
      </div>

      {/* 3D Floating Element Visual */}
      <div className="w-full flex items-center justify-center -mb-16 sm:-mb-24 lg:-mb-32 relative z-[3] pointer-events-none select-none">
        <img
          ref={elementRef}
          alt="المانی از طراحی آینده‌نگرانه رایا"
          width="1340"
          height="1248"
          src="/images/sohub/footerElemCorrect.png"
          className="w-[75vw] sm:w-[50vw] lg:w-[32vw] max-w-[540px] drop-shadow-2xl will-change-transform"
        />
      </div>

      {/* Main Curved Dark Footer Container */}
      <div className="relative z-[2] w-full min-h-[460px] bg-[#0C1016] text-[#F0F6F8] rounded-t-[2.5rem] lg:rounded-t-[4rem] flex flex-col items-center justify-between p-6 sm:p-10 lg:p-16 pt-24 sm:pt-32 lg:pt-40">
        {/* Mandatory Armin Rahmani Creative Engineering Banner */}
        <div className="w-full max-w-4xl p-5 sm:p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <div>
              <span className="text-xs text-white/60 block font-mono">ARCHITECT &amp; LEAD DEVELOPER</span>
              <strong className="text-base sm:text-lg text-white font-black">
                این وبسایت توسط آرمین رحمانی طراحی و توسعه داده شده است.
              </strong>
            </div>
          </div>
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-white/10 text-white border border-white/10">
            GSAP • React 19 • Tailwind
          </span>
        </div>

        {/* Middle Navigation & Social Channels */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 my-10 py-8 border-y border-white/10">
          {/* Quick Subpage Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base font-bold text-white/80">
            <button
              type="button"
              onClick={() => onSelectView('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              صفحه اصلی
            </button>
            <button
              type="button"
              onClick={() => onSelectView('studio')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              استودیو و جوایز
            </button>
            <button
              type="button"
              onClick={() => onSelectView('work')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              پروژه‌ها
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="hover:text-white transition-colors cursor-pointer"
            >
              تماس و سفارش پروژه
            </button>
          </div>

          {/* Social Channels Pills */}
          <div className="flex items-center gap-3 select-none">
            {[
              { label: 'LinkedIn', icon: 'in', href: 'https://linkedin.com' },
              { label: 'X (Twitter)', icon: '𝕏', href: 'https://x.com' },
              { label: 'Instagram', icon: 'IG', href: 'https://instagram.com' },
              { label: 'Behance', icon: 'Bē', href: 'https://behance.net' }
            ].map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-xs font-bold text-white"
                title={soc.label}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Row: Copyright & Magnetic Go Up Button */}
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/60">
          <p>© تمامی حقوق برای استودیو خلاقیت دیجیتال رایا محفوظ است — پاییز ۱۴۰۳</p>

          <div className="flex items-center gap-4">
            <button
              ref={goUpBtnRef}
              type="button"
              onClick={handleGoUp}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm select-none"
            >
              <span>بازگشت به بالا</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

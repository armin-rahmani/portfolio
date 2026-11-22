import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SohubCtaProps {
  onOpenContact: () => void;
}

export const SohubCta: React.FC<SohubCtaProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLElement>(null);
  const chairRef = useRef<HTMLImageElement>(null);
  const chatCtaBtnRef = useRef<HTMLButtonElement>(null);
  const bookBtnRef = useRef<HTMLButtonElement>(null);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [meetingSubmitted, setMeetingSubmitted] = useState(false);
  const meetingModalRef = useRef<HTMLDivElement>(null);

  // GSAP 3D Floating Chair Parallax, Cursor Tracking & Button Magnetic Physics
  useGSAP(() => {
    // 1. Entrance Reveal
    gsap.fromTo(
      '.cta-reveal-anim',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.home-cta',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Chair Floating & Scroll Parallax
    if (chairRef.current) {
      gsap.to(chairRef.current, {
        y: -30,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: 'sine.inOut'
      });

      gsap.to(chairRef.current, {
        yPercent: -20,
        rotationZ: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // 3. Magnetic QuickTo on Desktop Buttons
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop) {
      if (chatCtaBtnRef.current) {
        const xTo = gsap.quickTo(chatCtaBtnRef.current, 'x', { duration: 0.35, ease: 'power2.out' });
        const yTo = gsap.quickTo(chatCtaBtnRef.current, 'y', { duration: 0.35, ease: 'power2.out' });

        const onMove = (e: MouseEvent) => {
          const r = chatCtaBtnRef.current?.getBoundingClientRect();
          if (!r) return;
          xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.25);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        const el = chatCtaBtnRef.current;
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
      }

      if (bookBtnRef.current) {
        const xTo = gsap.quickTo(bookBtnRef.current, 'x', { duration: 0.35, ease: 'power2.out' });
        const yTo = gsap.quickTo(bookBtnRef.current, 'y', { duration: 0.35, ease: 'power2.out' });

        const onMove = (e: MouseEvent) => {
          const r = bookBtnRef.current?.getBoundingClientRect();
          if (!r) return;
          xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.25);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        const el = bookBtnRef.current;
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
      }
    }
  }, { scope: containerRef });

  // Modal Animation with GSAP
  useGSAP(() => {
    if (!meetingModalRef.current) return;
    if (isMeetingOpen) {
      gsap.fromTo(
        meetingModalRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      );
    }
  }, { scope: containerRef, dependencies: [isMeetingOpen] });

  const handleMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMeetingSubmitted(true);
    setTimeout(() => {
      setMeetingSubmitted(false);
      setIsMeetingOpen(false);
    }, 2200);
  };

  return (
    <section
      ref={containerRef}
      dir="rtl"
      className="home-cta w-full min-h-[75vh] lg:min-h-screen relative z-[20] bg-[#FBFBFB] flex flex-col justify-center py-20 lg:py-32 px-4 sm:px-8 lg:px-12 xl:px-20 overflow-hidden font-vazir [perspective:1000px]"
    >
      {/* 3D Floating Chair Element - Positioned elegantly */}
      <div className="absolute left-[3%] sm:left-[8%] lg:left-[15%] top-1/2 -translate-y-1/2 pointer-events-none select-none z-[1]">
        <img
          ref={chairRef}
          alt="طراحی تعاملی ۳ بعدی"
          width="1340"
          height="1248"
          src="/images/sohub/careerChair.png"
          className="w-[50vw] sm:w-[35vw] lg:w-[22vw] max-w-[420px] drop-shadow-2xl will-change-transform"
        />
      </div>

      {/* Main Call to Action Statement */}
      <div className="relative z-[2] max-w-4xl text-right">
        {/* Creator Tag */}
        <div className="cta-reveal-anim inline-flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold text-[#7F8790]">
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          <span>آماده همکاری در پروژه‌های پیشرو با <strong className="text-[#0C1016]">آرمین رحمانی</strong></span>
        </div>

        <h2 className="cta-reveal-anim text-4xl sm:text-7xl lg:text-8xl xl:text-[7.5rem] font-black tracking-tight text-[#0C1016] leading-[1.08]">
          پروژه بعدی خود را{' '}
          <span className="text-neutral-500">
            آغاز کنید.
          </span>
        </h2>

        <p className="cta-reveal-anim mt-5 sm:mt-8 text-base sm:text-xl lg:text-2xl text-[#7F8790] font-medium leading-relaxed max-w-2xl">
          فرقی نمی‌کند به دنبال هویت بصری مدرن، وبسایت تعاملی ۶۰ فریم بر ثانیه یا شبیه‌سازی سه بعدی محصول هستید؛ ما اینجاییم تا ایده‌های شما را محقق کنیم.
        </p>

        {/* Action Buttons Row */}
        <div className="cta-reveal-anim flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-12 select-none">
          {/* Chat with Raya (Black Pill) */}
          <button
            ref={chatCtaBtnRef}
            type="button"
            onClick={onOpenContact}
            style={{ backgroundColor: '#0C1016' }}
            className="p-[0.35rem] will-change-transform group hover:scale-105 active:scale-95 transition-transform duration-500 rounded-full flex flex-row items-center cursor-pointer shadow-lg"
          >
            <span style={{ color: '#F0F6F8' }} className="text-xs sm:text-sm font-bold pl-5 sm:pl-8 pr-4 sm:pr-6">
              گفتگو با استودیو رایا
            </span>
            <span
              style={{ backgroundColor: '#1E242C' }}
              className="relative overflow-hidden flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full"
            >
              <span
                style={{ color: '#F0F6F8' }}
                className="block w-1/3 will-change-transform group-hover:-translate-x-[250%] transition-transform duration-500"
              >
                <svg width="100%" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 3.26215C1 2.33911 1.79594 1.59084 2.77778 1.59082C16.2041 1.59082 17 2.33909 17 3.26213V11.6485C17 12.5716 16.2041 13.3198 15.2222 13.3199L11.9989 13.3199C11.7918 13.3199 11.5912 13.3878 11.4318 13.512L8.9962 15.409L6.59291 13.5151C6.43287 13.389 6.23071 13.3199 6.02188 13.3199H2.77778C1.79594 13.3199 1 12.5716 1 11.6486L1 3.26215Z"
                    stroke="currentColor"
                    strokeWidth="1.77778"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </button>

          {/* Book a Meeting (Soft Grey Pill) */}
          <button
            ref={bookBtnRef}
            type="button"
            onClick={() => setIsMeetingOpen(true)}
            style={{ backgroundColor: '#D9E0E3' }}
            className="p-[0.35rem] will-change-transform group hover:scale-105 active:scale-95 transition-transform duration-500 rounded-full flex flex-row items-center cursor-pointer shadow-sm"
          >
            <span style={{ color: '#0C1016' }} className="text-xs sm:text-sm font-bold pl-5 sm:pl-7 pr-4 sm:pr-5">
              رزرو جلسه آنلاین
            </span>
            <span
              style={{ backgroundColor: '#F0F6F8' }}
              className="relative overflow-hidden flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full"
            >
              <span className="text-sm">📅</span>
            </span>
          </button>
        </div>
      </div>

      {/* Online Consultation Booking Modal */}
      {isMeetingOpen && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md select-none font-vazir">
          <div
            ref={meetingModalRef}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/10 text-[#0C1016] will-change-transform"
          >
            <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-[#0C1016]">
                رزرو جلسه مشاوره پروژه
              </h3>
              <button
                type="button"
                onClick={() => setIsMeetingOpen(false)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {meetingSubmitted ? (
              <div className="py-10 text-center flex flex-col items-center">
                <span className="text-4xl mb-3">✓</span>
                <h4 className="text-xl font-black mb-1">جلسه شما ثبت شد!</h4>
                <p className="text-xs sm:text-sm text-[#7F8790]">
                  تیم رایا با هدایت آرمین رحمانی طی ۲۴ ساعت آینده جهت هماهنگی تماس خواهد گرفت.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMeetingSubmit} className="flex flex-col gap-4 text-right">
                <div>
                  <label className="text-xs font-bold uppercase text-[#7F8790] block mb-1">نام و نام‌خانوادگی</label>
                  <input
                    required
                    type="text"
                    placeholder="مثال: آرش کیانی"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-black font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-[#7F8790] block mb-1">شرکت یا نام استارتاپ</label>
                  <input
                    required
                    type="text"
                    placeholder="مثال: تیم محصول"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-black font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-[#7F8790] block mb-1">شماره تماس یا ایمیل</label>
                  <input
                    required
                    type="text"
                    placeholder="0912... یا info@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-black font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full py-3 rounded-xl bg-black text-white text-sm font-bold hover:bg-neutral-800 active:scale-98 transition-all cursor-pointer"
                >
                  تأیید و ثبت زمان جلسه
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

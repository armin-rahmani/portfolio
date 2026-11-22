import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const SohubHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const bgSvgRef = useRef<HTMLDivElement>(null);
  const scrollArrowRef = useRef<HTMLSpanElement>(null);

  // GSAP Entrance, 3D Typography Flip, Mouse Parallax & Scroll Scrub
  useGSAP(() => {
    // 1. 3D Perspective Flip on Headline Words
    const words = gsap.utils.toArray<HTMLElement>('.hero-word-flip');
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      words,
      {
        yPercent: 120,
        rotateX: -45,
        opacity: 0,
        transformOrigin: '50% 100%'
      },
      {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.1,
        delay: 0.2
      }
    )
      .fromTo(
        '.hero-sub-reveal',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        '-=0.6'
      )
      .fromTo(
        imageRef.current,
        { scale: 0.82, opacity: 0, y: 50, rotateZ: 4 },
        { scale: 1, opacity: 1, y: 0, rotateZ: 0, duration: 1.3, ease: 'elastic.out(1, 0.8)' },
        '-=0.8'
      )
      .fromTo(
        '.hero-scroll-btn',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      );

    // 2. Continuous Bouncing Scroll Arrow
    if (scrollArrowRef.current) {
      gsap.to(scrollArrowRef.current, {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 0.85,
        ease: 'sine.inOut'
      });
    }

    // 3. ScrollTrigger Parallax on Giant Background SVG
    if (bgSvgRef.current) {
      gsap.to(bgSvgRef.current, {
        xPercent: 8,
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    // 4. Mouse Interactive 3D Parallax with quickTo on Desktop
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop && imageRef.current) {
      const xTo = gsap.quickTo(imageRef.current, 'x', { duration: 0.7, ease: 'power2.out' });
      const yTo = gsap.quickTo(imageRef.current, 'y', { duration: 0.7, ease: 'power2.out' });
      const rotY = gsap.quickTo(imageRef.current, 'rotationY', { duration: 0.7, ease: 'power2.out' });
      const rotX = gsap.quickTo(imageRef.current, 'rotationX', { duration: 0.7, ease: 'power2.out' });

      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
        const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

        xTo(xNorm * -40);
        yTo(yNorm * 35);
        rotY(xNorm * -12);
        rotX(-yNorm * 10);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, { scope: containerRef });

  const handleScrollDown = () => {
    const nextSection = document.querySelector('.home-projects');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      dir="rtl"
      className="home-hero w-full min-h-[92vh] lg:min-h-screen relative flex flex-col justify-between overflow-hidden pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-16 bg-[#FBFBFB] font-vazir [perspective:1200px]"
    >
      {/* 3D Floating Device Render - Positioned on the Left in RTL to never collide with text */}
      <div className="absolute left-[3%] sm:left-[8%] lg:left-[10%] bottom-[8%] sm:bottom-[12%] lg:bottom-[15%] z-[2] pointer-events-none select-none [perspective:1000px]">
        <img
          ref={imageRef}
          alt="رندر ۳ بعدی تعاملی استودیو رایا"
          width="1208"
          height="1630"
          src="/images/sohub/homeRender.png"
          className="float-anim w-[52vw] sm:w-[38vw] lg:w-[24vw] max-w-[440px] drop-shadow-2xl will-change-transform"
        />
      </div>

      {/* Luxury Background Watermark Typography (Subtle opacity to prevent overlap clutter) */}
      <div
        ref={bgSvgRef}
        className="hero-bg-svg absolute flex flex-col gap-6 bottom-4 lg:bottom-[8%] left-[-5%] pointer-events-none select-none z-[1] opacity-[0.06] will-change-transform"
      >
        <span className="w-[100vw] lg:w-[90vw] block text-black">
          <svg width="100%" viewBox="0 0 485 135" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M75.71 65.34H57.26C56.88 56.88 49.38 51.12 38.43 51.12C28.44 51.12 21.14 56.12 21.14 63.23C21.14 73.03 29.79 74.57 40.74 76.68C54.19 79.18 78.02 83.21 78.02 105.89C78.02 122.99 61.88 134.72 39.2 134.72C16.52 134.72 0.19 122.6 0 105.12H19.22C19.6 114.15 28.06 120.11 39.78 120.11C50.73 120.11 58.61 114.92 58.61 107.04C58.61 97.24 49.19 95.7 38.43 93.78C24.21 91.67 1.73 87.44 1.73 65.15C1.73 48.05 16.72 36.71 38.82 36.71C60.92 36.71 75.72 48.43 75.72 65.34H75.71Z"
              fill="currentColor"
            />
            <path
              d="M186.913 85.71C186.913 114.15 165.773 134.71 136.563 134.71C107.353 134.71 86.0234 114.15 86.0234 85.71C86.0234 57.27 107.353 36.71 136.563 36.71C165.773 36.71 186.913 57.27 186.913 85.71ZM106.203 85.71C106.203 104.35 118.883 117.61 136.373 117.61C153.863 117.61 166.733 104.35 166.733 85.71C166.733 67.07 154.053 53.81 136.373 53.81C118.693 53.81 106.203 67.26 106.203 85.71Z"
              fill="currentColor"
            />
            <path
              d="M281.78 74.94V132.97H261.99V77.62C261.99 62.44 252.77 52.45 238.55 52.45C224.33 52.45 214.53 62.44 214.53 77.62V132.97H194.93V0H214.53V52.65C220.68 42.46 231.25 36.7 244.32 36.7C266.03 36.7 281.79 52.07 281.79 74.94H281.78Z"
              fill="currentColor"
            />
            <path
              d="M376.071 93.9697C376.071 118.18 358.581 134.71 333.021 134.71C307.461 134.71 289.781 118.18 289.781 93.9697V38.4297H309.381V93.9697C309.381 108.77 318.601 118.37 332.821 118.37C347.041 118.37 356.461 108.76 356.461 93.9697V38.4297H376.061V93.9697H376.071Z"
              fill="currentColor"
            />
            <path
              d="M484.39 85.13C484.39 114.15 463.44 134.71 434.23 134.71C405.02 134.71 384.07 114.15 384.07 85.71V0H403.67V51.5C411.16 42.47 422.89 36.7 436.72 36.7C464.58 36.7 484.38 57.26 484.38 85.13H484.39ZM464.21 85.71C464.21 67.26 451.53 53.81 434.04 53.81C416.55 53.81 403.68 67.26 403.68 85.71C403.68 104.16 416.36 117.61 434.04 117.61C451.72 117.61 464.21 104.35 464.21 85.71Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>

      {/* Main Editorial Content & Clean Typography Column */}
      <div className="px-4 sm:px-8 lg:px-12 xl:px-20 z-[3] relative max-w-4xl">
        {/* Creator Pill Badge - Mandatory Armin Rahmani Attribution */}
        <div className="hero-sub-reveal inline-flex items-center gap-2 mb-4 sm:mb-6 text-xs sm:text-sm font-semibold text-[#7F8790]">
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          <span>طراحی و توسعه وبسایت توسط <strong className="text-[#0C1016]">آرمین رحمانی</strong></span>
        </div>

        {/* 3D Masked Typography Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-[5.2rem] leading-[1.12] font-black tracking-tight text-[#0C1016]">
          <div className="overflow-hidden py-1 flex flex-wrap gap-x-3.5">
            <span className="hero-word-flip inline-block will-change-transform">داستان</span>
            <span className="hero-word-flip inline-block will-change-transform">شما،</span>
          </div>
          <div className="overflow-hidden py-1 flex flex-wrap gap-x-3.5">
            <span className="hero-word-flip inline-block will-change-transform text-black/85">تاریخ</span>
            <span className="hero-word-flip inline-block will-change-transform text-black/85">ما</span>
            <span className="hero-word-flip inline-block will-change-transform text-black/85">را</span>
            <span className="hero-word-flip inline-block will-change-transform text-black/85">می‌سازد.</span>
          </div>
        </h1>

        {/* Subtitle statement */}
        <p className="hero-sub-reveal mt-5 sm:mt-7 text-base sm:text-xl lg:text-2xl text-[#7F8790] font-medium leading-relaxed max-w-2xl">
          استودیو خلاقیت دیجیتال، هویت بصری و توسعه تجربیات وب ۳ بعدی برای پیشروترین استارتاپ‌ها و برندهای معتبر ایران.
        </p>
      </div>

      {/* Bottom Scroll Indicator with Bouncing Arrow */}
      <div className="px-4 sm:px-8 lg:px-12 xl:px-20 mt-12 sm:mt-16 z-[3]">
        <button
          type="button"
          onClick={handleScrollDown}
          className="hero-scroll-btn group flex items-center gap-3 cursor-pointer select-none"
        >
          <span className="text-base sm:text-lg lg:text-xl text-[#7F8790] font-bold group-hover:text-black transition-colors">
            مشاهده پروژه‌ها
          </span>
          <span
            ref={scrollArrowRef}
            className="w-7 h-7 rounded-full border border-black/20 flex items-center justify-center text-xs text-black/80 group-hover:border-black group-hover:text-black transition-colors will-change-transform"
          >
            ↓
          </span>
        </button>
      </div>
    </section>
  );
};

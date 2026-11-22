import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { RAYA_PROJECTS, RayaProject } from '../../data/rayaData';

gsap.registerPlugin(ScrollTrigger);

export const SohubProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<RayaProject | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBackdropRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // 1. Infinite Seamless GSAP Accolades Marquee Strip
  useGSAP(() => {
    if (!marqueeRef.current) return;
    const track = marqueeRef.current;
    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: `+=${totalWidth}`,
      duration: 32,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`
      }
    });

    const onEnter = () => gsap.to(tween, { timeScale: 0.3, duration: 0.5 });
    const onLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });

    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);

    return () => {
      tween.kill();
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
    };
  }, { scope: containerRef });

  // 2. ScrollTrigger Entrance Reveals for Heading and Cards
  useGSAP(() => {
    gsap.fromTo(
      '.proj-heading-anim',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.home-projects',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(
      '.raya-project-card',
      { y: 50, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.raya-projects-grid',
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: containerRef });

  // 3. Interactive Connected Card Expansion Modal Transition (GSAP)
  useGSAP(() => {
    if (!selectedProject || !modalRef.current) return;

    const tl = gsap.timeline();

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    tl.fromTo(
      modalBackdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.45, ease: 'power2.out' }
    )
    .fromTo(
      modalContentRef.current,
      {
        yPercent: 100,
        opacity: 0,
        scale: 0.94,
        borderRadius: '48px'
      },
      {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        borderRadius: '36px',
        duration: 0.75,
        ease: 'power4.out'
      },
      '-=0.3'
    )
    .fromTo(
      '.modal-stagger-item',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out' },
      '-=0.45'
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, { scope: containerRef, dependencies: [selectedProject] });

  const handleCloseModal = () => {
    if (!modalContentRef.current || !modalBackdropRef.current) {
      setSelectedProject(null);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedProject(null);
        document.body.style.overflow = '';
      }
    });

    tl.to('.modal-stagger-item', { y: 15, opacity: 0, duration: 0.25, stagger: 0.03, ease: 'power2.in' })
      .to(
        modalContentRef.current,
        { yPercent: 100, opacity: 0, scale: 0.95, duration: 0.45, ease: 'power3.in' },
        '-=0.1'
      )
      .to(modalBackdropRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2');
  };

  // 4. Desktop Card 3D Perspective Tilt & Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotationY: x * 8,
      rotationX: -y * 8,
      scale: 1.015,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });

    const img = card.querySelector('img');
    if (img) {
      gsap.to(img, {
        x: -x * 20,
        y: -y * 20,
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out'
    });
    const img = card.querySelector('img');
    if (img) {
      gsap.to(img, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      });
    }
  };

  const awardsList = [
    '★ جشنواره وب و موبایل ایران',
    '★ تندیس دوسالانه سرو نقره‌ای',
    '★ سایت منتخب Awwwards',
    '★ همکار استراتژیک اسنپ و دیجی‌کالا',
    '★ جایزه دیزاین تعاملی خاورمیانه',
    '★ طراحی و توسعه توسط آرمین رحمانی',
    '★ منتخب برترین رابط کاربری Behance'
  ];

  return (
    <section
      ref={containerRef}
      dir="rtl"
      className="mt-14 sm:mt-20 lg:mt-28 home-projects relative z-[5] bg-[#FBFBFB] w-full flex flex-col px-4 sm:px-8 lg:px-12 xl:px-20 pb-16 lg:pb-32 overflow-hidden scroll-mt-24 sm:scroll-mt-32 font-vazir"
    >
      {/* Work Section Subheading & Editorial Statement */}
      <div className="flex flex-col gap-3 sm:gap-5 lg:gap-6 max-w-5xl">
        <div className="proj-heading-anim flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          <h2 className="text-xs sm:text-sm lg:text-base text-[#7F8790] font-bold uppercase tracking-widest">
            پروژه‌ها و نمونه‌کارها
          </h2>
        </div>
        <p className="proj-heading-anim text-[#0C1016] leading-[1.2] font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight">
          ما تیمی متعهد و پیشرو هستیم که ایده‌های جسورانه را به{' '}
          <span className="text-neutral-500">
            واقعیت‌های دیجیتال خیره‌کننده
          </span>{' '}
          تبدیل می‌کنیم.
        </p>
      </div>

      {/* Infinite GSAP Awards & Accolades Marquee Strip */}
      <div className="w-full overflow-hidden py-4 my-8 sm:my-12 border-y border-black/10 select-none">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap gap-12 sm:gap-16 cursor-grab active:cursor-grabbing will-change-transform"
        >
          {[...awardsList, ...awardsList].map((award, i) => (
            <span
              key={i}
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black/75 flex items-center gap-2"
            >
              <span>{award}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bento Grid with 6 High-Fidelity Iranian Case Studies */}
      <div className="raya-projects-grid grid grid-cols-1 lg:grid-cols-2 w-full gap-6 sm:gap-8 lg:gap-10">
        {RAYA_PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="raya-project-card group relative w-full aspect-video rounded-3xl overflow-hidden cursor-pointer select-none bg-black/5 border border-black/10 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out will-change-transform"
          >
            {/* Project Cover Image with Parallax Scale */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={project.image}
                alt={project.titleFa}
                width="1920"
                height="1080"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-colors duration-500" />
            </div>

            {/* Top Badges: Year & Category */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 flex items-center justify-between z-[2]">
              <span
                style={{ backgroundColor: project.accentColor }}
                className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-black text-black shadow-md tracking-wider"
              >
                {project.date}
              </span>
              <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
                {project.categoryFa}
              </span>
            </div>

            {/* Bottom Title, Client & Animated Interactive Indicator */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 z-[2] flex flex-col gap-1.5 text-white">
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  ←
                </span>
                <h3 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-md">
                  {project.titleFa}
                  <span className="text-sm sm:text-base font-normal text-white/70 mr-2 font-mono">
                    ({project.title})
                  </span>
                </h3>
              </div>
              <p className="text-xs sm:text-base text-white/85 font-medium line-clamp-1 max-w-md">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Connected Immersive Card Expansion Modal (Silky GSAP Spring Transition) */}
      {selectedProject && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center p-0 sm:p-6 lg:p-12 overflow-hidden select-none font-vazir"
          dir="rtl"
        >
          {/* Glass Backdrop */}
          <div
            ref={modalBackdropRef}
            onClick={handleCloseModal}
            className="absolute inset-0 bg-black/65 backdrop-blur-xl transition-opacity cursor-pointer"
          />

          {/* Connected Card Panel */}
          <div
            ref={modalContentRef}
            className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border border-black/10 text-[#0C1016] will-change-transform z-[1]"
          >
            {/* Sticky Modal Top Bar with Clean Close Button */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md py-2 -mt-2 mb-6 flex items-center justify-between border-b border-black/10 z-10">
              <div className="modal-stagger-item flex items-center gap-3">
                <span
                  style={{ backgroundColor: selectedProject.accentColor }}
                  className="w-3.5 h-3.5 rounded-full inline-block shadow-sm"
                />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7F8790]">
                  {selectedProject.client} • {selectedProject.date}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-black/5 hover:bg-black/10 active:scale-95 transition-all flex items-center justify-center text-sm font-bold cursor-pointer"
                aria-label="بستن پنجره"
              >
                ✕
              </button>
            </div>

            {/* Modal Hero Visual */}
            <div className="modal-stagger-item relative w-full aspect-video rounded-2xl overflow-hidden mb-6 sm:mb-8 bg-black/5 shadow-inner">
              <img
                src={selectedProject.image}
                alt={selectedProject.titleFa}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-3xl sm:text-5xl font-black text-white drop-shadow-md">
                    {selectedProject.titleFa}
                  </h3>
                  <p className="text-sm sm:text-lg text-white/90 font-medium mt-1">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Client Quote Highlight */}
            {selectedProject.details.clientQuote && (
              <div className="modal-stagger-item my-6 p-5 sm:p-6 rounded-2xl bg-[#F0F6F8] border border-black/5">
                <p className="text-sm sm:text-base text-[#0C1016] font-bold italic leading-relaxed">
                  {selectedProject.details.clientQuote}
                </p>
                <span className="text-xs text-[#7F8790] block mt-2 font-medium">
                  — {selectedProject.details.quoteAuthor}
                </span>
              </div>
            )}

            {/* Deep Project Details Grid */}
            <div className="modal-stagger-item grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 my-6">
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase text-[#7F8790] mb-2">
                  درباره پروژه و چالش‌ها
                </h4>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-medium">
                  {selectedProject.details.overview}
                </p>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase text-[#7F8790] mb-2">
                  دستاوردها و نتایج کلیدی
                </h4>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-medium">
                  {selectedProject.details.impact}
                </p>
              </div>
            </div>

            {/* Key Deliverables Tags */}
            <div className="modal-stagger-item mt-6 pt-6 border-t border-black/10">
              <h4 className="text-xs sm:text-sm font-bold uppercase text-[#7F8790] mb-3">
                خروجی‌های کلیدی پروژه
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.details.deliverables.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-black/5 text-[#0C1016] border border-black/5"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Mandatory Armin Rahmani Creative Engineering Credit */}
            <div className="modal-stagger-item mt-8 p-4 sm:p-5 rounded-2xl bg-[#0C1016] text-[#F0F6F8] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
              <div>
                <span className="text-xs text-white/60 block">توسعه فرانت‌اند، موشن و تعاملات تعبیه‌شده</span>
                <strong className="text-sm sm:text-base font-bold text-white">
                  طراحی و پیاده‌سازی توسط آرمین رحمانی
                </strong>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

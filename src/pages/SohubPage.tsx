import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { RayaIntro } from '../components/sohub/RayaIntro';
import { SohubNavbar } from '../components/sohub/SohubNavbar';
import { SohubHero } from '../components/sohub/SohubHero';
import { SohubProjects } from '../components/sohub/SohubProjects';
import { SohubServices } from '../components/sohub/SohubServices';
import { SohubCta } from '../components/sohub/SohubCta';
import { SohubFooter } from '../components/sohub/SohubFooter';
import { SohubStudioModal } from '../components/sohub/SohubStudioModal';
import { SohubContactModal } from '../components/sohub/SohubContactModal';

gsap.registerPlugin(ScrollTrigger);

export const SohubPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'studio' | 'work' | 'contact'>('home');
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis smooth scroll for Raya Studio
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(500, 33);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Top Global GSAP Scroll Progress Indicator
  useGSAP(() => {
    if (!progressBarRef.current) return;

    gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2
      }
    });
  }, { scope: containerRef });

  const handleSelectView = (view: 'home' | 'studio' | 'work' | 'contact') => {
    setActiveView(view);
    if (view === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'studio') {
      setIsStudioOpen(true);
    } else if (view === 'work') {
      const workEl = document.querySelector('.home-projects');
      if (workEl) workEl.scrollIntoView({ behavior: 'smooth' });
    } else if (view === 'contact') {
      setIsContactOpen(true);
    }
  };

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="bg-[#FBFBFB] text-[#0C1016] min-h-screen selection:text-white selection:bg-black font-vazir relative overflow-x-hidden"
    >
      {/* 0. Simple Dark & White Intro with GSAP Animation */}
      <RayaIntro />

      {/* Top GSAP Scroll Progress Track */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-black/5 z-[999] pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-black origin-right will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Raya Studio Header Navigation */}
      <SohubNavbar
        activeView={activeView}
        onSelectView={handleSelectView}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Hierarchy */}
      <main id="main-content" className="w-full">
        {/* 1. Hero Section with 3D device render & masked Persian typography */}
        <SohubHero />

        {/* 2. Selected Works Bento Grid with 6 Iranian Case Studies & Connected GSAP Expansion */}
        <SohubProjects />

        {/* 3. Services Stacked Cards Section with ScrollTrigger Pinning */}
        <SohubServices />

        {/* 4. Call to Action ("Don't be shy") with 3D chair render & booking */}
        <SohubCta onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* 5. Giant Brand Footer with kinetic typography & social channels */}
      <SohubFooter
        onSelectView={handleSelectView}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Studio Philosophy & Awards Modal */}
      <SohubStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Contact & Inquiries Modal */}
      <SohubContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default SohubPage;

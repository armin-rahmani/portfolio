import React, { useRef, useState, useEffect, useId } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useShowcaseModal } from '../context/ShowcaseModalContext';
import { PROJECTS, Project } from '../data/sidejobData';

export const ShowcaseModal: React.FC = () => {
  const { isOpen, activeProject, closeShowcase, openShowcase } = useShowcaseModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeShowcase();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeShowcase]);

  // GSAP Entrance & Exit timeline
  useGSAP(() => {
    if (!overlayRef.current || !modalContentRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out',
        visibility: 'visible'
      });
      gsap.fromTo(
        modalContentRef.current,
        { y: 35, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.08 }
      );
    } else {
      gsap.to(modalContentRef.current, {
        y: 20,
        scale: 0.98,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.visibility = 'hidden';
        }
      });
    }
  }, { dependencies: [isOpen] });

  const current = activeProject || PROJECTS[0];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 backdrop-blur-2xl opacity-0 pointer-events-none select-none transition-all p-2 sm:p-6"
      style={{ visibility: 'hidden' }}
      role="dialog"
      aria-modal="true"
      aria-label="GSAP Showcase Live Interactive Demo"
    >
      <div
        ref={modalContentRef}
        className="w-full max-w-6xl h-[92vh] max-h-[880px] bg-[#121214] border border-white/15 rounded-[1.2vw] sm:rounded-[0.8vw] shadow-2xl flex flex-col overflow-hidden text-primary"
      >
        {/* Top Apple-Standard Header & Showcase Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="smallText font-semibold tracking-tight text-white">
              GSAP Showcase
            </span>
            <span className="text-white/20">|</span>
            <span className="extraSmallText text-white/70 font-normal">
              {current.title}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10px] text-white/80 font-medium hidden sm:inline-block">
              {current.showcaseBadge || 'Live Demo'}
            </span>
          </div>

          {/* Quick Tabs to Switch Between All 4 Showcases */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {PROJECTS.map((proj) => {
              const isSelected = proj.id === current.id;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => openShowcase(proj)}
                  className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-white text-black font-medium shadow-sm'
                      : 'bg-white/5 hover:bg-white/15 text-white/60 hover:text-white'
                  }`}
                >
                  {proj.title}
                </button>
              );
            })}
          </div>

          {/* Close Capsule Button */}
          <button
            type="button"
            onClick={closeShowcase}
            className="px-4 py-1.5 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white extraSmallText font-medium transition-all cursor-pointer flex items-center gap-1.5"
            aria-label="Close Showcase Demo"
          >
            <span>Close</span>
            <span className="text-sm leading-none">×</span>
          </button>
        </div>

        {/* Interactive Experience Viewport */}
        <div className="flex-1 w-full relative overflow-hidden bg-black/60 flex flex-col">
          {current.id === 'sohub' && <SohubShowcaseExperience />}
          {current.id === 'spatial' && <SpatialVisionExperience />}
          {current.id === 'kinetic' && <KineticTypographyExperience />}
          {current.id === 'telemetry' && <HyperionTelemetryExperience />}
          {current.id === 'waveform' && <PrismWaveformExperience />}
        </div>

        {/* Bottom Metadata Bar */}
        <div className="px-5 py-3 border-t border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-3 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
            <span className="font-medium text-white/80">{current.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Powered exclusively by GreenSock Animation Platform (GSAP 3)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   0. SHOWCASE: Raya Studio Live Experience (Designed & Developed by Armin Rahmani)
   ========================================================================= */
const SohubShowcaseExperience: React.FC = () => {
  return (
    <div className="relative flex-1 w-full h-full flex flex-col bg-[#FBFBFB] text-[#0C1016] overflow-hidden font-vazir" dir="rtl">
      {/* Top Experience Control Bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#E8EEF1] border-b border-black/10 z-10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-xs sm:text-sm text-black">
            استودیو خلاقیت دیجیتال رایا
          </span>
          <span className="text-[11px] text-black/60 hidden md:inline">
            • طراحی و پیاده‌سازی کامل توسط آرمین رحمانی
          </span>
        </div>
        <a
          href="/sohub"
          className="px-4 py-1.5 rounded-full bg-black hover:bg-black/85 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <span>مشاهده وبسایت تمام‌صفحه</span>
          <span className="text-[10px]">↗</span>
        </a>
      </div>

      {/* Embedded Live Interactive Experience */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-[#FBFBFB]">
        <iframe
          src="/sohub"
          title="Raya Studio Live Website"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
};

/* =========================================================================
   1. SHOWCASE: Spatial VisionOS Experience (Apple Spatial Computing Depth)
   ========================================================================= */
const SpatialVisionExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [depthMultiplier, setDepthMultiplier] = useState(1);
  const depthSliderId = useId();

  // Multi-axis mouse parallax with quickTo
  useGSAP(() => {
    if (!stageRef.current) return;

    const quickRotateX = gsap.quickTo(stageRef.current, 'rotateX', { duration: 0.35, ease: 'power2.out' });
    const quickRotateY = gsap.quickTo(stageRef.current, 'rotateY', { duration: 0.35, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      quickRotateY(x * 14);
      quickRotateX(-y * 14);

      if (glareRef.current) {
        gsap.to(glareRef.current, {
          x: x * 80,
          y: y * 80,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    const handleMouseLeave = () => {
      quickRotateX(0);
      quickRotateY(0);
    };

    const cont = containerRef.current;
    cont?.addEventListener('mousemove', handleMouseMove);
    cont?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cont?.removeEventListener('mousemove', handleMouseMove);
      cont?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: containerRef });

  // Dynamic Z-depth layer separation animation
  useGSAP(() => {
    gsap.to('.spatial-layer-back', {
      z: -40 * depthMultiplier,
      duration: 0.4,
      ease: 'power2.out'
    });
    gsap.to('.spatial-layer-mid', {
      z: 35 * depthMultiplier,
      duration: 0.4,
      ease: 'power2.out'
    });
    gsap.to('.spatial-layer-front', {
      z: 95 * depthMultiplier,
      duration: 0.4,
      ease: 'power2.out'
    });
  }, { scope: stageRef, dependencies: [depthMultiplier] });

  return (
    <div
      ref={containerRef}
      className="relative flex-1 w-full h-full flex flex-col items-center justify-center p-6 [perspective:1400px] overflow-hidden bg-gradient-to-b from-[#141418] to-[#0a0a0c]"
    >
      {/* Interactive Controls Overlay */}
      <div className="absolute top-4 left-6 z-30 flex items-center gap-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        <label htmlFor={depthSliderId} className="text-xs text-white/70 font-medium">
          Spatial 3D Depth:
        </label>
        <input
          id={depthSliderId}
          type="range"
          min="0.2"
          max="2.0"
          step="0.1"
          value={depthMultiplier}
          onChange={(e) => setDepthMultiplier(parseFloat(e.target.value))}
          className="w-28 accent-white cursor-pointer"
        />
        <span className="text-xs font-mono text-white/90">
          {Math.round(depthMultiplier * 100)}%
        </span>
      </div>

      {/* 3D Spatial Stage */}
      <div
        ref={stageRef}
        className="relative w-full max-w-2xl h-[380px] [transform-style:preserve-3d] flex items-center justify-center transition-transform"
      >
        {/* Layer 1: Background Spatial Canvas */}
        <div className="spatial-layer-back absolute inset-0 rounded-2xl bg-neutral-900/80 border border-white/10 p-6 flex flex-col justify-between [transform-style:preserve-3d] shadow-2xl">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="font-semibold text-white">Spatial Vision OS</span>
            <span>Spatial Engine • 120Hz</span>
          </div>
          <div className="text-center text-white/30 text-xs">
            Move cursor to explore continuous 3D eye-tracking perspective
          </div>
          <div className="flex items-center justify-between text-xs text-white/40">
            <span>Z-Separation: Active</span>
            <span>GSAP Perspective: 1400px</span>
          </div>
        </div>

        {/* Layer 2: Mid-plane Content Window */}
        <div className="spatial-layer-mid absolute w-[86%] h-[78%] rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/20 p-5 flex flex-col justify-between [transform-style:preserve-3d] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-xs font-bold text-white">
              OS
            </div>
            <div>
              <h4 className="smallText font-semibold text-white">Multi-Layer Window Architecture</h4>
              <p className="extraSmallText text-white/60">Rendered with GSAP 3D matrix transformations</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 my-2">
            <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-center">
              <span className="text-[11px] text-white/50 block">Latency</span>
              <span className="text-sm font-bold text-white">4.2ms</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-center">
              <span className="text-[11px] text-white/50 block">Spatial Frame</span>
              <span className="text-sm font-bold text-white">120 FPS</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-center">
              <span className="text-[11px] text-white/50 block">Drift Correction</span>
              <span className="text-sm font-bold text-white">0.01°</span>
            </div>
          </div>

          <div className="text-[11px] text-white/60 leading-relaxed">
            Floating spatial depth created with true hardware-accelerated transforms and specular micro-glare.
          </div>
        </div>

        {/* Layer 3: Foreground Floating HUD Controls */}
        <div className="spatial-layer-front absolute -bottom-6 w-[70%] h-14 rounded-full bg-white/[0.12] backdrop-blur-2xl border border-white/30 px-6 flex items-center justify-between [transform-style:preserve-3d] shadow-[0_25px_50px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-medium text-white">Spatial Control HUD</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDepthMultiplier((prev) => (prev >= 1.8 ? 0.4 : prev + 0.4))}
              className="px-3 py-1 rounded-full bg-white text-black text-xs font-medium cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              Step Depth ↗
            </button>
          </div>
        </div>

        {/* Moving Glare Refraction Sheen */}
        <div
          ref={glareRef}
          className="absolute w-60 h-60 rounded-full bg-white/10 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

/* =========================================================================
   2. SHOWCASE: Kromatik Kinetic Typography (SplitText & Magnetic Motion)
   ========================================================================= */
const KineticTypographyExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [customText, setCustomText] = useState('CREATIVE DEVELOPER');
  const [activeSpeed, setActiveSpeed] = useState(1);

  // Trigger character-level kinetic split entrance
  const animateText = () => {
    if (!textRef.current) return;
    const chars = textRef.current.querySelectorAll('.kinetic-char');

    gsap.fromTo(
      chars,
      {
        yPercent: 120,
        rotateX: -90,
        opacity: 0,
        scale: 0.7
      },
      {
        yPercent: 0,
        rotateX: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        stagger: 0.035,
        ease: 'back.out(2.2)',
        overwrite: 'auto'
      }
    );
  };

  useGSAP(() => {
    animateText();
  }, { scope: containerRef, dependencies: [customText] });

  // Infinite Marquee animation with GSAP
  useGSAP(() => {
    const marquee = gsap.to('.marquee-track', {
      xPercent: -50,
      ease: 'none',
      duration: 16 / activeSpeed,
      repeat: -1
    });

    return () => {
      marquee.kill();
    };
  }, { scope: containerRef, dependencies: [activeSpeed] });

  const letters = customText.split('');

  return (
    <div
      ref={containerRef}
      className="relative flex-1 w-full h-full flex flex-col justify-between p-6 overflow-hidden bg-[#0d0d10]"
    >
      {/* Top Controls: Interactive Typing & Speed Modulation */}
      <div className="flex flex-wrap items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={customText}
            maxLength={26}
            onChange={(e) => setCustomText(e.target.value.toUpperCase())}
            placeholder="Type any word..."
            className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium focus:outline-none focus:border-white/50 w-56 tracking-wider"
          />
          <button
            type="button"
            onClick={animateText}
            className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            Replay Reveal
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50">Marquee Velocity:</span>
          {[0.5, 1, 2].map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={() => setActiveSpeed(spd)}
              className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                activeSpeed === spd ? 'bg-white text-black font-semibold' : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Main Kinetic Headline Reveal Stage */}
      <div className="flex-1 flex flex-col items-center justify-center my-6 text-center select-none" style={{ perspective: '1200px' }}>
        <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3 font-medium">
          Awwwards-Winning Kinetic Character Stagger
        </span>

        <h1
          ref={textRef}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white flex flex-wrap justify-center overflow-hidden [transform-style:preserve-3d]"
        >
          {letters.map((ch, idx) => (
            <span
              key={`${ch}-${idx}`}
              className="kinetic-char inline-block will-change-transform px-[0.05em]"
              style={{ transformOrigin: '50% 100%' }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>

        <p className="extraSmallText text-white/50 max-w-lg mt-5 leading-relaxed">
          Crafted with GSAP 3D perspective rotationX, letter stagger, and mathematical elastic easing for punchy, tactile headline typography.
        </p>
      </div>

      {/* Bottom Continuous Velocity Marquee */}
      <div className="w-full overflow-hidden border-t border-white/10 pt-4">
        <div className="marquee-track flex whitespace-nowrap will-change-transform text-white/40 text-sm font-semibold tracking-widest uppercase">
          <span className="mx-6">★ GSAP MOTION DESIGN</span>
          <span className="mx-6">★ 60FPS TYPOGRAPHY</span>
          <span className="mx-6">★ AWWWARDS STANDARD</span>
          <span className="mx-6">★ KINETIC STAGGER</span>
          <span className="mx-6">★ GSAP MOTION DESIGN</span>
          <span className="mx-6">★ 60FPS TYPOGRAPHY</span>
          <span className="mx-6">★ AWWWARDS STANDARD</span>
          <span className="mx-6">★ KINETIC STAGGER</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. SHOWCASE: Hyperion Neural Telemetry (Active Theory 60fps Canvas Mesh)
   ========================================================================= */
const HyperionTelemetryExperience: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [burstCount, setBurstCount] = useState(0);
  const [throughput, setThroughput] = useState(2450120);
  const [latency, setLatency] = useState(42);

  // Live real-time Canvas Constellation Network running on GSAP ticker
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    // Particle nodes
    const NODE_COUNT = 55;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 2 + 1.5
    }));

    let mouse = { x: -1000, y: -1000 };
    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handlePointerMove);

    // Render loop driven by GSAP ticker
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Bounce on boundaries
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.25 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * (1 - mdist / 140)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  // Trigger Neural Shockwave with GSAP
  const handleTriggerBurst = () => {
    setBurstCount((c) => c + 1);

    // Tween simulated telemetry numbers
    gsap.to({ tp: throughput, lat: latency }, {
      tp: 3890450 + Math.floor(Math.random() * 500000),
      lat: 18 + Math.floor(Math.random() * 8),
      duration: 1.2,
      ease: 'power3.out',
      onUpdate: function () {
        const target = this.targets()[0];
        setThroughput(Math.floor(target.tp));
        setLatency(Math.floor(target.lat));
      }
    });

    // Shockwave pulse animation
    gsap.fromTo(
      '.telemetry-pulse-ring',
      { scale: 0.2, opacity: 1 },
      { scale: 3.5, opacity: 0, duration: 1.0, ease: 'power2.out' }
    );
  };

  return (
    <div className="relative flex-1 w-full h-full flex flex-col justify-between p-6 overflow-hidden bg-[#090a0f]">
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair z-0" />

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
            <span className="text-[10px] uppercase tracking-wider text-white/50 block">Throughput</span>
            <span className="text-base sm:text-lg font-bold text-white font-mono">
              {throughput.toLocaleString()} req/s
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
            <span className="text-[10px] uppercase tracking-wider text-white/50 block">P99 Latency</span>
            <span className="text-base sm:text-lg font-bold text-white font-mono">
              {latency} ms
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 hidden sm:block">
            <span className="text-[10px] uppercase tracking-wider text-white/50 block">Cluster SLA</span>
            <span className="text-base sm:text-lg font-bold text-white font-mono">
              99.999%
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleTriggerBurst}
          className="relative px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-lg overflow-hidden"
        >
          <span>Trigger Neural Burst ({burstCount})</span>
        </button>
      </div>

      {/* Shockwave expanding ring */}
      <div className="telemetry-pulse-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-white pointer-events-none opacity-0" />

      {/* Center Guidance Hint */}
      <div className="relative z-10 text-center pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">
          Move cursor across canvas to synthesize neural proximity vectors
        </span>
      </div>

      {/* Bottom Stats Footer */}
      <div className="relative z-10 flex items-center justify-between text-xs text-white/50 border-t border-white/10 pt-3">
        <span>Active Theory Constellation Standard</span>
        <span>HTML5 Canvas 2D • GSAP Ticker Loop</span>
      </div>
    </div>
  );
};

/* =========================================================================
   4. SHOWCASE: Prism Generative Audio Waveform Lab (Lusion / Spotify Design)
   ========================================================================= */
const PrismWaveformExperience: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frequency, setFrequency] = useState(0.015);
  const [amplitude, setAmplitude] = useState(55);
  const [harmonicIndex, setHarmonicIndex] = useState(2);
  const freqSliderId = useId();
  const ampSliderId = useId();

  // Multi-harmonic sinusoidal wave synthesis on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    let phase = 0;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      phase += 0.04;
      const centerY = height / 2;

      // Draw primary wave
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#ffffff';

      for (let x = 0; x < width; x += 3) {
        const y =
          centerY +
          Math.sin(x * frequency + phase) * amplitude +
          Math.sin(x * (frequency * harmonicIndex) + phase * 1.5) * (amplitude * 0.35);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw secondary harmonized echo wave
      ctx.beginPath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';

      for (let x = 0; x < width; x += 4) {
        const y =
          centerY +
          Math.cos(x * (frequency * 1.2) - phase * 0.8) * (amplitude * 0.7) +
          Math.sin(x * frequency * 0.5 + phase) * 20;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
    };
  }, [frequency, amplitude, harmonicIndex]);

  // Simulate audio beat drop with GSAP
  const handleBeatDrop = () => {
    gsap.to({ amp: amplitude }, {
      amp: 130,
      duration: 0.15,
      ease: 'power3.out',
      onUpdate: function () {
        setAmplitude(this.targets()[0].amp);
      },
      onComplete: () => {
        gsap.to({ amp: 130 }, {
          amp: 55,
          duration: 0.8,
          ease: 'elastic.out(1.2, 0.3)',
          onUpdate: function () {
            setAmplitude(this.targets()[0].amp);
          }
        });
      }
    });
  };

  return (
    <div className="relative flex-1 w-full h-full flex flex-col justify-between p-6 overflow-hidden bg-[#0c0d12]">
      {/* Background Waveform Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Top Synthesizer Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <label htmlFor={freqSliderId}>Frequency:</label>
            <input
              id={freqSliderId}
              type="range"
              min="0.005"
              max="0.04"
              step="0.002"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="w-24 accent-white cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-white/70">
            <label htmlFor={ampSliderId}>Amplitude:</label>
            <input
              id={ampSliderId}
              type="range"
              min="20"
              max="110"
              step="5"
              value={amplitude}
              onChange={(e) => setAmplitude(parseFloat(e.target.value))}
              className="w-24 accent-white cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-white/70">
            <span>Harmonics:</span>
            {[1, 2, 3].map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHarmonicIndex(h)}
                className={`px-2.5 py-0.5 rounded text-xs transition-all cursor-pointer ${
                  harmonicIndex === h ? 'bg-white text-black font-semibold' : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {h}x
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleBeatDrop}
          className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-md"
        >
          Trigger Beat Pulse ♫
        </button>
      </div>

      {/* Center Oscilloscope Badge */}
      <div className="relative z-10 text-center pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-[0.28em] text-white/35">
          Mathematical Generative Waveform Synthesis • GSAP Mathematical Interpolation
        </span>
      </div>

      {/* Bottom Technical Spec */}
      <div className="relative z-10 flex items-center justify-between text-xs text-white/50 border-t border-white/10 pt-3">
        <span>Lusion &amp; Spotify Design Sound Engine Standard</span>
        <span>Sinusoidal Wave Matrix • Continuous 60fps Ticker</span>
      </div>
    </div>
  );
};

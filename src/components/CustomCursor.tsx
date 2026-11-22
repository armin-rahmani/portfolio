import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // QuickTo helpers for 60fps locked interpolation
  const posRef = useRef<{
    dotX?: (val: number) => void;
    dotY?: (val: number) => void;
    ringX?: (val: number) => void;
    ringY?: (val: number) => void;
  }>({});

  useGSAP(() => {
    // Only run on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    if (dotRef.current) {
      posRef.current.dotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power2.out' });
      posRef.current.dotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power2.out' });
    }

    if (ringRef.current) {
      posRef.current.ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.28, ease: 'power3.out' });
      posRef.current.ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.28, ease: 'power3.out' });
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      const { clientX, clientY } = e;
      posRef.current.dotX?.(clientX);
      posRef.current.dotY?.(clientY);
      posRef.current.ringX?.(clientX);
      posRef.current.ringY?.(clientY);
    };

    const onMouseDown = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, { scale: 0.8, duration: 0.15, ease: 'power2.out' });
      }
    };

    const onMouseUp = () => {
      if (ringRef.current) {
        gsap.to(ringRef.current, { scale: isHovered ? 1.5 : 1, duration: 0.2, ease: 'power2.out' });
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // Detect hover targets dynamically
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, textarea, [data-cursor], .interactive-target');
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute('data-cursor-text') || '';
        setCursorText(text);

        if (ringRef.current) {
          gsap.to(ringRef.current, {
            scale: text ? 2.4 : 1.6,
            borderColor: 'rgba(15, 15, 15, 0.45)',
            backgroundColor: text ? 'rgba(15, 15, 15, 0.95)' : 'rgba(15, 15, 15, 0.04)',
            duration: 0.25,
            ease: 'power2.out'
          });
        }
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            opacity: text ? 0 : 0.4,
            scale: 0.5,
            duration: 0.2
          });
        }
      } else {
        setIsHovered(false);
        setCursorText('');
        if (ringRef.current) {
          gsap.to(ringRef.current, {
            scale: 1,
            borderColor: 'rgba(15, 15, 15, 0.25)',
            backgroundColor: 'transparent',
            duration: 0.25,
            ease: 'power2.out'
          });
        }
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.2
          });
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Center pinpoint dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#0e0e0e] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hidden md:block"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Trailing outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#0e0e0e]/30 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 flex items-center justify-center hidden md:flex"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {cursorText && (
          <span className="text-[8px] font-mono tracking-widest text-white uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};

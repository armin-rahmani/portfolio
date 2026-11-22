import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePageTransition } from '../context/TransitionContext';
import { useContactModal } from '../context/ContactModalContext';

gsap.registerPlugin(ScrollTrigger);

export const CtaBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const pagerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const { navigateTo } = usePageTransition();
  const { openContactModal } = useContactModal();

  useGSAP(() => {
    // Parallax on background image
    if (bgRef.current) {
      gsap.fromTo(
        bgRef.current,
        { yPercent: 0 },
        {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }

    // Floating drift on cutout retro camera
    if (cameraRef.current) {
      gsap.to(cameraRef.current, {
        y: -18,
        rotation: -14,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.fromTo(
        cameraRef.current,
        { x: -30 },
        {
          x: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        }
      );
    }

    // Floating drift on cutout red pager gadget
    if (pagerRef.current) {
      gsap.to(pagerRef.current, {
        y: 22,
        rotation: -21,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      gsap.fromTo(
        pagerRef.current,
        { x: 30 },
        {
          x: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        }
      );
    }

    // Headline entrance
    gsap.from('.cta-headline', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%'
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <div
      id="cta"
      ref={containerRef}
      data-nav-color="primary"
      className="w-full h-fit bg-secondary flex justify-center items-center sm:pointer-events-auto pointer-events-none relative z-10"
    >
      <div className="w-full bg-secondary h-[120svh] overflow-hidden relative z-10 flex flex-col justify-center items-center">
        {/* Full-bleed background texture */}
        <img
          ref={bgRef}
          src="/images/ctabackground.webp"
          alt=""
          className="w-screen max-w-none h-[120svh] object-cover object-top opacity-90 sm:opacity-95 absolute top-0 left-1/2 -translate-x-1/2 will-change-transform"
          loading="eager"
          draggable={false}
        />

        {/* Content Box with clean transparent cutout floating items */}
        <div className="z-10 flex flex-col justify-center items-center gap-[5vw] relative">
          {/* Floating Left Camera (clean cutout, transparent background) */}
          <div
            ref={cameraRef}
            className="sm:w-[17vw] h-[20vw] absolute top-[-5vw] sm:top-[-5vw] left-[-15vw] sm:left-[-12vw] -z-10 rotate-[-10deg] will-change-transform pointer-events-none"
            style={{
              filter: 'drop-shadow(0 2vw 2.5vw rgba(0, 0, 0, 0.45))'
            }}
          >
            <img
              src="/images/retro_camera.webp"
              alt="Floating cutout camera"
              className="w-full h-full object-contain"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* Floating Right Pager (user's red gadget cutout, transparent background) */}
          <div
            ref={pagerRef}
            className="sm:w-[20vw] h-[20vw] absolute top-[19vw] sm:top-[10vw] right-[-15vw] -z-10 rotate-[-25deg] will-change-transform pointer-events-none"
            style={{
              filter: 'drop-shadow(0 2vw 3vw rgba(0, 0, 0, 0.5)) drop-shadow(0 0 1.5vw rgba(255, 51, 68, 0.35))'
            }}
          >
            <img
              src="/images/pager.webp"
              alt="Floating red gadget cutout"
              className="w-full h-full object-contain scale-x-[-1]"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* Main Title */}
          <div className="cta-headline w-[70vw] sm:w-[45vw] text-center text-primary">
            <span className="extraLargeText">
              want to build something extraordinary?
            </span>
          </div>

          {/* Action Button */}
          <div
            className="drop-shadow rounded-[1vw] sm:rounded-[0.25vw] scale-150 pt-[3vw] sm:pt-0"
            style={{
              boxShadow: '0 0 1.2vw 0.6vw rgba(255, 51, 68, 0.3)'
            }}
          >
            <button
              type="button"
              onClick={openContactModal}
              className="main-btn smallText pointer-events-auto cursor-pointer"
              aria-label="Talk to me"
            >
              <span className="main-btn__icon" aria-hidden="true" />
              <span className="main-btn__label">
                <span className="main-btn__clip">
                  <span className="main-btn__from">Talk to me</span>
                  <span className="main-btn__to" aria-hidden="true">
                    Talk to me
                  </span>
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

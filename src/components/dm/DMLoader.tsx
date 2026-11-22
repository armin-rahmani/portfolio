import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface DMLoaderProps {
  onComplete: () => void;
  onRevealStart?: () => void;
}

export const DMLoader: React.FC<DMLoaderProps> = ({ onComplete, onRevealStart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const robinCursorRef = useRef<HTMLDivElement>(null);
  const nickCursorRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [isSkipped, setIsSkipped] = useState(false);

  useGSAP(() => {
    if (isSkipped) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Initial positioning
    gsap.set([robinCursorRef.current, nickCursorRef.current], { opacity: 0 });
    gsap.set(logoRef.current, { scale: 0.95, opacity: 0 });

    // 1. Cursors appear and move
    tl.to([robinCursorRef.current, nickCursorRef.current], {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    });

    tl.fromTo(
      robinCursorRef.current,
      { x: -120, y: -60 },
      { x: 30, y: -20, duration: 1.2, ease: 'power2.inOut' },
      0.1
    );

    tl.fromTo(
      nickCursorRef.current,
      { x: 120, y: 70 },
      { x: -25, y: 35, duration: 1.2, ease: 'power2.inOut' },
      0.15
    );

    // 2. Logo reveal
    tl.to(
      logoRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
      },
      0.3
    );

    // 3. Status text sequence
    if (statusRef.current) {
      tl.call(() => {
        if (statusRef.current) statusRef.current.textContent = 'Robin is designing...';
      }, [], 0.2);

      tl.call(() => {
        if (statusRef.current) statusRef.current.textContent = 'Nick is crafting GSAP code...';
      }, [], 0.9);

      tl.call(() => {
        if (statusRef.current) statusRef.current.textContent = 'Almost ready...';
      }, [], 1.5);
    }

    // 4. Percentage counter 0 -> 100
    const counterObj = { val: 0 };
    tl.to(
      counterObj,
      {
        val: 100,
        duration: 1.6,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counterObj.val).toString().padStart(2, '0');
          }
        }
      },
      0.2
    );

    // 5. Cursors fly off
    tl.to(
      robinCursorRef.current,
      { x: 350, y: -180, opacity: 0, duration: 0.6, ease: 'power3.in' },
      1.7
    );
    tl.to(
      nickCursorRef.current,
      { x: -350, y: 200, opacity: 0, duration: 0.6, ease: 'power3.in' },
      1.75
    );

    // 6. Signal reveal start right before sweep
    tl.call(() => {
      onRevealStart?.();
    }, [], 1.9);

    // 7. Curtain upward sweep
    tl.to(
      curtainRef.current,
      {
        yPercent: -100,
        duration: 0.85,
        ease: 'power3.inOut'
      },
      2.0
    );

    tl.to(
      containerRef.current,
      {
        autoAlpha: 0,
        display: 'none',
        duration: 0.1
      },
      2.85
    );
  }, { scope: containerRef, dependencies: [isSkipped] });

  const handleSkip = () => {
    setIsSkipped(true);
    onRevealStart?.();
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          onComplete();
        }
      });
    } else {
      onComplete();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A] text-white select-none overflow-hidden cursor-pointer"
      onClick={handleSkip}
    >
      {/* Background Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Animated Curtain */}
      <div
        ref={curtainRef}
        className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6"
      >
        {/* Animated Drawing Stage */}
        <div className="relative flex items-center justify-center w-full max-w-md py-12">
          {/* Robin Vector Cursor (Gold) */}
          <div
            ref={robinCursorRef}
            className="absolute z-20 flex items-center gap-2 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '42%', top: '35%' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
                fill="#F8CB47"
                stroke="#0A0A0A"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="px-2 py-0.5 text-[11px] font-semibold text-black bg-[#F8CB47] rounded-full shadow-md tracking-wider">
              Robin
            </span>
          </div>

          {/* Nick Vector Cursor (Blue) */}
          <div
            ref={nickCursorRef}
            className="absolute z-20 flex items-center gap-2 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '58%', top: '65%' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
                fill="#5363F6"
                stroke="#0A0A0A"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="px-2 py-0.5 text-[11px] font-semibold text-white bg-[#5363F6] rounded-full shadow-md tracking-wider">
              Nick
            </span>
          </div>

          {/* Digitalmakers SVG Logo */}
          <svg
            ref={logoRef}
            width="180"
            height="85"
            viewBox="0 0 112 52"
            fill="none"
            className="w-44 md:w-56 h-auto drop-shadow-[0_10px_25px_rgba(83,99,246,0.15)]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.86084 6.43233C4.41485 7.00473 0 11.9079 0 17.3839C0 22.8599 4.41484 26.835 9.86084 26.2627L52.1392 21.819C57.5852 21.2466 62 16.3434 62 10.8674C62 5.39145 57.5852 1.41631 52.1392 1.9887L9.86084 6.43233ZM12.6936 11.953C11.9898 11.6433 11.1672 11.5379 10.226 11.6369L6.67715 12.0098V21.0267L10.226 20.6537C11.1588 20.5557 11.9771 20.2778 12.6809 19.8201C13.3932 19.353 13.9402 18.7584 14.3217 18.0362C14.7118 17.313 14.9069 16.5166 14.9069 15.6469C14.9069 14.7687 14.7161 14.0085 14.3345 13.3665C13.9529 12.7245 13.4059 12.2533 12.6936 11.953ZM11.7523 17.6795C11.3368 18.1239 10.7644 18.3845 10.0352 18.4611L9.17023 18.552V13.9221L10.0352 13.8312C10.7644 13.7545 11.3368 13.899 11.7523 14.2646C12.1679 14.6217 12.3756 15.1711 12.3756 15.9129C12.3756 16.6462 12.1679 17.2351 11.7523 17.6795ZM18.5237 19.7816V10.7647L16.0307 11.0268V20.0436L18.5237 19.7816ZM25.0696 12.494C25.324 12.5952 25.5232 12.7575 25.6674 12.9811L28.3513 12.6991C28.1732 11.7713 27.7153 11.0734 26.9775 10.6052C26.2398 10.1371 25.307 9.96224 24.1792 10.0808C23.2803 10.1753 22.4875 10.4547 21.8006 10.9191C21.1137 11.375 20.5795 11.9726 20.1979 12.7119C19.8248 13.4417 19.6382 14.2501 19.6382 15.1368C19.6382 16.0321 19.8248 16.8097 20.1979 17.4697C20.5795 18.1202 21.1137 18.6055 21.8006 18.9256C22.4959 19.2362 23.293 19.3442 24.1919 19.2498C24.9297 19.1722 25.5868 18.971 26.1635 18.6461C26.7401 18.3126 27.215 17.9174 27.5881 17.4604C27.9697 17.0024 28.258 16.5245 28.453 16.0265V13.5964L23.7976 14.0857V15.8891L26.3034 15.6257C25.9303 16.4579 25.307 16.9199 24.4336 17.0117C23.6958 17.0893 23.1319 16.9482 22.7418 16.5884C22.3603 16.2192 22.1695 15.6467 22.1695 14.8708C22.1695 14.1801 22.3475 13.6114 22.7037 13.1647C23.0683 12.7171 23.5644 12.4604 24.1919 12.3944C24.5311 12.3588 24.8237 12.392 25.0696 12.494ZM32.0634 18.3585V9.34165L29.5703 9.60368V18.6205L32.0634 18.3585ZM40.2373 10.4778V8.48253L32.987 9.24457V11.2398L35.3529 10.9911V18.0128L37.846 17.7507V10.7291L40.2373 10.4778ZM43.1694 17.1912L43.6528 15.6696L46.8327 15.3353L47.3161 16.7554L49.9491 16.4786L46.6928 7.80403L43.8181 8.10617L40.5492 17.4666L43.1694 17.1912ZM45.2428 10.6679L46.2095 13.4824L44.2888 13.6842L45.2428 10.6679ZM56.0404 13.9199L53.2547 14.2127V7.11435L50.7617 7.37638V16.3932L56.0404 15.8384V13.9199Z"
              fill="white"
            />
            <path
              d="M21.7359 29.7537V48.1334L18.0696 48.5188V36.564L13.1725 49.0335L10.3966 49.3252L5.47325 37.888V49.8427L1.80696 50.228V31.8483L5.97082 31.4106L11.7845 44.4659L17.5982 30.1886L21.7359 29.7537ZM36.569 43.0722L29.2888 43.8374L28.0842 47.4662L24.2346 47.8708L30.8077 28.7738L35.0763 28.3252L41.6494 46.0404L37.7736 46.4478L36.569 43.0722ZM35.5739 40.2277L32.9289 32.8167L30.2839 40.7836L35.5739 40.2277ZM54.4244 44.6977L47.7727 37.2076V45.3969L44.1064 45.7822V27.4024L47.7727 27.0171V35.259L54.4244 26.318L58.8501 25.8528L51.308 35.7564L59.0596 44.2106L54.4244 44.6977ZM65.1374 28.1675V32.7756L71.2916 32.1288V35.0516L65.1374 35.6985V40.5699L72.0772 39.8405V42.8423L61.4711 43.9571V25.551L72.0772 24.4362V27.4381L65.1374 28.1675ZM84.8366 41.5013L80.8037 34.7628L79.0753 34.9445V42.1068L75.409 42.4922V24.1124L82.2702 23.3913C83.6843 23.2426 84.889 23.3706 85.8841 23.775C86.8792 24.162 87.6212 24.7599 88.1101 25.5687C88.6164 26.3581 88.8695 27.2794 88.8695 28.3327C88.8695 29.544 88.5203 30.6778 87.822 31.7343C87.1237 32.7732 86.0849 33.5495 84.7057 34.0631L89.079 41.0554L84.8366 41.5013ZM79.0753 32.1796L82.1393 31.8576C83.1344 31.753 83.8764 31.438 84.3652 30.9127C84.8541 30.3698 85.0985 29.6682 85.0985 28.808C85.0985 27.9654 84.8541 27.3416 84.3652 26.9365C83.8764 26.5139 83.1344 26.3549 82.1393 26.4595L79.0753 26.7816V32.1796ZM98.4968 40.2499C97.2223 40.3838 96.0701 40.2855 95.04 39.9549C94.0274 39.6224 93.2243 39.0749 92.6307 38.3122C92.0372 37.5495 91.7316 36.6073 91.7142 35.4857L95.6423 35.0728C95.6947 35.8222 95.9566 36.3915 96.428 36.7808C96.9168 37.1683 97.5802 37.318 98.4182 37.2299C99.2737 37.14 99.9459 36.8675 100.435 36.4124C100.924 35.9397 101.168 35.3698 101.168 34.7027C101.168 34.1585 101.002 33.7283 100.67 33.4121C100.339 33.0958 99.9197 32.8678 99.4134 32.7279C98.9245 32.5686 98.2437 32.412 97.3707 32.2579C96.1836 32.0316 95.2146 31.7912 94.4639 31.5365C93.7306 31.2625 93.0934 30.8116 92.5522 30.1839C92.0284 29.5367 91.7665 28.6338 91.7665 27.4752C91.7665 26.3868 92.0372 25.4104 92.5784 24.546C93.1196 23.6816 93.879 22.9874 94.8567 22.4633C95.8344 21.9217 96.9517 21.5848 98.2087 21.4527C100.094 21.2545 101.622 21.5592 102.792 22.3666C103.979 23.1547 104.633 24.3674 104.756 26.0047L100.723 26.4286C100.688 25.8003 100.417 25.3108 99.911 24.9603C99.4221 24.5904 98.7674 24.4485 97.9469 24.5348C97.2311 24.61 96.6549 24.8549 96.2185 25.2694C95.7995 25.6821 95.59 26.2395 95.59 26.9417C95.59 27.4332 95.7471 27.8293 96.0613 28.1298C96.3931 28.4109 96.7946 28.632 97.266 28.7931C97.7548 28.9348 98.4357 29.0915 99.3086 29.2631C100.496 29.4894 101.465 29.7386 102.215 30.0108C102.966 30.283 103.612 30.7418 104.153 31.3871C104.695 32.0324 104.965 32.9256 104.965 34.0666C104.965 35.0497 104.712 35.9891 104.206 36.885C103.699 37.7808 102.957 38.5346 101.98 39.1465C101.002 39.7408 99.8411 40.1086 98.4968 40.2499Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Progress & Status Pill */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#5363F6] animate-pulse" />
            <span ref={statusRef} className="text-xs md:text-sm text-gray-300 font-medium">
              Initializing digital makers...
            </span>
            <div className="h-3 w-px bg-white/20" />
            <div className="flex items-baseline font-mono text-xs md:text-sm text-[#F8CB47]">
              <span ref={counterRef}>00</span>
              <span className="text-[10px] ml-0.5">%</span>
            </div>
          </div>

          <p className="text-[11px] text-gray-500 tracking-wider uppercase mt-2">
            Click anywhere to enter
          </p>
        </div>
      </div>
    </div>
  );
};

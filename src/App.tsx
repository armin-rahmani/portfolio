import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import { TransitionProvider } from './context/TransitionContext';
import { ContactModalProvider } from './context/ContactModalContext';
import { ShowcaseModalProvider } from './context/ShowcaseModalContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SidePanel } from './components/SidePanel';
import { IntroLoader } from './components/IntroLoader';
import { ContactModal } from './components/ContactModal';
import { ShowcaseModal } from './components/ShowcaseModal';
import { CustomCursor } from './components/CustomCursor';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { SohubPage } from './pages/SohubPage';
import { CelestiquePage } from './pages/CelestiquePage';

gsap.registerPlugin(ScrollTrigger);

const AppContent: React.FC = () => {
  const { isOpen } = usePlayer();
  const location = useLocation();

  const isSohub = location.pathname.startsWith('/sohub');
  const isCelestique = location.pathname.startsWith('/celestique');
  const isHome = location.pathname === '/';
  const [isIntroDone, setIsIntroDone] = useState(!isHome && !isSohub && !isCelestique);
  const [isPageRevealed, setIsPageRevealed] = useState(!isHome && !isSohub && !isCelestique);

  // Initialize Lenis smooth scroll tuned for silky 60fps
  useEffect(() => {
    if (!isIntroDone) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [isIntroDone]);

  // Refresh ScrollTrigger on route change or when intro completes
  useEffect(() => {
    if (isIntroDone) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isIntroDone]);

  // If viewing SOHub experience directly, render SOHub's dedicated ecosystem
  if (isSohub) {
    return (
      <>
        <Routes>
          <Route path="/sohub" element={<SohubPage />} />
          <Route path="/sohub/*" element={<SohubPage />} />
        </Routes>
        <CustomCursor />
      </>
    );
  }

  // If viewing Celestique luxury fine jewelry experience directly
  if (isCelestique) {
    return (
      <Routes>
        <Route path="/celestique" element={<CelestiquePage />} />
        <Route path="/celestique/*" element={<CelestiquePage />} />
      </Routes>
    );
  }

  return (
    <>
      {/* Pure Black Cinematic Intro Loading Screen: only shown on initial homepage landing */}
      {!isIntroDone && (
        <IntroLoader
          onRevealStart={() => setIsPageRevealed(true)}
          onComplete={() => {
            setIsPageRevealed(true);
            setIsIntroDone(true);
          }}
        />
      )}

      {/* Main Site Container: completely concealed (visibility: hidden) while intro runs */}
      <div
        className={`site-frame min-h-screen transition-opacity duration-700 ease-out ${
          isOpen ? 'panel-open' : ''
        }`}
        style={{
          visibility: isPageRevealed ? 'visible' : 'hidden',
          opacity: isPageRevealed ? 1 : 0,
          pointerEvents: isPageRevealed ? 'auto' : 'none'
        }}
      >
        <div className="site-layout">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home isIntroDone={isIntroDone} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sohub" element={<SohubPage />} />
            <Route path="*" element={<Home isIntroDone={isIntroDone} />} />
          </Routes>
          <Footer />
        </div>

        {/* Signature Slide-Out Media Player */}
        <SidePanel />

        {/* Global Talk To Me Quick Contact Modal */}
        <ContactModal />

        {/* Global GSAP Showcase Live Interactive Demo Modal */}
        <ShowcaseModal />

        {/* Global Custom Cursor */}
        <CustomCursor />
      </div>
    </>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <TransitionProvider>
          <ContactModalProvider>
            <ShowcaseModalProvider>
              <AppContent />
            </ShowcaseModalProvider>
          </ContactModalProvider>
        </TransitionProvider>
      </PlayerProvider>
    </BrowserRouter>
  );
}

export default App;

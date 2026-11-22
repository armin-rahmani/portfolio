import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { WorkSection } from '../components/WorkSection';
import { ProcessSection } from '../components/ProcessSection';
import { UnlimitedAndFaq } from '../components/UnlimitedAndFaq';
import { CtaBanner } from '../components/CtaBanner';

interface HomeProps {
  isIntroDone?: boolean;
}

export const Home: React.FC<HomeProps> = ({ isIntroDone = true }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location]);

  return (
    <main id="swup" className="transition-swup hide-scrollbar lenis">
      <div>
        <Hero isIntroDone={isIntroDone} />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <ProcessSection />
        <UnlimitedAndFaq />
        <CtaBanner />
      </div>
    </main>
  );
};

export default Home;

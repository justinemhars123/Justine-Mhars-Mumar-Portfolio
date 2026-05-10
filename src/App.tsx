/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import HowIBuild from './components/sections/HowIBuild';
import Contact from './components/sections/Contact';
import LoadingScreen from './components/LoadingScreen';
import { ZoomParallaxIntro } from './components/ui/ZoomParallaxIntro';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [loading, setLoading] = useState(false);

  // Hide the scroll hint as soon as the user starts scrolling
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Reset scroll to top on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loading) return;

    let lenis: any;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis();
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });

    return () => {
      if (lenis) lenis.destroy();
    };
  }, [loading]);

  useEffect(() => {
    if (loading) return;

    const handleScroll = () => {
      // ~15% of viewport height of scroll = user has clearly started scrolling
      setIntroComplete(window.scrollY > window.innerHeight * 0.15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative selection:bg-primary-container selection:text-on-primary-container min-h-screen bg-background text-on-surface">
          <Navbar />
          <main className="relative z-10">
            <ZoomParallaxIntro />
            <About />
            <Projects />
            <HowIBuild />
            <Contact />
          </main>
        </div>
      )}

      {/* Scroll hint — rendered at root level, completely outside the parallax
          stacking context, so it can never be trapped behind any image panel.
          z-index 99999 guarantees it floats above everything. */}
      {!loading && !introComplete && (
        <div
          style={{
            position: 'fixed',
            bottom: 32,
            left: '50%',
            zIndex: 99999,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            animation: 'fadeInHint 0.8s ease 1.5s both',
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: '0.25em',
              color: 'rgba(225, 224, 204, 0.9)',
              fontFamily: 'Almarai, sans-serif',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              textShadow: '0 0 20px rgba(0,0,0,0.8)',
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <div
            style={{
              width: 1,
              height: 48,
              background: 'linear-gradient(to bottom, rgba(225,224,204,0.8), transparent)',
              boxShadow: '0 0 8px rgba(225,224,204,0.3)',
              animation: 'scrollLine 1.8s ease-in-out infinite',
            }}
          />
        </div>
      )}
    </>
  );
}

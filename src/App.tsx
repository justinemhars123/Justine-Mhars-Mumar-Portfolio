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
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [loading, setLoading] = useState(false);

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
    </>
  );
}

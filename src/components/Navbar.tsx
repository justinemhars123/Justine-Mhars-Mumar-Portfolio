import { motion, useScroll, useTransform } from 'motion/react';
import React, { useState, useEffect } from 'react';
import ShinyText from './ui/ShinyText';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      // Trigger expansion only after scrolling past the 400vh cinematic intro
      const intro = document.getElementById('hero-intro');
      const introHeight = intro ? intro.offsetHeight : window.innerHeight;
      setIsScrolled(latest > introHeight - 100);
    });
  }, [scrollY]);

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'how-i-build', 'contact'];
    
    const updateActiveSection = () => {
      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }

      const projectsSection = document.getElementById('projects');
      const howIBuildSection = document.getElementById('how-i-build');

      if (projectsSection && howIBuildSection) {
        const viewportHeight = window.innerHeight;
        const projectsRect = projectsSection.getBoundingClientRect();
        const howIBuildRect = howIBuildSection.getBoundingClientRect();
        const projectsStillPrimary =
          projectsRect.top <= viewportHeight * 0.32 &&
          projectsRect.bottom >= viewportHeight * 0.22 &&
          howIBuildRect.top > viewportHeight * 0.68;

        if (projectsStillPrimary) {
          setActiveSection('projects');
          return;
        }
      }

      const viewportHeight = window.innerHeight;
      const measuredSections = sections
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;

          const rect = el.getBoundingClientRect();
          const visibleTop = Math.max(rect.top, 0);
          const visibleBottom = Math.min(rect.bottom, viewportHeight);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const centerDistance = Math.abs((rect.top + rect.bottom) / 2 - viewportHeight / 2);

          return {
            id,
            visibleHeight,
            centerDistance,
          };
        })
        .filter((section): section is { id: string; visibleHeight: number; centerDistance: number } => section !== null)
        .sort((a, b) => {
          if (b.visibleHeight !== a.visibleHeight) {
            return b.visibleHeight - a.visibleHeight;
          }

          return a.centerDistance - b.centerDistance;
        });

      if (!measuredSections.length) return;

      setActiveSection(measuredSections[0].id);
    };

    const handleScroll = () => {
      window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const active = isScrolled || isHovered;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('');
    }
  };

  const navOpacity = useTransform(scrollY, [0, 1000, 1800], [0, 0, 1]);

  return (
    <motion.nav
      id="main-nav"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !active && handleScroll({ preventDefault: () => {} } as any, 'top')}
      style={{ 
        opacity: navOpacity,
        x: '-50%' 
      }}
      animate={{ 
        width: active ? '520px' : '110px',
        backgroundColor: active ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.9)'
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 z-50 flex items-center justify-center rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-xl h-[48px] px-4 overflow-hidden cursor-pointer"
    >
      <div 
        onClick={(e) => handleScroll(e, 'top')}
        className={`absolute flex items-center justify-center transition-all duration-500 ${active ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}`}
      >
        <ShinyText 
          text="JM" 
          disabled={active}
          speed={3} 
          color="rgba(181, 181, 181, 1)" 
          shineColor="#ffffff"
          className="font-sans text-[14px] font-extrabold tracking-tighter"
        />
      </div>
      
      <motion.div 
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3, delay: active ? 0.2 : 0 }}
        className={`flex items-center justify-center gap-8 whitespace-nowrap ${!active ? 'pointer-events-none' : ''}`}
      >
        {['ABOUT', 'PROJECTS', 'HOW I BUILD', 'CONTACT'].map((item) => {
          const sectionId = item.toLowerCase().replace(/ /g, '-');
          const isActive = activeSection === sectionId;
          
          return (
            <a
              key={item}
              href={`#${sectionId}`}
              onClick={(e) => handleScroll(e, sectionId)}
              className={`nav-link relative font-sans text-[11px] font-bold tracking-[0.2em] transition-all duration-300 ${
                isActive ? 'text-primary' : 'text-primary/40 hover:text-primary/70'
              }`}
            >
              {item}
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </motion.div>
    </motion.nav>
  );
}

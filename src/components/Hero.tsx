import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import SplitText from './SplitText';

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const videoY = useTransform(scrollY, [0, 1000], [0, 300]);
  const videoScale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  const subtitle = "Full-Stack Developer specializing in AI-powered web applications.";

  return (
    <header className="relative h-screen w-full flex flex-col overflow-hidden justify-center" id="hero">
      <motion.div 
        style={{ y: videoY, scale: videoScale }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4" type="video/mp4" />
        </video>
        {/* Darkening Overlay - keeping original colors but focused */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 opacity-10 mix-blend-overlay noise-overlay" />
      </motion.div>

      <div className="absolute bottom-24 left-24 z-10 text-left max-w-4xl">
        <div className="flex flex-col gap-0 mb-4">
          <SplitText
            tag="h1"
            text="Justine Mhars"
            className="font-sans text-[56px] md:text-[80px] text-primary leading-[1.1] font-extrabold tracking-tighter"
            delay={80}
            duration={0.8}
            textAlign="left"
            animateOnLoad={true}
          />
          <SplitText
            tag="h1"
            text="Mumar"
            className="font-sans text-[56px] md:text-[80px] text-primary leading-[1.1] font-extrabold tracking-tighter"
            delay={80}
            duration={0.8}
            textAlign="left"
            animateOnLoad={true}
          />
        </div>

        <motion.div style={{ opacity, y }} className="flex flex-col gap-6">
          <div className="max-w-xl">
            <SplitText
              text={subtitle}
              tag="p"
              className="font-serif text-lg md:text-xl text-on-surface-variant italic leading-relaxed"
              delay={30}
              duration={0.5}
              splitType="chars"
              textAlign="left"
              animateOnLoad={true}
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex justify-start"
          >
            <a 
              href="#projects"
              className="group flex items-center gap-2 rounded-full font-sans text-xs font-bold tracking-widest transition-all duration-300 ease-out bg-transparent border border-primary-container/40 text-primary-container px-6 py-3 hover:bg-primary-container hover:text-on-primary-container uppercase overflow-hidden"
            >
              <SplitText 
                text="View Projects"
                className="inline-block"
                delay={40}
                duration={0.6}
                splitType="chars"
                textAlign="left"
                animateOnLoad={true}
              />
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce"
      >

      </motion.div>
    </header>
  );
}

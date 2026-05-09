import { useScroll, useTransform, motion, useSpring } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import SplitText from './SplitText';

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4';

const videos = [
  { src: HERO_VIDEO }, // 0: Center (Now matches Hero video)
  { src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4' }, // 1: Top Center / Right
  { src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4' }, // 2: Top Left
  { src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_115139_0fc6bd3d-3631-4d26-ab9b-28293887dcc9.mp4' }, // 3: Middle Right
  { src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_110052_2e127257-5236-40b1-ba48-4690260f1185.mp4' }, // 4: Bottom Center / Right
  { src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4' }, // 5: Bottom Left
  { src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260416_031918_443d301c-b6d9-4a18-b102-c946a16d86ad.mp4' }, // 6: Bottom Far Right
];

export function ZoomParallaxIntro() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Remap transforms to end at 0.95 to eliminate the long delay when scrolling down
  // while keeping a subtle "catch" for the unzoom/rewind effect
  const scale4 = useTransform(smoothProgress, [0, 0.95], [1, 4]);
  const scale5 = useTransform(smoothProgress, [0, 0.95], [1, 5]);
  const scale6 = useTransform(smoothProgress, [0, 0.95], [1, 6]);
  const scale8 = useTransform(smoothProgress, [0, 0.95], [1, 8]);
  const scale9 = useTransform(smoothProgress, [0, 0.95], [1, 9]);
  
  // Fade in hero content near the end of the zoom
  const heroOpacity = useTransform(smoothProgress, [0.75, 0.95], [0, 1]);
  const heroY = useTransform(smoothProgress, [0.75, 0.95], [20, 0]);
  const heroScale = useTransform(smoothProgress, [0.75, 0.95], [0.95, 1]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[350vh] bg-black" id="hero-intro">
      <div className="sticky top-0 h-screen overflow-hidden">
        {videos.map(({ src }, index) => {
          const scale = scales[index % scales.length];
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center
                ${index === 0 ? '[&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''}
                ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''}
                ${index === 2 ? '[&>div]:!-top-[16.5vh] [&>div]:!-left-[25vw] [&>div]:!h-[58vh] [&>div]:!w-[20vw]' : ''}
                ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''}
                ${index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : ''}
                ${index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : ''}
                ${index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''}
              `}
            >
              <div className="relative overflow-hidden rounded-lg w-full h-full flex items-center justify-center">
                <video
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`h-full w-full object-cover ${index === 6 ? 'object-top' : ''}`}
                />
                <div className={`absolute inset-0 ${index === 0 ? 'bg-black/55' : 'bg-black/25'}`} />
              </div>
            </motion.div>
          );
        })}

        {/* Hero Content - Separate Sticky Layer to prevent massive scaling issues */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="absolute inset-0 flex flex-col justify-end pb-24 px-16 md:px-24 z-40 pointer-events-none"
        >
          <div className="max-w-4xl text-left pointer-events-auto">
            <div className="flex flex-col gap-0 mb-6">
              <h1 className="font-sans text-[48px] md:text-[64px] lg:text-[80px] text-primary leading-[1.1] font-extrabold tracking-tighter">
                Justine Mhars
              </h1>
              <h1 className="font-sans text-[48px] md:text-[64px] lg:text-[80px] text-primary leading-[1.1] font-extrabold tracking-tighter">
                Mumar
              </h1>
            </div>
            <p className="font-serif text-lg md:text-xl text-[#E1E0CC]/60 italic leading-relaxed max-w-xl mb-8">
              Full-Stack Developer specializing in AI-powered web applications.
            </p>
            <div className="flex justify-start">
              <a
                href="#projects"
                className="group flex items-center gap-2 rounded-full font-sans text-xs font-bold tracking-widest transition-all duration-300 ease-out bg-transparent border border-[#E1E0CC]/40 text-[#E1E0CC] px-6 py-3 hover:bg-[#E1E0CC] hover:text-black uppercase overflow-hidden"
              >
                View Projects
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

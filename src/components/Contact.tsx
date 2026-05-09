import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import TextType from './ui/TextType';

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);

  const contacts = [
    { label: "EMAIL", value: "justinemharsmumar@gmail.com", href: "mailto:justinemharsmumar@gmail.com" },
    { label: "GITHUB", value: "@justinemhars123", href: "https://github.com/justinemhars123" },
    { label: "LINKEDIN", value: "Justine Mhars Mumar", href: "https://www.linkedin.com/in/justine-mhars-mumar-50b934375/" }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      if (!fadingOutRef.current) {
        video.style.opacity = '1';
      }
    };

    const handleTimeUpdate = () => {
      if (video.duration) {
        const timeLeft = video.duration - video.currentTime;

        // Start fading out slightly before the end
        if (timeLeft <= 0.8 && !fadingOutRef.current) {
          fadingOutRef.current = true;
          video.style.opacity = '0';
        }

        // Reset when the video loops
        if (video.currentTime < 0.4 && fadingOutRef.current) {
          fadingOutRef.current = false;
          video.style.opacity = '1';
        }
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Fallback in case video is already loaded
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <section className="relative bg-black min-h-[580px] overflow-hidden flex flex-col justify-between py-20 px-6 md:px-24" id="contact">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-[center_35%] z-0 transition-opacity duration-1000 ease-in-out saturate-[0.55] brightness-[0.85] contrast-[1.1]"
        style={{ opacity: 0 }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4" type="video/mp4" />
      </video>

      {/* Layer 1 — Dark base */}
      <div className="absolute inset-0 bg-black/50 z-1" />

      {/* Layer 3 — Noise texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay z-3 noise-overlay" />

      {/* Top zone: Label + Heading */}
      <div className="relative z-[4] w-full max-w-[1200px] mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-sans text-[10px] font-light tracking-[0.2em] text-[#E1E0CC]/35 uppercase mb-4"
        >

        </motion.div>

        <h2 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold text-[#E1E0CC] tracking-[-0.03em] flex items-baseline whitespace-nowrap justify-center">
          <span className="inline-block overflow-hidden mr-[0.2em]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="inline-block"
            >
              Let's
            </motion.span>
          </span>
          <span className="inline-block">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="inline-block"
            >
              <TextType
                text={["build", "innovate", "evolve", "connect"]}
                typingSpeed={100}
                deletingSpeed={100}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="_"
                cursorClassName="text-[#E1E0CC]/50 ml-1"
                className="inline-block"
              />
            </motion.div>
          </span>
          <span className="inline-block overflow-hidden ml-[-0.15em]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.16,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="font-serif italic font-light opacity-50 inline-block text-[0.8em]"
            >
              .
            </motion.span>
          </span>
        </h2>
      </div>

      {/* Middle zone: Contact Links (flex-1 for natural distribution) */}
      <div className="relative z-[4] flex-1 flex flex-col items-center justify-center mt-12 md:mt-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
          {contacts.map((contact, i) => (
            <div key={contact.label} className="flex items-center w-full md:w-auto">
              {i !== 0 && (
                <div className="hidden md:block w-px h-[52px] bg-[#E1E0CC]/15 self-center" />
              )}
              <motion.a
                href={contact.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col items-center px-4 md:px-16 w-full md:w-auto"
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <span className="font-sans text-[10px] md:text-[11px] font-normal tracking-[0.2em] text-[#E1E0CC]/35 group-hover:text-[#E1E0CC]/60 uppercase mb-2 transition-colors duration-200">
                  {contact.label}
                </span>
                <span className="flex items-center gap-2 font-sans text-lg md:text-xl font-medium text-[#E1E0CC] transition-colors duration-200 text-center">
                  {contact.value}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </span>
              </motion.a>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom zone: Bar */}
      <div className="relative z-[4] w-full max-w-[1200px] mx-auto pt-8">
        <div className="w-full border-t border-[#E1E0CC]/6 mb-6" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="font-sans text-[11px] text-[#E1E0CC]/40">
            © 2026 Justine Mhars Mumar. All rights reserved.
          </p>
          <p className="font-sans text-[11px] text-[#E1E0CC]/40 italic">
            Designed & built with precision.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

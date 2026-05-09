import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleComplete = () => {
    setIsVisible(false);
    // Give time for the exit animation before calling onComplete
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  useEffect(() => {
    // Attempt to play the video on mount
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Video playback was blocked. User interaction might be required.", err);
      });
    }
    
    // Safety timeout in case video fails to load or end
    const timer = setTimeout(() => {
      // We don't auto-complete here, we let the video play or user click
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={handleComplete}
        >
          <video
            ref={videoRef}
            src="/Assets/video/DotA 2 Intro cinematic full video HD opening cinematic - Reefaholics (1080p).mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleComplete}
          />
          
          {/* Subtle overlay to make skip text readable */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#E1E0CC]/30 text-[9px] tracking-[0.3em] uppercase pointer-events-none flex flex-col items-center gap-4"
          >
            <div className="w-[1px] h-12 bg-gradient-to-t from-[#E1E0CC]/20 to-transparent" />
            Click anywhere to skip
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

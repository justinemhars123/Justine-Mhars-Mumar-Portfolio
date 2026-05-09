"use client";
import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function wrapIndex(n, len) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i, active, len, loop) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

interface CardStackProps {
  items: any[];
  index?: number; // Added to make it controlled
  initialIndex?: number;
  maxVisible?: number;
  cardWidth?: number;
  cardHeight?: number;
  overlap?: number;
  spreadDeg?: number;
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;
  springStiffness?: number;
  springDamping?: number;
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;
  showDots?: boolean;
  className?: string;
  onChangeIndex?: (index: number, item: any) => void;
  onCardClick?: (item: any, state: { active: boolean; index: number }) => void;
  renderCard?: (item: any, state: { active: boolean }) => React.ReactNode;
}

export function CardStack({
  items,
  index, // Destructured
  initialIndex = 0,
  maxVisible = 7,
  cardWidth = 520,
  cardHeight = 320,
  overlap = 0.48,
  spreadDeg = 48,
  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,
  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,
  springStiffness = 280,
  springDamping = 28,
  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,
  showDots = true,
  className,
  onChangeIndex,
  onCardClick,
  renderCard,
}: CardStackProps) {
  const reduceMotion = useReducedMotion();
  const len = items.length;
  const [active, setActive] = React.useState(() => wrapIndex(index !== undefined ? index : initialIndex, len));
  const [hovering, setHovering] = React.useState(false);

  // Sync state if controlled
  React.useEffect(() => {
    if (index !== undefined && index !== active) {
      setActive(wrapIndex(index, len));
    }
  }, [index, len]);

  React.useEffect(() => { setActive((a) => wrapIndex(a, len)); }, [len]);
  React.useEffect(() => { if (!len) return; onChangeIndex?.(active, items[active]); }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;
  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => { if (!len || !canGoPrev) return; setActive((a) => wrapIndex(a - 1, len)); }, [canGoPrev, len]);
  const next = React.useCallback(() => { if (!len || !canGoNext) return; setActive((a) => wrapIndex(a + 1, len)); }, [canGoNext, len]);

  const onKeyDown = (e) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };

  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len) return;
    if (pauseOnHover && hovering) return;
    const id = window.setInterval(() => { if (loop || active < len - 1) next(); }, Math.max(700, intervalMs));
    return () => window.clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next]);

  if (!len) return null;
  const activeItem = items[active];

  return (
    <div 
      className={cn("relative flex w-full flex-col items-center justify-center overflow-visible", className)}
      onMouseEnter={() => setHovering(true)} 
      onMouseLeave={() => setHovering(false)}
    >
      <div className="relative flex w-full items-center justify-center" style={{ perspective: `${perspectivePx}px`, height: cardHeight + 60 }}>
        <AnimatePresence initial={false}>
          <div className="relative flex items-center justify-center">
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              if (abs > maxOffset) return null;
              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 40; // Increased multiplier to pull side cards lower
              const z = -abs * depthPx;
              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;
              const dragProps = isActive ? {
                drag: "x",
                dragConstraints: { left: 0, right: 0 },
                dragElastic: 0.18,
                onDragEnd: (_e, info) => {
                  if (reduceMotion) return;
                  const travel = info.offset.x;
                  const v = info.velocity.x;
                  const threshold = Math.min(160, cardWidth * 0.22);
                  if (travel > threshold || v > 650) prev();
                  else if (travel < -threshold || v < -650) next();
                },
              } : {};
              const handleCardClick = () => {
                if (isActive) {
                  onCardClick?.(item, { active: true, index: i });
                  return;
                }

                setActive(i);
              };

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute rounded-2xl overflow-hidden will-change-transform select-none",
                    isActive
                      ? "cursor-grab active:cursor-grabbing ring-1 ring-[#E1E0CC]/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                      : "cursor-pointer border border-transparent shadow-xl",
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    zIndex,
                  }}
                  initial={false}
                  animate={{
                    x,
                    y: y + lift,
                    z,
                    scale,
                    rotateZ,
                    rotateX,
                    opacity: isActive ? 1 : 0.85,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={handleCardClick}
                  {...dragProps}
                >
                  <div className="h-full w-full overflow-hidden bg-neutral-900">
                    {renderCard ? renderCard(item, { active: isActive }) : <DefaultFanCard item={item} active={isActive} />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>

      {showDots && (
        <div className="mt-24 flex flex-col items-center gap-6">
          <div className="flex gap-2.5">
            {items.map((it, idx) => (
              <button 
                key={idx} 
                onClick={() => setActive(idx)} 
                className={cn("h-2 w-2 rounded-full transition", idx === active ? "bg-[#E1E0CC]" : "bg-[#E1E0CC]/30 hover:bg-[#E1E0CC]/50")} 
                aria-label={`Go to ${it.title}`} 
              />
            ))}
          </div>

          {activeItem.href && (
            <motion.a
              href={activeItem.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={`link-${active}`}
              className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#E1E0CC] hover:text-white transition uppercase"
            >
              Learn more <SquareArrowOutUpRight className="h-3 w-3" />
            </motion.a>
          )}
        </div>
      )}
    </div>
  );
}

function DefaultFanCard({ item, active }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-[#161616]">
      {/* Full image — always shown on all cards */}
      <div className="absolute inset-0 z-0">
        {item.imageSrc ? (
          <img 
            src={item.imageSrc} 
            alt={item.title} 
            className="h-full w-full object-cover transition-transform duration-700"
            style={{ transform: active ? 'scale(1.05)' : 'scale(1)' }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800">
            <span className="text-[10px] uppercase tracking-widest text-[#E1E0CC]/20">No image</span>
          </div>
        )}
      </div>
    </div>
  );
}

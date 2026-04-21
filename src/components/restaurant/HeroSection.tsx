'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   CINEMATIC CURTAIN REVEAL HERO
   - Film perdesi açılma efekti
   - Split-screen asimetrik düzen
   - Bold tipografi
   - Parallax katmanları
   ═══════════════════════════════════════════════════════ */

/* ─── Curtain panels (left & right reveal) ─── */
function Curtains({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex pointer-events-none"
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="flex-1 bg-[#0a0a0a]"
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 1.4,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.3,
        }}
      />
      <motion.div
        className="flex-1 bg-[#0a0a0a]"
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.4,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.3,
        }}
      />
      {/* Center gold line that appears during curtain */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-transparent via-amber-400/80 to-transparent"
        initial={{ height: '0%' }}
        animate={{ height: '100%' }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />
    </motion.div>
  );
}

/* ─── Grain overlay (cinematic film texture) ─── */
function FilmGrain() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
      }}
    />
  );
}

/* ─── Scrolling horizontal marquee text ─── */
function MarqueeText() {
  const text = 'LE MAISON DORÉE  •  FINE DINING  •  ISTANBUL  •  EST. 2024  •  ';
  return (
    <div className="absolute top-0 left-0 right-0 z-30 overflow-hidden bg-[#0a0a0a] py-3 border-b border-white/[0.06]">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-[11px] tracking-[0.5em] uppercase text-white/20 font-light"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Bottom horizontal marquee ─── */
function BottomMarquee() {
  const text = 'RESERVATION  •  TASTING MENU  •  WINE PAIRING  •  PRIVATE DINING  •  ';
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden bg-[#0a0a0a] py-3 border-t border-white/[0.06]">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['-50%', '0%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-[11px] tracking-[0.5em] uppercase text-white/20 font-light"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Counter number animation ─── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2000;
    const step = (target / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [started, target]);

  return <span>{count}{suffix}</span>;
}

/* ─── Main Hero ─── */
export default function HeroSection() {
  const [showCurtain, setShowCurtain] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const leftImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const leftImageY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  const statsY = useTransform(scrollYProgress, [0, 0.4], ['0%', '40px']);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleCurtainComplete = () => {
    setTimeout(() => setShowCurtain(false), 200);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* ── Curtain Reveal ── */}
      {showCurtain && <Curtains onComplete={handleCurtainComplete} />}

      {/* ── Film Grain Texture ── */}
      <FilmGrain />

      {/* ── Top Marquee ── */}
      {loaded && <MarqueeText />}

      {/* ── Bottom Marquee ── */}
      {loaded && <BottomMarquee />}

      {/* ══════════ LAYOUT: Split Screen ══════════ */}
      <div className="relative z-10 h-full flex items-stretch">
        {/* ── LEFT SIDE: Image ── */}
        <div className="relative w-full md:w-[55%] h-1/2 md:h-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ y: leftImageY, scale: leftImageScale }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/hero-dish.jpg')`,
                filter: loaded
                  ? 'brightness(0.85) contrast(1.05) saturate(0.9)'
                  : 'brightness(0) saturate(0)',
                transition: 'filter 1.5s ease-out',
              }}
            />
          </motion.div>

          {/* Dark gradient overlay from right */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a] md:to-[#0a0a0a]/80" />
          {/* Dark gradient overlay from bottom (mobile) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] md:hidden" />

          {/* Image label */}
          <motion.div
            className="absolute bottom-12 left-8 md:bottom-12 md:left-12 z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-white/30" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">
                Chef&apos;s Special
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT SIDE: Typography + Content ── */}
        <motion.div
          className="relative w-full md:w-[45%] h-1/2 md:h-full flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12"
          style={{ opacity: contentOpacity }}
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-10 mix-blend-soft-light"
            style={{
              backgroundImage: `url('/hero-texture.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          <div className="relative z-10 flex flex-col justify-center h-full">
            {/* Small label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={loaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-white/40 font-light">
                Fine Dining Experience
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-[0.95] tracking-tight text-white">
                <span className="block font-light">Le</span>
                <span className="block mt-2 italic text-white/90" style={{ fontFamily: 'Georgia, serif' }}>
                  Maison
                </span>
                <span className="block mt-1">Dorée</span>
              </h1>
            </motion.div>

            {/* Separator */}
            <motion.div
              className="my-8 w-16 h-px bg-gradient-to-r from-amber-400/60 to-transparent"
              initial={{ scaleX: 0 }}
              animate={loaded ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.4 }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Description */}
            <motion.p
              className="text-sm md:text-base text-white/40 font-light leading-relaxed max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.6 }}
            >
              İstanbul&apos;un kalbinde, her tabağın bir hikaye anlattığı
              eşsiz bir gastronomi yolculuğu. Damak tadınızı
              yeniden keşfedin.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.9 }}
            >
              <button
                className="group relative flex items-center gap-4 text-white/80 hover:text-white transition-colors duration-500"
              >
                <span className="text-xs tracking-[0.35em] uppercase font-light">
                  Rezervasyon
                </span>
                <div className="relative w-12 h-12 border border-white/20 rounded-full flex items-center justify-center
                              group-hover:border-amber-400/40 group-hover:bg-amber-400/5 transition-all duration-500">
                  <svg
                    className="w-4 h-4 text-white/60 group-hover:text-amber-400 transition-colors duration-500 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className="mt-14 flex gap-10 md:gap-14"
              style={{ y: statsY }}
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 3.2 }}
            >
              {[
                { value: 12, suffix: '+', label: 'Yıl Deneyim' },
                { value: 5, suffix: '', label: 'Michelin Yıldız' },
                { value: 1, suffix: 'K+', label: 'Mutlu Misafir' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-2xl md:text-3xl font-extralight text-white/90">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-white/25 font-light">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator (bottom center) ── */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 3.5 }}
      >
        <motion.div
          className="w-[1px] h-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
          }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

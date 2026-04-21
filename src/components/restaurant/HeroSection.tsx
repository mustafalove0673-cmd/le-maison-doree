'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ─── floating dust particles ─── */
function GoldenParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, rgba(218,165,32,0.8) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity * 1.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── vertical line animation (story feel) ─── */
function StoryLine({ show }: { show: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 bottom-0 h-32 w-px"
      initial={{ scaleY: 0, opacity: 0 }}
      animate={show ? { scaleY: 1, opacity: 1 } : {}}
      transition={{ duration: 1.5, delay: 0.5 }}
      style={{
        background: 'linear-gradient(to bottom, rgba(218,165,32,0), rgba(218,165,32,0.6))',
        transformOrigin: 'top',
      }}
    />
  );
}

/* ─── scroll indicator ─── */
function ScrollIndicator({ show }: { show: boolean }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 1.5 }}
    >
      <span className="text-[10px] tracking-[0.3em] uppercase text-amber-200/60 font-light">
        Keşfet
      </span>
      <motion.div
        className="w-5 h-8 border border-amber-200/30 rounded-full flex items-start justify-center p-1"
        animate={{ borderColor: ['rgba(253,230,138,0.2)', 'rgba(253,230,138,0.5)', 'rgba(253,230,138,0.2)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-1 h-1.5 bg-amber-200/70 rounded-full"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── letter-by-letter reveal ─── */
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="inline-block w-[2px] h-[1em] bg-amber-300/70 ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
}

/* ─── main hero ─── */
export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-60px']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.9]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded) {
      const t = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(t);
    }
  }, [loaded]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* ── Background Image with Parallax ── */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms]"
          style={{
            backgroundImage: `url('/hero-bg.jpg')`,
            transform: loaded ? 'scale(1)' : 'scale(1.1)',
            filter: 'brightness(0.7) saturate(1.2)',
          }}
        />
      </motion.div>

      {/* ── Animated Gradient Overlay ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(120,60,20,0.3) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 80%, rgba(80,30,10,0.3) 0%, transparent 60%),
            linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%)
          `,
          opacity: overlayOpacity,
        }}
      />

      {/* ── Vignette ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* ── Golden Particles ── */}
      {loaded && <GoldenParticles />}

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <AnimatePresence>
          {showContent && (
            <div className="flex flex-col items-center gap-6 max-w-4xl">
              {/* Decorative top line */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-300/60" />
                <span className="text-amber-300/80 text-xs tracking-[0.4em] uppercase font-light">
                  Est. 2024
                </span>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-300/60" />
              </motion.div>

              {/* Main heading */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide text-white">
                  <span className="block">Le</span>
                  <span className="block mt-1 font-extralight italic text-amber-100/90">
                    Maison
                  </span>
                  <span className="block mt-1">Dorée</span>
                </h1>
              </motion.div>

              {/* Divider ornament */}
              <motion.div
                className="flex items-center gap-3 mt-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400/50" />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="text-amber-400/60"
                >
                  <path
                    d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6Z"
                    fill="currentColor"
                  />
                </svg>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400/50" />
              </motion.div>

              {/* Tagline with typewriter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="mt-2"
              >
                <p className="text-amber-100/70 text-sm sm:text-base md:text-lg font-light tracking-[0.15em] italic">
                  <TypewriterText text="Her tabak, bir hikaye anlatır..." delay={1400} />
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="mt-6"
              >
                <button
                  className="group relative px-10 py-3.5 border border-amber-300/30 text-amber-100/80 text-sm tracking-[0.25em] uppercase
                             font-light overflow-hidden transition-all duration-500 hover:border-amber-300/60 hover:text-amber-100"
                >
                  <span className="relative z-10">Rezervasyon Yap</span>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-amber-800/10 to-amber-900/20
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-amber-300/50"
                    initial={{ width: '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4 }}
                  />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Story line & Scroll indicator ── */}
      {showContent && (
        <>
          <StoryLine show={showContent} />
          <ScrollIndicator show={showContent} />
        </>
      )}

      {/* ── Side decorative text ── */}
      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-amber-300/30" />
        <span
          className="text-[10px] tracking-[0.3em] uppercase text-amber-200/40"
          style={{ writingMode: 'vertical-lr' }}
        >
          Fine Dining
        </span>
        <div className="w-px h-12 bg-gradient-to-t from-transparent to-amber-300/30" />
      </motion.div>

      {/* ── Left decorative element ── */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-amber-300/30" />
        <span
          className="text-[10px] tracking-[0.3em] uppercase text-amber-200/40"
          style={{ writingMode: 'vertical-rl' }}
        >
          Istanbul
        </span>
        <div className="w-px h-12 bg-gradient-to-t from-transparent to-amber-300/30" />
      </motion.div>
    </section>
  );
}

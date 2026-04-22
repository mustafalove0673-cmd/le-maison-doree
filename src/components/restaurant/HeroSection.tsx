'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════
   CINEMATIC IMMERSIVE HERO — Le Maison Dorée
   Full-screen parallax backgrounds, floating food images,
   particle field, 3D-like depth, dramatic reveal animations.
   ═══════════════════════════════════════════════════════════════════════ */

const SLIDES = [
  { image: '/hero-hall.jpg', label: 'Salon', subtitle: 'İhtişamlı mekanımızda unutulmaz bir akşam yaşayın' },
  { image: '/hero-chef.jpg', label: 'Mutfak', subtitle: 'Şefimizin elinden çıkan her tabak bir başyapıt' },
  { image: '/hero-bar.jpg', label: 'Bar', subtitle: 'Özenle hazırlanmış içeceklerle özel anlar' },
  { image: '/hero-dish.jpg', label: 'Lezzet', subtitle: 'Damak tadınızı şaşırtacak eşsiz tatlar' },
];

const STATS = [
  { value: '12+', label: 'Yıl Deneyim' },
  { value: '5', label: 'Michelin Yıldız' },
  { value: '2.4K', label: 'Değerlendirme' },
  { value: '50K+', label: 'Misafir' },
];

const C = {
  emerald: '#34d399',
  teal: '#2dd4bf',
  copper: '#d4956a',
  rose: '#e8a87c',
  cream: '#f0ece8',
  dark: '#060609',
  card: '#0c0c14',
  dimText: '#8b8b9e',
};

// ─── Particle Field ────────────────────────────────────────────────
function ParticleField() {
  const particles = useMemo(() => [
    { x: '5%', y: '15%', size: 3, dur: 8, delay: 0, color: C.emerald },
    { x: '12%', y: '70%', size: 2, dur: 10, delay: 2, color: C.teal },
    { x: '20%', y: '40%', size: 4, dur: 7, delay: 1, color: C.copper },
    { x: '35%', y: '20%', size: 2, dur: 9, delay: 3, color: C.emerald },
    { x: '50%', y: '80%', size: 3, dur: 11, delay: 0.5, color: C.copper },
    { x: '65%', y: '30%', size: 2, dur: 8, delay: 1.5, color: C.teal },
    { x: '75%', y: '60%', size: 3, dur: 10, delay: 2.5, color: C.emerald },
    { x: '88%', y: '25%', size: 2, dur: 7, delay: 4, color: C.copper },
    { x: '92%', y: '75%', size: 4, dur: 9, delay: 1, color: C.teal },
    { x: '40%', y: '55%', size: 2, dur: 12, delay: 3.5, color: C.emerald },
    { x: '58%', y: '10%', size: 3, dur: 8, delay: 2, color: C.copper },
    { x: '80%', y: '45%', size: 2, dur: 11, delay: 0, color: C.teal },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 6}px ${p.color}40, 0 0 ${p.size * 12}px ${p.color}15`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 8, 0],
            opacity: [0.2, 0.7, 0.15, 0.5, 0.2],
            scale: [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Floating Food Image Orbs ─────────────────────────────────────
function FloatingFoodOrbs() {
  const orbs = useMemo(() => [
    { image: '/menu-steak.jpg', x: '85%', y: '18%', size: 80, dur: 14, delay: 0, rotateStart: -8, rotateEnd: 5 },
    { image: '/menu-scallops.jpg', x: '8%', y: '65%', size: 70, dur: 16, delay: 3, rotateStart: 5, rotateEnd: -6 },
    { image: '/menu-dessert.jpg', x: '78%', y: '72%', size: 65, dur: 12, delay: 1.5, rotateStart: -3, rotateEnd: 8 },
    { image: '/menu-cocktail1.jpg', x: '15%', y: '20%', size: 55, dur: 18, delay: 5, rotateStart: 6, rotateEnd: -4 },
    { image: '/menu-wine.jpg', x: '90%', y: '50%', size: 60, dur: 15, delay: 2, rotateStart: -5, rotateEnd: 3 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
          }}
          initial={{ opacity: 0, scale: 0, rotate: orb.rotateStart }}
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [0.9, 1.05, 0.9],
            rotate: [orb.rotateStart, orb.rotateEnd, orb.rotateStart],
            y: [0, -15, 5, -20, 0],
          }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            delay: 3 + orb.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-full h-full rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(52,211,153,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 40px rgba(52,211,153,0.05)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url(${orb.image})` }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(52,211,153,0.1) 0%, rgba(6,6,9,0.4) 100%)',
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Animated Light Rays ──────────────────────────────────────────
function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {/* Ray 1 */}
      <motion.div
        className="absolute top-0 left-[20%] w-[2px] h-full opacity-[0.03]"
        style={{
          background: `linear-gradient(180deg, transparent, ${C.emerald}, transparent)`,
          transform: 'skewX(-15deg)',
        }}
        animate={{
          x: [-10, 10, -10],
          opacity: [0.02, 0.06, 0.02],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Ray 2 */}
      <motion.div
        className="absolute top-0 right-[30%] w-[1px] h-full opacity-[0.02]"
        style={{
          background: `linear-gradient(180deg, transparent, ${C.copper}, transparent)`,
          transform: 'skewX(20deg)',
        }}
        animate={{
          x: [10, -10, 10],
          opacity: [0.015, 0.04, 0.015],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      {/* Ray 3 */}
      <motion.div
        className="absolute top-0 left-[50%] w-[1px] h-[60%] opacity-[0.02]"
        style={{
          background: `linear-gradient(180deg, ${C.teal}, transparent)`,
          transform: 'skewX(-8deg)',
        }}
        animate={{
          x: [-5, 8, -5],
          opacity: [0.01, 0.035, 0.01],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
}

// ─── Morphing Gradient Blobs ──────────────────────────────────────
function GradientBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Emerald blob */}
      <motion.div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] opacity-[0.06]"
        style={{
          background: `radial-gradient(circle, ${C.emerald}, transparent 70%)`,
          animation: 'morph-blob-slow 20s ease-in-out infinite',
        }}
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          x: [0, 30, -20, 10, 0],
          y: [0, -20, 30, -10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Copper blob */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] opacity-[0.04]"
        style={{
          background: `radial-gradient(circle, ${C.copper}, transparent 70%)`,
          animation: 'morph-blob 15s ease-in-out infinite',
        }}
        animate={{
          scale: [0.9, 1.1, 1, 0.95, 0.9],
          x: [0, -20, 30, -10, 0],
          y: [0, 15, -25, 10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      {/* Teal blob */}
      <motion.div
        className="absolute top-1/3 right-[10%] w-[300px] h-[300px] opacity-[0.03]"
        style={{
          background: `radial-gradient(circle, ${C.teal}, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.3, 0.8, 1.1, 1],
          y: [0, -40, 20, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
    </div>
  );
}

// ─── Navigation Bar ────────────────────────────────────────────────
function NavBar({ show }: { show: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = useMemo(() => ['Hikayemiz', 'Menü', 'Şef', 'Galeri', 'İletişim'], []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{
          background: 'rgba(6,6,9,0.7)',
          borderBottom: '1px solid rgba(52,211,153,0.06)',
        }}
      />

      <div className="relative max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-22">
          {/* Logo with glow */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 animated-border"
              style={{
                background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(45,212,191,0.05))',
              }}
            >
              <span
                style={{ color: C.emerald, fontFamily: 'Georgia, serif' }}
                className="text-lg font-bold glow-text-emerald"
              >
                M
              </span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="text-sm tracking-[0.2em] font-light"
                style={{ color: C.cream }}
              >
                LE MAISON
              </span>
              <span
                className="text-[9px] tracking-[0.4em] uppercase mt-0.5"
                style={{ color: C.emerald }}
              >
                Dorée
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative text-[11px] tracking-[0.2em] uppercase font-light transition-all duration-300 group"
                style={{ color: 'rgba(139,139,158,0.6)' }}
                initial={{ opacity: 0, y: -15 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -2, color: C.emerald }}
              >
                {link}
                <motion.span
                  className="absolute -bottom-1.5 left-0 right-0 h-[1px] origin-left"
                  style={{ background: `linear-gradient(90deg, ${C.emerald}, ${C.teal})` }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <motion.button
              className="hidden sm:flex items-center gap-2 px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-500 rounded-lg relative overflow-hidden group"
              style={{
                background: 'transparent',
                border: '1px solid rgba(52,211,153,0.25)',
                color: C.emerald,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={show ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${C.emerald}, ${C.teal})` }} />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'currentColor' }} />
                Rezervasyon
              </span>
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[3px] p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span
                className={`w-5 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}
                style={{ background: 'rgba(240,236,232,0.5)' }}
              />
              <span
                className={`w-5 h-px transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
                style={{ background: 'rgba(240,236,232,0.5)' }}
              />
              <span
                className={`w-5 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}
                style={{ background: 'rgba(240,236,232,0.5)' }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 backdrop-blur-2xl"
            style={{
              background: 'rgba(6,6,9,0.95)',
              borderBottom: '1px solid rgba(52,211,153,0.08)',
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm tracking-[0.2em] uppercase font-light"
                  style={{ color: C.dimText }}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Hero Content ──────────────────────────────────────────────────
function HeroContent({ show, currentSlide }: { show: boolean; currentSlide: number }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-8">

      {/* Small label above title */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${currentSlide}`}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 md:mb-8"
        >
          <span
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium"
            style={{
              color: C.copper,
              background: 'rgba(212,149,106,0.08)',
              border: '1px solid rgba(212,149,106,0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.copper }} />
            {SLIDES[currentSlide].label}
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.copper }} />
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Title: Le */}
      <motion.h1
        className="leading-[0.9]"
        initial={{ opacity: 0, y: 60, rotateX: 30 }}
        animate={show ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: '800px' }}
      >
        <span
          className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extralight tracking-tight"
          style={{ color: C.cream }}
        >
          Le
        </span>
      </motion.h1>

      {/* Title: Maison */}
      <motion.h1
        className="leading-[0.9] mt-1 md:mt-2"
        initial={{ opacity: 0, y: 60, rotateX: 30 }}
        animate={show ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: '800px' }}
      >
        <span
          className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: 300,
            fontStyle: 'italic',
            color: C.teal,
          }}
        >
          Maison
        </span>
      </motion.h1>

      {/* Title: Dorée — with gradient */}
      <motion.h1
        className="leading-[0.9] mt-1 md:mt-2"
        initial={{ opacity: 0, y: 60, rotateX: 30, scale: 0.95 }}
        animate={show ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
        transition={{ duration: 1.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: '800px' }}
      >
        <span
          className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] tracking-tight glow-text-emerald"
          style={{
            background: 'linear-gradient(135deg, #34d399 0%, #2dd4bf 30%, #d4956a 70%, #e8a87c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dorée
        </span>
      </motion.h1>

      {/* Animated divider */}
      <motion.div
        className="flex items-center justify-center gap-4 mt-8 md:mt-10 mb-6"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={show ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-20 md:w-32 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.emerald}50)` }} />
        <motion.div
          className="w-2.5 h-2.5 rotate-45"
          style={{ background: C.emerald, boxShadow: `0 0 12px ${C.emerald}40` }}
          animate={{ scale: [1, 1.3, 1], rotate: [45, 90, 45] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="w-8 h-px" style={{ background: C.copper }} />
        <motion.div
          className="w-2 h-2 rotate-45"
          style={{ background: C.copper, boxShadow: `0 0 12px ${C.copper}40` }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
        />
        <div className="w-8 h-px" style={{ background: C.teal }} />
        <div className="w-20 md:w-32 h-px" style={{ background: `linear-gradient(90deg, ${C.emerald}50, transparent)` }} />
      </motion.div>

      {/* Subtitle with transition */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`sub-${currentSlide}`}
          className="text-sm md:text-base lg:text-lg font-light tracking-wider max-w-md leading-relaxed"
          style={{ color: 'rgba(240,236,232,0.6)' }}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {SLIDES[currentSlide].subtitle}
        </motion.p>
      </AnimatePresence>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 mt-8 md:mt-10"
        initial={{ opacity: 0, y: 40 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 2.2, ease: 'easeOut' }}
      >
        <motion.button
          className="group relative px-10 py-4 text-black text-[11px] md:text-xs tracking-[0.25em] uppercase font-bold rounded-xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${C.emerald}, ${C.teal})`,
          }}
          whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${C.emerald}30` }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 flex items-center gap-3">
            Masa Rezervasyonu
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-x-1.5 transition-transform duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </span>
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${C.teal}, #5eead4)`,
            }}
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>

        <motion.a
          href="https://wa.me/905551234567?text=Merhaba%2C%20Le%20Maison%20Dor%C3%A9e%20i%C3%A7in%20rezervasyon%20yapmak%20istiyorum"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-8 py-4 text-[11px] md:text-xs tracking-[0.25em] uppercase font-medium transition-all duration-500 rounded-xl"
          style={{
            border: '1px solid rgba(212,149,106,0.3)',
            color: C.copper,
            background: 'rgba(6,6,9,0.4)',
            backdropFilter: 'blur(10px)',
          }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(212,149,106,0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="group-hover:scale-110 transition-transform duration-300"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp İletişim
        </motion.a>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        className="flex items-center gap-8 md:gap-12 mt-10 md:mt-14 pt-8"
        style={{ borderTop: '1px solid rgba(52,211,153,0.06)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={show ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 2.5, ease: 'easeOut' }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-1"
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="text-xl md:text-2xl font-light glow-text-emerald"
              style={{ color: C.cream }}
            >
              {stat.value}
            </span>
            <span
              className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase font-medium"
              style={{ color: 'rgba(139,139,158,0.4)' }}
            >
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Background Image Slideshow ────────────────────────────────────
function BackgroundSlideshow({ currentSlide }: { currentSlide: number }) {
  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${SLIDES[currentSlide].image})`,
              animation: 'ken-burns 25s ease infinite alternate',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Heavy overlays for readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(6,6,9,0.7) 0%, rgba(6,6,9,0.3) 30%, rgba(6,6,9,0.3) 70%, rgba(6,6,9,0.8) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(6,6,9,0.6) 80%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(6,6,9,0.3) 0%, transparent 50%, rgba(6,6,9,0.3) 100%)',
        }}
      />
    </div>
  );
}

// ─── Floating Rating Badge ─────────────────────────────────────────
function FloatingRatingBadge({ show }: { show: boolean }) {
  return (
    <motion.div
      className="absolute top-28 md:top-32 right-4 md:right-12 z-20 hidden md:block"
      initial={{ opacity: 0, scale: 0, rotate: -10 }}
      animate={show ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.8, delay: 3, type: 'spring', stiffness: 150 }}
    >
      <motion.div
        className="px-6 py-5 rounded-2xl text-center backdrop-blur-xl"
        style={{
          background: 'rgba(6,6,9,0.6)',
          border: '1px solid rgba(52,211,153,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(52,211,153,0.05)',
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center justify-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.svg
              key={star}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill={C.copper}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: star * 0.15 }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </motion.svg>
          ))}
        </div>
        <div className="font-light text-2xl" style={{ color: C.cream }}>
          4.9
        </div>
        <div className="text-[9px] tracking-wider" style={{ color: 'rgba(139,139,158,0.4)' }}>
          2.4K Değerlendirme
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Floating Menu Preview ─────────────────────────────────────────
function FloatingMenuPreview({ show }: { show: boolean }) {
  return (
    <motion.div
      className="absolute bottom-32 md:bottom-24 left-4 md:left-12 z-20 hidden md:block"
      initial={{ opacity: 0, x: -30, scale: 0.9 }}
      animate={show ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 3.3, ease: 'easeOut' }}
    >
      <motion.div
        className="px-6 py-5 rounded-2xl backdrop-blur-xl"
        style={{
          background: 'rgba(6,6,9,0.6)',
          border: '1px solid rgba(212,149,106,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="text-[9px] tracking-[0.4em] uppercase mb-3 font-semibold" style={{ color: C.copper }}>
          Bugünün Menüsü
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            { name: 'Karides Risotto', price: '₺280' },
            { name: 'Wagyu Tataki', price: '₺420' },
            { name: 'Çikolata Fondan', price: '₺160' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-10">
              <span className="text-xs font-light" style={{ color: 'rgba(240,236,232,0.6)' }}>
                {item.name}
              </span>
              <span className="text-xs font-light" style={{ color: C.copper }}>
                {item.price}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(52,211,153,0.06)' }}>
          <span className="text-[10px] tracking-wider font-medium" style={{ color: C.emerald }}>
            Tam Menü →
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Slide Indicators ──────────────────────────────────────────────
function SlideIndicators({ currentSlide }: { currentSlide: number }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2.8 }}
    >
      <div className="flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <motion.button
            key={i}
            className="transition-all duration-700"
            style={{
              width: i === currentSlide ? 40 : 8,
              height: 3,
              background: i === currentSlide
                ? `linear-gradient(90deg, ${C.emerald}, ${C.teal})`
                : 'rgba(139,139,158,0.2)',
              borderRadius: 2,
              boxShadow: i === currentSlide ? `0 0 10px ${C.emerald}30` : 'none',
            }}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
      <span className="text-[10px] tracking-[0.3em] font-light" style={{ color: 'rgba(139,139,158,0.3)' }}>
        <span className="text-base font-light mr-1" style={{ color: C.emerald }}>
          0{currentSlide + 1}
        </span>{' '}
        / 0{SLIDES.length}
      </span>
    </motion.div>
  );
}

// ─── Scroll Indicator ──────────────────────────────────────────────
function ScrollIndicator({ show }: { show: boolean }) {
  return (
    <motion.div
      className="absolute bottom-8 right-8 md:right-12 z-20 hidden lg:flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={show ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 3.5 }}
    >
      <motion.div
        className="w-10 h-16 rounded-full flex items-start justify-center pt-2"
        style={{
          border: '1px solid rgba(52,211,153,0.15)',
          background: 'rgba(6,6,9,0.3)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <motion.div
          className="w-1 h-3 rounded-full origin-top"
          style={{ background: C.emerald }}
          animate={{
            y: [0, 16, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(139,139,158,0.3)' }}>
        Kaydır
      </span>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//   MAIN HERO
// ═══════════════════════════════════════════════════════════════════════
export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden noise-overlay"
      style={{ background: C.dark }}
    >
      {/* ── Background Slideshow ── */}
      <BackgroundSlideshow currentSlide={currentSlide} />

      {/* ── Gradient Blobs ── */}
      <GradientBlobs />

      {/* ── Light Rays ── */}
      <LightRays />

      {/* ── Particles ── */}
      <ParticleField />

      {/* ── Floating Food Images ── */}
      <FloatingFoodOrbs />

      {/* ── Nav Bar ── */}
      <NavBar show={loaded} />

      {/* ── Main Content ── */}
      <motion.div
        className="relative"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <HeroContent show={loaded} currentSlide={currentSlide} />
      </motion.div>

      {/* ── Floating Elements ── */}
      <FloatingRatingBadge show={loaded} />
      <FloatingMenuPreview show={loaded} />
      <SlideIndicators currentSlide={currentSlide} />
      <ScrollIndicator show={loaded} />

      {/* ── Bottom Fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{
          background: `linear-gradient(to top, ${C.dark}, transparent)`,
        }}
      />

      {/* ── Side Accents ── */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-px z-20 hidden lg:block"
        style={{
          background: `linear-gradient(180deg, transparent, ${C.emerald}15 30%, ${C.emerald}25 50%, ${C.emerald}15 70%, transparent)`,
        }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-px z-20 hidden lg:block"
        style={{
          background: `linear-gradient(180deg, transparent, ${C.copper}15 30%, ${C.copper}25 50%, ${C.copper}15 70%, transparent)`,
        }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
      />
    </section>
  );
}

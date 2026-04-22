'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   THE INVITATION — A Dramatic Luxury Bridge Section
   Dark stage-like setting with emerald spotlight glow,
   massive reveal typography, glass preview panels, and
   continuous ambient animations. Completely unique.
   ═══════════════════════════════════════════════════════════════ */

const C = {
  emerald: '#34d399',
  teal: '#2dd4bf',
  copper: '#d4956a',
  rose: '#e8a87c',
  cream: '#f0ece8',
  dark: '#080a10',
  dimText: '#8b8b9e',
};

/* ─── Floating Decorative Dots ─── */
function FloatingDots() {
  const dots = useMemo(() => [
    { x: '8%', y: '18%', size: 6, duration: 7, delay: 0 },
    { x: '88%', y: '12%', size: 5, duration: 8, delay: 1.5 },
    { x: '5%', y: '72%', size: 4, duration: 9, delay: 3 },
    { x: '92%', y: '78%', size: 5, duration: 6.5, delay: 2 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            background: C.emerald,
            boxShadow: `0 0 ${dot.size * 4}px ${C.emerald}30`,
          }}
          animate={{
            y: [0, -18, 6, -12, 0],
            opacity: [0.25, 0.6, 0.2, 0.5, 0.25],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Vertical Curtain Lines ─── */
function CurtainLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left curtain */}
      <motion.div
        className="absolute top-[10%] bottom-[10%] left-[6%] md:left-[10%] w-px"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${C.emerald}20 30%, ${C.teal}15 50%, ${C.emerald}20 70%, transparent 100%)`,
        }}
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Right curtain */}
      <motion.div
        className="absolute top-[10%] bottom-[10%] right-[6%] md:right-[10%] w-px"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${C.copper}20 30%, ${C.rose}15 50%, ${C.copper}20 70%, transparent 100%)`,
        }}
        animate={{ opacity: [0.15, 0.6, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ─── The Welcome Text Block ─── */
function WelcomeBlock() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="text-center relative z-10">
      {/* HOŞGELDİNİZ */}
      <motion.span
        className="block text-[10px] md:text-xs tracking-[0.6em] uppercase font-semibold mb-8 md:mb-12"
        style={{ color: C.emerald }}
        initial={{ opacity: 0, y: 40 }}
        animate={v ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0, ease: 'easeOut' }}
      >
        Hoşgeldiniz
      </motion.span>

      {/* "Le" */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={v ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
      >
        <span
          className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[100] leading-[1.1]"
          style={{ color: C.cream, fontFamily: 'Georgia, serif' }}
        >
          Le
        </span>
      </motion.div>

      {/* "Maison" */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={v ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
      >
        <span
          className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] italic"
          style={{ color: C.teal, fontFamily: 'Georgia, serif' }}
        >
          Maison
        </span>
      </motion.div>

      {/* "Dorée" — gradient */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={v ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
      >
        <span
          className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1]"
          style={{
            background: `linear-gradient(135deg, ${C.emerald}, ${C.copper})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'Georgia, serif',
          }}
        >
          Dorée
        </span>
      </motion.div>

      {/* Ornate Divider */}
      <div className="flex items-center justify-center mt-10 md:mt-14 mb-8 md:mb-10">
        <motion.div
          className="h-px w-16 md:w-28"
          style={{ background: `linear-gradient(90deg, transparent, ${C.emerald}40)`, transformOrigin: 'right center' }}
          initial={{ scaleX: 0 }}
          animate={v ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        />
        {/* Center diamond */}
        <motion.div
          className="mx-4 md:mx-6 w-2 h-2 rotate-45 relative"
          style={{ border: `1px solid ${C.emerald}50` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={v ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
        >
          {/* Glow ring */}
          <motion.div
            className="absolute inset-[-6px] rounded-sm"
            style={{ border: `1px solid ${C.emerald}15` }}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.4, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.div
          className="h-px w-16 md:w-28"
          style={{ background: `linear-gradient(90deg, ${C.emerald}40, transparent)`, transformOrigin: 'left center' }}
          initial={{ scaleX: 0 }}
          animate={v ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        />
      </div>

      {/* Animated glow line */}
      <motion.div
        className="mx-auto h-px max-w-xs md:max-w-md mb-8 md:mb-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${C.emerald}, ${C.copper}, transparent)`,
          transformOrigin: 'center center',
        }}
        initial={{ scaleX: 0 }}
        animate={v ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
      />

      {/* Tagline */}
      <motion.p
        className="text-sm md:text-base lg:text-lg font-light tracking-wide max-w-xl mx-auto leading-relaxed"
        style={{ color: C.dimText, fontFamily: 'Georgia, serif' }}
        initial={{ opacity: 0, y: 30 }}
        animate={v ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
      >
        İstanbul&apos;un kalbinde eşsiz bir gastronomi deneyimi
      </motion.p>
    </div>
  );
}

/* ─── Glass Preview Panels ─── */
function PreviewPanels() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-60px' });

  const WA =
    'https://wa.me/905551234567?text=Merhaba!%20Le%20Maison%20Dor%C3%A9e\'den%20rezervasyon%20yapmak%20istiyorum.';

  const panels = useMemo(
    () => [
      {
        icon: '🔥',
        title: 'Şefin Tasting Menüsü',
        desc: '7 aşamalı özel menü',
        accent: C.emerald,
      },
      {
        icon: '🎵',
        title: 'Canlı Müzik Gecesi',
        desc: 'Cuma & Cumartesi',
        accent: C.copper,
      },
      {
        icon: '🍷',
        title: 'Şarap Eşleştirme',
        desc: 'Sommelier eşliğinde',
        accent: C.teal,
      },
    ],
    [],
  );

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mt-16 md:mt-20">
      {panels.map((panel, i) => (
        <motion.a
          key={panel.title}
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block rounded-2xl p-6 md:p-8 cursor-pointer transition-transform duration-500 hover:scale-[1.03]"
          style={{
            background: 'rgba(12, 14, 22, 0.7)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${panel.accent}15`,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
        >
          {/* Pulsing border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: `0 0 0 1px ${panel.accent}00, 0 0 20px ${panel.accent}00`,
            }}
            animate={{
              boxShadow: [
                `0 0 0 1px ${panel.accent}08, 0 0 20px ${panel.accent}00`,
                `0 0 0 1px ${panel.accent}20, 0 0 30px ${panel.accent}08`,
                `0 0 0 1px ${panel.accent}08, 0 0 20px ${panel.accent}00`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
          />

          {/* Hover radial glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 40%, ${panel.accent}08 0%, transparent 70%)` }}
          />

          {/* Top accent bar */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${panel.accent}50, transparent)` }}
          />

          {/* Icon */}
          <div className="text-3xl mb-5">{panel.icon}</div>

          {/* Title */}
          <h3
            className="text-base md:text-lg font-light tracking-wide mb-2"
            style={{ fontFamily: 'Georgia, serif', color: C.cream }}
          >
            {panel.title}
          </h3>

          {/* Description */}
          <p className="text-xs md:text-sm tracking-wider" style={{ color: C.dimText }}>
            {panel.desc}
          </p>

          {/* Bottom CTA arrow */}
          <div className="mt-5 flex items-center gap-2">
            <span
              className="text-[10px] tracking-[0.15em] uppercase font-medium transition-colors duration-300"
              style={{ color: `${panel.accent}70` }}
            >
              Rezervasyon
            </span>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={panel.accent}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

/* ─── Animated Marquee Strip ─── */
function MarqueeStrip() {
  const words = useMemo(
    () => [
      'Le Maison Dorée',
      '·',
      'Fine Dining',
      '·',
      'İstanbul',
      '·',
      'Tasting Menu',
      '·',
      'Canlı Müzik',
      '·',
      'Şarap Eşleştirme',
      '·',
      'Chef Laurent',
      '·',
      'Gastronomi',
      '·',
      'Özel Etkinlikler',
      '·',
      'Le Maison Dorée',
      '·',
      'Fine Dining',
      '·',
      'İstanbul',
      '·',
      'Tasting Menu',
      '·',
      'Canlı Müzik',
      '·',
      'Şarap Eşleştirme',
      '·',
      'Chef Laurent',
      '·',
      'Gastronomi',
      '·',
      'Özel Etkinlikler',
      '·',
    ],
    [],
  );

  return (
    <div className="relative mt-20 md:mt-28 overflow-hidden">
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-8 z-10 pointer-events-none"
        style={{ background: `linear-gradient(180deg, ${C.dark}, transparent)` }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none"
        style={{ background: `linear-gradient(0deg, ${C.dark}, transparent)` }}
      />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium mx-3 md:mx-5 shrink-0"
            style={{
              color: word === '·' ? `${C.emerald}25` : `${C.dimText}30`,
              fontFamily: 'Georgia, serif',
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN — The Invitation
   ═══════════════════════════════════════════════════════════════ */
export default function HeroMenuBridge() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: C.dark }}
    >
      {/* Radial emerald spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(52,211,153,0.06) 0%, rgba(45,212,191,0.03) 40%, transparent 70%)',
        }}
      />

      {/* Secondary warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 35% at 50% 55%, rgba(212,149,106,0.03) 0%, transparent 60%)',
        }}
      />

      {/* Floating dots */}
      <FloatingDots />

      {/* Curtain lines */}
      <CurtainLines />

      {/* Top edge accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-20"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${C.emerald}18 30%, ${C.teal}12 50%, ${C.copper}18 70%, transparent 95%)`,
        }}
      />
      {/* Bottom edge accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-20"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${C.copper}12 30%, ${C.teal}18 50%, ${C.emerald}12 70%, transparent 95%)`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* The Welcome */}
        <WelcomeBlock />

        {/* Preview Panels */}
        <PreviewPanels />

        {/* Marquee */}
        <MarqueeStrip />
      </div>
    </section>
  );
}

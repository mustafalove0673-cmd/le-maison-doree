'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════
   IMMERSIVE GALLERY BRIDGE — Le Maison Dorée
   Full background images with parallax, 3D tilt cards,
   morphing blobs, floating particles, cinematic transitions.
   NOT simple. NOT plain. Visually rich and dynamic.
   ═══════════════════════════════════════════════════════════════════════ */

const C = {
  emerald: '#34d399',
  teal: '#2dd4bf',
  copper: '#d4956a',
  rose: '#e8a87c',
  cream: '#f0ece8',
  dark: '#060609',
  dimText: '#8b8b9e',
};

const WA = 'https://wa.me/905551234567?text=Merhaba!%20Le%20Maison%20Dor%C3%A9e\'den%20rezervasyon%20yapmak%20istiyorum.';

// ─── Parallax Background Section ──────────────────────────────────
function ParallaxBG() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-[-10%]"
        style={{
          y,
          scale,
          backgroundImage: 'url(/hero-texture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Heavy gradient overlays */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(180deg, #060609 0%, rgba(6,6,9,0.75) 20%, rgba(6,6,9,0.75) 80%, #060609 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(52,211,153,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 30% 60%, rgba(212,149,106,0.03) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}

// ─── Floating Particles ────────────────────────────────────────────
function FloatingParticles() {
  const particles = useMemo(() => [
    { x: '10%', y: '20%', size: 3, dur: 9, delay: 0, color: C.emerald },
    { x: '25%', y: '75%', size: 2, dur: 11, delay: 2, color: C.copper },
    { x: '45%', y: '15%', size: 4, dur: 8, delay: 1, color: C.teal },
    { x: '70%', y: '60%', size: 2, dur: 10, delay: 3, color: C.emerald },
    { x: '85%', y: '30%', size: 3, dur: 12, delay: 1.5, color: C.copper },
    { x: '55%', y: '85%', size: 2, dur: 7, delay: 4, color: C.teal },
    { x: '92%', y: '70%', size: 3, dur: 9, delay: 2.5, color: C.emerald },
    { x: '35%', y: '45%', size: 2, dur: 14, delay: 0.5, color: C.copper },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
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
            boxShadow: `0 0 ${p.size * 5}px ${p.color}30`,
          }}
          animate={{
            y: [0, -25, 8, -18, 0],
            x: [0, 12, -8, 15, 0],
            opacity: [0.15, 0.6, 0.1, 0.4, 0.15],
            scale: [1, 1.4, 0.7, 1.2, 1],
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

// ─── Morphing Gradient Blobs ──────────────────────────────────────
function MorphBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      <motion.div
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] opacity-[0.05]"
        style={{
          background: `radial-gradient(circle, ${C.emerald}, transparent 70%)`,
          borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
        }}
        animate={{
          borderRadius: [
            '42% 58% 70% 30% / 45% 45% 55% 55%',
            '70% 30% 46% 54% / 30% 62% 38% 70%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '42% 58% 70% 30% / 45% 45% 55% 55%',
          ],
          scale: [1, 1.2, 0.9, 1],
          x: [0, 30, -20, 0],
          y: [0, -15, 25, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] opacity-[0.04]"
        style={{
          background: `radial-gradient(circle, ${C.copper}, transparent 70%)`,
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }}
        animate={{
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '50% 60% 30% 40% / 30% 50% 70% 60%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
          scale: [0.9, 1.1, 1, 0.95],
          y: [0, -20, 10, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
    </div>
  );
}

// ─── Image Gallery Cards with 3D Tilt ─────────────────────────────
function ImageGallery() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-80px' });

  const cards = useMemo(() => [
    {
      image: '/hero-hall.jpg',
      title: 'İhtişamlı Salon',
      desc: 'Eşsiz atmosferde unutulmaz anlar',
      accent: C.emerald,
    },
    {
      image: '/hero-chef.jpg',
      title: 'Şefin Mutfağı',
      desc: 'Tutkuyla hazırlanan başyapıtlar',
      accent: C.copper,
    },
    {
      image: '/hero-bar.jpg',
      title: 'Premium Bar',
      desc: 'Özel kokteyller ve şaraplar',
      accent: C.teal,
    },
    {
      image: '/hero-dish.jpg',
      title: 'Sanatsal Tabaklar',
      desc: 'Görsel bir şölen deneyimi',
      accent: C.rose,
    },
  ], []);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto mt-16 md:mt-20 px-4 md:px-8">
      {cards.map((card, i) => (
        <motion.a
          key={card.title}
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-2xl cursor-pointer card-3d"
          style={{
            border: `1px solid ${card.accent}12`,
          }}
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          animate={v ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: i * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Image */}
          <div className="relative h-56 md:h-64 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${card.image})` }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background: `linear-gradient(180deg, transparent 30%, rgba(6,6,9,0.9) 100%)`,
              }}
            />
            {/* Accent glow at bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-20 z-[2]"
              style={{
                background: `linear-gradient(to top, ${card.accent}08, transparent)`,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 z-[3] p-5 md:p-6">
              <motion.div
                className="text-[9px] tracking-[0.4em] uppercase font-semibold mb-2"
                style={{ color: `${card.accent}90` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                KEŞFET
              </motion.div>
              <h3
                className="text-xl md:text-2xl font-light tracking-wide mb-1"
                style={{ fontFamily: 'Georgia, serif', color: C.cream }}
              >
                {card.title}
              </h3>
              <p className="text-xs font-light" style={{ color: 'rgba(240,236,232,0.5)' }}>
                {card.desc}
              </p>
            </div>
          </div>

          {/* Animated border glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-[4]"
            style={{
              boxShadow: `inset 0 0 0 1px ${card.accent}00`,
            }}
            whileHover={{
              boxShadow: `inset 0 0 0 1px ${card.accent}30, 0 0 30px ${card.accent}08`,
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.a>
      ))}
    </div>
  );
}

// ─── Animated Quote Section ───────────────────────────────────────
function AnimatedQuote() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto mt-20 md:mt-28 px-4 md:px-8 text-center">
      {/* Big decorative quotes */}
      <motion.span
        className="block text-6xl md:text-8xl font-extralight leading-none mb-2"
        style={{
          color: C.emerald,
          opacity: 0.15,
          fontFamily: 'Georgia, serif',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={v ? { opacity: 0.15, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0 }}
      >
        &ldquo;
      </motion.span>

      <motion.blockquote
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={v ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <p
          className="text-lg md:text-2xl lg:text-3xl font-extralight tracking-wide leading-relaxed"
          style={{ color: C.cream, fontFamily: 'Georgia, serif' }}
        >
          Her tabak, bir{' '}
          <span
            className="italic glow-text-emerald"
            style={{ color: C.teal }}
          >
            hikaye
          </span>{' '}
          anlatır. Her lokma, yeni bir{' '}
          <span
            className="italic glow-text-copper"
            style={{ color: C.copper }}
          >
            keşif
          </span>
          {' '}dür.
        </p>
      </motion.blockquote>

      {/* Divider under quote */}
      <motion.div
        className="flex items-center justify-center gap-4 mt-8"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={v ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.emerald}40)` }} />
        <motion.div
          className="w-2 h-2 rotate-45"
          style={{ background: C.emerald }}
          animate={{ scale: [1, 1.5, 1], rotate: [45, 135, 225, 315, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="w-20 h-px" style={{ background: `linear-gradient(90deg, ${C.emerald}40, transparent)` }} />
      </motion.div>

      {/* Signature */}
      <motion.p
        className="mt-4 text-xs tracking-[0.4em] uppercase font-medium"
        style={{ color: 'rgba(139,139,158,0.4)' }}
        initial={{ opacity: 0 }}
        animate={v ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        Chef Laurent Dubois
      </motion.p>
    </div>
  );
}

// ─── Feature Cards Row ────────────────────────────────────────────
function FeatureCards() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-60px' });

  const features = useMemo(() => [
    { icon: '🔥', title: 'Şefin Tasting Menüsü', desc: '7 aşamalı özel menü', accent: C.emerald, image: '/menu-steak.jpg' },
    { icon: '🎵', title: 'Canlı Müzik Gecesi', desc: 'Cuma & Cumartesi', accent: C.copper, image: '/hero-bar.jpg' },
    { icon: '🍷', title: 'Şarap Eşleştirme', desc: 'Sommelier eşliğinde', accent: C.teal, image: '/menu-wine.jpg' },
  ], []);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto mt-16 md:mt-20 px-4 md:px-8">
      {features.map((feat, i) => (
        <motion.a
          key={feat.title}
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl cursor-pointer"
          style={{
            background: 'rgba(10,12,20,0.8)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${feat.accent}10`,
          }}
          initial={{ opacity: 0, y: 40, rotateY: -5 }}
          animate={v ? { opacity: 1, y: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            scale: 1.03,
            boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${feat.accent}08`,
          }}
        >
          {/* Top image strip */}
          <div className="relative h-24 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${feat.image})`,
                filter: 'blur(1px) brightness(0.5)',
              }}
              animate={{ scale: [1, 1.1, 1], x: [0, 5, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent, rgba(10,12,20,0.9))`,
              }}
            />
            {/* Glow accent */}
            <motion.div
              className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${feat.accent}60, transparent)` }}
              animate={{ scaleX: [0.5, 1.5, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-5 md:p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{feat.icon}</span>
              <h3
                className="text-base md:text-lg font-light tracking-wide"
                style={{ fontFamily: 'Georgia, serif', color: C.cream }}
              >
                {feat.title}
              </h3>
            </div>
            <p className="text-xs font-light" style={{ color: C.dimText }}>
              {feat.desc}
            </p>

            {/* CTA */}
            <div className="mt-4 flex items-center gap-2">
              <span
                className="text-[10px] tracking-[0.15em] uppercase font-medium"
                style={{ color: `${feat.accent}70` }}
              >
                Rezervasyon
              </span>
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={feat.accent}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </motion.svg>
            </div>
          </div>

          {/* Pulsing border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: `0 0 0 1px ${feat.accent}00`,
            }}
            animate={{
              boxShadow: [
                `0 0 0 1px ${feat.accent}05, 0 0 20px ${feat.accent}00`,
                `0 0 0 1px ${feat.accent}15, 0 0 30px ${feat.accent}06`,
                `0 0 0 1px ${feat.accent}05, 0 0 20px ${feat.accent}00`,
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 1.2 }}
          />
        </motion.a>
      ))}
    </div>
  );
}

// ─── Animated Marquee Strip ────────────────────────────────────────
function MarqueeStrip() {
  const words = useMemo(() => [
    'Le Maison Dorée', '·', 'Fine Dining', '·', 'İstanbul', '·', 'Tasting Menu', '·',
    'Canlı Müzik', '·', 'Şarap Eşleştirme', '·', 'Chef Laurent', '·', 'Gastronomi', '·',
    'Özel Etkinlikler', '·', 'Le Maison Dorée', '·', 'Fine Dining', '·', 'İstanbul', '·',
    'Tasting Menu', '·', 'Canlı Müzik', '·', 'Şarap Eşleştirme', '·', 'Chef Laurent', '·',
    'Gastronomi', '·', 'Özel Etkinlikler', '·',
  ], []);

  return (
    <div className="relative mt-20 md:mt-28 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-8 z-10 pointer-events-none"
        style={{ background: `linear-gradient(180deg, ${C.dark}, transparent)` }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none"
        style={{ background: `linear-gradient(0deg, ${C.dark}, transparent)` }}
      />

      {/* Marquee line 1 */}
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        {words.map((word, i) => (
          <span
            key={`a-${i}`}
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium mx-4 md:mx-6 shrink-0"
            style={{
              color: word === '·' ? `${C.emerald}20` : `${C.dimText}25`,
              fontFamily: 'Georgia, serif',
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>

      {/* Marquee line 2 — reversed */}
      <motion.div
        className="flex whitespace-nowrap mt-2"
        animate={{ x: ['-50%', '0%'] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        {words.map((word, i) => (
          <span
            key={`b-${i}`}
            className="text-[9px] tracking-[0.5em] uppercase font-light mx-4 md:mx-6 shrink-0"
            style={{
              color: word === '·' ? `${C.copper}15` : `${C.dimText}15`,
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

// ═══════════════════════════════════════════════════════════════════════
//   MAIN BRIDGE
// ═══════════════════════════════════════════════════════════════════════
export default function HeroMenuBridge() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 noise-overlay" style={{ background: C.dark }}>
      {/* ── Parallax Background Image ── */}
      <ParallaxBG />

      {/* ── Morphing Blobs ── */}
      <MorphBlobs />

      {/* ── Floating Particles ── */}
      <FloatingParticles />

      {/* ── Edge accent lines ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-20"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${C.emerald}20 30%, ${C.teal}10 50%, ${C.copper}20 70%, transparent 95%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-20"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${C.copper}15 30%, ${C.emerald}20 50%, ${C.teal}15 70%, transparent 95%)`,
        }}
      />

      {/* ── Light rays ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <motion.div
          className="absolute top-0 left-[30%] w-[1px] h-full"
          style={{
            background: `linear-gradient(180deg, transparent, ${C.emerald}15, transparent)`,
            transform: 'skewX(-10deg)',
          }}
          animate={{ x: [-15, 15, -15], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-[25%] w-[1px] h-full"
          style={{
            background: `linear-gradient(180deg, transparent, ${C.copper}10, transparent)`,
            transform: 'skewX(12deg)',
          }}
          animate={{ x: [10, -10, 10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* Image Gallery */}
        <ImageGallery />

        {/* Animated Quote */}
        <AnimatedQuote />

        {/* Feature Cards */}
        <FeatureCards />

        {/* Marquee */}
        <MarqueeStrip />
      </div>
    </section>
  );
}

'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   REDESIGNED BRIDGE — Cinematic Parallax Light & Typography
   Deep obsidian background with flowing emerald/teal light beams,
   large reveal typography, and elegant horizontal feature cards.
   Completely different from the old film-strip style.
   ═══════════════════════════════════════════════════════════════ */

const C = {
  emerald: '#34d399',
  teal: '#2dd4bf',
  copper: '#d4956a',
  rose: '#e8a87c',
  cream: '#f0ece8',
  dark: '#0a0a10',
  dimText: '#8b8b9e',
};

/* ─── Flowing Light Beams ─── */
function LightBeams() {
  const beams = useMemo(() => [
    { x: '10%', angle: -15, width: 300, color: 'rgba(52,211,153,0.04)', dur: 12 },
    { x: '35%', angle: 10, width: 250, color: 'rgba(45,212,191,0.03)', dur: 16 },
    { x: '65%', angle: -8, width: 350, color: 'rgba(212,149,106,0.03)', dur: 14 },
    { x: '85%', angle: 5, width: 200, color: 'rgba(52,211,153,0.03)', dur: 18 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beams.map((beam, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: beam.x,
            top: '-20%',
            width: beam.width,
            height: '140%',
            background: `linear-gradient(${beam.angle}deg, transparent 40%, ${beam.color} 50%, transparent 60%)`,
            transformOrigin: 'top center',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            x: [0, 30, -20, 10, 0],
          }}
          transition={{ duration: beam.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
        />
      ))}
    </div>
  );
}

/* ─── Particle Field ─── */
function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (Math.sin(i * 7.3) * 0.5 + 0.5) * 100,
      y: (Math.cos(i * 5.1) * 0.5 + 0.5) * 100,
      size: (i % 4) * 0.5 + 0.5,
      duration: (i % 8) + 6,
      delay: (i % 5),
      color: i % 3 === 0 ? C.emerald : i % 3 === 1 ? C.teal : C.copper,
    })), []);

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
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}40`,
          }}
          animate={{
            y: [0, -25, 8, -15, 0],
            opacity: [0.2, 0.6, 0.1, 0.5, 0.2],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Large Reveal Quote ─── */
function RevealQuote() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div ref={ref} className="text-center px-6 py-8 md:py-12"
      initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}} transition={{ duration: 1.2 }}>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={v ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative inline-block"
      >
        {/* Large decorative quotation mark */}
        <div className="absolute -top-10 -left-6 text-7xl md:text-8xl select-none" style={{ color: `${C.emerald}12`, fontFamily: 'Georgia, serif' }}>&ldquo;</div>

        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-wide leading-relaxed max-w-3xl mx-auto"
          style={{ fontFamily: 'Georgia, serif', color: C.cream, fontStyle: 'italic' }}>
          Yemek sadece yemek değildir;{' '}
          <span style={{ color: C.emerald }}>bir hikaye anlatır</span>
          , bir anı yaşatır, bir duyguyu{' '}
          <span style={{ color: C.copper }}>hissettirir</span>.
        </p>

        <div className="absolute -bottom-10 -right-6 text-7xl md:text-8xl select-none" style={{ color: `${C.copper}12`, fontFamily: 'Georgia, serif' }}>&rdquo;</div>
      </motion.div>

      <motion.div
        className="mt-12 flex items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={v ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="w-8 h-px" style={{ background: `${C.emerald}25` }} />
        <div className="w-2 h-2 rotate-45" style={{ background: C.emerald, opacity: 0.3 }} />
        <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: `${C.copper}60` }}>Chef Laurent Dubois</span>
        <div className="w-2 h-2 rotate-45" style={{ background: C.emerald, opacity: 0.3 }} />
        <div className="w-8 h-px" style={{ background: `${C.emerald}25` }} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Horizontal Feature Cards ─── */
function FeatureCards() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-60px' });

  const features = [
    {
      title: 'Özel Menü',
      desc: '7 aşamalı şef menüsü',
      icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
      accent: C.emerald,
    },
    {
      title: 'Canlı Müzik',
      desc: 'Cuma & Cumartesi geceleri',
      icon: 'M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z',
      accent: C.copper,
    },
    {
      title: 'Şarap Eşleştirme',
      desc: 'Sommelier eşliğinde deneyim',
      icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-.693L5 14.5',
      accent: C.teal,
    },
    {
      title: 'Özel Etkinlikler',
      desc: 'Doğum günü & kutlamalar',
      icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
      accent: C.rose,
    },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4 md:px-8 max-w-5xl mx-auto py-6 md:py-8">
      {features.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={v ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="group relative"
        >
          <div
            className="relative p-5 md:p-6 rounded-2xl text-center transition-all duration-500 cursor-pointer overflow-hidden"
            style={{
              background: 'rgba(10,10,16,0.6)',
              border: `1px solid ${f.accent}10`,
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${f.accent}25`;
              (e.currentTarget as HTMLDivElement).style.background = `rgba(10,10,16,0.8)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${f.accent}10`;
              (e.currentTarget as HTMLDivElement).style.background = 'rgba(10,10,16,0.6)';
            }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at center, ${f.accent}06 0%, transparent 70%)` }} />

            {/* Icon */}
            <motion.div
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: `${f.accent}08`, border: `1px solid ${f.accent}15` }}
              animate={{ boxShadow: [`0 0 0 0 ${f.accent}10`, `0 0 0 8px ${f.accent}00`, `0 0 0 0 ${f.accent}10`] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={f.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d={f.icon} />
              </svg>
            </motion.div>

            {/* Title */}
            <h3 className="text-sm md:text-base font-light tracking-wide mb-1" style={{ fontFamily: 'Georgia, serif', color: C.cream }}>
              {f.title}
            </h3>

            {/* Subtitle */}
            <p className="text-[11px] font-light tracking-wider" style={{ color: 'rgba(139,139,158,0.5)' }}>
              {f.desc}
            </p>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-px transition-all duration-700"
              style={{ background: `linear-gradient(90deg, transparent, ${f.accent}40, transparent)` }} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Animated Counter Row ─── */
function CounterRow() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-40px' });

  const stats = [
    { value: '12+', label: 'Yıllık Deneyim', accent: C.emerald },
    { value: '50K+', label: 'Mutlu Misafir', accent: C.teal },
    { value: '200+', label: 'Özel Menü Ürünü', accent: C.copper },
    { value: '4.9', label: 'Ortalama Puan', accent: C.rose },
  ];

  return (
    <div ref={ref} className="flex flex-wrap items-center justify-center gap-6 md:gap-12 py-6 md:py-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="flex items-center gap-3 md:gap-4"
          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
          animate={v ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-light" style={{ color: stat.accent }}>{stat.value}</span>
            <span className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium mt-1" style={{ color: 'rgba(139,139,158,0.4)' }}>{stat.label}</span>
          </div>
          {i < stats.length - 1 && (
            <div className="w-px h-10" style={{ background: `${stat.accent}15` }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Horizontal Divider with animated glow ─── */
function GlowDivider() {
  return (
    <div className="relative flex items-center justify-center py-2">
      <div className="h-px flex-1 max-w-[200px]" style={{ background: `linear-gradient(90deg, transparent, ${C.emerald}15)` }} />
      <motion.div
        className="w-3 h-3 rounded-full"
        style={{ border: `1px solid ${C.emerald}20`, background: `${C.emerald}08` }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="h-px flex-1 max-w-[200px]" style={{ background: `linear-gradient(90deg, ${C.emerald}15, transparent)` }} />
    </div>
  );
}

/* ─── CTA Buttons ─── */
function CTARow() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <a href="#menu"
        className="group relative px-8 py-3.5 overflow-hidden rounded-xl text-[10px] tracking-[0.25em] uppercase font-semibold transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${C.emerald}18, ${C.teal}10)`,
          border: `1px solid ${C.emerald}25`,
          color: C.emerald,
        }}>
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Menüyü İncele</span>
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(135deg, ${C.emerald}, ${C.teal})` }} />
      </a>
      <a href="https://wa.me/905551234567?text=Merhaba!%20Le%20Maison%20Dor%C3%A9e'den%20rezervasyon%20yapmak%20istiyorum."
        target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-500"
        style={{ border: `1px solid ${C.copper}15`, color: `${C.copper}80` }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span>Rezervasyon</span>
      </a>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN BRIDGE
   ═══════════════════════════════════════════════════ */
export default function HeroMenuBridge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={containerRef} className="relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${C.dark} 0%, #0c0c14 30%, #0e0e18 50%, #0c0c14 70%, ${C.dark} 100%)` }}>

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', mixBlendMode: 'overlay'
        }} />

      {/* Light beams */}
      <LightBeams />

      {/* Particles */}
      <ParticleField />

      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.emerald}20, ${C.teal}15, ${C.copper}10, transparent)` }} />
      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.copper}10, ${C.teal}15, ${C.emerald}20, transparent)` }} />

      {/* Content with parallax */}
      <motion.div className="relative z-10" style={{ y: parallaxY }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">

          {/* Section heading */}
          <motion.div className="text-center mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}>
            <span className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-medium" style={{ color: `${C.emerald}50` }}>
              ✦ Le Maison Dorée ✦
            </span>
          </motion.div>

          {/* Large Quote */}
          <RevealQuote />

          {/* Glow Divider */}
          <GlowDivider />

          {/* Feature Cards */}
          <FeatureCards />

          {/* Counter Row */}
          <CounterRow />

          {/* Glow Divider */}
          <GlowDivider />

          {/* CTA */}
          <CTARow />
        </div>
      </motion.div>
    </section>
  );
}

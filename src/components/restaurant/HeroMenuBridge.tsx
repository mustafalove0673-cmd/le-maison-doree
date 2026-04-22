'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   CINEMATIC BRIDGE — Film-strip inspired, dark leather & gold
   Completely different from the old promo card style.
   Vertical scrolling film frames with parallax, gradient
   overlays, and morphing geometric animations.
   ═══════════════════════════════════════════════════════════════ */

const FILM_FRAMES = [
  { title: 'Başlangıçlar', sub: 'Lezzet yolculuğunuz burada başlar', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
  { title: 'Ara Sıcaklar', sub: 'Tutku dolu ara lezzetler', icon: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6M8.638 5.214A8.252 8.252 0 0012 3a8.25 8.25 0 006.962 2.214' },
  { title: 'Ana Yemek', sub: 'Şefimizin başyapıtları', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
  { title: 'Tatlılar', sub: 'Şekere yenik düşün', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z' },
  { title: 'İçecekler', sub: 'Özel kokteyl ve şarap koleksiyonu', icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-.693L5 14.5' },
];

const SCROLL_TEXT = 'LE MAISON DORÉE  ◆  FINE DINING  ◆  İSTANBUL  ◆  BEYOĞLU  ◆  MICHELIN  ◆  TASTING MENU  ◆  WINE PAIRING  ◆  COCKTAIL BAR  ◆  ';

/* ─── Morphing Shape ─── */
function MorphShape({ className = '' }: { className?: string }) {
  return (
    <motion.div className={`absolute pointer-events-none ${className}`}
      animate={{
        borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%', '50% 50% 30% 70% / 40% 60% 70% 30%'],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}>
      <div className="w-full h-full" style={{ background: 'conic-gradient(from 0deg, rgba(217,119,6,0.06), rgba(180,83,9,0.03), rgba(146,64,14,0.06), rgba(180,83,9,0.03), rgba(217,119,6,0.06))' }} />
    </motion.div>
  );
}

/* ─── Single Film Frame ─── */
function FilmFrame({ frame, index }: { frame: typeof FILM_FRAMES[0]; index: number }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-80px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60, rotateY: isEven ? -8 : 8 }}
      animate={v ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 w-[220px] md:w-[280px] relative group"
    >
      {/* Frame border — film perforations */}
      <div className="relative rounded-lg overflow-hidden"
        style={{ background: 'linear-gradient(145deg, rgba(20,12,5,0.95), rgba(10,6,2,0.98))', border: '1px solid rgba(217,119,6,0.12)' }}>

        {/* Top film holes */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-3 py-1.5 pointer-events-none z-10"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6), transparent)' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1.5 h-2.5 rounded-[1px]" style={{ background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.08)' }} />
          ))}
        </div>

        {/* Bottom film holes */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-3 py-1.5 pointer-events-none z-10"
          style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.6), transparent)' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-1.5 h-2.5 rounded-[1px]" style={{ background: 'rgba(217,119,6,0.15)', border: '1px solid rgba(217,119,6,0.08)' }} />
          ))}
        </div>

        {/* Content */}
        <div className="px-5 py-10 flex flex-col items-center text-center">
          {/* Icon with pulsing ring */}
          <motion.div className="relative w-16 h-16 rounded-full flex items-center justify-center mb-5"
            animate={{ boxShadow: ['0 0 0 0 rgba(217,119,6,0.1)', '0 0 0 12px rgba(217,119,6,0)', '0 0 0 0 rgba(217,119,6,0.1)'] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
            style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.12)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(217,119,6,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d={frame.icon} />
            </svg>
            {/* Small orbiting dot */}
            <motion.div className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
              style={{ background: 'rgba(217,119,6,0.7)', boxShadow: '0 0 6px rgba(217,119,6,0.4)' }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }} />
          </motion.div>

          {/* Title */}
          <h3 className="text-base md:text-lg font-light text-amber-100/90 tracking-wide mb-1.5" style={{ fontFamily: 'Georgia, serif' }}>
            {frame.title}
          </h3>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(217,119,6,0.3))' }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(217,119,6,0.3)' }} />
            <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, rgba(217,119,6,0.3), transparent)' }} />
          </div>

          {/* Subtitle */}
          <p className="text-amber-800/60 text-[11px] font-light tracking-wider leading-relaxed">{frame.sub}</p>

          {/* Frame number */}
          <div className="absolute top-3 right-3">
            <span className="text-amber-900/30 text-[9px] tracking-[0.2em] font-mono">{String(index + 1).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(217,119,6,0.05) 0%, transparent 70%)' }} />
      </div>
    </motion.div>
  );
}

/* ─── Vertical Film Strip (Desktop) ─── */
function VerticalFilmStrip() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="hidden lg:flex gap-5 items-center justify-center overflow-hidden py-10">
      {FILM_FRAMES.map((frame, i) => (
        <motion.div
          key={frame.title}
          initial={{ opacity: 0, y: 40 }}
          animate={v ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0"
          style={{ transform: `rotate(${(i % 2 === 0 ? -2 : 2)}deg)` }}
        >
          <FilmFrame frame={frame} index={i} />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Horizontal Scrolling Carousel (Mobile/Tablet) ─── */
function HorizontalFilmStrip() {
  return (
    <div className="lg:hidden overflow-hidden py-4">
      <div className="flex gap-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {FILM_FRAMES.map((frame, i) => (
          <div key={frame.title} className="snap-center flex-shrink-0" style={{ transform: `rotate(${(i % 2 === 0 ? -1.5 : 1.5)}deg)` }}>
            <FilmFrame frame={frame} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Center Accent Line ─── */
function AccentLine() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div ref={ref} className="flex items-center justify-center gap-4 py-6 md:py-8"
      initial={{ opacity: 0, scaleX: 0 }} animate={v ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
      <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(217,119,6,0.25))' }} />
      <motion.div className="w-2 h-2 rotate-45" style={{ background: 'rgba(217,119,6,0.4)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }} />
      <div className="w-3 h-3 rounded-full border" style={{ borderColor: 'rgba(217,119,6,0.2)', background: 'rgba(217,119,6,0.05)' }} />
      <motion.div className="w-2 h-2 rotate-45" style={{ background: 'rgba(217,119,6,0.4)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }} />
      <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(90deg, rgba(217,119,6,0.25), transparent)' }} />
    </motion.div>
  );
}

/* ─── Quote Section ─── */
function QuoteSection() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} className="text-center px-6 py-4"
      initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <motion.blockquote className="relative inline-block" style={{ fontFamily: 'Georgia, serif' }}>
        <span className="text-amber-700/20 text-5xl absolute -top-5 -left-4 select-none">&ldquo;</span>
        <p className="text-amber-100/60 text-lg md:text-xl lg:text-2xl font-light italic tracking-wide leading-relaxed max-w-2xl mx-auto pl-4">
          Yemek sadece yemek değildir; bir hikaye anlatır, bir anı yaşatır, bir duyguyu hissettirir.
        </p>
        <span className="text-amber-700/20 text-5xl absolute -bottom-6 -right-4 select-none">&rdquo;</span>
      </motion.blockquote>
      <motion.div className="mt-4 flex items-center justify-center gap-3"
        initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
        <div className="w-6 h-px" style={{ background: 'rgba(217,119,6,0.2)' }} />
        <span className="text-amber-800/40 text-[10px] tracking-[0.3em] uppercase">Chef Laurent Dubois</span>
        <div className="w-6 h-px" style={{ background: 'rgba(217,119,6,0.2)' }} />
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN BRIDGE
   ═══════════════════════════════════════════════════ */
export default function HeroMenuBridge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000 0%, #0c0804 15%, #0a0603 50%, #0c0804 85%, #000 100%)' }}>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', mixBlendMode: 'overlay'
        }} />

      {/* Morphing background shapes */}
      <MorphShape className="top-[-80px] left-[-60px] w-[300px] h-[300px] opacity-60" />
      <MorphShape className="bottom-[-100px] right-[-80px] w-[350px] h-[350px] opacity-40"
        style={{ animationDelay: '-7s' } as React.CSSProperties} />

      {/* Top marquee */}
      <div className="relative overflow-hidden py-3 border-y" style={{ borderColor: 'rgba(217,119,6,0.06)' }}>
        <motion.div className="flex whitespace-nowrap" animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
          {[0, 1, 2].map(i => (
            <span key={i} className="text-[10px] tracking-[0.4em] uppercase text-amber-900/25 font-light select-none mx-2">
              {SCROLL_TEXT}
            </span>
          ))}
        </motion.div>
        {/* Glowing scan line */}
        <motion.div className="absolute top-0 left-0 h-full w-24 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(217,119,6,0.08), transparent)' }}
          animate={{ x: ['-96px', 'calc(100% + 96px)'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />
      </div>

      {/* Main content with parallax */}
      <motion.div className="relative z-10" style={{ y: parallaxY }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">

          {/* Film strips */}
          <VerticalFilmStrip />
          <HorizontalFilmStrip />

          {/* Accent line */}
          <AccentLine />

          {/* Quote */}
          <QuoteSection />

          {/* Second accent line */}
          <AccentLine />

          {/* Bottom CTA */}
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6 }}>
            <a href="#menu"
              className="group relative px-8 py-3 overflow-hidden rounded-md text-[10px] tracking-[0.25em] uppercase font-semibold transition-all duration-500"
              style={{ background: 'linear-gradient(135deg, rgba(217,119,6,0.15), rgba(180,83,9,0.1))', border: '1px solid rgba(217,119,6,0.2)', color: 'rgba(217,119,6,0.9)' }}>
              <span className="relative z-10 group-hover:text-amber-100 transition-colors duration-300">Menüyü İncele</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, rgba(217,119,6,0.3), rgba(180,83,9,0.2))' }} />
            </a>
            <a href="https://wa.me/905551234567?text=Merhaba!%20Le%20Maison%20Dor%C3%A9e'den%20rezervasyon%20yapmak%20istiyorum."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-md text-[10px] tracking-[0.25em] uppercase font-medium transition-all duration-500"
              style={{ border: '1px solid rgba(217,119,6,0.1)', color: 'rgba(217,119,6,0.5)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="group-hover:text-amber-600 transition-colors">Rezervasyon</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom marquee (reverse) */}
      <div className="relative overflow-hidden py-3 border-y" style={{ borderColor: 'rgba(217,119,6,0.06)' }}>
        <motion.div className="flex whitespace-nowrap" animate={{ x: ['0%', '50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}>
          {[0, 1, 2].map(i => (
            <span key={i} className="text-[10px] tracking-[0.4em] uppercase text-amber-900/20 font-light select-none mx-2">
              REZERVASYON  ◆  ÖZEL ETKİNLİKLER  ◆  ŞARAP EŞLEŞTİRMESİ  ◆  COCKTAIL BAR  ◆  BEYOĞLU  ◆  İSTANBUL  ◆  LE MAISON DORÉE  ◆
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

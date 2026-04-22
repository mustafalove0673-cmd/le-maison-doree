'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   HERO → MENU TRANSITION BANNER
   Fills the empty gap between hero and menu sections
   with animated promotional content, scrolling text,
   decorative shapes, and eye-catching stats.
   ═══════════════════════════════════════════════════════════════ */

function Diamond({ size = 8, color = 'rgba(245,158,11,0.4)' }: { size?: number; color?: string }) {
  return <div style={{ width: size, height: size, transform: 'rotate(45deg)', background: color, borderRadius: 1, flexShrink: 0 }} />;
}

/* ─── Parallax Background Shapes ─── */
function FloatingShapes() {
  const shapes = useMemo(() => [
    { x: '5%',  y: '15%', size: 100, dur: 20, color: 'rgba(245,158,11,0.03)' },
    { x: '85%', y: '25%', size: 60,  dur: 15, color: 'rgba(245,158,11,0.04)' },
    { x: '50%', y: '70%', size: 140, dur: 25, color: 'rgba(255,255,255,0.015)' },
    { x: '15%', y: '80%', size: 8,   dur: 8,  color: 'rgba(245,158,11,0.2)' },
    { x: '90%', y: '65%', size: 6,   dur: 10, color: 'rgba(255,255,255,0.12)' },
    { x: '70%', y: '10%', size: 5,   dur: 7,  color: 'rgba(245,158,11,0.15)' },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: s.x, top: s.y, width: s.size, height: s.size, background: s.color }}
          animate={{ y: [0, -20, 10, -15, 0], x: [0, 10, -8, 5, 0], scale: [1, 1.1, 0.95, 1.05, 1] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Scrolling Marquee Row ─── */
function MarqueeRow({ text, speed = 25, reverse = false, className = '' }: {
  text: string; speed?: number; reverse?: boolean; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1, 2].map(i => (
          <span key={i} className="text-[11px] md:text-xs tracking-[0.35em] uppercase text-white/[0.07] font-light select-none">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Animated Counter ─── */
function AnimatedStat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      <motion.span className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white tracking-tight"
        style={{ fontFamily: 'Georgia, serif' }}
        initial={{ opacity: 0 }}
        animate={v ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}>
        {value}{suffix}
      </motion.span>
      <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/25 font-medium mt-1">{label}</span>
    </motion.div>
  );
}

/* ─── Glowing Line Separator ─── */
function GlowLine({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full h-px ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      <motion.div className="absolute inset-0 h-full"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.8) 50%, transparent 100%)', width: '120px' }}
        animate={{ x: ['-120px', 'calc(100% + 120px)'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
    </div>
  );
}

/* ─── Center Promotional Block ─── */
function PromoBlock() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-60px' });

  const features = [
    { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', text: 'Michelin Yıldızlı' },
    { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Premium Malzemeler' },
    { icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z', text: 'Yenilikçi Lezzetler' },
    { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', text: 'Tutkuyla Hazırlanır' },
  ];

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={v ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-4xl mx-auto">
      {/* Main card */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl"
        style={{
          background: 'linear-gradient(160deg, rgba(26,15,5,0.95) 0%, rgba(10,8,4,0.98) 40%, rgba(26,15,5,0.95) 100%)',
          border: '1px solid rgba(245,158,11,0.08)',
          boxShadow: '0 0 80px rgba(245,158,11,0.03), 0 0 160px rgba(0,0,0,0.5)',
        }}>

        {/* Animated corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none">
          <div className="absolute top-3 left-3 w-8 h-px bg-gradient-to-r from-amber-400/20 to-transparent" />
          <div className="absolute top-3 left-3 h-8 w-px bg-gradient-to-b from-amber-400/20 to-transparent" />
          <motion.div className="absolute top-[11px] left-[11px]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}>
            <Diamond size={4} color="rgba(245,158,11,0.5)" />
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none">
          <div className="absolute top-3 right-3 w-8 h-px bg-gradient-to-l from-amber-400/20 to-transparent" />
          <div className="absolute top-3 right-3 h-8 w-px bg-gradient-to-b from-amber-400/20 to-transparent" />
          <motion.div className="absolute top-[11px] right-[11px]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}>
            <Diamond size={4} color="rgba(245,158,11,0.5)" />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none">
          <div className="absolute bottom-3 left-3 w-8 h-px bg-gradient-to-r from-amber-400/20 to-transparent" />
          <div className="absolute bottom-3 left-3 h-8 w-px bg-gradient-to-t from-amber-400/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none">
          <div className="absolute bottom-3 right-3 w-8 h-px bg-gradient-to-l from-amber-400/20 to-transparent" />
          <div className="absolute bottom-3 right-3 h-8 w-px bg-gradient-to-t from-amber-400/20 to-transparent" />
        </div>

        {/* Pulsing radial glow */}
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="relative z-10 px-6 py-10 md:px-12 md:py-14">

          {/* Top badge */}
          <motion.div className="flex justify-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full"
              style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.12)' }}>
              <Diamond size={5} color="rgba(245,158,11,0.5)" />
              <span className="text-amber-400/70 text-[9px] tracking-[0.4em] uppercase font-medium">Sizin İçin Özel</span>
              <Diamond size={5} color="rgba(245,158,11,0.5)" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight mb-3"
            style={{ fontFamily: 'Georgia, serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Her Tabak Bir
            <span className="block mt-1">
              <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent italic">
                Başyapıt
              </span>
            </span>
          </motion.h2>

          <motion.p className="text-center text-white/35 text-sm md:text-base font-light tracking-wider max-w-md mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={v ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}>
            Şefimizin özenle hazırladığı 50&apos;den fazla özel lezzet sizi bekliyor
          </motion.p>

          {/* Divider */}
          <GlowLine className="mb-8" />

          {/* Features grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {features.map((f, i) => (
              <motion.div key={f.text}
                className="flex flex-col items-center gap-2.5 py-4 px-3 rounded-xl text-center"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                initial={{ opacity: 0, y: 15 }}
                animate={v ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.1)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={f.icon} />
                  </svg>
                </div>
                <span className="text-white/50 text-[10px] tracking-[0.15em] uppercase font-medium leading-snug">{f.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Row */}
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={v ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}>
            <a href="#menu"
              className="group relative px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 text-black text-[10px] tracking-[0.25em] uppercase font-semibold hover:from-amber-500 hover:to-amber-400 transition-all duration-500 rounded-lg overflow-hidden">
              <span className="relative z-10">Menüyü Keşfet</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
            <a href="https://wa.me/905551234567?text=Merhaba!%20Le%20Maison%20Dor%C3%A9e'den%20rezervasyon%20yapmak%20istiyorum."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/10 text-white/60 text-[10px] tracking-[0.25em] uppercase font-medium hover:border-[#25D366]/30 hover:text-[#4ADE80] transition-all duration-500"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Rezervasyon
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function HeroMenuBridge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={containerRef} className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000 0%, #050505 20%, #0a0806 50%, #050505 80%, #000 100%)' }}>

      {/* Background effects */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: bgOpacity }}>
        <FloatingShapes />
      </motion.div>

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
        <motion.div className="absolute top-0 h-full w-32"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)' }}
          animate={{ x: ['-128px', 'calc(100% + 128px)'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
      </div>

      {/* Marquee band - top */}
      <div className="pt-6 md:pt-8">
        <MarqueeRow
          text="LE MAISON DORÉE  ✦  FINE DINING  ✦  MICHELIN STAR  ✦  TASTING MENU  ✦  WINE PAIRING  ✦  PRIVATE EVENTS  ✦  CHEF'S TABLE  ✦  ISTANBUL  ✦  "
          speed={35}
        />
      </div>

      {/* Stats row */}
      <div className="py-8 md:py-10">
        <motion.div className="flex items-center justify-center gap-8 md:gap-16 lg:gap-24 px-4" style={{ y: contentY }}>
          <AnimatedStat value={12} suffix="+" label="Yıl Deneyim" />
          <div className="hidden sm:flex flex-col items-center gap-2">
            <Diamond size={6} color="rgba(245,158,11,0.25)" />
            <div className="w-px h-8 bg-gradient-to-b from-amber-400/15 to-transparent" />
          </div>
          <AnimatedStat value={50} suffix="+" label="Özel Lezzet" />
          <div className="hidden sm:flex flex-col items-center gap-2">
            <Diamond size={6} color="rgba(245,158,11,0.25)" />
            <div className="w-px h-8 bg-gradient-to-b from-amber-400/15 to-transparent" />
          </div>
          <AnimatedStat value={5} suffix="★" label="Michelin Yıldız" />
        </motion.div>
      </div>

      {/* Promotional Block */}
      <div className="px-4 md:px-8 pb-8 md:pb-10">
        <PromoBlock />
      </div>

      {/* Marquee band - bottom (reverse direction) */}
      <div className="pb-6 md:pb-8">
        <MarqueeRow
          text="REZERVASYON  ✦  ÖZEL ETKİNLİKLER  ✦  ŞARAP EŞLEŞTİRMESİ  ✦  ŞEFİN MENÜSÜ  ✦  COCKTAIL BAR  ✦  BEYOĞLU  ✦  İSTANBUL  ✦  "
          speed={30}
          reverse
        />
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
        <motion.div className="absolute top-0 h-full w-32"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent)' }}
          animate={{ x: ['calc(100% + 128px)', '-128px'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} />
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   REDESIGNED HERO — Deep Obsidian + Emerald + Copper
   Clean, cinematic, modern luxury
   ═══════════════════════════════════════════════════════════════ */

const SLIDES = [
  { image: '/hero-hall.jpg', label: 'Salon', subtitle: 'İhtişamlı mekanımızda unutulmaz bir akşam yaşayın' },
  { image: '/hero-chef.jpg', label: 'Mutfak', subtitle: 'Şefimizin elinden çıkan her tabak bir başyapıt' },
  { image: '/hero-bar.jpg', label: 'Bar', subtitle: 'Özenle hazırlanmış içeceklerle özel anlar' },
];

/* ─── Color Palette ─── */
const C = {
  emerald: '#34d399',
  teal: '#2dd4bf',
  copper: '#d4956a',
  rose: '#e8a87c',
  cream: '#f0ece8',
  dark: '#0a0a10',
  card: '#12121c',
  dimText: '#8b8b9e',
};

/* ─── Floating Line Accent ─── */
function FloatingLine({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{ opacity: [0.15, 0.4, 0.15], scaleY: [0.8, 1.2, 0.8] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <div className="w-px h-16 bg-gradient-to-b from-transparent via-emerald-400/40 to-transparent" />
    </motion.div>
  );
}

/* ─── Ambient Glow Orbs ─── */
function AmbientOrbs() {
  const orbs = useMemo(() => [
    { x: '15%', y: '30%', size: 200, color: 'rgba(16,185,129,0.03)', dur: 20 },
    { x: '80%', y: '20%', size: 150, color: 'rgba(212,149,106,0.03)', dur: 25 },
    { x: '60%', y: '70%', size: 250, color: 'rgba(45,212,191,0.02)', dur: 18 },
    { x: '25%', y: '75%', size: 180, color: 'rgba(212,149,106,0.02)', dur: 22 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: orb.x, top: orb.y, width: orb.size, height: orb.size, background: `radial-gradient(circle, ${orb.color}, transparent 70%)` }}
          animate={{ x: [0, 20, -10, 15, 0], y: [0, -15, 10, -8, 0], scale: [1, 1.1, 0.95, 1.05, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─── Subtle Grid Lines ─── */
function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden opacity-[0.03]">
      {/* Horizontal lines */}
      {[20, 40, 60, 80].map(pct => (
        <div key={`h-${pct}`} className="absolute left-0 right-0 h-px" style={{ top: `${pct}%`, background: `linear-gradient(90deg, transparent, ${C.emerald}, transparent)` }} />
      ))}
      {/* Vertical lines */}
      {[25, 50, 75].map(pct => (
        <div key={`v-${pct}`} className="absolute top-0 bottom-0 w-px" style={{ left: `${pct}%`, background: `linear-gradient(180deg, transparent, ${C.teal}, transparent)` }} />
      ))}
    </div>
  );
}

/* ─── Image Slider ─── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${SLIDES[current].image})` }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Navigation Bar ─── */
function NavBar({ show }: { show: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 backdrop-blur-2xl" style={{ background: 'rgba(10,10,16,0.7)', borderBottom: '1px solid rgba(52,211,153,0.06)' }} />
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(45,212,191,0.1))', border: '1px solid rgba(52,211,153,0.2)' }}>
              <span style={{ color: C.emerald, fontFamily: 'Georgia, serif' }} className="text-sm font-bold">M</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm tracking-[0.15em] font-light" style={{ color: C.cream }}>LE MAISON</div>
              <div className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(52,211,153,0.5)' }}>Dorée</div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Hikayemiz', 'Menü', 'Şef', 'Galeri', 'İletişim'].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-300 group"
                style={{ color: 'rgba(139,139,158,0.7)' }}
                initial={{ opacity: 0, y: -10 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.06 }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = C.emerald; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(139,139,158,0.7)'; }}
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-500 group-hover:w-full" style={{ background: C.emerald }} />
              </motion.a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <motion.button
              className="hidden sm:flex items-center gap-2 px-5 py-2 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-500 rounded-lg"
              style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.12), rgba(45,212,191,0.08))', border: '1px solid rgba(52,211,153,0.2)', color: C.emerald }}
              initial={{ opacity: 0, scale: 0.9 }} animate={show ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.8 }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.emerald }} />
              Rezervasyon
            </motion.button>
            <button className="lg:hidden flex flex-col gap-[3px] p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`w-5 h-px transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} style={{ background: 'rgba(240,236,232,0.5)' }} />
              <span className={`w-5 h-px transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ background: 'rgba(240,236,232,0.5)' }} />
              <span className={`w-5 h-px transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} style={{ background: 'rgba(240,236,232,0.5)' }} />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 backdrop-blur-2xl"
            style={{ background: 'rgba(10,10,16,0.95)', borderBottom: '1px solid rgba(52,211,153,0.08)' }}
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
            <div className="px-6 py-6 flex flex-col gap-4">
              {['Hikayemiz', 'Menü', 'Şef', 'Galeri', 'İletişim'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm tracking-[0.2em] uppercase font-light" style={{ color: C.dimText }}>{link}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─── Info Glass Panel ─── */
function InfoPanel({ show }: { show: boolean }) {
  return (
    <motion.div className="absolute bottom-24 md:bottom-16 left-4 md:left-14 z-30 hidden md:block"
      initial={{ opacity: 0, x: -40 }} animate={show ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 2 }}>
      <div className="p-5 rounded-2xl max-w-[250px]"
        style={{ background: 'rgba(10,10,16,0.6)', backdropFilter: 'blur(24px)', border: '1px solid rgba(52,211,153,0.08)' }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(52,211,153,0.08)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.emerald} strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          </div>
          <div>
            <div className="text-[11px] tracking-wider font-light" style={{ color: C.cream }}>Konum</div>
            <div className="text-[11px] mt-0.5 font-light leading-relaxed" style={{ color: 'rgba(139,139,158,0.6)' }}>İstiklal Cad. No: 42, Beyoğlu<br />İstanbul, Türkiye</div>
          </div>
        </div>
        <div className="w-full h-px mb-4" style={{ background: 'rgba(52,211,153,0.06)' }} />
        <div className="flex items-start gap-3 mb-4">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(52,211,153,0.08)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.emerald} strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
          </div>
          <div>
            <div className="text-[11px] tracking-wider font-light" style={{ color: C.cream }}>Saatler</div>
            <div className="text-[11px] mt-0.5 font-light leading-relaxed" style={{ color: 'rgba(139,139,158,0.6)' }}>Pzt - Cum: 12:00 - 23:00<br />Cmt - Paz: 18:00 - 00:00</div>
          </div>
        </div>
        <div className="w-full h-px mb-4" style={{ background: 'rgba(52,211,153,0.06)' }} />
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(52,211,153,0.08)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.emerald} strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" /></svg>
          </div>
          <div>
            <div className="text-[11px] tracking-wider font-light" style={{ color: C.cream }}>Rezervasyon</div>
            <div className="text-[11px] mt-0.5 font-light" style={{ color: C.emerald }}>+90 (212) 555 42 42</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Rating Badge ─── */
function RatingBadge({ show }: { show: boolean }) {
  return (
    <motion.div className="absolute top-28 md:top-28 right-4 md:right-14 z-30"
      initial={{ opacity: 0, scale: 0.5 }} animate={show ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 2.5, type: 'spring' }}>
      <div className="px-5 py-4 rounded-2xl text-center"
        style={{ background: 'rgba(10,10,16,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(52,211,153,0.08)' }}>
        <div className="flex items-center justify-center gap-1 mb-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} width="10" height="10" viewBox="0 0 24 24" fill={C.copper}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          ))}
        </div>
        <div className="font-light text-base" style={{ color: C.cream }}>4.9</div>
        <div className="text-[9px] tracking-wider" style={{ color: 'rgba(139,139,158,0.4)' }}>2.4K Değerlendirme</div>
      </div>
    </motion.div>
  );
}

/* ─── Menu Preview ─── */
function MenuPreview({ show }: { show: boolean }) {
  return (
    <motion.div className="absolute bottom-24 md:bottom-16 right-4 md:right-14 z-30 hidden md:block"
      initial={{ opacity: 0, y: 30 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 2.8 }}>
      <div className="px-5 py-4 rounded-2xl"
        style={{ background: 'rgba(10,10,16,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(52,211,153,0.08)' }}>
        <div className="text-[9px] tracking-[0.3em] uppercase mb-3 font-medium" style={{ color: 'rgba(212,149,106,0.6)' }}>Bugünün Özel Menüsü</div>
        <div className="flex flex-col gap-2.5">
          {[
            { name: 'Karides Risotto', price: '₺280' },
            { name: 'Wagyu Tataki', price: '₺420' },
            { name: 'Çikolata Fondan', price: '₺160' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-10">
              <span className="text-xs font-light" style={{ color: 'rgba(240,236,232,0.6)' }}>{item.name}</span>
              <span className="text-xs font-light" style={{ color: C.copper }}>{item.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(52,211,153,0.06)' }}>
          <span className="text-[10px] tracking-wider font-light" style={{ color: 'rgba(212,149,106,0.4)' }}>Tam Menü →</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Slide Counter ─── */
function SlideCounter({ current }: { current: number }) {
  return (
    <div className="absolute bottom-10 right-4 md:bottom-12 md:right-14 z-30 flex flex-col items-end gap-2">
      <div className="flex items-center gap-2.5">
        {SLIDES.map((_, i) => (
          <div key={i} className="transition-all duration-700"
            style={{ width: i === current ? '36px' : '6px', height: '2px', background: i === current ? C.emerald : 'rgba(139,139,158,0.2)' }} />
        ))}
      </div>
      <span className="text-[10px] tracking-[0.3em] font-light" style={{ color: 'rgba(139,139,158,0.3)' }}>
        <span className="text-base font-light mr-1" style={{ color: C.emerald }}>0{current + 1}</span> / 0{SLIDES.length}
      </span>
    </div>
  );
}

/* ─── Bottom Scrolling Text ─── */
function ScrollingText() {
  const text = 'LE MAISON DORÉE  ✦  FINE DINING  ✦  MICHELIN STAR  ✦  TASTING MENU  ✦  WINE PAIRING  ✦  ISTANBUL  ✦  ';
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden">
      <div className="py-2.5" style={{ background: 'rgba(10,10,16,0.6)', borderTop: '1px solid rgba(52,211,153,0.04)' }}>
        <motion.div className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
          {[0, 1].map((i) => (
            <span key={i} className="text-[10px] tracking-[0.3em] uppercase font-light select-none" style={{ color: 'rgba(139,139,158,0.12)' }}>{text}</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HERO
   ═══════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const i = setInterval(() => setCurrentSlide((p) => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(i);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden" style={{ background: C.dark }}>

      {/* ── Image Slider ── */}
      <HeroSlider />

      {/* ── Dark overlay with color tint ── */}
      <div className="absolute inset-0 z-[5]"
        style={{ background: 'linear-gradient(180deg, rgba(10,10,16,0.6) 0%, rgba(10,10,16,0.35) 30%, rgba(10,10,16,0.35) 60%, rgba(10,10,16,0.8) 100%)' }} />
      <div className="absolute inset-0 z-[5]"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,16,0.6) 100%)' }} />
      {/* Emerald tint */}
      <div className="absolute inset-0 z-[5]" style={{ background: 'rgba(16,185,129,0.02)' }} />

      {/* ── Ambient effects ── */}
      {loaded && <AmbientOrbs />}
      {loaded && <GridLines />}

      {/* ── Floating lines ── */}
      <FloatingLine className="top-[15%] left-[8%]" delay={0} />
      <FloatingLine className="top-[40%] right-[12%]" delay={2} />
      <FloatingLine className="bottom-[25%] left-[20%]" delay={4} />
      <FloatingLine className="bottom-[35%] right-[25%]" delay={1} />

      {/* ── Film grain ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[6] opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', mixBlendMode: 'overlay',
        }}
      />

      {/* ═══ NAV BAR ═══ */}
      <NavBar show={loaded} />

      {/* ═══ MAIN CONTENT ═══ */}
      <motion.div className="relative z-20 flex items-center justify-center h-full px-6 md:px-10 lg:px-16" style={{ opacity: contentOpacity, y: contentY }}>
        <div className="text-center max-w-5xl">

          {/* Top Badge */}
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={loaded ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.6 }} className="mb-5 md:mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{ background: 'rgba(10,10,16,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(52,211,153,0.15)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.emerald }} />
              <span className="text-[11px] tracking-[0.3em] uppercase font-medium" style={{ color: C.emerald }}>
                Michelin Yıldızlı Deneyim
              </span>
            </div>
          </motion.div>

          {/* Slide Label */}
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="mb-3">
              <span className="text-xs md:text-sm tracking-[0.5em] uppercase font-medium" style={{ color: C.copper }}>
                ✦ {SLIDES[currentSlide].label} ✦
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Main Title */}
          <motion.div initial={{ opacity: 0, y: 60 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight leading-[0.9] tracking-tight">
              <span className="block" style={{ color: C.cream, textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>Le</span>
              <span className="block mt-1 md:mt-2" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300, fontStyle: 'italic', color: C.teal, textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                Maison
              </span>
              <span className="block mt-1 md:mt-2" style={{
                background: 'linear-gradient(135deg, #34d399, #2dd4bf, #d4956a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
              }}>
                Dorée
              </span>
            </h1>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div className="flex items-center justify-center gap-4 mt-6 md:mt-8"
            initial={{ opacity: 0, scaleX: 0 }} animate={loaded ? { opacity: 1, scaleX: 1 } : {}} transition={{ duration: 1, delay: 1.6 }}>
            <div className="w-12 md:w-20 h-px" style={{ background: `linear-gradient(90deg, transparent, ${C.emerald}40)` }} />
            <div className="w-2 h-2 rotate-45" style={{ background: C.emerald, opacity: 0.4 }} />
            <div className="w-3 h-px" style={{ background: `${C.copper}40` }} />
            <div className="w-2 h-2 rounded-full" style={{ border: `1px solid ${C.teal}40`, background: `${C.teal}15` }} />
            <div className="w-3 h-px" style={{ background: `${C.copper}40` }} />
            <div className="w-2 h-2 rotate-45" style={{ background: C.emerald, opacity: 0.4 }} />
            <div className="w-12 md:w-20 h-px" style={{ background: `linear-gradient(90deg, ${C.emerald}40, transparent)` }} />
          </motion.div>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p key={currentSlide}
              className="mt-5 md:mt-7 text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wider max-w-lg mx-auto leading-relaxed"
              style={{ color: 'rgba(240,236,232,0.7)', textShadow: '0 1px 10px rgba(0,0,0,0.9)' }}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5 }}>
              {SLIDES[currentSlide].subtitle}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 md:mt-10"
            initial={{ opacity: 0, y: 30 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 2 }}>
            <button className="group relative px-10 py-4 text-black text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-500 rounded-lg"
              style={{ background: `linear-gradient(135deg, ${C.emerald}, ${C.teal})` }}>
              <span className="relative z-10">Masa Rezervasyonu</span>
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${C.teal}, #5eead4)` }} />
            </button>
            <button className="group flex items-center gap-3 px-8 py-4 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-500 rounded-lg"
              style={{ border: `1px solid rgba(212,149,106,0.25)`, color: C.copper, background: 'rgba(10,10,16,0.3)', backdropFilter: 'blur(8px)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:scale-110 transition-transform duration-300">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Menüyü Keşfet
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div className="flex items-center justify-center gap-8 md:gap-14 mt-10 md:mt-14"
            initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 2.5 }}>
            {[
              { value: '12+', label: 'Yıl Deneyim' },
              { value: '5', label: 'Michelin Yıldız' },
              { value: '2.4K', label: 'Değerlendirme' },
              { value: '50K+', label: 'Misafir' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-lg md:text-2xl font-light" style={{ color: C.cream }}>{stat.value}</span>
                <span className="text-[8px] md:text-[9px] tracking-[0.25em] uppercase font-medium" style={{ color: 'rgba(139,139,158,0.5)' }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ═══ PANELS ═══ */}
      <InfoPanel show={loaded} />
      <RatingBadge show={loaded} />
      <MenuPreview show={loaded} />
      <SlideCounter current={currentSlide} />
      <ScrollingText />

      {/* ── Scroll Indicator ── */}
      <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 3 }}>
        <span className="text-[9px] tracking-[0.4em] uppercase font-medium" style={{ color: 'rgba(139,139,158,0.4)' }}>Kaydır</span>
        <motion.div className="w-[1px] h-8"
          style={{ background: `linear-gradient(to bottom, ${C.emerald}60, transparent)` }}
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          transformOrigin="top" />
      </motion.div>
    </section>
  );
}

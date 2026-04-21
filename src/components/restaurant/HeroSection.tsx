'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   GRAND IMMERSIVE HERO — Full Content, Rich & Elaborate
   ═══════════════════════════════════════════════════════════════ */

const SLIDES = [
  {
    image: '/hero-hall.jpg',
    label: 'Salon',
    title: 'Eşsiz Atmosfer',
    subtitle: 'İhtişamlı mekanımızda unutulmaz bir akşam',
  },
  {
    image: '/hero-chef.jpg',
    label: 'Mutfak',
    title: 'Sanatsal Lezzetler',
    subtitle: 'Şefimizin elinden çıkan her tabak bir başyapıt',
  },
  {
    image: '/hero-bar.jpg',
    label: 'Bar',
    title: ' Kokteyl Deneyimi',
    subtitle: 'Özenle hazırlanmış içeceklerle özel anlar',
  },
];

/* ─── Full-Screen Image Slider with Ken Burns ─── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % SLIDES.length);
        setIsTransitioning(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: 1,
            scale: isTransitioning ? 1.05 : 1,
            x: isTransitioning ? '2%' : '0%',
          }}
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 1.2, ease: 'ease-out' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${SLIDES[current].image})`,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Slide Counter ─── */
function SlideCounter({ current }: { current: number }) {
  return (
    <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16 z-30 flex flex-col items-end gap-2">
      <div className="flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className="transition-all duration-700"
            style={{
              width: i === current ? '48px' : '8px',
              height: '2px',
              background: i === current ? 'rgba(245,158,11,0.9)' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
      <span className="text-[11px] tracking-[0.3em] text-white/30 font-light">
        <span className="text-amber-400/80 text-lg font-extralight mr-1">
          0{current + 1}
        </span>
        / 0{SLIDES.length}
      </span>
    </div>
  );
}

/* ─── Animated Ambient Orbs ─── */
function AmbientOrbs() {
  const orbs = [
    { x: '15%', y: '20%', size: 300, color: 'rgba(180, 120, 40, 0.08)', duration: 12 },
    { x: '75%', y: '60%', size: 400, color: 'rgba(120, 60, 20, 0.06)', duration: 15 },
    { x: '50%', y: '80%', size: 250, color: 'rgba(200, 150, 50, 0.05)', duration: 10 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Floating Golden Particles ─── */
function GoldenDust() {
  const particles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (Math.sin(i * 7.3) * 0.5 + 0.5) * 100,
      y: (Math.cos(i * 5.1) * 0.5 + 0.5) * 100,
      size: (i % 5) * 0.5 + 0.5,
      duration: (i % 10) + 5,
      delay: (i % 6),
      opacity: ((i % 4) * 0.1) + 0.1,
      drift: (Math.sin(i * 3.7)) * 20,
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
            background: `radial-gradient(circle, rgba(253, 224, 71, 0.9) 0%, transparent 70%)`,
            boxShadow: '0 0 4px rgba(253, 224, 71, 0.3)',
          }}
          animate={{
            y: [0, -40, 10, -25, 0],
            x: [0, p.drift, -p.drift * 0.5, p.drift * 0.3, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity * 0.3, p.opacity * 1.5, p.opacity],
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

/* ─── Film Grain ─── */
function FilmGrain() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
      }}
    />
  );
}

/* ─── Top Navigation Bar ─── */
function NavBar({ show }: { show: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ y: -100, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl border-b border-white/[0.06]" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center">
              <span className="text-amber-400 text-sm font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                M
              </span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white text-sm tracking-[0.2em] font-light">
                LE MAISON
              </div>
              <div className="text-amber-400/60 text-[9px] tracking-[0.4em] uppercase">
                Dorée
              </div>
            </div>
          </div>

          {/* Center Nav Links — Desktop */}
          <nav className="hidden lg:flex items-center gap-10">
            {['Hikayemiz', 'Menü', 'Şef', 'Galeri', 'İletişim'].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative text-[11px] tracking-[0.3em] uppercase text-white/50 hover:text-white/90 transition-colors duration-300 font-light group"
                initial={{ opacity: 0, y: -10 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.08 }}
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400/60 group-hover:w-full transition-all duration-500" />
              </motion.a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-4">
              {['instagram', 'facebook', 'twitter'].map((social, i) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-white/30 hover:text-amber-400/70 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={show ? { opacity: 1 } : {}}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <SocialIcon name={social} />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-amber-500/10 border border-amber-400/30
                         text-amber-200 text-[11px] tracking-[0.2em] uppercase font-light
                         hover:bg-amber-500/20 hover:border-amber-400/50 transition-all duration-500"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={show ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Rezervasyon
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
              <span className={`w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-px bg-white/60 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/[0.06]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {['Hikayemiz', 'Menü', 'Şef', 'Galeri', 'İletişim'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm tracking-[0.2em] uppercase text-white/50 hover:text-white/90 font-light"
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

/* ─── Simple Social Icon SVGs ─── */
function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    instagram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    facebook: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    twitter: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267zm4.667 0l-1.334 2m10.667 14l-1.334 2m0 -16l1.334 2m-10.667 14l1.334 2" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}

/* ─── Info Glassmorphism Panel ─── */
function InfoPanel({ show }: { show: boolean }) {
  return (
    <motion.div
      className="absolute bottom-24 md:bottom-16 left-6 md:left-16 z-30 hidden md:block"
      initial={{ opacity: 0, x: -40 }}
      animate={show ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, delay: 2.5 }}
    >
      <div
        className="p-6 rounded-2xl max-w-xs"
        style={{
          background: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {/* Location */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245, 158, 11, 0.7)" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <div className="text-white/70 text-xs tracking-wider font-light">Konum</div>
            <div className="text-white/40 text-[11px] mt-0.5 font-light">
              İstiklal Cad. No: 42, Beyoğlu<br />İstanbul, Türkiye
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245, 158, 11, 0.7)" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <div>
            <div className="text-white/70 text-xs tracking-wider font-light">Saatler</div>
            <div className="text-white/40 text-[11px] mt-0.5 font-light">
              Pzt - Cum: 12:00 - 23:00<br />
              Cmt - Paz: 18:00 - 00:00
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(245, 158, 11, 0.7)" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
            </svg>
          </div>
          <div>
            <div className="text-white/70 text-xs tracking-wider font-light">Rezervasyon</div>
            <div className="text-amber-400/60 text-[11px] mt-0.5 font-light">
              +90 (212) 555 42 42
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Side Social Bar (left) ─── */
function SideSocialBar({ show }: { show: boolean }) {
  return (
    <motion.div
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={show ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1, delay: 3 }}
    >
      {[
        { name: 'instagram', label: 'IG' },
        { name: 'facebook', label: 'FB' },
        { name: 'twitter', label: 'TW' },
      ].map((s, i) => (
        <a
          key={s.name}
          href="#"
          className="flex items-center gap-3 group"
        >
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/20 group-hover:text-amber-400/60 transition-colors duration-500 -rotate-90 origin-center translate-y-3 opacity-0 group-hover:opacity-100 font-light">
            {s.label}
          </span>
          <div className="w-px h-6 bg-white/10 group-hover:bg-amber-400/40 group-hover:h-8 transition-all duration-500" />
          <div className="text-white/20 group-hover:text-amber-400/70 transition-colors duration-300">
            <SocialIcon name={s.name} />
          </div>
        </a>
      ))}
    </motion.div>
  );
}

/* ─── Bottom Scrolling Banner ─── */
function ScrollingBanner() {
  const text = 'LE MAISON DORÉE  ✦  FINE DINING  ✦  MICHELIN STAR  ✦  TASTING MENU  ✦  WINE PAIRING  ✦  PRIVATE EVENTS  ✦  CHEF\'S TABLE  ✦  COCKTAIL BAR  ✦  ISTANBUL  ✦  ';
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden">
      <div className="bg-black/40 backdrop-blur-sm border-t border-white/[0.06] py-3">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-[11px] tracking-[0.35em] uppercase text-white/15 font-light"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Rating Badge ─── */
function RatingBadge({ show }: { show: boolean }) {
  return (
    <motion.div
      className="absolute top-28 md:top-32 right-6 md:right-16 z-30"
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={show ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.6, delay: 2.8, type: 'spring' }}
    >
      <div
        className="px-5 py-4 rounded-2xl text-center"
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="flex items-center justify-center gap-1 mb-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} width="10" height="10" viewBox="0 0 24 24" fill="rgba(251, 191, 36, 0.8)">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <div className="text-white/80 text-sm font-light">4.9</div>
        <div className="text-white/30 text-[9px] tracking-wider">2.4K Değerlendirme</div>
      </div>
    </motion.div>
  );
}

/* ─── Floating Menu Preview ─── */
function MenuPreview({ show }: { show: boolean }) {
  return (
    <motion.div
      className="absolute bottom-28 md:bottom-20 right-6 md:right-16 z-30 hidden md:block"
      initial={{ opacity: 0, y: 30 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 3.2 }}
    >
      <div
        className="px-6 py-4 rounded-2xl"
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="text-white/40 text-[9px] tracking-[0.3em] uppercase mb-3">Bugünün Özel Menüsü</div>
        <div className="flex flex-col gap-2">
          {[
            { name: 'Karides Risotto', price: '₺280' },
            { name: 'Wagyu Tataki', price: '₺420' },
            { name: 'Çikolata Fondan', price: '₺160' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-8">
              <span className="text-white/60 text-xs font-light">{item.name}</span>
              <span className="text-amber-400/50 text-xs font-light">{item.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-white/[0.06]">
          <span className="text-white/30 text-[10px] tracking-wider font-light">
            Tam Menü →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HERO COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.85]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Sync slide counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* ── Image Slider ── */}
      <HeroSlider />

      {/* ── Dark Overlays ── */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.8) 100%)
          `,
          opacity: overlayOpacity,
        }}
      />

      {/* ── Ambient Orbs ── */}
      {loaded && <AmbientOrbs />}

      {/* ── Golden Dust ── */}
      {loaded && <GoldenDust />}

      {/* ── Film Grain ── */}
      {loaded && <FilmGrain />}

      {/* ── Vignette ── */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* ═══ NAVIGATION BAR ═══ */}
      <NavBar show={loaded} />

      {/* ═══ SIDE SOCIAL BAR ═══ */}
      <SideSocialBar show={loaded} />

      {/* ═══ MAIN CONTENT ═══ */}
      <motion.div
        className="relative z-20 flex items-center justify-center h-full px-6 md:px-10 lg:px-16"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="text-center max-w-5xl">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={loaded ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-6 md:mb-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/[0.08]"
              style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-white/50 font-light">
                Michelin Yıldızlı Deneyim
              </span>
              <span className="text-amber-400/40 text-xs">✦</span>
            </div>
          </motion.div>

          {/* Slide Label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <span className="text-amber-400/70 text-[11px] md:text-xs tracking-[0.5em] uppercase font-light">
                {SLIDES[currentSlide].label}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Main Title — MASSIVE */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight leading-[0.9] tracking-tight text-white">
              <span className="block">Le</span>
              <span className="block mt-1 md:mt-2" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300, fontStyle: 'italic' }}>
                Maison
              </span>
              <span className="block mt-1 md:mt-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Dorée
              </span>
            </h1>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-8 md:mt-10"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={loaded ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-amber-400/40" />
            <svg width="12" height="12" viewBox="0 0 16 16" className="text-amber-400/50">
              <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6Z" fill="currentColor" />
            </svg>
            <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-amber-400/40" />
          </motion.div>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentSlide}
              className="mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-white/40 font-light tracking-wider max-w-lg mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              {SLIDES[currentSlide].subtitle}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons Row */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            {/* Primary CTA */}
            <button className="group relative px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black text-xs tracking-[0.25em] uppercase font-medium
                              hover:from-amber-500 hover:to-amber-400 transition-all duration-500 overflow-hidden">
              <span className="relative z-10">Masa Rezervasyonu</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>

            {/* Secondary CTA */}
            <button className="group flex items-center gap-3 px-8 py-4 border border-white/[0.12] text-white/60 text-xs tracking-[0.25em] uppercase font-light
                              hover:border-white/30 hover:text-white/90 transition-all duration-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:scale-110 transition-transform duration-300">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Menüyü Keşfet
            </button>
          </motion.div>

          {/* Quick Stats Row */}
          <motion.div
            className="flex items-center justify-center gap-8 md:gap-14 mt-12 md:mt-16"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 2.8 }}
          >
            {[
              { value: '12+', label: 'Yıl Deneyim' },
              { value: '5', label: 'Michelin Yıldız' },
              { value: '2.4K', label: 'Değerlendirme' },
              { value: '50K+', label: 'Misafir' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-lg md:text-2xl font-extralight text-white/80">
                  {stat.value}
                </span>
                <span className="text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-white/25 font-light">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ═══ GLASS INFO PANEL ═══ */}
      <InfoPanel show={loaded} />

      {/* ═══ RATING BADGE ═══ */}
      <RatingBadge show={loaded} />

      {/* ═══ MENU PREVIEW ═══ */}
      <MenuPreview show={loaded} />

      {/* ═══ SLIDE COUNTER ═══ */}
      <SlideCounter current={currentSlide} />

      {/* ═══ SCROLLING BANNER ═══ */}
      <ScrollingBanner />

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 3.5 }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/20 font-light">
          Kaydır
        </span>
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}

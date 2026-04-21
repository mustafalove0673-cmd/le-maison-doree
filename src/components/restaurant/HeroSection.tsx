'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   GRAND IMMERSIVE HERO — Readable + Rich Decorative Shapes
   ═══════════════════════════════════════════════════════════════ */

const SLIDES = [
  { image: '/hero-hall.jpg', label: 'Salon', subtitle: 'İhtişamlı mekanımızda unutulmaz bir akşam yaşayın' },
  { image: '/hero-chef.jpg', label: 'Mutfak', subtitle: 'Şefimizin elinden çıkan her tabak bir başyapıt' },
  { image: '/hero-bar.jpg', label: 'Bar', subtitle: 'Özenle hazırlanmış içeceklerle özel anlar' },
];

/* ─── Decorative Diamond ─── */
function Diamond({ size = 12, color = 'rgba(245,158,11,0.4)', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <div className={className} style={{ width: size, height: size, transform: 'rotate(45deg)', background: color, borderRadius: 1 }} />
  );
}

/* ─── Decorative Circle Outline ─── */
function CircleOutline({ size = 60, color = 'rgba(255,255,255,0.08)', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <div className={className} style={{ width: size, height: size, border: `1px solid ${color}`, borderRadius: '50%' }} />
  );
}

/* ─── Decorative Cross ─── */
function Cross({ size = 20, color = 'rgba(245,158,11,0.3)', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2" style={{ background: color }} />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: color }} />
    </div>
  );
}

/* ─── Corner Ornaments ─── */
function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const posStyles: Record<string, string> = {
    tl: 'top-6 left-6 md:top-10 md:left-10',
    tr: 'top-6 right-6 md:top-10 md:right-10',
    bl: 'bottom-6 left-6 md:bottom-10 md:left-10',
    br: 'bottom-6 right-6 md:bottom-10 md:right-10',
  };
  const rotate = position === 'tl' ? '0' : position === 'tr' ? '90' : position === 'br' ? '180' : '270';
  return (
    <motion.div
      className={`absolute z-30 pointer-events-none ${posStyles[position]}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 2.5 }}
    >
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" style={{ transform: `rotate(${rotate}deg)` }}>
        <path d="M2 2 L20 2 L20 4 L4 4 L4 20 L2 20 Z" fill="rgba(245,158,11,0.25)" />
        <path d="M6 6 L16 6 L16 7 L7 7 L7 16 L6 16 Z" fill="rgba(245,158,11,0.15)" />
        <circle cx="3" cy="3" r="1" fill="rgba(245,158,11,0.5)" />
      </svg>
    </motion.div>
  );
}

/* ─── Floating Geometric Shapes ─── */
function FloatingShapes() {
  const shapes = useMemo(() => [
    { type: 'circle', x: '8%', y: '25%', size: 80, dur: 18, color: 'rgba(245,158,11,0.05)' },
    { type: 'diamond', x: '88%', y: '18%', size: 14, dur: 8, color: 'rgba(245,158,11,0.2)' },
    { type: 'circle', x: '92%', y: '65%', size: 120, dur: 22, color: 'rgba(255,255,255,0.03)' },
    { type: 'diamond', x: '5%', y: '72%', size: 10, dur: 10, color: 'rgba(255,255,255,0.1)' },
    { type: 'cross', x: '15%', y: '85%', size: 24, dur: 14, color: 'rgba(245,158,11,0.15)' },
    { type: 'cross', x: '82%', y: '40%', size: 18, dur: 12, color: 'rgba(255,255,255,0.08)' },
    { type: 'ring', x: '20%', y: '15%', size: 40, dur: 16, color: 'rgba(245,158,11,0.06)' },
    { type: 'ring', x: '78%', y: '82%', size: 60, dur: 20, color: 'rgba(255,255,255,0.04)' },
    { type: 'dot', x: '35%', y: '10%', size: 4, dur: 6, color: 'rgba(245,158,11,0.4)' },
    { type: 'dot', x: '65%', y: '90%', size: 3, dur: 7, color: 'rgba(255,255,255,0.2)' },
    { type: 'line', x: '50%', y: '5%', dur: 15, color: 'rgba(255,255,255,0.04)' },
    { type: 'dot', x: '95%', y: '50%', size: 3, dur: 9, color: 'rgba(245,158,11,0.3)' },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{
            y: [0, -15, 8, -10, 0],
            x: [0, 8, -5, 3, 0],
            rotate: s.type === 'diamond' ? [0, 90, 180, 270, 360] : s.type === 'cross' ? [0, 45, 0, -45, 0] : undefined,
            opacity: [0.6, 1, 0.4, 0.8, 0.6],
          }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
        >
          {s.type === 'circle' && <div style={{ width: s.size, height: s.size, borderRadius: '50%', background: s.color }} />}
          {s.type === 'diamond' && <Diamond size={s.size} color={s.color} />}
          {s.type === 'cross' && <Cross size={s.size} color={s.color} />}
          {s.type === 'ring' && <CircleOutline size={s.size} color={s.color} />}
          {s.type === 'dot' && <div style={{ width: s.size, height: s.size, borderRadius: '50%', background: s.color, boxShadow: `0 0 ${s.size * 2}px ${s.color}` }} />}
          {s.type === 'line' && <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Decorative Border Frame ─── */
function BorderFrame() {
  return (
    <motion.div
      className="absolute inset-4 md:inset-8 lg:inset-12 z-20 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1.5 }}
    >
      {/* Top line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
      {/* Bottom line */}
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
      {/* Left line */}
      <div className="absolute left-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-amber-400/10 to-transparent" />
      {/* Right line */}
      <div className="absolute right-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-amber-400/10 to-transparent" />
      {/* Corner diamonds */}
      <div className="absolute -top-[3px] -left-[3px]"><Diamond size={6} color="rgba(245,158,11,0.3)" /></div>
      <div className="absolute -top-[3px] -right-[3px]"><Diamond size={6} color="rgba(245,158,11,0.3)" /></div>
      <div className="absolute -bottom-[3px] -left-[3px]"><Diamond size={6} color="rgba(245,158,11,0.3)" /></div>
      <div className="absolute -bottom-[3px] -right-[3px]"><Diamond size={6} color="rgba(245,158,11,0.3)" /></div>
    </motion.div>
  );
}

/* ─── Image Slider ─── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
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

/* ─── Film Grain ─── */
function FilmGrain() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-15 opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
      }}
    />
  );
}

/* ─── Social Icons ─── */
function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    instagram: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>,
    facebook: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
    twitter: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l11.733 16h4.267l-11.733-16h-4.267zm4.667 0l-1.334 2m10.667 14l-1.334 2" /></svg>,
  };
  return <>{icons[name]}</>;
}

/* ─── Navigation Bar ─── */
function NavBar({ show }: { show: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      initial={{ y: -80, opacity: 0 }}
      animate={show ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-b border-white/[0.05]" />
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full border border-amber-400/30 flex items-center justify-center">
              <span className="text-amber-400 text-xs font-bold" style={{ fontFamily: 'Georgia, serif' }}>M</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white text-xs tracking-[0.2em] font-light">LE MAISON</div>
              <div className="text-amber-400/50 text-[8px] tracking-[0.35em] uppercase">Dorée</div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Hikayemiz', 'Menü', 'Şef', 'Galeri', 'İletişim'].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative text-[11px] tracking-[0.25em] uppercase text-white/60 hover:text-amber-300 transition-colors duration-300 font-light group"
                initial={{ opacity: 0, y: -10 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.08 }}
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400/60 group-hover:w-full transition-all duration-500" />
              </motion.a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              {['instagram', 'facebook', 'twitter'].map((s, i) => (
                <motion.a key={s} href="#" className="text-white/30 hover:text-amber-400/70 transition-colors duration-300"
                  initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ delay: 1 + i * 0.1 }}>
                  <SocialIcon name={s} />
                </motion.a>
              ))}
            </div>
            <motion.button
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-400/25 text-amber-200 text-[10px] tracking-[0.2em] uppercase font-light hover:bg-amber-500/20 hover:border-amber-400/50 transition-all duration-500"
              initial={{ opacity: 0, scale: 0.9 }} animate={show ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1.2 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Rezervasyon
            </motion.button>
            <button className="lg:hidden flex flex-col gap-[3px] p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`w-4 h-px bg-white/50 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[2.5px]' : ''}`} />
              <span className={`w-4 h-px bg-white/50 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-4 h-px bg-white/50 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[2.5px]' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/[0.06]"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
            <div className="px-6 py-6 flex flex-col gap-4">
              {['Hikayemiz', 'Menü', 'Şef', 'Galeri', 'İletişim'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm tracking-[0.2em] uppercase text-white/60 hover:text-amber-300 font-light">{link}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ─── Side Social Bar ─── */
function SideSocialBar({ show }: { show: boolean }) {
  return (
    <motion.div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-6"
      initial={{ opacity: 0, x: -20 }} animate={show ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 3 }}>
      {[
        { name: 'instagram', label: 'IG' },
        { name: 'facebook', label: 'FB' },
        { name: 'twitter', label: 'TW' },
      ].map((s) => (
        <a key={s.name} href="#" className="flex items-center gap-3 group">
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/20 group-hover:text-amber-400/60 transition-colors duration-500 -rotate-90 origin-center translate-y-3 opacity-0 group-hover:opacity-100 font-light">{s.label}</span>
          <div className="w-px h-6 bg-white/10 group-hover:bg-amber-400/40 group-hover:h-8 transition-all duration-500" />
          <div className="text-white/20 group-hover:text-amber-400/70 transition-colors duration-300"><SocialIcon name={s.name} /></div>
        </a>
      ))}
    </motion.div>
  );
}

/* ─── Info Glass Panel ─── */
function InfoPanel({ show }: { show: boolean }) {
  return (
    <motion.div className="absolute bottom-24 md:bottom-16 left-4 md:left-14 z-30 hidden md:block"
      initial={{ opacity: 0, x: -40 }} animate={show ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: 2.5 }}>
      <div className="p-5 rounded-xl max-w-[260px]"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(245,158,11,0.8)" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          </div>
          <div>
            <div className="text-white/80 text-[11px] tracking-wider font-light">Konum</div>
            <div className="text-white/50 text-[11px] mt-0.5 font-light leading-relaxed">İstiklal Cad. No: 42, Beyoğlu<br />İstanbul, Türkiye</div>
          </div>
        </div>
        <div className="w-full h-px bg-white/[0.06] mb-4" />
        <div className="flex items-start gap-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(245,158,11,0.8)" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
          </div>
          <div>
            <div className="text-white/80 text-[11px] tracking-wider font-light">Saatler</div>
            <div className="text-white/50 text-[11px] mt-0.5 font-light leading-relaxed">Pzt - Cum: 12:00 - 23:00<br />Cmt - Paz: 18:00 - 00:00</div>
          </div>
        </div>
        <div className="w-full h-px bg-white/[0.06] mb-4" />
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(245,158,11,0.8)" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" /></svg>
          </div>
          <div>
            <div className="text-white/80 text-[11px] tracking-wider font-light">Rezervasyon</div>
            <div className="text-amber-400/80 text-[11px] mt-0.5 font-light">+90 (212) 555 42 42</div>
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
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }} animate={show ? { opacity: 1, scale: 1, rotate: 0 } : {}} transition={{ duration: 0.6, delay: 2.8, type: 'spring' }}>
      <div className="px-5 py-4 rounded-xl text-center"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center justify-center gap-1 mb-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} width="10" height="10" viewBox="0 0 24 24" fill="rgba(251,191,36,0.9)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          ))}
        </div>
        <div className="text-white font-light text-base">4.9</div>
        <div className="text-white/40 text-[9px] tracking-wider">2.4K Değerlendirme</div>
      </div>
    </motion.div>
  );
}

/* ─── Menu Preview ─── */
function MenuPreview({ show }: { show: boolean }) {
  return (
    <motion.div className="absolute bottom-28 md:bottom-20 right-4 md:right-14 z-30 hidden md:block"
      initial={{ opacity: 0, y: 30 }} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 3.2 }}>
      <div className="px-5 py-4 rounded-xl"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="text-amber-400/70 text-[9px] tracking-[0.3em] uppercase mb-3 font-medium">Bugünün Özel Menüsü</div>
        <div className="flex flex-col gap-2.5">
          {[
            { name: 'Karides Risotto', price: '₺280' },
            { name: 'Wagyu Tataki', price: '₺420' },
            { name: 'Çikolata Fondan', price: '₺160' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-10">
              <span className="text-white/70 text-xs font-light">{item.name}</span>
              <span className="text-amber-400/70 text-xs font-light">{item.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-white/[0.06]">
          <span className="text-amber-400/50 text-[10px] tracking-wider font-light">Tam Menü →</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Bottom Scrolling Banner ─── */
function ScrollingBanner() {
  const text = 'LE MAISON DORÉE  ✦  FINE DINING  ✦  MICHELIN STAR  ✦  TASTING MENU  ✦  WINE PAIRING  ✦  PRIVATE EVENTS  ✦  CHEF\'S TABLE  ✦  COCKTAIL BAR  ✦  ISTANBUL  ✦  ';
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden">
      <div className="bg-black/50 backdrop-blur-md border-t border-white/[0.05] py-2.5">
        <motion.div className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
          {[0, 1].map((i) => (
            <span key={i} className="text-[10px] tracking-[0.3em] uppercase text-white/15 font-light">{text}</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Slide Counter ─── */
function SlideCounter({ current }: { current: number }) {
  return (
    <div className="absolute bottom-10 right-4 md:bottom-12 md:right-14 z-30 flex flex-col items-end gap-2">
      <div className="flex items-center gap-2.5">
        {SLIDES.map((_, i) => (
          <div key={i} className="transition-all duration-700"
            style={{ width: i === current ? '36px' : '6px', height: '2px', background: i === current ? 'rgba(245,158,11,0.9)' : 'rgba(255,255,255,0.2)' }} />
        ))}
      </div>
      <span className="text-[10px] tracking-[0.3em] text-white/30 font-light">
        <span className="text-amber-400/80 text-base font-light mr-1">0{current + 1}</span> / 0{SLIDES.length}
      </span>
    </div>
  );
}

/* ─── Golden Particles ─── */
function GoldenDust() {
  const particles = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
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
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: 'radial-gradient(circle, rgba(253,224,71,0.9) 0%, transparent 70%)', boxShadow: '0 0 4px rgba(253,224,71,0.3)' }}
          animate={{ y: [0, -35, 10, -20, 0], x: [0, p.drift, -p.drift * 0.5, p.drift * 0.3, 0], opacity: [p.opacity, p.opacity * 2, p.opacity * 0.3, p.opacity * 1.5, p.opacity] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }} />
      ))}
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
    const i = setInterval(() => setCurrentSlide((p) => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(i);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">

      {/* ── Image Slider ── */}
      <HeroSlider />

      {/* ── Strong dark overlay for readability ── */}
      <div className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.75) 100%)' }} />
      <div className="absolute inset-0 z-10"
        style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.5) 100%)' }} />

      {/* ── Geometric Shapes ── */}
      {loaded && <FloatingShapes />}

      {/* ── Border Frame ── */}
      <BorderFrame />

      {/* ── Corner Ornaments ── */}
      {['tl', 'tr', 'bl', 'br'].map((pos) => <CornerOrnament key={pos} position={pos as 'tl' | 'tr' | 'bl' | 'br'} />)}

      {/* ── Golden Dust ── */}
      {loaded && <GoldenDust />}

      {/* ── Film Grain ── */}
      {loaded && <FilmGrain />}

      {/* ═══ NAV BAR ═══ */}
      <NavBar show={loaded} />

      {/* ═══ SIDE SOCIAL ═══ */}
      <SideSocialBar show={loaded} />

      {/* ═══ MAIN CONTENT — HIGH READABILITY ═══ */}
      <motion.div className="relative z-20 flex items-center justify-center h-full px-6 md:px-10 lg:px-16" style={{ opacity: contentOpacity, y: contentY }}>
        <div className="text-center max-w-5xl">

          {/* Top Badge — readable */}
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={loaded ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.8 }} className="mb-5 md:mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(245,158,11,0.15)' }}>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-200/90 text-[11px] tracking-[0.3em] uppercase font-medium">
                Michelin Yıldızlı Deneyim
              </span>
              <Diamond size={6} color="rgba(245,158,11,0.5)" />
            </div>
          </motion.div>

          {/* Slide Label */}
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="mb-3">
              <span className="text-amber-300/90 text-xs md:text-sm tracking-[0.5em] uppercase font-medium drop-shadow-lg">
                ✦ {SLIDES[currentSlide].label} ✦
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Main Title — big + readable */}
          <motion.div initial={{ opacity: 0, y: 60 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight leading-[0.9] tracking-tight">
              <span className="block text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">Le</span>
              <span className="block mt-1 md:mt-2 text-amber-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 300, fontStyle: 'italic' }}>
                Maison
              </span>
              <span className="block mt-1 md:mt-2 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                Dorée
              </span>
            </h1>
          </motion.div>

          {/* Decorative Divider */}
          <motion.div className="flex items-center justify-center gap-4 mt-6 md:mt-8"
            initial={{ opacity: 0, scaleX: 0 }} animate={loaded ? { opacity: 1, scaleX: 1 } : {}} transition={{ duration: 1, delay: 1.8 }}>
            <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-amber-400/50" />
            <Diamond size={8} color="rgba(245,158,11,0.5)" />
            <div className="w-3 h-px bg-amber-400/30" />
            <Cross size={14} color="rgba(245,158,11,0.4)" />
            <div className="w-3 h-px bg-amber-400/30" />
            <Diamond size={8} color="rgba(245,158,11,0.5)" />
            <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-amber-400/50" />
          </motion.div>

          {/* Subtitle — readable */}
          <AnimatePresence mode="wait">
            <motion.p key={currentSlide}
              className="mt-5 md:mt-7 text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-light tracking-wider max-w-lg mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]"
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5 }}>
              {SLIDES[currentSlide].subtitle}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 md:mt-10"
            initial={{ opacity: 0, y: 30 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 2.2 }}>
            <button className="group relative px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black text-xs tracking-[0.25em] uppercase font-semibold hover:from-amber-500 hover:to-amber-400 transition-all duration-500 drop-shadow-lg">
              <span className="relative z-10">Masa Rezervasyonu</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            <button className="group flex items-center gap-3 px-8 py-4 border border-white/20 text-white/80 text-xs tracking-[0.25em] uppercase font-medium hover:border-amber-400/40 hover:text-amber-100 transition-all duration-500 drop-shadow-lg"
              style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:scale-110 transition-transform duration-300">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Menüyü Keşfet
            </button>
          </motion.div>

          {/* Stats — readable */}
          <motion.div className="flex items-center justify-center gap-8 md:gap-14 mt-10 md:mt-14"
            initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 2.8 }}>
            {[
              { value: '12+', label: 'Yıl Deneyim' },
              { value: '5', label: 'Michelin Yıldız' },
              { value: '2.4K', label: 'Değerlendirme' },
              { value: '50K+', label: 'Misafir' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-lg md:text-2xl font-light text-white drop-shadow-md">{stat.value}</span>
                <span className="text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-white/50 font-medium">{stat.label}</span>
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
      <ScrollingBanner />

      {/* ── Scroll Indicator ── */}
      <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 3.5 }}>
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/40 font-medium">Kaydır</span>
        <motion.div className="w-[1px] h-8 bg-gradient-to-b from-amber-400/50 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }} />
      </motion.div>
    </section>
  );
}

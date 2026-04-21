'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   MENU — 2x3 Vertical Cards, Dark Bold Style, WhatsApp
   ═══════════════════════════════════════════════════════════════ */

const CATEGORIES = ['Tümü', 'Başlangıçlar', 'Ana Yemekler', 'Tatlılar'];

const MENU_ITEMS = [
  { id: 1, name: 'Izgara Midye', desc: 'Tereyağlı sarımsak sos, parmesan, limon', price: '₺220', category: 'Başlangıçlar', image: '/menu-scallops.jpg', badge: "Chef's Choice" },
  { id: 2, name: 'Lobster Bisque', desc: 'Istakoz çorbası, krema köpüğü, nane', price: '₺280', category: 'Başlangıçlar', image: '/menu-soup.jpg', badge: null },
  { id: 3, name: 'Wagyu Steak', desc: 'A5 Wagyu, trüf patates, mevsim sebzeleri', price: '₺680', category: 'Ana Yemekler', image: '/menu-steak.jpg', badge: 'Signature' },
  { id: 4, name: 'Levrek Fillesi', desc: 'Fırında levrek, beurre blanc, kuşkonmaz', price: '₺380', category: 'Ana Yemekler', image: '/menu-seabass.jpg', badge: null },
  { id: 5, name: 'Çikolata Fondan', desc: 'Sıcak çikolata, ahududu, vanilyalı dondurma', price: '₺180', category: 'Tatlılar', image: '/menu-dessert.jpg', badge: 'Best Seller' },
  { id: 6, name: 'Peynir Tabağı', desc: 'Seçilmiş peynirler, incir, bal, ceviz', price: '₺320', category: 'Başlangıçlar', image: '/menu-cheese.jpg', badge: 'Paylaşılabilir' },
];

const WA_NUMBER = '905551234567';
function waLink(item: typeof MENU_ITEMS[0]) {
  const msg = encodeURIComponent(`Merhaba! Le Maison Dorée'den bilgi almak istiyorum.\n\n🍽️ ${item.name} - ${item.price}\n${item.desc}\n\nRezervasyon yapmak istiyorum, müsaitliğinizi öğrenebilir miyim?`);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

/* ─── Diamond ─── */
function Diamond({ size = 8, color = 'rgba(245,158,11,0.4)' }: { size?: number; color?: string }) {
  return <div style={{ width: size, height: size, transform: 'rotate(45deg)', background: color, borderRadius: 1, flexShrink: 0 }} />;
}

/* ─── Fade In ─── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════════════════ */
function SectionHeader() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-100px' });
  return (
    <div ref={ref} className="text-center mb-12 md:mb-16">
      <motion.div className="flex items-center justify-center gap-3 mb-5"
        initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-amber-400/40" />
        <Diamond size={8} />
        <svg width="14" height="14" viewBox="0 0 24 24" className="text-amber-400/40"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" /></svg>
        <Diamond size={8} />
        <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-amber-400/40" />
      </motion.div>
      <motion.p className="text-amber-400/80 text-[11px] md:text-xs tracking-[0.5em] uppercase font-medium mb-3"
        initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>Lezzetin Ötesinde</motion.p>
      <motion.h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white tracking-tight"
        initial={{ opacity: 0, y: 30 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
        <span className="block">Özel</span>
        <span className="block mt-1 text-amber-100/90 italic" style={{ fontFamily: 'Georgia, serif' }}>Menümüz</span>
      </motion.h2>
      <motion.p className="mt-5 text-white/50 text-sm font-light tracking-wider max-w-lg mx-auto"
        initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
        Her tabak, şefimizin tutkuyla hazırladığı bir sanat eseri
      </motion.p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORY FILTER
   ═══════════════════════════════════════════════════════════════ */
function CategoryFilter({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  return (
    <FadeIn>
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 md:mb-12">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => onChange(cat)}
            className={`relative px-5 md:px-7 py-2.5 text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-500
              ${active === cat ? 'text-black' : 'text-white/40 hover:text-white/70 border border-white/[0.08] hover:border-white/20'}`}>
            {active === cat && (
              <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-sm"
                layoutId="activeCat" transition={{ duration: 0.4 }} />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MENU CARD — Vertical, Bold Dark Style
   ═══════════════════════════════════════════════════════════════ */
function MenuCard({ item, index }: { item: typeof MENU_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-40px' });
  const [hover, setHover] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="group relative rounded-xl overflow-hidden"
        style={{ background: '#0c0a08', border: '1px solid rgba(255,255,255,0.06)' }}>

        {/* ── Image ── */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})`, filter: hover ? 'brightness(0.75) saturate(1.1)' : 'brightness(0.85) saturate(1)' }}
            transition={{ duration: 0.6 }} />

          {/* Gradient from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/30 to-transparent" />

          {/* Badge top-left */}
          {item.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded text-[9px] tracking-[0.15em] uppercase font-semibold bg-black/60 backdrop-blur-sm border border-amber-400/25 text-amber-300/90">
                ✦ {item.badge}
              </span>
            </div>
          )}

          {/* Number top-right */}
          <div className="absolute top-4 right-4 z-10">
            <span className="text-white/10 text-2xl font-extralight" style={{ fontFamily: 'Georgia, serif' }}>0{index + 1}</span>
          </div>

          {/* ── Content ON the image ── */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-5 md:p-6">
            {/* Category label */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-1 rounded-full bg-amber-400/60" />
              <span className="text-amber-400/60 text-[9px] tracking-[0.3em] uppercase font-medium">{item.category}</span>
            </div>

            {/* Name */}
            <h3 className="text-white text-xl md:text-2xl font-light tracking-wide mb-1.5 group-hover:text-amber-100 transition-colors duration-300">
              {item.name}
            </h3>

            {/* Description */}
            <p className="text-white/35 text-xs font-light leading-relaxed mb-4">{item.desc}</p>

            {/* Bottom row: Price + Buttons */}
            <div className="flex items-end justify-between">
              {/* Price */}
              <div>
                <div className="text-amber-300 text-2xl md:text-3xl font-light drop-shadow-lg">{item.price}</div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                {/* WhatsApp */}
                <motion.a href={waLink(item)} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 text-[#4ADE80] hover:bg-[#25D366]/30 hover:border-[#25D366]/50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={hover ? { opacity: 1, scale: 1 } : { opacity: 0.6, scale: 1 }}
                  whileHover={{ scale: 1.1 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </motion.a>

                {/* Detail */}
                <motion.button
                  className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-white/40 hover:border-white/30 hover:text-white/70 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={hover ? { opacity: 1, scale: 1 } : { opacity: 0.6, scale: 1 }}
                  whileHover={{ scale: 1.1 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Hover glow bottom ── */}
        <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
          initial={{ scaleX: 0 }} animate={{ scaleX: hover ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{ transformOrigin: 'center' }} />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TASTING BANNER
   ═══════════════════════════════════════════════════════════════ */
function TastingBanner() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true });
  const link = waLink({ id: 99, name: 'Şefin Tasting Menüsü', price: '₺1.200', desc: '7 aşamalı menü + şarap eşleştirmesi', category: 'Özel', image: '', badge: null });

  return (
    <FadeIn className="mt-12 md:mt-16">
      <div ref={ref} className="relative overflow-hidden rounded-2xl py-10 md:py-12 px-6 md:px-12"
        style={{ background: 'linear-gradient(135deg, #1a0f05, #120a02, #1a0f05)', border: '1px solid rgba(245,158,11,0.1)' }}>
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="text-amber-400/50 text-[10px] tracking-[0.4em] uppercase mb-2">✦ Özel Deneyim ✦</div>
            <h3 className="text-2xl md:text-3xl font-extralight text-white mb-2">
              Şefin <span className="italic text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>Tasting</span> Menüsü
            </h3>
            <p className="text-white/35 text-sm font-light max-w-md">7 aşamalı menü, her aşamada özel şarop eşleştirmesi dahil</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="text-amber-300 text-3xl font-light">₺1.200</div>
            <div className="text-white/25 text-[9px] tracking-[0.3em] uppercase">Kişi Başı</div>
            <div className="flex gap-3 mt-1">
              <a href={link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366]/15 border border-[#25D366]/35 text-[#4ADE80] text-[10px] tracking-[0.15em] uppercase font-semibold hover:bg-[#25D366]/25 transition-all duration-300">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <motion.button className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-black text-[10px] tracking-[0.15em] uppercase font-semibold hover:from-amber-500 hover:to-amber-400 transition-all duration-500"
                initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>Rezervasyon</motion.button>
            </div>
          </div>
        </div>
        <div className="absolute top-3 left-3"><Diamond size={5} color="rgba(245,158,11,0.15)" /></div>
        <div className="absolute top-3 right-3"><Diamond size={5} color="rgba(245,158,11,0.15)" /></div>
        <div className="absolute bottom-3 left-3"><Diamond size={5} color="rgba(245,158,11,0.15)" /></div>
        <div className="absolute bottom-3 right-3"><Diamond size={5} color="rgba(245,158,11,0.15)" /></div>
      </div>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════ */
export default function MenuSection() {
  const [active, setActive] = useState('Tümü');
  const items = active === 'Tümü' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === active);

  return (
    <section id="menu" className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505, #0a0806, #050505)' }}>

      {/* BG noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', mixBlendMode: 'overlay' }} />

      {/* Top/Bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/12 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/12 to-transparent" />

      {/* Floating shapes */}
      <motion.div className="absolute top-20 left-[4%] pointer-events-none opacity-15"
        animate={{ y: [0, -12, 0], rotate: [0, 45, 0] }} transition={{ duration: 12, repeat: Infinity }}><Diamond size={10} color="rgba(245,158,11,0.25)" /></motion.div>
      <motion.div className="absolute bottom-32 right-[5%] pointer-events-none opacity-10"
        animate={{ y: [0, 10, 0], rotate: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }}><Diamond size={8} color="rgba(245,158,11,0.2)" /></motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-16">
        <SectionHeader />
        <CategoryFilter active={active} onChange={setActive} />

        {/* ── 2x3 Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:gap-7">
          {items.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <TastingBanner />
      </div>
    </section>
  );
}

'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   PRODUCTS / MENU SECTION — Rich & Elaborate
   ═══════════════════════════════════════════════════════════════ */

const CATEGORIES = ['Tümü', 'Başlangıçlar', 'Ana Yemekler', 'Tatlılar', 'İçecekler'];

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Izgara Midye',
    desc: 'Tereyağlı sarımsak sos, parmesan kabuğu ve taze limon',
    price: '₺220',
    category: 'Başlangıçlar',
    image: '/menu-scallops.jpg',
    badge: 'Chef\'s Choice',
    tag: 'Deniz Ürünleri',
  },
  {
    id: 2,
    name: 'Lobster Bisque',
    desc: 'Istakoz çorbası, krema köpüğü, taze nane ve kırmızı biber',
    price: '₺280',
    category: 'Başlangıçlar',
    image: '/menu-soup.jpg',
    badge: null,
    tag: 'Çorba',
  },
  {
    id: 3,
    name: 'Wagyu Steak',
    desc: 'A5 Wagyu, yanmış tereyağı, trüf patates püresi, küçük sebzeler',
    price: '₺680',
    category: 'Ana Yemekler',
    image: '/menu-steak.jpg',
    badge: 'Signature',
    tag: 'Et',
  },
  {
    id: 4,
    name: 'Levrek Fillesi',
    desc: 'Fırında levrek, limon beurre blanc, kuşkonmaz ve kaper',
    price: '₺380',
    category: 'Ana Yemekler',
    image: '/menu-seabass.jpg',
    badge: null,
    tag: 'Deniz Ürünleri',
  },
  {
    id: 5,
    name: 'Çikolata Fondan',
    desc: 'Sıcak çikolata merkez, ahududu sosu, altın yaprak ve vanilyalı dondurma',
    price: '₺180',
    category: 'Tatlılar',
    image: '/menu-dessert.jpg',
    badge: 'Best Seller',
    tag: 'Çikolata',
  },
  {
    id: 6,
    name: 'Peynir Tabağı',
    desc: 'A seçimi peynirler, taze incir, bal, ceviz ve kızarmış ekmek',
    price: '₺320',
    category: 'Başlangıçlar',
    image: '/menu-cheese.jpg',
    badge: 'Paylaşılabilir',
    tag: 'Peynir',
  },
];

/* ─── Reusable Animation Wrapper ─── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Diamond Shape ─── */
function Diamond({ size = 8, color = 'rgba(245,158,11,0.4)' }: { size?: number; color?: string }) {
  return <div style={{ width: size, height: size, transform: 'rotate(45deg)', background: color, borderRadius: 1, flexShrink: 0 }} />;
}

/* ─── Section Header ─── */
function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="text-center mb-16 md:mb-20">
      {/* Top ornament */}
      <motion.div className="flex items-center justify-center gap-3 mb-6"
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-amber-400/40" />
        <Diamond size={8} color="rgba(245,158,11,0.5)" />
        <svg width="14" height="14" viewBox="0 0 24 24" className="text-amber-400/40">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
        </svg>
        <Diamond size={8} color="rgba(245,158,11,0.5)" />
        <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-amber-400/40" />
      </motion.div>

      {/* Subtitle */}
      <motion.p className="text-amber-400/80 text-[11px] md:text-xs tracking-[0.5em] uppercase font-medium mb-4"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
        Lezzetin Ötesinde
      </motion.p>

      {/* Title */}
      <motion.h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tight"
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
        <span className="block">Özel</span>
        <span className="block mt-1 text-amber-100/90" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}>
          Menümüz
        </span>
      </motion.h2>

      {/* Description */}
      <motion.p className="mt-6 text-white/50 text-sm md:text-base font-light tracking-wider max-w-xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}>
        Her tabak, şefimizin tutkuyla hazırladığı bir sanat eseri.
        En taze malzemelerle, özenle sunulan eşsiz tatlar.
      </motion.p>

      {/* Bottom ornament */}
      <motion.div className="flex items-center justify-center gap-2 mt-8"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.6 }}>
        <div className="w-2 h-px bg-amber-400/30" />
        <Diamond size={5} color="rgba(245,158,11,0.3)" />
        <div className="w-2 h-px bg-amber-400/30" />
      </motion.div>
    </div>
  );
}

/* ─── Category Filter Tabs ─── */
function CategoryFilter({ active, onChange }: { active: string; onChange: (cat: string) => void }) {
  return (
    <FadeIn>
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12 md:mb-16">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`relative px-5 md:px-7 py-2.5 text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-500
              ${active === cat
                ? 'text-black'
                : 'text-white/40 hover:text-white/70 border border-white/[0.08] hover:border-white/20'
              }`}
          >
            {active === cat && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-sm"
                layoutId="activeCategory"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>
    </FadeIn>
  );
}

/* ─── Single Menu Card ─── */
function MenuCard({ item, index }: { item: typeof MENU_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badge */}
          {item.badge && (
            <div className="absolute top-4 left-4 z-10">
              <div className="px-3 py-1.5 rounded-md text-[9px] tracking-[0.2em] uppercase font-medium"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(245,158,11,0.3)', color: 'rgba(245,200,80,0.9)' }}>
                ✦ {item.badge}
              </div>
            </div>
          )}

          {/* Tag */}
          <div className="absolute top-4 right-4 z-10">
            <div className="px-2.5 py-1 rounded-md text-[9px] tracking-[0.15em] uppercase font-medium text-white/60"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
              {item.tag}
            </div>
          </div>

          {/* Price on image */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="text-amber-300/90 text-lg md:text-xl font-light tracking-wider drop-shadow-lg">
              {item.price}
            </div>
          </div>

          {/* Hover overlay with CTA */}
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: 'rgba(0,0,0,0.4)' }}
          >
            <motion.button
              className="px-6 py-2.5 bg-amber-500/90 text-black text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-amber-400 transition-colors duration-300"
              initial={{ y: 20, opacity: 0 }}
              animate={hovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              Detaylar
            </motion.button>
          </motion.div>
        </div>

        {/* Card Content */}
        <div className="p-5 md:p-6">
          {/* Name */}
          <h3 className="text-white text-base md:text-lg font-light tracking-wide drop-shadow-md mb-2 group-hover:text-amber-200 transition-colors duration-300">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed mb-4">
            {item.desc}
          </p>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-amber-400/50" />
              <span className="text-white/25 text-[9px] tracking-[0.2em] uppercase">{item.category}</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400/50 group-hover:text-amber-400/80 transition-colors duration-300">
              <span className="text-[9px] tracking-wider uppercase font-medium">Sipariş Ver</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom border glow on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Special Banner ─── */
function SpecialBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <FadeIn className="mt-16 md:mt-20">
      <div ref={ref} className="relative overflow-hidden rounded-2xl py-10 md:py-14 px-6 md:px-12"
        style={{
          background: 'linear-gradient(135deg, rgba(30,15,5,0.9) 0%, rgba(20,10,2,0.95) 50%, rgba(30,15,5,0.9) 100%)',
          border: '1px solid rgba(245,158,11,0.12)',
        }}>
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="text-amber-400/60 text-[10px] tracking-[0.4em] uppercase font-medium mb-3">✦ Özel Deneyim ✦</div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extralight text-white tracking-tight mb-3">
              Şefin <span className="italic text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>Tasting</span> Menüsü
            </h3>
            <p className="text-white/40 text-sm font-light max-w-md leading-relaxed">
              7 aşamalı specially curated menü ile damak tadınızı şımartın. Her aşamada özel şarap eşleştirmesi dahil.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="text-amber-300 text-3xl md:text-4xl font-light">₺1.200</div>
            <div className="text-white/30 text-[9px] tracking-[0.3em] uppercase">Kişi Başı</div>
            <motion.button
              className="mt-2 px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black text-[11px] tracking-[0.2em] uppercase font-semibold hover:from-amber-500 hover:to-amber-400 transition-all duration-500"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
              Hemen Rezerve Et
            </motion.button>
          </div>
        </div>

        {/* Corner ornaments */}
        <div className="absolute top-4 left-4"><Diamond size={6} color="rgba(245,158,11,0.2)" /></div>
        <div className="absolute top-4 right-4"><Diamond size={6} color="rgba(245,158,11,0.2)" /></div>
        <div className="absolute bottom-4 left-4"><Diamond size={6} color="rgba(245,158,11,0.2)" /></div>
        <div className="absolute bottom-4 right-4"><Diamond size={6} color="rgba(245,158,11,0.2)" /></div>
      </div>
    </FadeIn>
  );
}

/* ─── Quick Info Row ─── */
function QuickInfoRow() {
  const infos = [
    { icon: '🥂', label: 'Şarap Eşleştirmesi', value: '+₺350' },
    { icon: '🌿', label: 'Vejetaryen Seçenekler', value: 'Mevcut' },
    { icon: '🥜', label: 'Alerjen Bilgisi', value: 'Sorunuz' },
    { icon: '⏰', label: 'Hazırlık Süresi', value: '25-45 dk' },
  ];

  return (
    <FadeIn className="mt-12 md:mt-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {infos.map((info, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-2 py-5 px-4 rounded-xl text-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="text-lg">{info.icon}</span>
            <span className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-medium">{info.label}</span>
            <span className="text-amber-400/70 text-xs font-light">{info.value}</span>
          </motion.div>
        ))}
      </div>
    </FadeIn>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN MENU SECTION
   ═══════════════════════════════════════════════════════════════ */
export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const filteredItems = activeCategory === 'Tümü'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0a0806 50%, #050505 100%)' }}>

      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16">

        {/* Section Header */}
        <SectionHeader />

        {/* Category Filter */}
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Special Banner */}
        <SpecialBanner />

        {/* Quick Info */}
        <QuickInfoRow />
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />

      {/* Floating decorative elements */}
      <motion.div className="absolute top-20 left-[5%] pointer-events-none opacity-20"
        animate={{ y: [0, -15, 0], rotate: [0, 45, 0] }} transition={{ duration: 12, repeat: Infinity }}>
        <Diamond size={10} color="rgba(245,158,11,0.3)" />
      </motion.div>
      <motion.div className="absolute bottom-32 right-[8%] pointer-events-none opacity-20"
        animate={{ y: [0, 10, 0], rotate: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }}>
        <Diamond size={8} color="rgba(245,158,11,0.2)" />
      </motion.div>
    </section>
  );
}

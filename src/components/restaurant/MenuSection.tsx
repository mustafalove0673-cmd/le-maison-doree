'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   MENU SECTION — Horizontal Cards, 2x3 Grid, WhatsApp CTA
   ═══════════════════════════════════════════════════════════════ */

const CATEGORIES = ['Tümü', 'Başlangıçlar', 'Ana Yemekler', 'Tatlılar', 'İçecekler'];

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Izgara Midye',
    desc: 'Tereyağlı sarımsak sos, parmesan kabuğu ve taze limon ile servis edilir',
    price: '₺220',
    category: 'Başlangıçlar',
    image: '/menu-scallops.jpg',
    badge: 'Chef\'s Choice',
    tag: 'Deniz Ürünleri',
  },
  {
    id: 2,
    name: 'Lobster Bisque',
    desc: 'Istakoz çorbası, krema köpüğü, taze nane ve kırmızı biber ile sunulur',
    price: '₺280',
    category: 'Başlangıçlar',
    image: '/menu-soup.jpg',
    badge: null,
    tag: 'Çorba',
  },
  {
    id: 3,
    name: 'Wagyu Steak',
    desc: 'A5 Wagyu, yanmış tereyağı, trüf patates püresi ve mevsim sebzeleri',
    price: '₺680',
    category: 'Ana Yemekler',
    image: '/menu-steak.jpg',
    badge: 'Signature',
    tag: 'Et',
  },
  {
    id: 4,
    name: 'Levrek Fillesi',
    desc: 'Fırında levrek, limon beurre blanc sos, kuşkonmaz ve kaper ile',
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
    desc: 'A seçimi peynirler, taze incir, organik bal, ceviz ve kızarmış ekmek',
    price: '₺320',
    category: 'Başlangıçlar',
    image: '/menu-cheese.jpg',
    badge: 'Paylaşılabilir',
    tag: 'Peynir',
  },
];

/* ─── WhatsApp Config ─── */
const WA_NUMBER = '905551234567';
function getWhatsAppLink(item: typeof MENU_ITEMS[0]) {
  const msg = encodeURIComponent(
    `Merhaba! Le Maison Dorée restoranınızdan bilgi almak istiyorum.\n\n` +
    `🍽️ İlgi duyduğum menü: *${item.name}*\n` +
    `💰 Fiyat: ${item.price}\n` +
    `📋 ${item.desc}\n\n` +
    `Bu menü hakkında rezervasyon yapmak istiyorum. Müsaitliğinizi öğrenebilir miyim?`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

/* ─── Helpers ─── */
function Diamond({ size = 8, color = 'rgba(245,158,11,0.4)' }: { size?: number; color?: string }) {
  return <div style={{ width: size, height: size, transform: 'rotate(45deg)', background: color, borderRadius: 1, flexShrink: 0 }} />;
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Section Header ─── */
function SectionHeader() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="text-center mb-14 md:mb-18">
      <motion.div className="flex items-center justify-center gap-3 mb-5"
        initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-amber-400/40" />
        <Diamond size={8} color="rgba(245,158,11,0.5)" />
        <svg width="14" height="14" viewBox="0 0 24 24" className="text-amber-400/40"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" /></svg>
        <Diamond size={8} color="rgba(245,158,11,0.5)" />
        <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-amber-400/40" />
      </motion.div>

      <motion.p className="text-amber-400/80 text-[11px] md:text-xs tracking-[0.5em] uppercase font-medium mb-3"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
        Lezzetin Ötesinde
      </motion.p>

      <motion.h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tight"
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
        <span className="block">Özel</span>
        <span className="block mt-1 text-amber-100/90" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}>Menümüz</span>
      </motion.h2>

      <motion.p className="mt-5 text-white/50 text-sm md:text-base font-light tracking-wider max-w-xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}>
        Her tabak, şefimizin tutkuyla hazırladığı bir sanat eseri. En taze malzemelerle, özenle sunulan eşsiz tatlar.
      </motion.p>
    </div>
  );
}

/* ─── Category Filter ─── */
function CategoryFilter({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  return (
    <FadeIn>
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 md:mb-14">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => onChange(cat)}
            className={`relative px-5 md:px-7 py-2.5 text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium transition-all duration-500
              ${active === cat ? 'text-black' : 'text-white/40 hover:text-white/70 border border-white/[0.08] hover:border-white/20'}`}>
            {active === cat && (
              <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-sm"
                layoutId="activeCat" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>
    </FadeIn>
  );
}

/* ─── Menu Card — Horizontal Layout ─── */
function MenuCard({ item, index }: { item: typeof MENU_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [hovered, setHovered] = useState(false);
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className={`group flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-0 md:gap-0`}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image Side */}
      <div className="relative w-full md:w-[45%] h-56 sm:h-64 md:h-auto md:min-h-[280px] overflow-hidden rounded-t-xl md:rounded-t-none md:rounded-l-xl flex-shrink-0"
        style={isReversed ? { borderRadius: '0.75rem 0.75rem 0 0' } : {}}>
        {isReversed && <style>{`.card-r-${index} { border-radius: 0 0.75rem 0.75rem 0 !important; }`}</style>}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-4 left-4 z-10">
            <div className="px-3 py-1.5 rounded-md text-[9px] tracking-[0.15em] uppercase font-semibold"
              style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)', border: '1px solid rgba(245,158,11,0.3)', color: 'rgba(245,200,80,0.95)' }}>
              ✦ {item.badge}
            </div>
          </div>
        )}

        {/* Tag */}
        <div className="absolute top-4 right-4 z-10">
          <div className="px-2.5 py-1 rounded-md text-[9px] tracking-[0.15em] uppercase font-medium text-white/50"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
            {item.tag}
          </div>
        </div>

        {/* Price on image */}
        <div className="absolute bottom-4 left-4 z-10 md:bottom-6 md:left-6">
          <div className="text-amber-300/90 text-2xl md:text-3xl font-light drop-shadow-lg">{item.price}</div>
        </div>
      </div>

      {/* Content Side */}
      <div
        className={`flex-1 relative p-5 md:p-7 lg:p-8 flex flex-col justify-between min-h-[200px]
          ${isReversed ? 'md:rounded-l-xl rounded-b-xl' : 'md:rounded-r-xl rounded-b-xl'}`}
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: isReversed ? undefined : undefined,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Fix border radius for md */}
        <div className={`absolute inset-0 pointer-events-none rounded-xl ${isReversed ? 'md:rounded-l-xl rounded-b-xl' : 'md:rounded-r-xl rounded-b-xl'}`}
          style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: isReversed ? '0.75rem 0.75rem 0 0.75rem' : '0.75rem 0.75rem 0.75rem 0', borderRight: isReversed ? undefined : undefined }}
        />

        {/* Top: Category + Order number */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
            <span className="text-white/30 text-[9px] tracking-[0.25em] uppercase font-medium">{item.category}</span>
          </div>
          <span className="text-white/15 text-[11px] font-extralight tracking-wider">0{index + 1}</span>
        </div>

        {/* Middle: Name + Desc */}
        <div className="flex-1">
          <h3 className="text-white text-xl md:text-2xl font-light tracking-wide mb-3 group-hover:text-amber-200 transition-colors duration-300 drop-shadow-sm">
            {item.name}
          </h3>
          <p className="text-white/35 text-xs md:text-sm font-light leading-relaxed">
            {item.desc}
          </p>
        </div>

        {/* Bottom: Buttons */}
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.06]">
          {/* WhatsApp Button */}
          <a
            href={getWhatsAppLink(item)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-lg text-[10px] tracking-[0.15em] uppercase font-semibold transition-all duration-500
                       bg-[#25D366]/15 border border-[#25D366]/30 text-[#4ADE80] hover:bg-[#25D366]/25 hover:border-[#25D366]/50"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Detail Button */}
          <button className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-lg text-[10px] tracking-[0.15em] uppercase font-medium
                             text-white/40 border border-white/[0.08] hover:text-white/70 hover:border-white/20 transition-all duration-500">
            <span>Detaylar</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 transition-transform duration-300">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price (mobile) */}
          <div className="md:hidden text-amber-400/70 text-base font-light">{item.price}</div>
        </div>

        {/* Hover accent line */}
        <motion.div className={`absolute bottom-0 h-px bg-gradient-to-r ${isReversed ? 'from-amber-400/40 to-transparent' : 'from-transparent to-amber-400/40'}`}
          style={{ left: 0, right: 0 }}
          initial={{ scaleX: 0 }} animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          {...(isReversed ? { style: { transformOrigin: 'right', left: 0, right: 0 } } : { style: { transformOrigin: 'left', left: 0, right: 0 } })}
        />
      </div>
    </motion.div>
  );
}

/* ─── Tasting Menu Banner ─── */
function TastingBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const waLink = getWhatsAppLink({
    id: 99, name: 'Şefin Tasting Menüsü (7 Aşama)', price: '₺1.200',
    desc: '7 aşamalı specially curated menü, her aşamada özel şarap eşleştirmesi dahil',
    category: 'Özel', image: '', badge: null, tag: '',
  });

  return (
    <FadeIn className="mt-14 md:mt-18">
      <div ref={ref} className="relative overflow-hidden rounded-2xl py-10 md:py-14 px-6 md:px-12"
        style={{ background: 'linear-gradient(135deg, rgba(30,15,5,0.9) 0%, rgba(20,10,2,0.95) 50%, rgba(30,15,5,0.9) 100%)', border: '1px solid rgba(245,158,11,0.12)' }}>
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
            <div className="flex items-center gap-3 mt-1">
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#4ADE80] text-[10px] tracking-[0.2em] uppercase font-semibold hover:bg-[#25D366]/30 transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <motion.button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-black text-[10px] tracking-[0.2em] uppercase font-semibold hover:from-amber-500 hover:to-amber-400 transition-all duration-500"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
                Rezervasyon
              </motion.button>
            </div>
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

/* ─── Info Row ─── */
function InfoRow() {
  const infos = [
    { icon: '🥂', label: 'Şarap Eşleştirmesi', value: '+₺350' },
    { icon: '🌿', label: 'Vejetaryen Seçenek', value: 'Mevcut' },
    { icon: '🥜', label: 'Alerjen Bilgisi', value: 'Sorunuz' },
    { icon: '⏰', label: 'Hazırlık Süresi', value: '25-45 dk' },
  ];
  return (
    <FadeIn className="mt-12 md:mt-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {infos.map((info, i) => (
          <motion.div key={i}
            className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl text-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <span className="text-base">{info.icon}</span>
            <span className="text-white/50 text-[9px] tracking-[0.2em] uppercase font-medium">{info.label}</span>
            <span className="text-amber-400/60 text-xs font-light">{info.value}</span>
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

      {/* BG noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', mixBlendMode: 'overlay' }} />

      {/* Top/Bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />

      {/* Floating shapes */}
      <motion.div className="absolute top-24 left-[5%] pointer-events-none opacity-20"
        animate={{ y: [0, -15, 0], rotate: [0, 45, 0] }} transition={{ duration: 12, repeat: Infinity }}>
        <Diamond size={10} color="rgba(245,158,11,0.3)" />
      </motion.div>
      <motion.div className="absolute bottom-40 right-[6%] pointer-events-none opacity-15"
        animate={{ y: [0, 10, 0], rotate: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }}>
        <Diamond size={8} color="rgba(245,158,11,0.2)" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-10 lg:px-16">
        <SectionHeader />
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        {/* Grid: 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-7">
          <AnimatePresence>
            {filteredItems.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </div>

        <TastingBanner />
        <InfoRow />
      </div>
    </section>
  );
}

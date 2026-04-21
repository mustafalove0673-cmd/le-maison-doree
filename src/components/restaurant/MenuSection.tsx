'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useInView, AnimatePresence, LayoutGroup } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   FULL MENU — 4 Categories × 10 Items, Search, Unique Grid
   ═══════════════════════════════════════════════════════════════ */

const CATEGORIES = ['Tümü', 'Başlangıçlar', 'Ana Yemekler', 'Tatlılar', 'İçecekler'];

const ALL_ITEMS = [
  // ── BAŞLANGIÇLAR ──
  { id: 1,  name: 'Izgara Midye',        desc: 'Tereyağlı sarımsak sos, parmesan kabuğu, limon',       price: '₺220',  cat: 'Başlangıçlar', img: '/menu-scallops.jpg' },
  { id: 2,  name: 'Lobster Bisque',      desc: 'Istakoz çorbası, krema köpüğü, taze nane',             price: '₺280',  cat: 'Başlangıçlar', img: '/menu-soup.jpg' },
  { id: 3,  name: 'Peynir Tabağı',       desc: 'A seçimi peynirler, incir, bal, ceviz, ekmek',          price: '₺320',  cat: 'Başlangıçlar', img: '/menu-cheese.jpg' },
  { id: 4,  name: 'Ton Tataki',          desc: 'Çiğ ton, ponzu sos, avokado, susam',                    price: '₺260',  cat: 'Başlangıçlar', img: '/menu-seabass.jpg' },
  { id: 5,  name: 'Karides Tempura',     desc: 'Kızarmış karides, tatlı acı sos, wasabi mayo',          price: '₺240',  cat: 'Başlangıçlar', img: '/menu-scallops.jpg' },
  { id: 6,  name: 'Mantar Çorbası',      desc: 'Trüf mantar çorbası, krem köpüğü, ceviz',              price: '₺190',  cat: 'Başlangıçlar', img: '/menu-soup.jpg' },
  { id: 7,  name: 'Beef Carpaccio',      desc: 'İnce dilim dana file, roka, parmesan, trüf yağı',       price: '₺290',  cat: 'Başlangıçlar', img: '/menu-steak.jpg' },
  { id: 8,  name: 'Hümüs Royals',        desc: 'Leblebi humüs, nar ekşisi, zeytinyağı, lavaş',          price: '₺140',  cat: 'Başlangıçlar', img: '/menu-cheese.jpg' },
  { id: 9,  name: 'Ahtapot Salatası',    desc: 'Izgara ahtapot, cherry domates, zeytin, limon',         price: '₺250',  cat: 'Başlangıçlar', img: '/menu-scallops.jpg' },
  { id: 10, name: 'Foie Gras',           desc: 'Kaz ciğeri, karamelize elma, brioche ekmek',            price: '₺420',  cat: 'Başlangıçlar', img: '/menu-soup.jpg' },

  // ── ANA YEMEKLER ──
  { id: 11, name: 'Wagyu Steak',         desc: 'A5 Wagyu, trüf patates püresi, mevsim sebzeleri',       price: '₺680',  cat: 'Ana Yemekler', img: '/menu-steak.jpg' },
  { id: 12, name: 'Levrek Fillesi',      desc: 'Fırında levrek, beurre blanc, kuşkonmaz, kaper',       price: '₺380',  cat: 'Ana Yemekler', img: '/menu-seabass.jpg' },
  { id: 13, name: 'Duck Confit',         desc: 'Yavaş pişirilmiş ördek, portakal sos, patates graten',   price: '₺420',  cat: 'Ana Yemekler', img: '/menu-steak.jpg' },
  { id: 14, name: 'Iberico Porchetta',   desc: 'Iberico domuz, elma püresi, hardal sosu',               price: '₺460',  cat: 'Ana Yemekler', img: '/menu-steak.jpg' },
  { id: 15, name: 'Somon En Croûte',     desc: 'Somon, ıspanaklı hamur, béarnaise sos',                 price: '₺360',  cat: 'Ana Yemekler', img: '/menu-seabass.jpg' },
  { id: 16, name: 'Lamb Shank',          desc: 'Kuzunun incik kısmı, rozemary patates, glaze',          price: '₺440',  cat: 'Ana Yemekler', img: '/menu-steak.jpg' },
  { id: 17, name: 'Risotto ai Funghi',   desc: 'Karidesli mantar risotto, parmesan, trüf',             price: '₺340',  cat: 'Ana Yemekler', img: '/menu-scallops.jpg' },
  { id: 18, name: 'Tuna Steak',          desc: 'Izgara ton balığı, soya glaz, zencefil, pirinç',         price: '₺390',  cat: 'Ana Yemekler', img: '/menu-seabass.jpg' },
  { id: 19, name: 'Chicken Ballotine',   desc: 'Boneless tavuk, daha sos, trüflü couscous',             price: '₺300',  cat: 'Ana Yemekler', img: '/menu-steak.jpg' },
  { id: 20, name: 'Seafood Platter',     desc: 'Karides, ıstakoz, ahtapot, midye, sos trio',             price: '₺580',  cat: 'Ana Yemekler', img: '/menu-scallops.jpg' },

  // ── TATLILAR ──
  { id: 21, name: 'Çikolata Fondan',     desc: 'Sıcak çikolata, ahududu, altın yaprak, dondurma',       price: '₺180',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 22, name: 'Crème Brûlée',        desc: 'Vanilya krem, karamelize şeker, taze meyve',            price: '₺150',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 23, name: 'Tiramisu',            desc: 'Klasik İtalyan, espresso, mascarpone, kakao',            price: '₺160',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 24, name: 'Panna Cotta',         desc: 'Vanilya panna cotta, çilek sos, taze nane',             price: '₺140',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 25, name: 'Baklava Moderne',     desc: 'Fıstıklı baklava, kaymak, bal glaze, pistachio',         price: '₺170',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 26, name: 'Profiteroles',        desc: 'Krem şanti, çikolata sos, kavrulmuş fındık',             price: '₺155',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 27, name: 'Sorbet Trio',         desc: 'Mango, limon, ahududu sorbet, taze meyve',               price: '₺120',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 28, name: 'Mille-feuille',       desc: 'Karamel krem, karamelize fıstık, vanilya',               price: '₺175',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 29, name: 'Künefe',             desc: 'Geleneksel künefe, kaymak, antep fıstığı',                price: '₺165',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 30, name: 'Cheesecake',          desc: 'New York cheesecake, yaban mersini kompotu',             price: '₺150',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },

  // ── İÇECEKLER ──
  { id: 31, name: 'Smoky Old Fashioned', desc: 'Bourbon, şeker, bitter, duman efektli',                 price: '₺180',  cat: 'İçecekler', img: '/menu-cocktail1.jpg' },
  { id: 32, name: 'Château Margaux',     desc: '2015 Bordeaux, kırmızı meyve, vanilya notları',           price: '₺950',  cat: 'İçecekler', img: '/menu-wine.jpg' },
  { id: 33, name: 'Tropical Sunset',     desc: 'Mango, ananas, hindistan cevizi, lime',                  price: '₺120',  cat: 'İçecekler', img: '/menu-mocktail.jpg' },
  { id: 34, name: 'Negroni',             desc: 'Gin, bitter campari, tatlı vermut, portakal',            price: '₺160',  cat: 'İçecekler', img: '/menu-cocktail1.jpg' },
  { id: 35, name: 'Barolo Riserva',      desc: '2016 Piemonte, kuru meyve, tarçın, çikolata',            price: '₺850',  cat: 'İçecekler', img: '/menu-wine.jpg' },
  { id: 36, name: 'Elderflower Spritz',  desc: 'Elderflower, prosecco, misket limonu, buz',              price: '₺130',  cat: 'İçecekler', img: '/menu-mocktail.jpg' },
  { id: 37, name: 'Espresso Martini',    desc: 'Votka, kahve likör, taze espresso, vanilya',             price: '₺170',  cat: 'İçecekler', img: '/menu-cocktail1.jpg' },
  { id: 38, name: 'Sancerre Blanc',      desc: '2022 Loire, citrus, beyaz çiçek, mineral',               price: '₺420',  cat: 'İçecekler', img: '/menu-wine.jpg' },
  { id: 39, name: 'Berry Bliss',         desc: 'Ahududu, çilek, yaban mersini, nane, soda',              price: '₺100',  cat: 'İçecekler', img: '/menu-mocktail.jpg' },
  { id: 40, name: 'Whisky Sour',         desc: 'Japon viski, limon, şeker köpüğü, bitters',              price: '₺175',  cat: 'İçecekler', img: '/menu-cocktail1.jpg' },
];

const WA_NUMBER = '905551234567';
function waLink(item: typeof ALL_ITEMS[0]) {
  const msg = encodeURIComponent(`Merhaba! Le Maison Dorée'den bilgi almak istiyorum.\n\n🍽️ ${item.name} - ${item.price}\n${item.desc}\n\nRezervasyon yapmak istiyorum.`);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

/* ─── Helpers ─── */
function Diamond({ size = 8, color = 'rgba(245,158,11,0.4)' }: { size?: number; color?: string }) {
  return <div style={{ width: size, height: size, transform: 'rotate(45deg)', background: color, borderRadius: 1, flexShrink: 0 }} />;
}

function useFadeIn(delay = 0) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-50px' });
  return { ref, props: { initial: { opacity: 0, y: 40 } as const, animate: v ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const } } };
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════════════════ */
function SectionHeader() {
  const { ref, props: p1 } = useFadeIn(0);
  const { props: p2 } = useFadeIn(0.15);
  const { props: p3 } = useFadeIn(0.25);
  const { props: p4 } = useFadeIn(0.35);

  return (
    <div ref={ref} className="text-center mb-12 md:mb-16">
      <motion.div {...p1} className="flex items-center justify-center gap-3 mb-5">
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-amber-400/40" />
        <Diamond size={8} />
        <svg width="14" height="14" viewBox="0 0 24 24" className="text-amber-400/40"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" /></svg>
        <Diamond size={8} />
        <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-amber-400/40" />
      </motion.div>
      <motion.p {...p2} className="text-amber-400/80 text-[11px] md:text-xs tracking-[0.5em] uppercase font-medium mb-3">Lezzetin Ötesinde</motion.p>
      <motion.h2 {...p3} className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white tracking-tight">
        <span className="block">Özel</span>
        <span className="block mt-1 text-amber-100/90 italic" style={{ fontFamily: 'Georgia, serif' }}>Menümüz</span>
      </motion.h2>
      <motion.p {...p4} className="mt-5 text-white/50 text-sm font-light tracking-wider max-w-lg mx-auto">Her tabak, şefimizin tutkuyla hazırladığı bir sanat eseri</motion.p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SEARCH BAR
   ═══════════════════════════════════════════════════════════════ */
function SearchBar({ query, onChange }: { query: string; onChange: (q: string) => void }) {
  const { ref, props } = useFadeIn(0);
  return (
    <motion.div ref={ref} {...props} className="max-w-xl mx-auto mb-10 md:mb-12">
      <div className="relative group">
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-amber-400/20 via-transparent to-amber-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center gap-3 px-5 py-3.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" className="flex-shrink-0">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Yemek ara... (örn: wagyu, çikolata, cocktail)"
            className="flex-1 bg-transparent text-white/80 text-sm font-light tracking-wider placeholder:text-white/20 outline-none"
          />
          {query && (
            <motion.button initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => onChange('')} className="text-white/30 hover:text-white/60 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORY FILTER
   ═══════════════════════════════════════════════════════════════ */
function CategoryFilter({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  const { ref, props } = useFadeIn(0.1);
  return (
    <motion.div ref={ref} {...props} className="flex flex-wrap items-center justify-center gap-2 mb-8 md:mb-10">
      {CATEGORIES.map((cat) => (
        <button key={cat} onClick={() => onChange(cat)}
          className={`relative px-4 md:px-6 py-2 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-500 rounded-md
            ${active === cat ? 'text-black' : 'text-white/35 hover:text-white/60 border border-white/[0.06] hover:border-white/15'}`}>
          {active === cat && (
            <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-md"
              layoutId="catTab" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />
          )}
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MENU CARD — Unique Staggered Design
   ═══════════════════════════════════════════════════════════════ */
function MenuCard({ item, index }: { item: typeof ALL_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-30px' });
  const [hover, setHover] = useState(false);

  // Stagger: even rows normal, odd rows slightly offset
  const isOddRow = Math.floor(index / 2) % 2 === 1;
  const isRight = index % 2 === 1;

  return (
    <motion.div ref={ref}
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={v ? { opacity: 1, y: isOddRow ? (isRight ? 16 : -16) : 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full"
    >
      <div className="group relative overflow-hidden rounded-xl"
        style={{
          background: hover ? '#12100c' : '#0c0a08',
          border: `1px solid ${hover ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)'}`,
          transition: 'all 0.5s ease',
          transform: hover ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hover ? '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(245,158,11,0.05)' : 'none',
        }}>

        {/* ── Image ── */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.img})` }}
            animate={{ scale: hover ? 1.1 : 1, filter: hover ? 'brightness(0.7) saturate(1.15)' : 'brightness(0.8) saturate(1)' }}
            transition={{ duration: 0.7 }} />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/40 via-transparent to-transparent" />

          {/* Category label */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded text-[8px] tracking-[0.25em] uppercase font-semibold"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)' }}>
              {item.cat}
            </span>
          </div>

          {/* Order number */}
          <motion.div className="absolute top-3 right-3 z-10"
            animate={{ opacity: hover ? 0.6 : 0.12 }}
            transition={{ duration: 0.3 }}>
            <span className="text-white text-xl font-extralight" style={{ fontFamily: 'Georgia, serif' }}>0{index + 1}</span>
          </motion.div>

          {/* ── Content overlay ── */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-5">
            {/* Name */}
            <h3 className="text-white text-lg md:text-xl font-light tracking-wide mb-1 transition-colors duration-300"
              style={{ color: hover ? 'rgba(253,230,138,0.9)' : 'rgba(255,255,255,0.85)' }}>
              {item.name}
            </h3>

            {/* Desc */}
            <p className="text-white/30 text-[11px] md:text-xs font-light leading-relaxed mb-3"
              style={{ opacity: hover ? 0.6 : 0.4 }}>
              {item.desc}
            </p>

            {/* Bottom row */}
            <div className="flex items-end justify-between">
              {/* Price */}
              <motion.span className="text-amber-300 text-xl md:text-2xl font-light"
                animate={{ scale: hover ? 1.05 : 1 }} transition={{ duration: 0.3 }}>
                {item.price}
              </motion.span>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <a href={waLink(item)} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300"
                  style={{
                    background: hover ? 'rgba(37,211,102,0.2)' : 'rgba(37,211,102,0.08)',
                    border: `1px solid ${hover ? 'rgba(37,211,102,0.4)' : 'rgba(37,211,102,0.15)'}`,
                  }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={hover ? '#4ADE80' : 'rgba(74,222,128,0.5)'} className="transition-colors duration-300">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <button className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300"
                  style={{
                    background: hover ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${hover ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
                  }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hover ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)'} strokeWidth="2" className="transition-colors duration-300">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Hover: glow border line */}
          <motion.div className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)' }}
            animate={{ scaleX: hover ? 1 : 0 }} transition={{ duration: 0.4 }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESULTS COUNT
   ═══════════════════════════════════════════════════════════════ */
function ResultCount({ count }: { count: number }) {
  return (
    <motion.div className="text-center mb-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <span className="text-white/25 text-[10px] tracking-[0.3em] uppercase font-light">
        <span className="text-amber-400/50">{count}</span> ürün gösteriliyor
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TASTING BANNER
   ═══════════════════════════════════════════════════════════════ */
function TastingBanner() {
  const { ref, props } = useFadeIn(0);
  const link = waLink({ id: 99, name: 'Şefin Tasting Menüsü', price: '₺1.200', desc: '7 aşamalı menü + şarap eşleştirmesi', cat: 'Özel', img: '' });

  return (
    <motion.div ref={ref} {...props} className="mt-12 md:mt-16">
      <div className="relative overflow-hidden rounded-2xl py-8 md:py-10 px-6 md:px-10"
        style={{ background: 'linear-gradient(135deg, #1a0f05, #0f0803, #1a0f05)', border: '1px solid rgba(245,158,11,0.08)' }}>
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.03) 0%, transparent 70%)' }} />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-amber-400/40 text-[9px] tracking-[0.4em] uppercase mb-2">✦ Özel Deneyim ✦</div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-extralight text-white mb-1">
              Şefin <span className="italic text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>Tasting</span> Menüsü
            </h3>
            <p className="text-white/30 text-xs md:text-sm font-light">7 aşamalı menü, özel şarop eşleştirmesi dahil</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-amber-300 text-2xl md:text-3xl font-light">₺1.200</div>
            <div className="text-white/20 text-[8px] tracking-[0.3em] uppercase">Kişi Başı</div>
            <div className="flex gap-2 mt-1">
              <a href={link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/12 border border-[#25D366]/25 text-[#4ADE80] text-[9px] tracking-[0.15em] uppercase font-semibold hover:bg-[#25D366]/20 transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <button className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-black text-[9px] tracking-[0.15em] uppercase font-semibold hover:from-amber-500 hover:to-amber-400 transition-all duration-500">Rezervasyon</button>
            </div>
          </div>
        </div>
        {[['top-3 left-3'], ['top-3 right-3'], ['bottom-3 left-3'], ['bottom-3 right-3']].map(([cls], i) => (
          <div key={i} className={`absolute ${cls}`}><Diamond size={5} color="rgba(245,158,11,0.12)" /></div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN MENU SECTION
   ═══════════════════════════════════════════════════════════════ */
export default function MenuSection() {
  const [active, setActive] = useState('Tümü');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let items = active === 'Tümü' ? ALL_ITEMS : ALL_ITEMS.filter(i => i.cat === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.desc.toLowerCase().includes(q) ||
        i.cat.toLowerCase().includes(q)
      );
    }
    return items;
  }, [active, search]);

  return (
    <section id="menu" className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505, #0a0806, #050505)' }}>

      {/* BG */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', mixBlendMode: 'overlay' }} />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />

      {/* Floating */}
      <motion.div className="absolute top-20 left-[4%] pointer-events-none opacity-10" animate={{ y: [0, -12, 0], rotate: [0, 45, 0] }} transition={{ duration: 12, repeat: Infinity }}><Diamond size={10} color="rgba(245,158,11,0.2)" /></motion.div>
      <motion.div className="absolute bottom-32 right-[5%] pointer-events-none opacity-8" animate={{ y: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity }}><Diamond size={8} color="rgba(245,158,11,0.15)" /></motion.div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
        <SectionHeader />
        <SearchBar query={search} onChange={setSearch} />
        <CategoryFilter active={active} onChange={setActive} />

        <AnimatePresence mode="wait">
          <motion.div key={`${active}-${search}`} className="mb-6">
            <ResultCount count={filtered.length} />
          </motion.div>
        </AnimatePresence>

        {/* ── 2x Grid with staggered offset ── */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <MenuCard key={item.id} item={item} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-white/20 text-4xl mb-4">🔍</div>
            <p className="text-white/30 text-sm font-light">Aramanızla eşleşen ürün bulunamadı</p>
          </motion.div>
        )}

        <TastingBanner />
      </div>
    </section>
  );
}

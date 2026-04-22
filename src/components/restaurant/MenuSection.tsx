'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['Tümü', 'Başlangıçlar', 'Ara Sıcaklar', 'Ana Yemekler', 'Tatlılar', 'İçecekler'];

const ALL_ITEMS = [
  { id: 1,  name: 'Izgara Midye',        desc: 'Tereyağlı sarımsak sos, parmesan, limon',       price: '₺220',  cat: 'Başlangıçlar', img: '/menu-scallops.jpg' },
  { id: 2,  name: 'Lobster Bisque',      desc: 'Istakoz çorbası, krema köpüğü, taze nane',       price: '₺280',  cat: 'Başlangıçlar', img: '/menu-soup.jpg' },
  { id: 3,  name: 'Peynir Tabağı',       desc: 'A seçimi peynirler, incir, bal, ceviz',          price: '₺320',  cat: 'Başlangıçlar', img: '/menu-cheese.jpg' },
  { id: 4,  name: 'Ton Tataki',          desc: 'Çiğ ton, ponzu sos, avokado, susam',              price: '₺260',  cat: 'Başlangıçlar', img: '/menu-seabass.jpg' },
  { id: 5,  name: 'Karides Tempura',     desc: 'Kızarmış karides, tatlı acı sos, wasabi mayo',    price: '₺240',  cat: 'Başlangıçlar', img: '/menu-scallops.jpg' },
  { id: 6,  name: 'Mantar Çorbası',      desc: 'Trüf mantar çorbası, krem köpüğü, ceviz',        price: '₺190',  cat: 'Başlangıçlar', img: '/menu-soup.jpg' },
  { id: 7,  name: 'Beef Carpaccio',      desc: 'Dana file, roka, parmesan, trüf yağı',            price: '₺290',  cat: 'Başlangıçlar', img: '/menu-steak.jpg' },
  { id: 8,  name: 'Hümüs Royals',        desc: 'Leblebi humüs, nar ekşisi, zeytinyağı, lavaş',    price: '₺140',  cat: 'Başlangıçlar', img: '/menu-cheese.jpg' },
  { id: 9,  name: 'Ahtapot Salatası',    desc: 'Izgara ahtapot, cherry domates, zeytin',          price: '₺250',  cat: 'Başlangıçlar', img: '/menu-scallops.jpg' },
  { id: 10, name: 'Foie Gras',           desc: 'Kaz ciğeri, karamelize elma, brioche',             price: '₺420',  cat: 'Başlangıçlar', img: '/menu-soup.jpg' },
  { id: 41, name: 'Enginar Kalbi',       desc: 'Izgara enginar, keçi peyniri, nar, limon',        price: '₺210',  cat: 'Ara Sıcaklar', img: '/menu-scallops.jpg' },
  { id: 42, name: 'Karides Güveç',       desc: 'Domates soslu karides, kaşar, nanı',               price: '₺250',  cat: 'Ara Sıcaklar', img: '/menu-seabass.jpg' },
  { id: 43, name: 'Mantar Sote',         desc: 'Karışık mantar, sarımsak, tereyağı, kekik',        price: '₺175',  cat: 'Ara Sıcaklar', img: '/menu-cheese.jpg' },
  { id: 44, name: 'Izgara Sebzeler',     desc: 'Mevsim sebzeleri, balsamik glaz, roka',            price: '₺165',  cat: 'Ara Sıcaklar', img: '/menu-scallops.jpg' },
  { id: 45, name: 'Ton Balıklı Rulo',    desc: 'Ton balığı, Philadelphia, avokado, susam',         price: '₺230',  cat: 'Ara Sıcaklar', img: '/menu-seabass.jpg' },
  { id: 46, name: 'Trüf Risotto',        desc: 'Arborio pirinç, siyah trüf, parmesan, krem',       price: '₺280',  cat: 'Ara Sıcaklar', img: '/menu-cheese.jpg' },
  { id: 47, name: 'Karnıyarık Modern',   desc: 'Aubergine, kıyma, domates, béchamel',              price: '₺195',  cat: 'Ara Sıcaklar', img: '/menu-scallops.jpg' },
  { id: 48, name: 'Crumble Peynirli',    desc: 'Krem peynir, ıspanak, fıstık crumble',             price: '₺200',  cat: 'Ara Sıcaklar', img: '/menu-cheese.jpg' },
  { id: 49, name: 'Jambon Sarması',      desc: 'Serrano jambon, erik sos, roka, parmesan',        price: '₺215',  cat: 'Ara Sıcaklar', img: '/menu-steak.jpg' },
  { id: 50, name: 'Krema Ispanak',       desc: 'Ispanak, krema, sarımsak, çıtır ekmek',           price: '₺155',  cat: 'Ara Sıcaklar', img: '/menu-soup.jpg' },
  { id: 11, name: 'Wagyu Steak',         desc: 'A5 Wagyu, trüf patates püresi, mevsim sebzeler',   price: '₺680',  cat: 'Ana Yemekler', img: '/menu-steak.jpg' },
  { id: 12, name: 'Levrek Fillesi',      desc: 'Fırında levrek, beurre blanc, kuşkonmaz',          price: '₺380',  cat: 'Ana Yemekler', img: '/menu-seabass.jpg' },
  { id: 13, name: 'Duck Confit',         desc: 'Yavaş pişirilmiş ördek, portakal sos, graten',      price: '₺420',  cat: 'Ana Yemekler', img: '/menu-steak.jpg' },
  { id: 14, name: 'Iberico Porchetta',   desc: 'Iberico domuz, elma püresi, hardal sosu',          price: '₺460',  cat: 'Ana Yemekler', img: '/menu-steak.jpg' },
  { id: 15, name: 'Somon En Croûte',     desc: 'Somon, ıspanaklı hamur, béarnaise sos',            price: '₺360',  cat: 'Ana Yemekler', img: '/menu-seabass.jpg' },
  { id: 16, name: 'Lamb Shank',          desc: 'Kuzunun incik, rozemary patates, glaze',            price: '₺440',  cat: 'Ana Yemekler', img: '/menu-steak.jpg' },
  { id: 17, name: 'Risotto ai Funghi',   desc: 'Karidesli mantar risotto, parmesan, trüf',          price: '₺340',  cat: 'Ana Yemekler', img: '/menu-scallops.jpg' },
  { id: 18, name: 'Tuna Steak',          desc: 'Izgara ton balığı, soya glaz, zencefil, pirinç',    price: '₺390',  cat: 'Ana Yemekler', img: '/menu-seabass.jpg' },
  { id: 19, name: 'Chicken Ballotine',   desc: 'Boneless tavuk, daha sos, trüflü couscous',        price: '₺300',  cat: 'Ana Yemekler', img: '/menu-steak.jpg' },
  { id: 20, name: 'Seafood Platter',     desc: 'Karides, ıstakoz, ahtapot, midye, sos trio',        price: '₺580',  cat: 'Ana Yemekler', img: '/menu-scallops.jpg' },
  { id: 21, name: 'Çikolata Fondan',     desc: 'Sıcak çikolata, ahududu, altın yaprak, dondurma',  price: '₺180',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 22, name: 'Crème Brûlée',        desc: 'Vanilya krem, karamelize şeker, taze meyve',       price: '₺150',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 23, name: 'Tiramisu',            desc: 'Klasik İtalyan, espresso, mascarpone, kakao',       price: '₺160',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 24, name: 'Panna Cotta',         desc: 'Vanilya panna cotta, çilek sos, taze nane',        price: '₺140',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 25, name: 'Baklava Moderne',     desc: 'Fıstıklı baklava, kaymak, bal glaze',              price: '₺170',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 26, name: 'Profiteroles',        desc: 'Krem şanti, çikolata sos, kavrulmuş fındık',        price: '₺155',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 27, name: 'Sorbet Trio',         desc: 'Mango, limon, ahududu sorbet, taze meyve',          price: '₺120',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 28, name: 'Mille-feuille',       desc: 'Karamel krem, karamelize fıstık, vanilya',          price: '₺175',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 29, name: 'Künefe',             desc: 'Geleneksel künefe, kaymak, antep fıstığı',           price: '₺165',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 30, name: 'Cheesecake',          desc: 'New York cheesecake, yaban mersini kompotu',        price: '₺150',  cat: 'Tatlılar', img: '/menu-dessert.jpg' },
  { id: 31, name: 'Smoky Old Fashioned', desc: 'Bourbon, şeker, bitter, duman efektli',             price: '₺180',  cat: 'İçecekler', img: '/menu-cocktail1.jpg' },
  { id: 32, name: 'Château Margaux',     desc: '2015 Bordeaux, kırmızı meyve, vanilya notları',     price: '₺950',  cat: 'İçecekler', img: '/menu-wine.jpg' },
  { id: 33, name: 'Tropical Sunset',     desc: 'Mango, ananas, hindistan cevizi, lime',              price: '₺120',  cat: 'İçecekler', img: '/menu-mocktail.jpg' },
  { id: 34, name: 'Negroni',             desc: 'Gin, bitter campari, tatlı vermut, portakal',       price: '₺160',  cat: 'İçecekler', img: '/menu-cocktail1.jpg' },
  { id: 35, name: 'Barolo Riserva',      desc: '2016 Piemonte, kuru meyve, tarçın, çikolata',       price: '₺850',  cat: 'İçecekler', img: '/menu-wine.jpg' },
  { id: 36, name: 'Elderflower Spritz',  desc: 'Elderflower, prosecco, misket limonu, buz',         price: '₺130',  cat: 'İçecekler', img: '/menu-mocktail.jpg' },
  { id: 37, name: 'Espresso Martini',    desc: 'Votka, kahve likör, taze espresso, vanilya',        price: '₺170',  cat: 'İçecekler', img: '/menu-cocktail1.jpg' },
  { id: 38, name: 'Sancerre Blanc',      desc: '2022 Loire, citrus, beyaz çiçek, mineral',           price: '₺420',  cat: 'İçecekler', img: '/menu-wine.jpg' },
  { id: 39, name: 'Berry Bliss',         desc: 'Ahududu, çilek, yaban mersini, nane, soda',         price: '₺100',  cat: 'İçecekler', img: '/menu-mocktail.jpg' },
  { id: 40, name: 'Whisky Sour',         desc: 'Japon viski, limon, şeker köpüğü, bitters',         price: '₺175',  cat: 'İçecekler', img: '/menu-cocktail1.jpg' },
];

const WA_NUMBER = '905551234567';
function waLink(item: typeof ALL_ITEMS[0]) {
  const msg = encodeURIComponent(`Merhaba! Le Maison Dorée'den bilgi almak istiyorum.\n\n🍽️ ${item.name} - ${item.price}\n${item.desc}\n\nRezervasyon yapmak istiyorum.`);
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

/* ═══════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════ */
function Diamond({ size = 8, color = 'rgba(245,158,11,0.4)' }: { size?: number; color?: string }) {
  return <div style={{ width: size, height: size, transform: 'rotate(45deg)', background: color, borderRadius: 1, flexShrink: 0 }} />;
}

function useFadeIn(delay = 0) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-40px' });
  return { ref, props: { initial: { opacity: 0, y: 30 } as const, animate: v ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const } } };
}

/* ═══════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════ */
function SectionHeader() {
  const { ref, props: p1 } = useFadeIn(0);
  const { props: p2 } = useFadeIn(0.1);
  const { props: p3 } = useFadeIn(0.18);
  const { props: p4 } = useFadeIn(0.26);
  return (
    <div ref={ref} className="text-center mb-10 md:mb-14">
      <motion.div {...p1} className="flex items-center justify-center gap-3 mb-4">
        <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-amber-400/40" />
        <Diamond size={7} />
        <svg width="13" height="13" viewBox="0 0 24 24" className="text-amber-400/40"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" /></svg>
        <Diamond size={7} />
        <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-amber-400/40" />
      </motion.div>
      <motion.p {...p2} className="text-amber-400/80 text-[10px] md:text-xs tracking-[0.5em] uppercase font-medium mb-2">Lezzetin Ötesinde</motion.p>
      <motion.h2 {...p3} className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white tracking-tight">
        <span className="block">Özel</span>
        <span className="block mt-1 text-amber-100/90 italic" style={{ fontFamily: 'Georgia, serif' }}>Menümüz</span>
      </motion.h2>
      <motion.p {...p4} className="mt-4 text-white/50 text-sm font-light tracking-wider max-w-lg mx-auto">Her tabak, şefimizin tutkuyla hazırladığı bir sanat eseri</motion.p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SEARCH BAR
   ═══════════════════════════════════════════════════ */
function SearchBar({ query, onChange }: { query: string; onChange: (q: string) => void }) {
  const { ref, props } = useFadeIn(0);
  return (
    <motion.div ref={ref} {...props} className="max-w-lg mx-auto mb-8 md:mb-10">
      <div className="relative">
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="text" value={query} onChange={(e) => onChange(e.target.value)} placeholder="Yemek ara..."
            className="flex-1 bg-transparent text-white/80 text-sm font-light placeholder:text-white/20 outline-none" />
          {query && (
            <button onClick={() => onChange('')} className="text-white/30 hover:text-white/60 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   CATEGORY FILTER
   ═══════════════════════════════════════════════════ */
function CategoryFilter({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  const { ref, props } = useFadeIn(0.06);
  return (
    <motion.div ref={ref} {...props} className="flex flex-wrap items-center justify-center gap-2 mb-8 md:mb-10">
      {CATEGORIES.map((cat) => (
        <button key={cat} onClick={() => onChange(cat)}
          className={`relative px-5 py-2 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-500 rounded-lg
            ${active === cat ? 'text-black' : 'text-white/35 hover:text-white/60 border border-white/[0.06] hover:border-white/15'}`}>
          {active === cat && (
            <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-lg"
              layoutId="catTab" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />
          )}
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MENU ITEM — Luxury list style, compact horizontal
   ═══════════════════════════════════════════════════ */
function MenuItem({ item, index }: { item: typeof ALL_ITEMS[0]; index: number }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-20px' });
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 2) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group cursor-pointer"
    >
      <div className="relative flex items-stretch gap-3 md:gap-4 py-3 px-3 md:px-4 rounded-xl transition-all duration-400"
        style={{
          background: hover ? 'rgba(245,158,11,0.04)' : 'transparent',
          border: `1px solid ${hover ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.03)'}`,
        }}>

        {/* Tiny image thumbnail */}
        <div className="relative w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-lg overflow-hidden flex-shrink-0"
          style={{ border: `1px solid ${hover ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.06)'}` }}>
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${item.img})` }}
            animate={{ scale: hover ? 1.15 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Order number badge */}
          <div className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center z-10"
            style={{ background: hover ? 'rgba(245,158,11,0.8)' : 'rgba(255,255,255,0.08)', border: '1px solid rgba(0,0,0,0.5)', transition: 'all 0.3s' }}>
            <span className="text-[8px] font-bold" style={{ color: hover ? '#000' : 'rgba(255,255,255,0.5)' }}>
              {((index % 10) + 1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
          {/* Name row */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3
              className="text-white text-sm md:text-[15px] font-medium tracking-wide leading-tight truncate transition-colors duration-300"
              style={{ color: hover ? 'rgba(253,230,138,1)' : 'rgba(255,255,255,0.85)', fontFamily: 'Georgia, serif' }}
            >
              {item.name}
            </h3>
            <span className="text-amber-400/80 text-sm md:text-[15px] font-light whitespace-nowrap flex-shrink-0 transition-colors duration-300"
              style={{ color: hover ? 'rgba(245,158,11,1)' : 'rgba(245,158,11,0.7)' }}>
              {item.price}
            </span>
          </div>

          {/* Dot leader line */}
          <div className="flex items-center gap-1 mb-1.5">
            <div className="w-1 h-1 rounded-full" style={{ background: hover ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.08)', transition: 'all 0.3s' }} />
            <div className="flex-1 border-b border-dotted" style={{ borderColor: hover ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.05)', transition: 'all 0.3s' }} />
          </div>

          {/* Description */}
          <p className="text-white/30 text-[11px] md:text-xs font-light leading-snug transition-opacity duration-300"
            style={{ opacity: hover ? 0.6 : 0.35 }}>
            {item.desc}
          </p>

          {/* WhatsApp button — appears on hover */}
          <motion.a
            href={waLink(item)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: hover ? 1 : 0, width: hover ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex items-center gap-1.5 mt-2"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#4ADE80">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="text-[#4ADE80] text-[9px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap">Sipariş Ver</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CATEGORY TITLE — shown when a specific category is active
   ═══════════════════════════════════════════════════════════════ */
function CategoryTitle({ name, count }: { name: string; count: number }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-20px' });

  const icons: Record<string, string> = {
    'Başlangıçlar': 'M12 3c.132 0 .263 0 .393.007a2 2 0 0 1 .674 1.286c.173.264.34.532.502.803.16.276.315.556.467.838.15.273.295.549.433.828.136.278.267.558.392.84.122.278.239.559.349.842.107.279.208.562.302.847.091.281.175.565.254.852.074.282.142.567.203.855.057.283.107.569.15.857.04.282.076.566.107.851.029.281.054.563.075.846.02.28.038.562.051.844.014.276.025.553.033.832.006.274.01.549.01.825 0 3.75-3.545 6.464-7.797 7.776M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18',
    'Ara Sıcaklar': 'M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.048 8.287 8.287 0 0 0 9 9.6M8.638 5.214A8.252 8.252 0 0 0 12 3a8.25 8.25 0 0 0 6.962 2.214',
    'Ana Yemekler': 'M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 1-3-3 3.354 3.354 0 0 1 3-3 3.354 3.354 0 0 1-3 3 .166.663.357 1.287.577 1.9',
    'Tatlılar': 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12',
    'İçecekler': 'M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.25',
  };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={v ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex items-center gap-4 py-5 md:py-6 mb-2">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5">
          <path d={icons[name] || icons['Başlangıçlar']} />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-white text-lg md:text-xl font-light tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>{name}</h3>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase">{count} ürün</span>
        <div className="w-8 h-px bg-amber-400/20" />
        <Diamond size={5} color="rgba(245,158,11,0.3)" />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AD BANNER 1 — Happy Hour
   ═══════════════════════════════════════════════════ */
function AdBanner1() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-30px' });
  const txt = 'HAPPY HOUR  ✦  %20 İNDİRİM  ✦  HER GÜN 18:00 - 20:00  ✦  ';
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }} className="my-5 md:my-6">
      <div className="relative overflow-hidden rounded-xl py-4 md:py-5 px-4"
        style={{ background: 'linear-gradient(135deg, #1a0800, #0d0500, #1a0800)', border: '1px solid rgba(245,158,11,0.1)' }}>
        <motion.div className="absolute -top-6 -left-6 w-24 h-24 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} />
        <div className="absolute top-2 left-2"><Diamond size={5} color="rgba(245,158,11,0.2)" /></div>
        <div className="absolute top-2 right-2"><Diamond size={5} color="rgba(245,158,11,0.2)" /></div>
        <div className="absolute bottom-2 left-2"><Diamond size={5} color="rgba(245,158,11,0.1)" /></div>
        <div className="absolute bottom-2 right-2"><Diamond size={5} color="rgba(245,158,11,0.1)" /></div>
        <div className="relative z-10 text-center">
          <motion.div className="text-amber-400/50 text-[8px] tracking-[0.5em] uppercase font-medium mb-1"
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>✦ Her Akşam 18:00 - 20:00 ✦</motion.div>
          <motion.h3 className="text-2xl md:text-4xl font-extralight text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}
            animate={{ letterSpacing: ['0em', '0.04em', '0em'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            Happy <span className="italic text-amber-300">Hour</span>
          </motion.h3>
          <p className="mt-1 text-white/35 text-[11px] font-light">Kokteyller ve içeceklerde %20 indirim</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-1.5 border-t border-amber-400/8">
          <motion.div className="flex whitespace-nowrap" animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
            {[0, 1].map(i => <span key={i} className="text-[9px] tracking-[0.3em] uppercase text-amber-400/15 font-light">{txt}</span>)}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   AD BANNER 2 — Live Music
   ═══════════════════════════════════════════════════ */
function AdBanner2() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.97 }} animate={v ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }} className="my-5 md:my-6">
      <div className="relative overflow-hidden rounded-xl"
        style={{ background: 'linear-gradient(135deg, #050a15, #0a0515, #050a15)', border: '1px solid rgba(168,85,247,0.1)' }}>
        <motion.div className="absolute top-3 left-[20%] w-16 h-16 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)' }}
          animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.div className="absolute bottom-3 right-[15%] w-20 h-20 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }}
          animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} />
        <motion.div className="absolute top-4 right-[25%]" animate={{ rotate: [0, 90, 0] }} transition={{ duration: 8, repeat: Infinity }}>
          <div className="w-4 h-4 relative"><div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-purple-400/20" /><div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-purple-400/20" /></div>
        </motion.div>
        <motion.div className="absolute bottom-4 left-[10%]" animate={{ rotate: [0, -90, 0] }} transition={{ duration: 9, repeat: Infinity, delay: 1 }}>
          <Diamond size={6} color="rgba(168,85,247,0.15)" />
        </motion.div>
        <div className="relative z-10 px-6 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <motion.div className="text-purple-400/40 text-[8px] tracking-[0.5em] uppercase font-medium mb-1"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}>✦ Cuma &amp; Cumartesi ✦</motion.div>
            <h3 className="text-xl md:text-2xl font-extralight text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Canlı <span className="italic text-purple-300">Müzik</span> Gecesi
            </h3>
            <p className="mt-0.5 text-white/30 text-[11px] font-light">Jazz &amp; Soul performansları</p>
          </div>
          <motion.div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)', border: '1px solid rgba(168,85,247,0.15)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="1.5">
              <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            </svg>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px">
          <motion.div className="h-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' }}
            animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   AD BANNER 3 — Wine Tasting
   ═══════════════════════════════════════════════════ */
function AdBanner3() {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={v ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }} className="my-5 md:my-6">
      <div className="relative overflow-hidden rounded-xl"
        style={{ background: 'linear-gradient(135deg, #0a0502, #150a05, #0a0502)', border: '1px solid rgba(139,92,42,0.12)' }}>
        <motion.div className="absolute -top-3 -right-3 w-16 h-16 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,42,0.08) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.div className="absolute top-3 right-3 grid grid-cols-3 gap-1.5"
          animate={{ opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 4, repeat: Infinity }}>
          {[...Array(9)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-amber-700/40" />)}
        </motion.div>
        <div className="absolute top-1/2 -translate-y-1/2 left-3 md:left-5">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ border: '1px dashed rgba(139,92,42,0.2)' }}>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ border: '1px solid rgba(139,92,42,0.2)', background: 'rgba(139,92,42,0.05)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,42,0.4)" strokeWidth="1.5"><path d="M7 2l10 10M7 22l10-10" /></svg>
            </motion.div>
          </motion.div>
        </div>
        <div className="relative z-10 px-6 md:px-10 py-4 md:py-5 md:pl-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <motion.div className="text-amber-700/40 text-[8px] tracking-[0.5em] uppercase font-medium mb-1"
              animate={{ opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}>✦ Her Ayın İlk Cumartesi ✦</motion.div>
            <h3 className="text-xl md:text-2xl font-extralight text-white tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              Şarap <span className="italic text-amber-600">Degüstasyonu</span>
            </h3>
            <p className="mt-0.5 text-white/30 text-[11px] font-light">Sommelier eşliğinde ödüllü şaraplar</p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-amber-600 text-xl font-extralight" style={{ fontFamily: 'Georgia, serif' }}>₺450</span>
            <p className="text-white/15 text-[8px] tracking-[0.2em] uppercase">Kişi Başı</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-900/15 to-transparent" />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   TASTING BANNER
   ═══════════════════════════════════════════════════ */
function TastingBanner() {
  const { ref, props } = useFadeIn(0);
  const link = waLink({ id: 99, name: 'Şefin Tasting Menüsü', price: '₺1.200', desc: '7 aşamalı menü + şarap eşleştirmesi', cat: 'Özel', img: '' });
  return (
    <motion.div ref={ref} {...props} className="mt-10 md:mt-14">
      <div className="relative overflow-hidden rounded-2xl py-7 md:py-9 px-6 md:px-10"
        style={{ background: 'linear-gradient(135deg, #1a0f05, #0f0803, #1a0f05)', border: '1px solid rgba(245,158,11,0.08)' }}>
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.03) 0%, transparent 70%)' }} />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <div className="text-amber-400/40 text-[9px] tracking-[0.4em] uppercase mb-2">✦ Özel Deneyim ✦</div>
            <h3 className="text-xl md:text-2xl font-extralight text-white mb-1">
              Şefin <span className="italic text-amber-100" style={{ fontFamily: 'Georgia, serif' }}>Tasting</span> Menüsü
            </h3>
            <p className="text-white/30 text-xs md:text-sm font-light">7 aşamalı menü, özel şarap eşleştirmesi dahil</p>
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
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════ */
export default function MenuSection() {
  const [active, setActive] = useState('Tümü');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let items = active === 'Tümü' ? ALL_ITEMS : ALL_ITEMS.filter(i => i.cat === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q) || i.cat.toLowerCase().includes(q)
      );
    }
    return items;
  }, [active, search]);

  // Group items by category for display with ad banners
  const sections = useMemo(() => {
    if (active !== 'Tümü') {
      // Single category: show items in 2-col grid with ad after 5th
      return [{
        cat: active,
        items: filtered,
        showTitle: false,
      }];
    }
    // All categories: group by cat, show title for each
    const grouped: { cat: string; items: typeof ALL_ITEMS[]; showTitle: boolean }[] = [];
    const catOrder = ['Başlangıçlar', 'Ara Sıcaklar', 'Ana Yemekler', 'Tatlılar', 'İçecekler'];
    catOrder.forEach(cat => {
      const items = filtered.filter(i => i.cat === cat);
      if (items.length > 0) grouped.push({ cat, items, showTitle: true });
    });
    return grouped;
  }, [filtered, active]);

  // Ad banners to insert between rows (relative positions)
  const AD_AFTER = [4, 5]; // after 4th and 5th item in "Tümü" view

  return (
    <section id="menu" className="relative py-10 md:py-16 lg:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505, #0a0806, #050505)' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', mixBlendMode: 'overlay' }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
      <motion.div className="absolute top-20 left-[4%] pointer-events-none" animate={{ y: [0, -12, 0], rotate: [0, 45, 0] }} transition={{ duration: 12, repeat: Infinity }}><Diamond size={8} color="rgba(245,158,11,0.12)" /></motion.div>
      <motion.div className="absolute bottom-32 right-[5%] pointer-events-none" animate={{ y: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity }}><Diamond size={6} color="rgba(245,158,11,0.08)" /></motion.div>

      <div className="relative z-10 max-w-[900px] mx-auto px-4 md:px-8">
        <SectionHeader />
        <SearchBar query={search} onChange={setSearch} />
        <CategoryFilter active={active} onChange={setActive} />

        {/* Count */}
        <AnimatePresence mode="wait">
          <motion.div key={`${active}-${search}`} className="text-center mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase font-light">
              <span className="text-amber-400/40">{filtered.length}</span> ürün
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Menu content */}
        <AnimatePresence mode="wait">
          <motion.div key={`${active}-${search}-grid`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}>

            {sections.map((section, sIdx) => (
              <div key={section.cat}>
                {/* Category title */}
                {section.showTitle && (
                  <CategoryTitle name={section.cat} count={section.items.length} />
                )}

                {/* Items in 2-col grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-1.5">
                  {section.items.map((item, i) => {
                    const globalIdx = filtered.indexOf(item);
                    const adAfterItem = AD_AFTER.indexOf(i + 1);
                    const adBanner = adAfterItem === 0 ? <AdBanner1 key={`ad-${sIdx}-${adAfterItem}`} /> : adAfterItem === 1 ? <AdBanner2 key={`ad-${sIdx}-${adAfterItem}`} /> : null;

                    return (
                      <div key={item.id}>
                        <MenuItem item={item} index={globalIdx} />
                        {adBanner}
                      </div>
                    );
                  })}
                </div>

                {/* Separator between categories */}
                {sIdx < sections.length - 1 && (
                  <div className="my-6 md:my-8">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-px bg-amber-400/12" />
                      <Diamond size={4} color="rgba(245,158,11,0.15)" />
                      <div className="w-1 h-1 rounded-full border border-amber-400/10" />
                      <Diamond size={4} color="rgba(245,158,11,0.15)" />
                      <div className="w-6 h-px bg-amber-400/12" />
                    </div>
                  </div>
                )}

                {/* Ad banner between categories in Tümü view */}
                {active === 'Tümü' && sIdx === 1 && <AdBanner3 />}
              </div>
            ))}

            {filtered.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <p className="text-white/30 text-sm font-light">Aramanızla eşleşen ürün bulunamadı</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <TastingBanner />
      </div>
    </section>
  );
}

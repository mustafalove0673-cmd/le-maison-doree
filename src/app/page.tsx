import HeroSection from '@/components/restaurant/HeroSection';
import HeroMenuBridge from '@/components/restaurant/HeroMenuBridge';
import MenuSection from '@/components/restaurant/MenuSection';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: '#0a0a10' }}>
      <HeroSection />
      <HeroMenuBridge />
      <MenuSection />
    </main>
  );
}

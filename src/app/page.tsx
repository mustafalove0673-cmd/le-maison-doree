import HeroSection from '@/components/restaurant/HeroSection';
import HeroMenuBridge from '@/components/restaurant/HeroMenuBridge';
import MenuSection from '@/components/restaurant/MenuSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <HeroMenuBridge />
      <MenuSection />
    </main>
  );
}

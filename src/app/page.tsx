import HeroSection from '@/components/restaurant/HeroSection';
import MenuSection from '@/components/restaurant/MenuSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <MenuSection />
    </main>
  );
}

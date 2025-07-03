import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { HowItWorks } from '../components/HowItWorks';
import { Footer } from '../components/Footer';
import { FeaturedCelebrities } from '@/components/FeaturedCelebrities';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturedCelebrities />
      <HowItWorks />
      <Footer />
    </div>
  );
}
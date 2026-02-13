import AmbientBackground from '@/components/valentine/AmbientBackground';
import FloatingHearts from '@/components/valentine/FloatingHearts';
import HeroSection from '@/components/valentine/HeroSection';
import LoveLetterSection from '@/components/valentine/LoveLetterSection';
import MemoriesSection from '@/components/valentine/MemoriesSection';
import ReasonsSection from '@/components/valentine/ReasonsSection';
import PromisesSection from '@/components/valentine/PromisesSection';
import SurpriseSection from '@/components/valentine/SurpriseSection';
import ForeverSection from '@/components/valentine/ForeverSection';
import ValentineFooter from '@/components/valentine/ValentineFooter';

const Index = () => {
  return (
    <div className="relative overflow-x-hidden">
      <AmbientBackground />
      <FloatingHearts />
      <main className="relative z-[1]">
        <HeroSection />
        <LoveLetterSection />
        <MemoriesSection />
        <ReasonsSection />
        <PromisesSection />
        <SurpriseSection />
        <ForeverSection />
      </main>
      <ValentineFooter />
    </div>
  );
};

export default Index;

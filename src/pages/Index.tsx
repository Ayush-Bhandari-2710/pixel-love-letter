import { useState } from 'react';
import AmbientBackground from '@/components/valentine/AmbientBackground';
import FloatingHearts from '@/components/valentine/FloatingHearts';
import ValentineGate from '@/components/valentine/ValentineGate';
import HeroSection from '@/components/valentine/HeroSection';
import LoveLetterSection from '@/components/valentine/LoveLetterSection';
import MemoriesSection from '@/components/valentine/MemoriesSection';
import ReasonsSection from '@/components/valentine/ReasonsSection';
import HeartSection from '@/components/valentine/HeartSection';
import FutureMessagesSection from '@/components/valentine/FutureMessagesSection';
import PromisesSection from '@/components/valentine/PromisesSection';
import SurpriseSection from '@/components/valentine/SurpriseSection';
import ForeverSection from '@/components/valentine/ForeverSection';
import ValentineFooter from '@/components/valentine/ValentineFooter';
import YouTubeAudio from "@/components/valentine/YouTubeAudio";
const Index = () => {
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <div className="relative overflow-x-hidden">
      {!gateOpen && <ValentineGate onAccept={() => setGateOpen(true)} />}
      <AmbientBackground />
      <FloatingHearts />
      <main className="relative z-[1]">
        <HeroSection />
        <LoveLetterSection />
        <MemoriesSection />
        <ReasonsSection />
        <HeartSection />
        <FutureMessagesSection />
        <PromisesSection />
        <SurpriseSection />
        <ForeverSection />
        <YouTubeAudio videoId="jTV5hoDQSFQ" />
      </main>
      <ValentineFooter />
    </div>
  );
};

export default Index;

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const memories = [
  {
    emoji: '🌶️',
    title: 'The Day Mirchi Became Mine',
    description: 'The moment I stopped seeing you as just a girl I liked and started seeing you as the one I wanted to protect, understand, and grow with. That shift was quiet… but permanent.',
  },
  {
    emoji: '🌙',
    title: '2AM & Still Talking',
    description: 'When the world was asleep but we weren’t. When “just five more minutes” turned into hours. When distance didn’t matter because our voices carried everything.',
  },
  {
    emoji: '💬',
    title: 'The Way You Say “Hajur”',
    description: 'That soft little “hajur” when I call your name. You probably don’t realize it, but that single word melts me every single time.',
  },
  {
    emoji: '🛡️',
    title: 'The First Time You Let Your Guard Down',
    description: 'When you told me about your past, about the betrayals, about the fear of things not lasting. That’s when I knew loving you meant choosing patience, safety, and consistency.',
  },
  {
    emoji: '🏠',
    title: 'The Hard Days at Home',
    description: 'The days when things felt heavy for you. When I couldn’t physically be there, but I promised myself I would be your calm, your safe space, even from miles away.',
  },
  {
    emoji: '❤️',
    title: 'The Moment I Chose You',
    description: 'Not just because you’re beautiful. Not just because you’re kind. But because even when things feel uncertain, my heart never hesitates about you.',
  },
];


// Duplicate for seamless loop
const marqueeItems = [...memories, ...memories];

const MemoriesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 overflow-hidden relative">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-3xl md:text-4xl text-primary-foreground mb-12 px-4"
      >
        📸 Our Moments
      </motion.h2>

      {/* Edge blur masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-[hsl(220,40%,8%)] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-[hsl(220,40%,8%)] to-transparent" />

      {/* Marquee container */}
      <div className="relative">
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((memory, index) => (
            <div
              key={index}
              className="shrink-0 w-72 md:w-80 group"
            >
              <div
                className="glass-card rounded-2xl p-6 h-64 flex flex-col justify-between cursor-default border border-white/10 hover:scale-105 hover:shadow-xl hover:shadow-valentine-rose/15 transition-all duration-500"
              >
                <div>
                  <span className="text-4xl mb-3 block group-hover:animate-heartbeat">
                    {memory.emoji}
                  </span>
                  <h3 className="font-serif text-xl text-primary-foreground mb-2 group-hover:text-valentine-rose transition-colors duration-300">
                    {memory.title}
                  </h3>
                </div>
                <p className="text-primary-foreground/50 text-sm leading-relaxed">
                  {memory.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoriesSection;

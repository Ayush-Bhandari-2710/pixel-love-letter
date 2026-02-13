import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const memories = [
  {
    emoji: '✨',
    title: 'The First Time I Knew',
    description: 'That moment when everything shifted, and I realized you were different from anyone I\'d ever met.',
  },
  {
    emoji: '🌙',
    title: 'Our Late-Night Talks',
    description: 'Hours that felt like minutes, sharing secrets and dreams under the soft glow of midnight.',
  },
  {
    emoji: '👀',
    title: 'That Look You Give Me',
    description: 'The one that says everything words can\'t. The one I\'ll never get tired of.',
  },
  {
    emoji: '🗺️',
    title: 'Our First Adventure',
    description: 'When we discovered that the best journeys are the ones where we get lost together.',
  },
  {
    emoji: '🤫',
    title: 'The Comfortable Silence',
    description: 'When being next to you became the most peaceful place in the world.',
  },
  {
    emoji: '😄',
    title: 'Your Laugh',
    description: 'The sound that made the whole world stop, just for a second, so I could listen.',
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

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const reasons = [
  { front: 'Your kindness', back: 'The way you care for others without expecting anything in return.' },
  { front: 'Your strength', back: 'How you face every challenge with grace that takes my breath away.' },
  { front: 'The way you say my name', back: 'It sounds different when you say it — like it finally means something.' },
  { front: 'Your laugh', back: "It's the soundtrack to every happy memory I have." },
  { front: 'Your patience', back: 'How you love me gently, even on my hardest days.' },
  { front: 'The way you see me', back: "You see the person I'm still becoming, and you love them already." },
  { front: 'Your courage', back: 'How you choose vulnerability over walls, every single time.' },
  { front: 'Everything unsaid', back: 'The love in the small moments — a touch, a glance, a knowing smile.' },
];

interface HeartBurst {
  id: number;
  hearts: Array<{ x: number; y: number; rotate: number; scale: number; delay: number }>;
}

const ReasonsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [bursts, setBursts] = useState<HeartBurst[]>([]);

  const triggerBurst = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const burst: HeartBurst = {
      id: Date.now(),
      hearts: Array.from({ length: 12 }, () => ({
        x: (Math.random() - 0.5) * 200,
        y: -(Math.random() * 150 + 50),
        rotate: Math.random() * 540 - 270,
        scale: Math.random() * 0.5 + 0.3,
        delay: Math.random() * 0.3,
      })),
    };
    setBursts(prev => [...prev, burst]);
    setTimeout(() => setBursts(prev => prev.filter(b => b.id !== burst.id)), 3000);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-4 relative">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-3xl md:text-4xl text-valentine-deep mb-12"
      >
        🌹 Reasons I Love You
      </motion.h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={triggerBurst}
            className="flip-card h-44 cursor-pointer relative"
          >
            <div className="flip-card-inner rounded-2xl">
              {/* Front */}
              <div className="flip-card-front glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                <span
                  className="text-2xl mb-2 animate-heartbeat inline-block"
                  style={{ animationDelay: `${index * 0.4}s` }}
                >
                  ❤️
                </span>
                <p className="font-serif text-valentine-deep text-base">{reason.front}</p>
              </div>
              {/* Back */}
              <div className="flip-card-back rounded-2xl p-5 flex items-center justify-center text-center bg-gradient-to-br from-valentine-rose to-valentine-glow">
                <p className="text-primary-foreground text-sm leading-relaxed font-light">
                  {reason.back}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Heart bursts */}
      {bursts.map(burst => (
        <div key={burst.id} className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {burst.hearts.map((heart, i) => (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
              animate={{ x: heart.x, y: heart.y, rotate: heart.rotate, scale: heart.scale, opacity: 0 }}
              transition={{ duration: 2, delay: heart.delay, ease: 'easeOut' }}
              className="absolute text-xl"
            >
              💕
            </motion.span>
          ))}
        </div>
      ))}
    </section>
  );
};

export default ReasonsSection;

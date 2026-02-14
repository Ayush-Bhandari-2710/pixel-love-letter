import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

const promises = [
  "I promise to choose you — every single day, without hesitation.",
  "I promise to grow with you — becoming better, together, always.",
  "I promise to love you on easy days and hard ones.",
  "I promise to be your safe place — where you never have to pretend.",
  "I promise to listen — really listen — to your heart.",
  "I promise to never stop trying to make you smile.",
  "I promise that my love for you will only deepen with time.",
];

const Petals = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 12 + 10,
        duration: Math.random() * 10 + 14,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.12 + 0.04,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map(p => (
        <span
          key={p.id}
          className="absolute bottom-[-20px] animate-float-up"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          🌹
        </span>
      ))}
    </div>
  );
};

const PromisesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[700px] rounded-full bg-valentine-rose/8 blur-3xl" />
      </div>

      <Petals />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-3xl md:text-4xl text-primary-foreground mb-20"
      >
        💞 My Promises To You
      </motion.h2>

      <div className="relative max-w-xl mx-auto">
        {/* Glowing animated timeline line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px">
          <div className="absolute inset-0 bg-gradient-to-b from-valentine-rose/40 via-valentine-lavender/40 to-valentine-gold/40" />
          <motion.div
            className="absolute inset-x-0 top-0 bg-gradient-to-b from-valentine-rose via-valentine-lavender to-valentine-gold"
            initial={{ height: '0%' }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 3, ease: 'easeOut', delay: 0.3 }}
            style={{ filter: 'blur(2px)', opacity: 0.6 }}
          />
        </div>

        <div className="space-y-12">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.25, ease: 'easeOut' }}
              className="relative pl-14 md:pl-18 group"
            >
              {/* Timeline dot with sparkle */}
              <div className="absolute left-2 md:left-3.5 top-3 flex items-center justify-center">
                <div
                  className="w-4 h-4 rounded-full bg-valentine-rose shadow-lg shadow-valentine-rose/40 animate-heartbeat"
                  style={{ animationDelay: `${index * 0.5}s` }}
                />
                <motion.span
                  className="absolute text-xs"
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                >
                  ✨
                </motion.span>
              </div>

              {/* Glassmorphic promise card */}
              <div className="glass-card rounded-xl px-6 py-5 border border-white/10 group-hover:border-valentine-rose/20 group-hover:shadow-lg group-hover:shadow-valentine-rose/10 group-hover:-translate-y-0.5 transition-all duration-500">
                <p className="font-serif text-lg md:text-xl text-primary-foreground/90 leading-relaxed group-hover:text-primary-foreground transition-colors duration-300">
                  {promise}
                </p>

                {/* Self-drawing underline */}
                <motion.div
                  className="h-[2px] mt-3 bg-gradient-to-r from-valentine-rose/60 to-valentine-gold/40 origin-left rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.2, delay: index * 0.25 + 0.5, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 2.5 }}
          className="text-center font-serif text-xl md:text-2xl text-valentine-rose mt-16 italic"
          style={{ textShadow: '0 0 20px hsl(345 80% 60% / 0.3)' }}
        >
          "Forever isn't long enough with you."
        </motion.p>
      </div>
    </section>
  );
};

export default PromisesSection;

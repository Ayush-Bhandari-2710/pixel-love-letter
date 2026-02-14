import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

const lines = [
  'No matter how time changes us…',
  'No matter how life tests us…',
  'I choose you.',
  'Every day.',
  'In every season.',
  'In every version of us.',
];

const ForeverSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-150px' });

  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 2 + 2.5,
      })),
    []
  );

  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 12 + 8,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.15 + 0.05,
      })),
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden starry-gradient"
    >
      {/* Stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: star.delay * 0.3 }}
          className="absolute rounded-full bg-primary-foreground animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Floating petals */}
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
          🌸
        </span>
      ))}

      {/* Spotlight glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, hsl(345 80% 55% / 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Slow zoom container */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 8, ease: 'easeOut' }}
        className="relative z-10 text-center px-6 max-w-2xl"
      >
        {/* Line by line text */}
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 + i * 0.8 }}
            className="font-serif text-xl md:text-2xl text-primary-foreground/80 mb-3 leading-relaxed"
          >
            {line}
          </motion.p>
        ))}

        {/* Final promise - bigger */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8 + lines.length * 0.8 + 0.5 }}
          className="font-serif text-3xl md:text-5xl text-valentine-rose mt-10 leading-tight"
          style={{
            textShadow: '0 0 40px hsl(345 80% 60% / 0.5)',
          }}
        >
          This is my forever promise.
        </motion.p>

        {/* Glowing heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.6 } : {}}
          transition={{ duration: 2, delay: 0.8 + lines.length * 0.8 + 1.5 }}
          className="mt-8 text-5xl animate-heartbeat"
          style={{
            filter:
              'drop-shadow(0 0 30px hsl(345 80% 60% / 0.5))',
          }}
        >
          💖
        </motion.div>

        {/* I love you always */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 0.8 + lines.length * 0.8 + 2.5 }}
          className="font-handwriting text-2xl md:text-3xl text-primary-foreground/60 mt-6"
        >
          I love you. Always.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ForeverSection;

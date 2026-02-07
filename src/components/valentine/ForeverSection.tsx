import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

const ForeverSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

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

      {/* Glowing heart */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.6 } : {}}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="absolute text-7xl md:text-8xl animate-heartbeat"
        style={{
          filter: 'drop-shadow(0 0 40px hsl(345 80% 60% / 0.6)) drop-shadow(0 0 80px hsl(345 80% 60% / 0.3))',
        }}
      >
        💖
      </motion.div>

      {/* Text */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-2xl md:text-3xl text-primary-foreground/80 mb-4"
        >
          This is not just Valentine's Day
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-serif text-3xl md:text-5xl text-primary-foreground mb-8 leading-tight"
        >
          This is my forever with you
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 2.2 }}
          className="font-handwriting text-3xl md:text-4xl text-valentine-rose"
          style={{
            textShadow: '0 0 30px hsl(345 80% 60% / 0.4)',
          }}
        >
          I love you. Always.
        </motion.p>
      </div>
    </section>
  );
};

export default ForeverSection;

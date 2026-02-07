import { useRef } from 'react';
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

const PromisesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-4 relative">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[600px] rounded-full bg-valentine-lavender/8 blur-3xl" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-3xl md:text-4xl text-valentine-deep mb-16"
      >
        💞 My Promises To You
      </motion.h2>

      <div className="relative max-w-xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-valentine-rose/40 via-valentine-lavender/40 to-valentine-gold/40" />

        <div className="space-y-10">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeOut' }}
              className="relative pl-12 md:pl-16"
            >
              {/* Timeline dot */}
              <div
                className="absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 rounded-full bg-valentine-rose shadow-md shadow-valentine-rose/30 animate-heartbeat"
                style={{ animationDelay: `${index * 0.5}s` }}
              />

              <p className="font-serif text-lg md:text-xl text-valentine-deep/90 leading-relaxed">
                {promise}
              </p>

              {/* Self-drawing underline */}
              <motion.div
                className="h-[2px] mt-2 bg-gradient-to-r from-valentine-rose/60 to-valentine-gold/40 origin-left rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: index * 0.2 + 0.4, ease: 'easeOut' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromisesSection;

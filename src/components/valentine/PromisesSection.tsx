import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

const promises = [
  "I promise that you will never have to question where you stand with me  I will always make it clear.",
  
  "I promise that no matter how heavy your day feels, you will never carry it alone again.",
  
  "I promise to stay patient with your fears, even on the days they make loving you complicated.",
  
  "I promise to protect your softness  not use it against you, not take it for granted.",
  
  "I promise to be consistent  not just intense in moments, but steady every single day.",
  
  "I promise that success, stress, distance, or time will never make me treat you differently.",
  
  "I promise to remind you who you are when you forget  strong, worthy, deeply loved.",
  
  "I promise that I will never become someone you feel unsafe opening your heart to.",
  
  "I promise to fight for us quietly and maturely  not with ego, not with pride.",
  
  "I promise that the version of me you love today is not temporary I am not changing into someone colder.",
  
  "I promise that if the world ever feels loud, I will always be your calm place.",
  
  "I promise to grow up with you, not grow away from you."
];


const FloatingElements = () => {
  const elements = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 16 + 12,
        duration: Math.random() * 12 + 16,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.15 + 0.05,
        emoji: i % 3 === 0 ? '🌹' : i % 3 === 1 ? '💖' : '✨',
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map(el => (
        <span
          key={el.id}
          className="absolute bottom-[-30px] animate-float-up"
          style={{
            left: `${el.x}%`,
            fontSize: `${el.size}px`,
            opacity: el.opacity,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.emoji}
        </span>
      ))}
    </div>
  );
};

const PromisesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-4 relative overflow-hidden">
      {/* Premium layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-valentine-rose/5 to-transparent" />
      
      {/* Multiple ambient glow orbs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(345 85% 55%) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, hsl(280 70% 60%) 0%, transparent 60%)',
            filter: 'blur(120px)',
            top: '20%',
            right: '10%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <FloatingElements />

      {/* Decorative hearts in corners */}
      <motion.div
        className="absolute top-10 left-10 text-6xl opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        💝
      </motion.div>
      <motion.div
        className="absolute top-10 right-10 text-6xl opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        💝
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        {/* Elegant header with ornamental elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          {/* Decorative line above */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-valentine-rose/50 to-valentine-rose/50 rounded-full" />
            <span className="text-2xl animate-pulse">💖</span>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-valentine-rose/50 to-valentine-rose/50 rounded-full" />
          </motion.div>

          <h2 className="font-serif text-4xl md:text-6xl text-primary-foreground mb-4 relative inline-block">
            <span
              className="relative z-10"
              style={{
                background: 'linear-gradient(135deg, hsl(345 85% 75%), hsl(280 70% 75%), hsl(45 80% 75%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 40px hsl(345 80% 60% / 0.3)',
              }}
            >
              My Promises To You
            </span>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-valentine-rose/10 via-valentine-lavender/10 to-valentine-gold/10 rounded-2xl -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ filter: 'blur(20px)' }}
            />
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-serif text-lg md:text-xl text-primary-foreground/60 italic"
          >
            twelve vows, infinite love
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Premium glowing timeline */}
          <div className="absolute left-8 md:left-10 top-0 bottom-0 w-[2px]">
            {/* Base glow */}
            <div
              className="absolute inset-0 w-[4px] -left-[1px]"
              style={{
                background: 'linear-gradient(to bottom, hsl(345 85% 60% / 0.3), hsl(280 70% 60% / 0.3), hsl(45 80% 60% / 0.3))',
                filter: 'blur(6px)',
              }}
            />
            {/* Solid line */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-valentine-rose/40 via-valentine-lavender/40 to-valentine-gold/40 rounded-full"
            />
            {/* Animated glow */}
            <motion.div
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-valentine-rose via-valentine-lavender to-valentine-gold rounded-full"
              initial={{ height: '0%' }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 3.5, ease: 'easeOut', delay: 0.5 }}
            />
            {/* Traveling light */}
            <motion.div
              className="absolute w-3 h-3 -left-[5px] rounded-full bg-valentine-rose shadow-lg shadow-valentine-rose/50"
              initial={{ top: '0%', opacity: 0 }}
              animate={
                isInView
                  ? {
                      top: ['0%', '100%'],
                      opacity: [0, 1, 1, 0],
                    }
                  : {}
              }
              transition={{
                duration: 3.5,
                delay: 0.5,
                ease: 'easeInOut',
              }}
            />
          </div>

          <div className="space-y-8 md:space-y-10">
            {promises.map((promise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-20 md:pl-24 group"
              >
                {/* Premium timeline dot */}
                <div className="absolute left-5 md:left-7 top-4 flex items-center justify-center">
                  {/* Outer glow ring */}
                  <motion.div
                    className="absolute w-8 h-8 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, hsl(345 85% 60% / 0.4) 0%, transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0.1, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                  {/* Middle ring */}
                  <div
                    className="absolute w-6 h-6 rounded-full border-2 border-valentine-rose/30"
                    style={{
                      background: 'radial-gradient(circle, hsl(345 85% 50% / 0.2) 0%, transparent 70%)',
                    }}
                  />
                  {/* Core dot */}
                  <motion.div
                    className="w-4 h-4 rounded-full bg-gradient-to-br from-valentine-rose to-valentine-lavender shadow-lg shadow-valentine-rose/60 relative z-10"
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.4,
                    }}
                  />
                  {/* Sparkle */}
                  <motion.span
                    className="absolute text-sm z-20"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.3, 0.5],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    ✨
                  </motion.span>
                </div>

                {/* Ultra-premium card */}
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl p-[1px]">
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'linear-gradient(135deg, hsl(345 85% 60% / 0.3), hsl(280 70% 60% / 0.3), hsl(45 80% 60% / 0.3))',
                      }}
                    />
                  </div>

                  {/* Card content */}
                  <div className="relative glass-card rounded-2xl px-8 py-7 border border-white/10 group-hover:border-white/20 transition-all duration-500 backdrop-blur-xl">
                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, transparent 0%, hsl(345 85% 60% / 0.08) 50%, transparent 100%)',
                      }}
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Promise number badge */}
                    <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-valentine-rose to-valentine-lavender flex items-center justify-center shadow-lg shadow-valentine-rose/40 border-2 border-white/10">
                      <span className="font-serif text-white text-sm font-bold">{index + 1}</span>
                    </div>

                    <p className="font-serif text-lg md:text-xl text-primary-foreground leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10">
                      {promise}
                    </p>

                    {/* Elegant underline with gradient */}
                    <motion.div
                      className="h-[2px] mt-4 rounded-full relative overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 + 1 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-valentine-rose/70 via-valentine-lavender/70 to-valentine-gold/70"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.2, delay: index * 0.2 + 1.2, ease: 'easeOut' }}
                        style={{ transformOrigin: 'left' }}
                      />
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.4 + 2,
                        }}
                      />
                    </motion.div>

                    {/* Corner accent */}
                    <div className="absolute bottom-3 right-3 text-valentine-rose/20 group-hover:text-valentine-rose/40 transition-colors duration-500 text-2xl">
                      💝
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Grand finale message */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-20 relative"
          >
            {/* Decorative frame */}
            <div className="relative inline-block">
              {/* Corner ornaments */}
              <span className="absolute -top-6 -left-6 text-3xl opacity-30">✨</span>
              <span className="absolute -top-6 -right-6 text-3xl opacity-30">✨</span>
              <span className="absolute -bottom-6 -left-6 text-3xl opacity-30">💖</span>
              <span className="absolute -bottom-6 -right-6 text-3xl opacity-30">💖</span>

              <motion.div
                className="px-12 py-8 rounded-3xl relative"
                style={{
                  background: 'linear-gradient(135deg, hsl(345 80% 50% / 0.08), hsl(280 70% 50% / 0.08), hsl(45 80% 50% / 0.08))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 40px hsl(345 80% 60% / 0.2)',
                    '0 0 60px hsl(345 80% 60% / 0.4)',
                    '0 0 40px hsl(345 80% 60% / 0.2)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <p
                  className="font-serif text-2xl md:text-4xl italic leading-relaxed"
                  style={{
                    background: 'linear-gradient(135deg, hsl(345 85% 70%), hsl(280 70% 70%), hsl(45 80% 70%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  "Forever isn't long enough with you."
                </p>

                {/* Subtle sparkles around text */}
                <motion.span
                  className="absolute -top-2 left-1/4 text-lg"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    y: [-5, 0, -5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  ✨
                </motion.span>
                <motion.span
                  className="absolute -bottom-2 right-1/4 text-lg"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    y: [5, 0, 5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                >
                  ✨
                </motion.span>
              </motion.div>
            </div>

            {/* Heart signature */}
            <motion.div
              className="mt-8 text-4xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              💝
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromisesSection;
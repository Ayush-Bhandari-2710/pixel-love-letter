import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SurpriseSection = () => {
  const [state, setState] = useState<'closed' | 'opening' | 'open'>('closed');

  const confettiHearts = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 350,
        y: -(Math.random() * 200 + 80),
        rotate: Math.random() * 720 - 360,
        scale: Math.random() * 0.5 + 0.4,
        delay: Math.random() * 0.4,
        emoji: ['💕', '💖', '💗', '💓', '❤️', '✨'][Math.floor(Math.random() * 6)],
      })),
    []
  );

  const handleClick = () => {
    if (state !== 'closed') return;
    setState('opening');
    setTimeout(() => setState('open'), 500);
  };

  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <h2 className="text-center font-serif text-3xl md:text-4xl text-valentine-deep mb-16">
        🎁 A Little Surprise
      </h2>

      <div className="flex flex-col items-center justify-center relative">
        {/* Gift box */}
        <AnimatePresence mode="wait">
          {state === 'closed' && (
            <motion.button
              key="gift"
              initial={{ opacity: 1 }}
              exit={{ scale: 1.3, opacity: 0, rotate: 10 }}
              transition={{ duration: 0.5 }}
              onClick={handleClick}
              className="text-8xl md:text-9xl cursor-pointer animate-wiggle hover:scale-110 transition-transform duration-300 relative"
              aria-label="Open surprise"
            >
              🎁
              <div className="absolute inset-0 rounded-full animate-glow-pulse" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Confetti hearts */}
        {state === 'open' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {confettiHearts.map(heart => (
              <motion.span
                key={heart.id}
                initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: heart.x,
                  y: heart.y,
                  rotate: heart.rotate,
                  scale: heart.scale,
                  opacity: 0,
                }}
                transition={{ duration: 2.5, delay: heart.delay, ease: 'easeOut' }}
                className="absolute text-2xl md:text-3xl"
              >
                {heart.emoji}
              </motion.span>
            ))}
          </div>
        )}

        {/* Revealed message */}
        {state === 'open' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="text-center max-w-md"
          >
            <p className="text-5xl mb-6">💝</p>
            <p className="font-handwriting text-2xl md:text-3xl text-valentine-rose leading-relaxed">
              "No matter where life takes us, I'm always yours."
            </p>
          </motion.div>
        )}

        {state === 'closed' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-muted-foreground text-sm animate-pulse"
          >
            Tap to open ✨
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default SurpriseSection;

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const messages = [
  {
    title: 'When You Feel Insecure',
    emoji: '🤍',
    message:
      'I see you in ways you don\'t see yourself. Even when you doubt your worth, I never will.',
  },
  {
    title: 'When You Feel Tired',
    emoji: '🌙',
    message:
      'You don\'t have to be strong all the time. Rest. I\'ll carry the weight when you can\'t.',
  },
  {
    title: 'When We Fight',
    emoji: '🤝',
    message:
      'No disagreement is stronger than my decision to stay. We fix things. We don\'t walk away.',
  },
  {
    title: 'When You Feel Alone',
    emoji: '💗',
    message:
      'You are never fighting this world alone. My heart stands beside yours.',
  },
];

const FutureMessagesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-4 relative overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center font-serif text-3xl md:text-5xl text-primary-foreground mb-4"
        style={{ textShadow: '0 0 30px hsl(345 80% 60% / 0.3)' }}
      >
        For The Days You'll Need This
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center text-primary-foreground/40 font-serif text-lg mb-16 italic"
      >
        Open when you need to hear it most
      </motion.p>

      <div className="max-w-2xl mx-auto space-y-4">
        {messages.map((msg, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <motion.button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full text-left px-6 py-5 rounded-2xl glass-card cursor-pointer transition-all duration-300"
                whileHover={{
                  boxShadow: '0 0 30px hsl(345 80% 60% / 0.15)',
                }}
                style={{
                  borderColor: isOpen
                    ? 'hsl(345 70% 58% / 0.3)'
                    : 'rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg md:text-xl text-primary-foreground">
                    {msg.emoji} {msg.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary-foreground/40 text-2xl"
                  >
                    +
                  </motion.span>
                </div>
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pt-4 pb-6">
                      <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        className="font-serif text-lg text-primary-foreground/70 leading-relaxed italic"
                      >
                        "{msg.message}"
                      </motion.p>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="inline-block mt-3 text-xl"
                      >
                        ✨
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FutureMessagesSection;

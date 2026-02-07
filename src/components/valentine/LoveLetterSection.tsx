import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const letterLines = [
  "My Dearest,",
  "",
  "If I could freeze time, I'd choose this moment — the one where you're reading these words, knowing that every single one was written with you on my mind.",
  "",
  "Before you, I thought love was something you find. But with you, I learned it's something that finds you — quietly, gently, and then all at once.",
  "",
  "You are my favorite hello and my hardest goodbye. You are the calm in my chaos, the warmth in my winter, and the reason I believe that some things in this world are simply meant to be.",
  "",
  "I don't love you because of what you give me. I love you because of who I become when I'm with you — softer, braver, more myself than I've ever been.",
  "",
  "Every day with you feels like a gift I didn't know I was allowed to ask for. And yet, here you are — real, beautiful, mine.",
  "",
  "I choose you. Not just today, not just on Valentine's Day — but on every ordinary Tuesday, every difficult Monday, every quiet Sunday morning.",
  "",
  "You are my always.",
  "",
  "Forever yours ♥",
];

const LoveLetterSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="love-letter"
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4"
    >
      {/* Soft glow behind card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-valentine-rose/8 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center font-serif text-3xl md:text-4xl text-valentine-deep mb-10"
        >
          💌 A Letter For You
        </motion.h2>

        <div className="glass-card rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="space-y-1">
            {letterLines.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: 'easeOut',
                }}
                className={`font-handwriting text-lg md:text-xl leading-relaxed ${
                  line === '' ? 'h-4' : ''
                } ${
                  line === 'My Dearest,' || line === 'Forever yours ♥'
                    ? 'text-valentine-rose font-semibold text-xl md:text-2xl'
                    : 'text-valentine-deep/80'
                } ${line === 'You are my always.' ? 'text-valentine-rose font-bold text-xl md:text-2xl mt-2' : ''}`}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveLetterSection;

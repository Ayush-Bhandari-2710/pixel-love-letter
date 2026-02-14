import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const letterLines = [
  "My Love,",
  "",
  "If I could pause the world for just one second, I would choose this exact moment the one where your eyes are moving across these words, where your heart is quietly listening to mine.",
  "",
  "Before you, I thought love was something dramatic and loud something people chased. But with you, I learned that real love is gentle. It arrives softly. It settles in your chest. And suddenly, you cannot imagine your life without it.",
  "",
  "You didn’t just enter my life. You changed its rhythm. The way I think. The way I hope. The way I see tomorrow.",
  "",
  "There are days when you don’t see how extraordinary you are. Days when you doubt yourself, when the world feels heavier than it should. I wish you could see yourself through my eyes because I see strength in your softness, beauty in your imperfections, and light in places you don’t even notice.",
  "",
  "You are not just the girl I love. You are the peace I didn’t know I needed. You are the comfort in my chaos, the warmth in my cold days, the quiet reassurance that I am exactly where I am meant to be.",
  "",
  "I don’t love you for what you give me. I love you for who you are when no one is watching. I love your stubborn heart. Your honesty. The way you care deeply but pretend you don’t. The way you say things that stay with me long after the conversation ends.",
  "",
  "You have seen parts of me that I hide from the world and instead of walking away, you stayed. That means more to me than I will ever be able to explain properly.",
  "",
  "I choose you. Not just when things are easy. Not just on days filled with roses and sweet words. I choose you when we disagree. I choose you when life tests us. I choose you when we are tired. I choose you in the ordinary, quiet, messy moments that make up real life.",
  "",
  "If there is one promise I can make you, it is this:",
  "",
  "I will never stop trying. Never stop caring. Never stop choosing us.",
  "",
  "You are not temporary to me. You are not a chapter.",
  "",
  "You are my always.",
  "",
  "And if my heart beats a little louder when you’re near… it’s only because it finally found where it belongs.",
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
          className="text-center font-serif text-3xl md:text-4xl text-primary-foreground mb-10"
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
                    : 'text-primary-foreground/80'
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

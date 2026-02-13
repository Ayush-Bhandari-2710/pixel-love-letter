import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const fullTitle = "Happy Valentine's Day, My Love";
  const subtitle = "Every word here exists because you exist";
  const [titleText, setTitleText] = useState('');
  const [subtitleProgress, setSubtitleProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      if (i <= fullTitle.length) {
        setTitleText(fullTitle.slice(0, i));
      } else {
        clearInterval(timer);
        setShowCursor(false);
        setTimeout(() => {
          let j = 0;
          const subTimer = setInterval(() => {
            j++;
            if (j <= subtitle.length) {
              setSubtitleProgress(j);
            } else {
              clearInterval(subTimer);
              setTimeout(() => setShowButton(true), 600);
            }
          }, 35);
        }, 400);
      }
    }, 70);
    return () => clearInterval(timer);
  }, []);

  const scrollToLetter = () => {
    document.getElementById('love-letter')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-4 text-valentine-rose text-3xl"
        >
          💖
        </motion.div>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-6 min-h-[2.4em] md:min-h-[1.5em] leading-tight">
          {titleText}
          {showCursor && <span className="animate-pulse ml-1 text-valentine-rose">|</span>}
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/50 mb-12 min-h-[1.5em] font-light tracking-wide italic">
          {subtitle.split('').map((char, i) => (
            <span
              key={i}
              className="transition-opacity duration-200"
              style={{ opacity: i < subtitleProgress ? 1 : 0 }}
            >
              {char}
            </span>
          ))}
        </p>

        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onClick={scrollToLetter}
            className="px-8 py-4 bg-gradient-to-r from-valentine-rose to-valentine-glow text-primary-foreground rounded-full text-lg font-medium shadow-lg shadow-valentine-rose/25 animate-heartbeat hover:shadow-xl hover:shadow-valentine-rose/35 transition-shadow duration-500 cursor-pointer"
          >
            Open My Heart ❤️
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

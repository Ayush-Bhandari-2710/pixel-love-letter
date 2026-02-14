import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GateHeart = () => (
  <motion.div
    animate={{ scale: [1, 1.15, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    className="text-7xl md:text-8xl"
    style={{ filter: 'drop-shadow(0 0 30px hsl(345 80% 60% / 0.6))' }}
  >
    💖
  </motion.div>
);

const GateHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 14 + 10,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.2 + 0.05,
        emoji: ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)],
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map(h => (
        <span
          key={h.id}
          className="absolute bottom-[-20px] animate-float-up"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

interface ValentineGateProps {
  onAccept: () => void;
}

const ValentineGate = ({ onAccept }: ValentineGateProps) => {
  const [visible, setVisible] = useState(true);
  const [yesClicked, setYesClicked] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [gifError, setGifError] = useState(false);

  // Lock scroll
  useEffect(() => {
    if (visible) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  const dodgeNo = useCallback(() => {
    const maxX = 120;
    const maxY = 60;
    setNoPos({
      x: (Math.random() - 0.5) * maxX * 2,
      y: (Math.random() - 0.5) * maxY * 2,
    });
  }, []);

  const yesConfetti = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 500,
        y: -(Math.random() * 400 + 100),
        rotate: Math.random() * 720 - 360,
        scale: Math.random() * 0.6 + 0.4,
        delay: Math.random() * 0.5,
        emoji: ['💖', '💕', '💗', '❤️', '💋', '✨', '🌹'][Math.floor(Math.random() * 7)],
      })),
    []
  );

  const handleYes = () => {
    setYesClicked(true);
    setTimeout(() => {
      setVisible(false);
      onAccept();
    }, 2200);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, hsl(220 40% 8%) 0%, hsl(340 50% 18%) 50%, hsl(220 35% 12%) 100%)',
          }}
        >
          <GateHearts />

          {/* Glow blobs */}
          <div className="absolute w-[400px] h-[400px] rounded-full animate-ambient-blob-1" style={{ top: '10%', right: '10%', background: 'radial-gradient(circle, hsl(345 80% 50% / 0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute w-[300px] h-[300px] rounded-full animate-ambient-blob-2" style={{ bottom: '15%', left: '10%', background: 'radial-gradient(circle, hsl(220 70% 45% / 0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={yesClicked ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: yesClicked ? 1.5 : 0.6, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center text-center px-6 max-w-md"
          >
            {/* GIF or fallback heart */}
            <div className="mb-8">
              {!gifError ? (
                <img
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnJ0cjlwdWFiYnhuMGtodGJ4ZWdua2FhNjB0ZGsyaHcxd2FxZTF3dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif"
                  alt="Cute couple"
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-2 border-white/10 shadow-lg"
                  onError={() => setGifError(true)}
                />
              ) : (
                <GateHeart />
              )}
            </div>

            {/* Heading */}
            <motion.h1
              className="font-serif text-3xl md:text-5xl text-primary-foreground mb-8 leading-tight"
              style={{ textShadow: '0 0 40px hsl(345 80% 60% / 0.4)' }}
              animate={{ textShadow: ['0 0 20px hsl(345 80% 60% / 0.2)', '0 0 40px hsl(345 80% 60% / 0.5)', '0 0 20px hsl(345 80% 60% / 0.2)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Will You Be My Valentine?
            </motion.h1>

            {/* Buttons */}
            <div className="flex gap-6 items-center relative">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-valentine-rose to-valentine-glow text-primary-foreground text-lg font-serif shadow-lg shadow-valentine-rose/30 cursor-pointer hover:shadow-xl hover:shadow-valentine-rose/50 transition-shadow duration-300"
              >
                YES 💖
              </motion.button>

              <motion.button
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={dodgeNo}
                onTouchStart={dodgeNo}
                className="px-10 py-4 rounded-full bg-white/10 backdrop-blur-sm text-primary-foreground/60 text-lg font-serif border border-white/10 cursor-pointer"
              >
                NO 🙈
              </motion.button>
            </div>
          </motion.div>

          {/* YES confetti */}
          {yesClicked && (
            <>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                {yesConfetti.map(c => (
                  <motion.span
                    key={c.id}
                    initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
                    animate={{ x: c.x, y: c.y, rotate: c.rotate, scale: c.scale, opacity: 0 }}
                    transition={{ duration: 2.5, delay: c.delay, ease: 'easeOut' }}
                    className="absolute text-2xl md:text-3xl"
                  >
                    {c.emoji}
                  </motion.span>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute z-20 font-serif text-3xl md:text-5xl text-valentine-rose"
                style={{ textShadow: '0 0 40px hsl(345 80% 60% / 0.6)' }}
              >
                She said YES 💍
              </motion.p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ValentineGate;

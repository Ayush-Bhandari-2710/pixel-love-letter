import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const slides = [
  {
    title: 'Rose Day 🌹',
    message: 'Every rose reminds me of how beautifully you bloom in my life.',
    accent: 'from-rose-500/30 to-pink-500/20',
  },
  {
    title: 'Propose Day 💍',
    message: 'If I had to choose again, I would still choose you — every single time.',
    accent: 'from-violet-500/30 to-blue-500/20',
  },
  {
    title: 'Chocolate Day 🍫',
    message: 'Life with you is sweeter than any chocolate in the world.',
    accent: 'from-amber-500/30 to-orange-500/20',
  },
  {
    title: 'Teddy Day 🧸',
    message: "If I can't hug you, let this message hold you tight.",
    accent: 'from-pink-500/30 to-rose-500/20',
  },
  {
    title: 'Promise Day 🤞',
    message: 'I promise to grow with you, choose you, and cherish you.',
    accent: 'from-emerald-500/30 to-teal-500/20',
  },
  {
    title: 'Hug Day 🤗',
    message: 'In your arms is where I find my peace.',
    accent: 'from-sky-500/30 to-blue-500/20',
  },
  {
    title: "Valentine's Day ❤️",
    message: 'You are not just my Valentine. You are my forever.',
    accent: 'from-red-500/30 to-rose-500/20',
  },
];

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  delay: number;
  emoji: string;
}

const ModalHearts = () => {
  const hearts = useMemo<FloatingHeart[]>(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 14 + 8,
        duration: Math.random() * 6 + 8,
        delay: Math.random() * 4,
        emoji: ['💕', '💖', '✨', '💗', '❤️'][Math.floor(Math.random() * 5)],
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute"
          style={{ left: `${h.x}%`, top: `${h.y}%`, fontSize: `${h.size}px` }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
};

const FinalConfetti = () => {
  const pieces = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 500,
        y: -(Math.random() * 300 + 100),
        rotate: Math.random() * 1080 - 540,
        scale: Math.random() * 0.6 + 0.3,
        delay: Math.random() * 0.6,
        emoji: ['💕', '💖', '💗', '❤️', '💋', '✨', '🥰', '💘'][
          Math.floor(Math.random() * 8)
        ],
      })),
    []
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-xl md:text-2xl"
          initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            rotate: p.rotate,
            scale: p.scale,
            opacity: 0,
          }}
          transition={{ duration: 3, delay: p.delay, ease: 'easeOut' }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
};

interface ValentineSlideshowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ValentineSlideshow = ({ open, onOpenChange }: ValentineSlideshowProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const isLast = current === slides.length - 1;

  useEffect(() => {
    if (!open) {
      setCurrent(0);
      setDirection(1);
      setShowConfetti(false);
    }
  }, [open]);

  useEffect(() => {
    if (isLast && open) {
      const t = setTimeout(() => setShowConfetti(true), 600);
      return () => clearTimeout(t);
    }
    setShowConfetti(false);
  }, [isLast, open]);

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  const next = useCallback(() => {
    if (current < slides.length - 1) goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1);
  }, [current, goTo]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, next, prev, onOpenChange]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0, scale: 0.95 }),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[92vw] h-[520px] md:h-[500px] p-0 border-0 bg-transparent shadow-none overflow-visible [&>button]:hidden">
        <VisuallyHidden>
          <DialogTitle>Valentine Week Story</DialogTitle>
        </VisuallyHidden>

        {/* Main card */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B1120 0%, #1e1b4b 50%, #4c1130 100%)' }}>
          {/* Animated gradient glow */}
          <div className="absolute inset-0 animate-pulse opacity-40">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-red-500/20" />
          </div>

          {/* Floating hearts */}
          <ModalHearts />

          {/* Sparkle particles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/60"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Slide content */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center px-8 md:px-16"
              >
                {/* Accent glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slides[current].accent} rounded-3xl`} />

                {/* Glassmorphism card */}
                <div className="relative z-10 bg-white/[0.07] backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/[0.12] shadow-2xl max-w-lg w-full">
                  {/* Soft glow behind heading */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-40 h-10 bg-red-500/20 rounded-full blur-2xl" />

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="relative font-serif text-2xl md:text-4xl text-white mb-6 drop-shadow-lg"
                  >
                    {slides[current].title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative text-base md:text-lg text-gray-200 leading-relaxed font-light italic"
                  >
                    "{slides[current].message}"
                  </motion.p>

                  {/* Slide counter */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative block mt-6 text-xs text-white/40 font-sans"
                  >
                    {current + 1} / {slides.length}
                  </motion.span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Confetti on last slide */}
          {showConfetti && <FinalConfetti />}

          {/* Navigation arrows */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 z-20">
            <button
              onClick={prev}
              disabled={current === 0}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    i === current
                      ? 'bg-white w-6 shadow-lg shadow-white/30'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={isLast}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/[0.08]" />
          <div className="absolute -inset-[1px] rounded-3xl pointer-events-none opacity-50">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-transparent to-rose-500/20 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ValentineSlideshow;

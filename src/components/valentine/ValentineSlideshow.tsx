import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const slides = [
  {
    title: 'Rose Day 🌹',
    message: 'Every rose reminds me of how beautifully you bloom in my life.',
    poem: `You didn’t just bloom in my life,
you changed the season of it.
Now even my quiet days
smell like you.`,
    accent: 'from-rose-500/30 to-pink-500/20',
  },
  {
    title: 'Propose Day 💍',
    message: 'If I had to choose again, I would still choose you every single time.',
    poem: `If love is a choice,
then I choose you -
not once,
but every morning I wake up.`,
    accent: 'from-violet-500/30 to-blue-500/20',
  },
  {
    title: 'Chocolate Day 🍫',
    message: 'Life with you is sweeter than any chocolate in the world.',
    poem: `The world can be bitter,
but your smile
turns even ordinary moments
into something sweet.`,
    accent: 'from-amber-500/30 to-orange-500/20',
  },
  {
    title: 'Teddy Day 🧸',
    message: "If I can't hug you, let this message hold you tight.",
    poem: `When I can’t hold you,
I hold your memory.
And somehow,
it still feels warm.`,
    accent: 'from-pink-500/30 to-rose-500/20',
  },
  {
    title: 'Promise Day 🤞',
    message: 'I promise to grow with you, choose you, and cherish you.',
    poem: `I promise growth, not perfection.
Patience, not pride.
And a love that stays
even when things are hard.`,
    accent: 'from-emerald-500/30 to-teal-500/20',
  },
  {
    title: 'Hug Day 🤗',
    message: 'In your arms is where I find my peace.',
    poem: `In your arms,
my restless heart
finally remembers
how to be still.`,
    accent: 'from-sky-500/30 to-blue-500/20',
  },
  {
    title: "Valentine's Day ❤️",
    message: 'You are not just my Valentine. You are my forever.',
    poem: `You are not just my today.
You are the quiet hope
I want beside me
for every tomorrow.`,
    accent: 'from-red-500/30 to-rose-500/20',
  },
];

interface ValentineSlideshowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ValentineSlideshow = ({ open, onOpenChange }: ValentineSlideshowProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLast = current === slides.length - 1;

  // Throttle wheel so one scroll = one slide
  const wheelLockRef = useRef(false);
  const wheelTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      setCurrent(0);
      setDirection(1);
      wheelLockRef.current = false;
      if (wheelTimeoutRef.current) window.clearTimeout(wheelTimeoutRef.current);
      return;
    }

    // Prevent body scroll behind modal
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

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

  // Keyboard controls
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

  // Wheel/trackpad: scroll down -> next, scroll up -> prev
  const onWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!open) return;

      // Stop the page behind from scrolling
      e.preventDefault();
      e.stopPropagation();

      // Ignore tiny trackpad noise
      const delta = e.deltaY;
      if (Math.abs(delta) < 8) return;

      // Lock to 1 slide per gesture burst
      if (wheelLockRef.current) return;
      wheelLockRef.current = true;

      if (delta > 0) next();
      else prev();

      if (wheelTimeoutRef.current) window.clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 450);
    },
    [open, next, prev]
  );

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 140 : -140, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -140 : 140, opacity: 0, scale: 0.98 }),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[92vw] h-[580px] md:h-[540px] p-0 border-0 bg-transparent shadow-none overflow-visible [&>button]:hidden">
        <VisuallyHidden>
          <DialogTitle>Valentine Week Story</DialogTitle>
        </VisuallyHidden>

        {/* IMPORTANT: wheel handler goes here */}
        <div
          onWheel={onWheel}
          className="relative w-full h-full rounded-3xl overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #0B1120 0%, #1e1b4b 50%, #4c1130 100%)',
          }}
        >
          {/* Close */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Hint */}
          <div className="absolute top-4 left-4 z-20 text-xs text-white/40">
            Scroll or swipe
          </div>

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
                className="absolute inset-0 flex flex-col justify-center items-center text-center px-8 md:px-14"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  const offset = info.offset.x;
                  const velocity = info.velocity.x;

                  // Swipe thresholds
                  if (offset < -80 || velocity < -600) next();
                  else if (offset > 80 || velocity > 600) prev();
                }}
              >
                {/* Accent */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${slides[current].accent} rounded-3xl`}
                />

                {/* Glass Card */}
                <div className="relative z-10 bg-white/[0.07] backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/[0.12] shadow-2xl max-w-lg w-full">
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-44 h-10 bg-rose-500/20 rounded-full blur-2xl" />

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.45 }}
                    className="relative font-serif text-2xl md:text-4xl text-white mb-5 drop-shadow-lg"
                  >
                    {slides[current].title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.45 }}
                    className="relative text-base md:text-lg text-gray-200 leading-relaxed font-light italic"
                  >
                    "{slides[current].message}"
                  </motion.p>

                  <div className="my-6 mx-auto w-16 h-px bg-white/20" />

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34, duration: 0.45 }}
                    className="relative text-white/85 text-sm md:text-base leading-relaxed font-light whitespace-pre-line"
                  >
                    {slides[current].poem}
                  </motion.p>

                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/40">
                    <span>{current + 1}</span>
                    <span>/</span>
                    <span>{slides.length}</span>
                    {isLast && <span className="ml-2 text-rose-200/60">final</span>}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
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
                      ? 'bg-white w-7 shadow-lg shadow-white/30'
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

          {/* Border */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/[0.08]" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ValentineSlideshow;
